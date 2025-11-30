# NotificacaoService

## 1. Visão Geral

O **NotificacaoService** gerencia notificações em tempo real para alertar atendentes sobre pedidos e itens prontos para entrega, facilitando a comunicação entre cozinha e salão.

---

## 2. Responsabilidades

- Criar notificações quando pedidos/itens ficam prontos
- Listar notificações pendentes por atendente
- Marcar notificações como entregues
- Atualizar automaticamente status de itens e pedidos
- Fechar pedidos quando todos os itens são entregues

---

## 3. Endpoints

### 3.1. Criar Notificação

**POST** `/api/Notificacoes`

Cria uma notificação para alertar o atendente que um item ou pedido está pronto.

**Request:**
```json
{
  "idPedido": 123,
  "idItem": 456,
  "idAtendente": 10,
  "mensagem": "Pedido #123 está pronto para retirada!"
}
```

**Campos:**
- `idPedido`: ID do pedido (obrigatório)
- `idItem`: ID do item específico (opcional, se omitido = pedido completo)
- `idAtendente`: ID do atendente responsável (obrigatório)
- `mensagem`: Mensagem personalizada (opcional, gerada automaticamente se omitida)

**Response 201 (Created):**
```json
{
  "idNotificacao": 789
}
```

**Response 400 (Bad Request):**
```json
"IdPedido e IdAtendente são obrigatórios"
```

**Mensagem automática:**
- Com `idItem`: "Item {idItem} do pedido {idPedido} está pronto"
- Sem `idItem`: "Pedido {idPedido} está pronto"

---

### 3.2. Obter Notificação por ID

**GET** `/api/Notificacoes/{id}`

**Response 200 (Success):**
```json
{
  "idNotificacao": 789,
  "idPedido": 123,
  "idItem": 456,
  "idAtendente": 10,
  "mensagem": "Pedido #123 está pronto para retirada!",
  "status": "Pendente",
  "dataCriacao": "2025-11-30T14:30:00Z",
  "dataEntrega": null
}
```

**Response 404 (Not Found):**
```json
"Notificação não encontrada"
```

---

### 3.3. Listar Notificações Pendentes

**GET** `/api/Notificacoes/pendentes`

**Parâmetros de Query:**
- `atendenteId` (obrigatório): ID do atendente
- `limite` (opcional): Máximo de resultados (padrão: 50)

**Exemplo:**
```
GET /api/Notificacoes/pendentes?atendenteId=10&limite=20
```

**Response 200 (Success):**
```json
[
  {
    "idNotificacao": 789,
    "idPedido": 123,
    "idItem": 456,
    "idAtendente": 10,
    "mensagem": "Item 456 do pedido 123 está pronto",
    "status": "Pendente",
    "dataCriacao": "2025-11-30T14:30:00Z",
    "dataEntrega": null
  },
  {
    "idNotificacao": 790,
    "idPedido": 124,
    "idItem": null,
    "idAtendente": 10,
    "mensagem": "Pedido 124 está pronto",
    "status": "Pendente",
    "dataCriacao": "2025-11-30T14:35:00Z",
    "dataEntrega": null
  }
]
```

**Response 400 (Bad Request):**
```json
"Informe atendenteId"
```

---

### 3.4. Marcar Notificação como Entregue

**PATCH** `/api/Notificacoes/{id}/entregar`

Marca a notificação como entregue e atualiza automaticamente o status do item e/ou pedido.

**Response 204 (No Content)**

**Response 404 (Not Found):**
```json
"Notificação não encontrada"
```

**Lógica de atualização automática:**

1. **Se notificação tem `idItem`:**
   - Atualiza item para status "Entregue"
   - Verifica se todos os itens do pedido foram entregues
   - Se sim, fecha o pedido automaticamente

2. **Se notificação é do pedido completo:**
   - Verifica se pedido está com status "Pronto"
   - Se sim, atualiza pedido para "Entregue"

---

## 4. Modelos de Dados

### 4.1. Notificacao

```json
{
  "idNotificacao": 0,
  "idPedido": 0,
  "idItem": 0,
  "idAtendente": 0,
  "mensagem": "string",
  "status": "string",
  "dataCriacao": "2025-11-30T00:00:00Z",
  "dataEntrega": "2025-11-30T00:00:00Z"
}
```

### 4.2. CriarNotificacaoRequest

```json
{
  "idPedido": 0,
  "idItem": 0,
  "idAtendente": 0,
  "mensagem": "string"
}
```

