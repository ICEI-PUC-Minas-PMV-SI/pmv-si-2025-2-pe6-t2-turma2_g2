# 🔔 Como Testar o NotificacaoService

## 📋 Pré-requisitos

1. ✅ MySQL rodando
2. ✅ Banco `food_track` criado
3. ✅ NotificacaoService rodando (porta 5034 ou outra)

---

## 🌐 Acesse o Swagger

```
http://localhost:5034/swagger
```

_(Verifique a porta que apareceu quando você iniciou o serviço)_

---

## 🧪 Testes Passo a Passo

### **1️⃣ Criar uma Notificação**

**Endpoint:** `POST /api/Notificacoes`

**Cenário 1: Notificação de Pedido Completo**

```json
{
  "idPedido": 1,
  "idAtendente": 1,
  "mensagem": "Seu pedido está pronto para retirada!"
}
```

**Cenário 2: Notificação de Item Específico**

```json
{
  "idPedido": 1,
  "idItem": 1,
  "idAtendente": 1,
  "mensagem": "Hambúrguer do pedido #1 está pronto"
}
```

**Cenário 3: Notificação com Mensagem Automática**

```json
{
  "idPedido": 2,
  "idAtendente": 1
}
```

_A mensagem será gerada automaticamente_

**Resposta esperada:**

```json
{
  "idNotificacao": 1
}
```

Status: `201 Created`

---

### **2️⃣ Buscar Notificação por ID**

**Endpoint:** `GET /api/Notificacoes/{id}`

**Exemplo:** `GET /api/Notificacoes/1`

**Resposta esperada:**

```json
{
  "idNotificacao": 1,
  "idPedido": 1,
  "idItem": null,
  "idAtendente": 1,
  "mensagem": "Seu pedido está pronto para retirada!",
  "status": "Pendente",
  "dataCriacao": "2025-10-05T12:30:00Z",
  "dataEntrega": null
}
```

---

### **3️⃣ Listar Notificações Pendentes de um Atendente**

**Endpoint:** `GET /api/Notificacoes/pendentes?atendenteId=1&limite=50`

**Parâmetros:**

- `atendenteId` (obrigatório): ID do atendente
- `limite` (opcional): Máximo de registros (padrão: 50)

**Exemplo:** `GET /api/Notificacoes/pendentes?atendenteId=1`

**Resposta esperada:**

```json
[
  {
    "idNotificacao": 3,
    "idPedido": 2,
    "idItem": null,
    "idAtendente": 1,
    "mensagem": "Pedido 2 está pronto",
    "status": "Pendente",
    "dataCriacao": "2025-10-05T13:00:00Z",
    "dataEntrega": null
  },
  {
    "idNotificacao": 1,
    "idPedido": 1,
    "idItem": null,
    "idAtendente": 1,
    "mensagem": "Seu pedido está pronto para retirada!",
    "status": "Pendente",
    "dataCriacao": "2025-10-05T12:30:00Z",
    "dataEntrega": null
  }
]
```

---

### **4️⃣ Marcar Notificação como Entregue**

**Endpoint:** `PATCH /api/Notificacoes/{id}/entregar`

**Exemplo:** `PATCH /api/Notificacoes/1/entregar`

**Body:** _(vazio)_

**Resposta esperada:** Status `204 No Content`

**O que acontece:**

- ✅ Notificação marcada como "Entregue"
- ✅ `DataEntrega` preenchida
- ✅ Se for notificação de **item**, atualiza o status do item
- ✅ Se todos os itens foram entregues, fecha o pedido
- ✅ Se for notificação de **pedido** e status for "Pronto", fecha o pedido

---

## 🎯 Fluxo Completo de Teste

### **Teste 1: Fluxo Básico**

```bash
1. Criar notificação
   POST /api/Notificacoes
   Body: { "idPedido": 1, "idAtendente": 1, "mensagem": "Teste" }

2. Verificar que foi criada
   GET /api/Notificacoes/1

3. Listar pendentes
   GET /api/Notificacoes/pendentes?atendenteId=1

4. Marcar como entregue
   PATCH /api/Notificacoes/1/entregar

5. Verificar que status mudou
   GET /api/Notificacoes/1
   (status deve ser "Entregue")

6. Verificar que não aparece mais nos pendentes
   GET /api/Notificacoes/pendentes?atendenteId=1
```

