# APIs e Web Services

Este documento apresenta a visão geral das APIs REST do **FoodTrack**, um sistema ERP distribuído voltado para restaurantes. O backend foi desenvolvido em **.NET 9** utilizando arquitetura de **microserviços**, permitindo escalabilidade, manutenibilidade e implantação independente de cada componente.

**Período de desenvolvimento:** Etapa 2 (26/09/2025 a 06/10/2025)

---

## 📚 Navegação: Documentação Completa de Microserviços

### Visão Geral da Arquitetura
- [Arquitetura de Microserviços](backend/arquitetura-microservicos.md) - Visão completa do sistema distribuído

### Serviços Implementados
1. [AutenticacaoService](backend/autenticacao-service.md) - JWT, login, autorização por papéis
2. [FuncionarioService](backend/funcionario-service.md) - CRUD de usuários e gestão de perfis
3. [PedidoService](backend/pedido-service.md) - Comandas, itens, envio para cozinha
4. [PratoService](backend/prato-service.md) - Cardápio, categorias, disponibilidade
5. [MesaService](backend/mesa-service.md) - Controle de mesas e ocupação
6. [PagamentoService](backend/pagamento-service.md) - Processamento, divisão, integração
7. [NotificacaoService](backend/notificacao-service.md) - Alertas de pedidos prontos
8. [PainelService](backend/painel-service.md) - Dashboard e métricas em tempo real
9. [RelatorioService](backend/relatorio-service.md) - Analytics e relatórios gerenciais

### Integração
- [Integração entre Serviços](backend/integracao-servicos.md) - Comunicação HTTP/REST e padrões

---

## Visão Geral do Sistema

O FoodTrack utiliza uma arquitetura de microserviços onde cada serviço é responsável por um domínio específico do negócio. Cada microserviço:


- É independente e pode ser executado isoladamente
- Expõe APIs REST padronizadas (JSON)
- Possui seu próprio banco de dados MySQL
- É documentado via Swagger/OpenAPI
- Utiliza autenticação JWT (exceto AutenticacaoService)

### Tecnologias Utilizadas

- **Framework:** .NET 9
- **Linguagem:** C#
- **Banco de Dados:** MySQL 8.0+
- **ORM:** Entity Framework Core
- **Documentação:** Swagger/OpenAPI
- **Autenticação:** JWT (JSON Web Tokens)
- **Comunicação:** HTTP/REST (JSON)
- **Arquivos de teste:** `.http` files (VS Code REST Client)

---

## Microserviços Implementados

Cada microserviço possui documentação detalhada em `docs/backend/` com informações completas sobre endpoints, exemplos de request/response, configuração de portas e casos de uso.

### 1. AutenticacaoService
**Responsável:** Isabela Lima  
**Função:** Autenticação de usuários e geração de tokens JWT  
**Documentação completa:** [autenticacao-service.md](backend/autenticacao-service.md)

**Histórico de desenvolvimento:**
- 26/09/2025: Configuração inicial e estrutura do serviço

### 2. FuncionarioService
**Responsável:** Gilberto Modesto  
**Função:** CRUD completo de funcionários do sistema  
**Documentação completa:** [funcionario-service.md](backend/funcionario-service.md)

**Histórico de desenvolvimento:**
- 04/10/2025: Api funcionarioService concluída
- 05/10/2025: MicroServiço funcionarioService ok
- 05/10/2025: Nova atualização funcionarioService
- 20/10/2025: Nova atualização funcionarioService, tudo ok

### 3. PedidoService
**Responsável:** Warley Martins  
**Função:** Gestão de pedidos, comandas e itens  
**Documentação completa:** [pedido-service.md](backend/pedido-service.md)

**Histórico de desenvolvimento:**
- 05/10/2025: inclusão pedidos
- 05/10/2025: nome das apis
- 05/10/2025: remoção de documentação
- 05/10/2025: Merge pull request #2 from pedidos

### 4. PagamentoService
**Responsável:** Maria Eduarda Sousa  
**Função:** Processamento de pagamentos e fechamento de comandas  
**Documentação completa:** [pagamento-service.md](backend/pagamento-service.md)

**Histórico de desenvolvimento:**
- 05/10/2025: implementação de pagamentos
- 05/10/2025: merge main
- 05/10/2025: Merge pull request #3 from pagamentos

### 5. RelatorioService
**Responsável:** Luana Paula  
**Função:** Geração de relatórios de vendas e analytics  
**Documentação completa:** [relatorio-service.md](backend/relatorio-service.md)

**Histórico de desenvolvimento:**
- 05/10/2025: Atualização do RelatorioService e integração com Swagger

### 6. NotificacaoService
**Responsável:** Guilherme Lanza  
**Função:** Notificações de pedidos prontos para entrega  
**Documentação completa:** [notificacao-service.md](backend/notificacao-service.md)

**Histórico de desenvolvimento:**
- 05/10/2025: Add files via upload (3 commits)
- 06/10/2025: Update backend-apis.md

### 7. PainelService
**Responsável:** Gilberto Modesto  
**Função:** Dashboard com métricas em tempo real  
**Documentação completa:** [painel-service.md](backend/painel-service.md)

**Histórico de desenvolvimento:**
- 30/10/2025: atualização painel service
- 01/11/2025: PainelService atualizado e ok

