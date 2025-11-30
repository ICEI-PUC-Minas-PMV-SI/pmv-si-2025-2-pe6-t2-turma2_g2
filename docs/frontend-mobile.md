# Front-end Móvel

Este documento apresenta a documentação completa da aplicação móvel do **FoodTrack**, um sistema ERP voltado para restaurantes. O aplicativo mobile é desenvolvido em **React Native** e tem como objetivo proporcionar uma experiência intuitiva e eficiente para os usuários do sistema (atendentes, cozinha, caixa e gerentes) diretamente em dispositivos móveis.

---

## 1. Correções da Etapa Anterior

Esta seção documenta as correções e melhorias realizadas com base no feedback da etapa anterior:

### 1.1. Correções Implementadas

- [ ] **Atualização da arquitetura de comunicação:** ajuste na integração entre APIs
- [ ] **Melhoria na documentação de endpoints:** padronização dos exemplos de requisição/resposta
- [ ] **Refinamento dos requisitos funcionais:** detalhamento de casos de uso
- [ ] **Correção de inconsistências:** alinhamento entre documentação e código implementado

### 1.2. Observações

*Esta seção será preenchida com as correções específicas identificadas pela equipe ou professor.*

---

## 2. Desenvolvimento Mobile

### 2.1. Descrição do Projeto

O aplicativo mobile do FoodTrack permite que usuários de restaurante gerenciem comandas, pedidos, pagamentos e relatórios diretamente de smartphones e tablets. A solução foi projetada para ser responsiva, intuitiva e eficiente, garantindo agilidade nas operações do dia a dia.

### 2.2. Objetivos

- Proporcionar acesso móvel a todas as funcionalidades do sistema
- Garantir interface responsiva e otimizada para telas menores
- Oferecer experiência de usuário fluida e intuitiva
- Sincronizar dados em tempo real com o backend
- Suportar operação offline com sincronização posterior (futuro)

---

## 3. Modelagem de Processos

### 3.1. Descrição dos Processos

#### 3.1.1. Processo: Gestão de Comandas e Pedidos

**Descrição:** Este processo engloba desde a abertura da comanda pelo atendente até o envio dos pedidos para a cozinha.

**Atividades:**
1. Autenticação do usuário no aplicativo
2. Visualização de mesas disponíveis
3. Abertura de comanda para mesa selecionada
4. Seleção de itens do cardápio
5. Adição de itens à comanda com observações
6. Revisão dos itens antes do envio
7. Envio dos itens para a cozinha
8. Confirmação do envio

**Atores envolvidos:** Atendente, Sistema, Cozinha

---

#### 3.1.2. Processo: Preparo de Pedidos (KDS)

**Descrição:** Gerenciamento do preparo dos pedidos na cozinha através do Kitchen Display System.

**Atividades:**
1. Recebimento de novos pedidos
2. Visualização da fila de pedidos por estação
3. Início do preparo (mudança de status para "Em Preparo")
4. Conclusão do preparo (mudança de status para "Pronto")
5. Notificação ao atendente sobre item pronto
6. Possibilidade de cancelamento com justificativa

**Atores envolvidos:** Cozinha, Sistema, Atendente

---

#### 3.1.3. Processo: Entrega e Fechamento

**Descrição:** Controle da entrega dos pratos e fechamento da comanda com pagamento.

**Atividades:**
1. Recebimento de notificação de item pronto
2. Coleta do item na cozinha
3. Entrega ao cliente
4. Marcação de item como entregue
5. Solicitação de fechamento da comanda
6. Cálculo do total
7. Seleção da forma de pagamento
8. Registro do pagamento
9. Fechamento da comanda

**Atores envolvidos:** Atendente, Caixa, Sistema, Cliente

---

#### 3.1.4. Processo: Geração de Relatórios

**Descrição:** Consulta e exportação de relatórios gerenciais de vendas.

**Atividades:**
1. Acesso à área de relatórios
2. Seleção de período
3. Aplicação de filtros (por garçom, mesa, produto, etc.)
4. Visualização dos dados consolidados
5. Exportação em formato CSV/PDF

**Atores envolvidos:** Gerente, Sistema

---

#### 3.1.5. Processo: Gestão de Usuários

**Descrição:** Administração de usuários e permissões do sistema.

**Atividades:**
1. Listagem de usuários ativos
2. Criação de novo usuário
3. Definição de papel (atendente, cozinha, caixa, gerente)
4. Edição de dados de usuário
5. Desativação de usuário
6. Auditoria de acessos

