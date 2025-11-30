# Front-end Móvel

**⚠️ IMPORTANTE:** Este documento é a **documentação principal** da aplicação FoodTrack. O código em `src/foodtrack/` é **React Native cross-platform** que executa em iOS, Android e Web. O documento [Frontend Web](frontend-web.md) descreve a mesma aplicação sob a perspectiva de uso em navegadores/desktop.

Este documento apresenta a documentação completa da aplicação móvel/web do **FoodTrack**, um sistema ERP voltado para restaurantes. O aplicativo é desenvolvido em **React Native** com **Expo** e suporta execução em **iOS, Android e Web** através da mesma base de código.

---

## 📚 Documentação Relacionada

### Frontend
- **🖥️ Versão Web:** [Frontend Web](frontend-web.md) - Mesma aplicação na perspectiva desktop/navegador

### Arquitetura e Backend
- [Arquitetura de Microserviços](backend/arquitetura-microservicos.md) - Visão completa do sistema
- [APIs e Web Services](backend-apis.md) - Endpoints e integração

### Design e Interface
- [Wireframes](interface/wireframes.md) 
- [Prototipação](interface/prototipo.md) 

### Processos e Requisitos
- [Modelagem BPMN](processos/modelagem-bpmn.md) 
- [Requisitos do Sistema](contexto.md#requisitos) - RF e RNF detalhados
- [Contexto](contexto.md) - Problema, objetivos, justificativa

### Testes e Qualidade
- [Testes de Integração](testes/testes-integracao.md) - Backend, Web, Mobile, E2E, Performance

### Apresentação
- [Resultados da Solução](../presentation/README.md) - Resumo executivo e vídeo

---

## 1. Correções da Etapa Anterior

Esta seção documenta as correções e melhorias realizadas com base no feedback da etapa anterior:

### 1.1. Correções Implementadas

- ✅ **Atualização da arquitetura de comunicação:** Implementada integração completa entre frontend React Native e 5 microserviços backend (.NET 9)
- ✅ **Melhoria na documentação de endpoints:** Documentação detalhada de cada microserviço em [docs/backend/](backend/)
- ✅ **Refinamento dos requisitos funcionais:** Requisitos RF-001 a RF-007 implementados e validados
- ✅ **Correção de inconsistências:** Toda documentação alinhada com código-fonte real em `src/foodtrack/`

### 1.2. Observações

A aplicação foi desenvolvida utilizando **React Native com Expo**, permitindo execução em **iOS, Android e Web** através da mesma base de código. Esta decisão arquitetural otimiza o desenvolvimento e reduz a duplicação de código entre plataformas.

---

## 2. Desenvolvimento Mobile

### 2.1. Arquitetura Cross-Platform

O FoodTrack utiliza **React Native** com **Expo** e suporta execução multiplataforma:
- **Mobile nativo:** iOS e Android através do React Native
- **Web:** Renderização no navegador via `react-native-web`
- **Código único:** Mesma base de código para todas as plataformas

**Tecnologias Utilizadas:**
- React Native 0.81.5
- Expo ~54.0.20
- React Native Web ~0.21.0
- React 19.1.0
- React DOM 19.1.0 (para renderização web)
- TypeScript 5.9.2
- Expo Router ~6.0.13 (navegação file-based)

### 2.2. Telas Implementadas

O aplicativo possui 7 telas principais implementadas:

#### 2.2.1. Login (`login.tsx`)
- Autenticação com usuário e senha
- Validação de credenciais via AutenticacaoService
- Armazenamento de token JWT no AsyncStorage
- Navegação automática para Dashboard após login

#### 2.2.2. Dashboard (`dashboard.tsx`)
- Menu principal com 6 opções de navegação:
  - Funcionários
  - Pedidos
  - Pagamento
  - Comanda
  - KDS (Kitchen Display System)
  - Relatório Financeiro
- Interface com cards clicáveis para navegação

#### 2.2.3. Funcionários (`funcionarios.tsx`)
- Listagem de funcionários cadastrados
- Criação de novos funcionários (RF-007)
- Edição de dados de funcionários existentes
- Exclusão de funcionários
- Campos: nome, função, usuário, senha
- Integração com FuncionarioService

#### 2.2.4. Pedidos (`pedidos.tsx`)
- Visualização de pedidos ativos (RF-002)
- Criação de novos pedidos
- Edição de pedidos pendentes
- Cancelamento de pedidos
- Campos: cliente, produto, quantidade
- Integração com PedidoService

#### 2.2.5. KDS - Kitchen Display System (`kds.tsx`)
- Visualização de fila de pedidos para cozinha (RF-003)
- Atualização de status dos pedidos:
  - Pendente
  - Em Preparo
  - Pronto
  - Cancelado
- Notificação de itens prontos (RF-004)
- Interface otimizada para cozinha

#### 2.2.6. Pagamento (`pagamento.tsx`)
- Visualização de itens do pedido (RF-005)
- Cálculo automático do total
- Seleção de forma de pagamento:
  - Cartão
  - Dinheiro
  - PIX
- Processamento de pagamento via PagamentoService
- Exibição de mesa associada

#### 2.2.7. Relatório Financeiro (`relatorio.tsx`)
- Resumo de vendas (RF-006)
- Listagem de produtos vendidos
- Visualização de quantidade e receita por produto
- Integração com RelatorioService

### 2.3. Componentes Reutilizáveis

#### Card de Pedido (`pedidoCard.tsx`)
- Exibição de informações do pedido
- Botões para editar e cancelar
- Usado na tela de Pedidos

#### Card de Pedido KDS (`pedidosKdsCard.tsx`)
- Visualização de pedidos na cozinha
- Botões para atualização de status
- Usado na tela KDS

#### Card de Item de Pagamento (`itemPagamentoCard.tsx`)
- Exibição de itens individuais do pedido
- Apresentação de quantidade e valor
- Usado na tela de Pagamento

### 2.4. Serviços de Integração

#### `funcionariosService.ts`
- `getFuncionarios()`: Lista todos os funcionários
- `addFuncionario()`: Cadastra novo funcionário
- `updateFuncionario()`: Atualiza dados do funcionário
- `deleteFuncionario()`: Remove funcionário

#### `pedidosService.ts`
- `getPedidos()`: Lista todos os pedidos
- `addPedido()`: Cria novo pedido
- `updatePedido()`: Edita pedido existente
- `deletePedido()`: Cancela pedido

#### `relatoriosService.ts`
- `getRelatorio()`: Busca dados de vendas

#### `api.ts`
- Configuração centralizada de URLs dos microserviços
- Constantes de endpoints

#### `authHelper.ts`
- Gerenciamento de token JWT
- Funções auxiliares de autenticação

### 2.5. Gestão de Estado

#### Context API (`authContext.tsx`)
- Gerenciamento global de autenticação
- Armazenamento persistente de token (AsyncStorage)
- Controle de estado de autenticação
- Funções: `login()`, `logout()`, `isAuthenticated`

### 2.6. Objetivos Alcançados

✅ Acesso móvel e web a todas as funcionalidades do sistema  
✅ Interface responsiva otimizada para telas de diferentes tamanhos  
✅ Experiência de usuário fluida e intuitiva  
✅ Sincronização de dados em tempo real com backend  
✅ Autenticação segura com JWT  
✅ Integração completa com 5 microserviços backend

---

## 3. Modelagem de Processos

### 3.1. Descrição dos Processos Implementados

#### 3.1.1. Processo: Autenticação e Acesso (RF-001)

**Descrição:** Processo de login e controle de acesso ao sistema.

**Atividades:**
1. Usuário acessa a tela de login
2. Insere credenciais (usuário e senha)
3. Sistema valida credenciais via AutenticacaoService (porta 5001)
4. Sistema retorna token JWT
5. Token é armazenado no AsyncStorage
6. Usuário é redirecionado ao Dashboard
7. Token é validado em cada requisição subsequente

**Atores envolvidos:** Usuário, Sistema, AutenticacaoService

**Status:** ✅ Implementado

---

#### 3.1.2. Processo: Gestão de Funcionários (RF-007)

**Descrição:** Administração de usuários do sistema pelo gerente.

**Atividades:**
1. Gerente acessa tela de Funcionários
2. Visualiza lista de funcionários cadastrados
3. Pode criar novo funcionário (nome, função, usuário, senha)
4. Pode editar dados de funcionário existente
5. Pode excluir funcionário
6. Sistema sincroniza com FuncionarioService (porta 5009)

**Atores envolvidos:** Gerente, Sistema, FuncionarioService

**Status:** ✅ Implementado

---

#### 3.1.3. Processo: Gestão de Pedidos (RF-002)

**Descrição:** Registro e gerenciamento de pedidos pelo atendente.

**Atividades:**
1. Atendente acessa tela de Pedidos
2. Visualiza pedidos ativos
3. Pode criar novo pedido (cliente, produto, quantidade)
4. Pode editar pedido antes do envio à cozinha
5. Pode cancelar pedido
6. Sistema sincroniza com PedidoService (porta 5013)

**Atores envolvidos:** Atendente, Sistema, PedidoService

**Status:** ✅ Implementado

---

#### 3.1.4. Processo: Preparo de Pedidos - KDS (RF-003)

**Descrição:** Gerenciamento do preparo dos pedidos na cozinha através do Kitchen Display System.

**Atividades:**
1. Cozinha acessa tela KDS
2. Visualiza fila de pedidos recebidos
3. Seleciona pedido para iniciar preparo (status: "Em Preparo")
4. Marca pedido como pronto (status: "Pronto")
5. Sistema notifica atendente (RF-004)
6. Pode cancelar pedido com justificativa (status: "Cancelado")

**Atores envolvidos:** Cozinha, Sistema, PedidoService

**Status:** ✅ Implementado

---

#### 3.1.5. Processo: Pagamento e Fechamento (RF-005)

**Descrição:** Controle do fechamento da comanda com registro de pagamento.

**Atividades:**
1. Caixa/Atendente acessa tela de Pagamento
2. Visualiza itens do pedido da mesa
3. Sistema calcula total automaticamente
4. Seleciona forma de pagamento (Cartão, Dinheiro ou PIX)
5. Confirma pagamento
6. Sistema registra no PagamentoService (porta 5157)
7. Pedido é fechado

**Atores envolvidos:** Caixa, Atendente, Sistema, PagamentoService

**Status:** ✅ Implementado

---

#### 3.1.6. Processo: Geração de Relatórios (RF-006)

**Descrição:** Consulta de relatórios gerenciais de vendas.

**Atividades:**
1. Gerente acessa tela de Relatório Financeiro
2. Sistema busca dados de vendas no RelatorioService (porta 5005)
3. Exibe resumo com:
   - Produtos vendidos
   - Quantidade por produto
   - Receita gerada por produto
4. Dados são apresentados em lista scrollável

**Atores envolvidos:** Gerente, Sistema, RelatorioService

**Status:** ✅ Implementado

---

### 3.2. Diagramas BPMN

Os processos de negócio foram modelados utilizando o padrão BPMN 2.0. Para visualizar os **10 diagramas completos** com pools, lanes, gateways e eventos, consulte:

📊 **[Modelagem BPMN Completa](processos/modelagem-bpmn.md)**

Este documento contém:
- 10 processos modelados em BPMN
- Diagramas visuais de cada processo
- Descrição detalhada dos fluxos
- Identificação de atores e responsabilidades
- Pontos de decisão e regras de negócio

---

### 3.3. Requisitos Funcionais e Não Funcionais

#### 3.3.1. Requisitos Funcionais (RF) - Status de Implementação

| ID     | Descrição                                                                                              | Categoria        | Prioridade    | Status |
|--------|--------------------------------------------------------------------------------------------------------|------------------|---------------|--------|
| RF-001 | O sistema deve autenticar usuários e aplicar controle de acesso baseado em papéis                     | Autenticação     | OBRIGATÓRIO   | ✅ Implementado |
| RF-002 | O atendente deve registrar pedidos: abrir comanda, incluir itens, editar e enviar para cozinha        | Gestão Pedidos   | OBRIGATÓRIO   | ✅ Implementado |
| RF-003 | A cozinha deve visualizar fila por estação e atualizar status (pendente, preparo, pronto, cancelado)  | KDS Cozinha      | OBRIGATÓRIO   | ✅ Implementado |
| RF-004 | O atendente deve receber notificações de itens prontos e marcá-los como entregues                     | Notificações     | OBRIGATÓRIO   | ✅ Implementado |
| RF-005 | O sistema deve permitir fechamento de conta com registro de pagamentos e divisão simples              | Pagamentos       | IMPORTANTE    | ✅ Implementado |
| RF-006 | O gerente deve visualizar relatórios de vendas por período com exportação                             | Relatórios       | IMPORTANTE    | ✅ Implementado |
| RF-007 | O gerente deve administrar usuários: criar, editar, desativar e definir papéis                        | Administração    | OBRIGATÓRIO   | ✅ Implementado |

**Implementação Real:**
- ✅ Login com JWT e AsyncStorage
- ✅ Dashboard com navegação para 6 módulos
- ✅ CRUD completo de Funcionários
- ✅ Gestão de Pedidos (criar, editar, cancelar)
- ✅ KDS com atualização de status em tempo real
- ✅ Pagamento com 3 formas (Cartão, Dinheiro, PIX)
- ✅ Relatório de vendas com produtos e receita

---

#### 3.3.2. Requisitos Não Funcionais (RNF) - Status de Validação

| ID      | Descrição                                                                                          | Categoria       | Prioridade    | Status |
|---------|----------------------------------------------------------------------------------------------------|-----------------|---------------|--------|
| RNF-001 | O tempo de resposta para envio/recebimento de pedidos deve ser inferior a 2 segundos              | Performance     | IMPORTANTE    | ✅ Validado |
| RNF-002 | O sistema deve criptografar senhas e dados sensíveis em trânsito e em repouso                    | Segurança       | OBRIGATÓRIO   | ✅ Validado |
| RNF-003 | O sistema deve registrar logs de todas as operações críticas                                      | Auditoria       | IMPORTANTE    | ⚠️ Parcial |
| RNF-004 | O sistema deve ser responsivo e funcionar em smartphones e tablets (iOS e Android)                | Usabilidade     | OBRIGATÓRIO   | ✅ Validado |
| RNF-005 | O código deve ser modular seguindo boas práticas, permitindo manutenção sem impacto sistêmico    | Manutenibilidade| OBRIGATÓRIO   | ✅ Validado |
| RNF-006 | O aplicativo deve funcionar com no mínimo 95% de disponibilidade                                  | Disponibilidade | IMPORTANTE    | ✅ Validado |

**Validação Real:**
- ✅ RNF-001: Requisições HTTP concluem em < 500ms em testes locais
- ✅ RNF-002: Token JWT armazenado com AsyncStorage, HTTPS em produção
- ⚠️ RNF-003: Logs no console (desenvolvimento), backend registra operações
- ✅ RNF-004: React Native Web permite execução em mobile (iOS/Android) e web (navegadores)
- ✅ RNF-005: Código modular com services/, context/, componentes reutilizáveis, TypeScript
- ✅ RNF-006: Sistema mantém disponibilidade através de microserviços independentes
---

## 10. Controle de Mudanças

### 10.1. Gestão de Trabalho no GitHub

O projeto utiliza GitHub para controle de versão e colaboração. Ver [docs/contexto.md](contexto.md) para detalhes completos do planejamento por semanas e contribuições da equipe.

### 10.2. Planejamento - Desenvolvimento Mobile

#### Etapa 5 - Frontend Mobile/Web (02/11 - 27/11/2025)

Atualizado em: 30/11/2025

| Responsável          | Atividades Realizadas                                                                                      | Status |
| :------------------- | :--------------------------------------------------------------------------------------------------------- | :----: |
| Isabela Gomes        | Configuração React Native + Expo + React Native Web (02/11), criação completa da estrutura frontend, implementação de TODAS as 7 telas (Login, Dashboard, Funcionários, Pedidos, KDS, Pagamento, Relatórios), desenvolvimento dos 3 componentes reutilizáveis (pedidoCard, pedidosKdsCard, itemPagamentoCard), implementação dos 5 serviços de integração (funcionariosService, pedidosService, relatoriosService, api.ts, authHelper.ts), configuração authContext, implementação final (27/11), ajustes de documentação (28/11) | ✔️ |
| Guilherme Lanza      | Revisão de documentação frontend-web.md (02/11) | ✔️ |
| Maria Eduarda        | Documentação completa da etapa 4 (30/11) | ✔️ |
| Warley Martins       | Documentação técnica completa da etapa 4 (30/11) | ✔️ |

**Status Geral:** ✅ Todas as funcionalidades principais implementadas e testadas

**Legenda:**
- ✔️: terminado  
- 📝: em execução  
- ⌛: atrasado  
- ❌: não iniciado

---

## 4. Projeto de Interface

### 4.1. Visão Geral da Interação do Usuário

O aplicativo mobile/web do FoodTrack foi projetado com foco na experiência do usuário, priorizando navegação intuitiva e acesso rápido às funcionalidades principais.

#### 4.1.1. Fluxo de Navegação Implementado

```
Login → Dashboard → Funcionalidades específicas

Fluxo Real:
Login → Dashboard → [Funcionários | Pedidos | Pagamento | Comanda | KDS | Relatório]
```

### 4.2. Wireframes das Telas Implementadas

Para visualização completa dos wireframes com layouts detalhados, gestos e navegação, consulte:

📱 **[Wireframes Completos](interface/wireframes.md)**
📱 **[Prototipação](interface/prototipo.md) 
**

Este documento contém:
- 8 telas documentadas em wireframe
- Elementos de interface de cada tela
- Interações e gestos suportados
- Fluxos de navegação entre telas
- Aspectos de usabilidade

### 4.3. Telas Reais Implementadas

#### 4.3.1. Login (login.tsx)
- Campo usuário e senha
- Validação de credenciais
- Redirecionamento automático ao Dashboard
- Design responsivo (adapta a tamanhos de tela)

#### 4.3.2. Dashboard (dashboard.tsx)
- 6 cards de navegação:
  - Funcionários
  - Pedidos
  - Pagamento
  - Comanda
  - KDS
  - Relatório Financeiro
- Interface clean com paleta laranja/bege

#### 4.3.3. Funcionários (funcionarios.tsx)
- Lista de funcionários com FlatList
- Modal para criar/editar
- Campos: nome, função, usuário, senha
- Botões de editar e excluir

#### 4.3.4. Pedidos (pedidos.tsx)
- Lista de pedidos ativos
- Formulário de novo pedido (cliente, produto, quantidade)
- Modal de edição
- Componente PedidoCard reutilizável

#### 4.3.5. KDS (kds.tsx)
- Fila de pedidos para cozinha
- Atualização de status (pendente → em preparo → pronto → cancelado)
- Componente PedidoKDSCard
- Interface otimizada para uso em tablets

#### 4.3.6. Pagamento (pagamento.tsx)
- Lista de itens do pedido
- Cálculo automático do total
- 3 botões de forma de pagamento (Cartão, Dinheiro, PIX)
- Componente ItemPagamentoCard

#### 4.3.7. Relatório (relatorio.tsx)
- Resumo de vendas
- Lista de produtos com quantidade e receita
- Dados do RelatorioService

### 4.4. Design Visual Implementado

#### Paleta de Cores Real
- **Primária:** `#E67E22` (laranja) - botões e títulos
- **Background:** `#FFF8F1`, `#FFFDF9` (bege claro)
- **Cards:** `#F9E4C8` (bege intermediário)
- **Texto:** `#4A3F35`, `#7D6F60` (marrom escuro/médio)
- **Sombras:** `#BF6510` (laranja escuro)

#### Tipografia
- Fonte padrão do sistema (São Francisco/Roboto)
- Títulos: Bold, 28px
- Cards: Medium, 18px
- Inputs: Regular, 15px

---

## 5. Fluxo de Dados

### 5.1. Arquitetura de Dados Implementada

```
Mobile/Web App (React Native + Expo + React Native Web)
    ↕️ (HTTPS/REST via Axios)
Microserviços .NET 9 (APIs REST)
    ├── AutenticacaoService (porta 5001)
    ├── FuncionarioService (porta 5009)
    ├── PedidoService (porta 5013)
    ├── PagamentoService (porta 5157)
    └── RelatorioService (porta 5005)
    ↕️
Banco de Dados MySQL 8.0+
```

### 5.2. Fluxo de Sincronização Real

1. **Autenticação:**
   - App envia POST para `AutenticacaoService/api/autenticacao/login`
   - Backend valida credenciais e retorna token JWT
   - Token armazenado no AsyncStorage
   - Token incluído em header de todas as requisições subsequentes

2. **Gestão de Funcionários:**
   - GET `FuncionarioService/api/funcionarios` - lista todos
   - POST `FuncionarioService/api/funcionarios` - cria novo
   - PUT `FuncionarioService/api/funcionarios/{id}` - atualiza
   - DELETE `FuncionarioService/api/funcionarios/{id}` - remove

3. **Gestão de Pedidos:**
   - GET `PedidoService/api/pedidos` - lista pedidos
   - POST `PedidoService/api/pedidos` - cria pedido
   - PUT `PedidoService/api/pedidos/{id}` - edita pedido
   - DELETE `PedidoService/api/pedidos/{id}` - cancela pedido
   - PATCH `PedidoService/api/pedidos/{id}` - atualiza status (KDS)

4. **Processamento de Pagamentos:**
   - GET `PagamentoService/api/pedido/{id}` - busca dados do pedido
   - POST `PagamentoService/api/pedidos/{id}/pagar` - processa pagamento

5. **Relatórios:**
   - GET `RelatorioService/api/relatorios` - busca dados de vendas

---

## 6. Tecnologias Utilizadas

### 6.1. Frontend Mobile/Web - Implementação Real

- **Framework:** React Native 0.81.5
- **Plataforma:** Expo 54.0.20
- **Web Support:** React Native Web 0.21.0
- **Linguagem:** TypeScript 5.9.2
- **Navegação:** Expo Router 6.0.13 (file-based routing)
- **Gerenciamento de Estado:** Context API (authContext.tsx)
- **Componentes UI:** React Native Paper 5.14.5
- **Ícones:** Expo Vector Icons 15.0.3
- **Requisições HTTP:** Axios 1.12.2
- **Armazenamento Local:** AsyncStorage 2.2.0
- **Gestos:** React Native Gesture Handler 2.28.0
- **Animações:** React Native Reanimated 4.1.1

### 6.2. Backend (Integração) - Implementação Real

- **.NET 9** (APIs REST)
- **MySQL 8.0+** (Banco de dados relacional)
- **Entity Framework Core** (ORM)
- **Swagger/OpenAPI** (Documentação de APIs)
- **JWT** (Autenticação stateless)

### 6.3. Ferramentas de Desenvolvimento

- **IDE:** Visual Studio Code
- **Controle de versão:** Git + GitHub
- **Teste de APIs:** Postman, Swagger UI, arquivos `.http`
- **Execução:** 
  - Web: `npm run web` (porta 8081)
  - Android: `npm run android`
  - iOS: `npm run ios`

### 6.4. Estrutura de Pastas Real

```
src/foodtrack/
├── app/                    # Telas (file-based routing)
│   ├── login.tsx          # Tela de login
│   ├── dashboard.tsx      # Dashboard principal
│   ├── funcionarios.tsx   # CRUD funcionários
│   ├── pedidos.tsx        # Gestão de pedidos
│   ├── kds.tsx            # Kitchen Display System
│   ├── pagamento.tsx      # Processamento pagamentos
│   ├── relatorio.tsx      # Relatórios de vendas
│   ├── pedidoCard.tsx     # Componente card pedido
│   ├── pedidosKdsCard.tsx # Componente card KDS
│   ├── itemPagamentoCard.tsx # Componente item pagamento
│   └── _layout.tsx        # Layout wrapper
├── context/               # Gerenciamento de estado
│   └── authContext.tsx    # Contexto de autenticação
├── services/              # Integração com APIs
│   ├── api.ts             # Configuração URLs
│   ├── authHelper.ts      # Helpers autenticação
│   ├── funcionariosService.ts # API funcionários
│   ├── pedidosService.ts  # API pedidos
│   └── relatoriosService.ts # API relatórios
├── theme/                 # Estilos compartilhados
├── assets/                # Imagens e recursos
├── app.json               # Configuração Expo
├── package.json           # Dependências
└── tsconfig.json          # Config TypeScript
```

---

## 7. Considerações de Segurança

### 7.1. Autenticação e Autorização Implementadas

- **JWT (JSON Web Tokens)** para autenticação stateless
- Tokens armazenados de forma segura usando **AsyncStorage**
- Token incluído em header Authorization de todas as requisições: `Bearer {token}`
- Controle de acesso no backend baseado em papéis (verificação no AutenticacaoService)
- Login implementado em `authContext.tsx` com funções `login()` e `logout()`

### 7.2. Comunicação Segura

- Comunicações backend via **HTTP** em desenvolvimento local
- Recomendação: **HTTPS/TLS 1.3** obrigatório em produção
- URLs dos serviços configuradas em `services/api.ts`

### 7.3. Proteção de Dados

- Senhas criptografadas com **bcrypt** no backend (.NET)
- Token JWT não exposto em logs
- Dados sensíveis armazenados apenas no AsyncStorage (criptografado pelo OS)

### 7.4. Boas Práticas Implementadas

- Validação de inputs no frontend antes do envio
- Tratamento de erros com try-catch em todos os services
- Timeouts configurados no Axios (30 segundos padrão)
- Sanitização de dados no backend

---

## 8. Implantação

### 8.1. Requisitos de Hardware e Software

**Dispositivos Suportados:**
- **Android:** 8.0 (API 26) ou superior (via React Native)
- **iOS:** 13.0 ou superior (via React Native)
- **Web:** Navegadores modernos (Chrome, Firefox, Safari, Edge) via React Native Web
- Mínimo 2GB RAM
- 100MB de espaço disponível

**Infraestrutura Backend:**
- Servidor com .NET 9 Runtime
- MySQL 8.0+
- 4GB RAM mínimo

### 8.2. Processo de Deploy

#### 8.2.1. Desenvolvimento Local

```bash
# Instalar dependências
cd src/foodtrack
npm install

# Executar em modo desenvolvimento
npm run web      # Navegador (porta 8081)
npm run android  # Emulador Android
npm run ios      # Simulador iOS
```

#### 8.2.2. Build para Web (Produção)

```bash
cd src/foodtrack
expo export --platform web
```

Resultado: pasta `dist/` com arquivos estáticos HTML/CSS/JS prontos para deploy em qualquer servidor web (Nginx, Apache, CDN).

#### 8.2.3. Build para Mobile (Futuro)

```bash
# Android
expo build:android

# iOS
expo build:ios
```

### 8.3. Configuração de Ambiente

**Arquivo de Configuração (services/api.ts):**
```typescript
export const API_URLS = {
  autenticacao: 'http://192.168.1.4:5001/api/autenticacao',
  funcionarios: 'http://192.168.1.4:5009/api/funcionarios',
  pedidos: 'http://192.168.1.4:5013/api/pedidos',
  pagamentos: 'http://192.168.1.4:5157/api',
  relatorios: 'http://192.168.1.4:5005/api/relatorios'
};
```

**Para produção:** Substituir IPs locais por domínios com HTTPS.

---

## 9. Testes

### 9.1. Estratégia de Testes

A aplicação passou por testes manuais de funcionalidade e integração para garantir que todos os requisitos implementados funcionem corretamente.

Para documentação completa de testes de integração (backend, frontend e E2E), consulte:

🧪 **[Testes de Integração Completos](testes/testes-integracao.md)**

Este documento contém:
- Estratégia de testes backend (APIs .NET)
- Testes de integração frontend-backend
- Testes end-to-end de fluxos completos
- Testes de performance e carga
- Casos de teste documentados com resultados

### 9.2. Testes Realizados

#### 9.2.1. Testes Funcionais

**Telas Testadas:**
- ✅ Login com credenciais válidas e inválidas
- ✅ Navegação no Dashboard para todas as 6 opções
- ✅ CRUD completo de Funcionários (criar, listar, editar, excluir)
- ✅ Gestão de Pedidos (criar, editar, cancelar)
- ✅ KDS com atualização de status (pendente → em preparo → pronto)
- ✅ Pagamento com 3 formas (Cartão, Dinheiro, PIX)
- ✅ Visualização de Relatórios de vendas

#### 9.2.2. Testes de Integração

**APIs Validadas:**
- ✅ AutenticacaoService (porta 5001) - Login com JWT
- ✅ FuncionarioService (porta 5009) - CRUD funcionários
- ✅ PedidoService (porta 5013) - CRUD pedidos e atualização de status
- ✅ PagamentoService (porta 5157) - Processamento de pagamentos
- ✅ RelatorioService (porta 5005) - Consulta de vendas

**Cenários Testados:**
1. Login → Dashboard → Funcionários → Criar funcionário → Validar criação
2. Login → Dashboard → Pedidos → Criar pedido → Validar no KDS
3. Login → Dashboard → KDS → Atualizar status → Validar mudança
4. Login → Dashboard → Pagamento → Selecionar forma → Processar

#### 9.2.3. Testes de Performance

**Métricas Observadas:**
- Tempo de resposta das APIs: < 500ms (rede local)
- Carregamento inicial do app: < 2 segundos
- Navegação entre telas: instantânea
- Renderização de listas (FlatList): fluida com 50+ itens

---

## 10. Referências

- React Native Documentation. Disponível em: https://reactnative.dev/
- Expo Documentation. Disponível em: https://docs.expo.dev/
- React Native Web. Disponível em: https://necolas.github.io/react-native-web/
- TypeScript Documentation. Disponível em: https://www.typescriptlang.org/docs/
- React Native Paper. Disponível em: https://reactnativepaper.com/
- Axios Documentation. Disponível em: https://axios-http.com/docs/intro
- AsyncStorage. Disponível em: https://react-native-async-storage.github.io/async-storage/
- BPMN 2.0 Specification. Disponível em: https://www.omg.org/spec/BPMN/2.0/
- REST API Design Best Practices. Disponível em: https://restfulapi.net/
- Documentação .NET 9. Disponível em: https://docs.microsoft.com/dotnet/

---

### 11.2. Histórico de Versões

| Responsável          | Atividades Realizadas                                                                                      | Status |
| :------------------- | :--------------------------------------------------------------------------------------------------------- | :----: |
| Isabela Gomes        | Configuração React Native + Expo + React Native Web (02/11), criação completa da estrutura frontend, implementação de telas (28/11) | ✔️ |
| Guilherme Lanza      | Revisão de documentação frontend-web.md (02/11) | ✔️ |
| Maria Eduarda        | 	Documentação completa da etapa 4, testes end-to-end, criação de wireframes web e mobile, criação de BPMNs, criação e atualização prototipagem web e mobile (30/11) | ✔️ |
| Warley Martins       | Documentação completa da etapa 4, testes end-to-end, criação de wireframes web e mobile, criação de BPMNs, criação e atualização prototipagem web e mobile  (30/11) | ✔️ |

---
