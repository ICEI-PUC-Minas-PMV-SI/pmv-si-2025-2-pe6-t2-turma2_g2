# AutenticacaoService

## 1. Visão Geral

O **AutenticacaoService** é responsável pela autenticação de usuários no sistema FoodTrack, gerando tokens JWT que autorizam acesso aos demais microserviços.

---

## 2. Responsabilidades

- Validar credenciais de login (usuário/senha)
- Integrar com FuncionarioService para validação de usuários
- Gerar tokens JWT com claims de usuário e função
- Fornecer tokens para autorização nos demais serviços

---

## 3. Endpoints

### 3.1. Login

**POST** `/api/autenticacao/login`

Autentica um usuário e retorna um token JWT válido por 2 horas.

**Request:**
```json
{
  "usuario": "string",
  "senha": "string"
}
```

**Response 200 (Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response 401 (Unauthorized):**
```json
"Usuário ou senha inválidos"
```

**Fluxo:**
1. Recebe credenciais do usuário
2. Consulta FuncionarioService para validar usuário
3. Compara senha informada com senha cadastrada
4. Gera token JWT com claims (Name, Role)
5. Retorna token com validade de 2 horas

---

## 4. Modelos de Dados

### 4.1. Login (Request)

```json
{
  "usuario": "string",
  "senha": "string"
}
```

### 4.2. FuncionarioDto (Interno)

```json
{
  "idFuncionario": 0,
  "nome": "string",
  "usuario": "string",
  "senha": "string",
  "funcao": "string"
}
```

### 4.3. Token Response

```json
{
  "token": "string"
}
```

---

## 5. JWT Claims

O token gerado contém as seguintes claims:

```json
{
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "usuario_aqui",
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "Atendente",
  "exp": 1234567890
}
```

**Claims:**
- `Name`: Nome de usuário
- `Role`: Função do usuário (Atendente, Cozinha, Caixa, Gerente, Admin)
- `exp`: Expiração do token (2 horas após geração)

---

## 6. Integração com Outros Serviços

### 6.1. FuncionarioService

O AutenticacaoService consome o FuncionarioService para validar credenciais:

**Endpoint consumido:**  
`GET /api/funcionario/usuario/{usuario}`

**Fluxo:**
1. AutenticacaoService recebe login
2. Faz requisição ao FuncionarioService
3. FuncionarioService retorna dados do usuário
4. AutenticacaoService valida senha e gera token

### 6.2. Uso do Token pelos Serviços

Todos os microserviços validam o token JWT:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Serviços protegidos:**
- PedidoService
- PagamentoService
- RelatorioService
- PainelService
- Etc.

---

## 7. Configuração

### 7.1. appsettings.json

```json
{
  "Jwt": {
    "Key": "base64_encoded_secret_key"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=foodtrack;User=root;Password=senha;"
  }
}
```

---

## 8. Segurança

### 8.1. Validação de Senha
- Comparação direta da senha (plaintext)
- ⚠️ **Recomendação futura:** Implementar hash de senhas (BCrypt, PBKDF2)

### 8.2. Token JWT
- Algoritmo: HMAC-SHA256
- Validade: 2 horas
- Chave simétrica armazenada em base64
- Claims incluem usuário e função

---

## 9. Funções (Roles) Disponíveis

| Função | Descrição | Uso Típico |
|--------|-----------|------------|
| **Atendente** | Garçom/atendente | Comandas, pedidos |
| **Cozinha** | Equipe da cozinha | KDS, status de preparo |
| **Caixa** | Operador de caixa | Pagamentos, fechamento |
| **Gerente** | Gerente do restaurante | Relatórios, configurações |
| **Admin** | Administrador | Acesso total ao sistema |

---

## 10. Testes

### 10.1. Teste Manual via Swagger

1. Acesse o Swagger do serviço
2. Execute **POST /api/autenticacao/login**
3. Use credenciais de teste
4. Copie o token retornado
5. Use o token em outros serviços

### 10.2. Teste via arquivo .http

Utilize o arquivo `AutenticacaoService.http` disponível no código-fonte:

```http
POST {{base_url}}/api/autenticacao/login
Content-Type: application/json

{
  "usuario": "admin",
  "senha": "senha123"
}
```

---

**Última atualização:** 30/11/2025  
**Dependências:** FuncionarioService
