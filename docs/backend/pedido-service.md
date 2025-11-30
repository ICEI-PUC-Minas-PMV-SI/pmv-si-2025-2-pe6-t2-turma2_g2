# PedidoService

## 1. Visão Geral

O **PedidoService** é o núcleo operacional do sistema FoodTrack, responsável por gerenciar todo o ciclo de vida dos pedidos em um restaurante. Controla a abertura e fechamento de comandas, adição de itens aos pedidos, customização com acréscimos e gerenciamento de status de preparo.

### Responsabilidades Principais
- Abrir e fechar comandas vinculadas a mesas
- Adicionar itens de pedido com preços obtidos do cardápio
- Gerenciar acréscimos/complementos em itens (ex: bacon extra, queijo adicional)
- Controlar status dos pedidos (Aguardando, Em Preparo, Pronto, Entregue)
- Calcular valor total da comanda ao fechar
- Integrar com MesaService para controle de ocupação

---

## 2. Endpoints

### 2.1. Gerenciamento de Comandas

#### **GET** `/api/comanda`
Lista todas as comandas cadastradas no sistema.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "mesaId": 8,
    "status": "Aberta",
    "dataAbertura": "2025-11-30T14:25:00",
    "dataFechamento": null,
    "valorFinal": null
  },
  {
    "id": 2,
    "mesaId": 5,
    "status": "Fechada",
    "dataAbertura": "2025-11-30T12:30:00",
    "dataFechamento": "2025-11-30T14:15:00",
    "valorFinal": 156.80
  }
]
```

---

#### **GET** `/api/comanda/{id}`
Consulta uma comanda específica com todos os seus itens.

**Response (200 OK):**
```json
{
  "comanda": {
    "id": 1,
    "mesaId": 8,
    "status": "Aberta",
    "dataAbertura": "2025-11-30T14:25:00",
    "dataFechamento": null,
    "valorFinal": null
  },
  "itens": [
    {
      "id": 45,
      "dataHora": "2025-11-30T14:26:00",
      "pratoId": 12,
      "statusId": 2,
      "valor": 68.90,
      "especificacoes": "Mal passada, sem cebola",
      "comandaId": 1
    },
    {
      "id": 46,
      "dataHora": "2025-11-30T14:27:00",
      "pratoId": 8,
      "statusId": 1,
      "valor": 22.50,
      "especificacoes": null,
      "comandaId": 1
    }
  ]
}
```

**Erros Possíveis:**
- `404 Not Found` - Comanda não encontrada

---

#### **GET** `/api/comanda/mesa/{mesaId}`
Lista todas as comandas associadas a uma mesa específica.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "mesaId": 8,
    "status": "Aberta",
    "dataAbertura": "2025-11-30T14:25:00",
    "dataFechamento": null,
    "valorFinal": null
  }
]
```

---

#### **POST** `/api/comanda`
Abre uma nova comanda para uma mesa. Automaticamente marca a mesa como ocupada no MesaService.

**Request Body:**
```json
{
  "mesaId": 8
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "mesaId": 8,
  "status": "Aberta",
  "dataAbertura": "2025-11-30T14:25:00",
  "dataFechamento": null,
  "valorFinal": null
}
```

**Regras de Negócio:**
- Status inicial sempre é "Aberta"
- DataAbertura é registrada automaticamente
- Mesa é marcada como ocupada (`Ocupada = true`) no banco
- ValorFinal e DataFechamento ficam nulos até fechar

---

#### **PUT** `/api/comanda/{id}/fechar`
Fecha uma comanda, calculando o valor total de todos os itens e registrando a data/hora de fechamento.

**Response (200 OK):**
```json
{
  "comanda": {
    "id": 1,
    "mesaId": 8,
    "status": "Fechada",
    "dataAbertura": "2025-11-30T14:25:00",
    "dataFechamento": "2025-11-30T16:45:00",
    "valorFinal": 156.80
  },
  "itens": [
    {
      "id": 45,
      "dataHora": "2025-11-30T14:26:00",
      "pratoId": 12,
      "statusId": 4,
      "valor": 68.90,
      "especificacoes": "Mal passada, sem cebola",
      "comandaId": 1
    },
    {
      "id": 46,
      "dataHora": "2025-11-30T14:27:00",
      "pratoId": 8,
      "statusId": 4,
      "valor": 22.50,
      "especificacoes": null,
      "comandaId": 1
    }
  ]
}
```

