# PagamentoService

## 1. Visão Geral

O **PagamentoService** é responsável por gerenciar todo o fluxo de pagamento de comandas no sistema FoodTrack. O serviço permite gerar pagamentos vinculados a comandas, confirmar pagamentos e gerenciar os meios de pagamento disponíveis (Dinheiro, Cartão, PIX, etc.), além de controlar os status do processamento de cada transação.

### Responsabilidades Principais
- Gerar pagamentos para comandas com valor final calculado
- Confirmar pagamentos processados
- Gerenciar meios de pagamento cadastrados (CRUD completo)
- Gerenciar status de pagamento (Pendente, Confirmado, etc.)
- Validar comandas antes de processar pagamentos
- Registrar data/hora de confirmação de pagamentos

---

## 2. Endpoints

### 2.1. **POST** `/api/pagamento`
Gera um novo pagamento para uma comanda existente. Valida se a comanda possui valor final calculado e se o meio de pagamento é válido. O pagamento é criado com status "Pendente" por padrão.

**Request Body:**
```json
{
  "comandaId": 1,
  "meioPagamentoId": 2
}
```

**Response (200 OK):**
```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "comandaId": 1,
  "meioPagamentoId": 2,
  "meioPagamento": {
    "id": 2,
    "nome": "Cartão de Crédito",
    "descricao": "Pagamento com cartão de crédito"
  },
  "valor": 156.80,
  "statusPagamentoId": 1,
  "statusPagamento": {
    "id": 1,
    "nome": "Pendente",
    "descricao": "Aguardando confirmação"
  },
  "dataHora": "2025-11-30T14:30:00"
}
```

**Regras de Negócio:**
- Comanda deve existir e possuir `ValorFinal` calculado
- Meio de pagamento deve ser válido e ativo
- Status inicial sempre é "Pendente"
- Valor do pagamento é automaticamente extraído da comanda

**Erros Possíveis:**
- `400 Bad Request` - Comanda não encontrada ou sem valor final
- `400 Bad Request` - Meio de pagamento inválido
- `400 Bad Request` - Status padrão "Pendente" não encontrado no banco

---

### 2.2. **PUT** `/api/pagamento/{id}/confirmar`
Confirma um pagamento existente, alterando seu status para "Confirmado" e registrando a data/hora da confirmação.

**Response (200 OK):**
```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "comandaId": 1,
  "meioPagamentoId": 2,
  "meioPagamento": {
    "id": 2,
    "nome": "Cartão de Crédito",
    "descricao": "Pagamento com cartão de crédito"
  },
  "valor": 156.80,
  "statusPagamentoId": 2,
  "statusPagamento": {
    "id": 2,
    "nome": "Confirmado",
    "descricao": "Pagamento confirmado"
  },
  "dataHora": "2025-11-30T14:35:22"
}
```

**Regras de Negócio:**
- Pagamento deve existir
- Status "Confirmado" deve estar cadastrado no sistema
- Não permite confirmar pagamento já confirmado
- Atualiza `DataHora` com timestamp da confirmação

**Erros Possíveis:**
- `404 Not Found` - Pagamento não encontrado
- `400 Bad Request` - Status "Confirmado" não encontrado no banco
- `400 Bad Request` - Pagamento já confirmado anteriormente

---

### 2.3. Gerenciamento de Meios de Pagamento

