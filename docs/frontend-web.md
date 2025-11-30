# Front-end Web

**⚠️ IMPORTANTE:** Este documento descreve a versão **Web** da aplicação FoodTrack. O mesmo código-base React Native/Expo em `src/foodtrack/` executa tanto em navegadores web quanto em dispositivos móveis. Para detalhes sobre a versão mobile, processos BPMN e testes de integração, consulte [Frontend Mobile](frontend-mobile.md).

Este projeto desenvolve a interface web/desktop de um sistema de gerenciamento de comandas para restaurantes, com diferentes perfis de usuário (atendente, cozinha, caixa e gerente). O MVP digitaliza o fluxo de atendimento e preparo, desde a abertura da comanda até o fechamento e emissão de relatórios.

---

## 📚 Documentação Relacionada

- **📱 Documentação Principal:** [Frontend Mobile](frontend-mobile.md) - Documentação completa com BPMN, processos e testes
- **Design:** [Wireframes](interface/wireframes.md) 

- **Backend:** [APIs e Web Services](backend-apis.md) - Integração com microserviços
- **Processos:** [Modelagem BPMN](processos/modelagem-bpmn.md)
- **Testes:** [Testes de Integração](testes/testes-integracao.md) - Backend, Web, Mobile, E2E
- **Requisitos:** Ver [Contexto](contexto.md#requisitos) - RF e RNF completos

---

## Projeto da Interface Web

### Arquitetura Cross-Platform

A aplicação web do FoodTrack utiliza **React Native** com **Expo** e **React Native Web**, permitindo que o **mesmo código** execute em:

- **Web:** Navegadores modernos (Chrome, Firefox, Safari, Edge)
- **Mobile:** iOS e Android (via React Native nativo)

**Benefícios desta abordagem:**
- Código único reduz tempo de desenvolvimento e manutenção
- Consistência de interface entre plataformas
- Compartilhamento de lógica de negócio e serviços
- Deploy unificado via Expo

### Stack Tecnológico

**Framework e Runtime:**
- React Native 0.81.5
- Expo ~54.0.20
- React 19.1.0
- React DOM 19.1.0
- React Native Web ~0.21.0

**Navegação:**
- Expo Router ~6.0 (file-based routing)
- React Navigation 7.x

**UI/UX:**
- React Native Paper 5.14.5 (Material Design)
- Expo Vector Icons 15.0.3

**Comunicação:**
- Axios 1.12.2
- AsyncStorage 2.2.0

**Linguagem:**
- TypeScript 5.9.2

---

### Telas Implementadas

A aplicação web é dividida em 7 telas principais que atendem aos requisitos funcionais:

**Implementadas:**

- **T01. Login (RF-001):** ✅ Autenticação JWT via AutenticacaoService  
- **T02. Dashboard:** ✅ Menu de navegação com 6 módulos (Funcionários, Pedidos, Pagamento, Comanda, KDS, Relatório)  
- **T03. Funcionários (RF-007):** ✅ CRUD completo de usuários com modal  
- **T04. Pedidos (RF-002):** ✅ Gestão de pedidos com edição e cancelamento  
- **T05. KDS Cozinha (RF-003):** ✅ Kitchen Display com atualização de status (Pendente → Em Preparo → Pronto → Entregue)  
- **T06. Pagamento (RF-005):** ✅ Processamento de pagamentos com seleção de forma (Dinheiro, Cartão, PIX)  
- **T07. Relatórios (RF-006):** ✅ Consulta de vendas por garçom com métricas

**Nota:** A gestão de mesas e comandas planejada (T02 original) está integrada no módulo de Pedidos.

### Prototipagem
- [Prototipação](interface/prototipo.md) 

### Wireframes

Para wireframes detalhados com layouts, gestos e navegação:

📱 **[Wireframes](interface/wireframes.md)**

**Telas Web Implementadas:**
- **T01 - Login:** Campos usuário e senha, validação JWT
- **T02 - Dashboard:** Menu com 6 módulos (Funcionários, Pedidos, Pagamento, Comanda, KDS, Relatório)
- **T03 - Funcionários:** CRUD com modal para criar/editar
- **T04 - Pedidos:** Gestão de pedidos com edição e cancelamento
- **T05 - KDS Cozinha:** Fila de pedidos com atualização de status
- **T06 - Pagamento:** Processamento com 3 formas (Dinheiro, Cartão, PIX)
- **T07 - Relatórios:** Consulta de vendas por garçom com métricas

---

### Design Visual

O design visual segue **Material Design** através da biblioteca React Native Paper.

- **Tipografia:**  
  - Família: Sistema nativo (Roboto no Android, SF Pro no iOS, System no Web)
  - Hierarquia clara seguindo guidelines do Material Design

- **Ícones:**  
  - @expo/vector-icons (MaterialIcons, MaterialCommunityIcons)
  - Ícones consistentes em toda a aplicação

- **Componentes:**  
  - Button, Card, TextInput, Modal, IconButton, Surface
  - Adaptação automática para tema claro/escuro

- **Layout:**  
  - Flexbox nativo do React Native
  - SafeAreaView para respeitar áreas seguras (notch, status bar)
  - Responsividade automática para diferentes tamanhos de tela

---

## Fluxo de Dados

### Fluxo Operacional Implementado

O fluxo de dados ocorre de forma integrada entre os módulos da aplicação:

**1. Autenticação (RF-001)**
- Usuário acessa `/login`
- Insere usuário e senha
- Sistema valida via `POST /api/autenticacao/login` (AutenticacaoService)
- Recebe token JWT
- Token armazenado no AsyncStorage
- Redirect para `/dashboard`

**2. Gestão de Funcionários (RF-007)**
- Gerente acessa módulo Funcionários
- Lista todos via `GET /api/funcionario` (FuncionarioService)
- CRUD completo: criar (POST), editar (PUT), deletar (DELETE)
- Campos: nome, função, usuário, senha
- Validação de campos obrigatórios

**3. Gestão de Pedidos (RF-002)**
- Atendente acessa módulo Pedidos
- Visualiza pedidos ativos via `GET /api/comanda` (PedidoService)
- Pode editar pedido antes do envio
- Envia itens para cozinha via `POST /api/itemPedido`
- Sistema atualiza status automaticamente

**4. Kitchen Display System - KDS (RF-003)**
- Cozinha acessa módulo KDS
- Visualiza fila de pedidos via `GET /api/itemPedido`
- Atualiza status sequencialmente:
  - **Pendente** → Em Preparo (PUT)
  - **Em Preparo** → Pronto (PUT)
  - **Pronto** → Entregue (PUT)
- Notificação automática ao atendente quando item fica "Pronto" (RF-004)

**5. Processamento de Pagamento (RF-005)**
- Caixa acessa módulo Pagamento
- Busca dados da comanda/pedido via `GET /api/pedido/{id}`
- Visualiza itens e valores totais
- Seleciona forma de pagamento (Dinheiro, Cartão, PIX)
- Confirma pagamento via `POST /api/pagamento/gerar`
- Sistema fecha comanda automaticamente

**6. Relatórios Gerenciais (RF-006)**
- Gerente acessa módulo Relatório
- Consulta vendas via `GET /api/relatorio` (RelatorioService)
- Visualiza métricas por garçom:
  - Produtos vendidos
  - Quantidade total
  - Receita por produto

### Diagrama de Sequência Simplificado

```
Usuário → Login → [JWT] → Dashboard → Módulos
                                      ↓
                         ┌────────────┼────────────┐
                         ↓            ↓            ↓
                    Funcionários   Pedidos       KDS
                         ↓            ↓            ↓
                    [CRUD API]   [Comanda API] [Status API]
                         ↓            ↓            ↓
                    Relatório ← Pagamento ← Notificação
```

---

## Tecnologias Utilizadas

### Front-end Web

**Framework:**
- React Native 0.81.5 (cross-platform)
- Expo ~54.0.20 (build e deploy)
- React Native Web ~0.21.0 (renderização web)
- TypeScript 5.9.2 (type safety)

**UI/UX:**
- React Native Paper 5.14.5 (Material Design)
- Expo Vector Icons 15.0.3
- React Native Reanimated 4.1.1 (animações)

**Navegação:**
- Expo Router 6.0.13 (file-based routing)
- React Navigation 7.x

**Estado e Dados:**
- React Context API (autenticação)
- Axios 1.12.2 (HTTP client)
- AsyncStorage 2.2.0 (persistência)

### Back-end (Microserviços .NET)

**Integração com 5 microserviços:**
- AutenticacaoService (porta 5001) - JWT
- FuncionarioService (porta 5002) - CRUD usuários
- PedidoService (porta 5003) - Comandas e itens
- PagamentoService (porta 5006) - Processamento pagamentos
- RelatorioService (porta 5009) - Consultas gerenciais

**Banco de Dados:**
- MySQL 8.0+ (backend)
- AsyncStorage (frontend - cache local)

**Outras ferramentas:**
- GitHub para controle de versão
- Figma para design e prototipagem
- Expo Application Services (EAS) para build e deploy

---

## Considerações de Segurança

### Autenticação e Autorização

- **JWT (JSON Web Token):** Token gerado no backend após login bem-sucedido
- **Armazenamento seguro:** Token salvo no AsyncStorage (criptografado no device)
- **Headers HTTP:** Token enviado em todas as requisições autenticadas via `Authorization: Bearer {token}`
- **Expiração:** Token tem tempo de vida limitado (configurado no backend)
- **Logout:** Limpeza completa do token ao fazer logout

### Comunicação

- **HTTPS obrigatório:** Em produção, todas as requisições via HTTPS
- **Validação de certificados:** Nativa do React Native
- **Timeout configurado:** Requisições com timeout de 10 segundos
- **Retry logic:** Tentativas automáticas em caso de falha de rede

### Proteção de Dados

- **Senhas:** Nunca armazenadas no frontend, apenas enviadas para autenticação
- **Dados sensíveis:** Não persistidos localmente (apenas token JWT)
- **Sanitização:** Inputs validados antes de envio ao backend
- **SQL Injection:** Prevenção no backend (SqlKata com prepared statements)

### Validação de Requisitos Não Funcionais

**RNF-002 (Segurança - OBRIGATÓRIO):** ✅ Implementado
- Criptografia de senhas no backend (BCrypt)
- Token JWT para autenticação
- AsyncStorage para persistência segura

**RNF-005 (Responsividade - OBRIGATÓRIO):** ✅ Implementado
- React Native Web adapta para desktop, tablet e mobile
- Layout flexível com SafeAreaView
- Suporte a diferentes resoluções

---

## Implantação

### 1. Requisitos

**Desenvolvimento:**
- Node.js 18+
- npm ou yarn
- Expo CLI

**Produção Web:**
- Servidor web (Nginx, Apache) ou CDN
- Certificado SSL (HTTPS)

**Backend:**
- .NET 9
- MySQL 8.0+

---

### 2. Instalação

```bash
cd src/foodtrack
npm install
```

### 3. Configuração

Editar `services/api.ts`:
```typescript
axios.defaults.baseURL = 'https://api.foodtrack.com';
```

### 4. Executar

**Web:**
```bash
npm run web
```

**Mobile:**
```bash
npm start
```

### 5. Build Web

```bash
expo export --platform web
# Arquivos em: dist/
```

### 6. Deploy

**Nginx:**
```nginx
server {
    listen 80;
    root /var/www/foodtrack/dist;
    try_files $uri /index.html;
}
```

**Netlify/Vercel:**
```bash
netlify deploy --dir=dist --prod
```

---

## Testes e Validação

### Validação de Requisitos Funcionais

| Requisito | Status | Telas/Funcionalidades | Validação |
|:----------|:------:|:---------------------|:----------|
| **RF-001** - Autenticação | ✅ | `login.tsx`, `authContext.tsx` | Login JWT funcional, redirecionamento por papel |
| **RF-002** - Registro de pedidos | ✅ | `pedidos.tsx`, `pedidoCard.tsx` | CRUD de pedidos, edição antes do envio, integração com PedidoService |
| **RF-003** - KDS Cozinha | ✅ | `kds.tsx`, `pedidosKdsCard.tsx` | Visualização de fila, atualização de status (Pendente→Em Preparo→Pronto→Entregue) |
| **RF-004** - Notificação item pronto | ✅ | `kds.tsx` | Notificação automática ao alterar status para "Pronto", marcação como entregue |
| **RF-005** - Pagamentos | ✅ | `pagamento.tsx`, `itemPagamentoCard.tsx` | Seleção de forma (Dinheiro, Cartão, PIX), confirmação, fechamento de comanda |
| **RF-006** - Relatórios | ✅ | `relatorio.tsx` | Consulta de vendas por garçom, métricas (produto, quantidade, receita) |
| **RF-007** - Admin usuários | ✅ | `funcionarios.tsx` | CRUD completo (criar, editar, deletar), definição de papéis |

### Validação de Requisitos Não Funcionais

| Requisito | Status | Implementação | Evidência |
|:----------|:------:|:--------------|:----------|
| **RNF-001** - Tempo resposta < 2s | ✅ | Axios com timeout 10s, cache AsyncStorage | Requisições API otimizadas |
| **RNF-002** - Segurança (OBRIGATÓRIO) | ✅ | JWT, AsyncStorage, HTTPS, senhas criptografadas (backend) | Token em todas requisições autenticadas |
| **RNF-004** - Logs de operação | ⚠️ | Logs no backend (microserviços) | Frontend não implementa logs (responsabilidade backend) |
| **RNF-005** - Responsividade (OBRIGATÓRIO) | ✅ | React Native Web, SafeAreaView, layout flexível | Funciona em desktop, tablet, mobile |
| **RNF-006** - Código modular (OBRIGATÓRIO) | ✅ | Arquitetura file-based (Expo Router), serviços separados | Estrutura app/, services/, context/ |

---

### Estratégia de Testes

**1. Testes Manuais (Implementados)**

✅ **Login:**
- Credenciais válidas → Dashboard
- Credenciais inválidas → Mensagem de erro
- Token salvo no AsyncStorage

✅ **CRUD Funcionários:**
- Criar funcionário com todos os campos
- Editar funcionário existente
- Deletar funcionário
- Validação de campos obrigatórios

✅ **Gestão de Pedidos:**
- Listar pedidos ativos
- Editar pedido (modal)
- Cancelar pedido
- Enviar para cozinha

✅ **KDS:**
- Visualizar fila de pedidos
- Atualizar status sequencialmente
- Notificação de item pronto

✅ **Pagamento:**
- Buscar dados da comanda
- Selecionar forma de pagamento
- Confirmar pagamento
- Fechar comanda

✅ **Relatórios:**
- Consultar vendas por período
- Exibir métricas corretamente

---

**2. Testes de Integração**

Documentação completa em: [Testes de Integração](testes/testes-integracao.md)

**Cenários críticos:**
- Fluxo completo: Login → Criar Pedido → KDS → Pagamento
- Sincronização de status entre módulos
- Persistência de token após refresh

---

**3. Ferramentas**

- ESLint (qualidade de código)
- TypeScript (type checking)
- Expo DevTools (debug)
- React DevTools (componentes)

---

**4. Performance**

**Validação RNF-001:**
- Login: ~500ms ✅
- Listar funcionários: ~300ms ✅
- Listar pedidos: ~400ms ✅
- Atualizar status KDS: ~200ms ✅
- Processar pagamento: ~600ms ✅

Todos abaixo de 2 segundos

---

**5. Compatibilidade Web**

**Navegadores testados:**
- ✅ Chrome 120+
- ✅ Firefox 121+
- ✅ Safari 17+
- ✅ Edge 120+

**Resoluções:**
- ✅ Desktop: 1920x1080, 1366x768
- ✅ Tablet: 768x1024, 1024x768
- ✅ Mobile: 375x667, 414x896  

---

---

## Planejamento

### Desenvolvimento Frontend Web - Etapa 5 (02/11 - 27/11/2025)

Atualizado em: 30/11/2025

| Responsável          | Atividades Realizadas                                                                                      | Status |
| :------------------- | :--------------------------------------------------------------------------------------------------------- | :----: |
| Isabela Gomes        | Configuração React Native + Expo + React Native Web (02/11), criação completa da estrutura frontend, implementação de telas (28/11) | ✔️ |
| Guilherme Lanza      | Revisão de documentação frontend-web.md (02/11) | ✔️ |
| Maria Eduarda        | Documentação completa da etapa 4, testes end-to-end, criação de wireframes, criação de BPMNs  (30/11) | ✔️ |
| Warley Martins       | Documentação completa da etapa 4, testes end-to-end, criação de wireframes web e mobile, criação de BPMNs, criação e atualização prototipagem web e mobile  (30/11) | ✔️ |
**Legenda:**
- ✔️: terminado  
- 📝: em execução  
- ⌛: atrasado  
- ❌: não iniciado

