# MesaService

## 1. Visão Geral

O **MesaService** gerencia o cadastro e controle de mesas do restaurante, permitindo operações de CRUD e controle de ocupação.

---

## 2. Responsabilidades

- Cadastro de mesas com identificação e capacidade
- Consulta de mesas por ID
- Listagem de todas as mesas
- Atualização de dados e status de ocupação
- Exclusão de mesas

---

## 3. Endpoints

### 3.1. Listar Todas as Mesas

**GET** `/api/mesa`

Lista todas as mesas cadastradas no sistema.

**Response 200 (Success):**
```json
[
  {
    "id": 1,
    "identificacao": "Mesa 1",
    "lugares": 4,
    "ocupada": false
  },
  {
    "id": 2,
    "identificacao": "Mesa 2",
    "lugares": 6,
    "ocupada": true
  }
]
```

---

### 3.2. Buscar Mesa por ID

**GET** `/api/mesa/{id}`

**Response 200 (Success):**
```json
{
  "id": 1,
  "identificacao": "Mesa 1",
  "lugares": 4,
  "ocupada": false
}
```

**Response 404 (Not Found):**
```json
"Mesa não encontrada"
```

---

### 3.3. Criar Mesa

**POST** `/api/mesa`

**Request:**
```json
{
  "identificacao": "Mesa 10",
  "lugares": 4,
  "ocupada": false
}
```

**Response 201 (Created):**
```json
{
  "id": 10,
  "identificacao": "Mesa 10",
  "lugares": 4,
  "ocupada": false
}
```

**Headers:**
```
Location: /api/mesa/10
```

---

### 3.4. Atualizar Mesa

**PUT** `/api/mesa/{id}`

**Request:**
```json
{
  "identificacao": "Mesa VIP 1",
  "lugares": 8,
  "ocupada": true
}
```

**Response 204 (No Content)**

**Response 404 (Not Found):**
```json
"Mesa não encontrada"
```

---

### 3.5. Excluir Mesa

**DELETE** `/api/mesa/{id}`

Remove permanentemente a mesa do banco de dados.

**Response 204 (No Content)**

**Response 404 (Not Found):**
```json
"Mesa não encontrada"
```

---

## 4. Modelos de Dados

### 4.1. Mesa

```json
{
  "id": 0,
  "identificacao": "string",
  "lugares": 0,
  "ocupada": false
}
```

**Campos:**
- `id`: Identificador único (gerado automaticamente)
- `identificacao`: Nome ou número da mesa
- `lugares`: Capacidade de pessoas
- `ocupada`: Status de ocupação (true/false)

---

## 5. Regras de Negócio

### 5.1. Controle de Ocupação

- Mesa criada com `ocupada = false` por padrão
- Status alterado para `true` ao abrir comanda (PedidoService)
- Status volta para `false` ao fechar comanda (PagamentoService)

### 5.2. Validações

- `identificacao`: Obrigatório e único
- `lugares`: Maior que 0
- Não é possível excluir mesa ocupada (recomendado implementar)

---

## 6. Integração com Outros Serviços

### 6.1. PedidoService

**Fluxo de abertura de comanda:**
1. Atendente seleciona mesa disponível (`ocupada = false`)
2. PedidoService cria comanda vinculada à mesa
3. PedidoService atualiza mesa para `ocupada = true`

**Endpoint consumido:**  
`PUT /api/mesa/{id}`

### 6.2. PagamentoService

**Fluxo de fechamento:**
1. Pagamento é processado
2. PagamentoService libera mesa
3. Mesa volta para `ocupada = false`

**Endpoint consumido:**  
`PUT /api/mesa/{id}`

### 6.3. PainelService

**Dashboard de mesas:**
- Consulta todas as mesas para exibir status
- Mostra quantas mesas estão livres/ocupadas

**Endpoint consumido:**  
`GET /api/mesa`

---

## 7. Casos de Uso

### 7.1. Consultar Mesas Disponíveis

```json
GET /api/mesa
```

Filtrar no cliente por `ocupada = false`

### 7.2. Abrir Comanda em Mesa

```json
PUT /api/mesa/1

{
  "identificacao": "Mesa 1",
  "lugares": 4,
  "ocupada": true
}
```

### 7.3. Liberar Mesa

```json
PUT /api/mesa/1

{
  "identificacao": "Mesa 1",
  "lugares": 4,
  "ocupada": false
}
```

---

## 8. Testes

### 8.1. Teste Manual via Swagger

1. Acesse o Swagger do serviço
2. Execute **GET /api/mesa** para listar mesas
3. Execute **POST /api/mesa** para criar nova mesa
4. Execute **PUT /api/mesa/{id}** para alterar status
5. Verifique mudança com novo **GET**

### 8.2. Teste via arquivo .http

Utilize o arquivo `MesaService.http` (note que o arquivo está como `PainelService.http` no código):

```http
### Listar todas
GET {{base_url}}/api/mesa

### Buscar por ID
GET {{base_url}}/api/mesa/1

### Criar mesa
POST {{base_url}}/api/mesa
Content-Type: application/json

{
  "identificacao": "Mesa 15",
  "lugares": 6,
  "ocupada": false
}

### Atualizar (marcar como ocupada)
PUT {{base_url}}/api/mesa/1
Content-Type: application/json

{
  "identificacao": "Mesa 1",
  "lugares": 4,
  "ocupada": true
}

### Liberar mesa
PUT {{base_url}}/api/mesa/1
Content-Type: application/json

{
  "identificacao": "Mesa 1",
  "lugares": 4,
  "ocupada": false
}
```

---

**Última atualização:** 30/11/2025  
**Dependências:** PedidoService, PagamentoService