**Atores envolvidos:** Gerente, Sistema

---

### 3.2. Diagramas BPMN

Os processos de negócio foram modelados utilizando o padrão BPMN 2.0:

#### 3.2.1. BPMN - Gestão de Comandas e Pedidos

```
[Inserir diagrama BPMN aqui]
```

*Descrição do fluxo:* O atendente se autentica → visualiza mesas → abre comanda → adiciona itens → revisa → envia para cozinha → recebe confirmação.

---

#### 3.2.2. BPMN - Preparo de Pedidos (KDS)

```
[Inserir diagrama BPMN aqui]
```

*Descrição do fluxo:* Cozinha recebe pedido → visualiza na fila → inicia preparo → conclui → notifica atendente.

---

#### 3.2.3. BPMN - Entrega e Fechamento

```
[Inserir diagrama BPMN aqui]
```

*Descrição do fluxo:* Atendente recebe notificação → coleta item → entrega → marca como entregue → solicita fechamento → processa pagamento → fecha comanda.

---

### 3.3. Requisitos Funcionais e Não Funcionais

#### 3.3.1. Requisitos Funcionais (RF)

| ID     | Descrição                                                                                              | Categoria        | Prioridade    |
|--------|--------------------------------------------------------------------------------------------------------|------------------|---------------|
| RF-001 | O sistema deve autenticar usuários e aplicar controle de acesso baseado em papéis                     | Autenticação     | OBRIGATÓRIO   |
| RF-002 | O atendente deve registrar pedidos: abrir comanda, incluir itens, editar e enviar para cozinha        | Gestão Comanda   | OBRIGATÓRIO   |
| RF-003 | A cozinha deve visualizar fila por estação e atualizar status (pendente, preparo, pronto, cancelado)  | KDS Cozinha      | OBRIGATÓRIO   |
| RF-004 | O atendente deve receber notificações de itens prontos e marcá-los como entregues                     | Notificações     | OBRIGATÓRIO   |
| RF-005 | O sistema deve permitir fechamento de conta com registro de pagamentos e divisão simples              | Pagamentos       | IMPORTANTE    |
| RF-006 | O gerente deve visualizar relatórios de vendas por período com exportação                             | Relatórios       | IMPORTANTE    |
| RF-007 | O gerente deve administrar usuários: criar, editar, desativar e definir papéis                        | Administração    | OBRIGATÓRIO   |
| RF-008 | O sistema deve permitir adicionar observações personalizadas aos itens do pedido                      | Gestão Comanda   | IMPORTANTE    |
| RF-009 | O sistema deve exibir histórico de pedidos de cada mesa                                               | Gestão Comanda   | DESEJÁVEL     |
| RF-010 | O sistema deve permitir transferência de itens entre mesas                                            | Gestão Comanda   | DESEJÁVEL     |

---

#### 3.3.2. Requisitos Não Funcionais (RNF)

| ID      | Descrição                                                                                          | Categoria       | Prioridade    |
|---------|----------------------------------------------------------------------------------------------------|-----------------|---------------|
| RNF-001 | O tempo de resposta para envio/recebimento de pedidos deve ser inferior a 2 segundos              | Performance     | IMPORTANTE    |
| RNF-002 | O sistema deve criptografar senhas e dados sensíveis em trânsito e em repouso                    | Segurança       | OBRIGATÓRIO   |
| RNF-003 | O sistema deve registrar logs de todas as operações críticas                                      | Auditoria       | IMPORTANTE    |
| RNF-004 | O sistema deve ser responsivo e funcionar em smartphones e tablets (iOS e Android)                | Usabilidade     | OBRIGATÓRIO   |
| RNF-005 | O código deve ser modular seguindo boas práticas, permitindo manutenção sem impacto sistêmico    | Manutenibilidade| OBRIGATÓRIO   |
| RNF-006 | O aplicativo deve funcionar com no mínimo 95% de disponibilidade                                  | Disponibilidade | IMPORTANTE    |
| RNF-007 | O sistema deve suportar no mínimo 50 usuários simultâneos                                         | Escalabilidade  | IMPORTANTE    |
| RNF-008 | A interface deve seguir padrões de acessibilidade (WCAG 2.1 nível AA)                            | Acessibilidade  | DESEJÁVEL     |
| RNF-009 | O aplicativo deve consumir no máximo 100MB de memória em operação normal                          | Performance     | DESEJÁVEL     |
| RNF-010 | Todas as APIs devem seguir o padrão REST e retornar dados em JSON                                | Interoperabilidade | OBRIGATÓRIO |