#### **GET** `/api/meiospagamento`
Lista todos os meios de pagamento cadastrados.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "Dinheiro",
    "descricao": "Pagamento em espécie"
  },
  {
    "id": 2,
    "nome": "Cartão de Crédito",
    "descricao": "Pagamento com cartão de crédito"
  },
  {
    "id": 3,
    "nome": "PIX",
    "descricao": "Pagamento via PIX"
  }
]
```

---

#### **GET** `/api/meiospagamento/{id}`
Consulta um meio de pagamento específico.

**Response (200 OK):**
```json
{
  "id": 2,
  "nome": "Cartão de Crédito",
  "descricao": "Pagamento com cartão de crédito"
}
```

**Erros Possíveis:**
- `404 Not Found` - Meio de pagamento não encontrado

---

#### **POST** `/api/meiospagamento`
Cadastra um novo meio de pagamento.

**Request Body:**
```json
{
  "nome": "Vale Refeição",
  "descricao": "Pagamento com vale refeição"
}
```

**Response (201 Created):**
```json
{
  "id": 4,
  "nome": "Vale Refeição",
  "descricao": "Pagamento com vale refeição"
}
```

---

#### **PUT** `/api/meiospagamento/{id}`
Atualiza um meio de pagamento existente.

**Request Body:**
```json
{
  "nome": "Cartão de Débito",
  "descricao": "Pagamento com cartão de débito atualizado"
}
```

**Response (200 OK):**
```json
{
  "id": 3,
  "nome": "Cartão de Débito",
  "descricao": "Pagamento com cartão de débito atualizado"
}
```

**Erros Possíveis:**
- `404 Not Found` - Meio de pagamento não encontrado

---

#### **DELETE** `/api/meiospagamento/{id}`
Remove um meio de pagamento.

**Response (204 No Content)**

**Erros Possíveis:**
- `404 Not Found` - Meio de pagamento não encontrado

---

### 2.4. Gerenciamento de Status de Pagamento

#### **GET** `/api/statuspagamento`
Lista todos os status de pagamento cadastrados.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "Pendente",
    "descricao": "Aguardando confirmação"
  },
  {
    "id": 2,
    "nome": "Confirmado",
    "descricao": "Pagamento confirmado"
  },
  {
    "id": 3,
    "nome": "Cancelado",
    "descricao": "Pagamento cancelado"
  }
]
```

---

#### **GET** `/api/statuspagamento/{id}`
Consulta um status específico.

**Response (200 OK):**
```json
{
  "id": 1,
  "nome": "Pendente",
  "descricao": "Aguardando confirmação"
}
```

**Erros Possíveis:**
- `404 Not Found` - Status não encontrado

---

#### **POST** `/api/statuspagamento`
Cadastra um novo status de pagamento.

**Request Body:**
```json
{
  "nome": "Estornado",
  "descricao": "Pagamento estornado ao cliente"
}
```

**Response (201 Created):**
```json
{
  "id": 4,
  "nome": "Estornado",
  "descricao": "Pagamento estornado ao cliente"
}
```

---

#### **PUT** `/api/statuspagamento/{id}`
Atualiza um status de pagamento existente.

**Request Body:**
```json
{
  "nome": "Confirmado",
  "descricao": "Pagamento processado e confirmado"
}
```

**Response (200 OK):**
```json
{
  "id": 2,
  "nome": "Confirmado",
  "descricao": "Pagamento processado e confirmado"
}
```

**Erros Possíveis:**
- `404 Not Found` - Status não encontrado

---

#### **DELETE** `/api/statuspagamento/{id}`
Remove um status de pagamento.

**Response (204 No Content)**

**Erros Possíveis:**
- `404 Not Found` - Status não encontrado

---

## 3. Modelos de Dados

### Pagamento
```json
{
  "id": "GUID",
  "comandaId": "int",
  "meioPagamentoId": "int",
  "meioPagamento": {
    "id": "int",
    "nome": "string",
    "descricao": "string"
  },
  "valor": "decimal",
  "statusPagamentoId": "int",
  "statusPagamento": {
    "id": "int",
    "nome": "string",
    "descricao": "string"
  },
  "dataHora": "datetime"
}
```

### MeioPagamento
```json
{
  "id": "int",
  "nome": "string",
  "descricao": "string"
}
```

### StatusPagamento
```json
{
  "id": "int",
  "nome": "string",
  "descricao": "string"
}
```

---

## 4. Integração com Outros Serviços

### ← **PedidoService** (Entrada)
- O PagamentoService consulta a tabela `Comanda` para validar:
  - Existência da comanda
  - Valor final calculado (`ValorFinal`)
- Aguarda que o PedidoService tenha fechado a comanda antes de gerar pagamento

### → **PedidoService** (Saída)
- Após confirmação do pagamento, o PedidoService deve:
  - Marcar a comanda como paga
  - Encerrar o atendimento

