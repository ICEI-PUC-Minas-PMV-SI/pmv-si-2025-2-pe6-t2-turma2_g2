# FuncionarioService

## 1. Visão Geral

O **FuncionarioService** gerencia o cadastro e manutenção de funcionários/usuários do sistema FoodTrack, fornecendo operações de CRUD e consultas para validação de autenticação.

---

## 2. Responsabilidades

- CRUD completo de funcionários
- Consulta de funcionários por ID
- Consulta por nome de usuário (para autenticação)
- Gestão de dados de usuários (nome, usuário, senha, função)

---

## 3. Endpoints

### 3.1. Listar Todos os Funcionários

**GET** `/api/funcionario`

**Autorização:** Requer token JWT

Lista todos os funcionários cadastrados no sistema.

**Response 200 (Success):**
```json
[
  {
    "idFuncionario": 1,
    "nome": "João Silva",
    "usuario": "joao.silva",
    "funcao": "Atendente"
  },
  {
    "idFuncionario": 2,
    "nome": "Maria Santos",
    "usuario": "maria.santos",
    "funcao": "Cozinha"
  }
]
```

---

### 3.2. Buscar Funcionário por ID

**GET** `/api/funcionario/{id}`

**Autorização:** Requer token JWT

**Response 200 (Success):**
```json
{
  "idFuncionario": 1,
  "nome": "João Silva",
  "usuario": "joao.silva",
  "funcao": "Atendente"
}
```

**Response 404 (Not Found):**
```json
"Funcionário não encontrado"
```

---

### 3.3. Buscar Funcionário por Nome de Usuário

**GET** `/api/funcionario/usuario/{usuario}`

**Autorização:** Não requer (AllowAnonymous)

Endpoint utilizado pelo AutenticacaoService para validar login.

**Response 200 (Success):**
```json
{
  "idFuncionario": 1,
  "nome": "João Silva",
  "usuario": "joao.silva",
  "senha": "senha123",
  "funcao": "Atendente"
}
```

**Response 404 (Not Found):**
```json
"Usuário não encontrado"
```

---

### 3.4. Criar Funcionário

**POST** `/api/funcionario`

**Autorização:** Requer token JWT

**Request:**
```json
{
  "nome": "Carlos Oliveira",
  "usuario": "carlos.oliveira",
  "senha": "senha456",
  "funcao": "Caixa"
}
```

**Response 201 (Created):**
```json
{
  "idFuncionario": 3,
  "nome": "Carlos Oliveira",
  "usuario": "carlos.oliveira",
  "funcao": "Caixa"
}
```

**Headers:**
```
Location: /api/funcionario/3
```

---

### 3.5. Atualizar Funcionário

**PUT** `/api/funcionario/{id}`

**Autorização:** Requer token JWT

**Request:**
```json
{
  "nome": "João Silva Santos",
  "usuario": "joao.silva",
  "senha": "novaSenha123",
  "funcao": "Gerente"
}
```

**Response 204 (No Content)**

**Response 404 (Not Found):**
```json
"Funcionário não encontrado"
```

---

### 3.6. Excluir Funcionário

**DELETE** `/api/funcionario/{id}`

**Autorização:** Requer token JWT

Remove permanentemente o funcionário do banco de dados.

**Response 204 (No Content)**

**Response 404 (Not Found):**
```json
"Funcionário não encontrado"
```

---

## 4. Modelos de Dados

### 4.1. Funcionario

```json
{
  "idFuncionario": 0,
  "nome": "string",
  "usuario": "string",
  "senha": "string",
  "funcao": "string"
}
```

**Campos:**
- `idFuncionario`: Identificador único (gerado automaticamente)
- `nome`: Nome completo do funcionário
- `usuario`: Nome de usuário único para login
- `senha`: Senha em texto plano (⚠️ recomenda-se hash)
- `funcao`: Função/papel do funcionário

---

## 5. Funções (Roles) Disponíveis

| Função | Descrição | Uso Típico |
|--------|-----------|------------|
| **Atendente** | Garçom/atendente | Comandas, pedidos |
| **Cozinha** | Equipe da cozinha | KDS, status de preparo |
| **Caixa** | Operador de caixa | Pagamentos, fechamento |
| **Gerente** | Gerente do restaurante | Relatórios, configurações |
| **Admin** | Administrador | Acesso total ao sistema |

---

## 6. Integração com Outros Serviços

### 6.1. AutenticacaoService

O AutenticacaoService consome este serviço para validar login:

**Endpoint consumido:**  
`GET /api/funcionario/usuario/{usuario}`

**Fluxo:**
1. AutenticacaoService recebe tentativa de login
2. Consulta FuncionarioService pelo nome de usuário
3. FuncionarioService retorna dados completos do funcionário
4. AutenticacaoService compara senha e gera token JWT

### 6.2. Outros Serviços

- **PedidoService**: Relaciona pedidos ao atendente/funcionário
- **RelatorioService**: Gera relatórios por funcionário
- **PainelService**: Exibe métricas por usuário

---

## 7. Segurança

### 7.1. Autenticação JWT
- Todos os endpoints (exceto `GET /usuario/{usuario}`) requerem token JWT válido
- Token deve ser enviado no header: `Authorization: Bearer {token}`
- Token gerado pelo AutenticacaoService

### 7.2. Armazenamento de Senha
- ⚠️ **Atual:** Senhas armazenadas em texto plano
- ⚠️ **Recomendação:** Implementar hash de senhas (BCrypt, PBKDF2)

---

## 8. Configuração

### 8.1. appsettings.json

```json
{
  "Jwt": {
    "Key": "base64_encoded_secret_key"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=servidor;Database=foodtrack;User=usuario;Password=senha;"
  }
}
```

---

## 9. Testes

### 9.1. Teste Manual via Swagger

1. Acesse o Swagger do serviço
2. Faça login no AutenticacaoService para obter token
3. Clique em "Authorize" no Swagger
4. Insira: `Bearer {seu_token}`
5. Execute os endpoints desejados

### 9.2. Teste via arquivo .http

Utilize o arquivo `FuncionarioService.http`:

```http
### Listar todos
GET {{base_url}}/api/funcionario
Authorization: Bearer {{token}}

### Buscar por usuário
GET {{base_url}}/api/funcionario/usuario/joao.silva

### Criar funcionário
POST {{base_url}}/api/funcionario
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "nome": "Novo Funcionário",
  "usuario": "novo.usuario",
  "senha": "senha123",
  "funcao": "Atendente"
}
```

---

**Última atualização:** 30/11/2025  
**Dependências:** AutenticacaoService (para geração de tokens)