---

## 5. Status de Notificação

| Status | Descrição |
|--------|-----------|
| **Pendente** | Notificação criada, aguardando visualização |
| **Entregue** | Item/pedido foi entregue ao cliente |

---

## 6. Fluxo de Notificações

### 6.1. Fluxo de Item Individual

```
1. Cozinha finaliza preparo do item
   ↓
2. PedidoService atualiza item para "Pronto"
   ↓
3. PedidoService chama NotificacaoService
   ↓
4. NotificacaoService cria notificação para atendente
   ↓
5. Atendente visualiza notificação pendente
   ↓
6. Atendente retira item na cozinha
   ↓
7. Atendente marca como entregue
   ↓
8. NotificacaoService atualiza item para "Entregue"
   ↓
9. Se todos os itens entregues → fecha pedido automaticamente
```

### 6.2. Fluxo de Pedido Completo

```
1. Todos os itens do pedido ficam prontos
   ↓
2. PedidoService atualiza pedido para "Pronto"
   ↓
3. PedidoService cria notificação (sem idItem)
   ↓
4. Atendente visualiza e entrega pedido completo
   ↓
5. Marca como entregue
   ↓
6. NotificacaoService fecha pedido
```

---

## 7. Integração com Outros Serviços

### 7.1. PedidoService

**Chamadas feitas:**
- `POST /api/Notificacoes` - Cria notificação quando item fica pronto

**Atualizações feitas pelo NotificacaoService:**
- Atualiza tabela `pedido_item` (Status = "Entregue")
- Atualiza tabela `pedido` (Status = "Entregue")

**Fluxo:**
1. PedidoService detecta item/pedido pronto
2. Chama NotificacaoService para criar notificação
3. Atendente marca como entregue via NotificacaoService
4. NotificacaoService atualiza diretamente banco do PedidoService

### 7.2. Frontend Mobile

**Endpoints consumidos:**
- `GET /api/Notificacoes/pendentes?atendenteId={id}` - Lista notificações do atendente
- `PATCH /api/Notificacoes/{id}/entregar` - Marca como entregue

**Tela:** "Prontos para Entrega" (pedidosKdsCard.tsx)

---

## 8. Casos de Uso

### 8.1. Criar Notificação de Item

```json
POST /api/Notificacoes

{
  "idPedido": 100,
  "idItem": 50,
  "idAtendente": 5
}
```

### 8.2. Criar Notificação de Pedido Completo

```json
POST /api/Notificacoes

{
  "idPedido": 100,
  "idAtendente": 5,
  "mensagem": "Pedido #100 completo, retire na cozinha!"
}
```

### 8.3. Consultar Pendências do Atendente

```
GET /api/Notificacoes/pendentes?atendenteId=5&limite=10
```

### 8.4. Marcar Como Entregue

```
PATCH /api/Notificacoes/789/entregar
```

---

## 9. Testes

### 9.1. Teste Manual via Swagger

1. Acesse o Swagger do serviço
2. **POST /api/Notificacoes** - Crie uma notificação
3. **GET /api/Notificacoes/pendentes** - Liste pendentes
4. **PATCH /api/Notificacoes/{id}/entregar** - Marque como entregue
5. Consulte novamente pendentes (deve estar vazia)

### 9.2. Teste via arquivo .http

Utilize o arquivo `NotificacaoService.http`:

```http
### Criar notificação
POST {{base_url}}/api/Notificacoes
Content-Type: application/json

{
  "idPedido": 1,
  "idItem": 1,
  "idAtendente": 1,
  "mensagem": "Pedido #1 está pronto para retirada!"
}

### Listar pendentes
GET {{base_url}}/api/Notificacoes/pendentes?atendenteId=1

### Marcar como entregue
PATCH {{base_url}}/api/Notificacoes/1/entregar
```

### 9.3. Fluxo de Teste Completo

Ver arquivo: `src/NotificacaoService/COMO_TESTAR.md`

---

## 10. Regras de Negócio

- Notificação sempre criada com status "Pendente"
- Uma notificação pode ser de item específico ou pedido completo
- Ao marcar item como entregue, verifica se todos os itens do pedido foram entregues
- Pedido é fechado automaticamente quando último item é entregue
- Notificações são ordenadas por data de criação (mais recentes primeiro)
- Limite padrão de 50 notificações por consulta

---

**Última atualização:** 30/11/2025  
**Dependências:** PedidoService