---

### 3.4. Indicadores de Desempenho (KPIs)

#### 3.4.1. Dashboard de KPIs

| Indicador | Descrição | Fórmula de Cálculo | Meta | Frequência |
|-----------|-----------|-------------------|------|------------|
| **Tempo Médio de Atendimento** | Tempo entre abertura da comanda e envio do primeiro pedido | (Σ tempo de cada comanda) / total de comandas | ≤ 5 minutos | Diário |
| **Tempo Médio de Preparo** | Tempo entre recebimento do pedido na cozinha e marcação como pronto | (Σ tempo de preparo) / total de pedidos | ≤ 15 minutos | Diário |
| **Taxa de Erros em Pedidos** | Percentual de pedidos cancelados ou devolvidos | (pedidos cancelados / total de pedidos) × 100 | ≤ 3% | Semanal |
| **Ticket Médio** | Valor médio gasto por comanda | (Σ valor total das comandas) / total de comandas | R$ 80,00 | Diário |
| **Taxa de Ocupação de Mesas** | Percentual de tempo que as mesas ficam ocupadas | (tempo mesas ocupadas / tempo total disponível) × 100 | ≥ 70% | Diário |
| **Volume de Vendas por Período** | Total de vendas em determinado período | Σ valor de todas as comandas fechadas | R$ 10.000/dia | Diário |
| **Tempo Médio de Fechamento** | Tempo para processar pagamento e fechar comanda | (Σ tempo de fechamento) / total de comandas | ≤ 3 minutos | Diário |
| **Satisfação do Cliente (NPS)** | Índice de satisfação coletado via pesquisa | (% promotores) - (% detratores) | ≥ 50 | Mensal |

---

#### 3.4.2. Gráficos e Painéis

**Painel 1: Performance Operacional**
- Gráfico de linhas: Tempo médio de atendimento (últimos 30 dias)
- Gráfico de barras: Tempo médio de preparo por estação
- Gráfico de pizza: Taxa de erros em pedidos

**Painel 2: Desempenho Financeiro**
- Gráfico de barras: Volume de vendas diário/semanal/mensal
- Gráfico de linhas: Evolução do ticket médio
- Gráfico de área: Receita acumulada no mês

**Painel 3: Utilização de Recursos**
- Heatmap: Taxa de ocupação de mesas por horário
- Gráfico de barras: Produtos mais vendidos
- Gráfico de rosca: Distribuição de formas de pagamento

**Painel 4: Eficiência do Time**
- Gráfico de barras: Pedidos atendidos por garçom
- Gráfico de linhas: Tempo médio de atendimento por funcionário
- Tabela: Ranking de desempenho

---

## 4. Projeto de Interface

### 4.1. Visão Geral da Interação do Usuário

O aplicativo mobile do FoodTrack foi projetado com foco na experiência do usuário, priorizando navegação intuitiva e acesso rápido às funcionalidades principais.

#### 4.1.1. Fluxo de Navegação Principal

```
Login → Dashboard (baseado no papel) → Funcionalidades específicas

Atendente: Login → Mesas → Comanda → Prontos → Pagamento
Cozinha:   Login → KDS (visualização de pedidos)
Caixa:     Login → Pagamentos → Relatórios
Gerente:   Login → Dashboard → Relatórios → Usuários
```

---

### 4.2. Wireframes das Telas

#### 4.2.1. Tela de Login (T01)

**Elementos:**
- Logo do FoodTrack
- Campo de e-mail/usuário
- Campo de senha (com opção de mostrar/ocultar)
- Botão "Entrar"
- Mensagem de erro (quando aplicável)
- Link "Esqueci minha senha"

**Layout:** Centralizado, minimalista, com destaque para os campos de entrada.

```
[Inserir wireframe da tela de login aqui]
```

---

#### 4.2.2. Dashboard - Atendente (T02)

**Elementos:**
- Cabeçalho com nome do usuário e botão de logout
- Grade de mesas com status (disponível, ocupada, reservada)
- Indicador visual de comandas abertas
- Botão flutuante "+" para abrir nova comanda
- Menu inferior: Mesas | Prontos | Perfil

**Interações:**
- Toque na mesa abre a comanda correspondente
- Cores diferentes indicam status da mesa

```
[Inserir wireframe do dashboard de atendente aqui]
```

---

#### 4.2.3. Comanda - Adicionar Itens (T03)

