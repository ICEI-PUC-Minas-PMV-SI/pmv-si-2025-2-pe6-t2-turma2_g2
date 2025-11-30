# Código Fonte - FoodTrack

Este diretório contém o código-fonte completo do **FoodTrack**, incluindo 9 microserviços backend em .NET 9 e o aplicativo mobile em React Native.

---

## 📚 Documentação Técnica

> **Importante:** Para informações detalhadas sobre instalação, configuração, endpoints e execução de cada serviço, consulte a documentação específica em `docs/backend/`.

### Arquitetura e Visão Geral
- [Voltar ao README Principal](../README.md)
- [Arquitetura de Microserviços](../docs/backend/arquitetura-microservicos.md) - Visão completa do sistema
- [Integração entre Serviços](../docs/backend/integracao-servicos.md) - Como os serviços se comunicam

### Documentação de Cada Microserviço
Cada documento contém: objetivos, endpoints, instalação, configuração e testes específicos.

- [AutenticacaoService](../docs/backend/autenticacao-service.md) - JWT, login, autorização
- [FuncionarioService](../docs/backend/funcionario-service.md) - Gestão de usuários
- [PedidoService](../docs/backend/pedido-service.md) - Comandas e pedidos
- [PratoService](../docs/backend/prato-service.md) - Cardápio e ingredientes
- [MesaService](../docs/backend/mesa-service.md) - Controle de mesas
- [PagamentoService](../docs/backend/pagamento-service.md) - Processamento de pagamentos
- [NotificacaoService](../docs/backend/notificacao-service.md) - Alertas e notificações
- [PainelService](../docs/backend/painel-service.md) - Dashboard e métricas
- [RelatorioService](../docs/backend/relatorio-service.md) - Relatórios gerenciais

### Frontend
- [Frontend Mobile](../docs/frontend-mobile.md) - Aplicativo React Native completo
- [Frontend Web](../docs/frontend-web.md) - Interface web
- [Wireframes Mobile](../docs/interface/wireframes-mobile.md)
- [Wireframes Web](../docs/interface/wireframes-web.md)

### Processos e Testes
- [Modelagem BPMN](../docs/processos/modelagem-bpmn.md) - 10 processos de negócio
- [Testes de Integração](../docs/testes/testes-integracao.md)

---

## 🏗️ Estrutura do Projeto

### Backend - Microserviços (.NET 9)

```
src/
├── FoodTrack.sln                    # Solution principal
├── AutenticacaoService/             # JWT, login, autorização
├── FuncionarioService/              # CRUD de usuários e perfis
├── PedidoService/                   # Comandas e pedidos
├── PratoService/                    # Cardápio e ingredientes
├── MesaService/                     # Controle de mesas
├── PagamentoService/                # Processamento de pagamentos
├── NotificacaoService/              # Alertas de pedidos prontos
├── PainelService/                   # Dashboard e métricas
└── RelatorioService/                # Relatórios gerenciais
```

### Frontend - Mobile (React Native + Expo)

```
src/foodtrack/
├── app/                             # Telas do aplicativo
│   ├── login.tsx                    # Autenticação
│   ├── dashboard.tsx                # Dashboard principal
│   ├── pedidos.tsx                  # Gestão de pedidos
│   ├── kds.tsx                      # Kitchen Display System
│   ├── pagamento.tsx                # Fechamento de conta
│   ├── relatorio.tsx                # Relatórios
│   └── funcionarios.tsx             # Gestão de usuários
├── context/                         # Context API (Auth)
├── services/                        # Integração com APIs
└── theme/                           # Estilização
```

---

## 🚀 Tecnologias Utilizadas

### Backend
- **.NET 9** (ASP.NET Core Web API)
- **MySQL 8.0+** (Banco de dados relacional)
- **JWT** (Autenticação e autorização)
- **Swagger/OpenAPI** (Documentação de APIs)

### Frontend Mobile
- **React Native 0.72+**
- **Expo** (Development framework)
- **TypeScript**
- **React Navigation** (Navegação)
- **Axios** (Client HTTP)

---

## 📊 Status de Desenvolvimento

### Microserviços Implementados
- ✅ **AutenticacaoService** - JWT funcional
- ✅ **NotificacaoService** - 100% testado (Guilherme Lanza)
- ✅ **PedidoService** - CRUD completo
- ✅ **PratoService** - Cardápio funcional
- ✅ **MesaService** - Controle de mesas
- ✅ **PagamentoService** - Processamento básico
- ✅ **FuncionarioService** - Em desenvolvimento
- ✅ **PainelService** - Estrutura criada
- ✅ **RelatorioService** - Estrutura criada

### Frontend Mobile
- ✅ Login e autenticação
- ✅ Dashboard
- ✅ Gestão de pedidos
- ✅ KDS (Kitchen Display)
- ✅ Pagamento
- ✅ Relatórios básicos
- ⏳ Notificações push (planejado)
---

## 📝 Histórico de Versões

### [0.4.0] - 30/11/2025
#### Adicionado
- Documentação completa de microserviços em docs/backend/
- Wireframes mobile e web
- Modelagem BPMN
- Testes de integração documentados
- Integração mobile-backend

### [0.3.0] - 27/10/2025
#### Adicionado
- Frontend web
- Integração web-backend
- Wireframes web

### [0.2.0] - 06/10/2025
#### Adicionado
- 9 microserviços backend em .NET 9
- Swagger em todos os serviços

### [0.1.0] - 24/08/2025
#### Adicionado
- Estrutura inicial do projeto
- Documentação de contexto
- Definição de requisitos

---