**Regras de Negócio:**
- Calcula `ValorFinal` somando todos os itens da comanda
- Registra `DataFechamento` com timestamp atual
- Altera status para "Fechada"
- Não permite fechar comanda já fechada
- Retorna comanda atualizada com todos os itens

**Erros Possíveis:**
- `404 Not Found` - Comanda não encontrada
- `400 Bad Request` - Comanda já está fechada

---

### 2.2. Gerenciamento de Itens de Pedido

#### **GET** `/api/itempedido`
Lista todos os itens de pedido cadastrados.

**Response (200 OK):**
```json
[
  {
    "id": 45,
    "dataHora": "2025-11-30T14:26:00",
    "pratoId": 12,
    "statusId": 2,
    "valor": 68.90,
    "especificacoes": "Mal passada, sem cebola",
    "comandaId": 1
  },
  {
    "id": 46,
    "dataHora": "2025-11-30T14:27:00",
    "pratoId": 8,
    "statusId": 1,
    "valor": 22.50,
    "especificacoes": null,
    "comandaId": 1
  }
]
```

**🔒 Autenticação:** Requer token JWT Bearer

---

#### **GET** `/api/itempedido/{id}`
Consulta um item de pedido específico.

**Response (200 OK):**
```json
{
  "id": 45,
  "dataHora": "2025-11-30T14:26:00",
  "pratoId": 12,
  "statusId": 2,
  "valor": 68.90,
  "especificacoes": "Mal passada, sem cebola",
  "comandaId": 1
}
```

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Item não encontrado

---

#### **POST** `/api/itempedido`
Adiciona um novo item a uma comanda. O valor do item é automaticamente obtido do PratoService.

**Request Body:**
```json
{
  "dataHora": "2025-11-30T14:26:00",
  "pratoId": 12,
  "statusId": 1,
  "especificacoes": "Mal passada, sem cebola",
  "comandaId": 1
}
```

**Response (201 Created):**
```json
{
  "id": 45,
  "dataHora": "2025-11-30T14:26:00",
  "pratoId": 12,
  "statusId": 1,
  "valor": 68.90,
  "especificacoes": "Mal passada, sem cebola",
  "comandaId": 1
}
```

**🔒 Autenticação:** Requer token JWT Bearer

**Regras de Negócio:**
- Valor é buscado automaticamente da tabela `pratos` pelo `pratoId`
- PratoId deve existir no banco de dados
- StatusId normalmente inicia como 1 (Aguardando)
- Especificações são opcionais (observações do cliente)

**Erros Possíveis:**
- `400 Bad Request` - Prato não encontrado

---

#### **PUT** `/api/itempedido/{id}`
Atualiza um item de pedido existente.

**Request Body:**
```json
{
  "dataHora": "2025-11-30T14:26:00",
  "pratoId": 12,
  "statusId": 2,
  "valor": 68.90,
  "especificacoes": "Mal passada, sem cebola"
}
```

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Item não encontrado

---

#### **DELETE** `/api/itempedido/{id}`
Remove um item de pedido.

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Item não encontrado

---

### 2.3. Gerenciamento de Acréscimos

#### **GET** `/api/itempedidoacrescimo`
Lista todos os acréscimos cadastrados em itens de pedido.

**Response (200 OK):**
```json
[
  {
    "idItemPedido": 45,
    "idAcrescimo": 3,
    "quantidade": 2
  },
  {
    "idItemPedido": 46,
    "idAcrescimo": 5,
    "quantidade": 1
  }
]
```

**🔒 Autenticação:** Requer token JWT Bearer

---

#### **GET** `/api/itempedidoacrescimo/{idItemPedido}/{idAcrescimo}`
Consulta um acréscimo específico de um item.

**Response (200 OK):**
```json
{
  "idItemPedido": 45,
  "idAcrescimo": 3,
  "quantidade": 2
}
```

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Acréscimo não encontrado para este item

---