**Elementos:**
- Cabeçalho: número da mesa, tempo decorrido
- Lista de categorias de produtos (horizontal scroll)
- Grade de produtos com foto, nome e preço
- Carrinho flutuante mostrando itens adicionados
- Botão "Enviar para Cozinha"
- Campo de observações para cada item

**Interações:**
- Toque no produto adiciona ao carrinho
- Toque no carrinho expande visualização detalhada
- Swipe para remover item do carrinho

```
[Inserir wireframe da tela de comanda aqui]
```

---

#### 4.2.4. KDS Cozinha (T04)

**Elementos:**
- Abas por estação (Grill, Saladas, Bebidas, etc.)
- Cards de pedidos em colunas: Pendentes | Em Preparo | Prontos
- Cada card mostra: mesa, itens, observações, tempo decorrido
- Botões de ação: "Iniciar", "Pronto", "Cancelar"
- Indicador visual de prioridade (pedidos atrasados em vermelho)

**Interações:**
- Arrastar card entre colunas
- Toque longo para ver detalhes
- Botões de ação mudam status

```
[Inserir wireframe do KDS aqui]
```

---

#### 4.2.5. Prontos para Entrega (T05)

**Elementos:**
- Lista de itens prontos agrupados por mesa
- Cada item mostra: nome, mesa, tempo desde que ficou pronto
- Botão "Marcar como Entregue"
- Indicador de notificação com badge

**Interações:**
- Swipe para marcar como entregue
- Toque abre detalhes do item

```
[Inserir wireframe da tela de prontos aqui]
```

---

#### 4.2.6. Pagamento e Fechamento (T06)

**Elementos:**
- Resumo da comanda: itens, quantidades, valores
- Subtotal, taxa de serviço (opcional), total
- Seletor de forma de pagamento (Dinheiro, Cartão, PIX)
- Opção de divisão de conta (igual, por item, por valor)
- Campo para desconto/coupon
- Botão "Fechar Comanda"

**Interações:**
- Seleção de múltiplas formas de pagamento
- Cálculo automático de troco (para dinheiro)
- Confirmação antes de fechar

```
[Inserir wireframe da tela de pagamento aqui]
```

---

#### 4.2.7. Relatórios (T07)

**Elementos:**
- Filtros: período, garçom, mesa, categoria
- Gráficos visuais dos KPIs principais
- Tabela de dados detalhados
- Botão "Exportar" (CSV/PDF)
- Opção de compartilhamento

**Interações:**
- Aplicação de filtros dinâmicos
- Toque nos gráficos para drill-down
- Exportação com loading feedback

```
[Inserir wireframe da tela de relatórios aqui]
```

---

#### 4.2.8. Gestão de Usuários (T08)

**Elementos:**
- Lista de usuários com foto, nome, papel e status
- Botão "+" para adicionar novo usuário
- Filtros: papel, status (ativo/inativo)
- Formulário de criação/edição:
  - Nome completo
  - E-mail
  - Senha (apenas na criação)
  - Papel (dropdown)
  - Status (toggle ativo/inativo)

**Interações:**
- Toque no usuário abre edição
- Swipe para desativar rapidamente
- Confirmação antes de desativar

```
[Inserir wireframe da tela de usuários aqui]
```

---

### 4.3. Fluxograma de Interação

#### 4.3.1. Fluxograma - Processo de Pedido Completo

```
[Inserir fluxograma mostrando a jornada completa desde login até fechamento da comanda]

Início → Login → Autenticação → Dashboard → Abrir Comanda → 
Adicionar Itens → Enviar Cozinha → Preparar → Notificar → 
Entregar → Solicitar Fechamento → Processar Pagamento → Fechar Comanda → Fim
```

---

#### 4.3.2. Fluxograma - Tratamento de Erros

```
[Inserir fluxograma mostrando como o sistema lida com falhas de conexão, 
cancelamentos e outros cenários de exceção]
```

---

### 4.4. Protótipo Interativo

O protótipo interativo foi desenvolvido utilizando **Figma** e contempla todas as telas principais com navegação funcional.

**Link do protótipo:** `[Inserir link do Figma aqui]`

**Funcionalidades do protótipo:**
- Navegação entre telas
- Simulação de adição de itens
- Transições de status
- Feedback visual de ações

---

### 4.5. Design Visual

#### 4.5.1. Paleta de Cores