---

## ⚠️ Observações Importantes

### **Sobre as Tabelas:**

O serviço espera que existam as seguintes tabelas no banco:

- `notificacao` (criada automaticamente ao inserir)
- `pedido` (referenciada no código)
- `pedido_item` (referenciada no código)

Se você **não tiver** essas tabelas ainda, o serviço vai funcionar parcialmente:

- ✅ Criar notificação: **FUNCIONA**
- ✅ Buscar por ID: **FUNCIONA**
- ✅ Listar pendentes: **FUNCIONA**
- ⚠️ Marcar como entregue: Pode dar erro se tentar atualizar `pedido` ou `pedido_item`

---

## 📊 Script SQL para Criar Tabelas Necessárias

Se quiser testar o fluxo completo, execute no MySQL:

```sql
USE food_track;

-- Tabela de notificações
CREATE TABLE IF NOT EXISTS `notificacao` (
  `IdNotificacao` INT AUTO_INCREMENT PRIMARY KEY,
  `IdPedido` INT NOT NULL,
  `IdItem` INT NULL,
  `IdAtendente` INT NOT NULL,
  `Mensagem` VARCHAR(500) NOT NULL,
  `Status` VARCHAR(20) NOT NULL DEFAULT 'Pendente',
  `DataCriacao` DATETIME NOT NULL,
  `DataEntrega` DATETIME NULL
);

-- Tabela de pedidos (simplificada)
CREATE TABLE IF NOT EXISTS `pedido` (
  `IdPedido` INT AUTO_INCREMENT PRIMARY KEY,
  `Status` VARCHAR(20) NOT NULL DEFAULT 'Aguardando',
  `DataCriacao` DATETIME NOT NULL,
  `DataAtualizacao` DATETIME NULL
);

-- Tabela de itens do pedido (simplificada)
CREATE TABLE IF NOT EXISTS `pedido_item` (
  `IdItem` INT AUTO_INCREMENT PRIMARY KEY,
  `IdPedido` INT NOT NULL,
  `Descricao` VARCHAR(100) NOT NULL,
  `Status` VARCHAR(20) NOT NULL DEFAULT 'Aguardando',
  `DataStatus` DATETIME NULL,
  FOREIGN KEY (`IdPedido`) REFERENCES `pedido`(`IdPedido`)
);

-- Dados de teste
INSERT INTO `pedido` (IdPedido, Status, DataCriacao) VALUES
(1, 'Em Preparo', NOW()),
(2, 'Pronto', NOW());

INSERT INTO `pedido_item` (IdItem, IdPedido, Descricao, Status) VALUES
(1, 1, 'Hambúrguer', 'Em Preparo'),
(2, 1, 'Batata Frita', 'Pronto');
```

---

## ✅ Checklist de Testes

- [ ] Criar notificação de pedido completo
- [ ] Criar notificação de item específico
- [ ] Criar notificação com mensagem automática
- [ ] Buscar notificação por ID
- [ ] Listar notificações pendentes
- [ ] Filtrar por atendente diferente
- [ ] Marcar notificação como entregue
- [ ] Verificar se status mudou para "Entregue"
- [ ] Criar 5+ notificações e testar limite
- [ ] Testar com atendenteId inválido (erro esperado)
- [ ] Testar com ID inexistente (404 esperado)

---

## 🐛 Troubleshooting

**Erro: "Tabela 'notificacao' não existe"**

- Execute o script SQL acima para criar as tabelas

**Erro ao marcar como entregue**

- Certifique-se que as tabelas `pedido` e `pedido_item` existem
- Ou comente as linhas que atualizam essas tabelas no código

**Porta diferente de 5034**

- Verifique a porta exibida ao iniciar o serviço
- Use essa porta no Swagger

---

## 🎉 Sucesso!

Se todos os testes passaram, o NotificacaoService está funcionando perfeitamente! 🚀