### 8. MesaService
**Responsável:** Isabela Lima (estrutura inicial)  
**Função:** Controle de mesas e ocupação  
**Documentação completa:** [mesa-service.md](backend/mesa-service.md)

### 9. PratoService
**Responsável:** Isabela Lima (estrutura inicial)  
**Função:** Gerenciamento do cardápio  
**Documentação completa:** [prato-service.md](backend/prato-service.md)

---

## Arquitetura de Comunicação

```
Frontend (React Native + Expo)
    ↓ HTTP/REST (Axios)
┌─────────────────────────────────────┐
│     Microserviços .NET 9            │
│  ┌────────────────────────────────┐ │
│  │ AutenticacaoService            │ │ ← Login, JWT
│  │ FuncionarioService             │ │ ← CRUD usuários
│  │ PedidoService                  │ │ ← Comandas, itens
│  │ PagamentoService               │ │ ← Pagamentos
│  │ RelatorioService               │ │ ← Analytics
│  │ NotificacaoService             │ │ ← Alertas
│  │ PainelService                  │ │ ← Dashboard
│  │ MesaService                    │ │ ← Mesas
│  │ PratoService                   │ │ ← Cardápio
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘
    ↓
MySQL 8.0+ (Bancos independentes)
```

---

## Considerações de Segurança

### Autenticação e Autorização
- **JWT (JSON Web Tokens)** gerado pelo AutenticacaoService
- Token incluído em header `Authorization: Bearer {token}` em todos os serviços (exceto login)
- Senhas armazenadas com hash **bcrypt** no FuncionarioService

### Comunicação
- **HTTP** em desenvolvimento local (rede 192.168.1.x)
- **HTTPS obrigatório** em produção
- Validação de dados no backend

### Boas Práticas Implementadas
- Prepared statements (Entity Framework) para prevenir SQL Injection
- Validação de inputs
- Logs de operações críticas
- Tratamento de erros padronizado

---

## Implantação

### Desenvolvimento Local

Cada microserviço pode ser executado independentemente:

```bash
# Exemplo: FuncionarioService
cd src/FuncionarioService
dotnet run
```

**Acesso via Swagger:** Cada serviço expõe documentação Swagger em `/swagger`. Consulte a documentação específica de cada microserviço em `docs/backend/` para URLs e portas.

### Requisitos
- .NET 9 SDK
- MySQL 8.0+
- Visual Studio 2022 ou VS Code

### Configuração
Cada serviço possui `appsettings.json` e `appsettings.Development.json` para configuração de:
- Connection strings (MySQL)
- Portas de execução
- Configurações de JWT
- CORS

**Nota:** Para detalhes específicos de configuração, endpoints e portas de cada microserviço, consulte a documentação individual em `docs/backend/`.

---

## Testes

### Testes Manuais
Todos os serviços foram testados via:
- **Swagger UI** (interface web)
- **Arquivos `.http`** (VS Code REST Client)

### Fluxos Testados
1. **Autenticação:** Login → Geração de token JWT
2. **Funcionários:** CRUD completo validado
3. **Pedidos:** Criação, listagem, atualização de status, cancelamento
4. **Pagamentos:** Processamento com 3 formas de pagamento
5. **Relatórios:** Consulta de dados de vendas
6. **Notificações:** Criação, listagem de pendentes, marcação de entrega

### Documentação Detalhada
Cada microserviço possui documentação específica em `docs/backend/` com:
- Endpoints completos
- Exemplos de request/response
- Códigos de status HTTP
- Casos de teste documentados

---

## Planejamento

### Desenvolvimento Backend - Etapa 2 (26/09 - 06/10/2025)

Atualizado em: 30/11/2025

| Responsável          | Atividades Realizadas                                                                                      | Status |
| :------------------- | :--------------------------------------------------------------------------------------------------------- | :----: |
| Isabela Lima         | Criação da estrutura de microserviços, configuração inicial AutenticacaoService, organização do repositório | ✔️ |
| Gilberto Modesto     | Desenvolvimento FuncionarioService (CRUD completo), atualização e implementação PainelService               | ✔️ |
| Warley Martins       | Desenvolvimento PedidoService (comandas e itens) - microserviço crítico para o fluxo operacional           | ✔️ |
| Maria Eduarda        | Desenvolvimento PagamentoService (processamento de pagamentos e fechamento de comandas)                    | ✔️ |
| Luana Paula          | Desenvolvimento RelatorioService com integração Swagger (analytics e relatórios gerenciais)                | ✔️ |
| Guilherme Lanza      | Desenvolvimento NotificacaoService, revisão de código, documentação detalhada backend-apis.md              | ✔️ |

---

**Legenda:**  
- ✔️: terminado  
- 📝: em execução  
- ⌛: atrasado  
- ❌: não iniciado

---

## Referências

- Documentação .NET 9: https://docs.microsoft.com/dotnet/
- Entity Framework Core: https://docs.microsoft.com/ef/core/
- Swagger/OpenAPI: https://swagger.io/specification/
- JWT: https://jwt.io/
- MySQL Documentation: https://dev.mysql.com/doc/
- REST API Design Best Practices: https://restfulapi.net/
- Microservices Architecture Pattern: https://microservices.io/

---