- **Primária:** `#FF6B35` (laranja vibrante) - ações principais, CTAs
- **Secundária:** `#004E89` (azul escuro) - cabeçalhos, navegação
- **Acento:** `#F7B32B` (amarelo) - alertas, destaque
- **Sucesso:** `#2ECC71` (verde) - confirmações, status pronto
- **Erro:** `#E74C3C` (vermelho) - erros, cancelamentos
- **Neutro:** `#ECF0F1` (cinza claro) - backgrounds
- **Texto:** `#2C3E50` (cinza escuro) - texto principal

---

#### 4.5.2. Tipografia

- **Família:** Roboto (Android) / San Francisco (iOS)
- **Títulos:** Bold, 24px
- **Subtítulos:** Medium, 18px
- **Corpo:** Regular, 16px
- **Legendas:** Regular, 14px

---

#### 4.5.3. Ícones

- Biblioteca: **Material Icons** e **Ionicons**
- Estilo: Outlined para navegação, Filled para ações
- Tamanho padrão: 24px

---

#### 4.5.4. Componentes de Interface

**Botões:**
- Primário: fundo laranja, texto branco, cantos arredondados (8px)
- Secundário: borda laranja, texto laranja, fundo transparente
- Desabilitado: cinza claro

**Cards:**
- Fundo branco, sombra sutil
- Padding: 16px
- Border radius: 12px

**Inputs:**
- Borda cinza clara
- Focus: borda laranja
- Erro: borda vermelha

---

## 5. Fluxo de Dados

### 5.1. Arquitetura de Dados

```
Mobile App (React Native)
    ↕️ (HTTPS/REST)
API Gateway
    ↕️
[AutenticacaoService] [PedidoService] [PagamentoService] [RelatorioService]
    ↕️
Banco de Dados (MySQL)
```

---

### 5.2. Fluxo de Sincronização

1. **Envio de Pedido:**
   - App coleta dados do pedido
   - Envia requisição POST para `/api/pedidos`
   - Backend valida e persiste
   - Retorna confirmação com ID do pedido
   - App atualiza interface local

2. **Atualização de Status:**
   - Cozinha altera status via KDS
   - Backend atualiza banco
   - Emite notificação via WebSocket/SignalR
   - App do atendente recebe atualização em tempo real

3. **Consulta de Relatórios:**
   - App envia filtros para `/api/relatorios`
   - Backend processa query
   - Retorna dados agregados
   - App renderiza gráficos

---

## 6. Tecnologias Utilizadas

### 6.1. Frontend Mobile

- **Framework:** React Native 0.72+
- **Linguagem:** TypeScript
- **Gerenciamento de Estado:** Context API / Zustand
- **Navegação:** React Navigation 6
- **Componentes UI:** React Native Paper / Native Base
- **Requisições HTTP:** Axios
- **Notificações Push:** React Native Firebase (FCM)
- **Gráficos:** Victory Native / React Native Chart Kit

---

### 6.2. Backend (Integração)

- **.NET 9** (APIs REST)
- **MySQL** (Banco de dados)
- **Redis** (Cache)
- **SignalR** (Comunicação em tempo real)

---

### 6.3. Ferramentas de Desenvolvimento

- **IDE:** Visual Studio Code
- **Controle de versão:** Git + GitHub
- **Design:** Figma
- **Teste de APIs:** Postman / Swagger
- **Emuladores:** Android Studio, Xcode

---

## 7. Considerações de Segurança

### 7.1. Autenticação e Autorização

- **JWT (JSON Web Tokens)** para autenticação stateless
- Tokens armazenados de forma segura usando **SecureStore** (Expo) ou **Keychain** (iOS) / **Keystore** (Android)
- Refresh tokens para renovação automática
- Controle de acesso baseado em papéis (RBAC)

---

### 7.2. Comunicação Segura

- Todas as comunicações via **HTTPS/TLS 1.3**
- Certificate pinning para prevenir ataques man-in-the-middle
- Validação de certificados SSL

---

### 7.3. Proteção de Dados

- Senhas criptografadas com **bcrypt** no backend
- Dados sensíveis não armazenados em plain text
- Implementação de **OWASP Mobile Top 10**

---

### 7.4. Prevenção de Ataques

- Proteção contra **SQL Injection** (prepared statements)
- Sanitização de inputs
- Rate limiting nas APIs
- Logs de auditoria de todas as operações críticas

---

## 8. Implantação

### 8.1. Requisitos de Hardware e Software

**Dispositivos Suportados:**
- **Android:** 8.0 (API 26) ou superior
- **iOS:** 13.0 ou superior
- Mínimo 2GB RAM
- 100MB de espaço disponível

