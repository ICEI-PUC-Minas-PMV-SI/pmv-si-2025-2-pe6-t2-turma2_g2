# Arquitetura de Microserviços - FoodTrack

## 1. Visão Geral

O FoodTrack utiliza uma arquitetura baseada em microserviços, onde cada serviço é responsável por uma funcionalidade específica do sistema. Esta abordagem permite escalabilidade, manutenibilidade e desenvolvimento independente de cada módulo.

## 2. Stack Tecnológico

### Backend
- **.NET 9** (ASP.NET Core Web API)
- **C#** como linguagem principal
- **MySQL 8.0+** como banco de dados
- **Redis** para cache (planejado)
- **JWT** para autenticação e autorização

### Ferramentas e Frameworks
- **Swagger/OpenAPI** para documentação de APIs
- **Entity Framework Core** (ou Dapper) para acesso a dados
- **Serilog** para logging
- **xUnit** para testes

## 3. Microserviços

### 3.1. AutenticacaoService
**Responsabilidade:** Autenticação e autorização de usuários
**Banco de dados:** Acesso à tabela `funcionario`

### 3.2. FuncionarioService
**Responsabilidade:** CRUD de funcionários e gestão de usuários
**Banco de dados:** Tabela `funcionario`

### 3.3. PedidoService
**Responsabilidade:** Gestão de pedidos, comandas e itens
**Banco de dados:** Tabelas `comanda`, `pedido`, `pedido_item`, `pedido_item_acrescimo`

### 3.4. PratoService
**Responsabilidade:** Catálogo de pratos, ingredientes e categorias
**Banco de dados:** Tabelas `prato`, `ingrediente`, `categoria`, `acrescimo`

### 3.5. MesaService
**Responsabilidade:** Controle de mesas e status
**Banco de dados:** Tabela `mesa`

### 3.6. PagamentoService
**Responsabilidade:** Processamento de pagamentos
**Banco de dados:** Tabelas `pagamento`, `meio_pagamento`, `status_pagamento`

### 3.7. NotificacaoService
**Responsabilidade:** Sistema de notificações em tempo real
**Banco de dados:** Tabela `notificacao`

### 3.8. PainelService
**Responsabilidade:** Dashboard e KDS (Kitchen Display System)
**Banco de dados:** Consultas agregadas

### 3.9. RelatorioService
**Responsabilidade:** Geração de relatórios gerenciais
**Banco de dados:** Consultas agregadas de múltiplas tabelas

## 4. Diagrama de Arquitetura

```
![Arquitetura](img/arquitetura/Diagrama-Arquitetura2.png)

Cliente Mobile/Web
        ↓
   API Gateway (planejado)
        ↓
   ┌────────────────────────────────────┐
   │    Camada de Microserviços         │
   ├────────────────────────────────────┤
   │ AutenticacaoService                │
   │ FuncionarioService                 │
   │ PedidoService                      │
   │ PratoService                       │
   │ MesaService                        │
   │ PagamentoService                   │
   │ NotificacaoService                 │
   │ PainelService                      │
   │ RelatorioService                   │
   └────────────────────────────────────┘
        ↓
   MySQL Database
        ↓
   Redis Cache (planejado)
```

## 5. Padrões e Convenções

### 5.1. Estrutura de Projeto
Cada microserviço segue a estrutura:
```
ServiceName/
├── Controllers/        # Endpoints da API
├── Models/             # DTOs e entidades
├── Services/           # Lógica de negócio (se necessário)
├── Data/               # Contexto de dados
├── Properties/         # Configurações
├── Program.cs          # Configuração e startup
├── appsettings.json    # Configurações
└── *.http              # Testes HTTP
```

### 5.2. Nomenclatura de Endpoints
- Usar substantivos no plural: `/api/Pratos`, `/api/Pedidos`
- Verbos HTTP semânticos: GET, POST, PUT, PATCH, DELETE
- Usar IDs na rota: `/api/Pedidos/{id}`

### 5.3. Códigos de Status HTTP
- `200 OK` - Sucesso em GET, PUT, PATCH
- `201 Created` - Sucesso em POST
- `204 No Content` - Sucesso sem corpo de resposta
- `400 Bad Request` - Erro de validação
- `401 Unauthorized` - Não autenticado
- `403 Forbidden` - Não autorizado
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro no servidor

## 6. Comunicação entre Serviços

### 6.1. Comunicação Síncrona
- **HTTP/REST** para comunicação direta entre serviços
- Chamadas via `HttpClient`

### 6.2. Comunicação Assíncrona (Planejado)
- **Message Broker** (RabbitMQ)
- Eventos de domínio para desacoplar serviços

## 7. Segurança

### 7.1. Autenticação JWT
- Token gerado pelo `AutenticacaoService`
- Validado por todos os serviços
- Header: `Authorization: Bearer {token}`

### 7.2. Autorização
- Baseada em roles (RBAC)
- Roles: Admin, Gerente, Atendente, Cozinha, Caixa

### 7.3. HTTPS
- Todas as comunicações via TLS
- Certificados SSL em produção

## 8. Banco de Dados

### 8.1. Estratégia
- **Banco compartilhado** atualmente

### 8.2. Conexão
- Connection string em `appsettings.json`
- Pool de conexões configurado

## 9. Deploy e Escalabilidade

### 9.1. Containerização (Planejado)
- Docker para cada microserviço
- Docker Compose para desenvolvimento local

### 9.2. Orquestração (Planejado)
- Kubernetes para produção
- Escalabilidade horizontal

### 9.3. CI/CD (Planejado)
- GitHub Actions
- Deploy automático

## 11. Referências

- [Documentação .NET 9](https://docs.microsoft.com/dotnet/)
- [Microservices Patterns - Chris Richardson](https://microservices.io/)
- [Building Microservices - Sam Newman](https://www.oreilly.com/library/view/building-microservices/9781491950340/)
- [REST API Best Practices](https://restfulapi.net/)

---

**Última atualização:** 30/11/2025