#### **POST** `/api/itempedidoacrescimo`
Adiciona um acréscimo a um item de pedido (ex: bacon extra, queijo adicional).

**Request Body:**
```json
{
  "idItemPedido": 45,
  "idAcrescimo": 3,
  "quantidade": 2
}
```

**Response (201 Created):**
```json
{
  "idItemPedido": 45,
  "idAcrescimo": 3,
  "quantidade": 2
}
```

**🔒 Autenticação:** Requer token JWT Bearer

**Casos de Uso:**
- Bacon extra em hambúrguer
- Queijo adicional em pizza
- Molho extra em salada

---

#### **PUT** `/api/itempedidoacrescimo/{idItemPedido}/{idAcrescimo}`
Atualiza a quantidade de um acréscimo em um item.

**Request Body:**
```json
{
  "quantidade": 3
}
```

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Acréscimo não encontrado

---

#### **DELETE** `/api/itempedidoacrescimo/{idItemPedido}/{idAcrescimo}`
Remove um acréscimo de um item de pedido.

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Acréscimo não encontrado

---

### 2.4. Gerenciamento de Status de Pedido

#### **GET** `/api/statuspedido`
Lista todos os status de pedido disponíveis.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "Aguardando",
    "descricao": "Pedido aguardando início do preparo"
  },
  {
    "id": 2,
    "nome": "Em Preparo",
    "descricao": "Pedido em preparo na cozinha"
  },
  {
    "id": 3,
    "nome": "Pronto",
    "descricao": "Pedido pronto para entrega"
  },
  {
    "id": 4,
    "nome": "Entregue",
    "descricao": "Pedido entregue ao cliente"
  }
]
```

**🔒 Autenticação:** Requer token JWT Bearer

---

#### **GET** `/api/statuspedido/{id}`
Consulta um status específico.

**Response (200 OK):**
```json
{
  "id": 2,
  "nome": "Em Preparo",
  "descricao": "Pedido em preparo na cozinha"
}
```

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Status não encontrado

---

#### **POST** `/api/statuspedido`
Cadastra um novo status de pedido.

**Request Body:**
```json
{
  "nome": "Cancelado",
  "descricao": "Pedido cancelado pelo cliente"
}
```

**Response (201 Created):**
```json
{
  "id": 5,
  "nome": "Cancelado",
  "descricao": "Pedido cancelado pelo cliente"
}
```

**🔒 Autenticação:** Requer token JWT Bearer

---

#### **PUT** `/api/statuspedido/{id}`
Atualiza um status de pedido existente.

**Request Body:**
```json
{
  "nome": "Em Preparo",
  "descricao": "Pedido sendo preparado pela cozinha"
}
```

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Status não encontrado

---

#### **DELETE** `/api/statuspedido/{id}`
Remove um status de pedido.

**Response (204 No Content)**

**🔒 Autenticação:** Requer token JWT Bearer

**Erros Possíveis:**
- `404 Not Found` - Status não encontrado

---

## 3. Modelos de Dados

### Comanda
```json
{
  "id": "int",
  "mesaId": "int",
  "status": "string",
  "dataAbertura": "datetime",
  "dataFechamento": "datetime (nullable)",
  "valorFinal": "decimal (nullable)"
}
```

### ItemPedido
```json
{
  "id": "int",
  "dataHora": "datetime",
  "pratoId": "int",
  "statusId": "int",
  "valor": "decimal (nullable)",
  "especificacoes": "string",
  "comandaId": "int"
}
```

### ItemPedidoAcrescimo
```json
{
  "idItemPedido": "int",
  "idAcrescimo": "int",
  "quantidade": "int"
}
```

### StatusPedido
```json
{
  "id": "int",
  "nome": "string",
  "descricao": "string"
}
```

---

## 4. Fluxo Típico de Pedido

```
1. Cliente se senta → Garçom abre comanda (POST /api/comanda)
2. Mesa marcada como ocupada no MesaService
3. Cliente escolhe pratos → Garçom adiciona itens (POST /api/itempedido)
4. Preço de cada prato é buscado automaticamente
5. Cliente pede acréscimos → Garçom adiciona (POST /api/itempedidoacrescimo)
6. Pedido vai para cozinha → Status atualizado para "Em Preparo"
7. Cozinha conclui → Status atualizado para "Pronto"
8. Garçom entrega → Status atualizado para "Entregue"
9. Cliente pede conta → Garçom fecha comanda (PUT /api/comanda/{id}/fechar)
10. ValorFinal é calculado somando todos os itens
11. Comanda fechada é processada pelo PagamentoService
```

---

## 5. Integração com Outros Serviços

### → **MesaService** (Saída)
- Ao criar comanda, marca mesa como ocupada (`Ocupada = true`)
- Após pagamento, mesa deve ser liberada pelo MesaService

### ← **PratoService** (Entrada)
- Consulta tabela `pratos` para obter preço ao adicionar item
- Valida existência do prato antes de criar item
- Busca categoria do prato para organizar preparo

### → **NotificacaoService** (Saída)
- Quando item muda para status "Pronto", pode gerar notificação para garçom
- Alertas de tempo excessivo de preparo

### ← **PagamentoService** (Entrada)
- Consulta comanda fechada para processar pagamento
- Utiliza `ValorFinal` calculado no fechamento

### → **RelatorioService** (Saída)
- Comandas fechadas alimentam relatórios de vendas
- Análise de pratos mais pedidos
- Tempo médio de atendimento

---

## 6. Regras de Negócio

1. **Abertura de Comanda:**
   - Apenas uma comanda ativa por mesa por vez
   - Mesa automaticamente marcada como ocupada
   - Status inicial sempre "Aberta"

2. **Adição de Itens:**
   - Prato deve existir no cardápio
   - Valor obtido automaticamente do PratoService
   - Especificações são opcionais (observações do cliente)

3. **Acréscimos:**
   - Podem ser adicionados a qualquer item
   - Quantidade controlada individualmente
   - Exemplos: bacon extra, queijo adicional, molho extra

4. **Fechamento de Comanda:**
   - Calcula soma de todos os itens automaticamente
   - Não permite fechar comanda já fechada
   - Registra data/hora de fechamento
   - Retorna valor final para processamento de pagamento

5. **Status de Pedido:**
   - Fluxo padrão: Aguardando → Em Preparo → Pronto → Entregue
   - Status customizados podem ser adicionados (Cancelado, Pausado, etc.)
   - Alteração de status geralmente feita pela cozinha ou garçom

---

## 7. Casos de Uso

### 7.1. Abertura de Comanda
**Cenário:** Cliente se senta na Mesa 8  
**Ação:** Garçom registra abertura de comanda  
**Resultado:** Comanda criada, mesa marcada como ocupada  

### 7.2. Adicionar Item com Acréscimo
**Cenário:** Cliente pede picanha com bacon extra  
**Ação:** Garçom adiciona item (picanha) e acréscimo (bacon, qtd 2)  
**Resultado:** Item registrado com preço do cardápio + acréscimo vinculado  

### 7.3. Fechamento e Cálculo de Conta
**Cenário:** Cliente termina refeição e pede conta  
**Ação:** Garçom fecha comanda  
**Resultado:** Sistema calcula total (soma itens), registra data/hora, retorna valor  

---

## 8. Exemplos de Teste

### Criar Comanda e Adicionar Itens
```json
// 1. Abrir comanda
POST /api/comanda
{
  "mesaId": 8
}

// 2. Adicionar item (picanha)
POST /api/itempedido
{
  "dataHora": "2025-11-30T14:26:00",
  "pratoId": 12,
  "statusId": 1,
  "especificacoes": "Mal passada",
  "comandaId": 1
}

// 3. Adicionar acréscimo (bacon extra)
POST /api/itempedidoacrescimo
{
  "idItemPedido": 45,
  "idAcrescimo": 3,
  "quantidade": 2
}

// 4. Fechar comanda
PUT /api/comanda/1/fechar

Response:
{
  "comanda": {
    "id": 1,
    "mesaId": 8,
    "status": "Fechada",
    "dataAbertura": "2025-11-30T14:25:00",
    "dataFechamento": "2025-11-30T16:45:00",
    "valorFinal": 156.80
  },
  "itens": [...]
}
```

---

**Última atualização:** 30/11/2025