**Infraestrutura Backend:**
- Servidor Linux (Ubuntu 22.04 LTS)
- 4GB RAM mínimo
- MySQL 8.0+
- Redis 7.0+

---

### 8.2. Processo de Deploy

#### 8.2.1. Build do Aplicativo

**Android:**
```bash
cd src/foodtrack
npx react-native build-android --mode=release
```

**iOS:**
```bash
cd src/foodtrack/ios
pod install
xcodebuild -workspace FoodTrack.xcworkspace -scheme FoodTrack -configuration Release
```

---

#### 8.2.2. Publicação nas Lojas

**Google Play Store:**
1. Criar conta de desenvolvedor
2. Preparar assets (ícone, screenshots, descrição)
3. Gerar APK/AAB assinado
4. Submeter para revisão
5. Aguardar aprovação (1-3 dias)

**Apple App Store:**
1. Conta Apple Developer
2. Configurar App Store Connect
3. Gerar build via Xcode
4. Submeter para revisão
5. Aguardar aprovação (1-7 dias)

---

### 8.3. Configuração de Ambiente

**Variáveis de Ambiente (.env):**
```
API_BASE_URL=https://api.foodtrack.com
API_TIMEOUT=30000
ENVIRONMENT=production
ENABLE_LOGS=false
SENTRY_DSN=<sentry_url>
```

---

## 9. Testes

### 9.1. Estratégia de Testes

A aplicação será submetida a uma abordagem de testes em múltiplas camadas para garantir qualidade e confiabilidade.

---

### 9.2. Testes Unitários

**Objetivo:** Testar unidades individuais de código (funções, componentes).

**Ferramenta:** Jest + React Native Testing Library

**Casos de Teste:**
- Validação de formulários (login, adição de item)
- Cálculos de totais e subtotais
- Formatação de datas e valores
- Lógica de autenticação
- Funções de utilidade

**Cobertura esperada:** Mínimo 70%

---

### 9.3. Testes de Integração

**Objetivo:** Verificar interação entre componentes e APIs.

**Cenários:**
1. **Fluxo completo de pedido:**
   - Login → Abrir comanda → Adicionar item → Enviar para cozinha
   - Verificar que pedido aparece no KDS
   - Alterar status para "Pronto"
   - Verificar notificação no app do atendente

2. **Fluxo de pagamento:**
   - Solicitar fechamento
   - Calcular total com taxa de serviço
   - Processar pagamento
   - Verificar comanda fechada

3. **Fluxo de relatório:**
   - Selecionar período
   - Aplicar filtros
   - Verificar dados retornados
   - Exportar CSV

---

### 9.4. Testes de Interface (E2E)

**Objetivo:** Simular interações reais do usuário.

**Ferramenta:** Detox (React Native)

**Cenários:**
- Jornada completa do atendente (da abertura ao fechamento)
- Jornada da cozinha (receber, preparar, marcar como pronto)
- Criação de usuário pelo gerente
- Visualização de relatórios

---

### 9.5. Testes de Usabilidade

**Método:** Teste com usuários reais (3-5 pessoas por perfil)

**Métricas:**
- Tempo para completar tarefas principais
- Taxa de erro
- Satisfação subjetiva (escala Likert)

**Tarefas:**
- "Abra uma comanda para a mesa 5 e adicione 2 itens"
- "Marque o pedido da mesa 3 como pronto"
- "Feche a comanda da mesa 7 com pagamento em cartão"

---

### 9.6. Testes de Performance

**Cenários:**
- Carregamento inicial do app (< 3 segundos)
- Tempo de resposta ao adicionar item (< 500ms)
- Consumo de memória (< 100MB)
- Consumo de bateria (teste de 1 hora de uso contínuo)

**Ferramentas:** React Native Performance Monitor, Flipper

---

### 9.7. Testes de Segurança

**Verificações:**
- Tokens não expostos em logs
- Comunicação apenas via HTTPS
- Validação de inputs
- Proteção contra XSS e injeção
- Teste de penetração básico

---

### 9.8. Documentação de Testes

#### 9.8.1. Plano de Testes