### → **MesaService** (Saída)
- Com pagamento confirmado, a mesa pode ser liberada para novo atendimento

### → **RelatorioService** (Saída)
- Pagamentos confirmados são registrados para:
  - Relatórios de vendas
  - Análise de meios de pagamento mais utilizados
  - Controle de receita diária/mensal

---

## 5. Fluxo de Pagamento

```
1. Garçom fecha a comanda → PedidoService calcula ValorFinal
2. Cliente escolhe meio de pagamento → POST /api/pagamento
3. Sistema gera pagamento com status "Pendente"
4. Operador confirma transação → PUT /api/pagamento/{id}/confirmar
5. Sistema atualiza status para "Confirmado" e registra data/hora
6. Comanda é marcada como paga no PedidoService
7. Mesa é liberada pelo MesaService
8. Venda é registrada no RelatorioService
```

---

## 6. Casos de Uso

### 6.1. Gerar Pagamento para Comanda
**Cenário:** Cliente solicita a conta ao garçom  
**Ação:** Garçom acessa comanda e seleciona meio de pagamento  
**Resultado:** Pagamento é gerado com valor total da comanda  

### 6.2. Confirmar Pagamento Processado
**Cenário:** Cliente efetua pagamento (cartão/PIX/dinheiro)  
**Ação:** Operador confirma transação no sistema  
**Resultado:** Status muda para "Confirmado", comanda é fechada, mesa liberada  

### 6.3. Cadastrar Novo Meio de Pagamento
**Cenário:** Restaurante passa a aceitar novo tipo de pagamento  
**Ação:** Administrador cadastra novo meio via API  
**Resultado:** Novo meio fica disponível para seleção em pagamentos  

---

## 7. Regras de Negócio

1. **Validação de Comanda:**
   - Comanda deve existir no banco de dados
   - Comanda deve ter `ValorFinal` calculado (não nulo)

2. **Geração de Pagamento:**
   - Status inicial sempre é "Pendente"
   - Valor é extraído automaticamente da comanda
   - ID do pagamento é gerado como GUID

3. **Confirmação de Pagamento:**
   - Só pode confirmar pagamento com status "Pendente"
   - Data/hora de confirmação é registrada automaticamente
   - Não permite confirmar pagamento já confirmado

4. **Meios de Pagamento:**
   - Nome é obrigatório
   - Sistema deve ter ao menos um meio ativo
   - Meios inativos/deletados não aparecem para seleção

5. **Status de Pagamento:**
   - Status "Pendente" e "Confirmado" são obrigatórios no sistema
   - Remoção de status em uso pode gerar inconsistências

---

## 8. Exemplos de Teste

### Gerar Pagamento Completo
```json
POST /api/pagamento

Request:
{
  "comandaId": 15,
  "meioPagamentoId": 1
}

Response (200):
{
  "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  "comandaId": 15,
  "meioPagamentoId": 1,
  "meioPagamento": {
    "id": 1,
    "nome": "Dinheiro",
    "descricao": "Pagamento em espécie"
  },
  "valor": 89.50,
  "statusPagamentoId": 1,
  "statusPagamento": {
    "id": 1,
    "nome": "Pendente",
    "descricao": "Aguardando confirmação"
  },
  "dataHora": "2025-11-30T15:42:10"
}
```

### Confirmar Pagamento
```json
PUT /api/pagamento/7c9e6679-7425-40de-944b-e07fc1f90ae7/confirmar

Response (200):
{
  "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  "comandaId": 15,
  "meioPagamentoId": 1,
  "meioPagamento": {
    "id": 1,
    "nome": "Dinheiro",
    "descricao": "Pagamento em espécie"
  },
  "valor": 89.50,
  "statusPagamentoId": 2,
  "statusPagamento": {
    "id": 2,
    "nome": "Confirmado",
    "descricao": "Pagamento confirmado"
  },
  "dataHora": "2025-11-30T15:43:05"
}
```

---

**Desenvolvido por:** Equipe FoodTrack  
**Última atualização:** 30/11/2025