| ID    | Descrição do Teste | Tipo | Prioridade | Responsável | Status |
|-------|-------------------|------|-----------|-------------|---------|
| T-001 | Login com credenciais válidas | Funcional | Alta | - | Pendente |
| T-002 | Login com credenciais inválidas | Funcional | Alta | - | Pendente |
| T-003 | Adicionar item à comanda | Funcional | Alta | - | Pendente |
| T-004 | Enviar pedido para cozinha | Integração | Alta | - | Pendente |
| T-005 | Atualizar status no KDS | Funcional | Alta | - | Pendente |
| T-006 | Receber notificação de item pronto | Integração | Alta | - | Pendente |
| T-007 | Processar pagamento em dinheiro | Funcional | Média | - | Pendente |
| T-008 | Processar pagamento em cartão | Funcional | Média | - | Pendente |
| T-009 | Gerar relatório de vendas | Integração | Média | - | Pendente |
| T-010 | Criar novo usuário | Funcional | Baixa | - | Pendente |

---

#### 9.8.2. Casos de Teste Detalhados

**CT-001: Login com Credenciais Válidas**

| Item | Descrição |
|------|-----------|
| **Pré-condições** | Aplicativo instalado, usuário cadastrado |
| **Dados de entrada** | E-mail: `atendente@foodtrack.com`, Senha: `123456` |
| **Passos** | 1. Abrir app<br>2. Inserir e-mail<br>3. Inserir senha<br>4. Tocar em "Entrar" |
| **Resultado esperado** | Redirecionamento para dashboard do atendente |
| **Resultado obtido** | - |
| **Status** | Pendente |

---

**CT-004: Enviar Pedido para Cozinha**

| Item | Descrição |
|------|-----------|
| **Pré-condições** | Usuário autenticado, comanda aberta, itens adicionados |
| **Dados de entrada** | Mesa 5, 1x Hambúrguer, 1x Refrigerante |
| **Passos** | 1. Abrir comanda da mesa 5<br>2. Adicionar itens<br>3. Tocar "Enviar para Cozinha" |
| **Resultado esperado** | Confirmação visual, itens aparecem no KDS |
| **Resultado obtido** | - |
| **Status** | Pendente |

---

*Nota: Demais casos de teste serão documentados seguindo o mesmo formato.*

---

## 10. Controle de Mudanças

### 10.1. Gestão de Trabalho no GitHub

#### 10.1.1. Quadro Kanban (Projects)

**Retrato atual do quadro (Data: [Inserir data]):**

![Print do GitHub Projects]

**Colunas:**
- Backlog
- To Do
- In Progress
- In Review
- Done

**Total de tarefas:**
- Backlog: X tarefas
- To Do: X tarefas
- In Progress: X tarefas
- In Review: X tarefas
- Done: X tarefas

---

#### 10.1.2. Status de Contribuições

**Retrato do Insights/Contributors (Data: [Inserir data]):**

![Print do GitHub Contributors]

**Resumo de Commits:**

| Membro | Commits | Linhas Adicionadas | Linhas Removidas |
|--------|---------|-------------------|------------------|
| Gilberto Modesto | X | +X | -X |
| Guilherme Lanza | X | +X | -X |
| Isabela Gomes | X | +X | -X |
| Luana Paula | X | +X | -X |
| Maria Eduarda | X | +X | -X |
| Victor Antoniel | X | +X | -X |
| Warley Junio | X | +X | -X |

---

### 10.2. Responsabilidades e Atribuições

#### 10.2.1. Divisão de Responsabilidades

| Membro | Papel Principal | Responsabilidades |
|--------|----------------|-------------------|
| **Gilberto Modesto** | Frontend Mobile | Desenvolvimento de telas do atendente, integração com APIs |
| **Guilherme Lanza** | Backend - APIs | Desenvolvimento de endpoints, NotificacaoService |
| **Isabela Gomes** | Documentação & QA | Elaboração de docs, coordenação, testes |
| **Luana Paula** | Frontend Mobile | UI/UX, componentes visuais, wireframes |
| **Maria Eduarda** | Backend - APIs | PedidoService, PagamentoService |
| **Victor Antoniel** | Arquitetura & DevOps | Arquitetura da solução, infraestrutura |
| **Warley Junio** | Backend - APIs | RelatorioService, KDS backend |

---

#### 10.2.2. Comentários Adicionais

- **Gilberto Modesto:** Responsável por implementar as telas de gestão de comandas e lista de prontos. Trabalhou em estreita colaboração com o time de backend para garantir integração fluida.

- **Guilherme Lanza:** Liderou o desenvolvimento do NotificacaoService, garantindo que as notificações funcionassem em tempo real. Realizou testes extensivos via Swagger.

- **Isabela Gomes:** Além da documentação técnica, coordenou reuniões semanais e revisou todos os commits para garantir qualidade do código. Criou os casos de teste detalhados.

- **Luana Paula:** Focou na experiência do usuário, criando wireframes de alta fidelidade no Figma. Implementou a biblioteca de componentes reutilizáveis.

- **Maria Eduarda:** Desenvolveu a lógica de cálculo de totais e integração com sistemas de pagamento. Trabalhou na validação de dados de entrada.

- **Victor Antoniel:** Definiu a arquitetura de microserviços e configurou o ambiente de deploy. Responsável por diagramas técnicos e documentação de arquitetura.

- **Warley Junio:** Implementou o RelatorioService com queries otimizadas e geração de gráficos no backend. Trabalhou na performance das consultas.

---

## 11. Planejamento

### 11.1. Quadro de Tarefas

#### Semana 1 - Planejamento e Modelagem

Atualizado em: [Data]

| Responsável | Tarefa/Requisito | Iniciado em | Prazo | Status | Terminado em |
|------------|------------------|-------------|-------|--------|--------------|
| Isabela Gomes | Estruturação da documentação ETAPA 4 | - | - | 📝 | - |
| Victor Antoniel | Modelagem BPMN dos processos | - | - | ❌ | - |
| Todos | Revisão de requisitos funcionais | - | - | ❌ | - |
| Warley Junio | Definição de KPIs e metas | - | - | ❌ | - |

---

#### Semana 2 - Design de Interface

Atualizado em: [Data]

| Responsável | Tarefa/Requisito | Iniciado em | Prazo | Status | Terminado em |
|------------|------------------|-------------|-------|--------|--------------|
| Luana Paula | Criação de wireframes mobile | - | - | ❌ | - |
| Gilberto Modesto | Protótipo interativo no Figma | - | - | ❌ | - |
| Luana Paula | Definição de paleta de cores | - | - | ❌ | - |
| Gilberto Modesto | Fluxogramas de interação | - | - | ❌ | - |

---

#### Semana 3 - Desenvolvimento Mobile

Atualizado em: [Data]

| Responsável | Tarefa/Requisito | Iniciado em | Prazo | Status | Terminado em |
|------------|------------------|-------------|-------|--------|--------------|
| Gilberto Modesto | Implementação telas de comanda | - | - | ❌ | - |
| Luana Paula | Implementação telas de prontos | - | - | ❌ | - |
| Guilherme Lanza | Integração com NotificacaoService | - | - | ❌ | - |
| Maria Eduarda | Integração com PedidoService | - | - | ❌ | - |

---

#### Semana 4 - Testes e Documentação

Atualizado em: [Data]

| Responsável | Tarefa/Requisito | Iniciado em | Prazo | Status | Terminado em |
|------------|------------------|-------------|-------|--------|--------------|
| Isabela Gomes | Elaboração de casos de teste | - | - | ❌ | - |
| Todos | Execução de testes de integração | - | - | ❌ | - |
| Victor Antoniel | Testes de performance | - | - | ❌ | - |
| Isabela Gomes | Documentação final e prints GitHub | - | - | ❌ | - |

---

**Legenda:**
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

---

## 12. Referências

- React Native Documentation. Disponível em: https://reactnative.dev/
- BPMN 2.0 Specification. Disponível em: https://www.omg.org/spec/BPMN/2.0/
- OWASP Mobile Security Testing Guide. Disponível em: https://owasp.org/www-project-mobile-security-testing-guide/
- Material Design Guidelines. Disponível em: https://material.io/design
- Human Interface Guidelines (Apple). Disponível em: https://developer.apple.com/design/human-interface-guidelines/
- REST API Design Best Practices. Disponível em: https://restfulapi.net/
- Clean Architecture (Robert C. Martin)
- Documentação .NET 9. Disponível em: https://docs.microsoft.com/dotnet/

---

## 13. Anexos

### 13.1. Glossário

- **KDS:** Kitchen Display System (Sistema de Display da Cozinha)
- **ERP:** Enterprise Resource Planning (Planejamento de Recursos Empresariais)
- **BPMN:** Business Process Model and Notation
- **JWT:** JSON Web Token
- **RBAC:** Role-Based Access Control
- **NPS:** Net Promoter Score
- **API:** Application Programming Interface
- **REST:** Representational State Transfer

---

### 13.2. Histórico de Versões

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0 | [Data] | Isabela Gomes | Criação da estrutura completa da documentação |
| 1.1 | [Data] | - | - |

---

**Fim do documento**

