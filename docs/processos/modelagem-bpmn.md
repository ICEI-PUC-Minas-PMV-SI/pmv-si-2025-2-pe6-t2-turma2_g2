# Modelagem de Processos de Negócio - BPMN 2.0

## 1. Introdução

Este documento apresenta a modelagem completa dos processos de negócio do sistema FoodTrack utilizando a notação BPMN 2.0 (Business Process Model and Notation).

### 1.1. Metodologia
- **Notação:** BPMN 2.0
- **Ferramenta:** [Bizagi Modeler / Draw.io / Lucidchart]
- **Nível de detalhamento:** Processos operacionais

### 1.2. Legenda BPMN

**Elementos Principais:**
- 🟢 **Evento de Início** (círculo verde)
- 🔴 **Evento de Fim** (círculo vermelho)
- ◻️ **Atividade/Tarefa** (retângulo)
- ◇ **Gateway de Decisão** (losango)
- 🏊 **Raias (Swimlanes)** - Atores envolvidos

---

## 2. Visão Geral dos Processos

### 2.1. Mapa de Processos

```
┌─────────────────────────────────────────────────┐
│          PROCESSOS DO FOODTRACK                 │
├─────────────────────────────────────────────────┤
│ 1. Autenticação e Controle de Acesso           │
│ 2. Gestão de Comandas e Pedidos                │
│ 3. Preparo de Pedidos (KDS)                    │
│ 4. Notificações em Tempo Real                  │
│ 5. Entrega de Pedidos                          │
│ 6. Pagamento e Fechamento de Comanda           │
│ 7. Geração de Relatórios                       │
│ 8. Gestão de Usuários                          │
│ 9. Gerenciamento de Cardápio                   │
│ 10. Controle de Mesas                          │
└─────────────────────────────────────────────────┘
```

---

## 3. Processos Detalhados

### 3.1. Processo: Autenticação e Controle de Acesso

**Descrição:** Processo de login e validação de credenciais do usuário.

**Atores:**
- Usuário (Atendente, Cozinha, Caixa, Gerente)
- Sistema (AutenticacaoService)

**Atividades:**
1. Usuário abre aplicação
2. Sistema exibe tela de login
3. Usuário insere e-mail e senha
4. Sistema valida credenciais
5. **[Decisão]** Credenciais válidas?
   - ✅ SIM → Gera token JWT → Redireciona para dashboard
   - ❌ NÃO → Exibe erro → Retorna para login
6. Fim

**Diagrama BPMN:**
```
[Inserir imagem: img/processos/bpmn-autenticacao.png]
```

**Backend:**
- `AutenticacaoService`: POST /api/Autenticacao/login

**Frontend:**
- Web: `login.tsx`
- Mobile: `app/login.tsx`

**Requisitos Derivados:**
- RF-001: Autenticar usuários
- RNF-002: Segurança (JWT, HTTPS)
- RNF-001: Performance (resposta < 2s)

---

### 3.2. Processo: Gestão de Comandas e Pedidos

**Descrição:** Abertura de comanda, adição de itens e envio para cozinha.

**Atores:**
- Atendente
- Sistema (PedidoService, MesaService, PratoService)

**Atividades:**
1. Atendente visualiza mesas disponíveis
2. Atendente seleciona mesa
3. Sistema abre comanda para a mesa
4. Sistema atualiza status da mesa para "Ocupada"
5. **[Loop]** Para cada item:
   - Atendente seleciona prato do cardápio
   - Atendente adiciona observações (opcional)
   - Atendente adiciona acréscimos (opcional)
   - Sistema adiciona item à comanda
6. Atendente revisa itens
7. Atendente confirma envio
8. Sistema envia pedido para cozinha
9. Sistema cria notificação para cozinha
10. Fim

**Diagrama BPMN:**
```
[Inserir imagem: img/processos/bpmn-gestao-comandas.png]
```

**Backend:**
- `MesaService`: GET /api/Mesa?status=livre
- `PedidoService`: POST /api/Comanda
- `PedidoService`: POST /api/ItemPedido
- `PedidoService`: PUT /api/Comanda/{id}/enviar
- `NotificacaoService`: POST /api/Notificacoes

**Frontend:**
- Web: `pedidos.tsx`, `pagamento.tsx`
- Mobile: `app/pedidos.tsx`

**Requisitos Derivados:**
- RF-002: Gestão de comandas e pedidos
- RF-008: Observações personalizadas
- RNF-004: Responsividade
- RNF-001: Performance

---

### 3.3. Processo: Preparo de Pedidos (KDS)

**Descrição:** Visualização e gerenciamento do preparo na cozinha.

**Atores:**
- Cozinha
- Sistema (PedidoService, NotificacaoService)

**Atividades:**
1. Sistema recebe pedido
2. Sistema exibe pedido no KDS
3. Cozinha visualiza fila de pedidos
4. Cozinha seleciona pedido
5. Cozinha marca status como "Em Preparo"
6. Sistema atualiza status do pedido
7. Cozinha prepara item
8. Cozinha marca status como "Pronto"
9. Sistema atualiza status
10. Sistema cria notificação para atendente
11. Fim

**Decisões:**
- Se pedido cancelado → Marca como "Cancelado" → Notifica atendente

**Diagrama BPMN:**
```
[Inserir imagem: img/processos/bpmn-kds.png]
```

**Backend:**
- `PainelService`: GET /api/Painel/pedidos-pendentes
- `PedidoService`: PUT /api/ItemPedido/{id}/status
- `NotificacaoService`: POST /api/Notificacoes

**Frontend:**
- Web: `kds.tsx`
- Mobile: `app/kds.tsx`

**Requisitos Derivados:**
- RF-003: KDS Cozinha
- RF-004: Notificações
- RNF-001: Performance (atualização em tempo real)

---

### 3.4. Processo: Notificações em Tempo Real

**Descrição:** Envio e recebimento de notificações de status.

**Atores:**
- Sistema (NotificacaoService)
- Atendente

**Atividades:**
1. Sistema identifica mudança de status (item pronto)
2. Sistema cria notificação
3. Sistema envia notificação para atendente responsável
4. Atendente recebe alerta visual/sonoro
5. Atendente visualiza lista de itens prontos
6. Atendente coleta item na cozinha
7. Atendente marca como entregue
8. Sistema atualiza status da notificação
9. Fim

**Diagrama BPMN:**
```
[Inserir imagem: img/processos/bpmn-notificacoes.png]
```

**Backend:**
- `NotificacaoService`: POST /api/Notificacoes
- `NotificacaoService`: GET /api/Notificacoes/pendentes
- `NotificacaoService`: PATCH /api/Notificacoes/{id}/entregar

**Frontend:**
- Web: componente de notificações
- Mobile: push notifications

**Requisitos Derivados:**
- RF-004: Notificações de itens prontos
- RNF-001: Tempo de resposta < 2s
- RNF-007: Suportar múltiplos usuários simultâneos

---

### 3.5. Processo: Entrega de Pedidos

**Descrição:** Controle da entrega de itens ao cliente.

**Atores:**
- Atendente
- Cliente
- Sistema

**Atividades:**
1. Atendente recebe notificação de item pronto
2. Atendente vai até a cozinha
3. Atendente coleta item
4. Atendente entrega ao cliente
5. Atendente marca item como entregue no sistema
6. Sistema atualiza status
7. **[Decisão]** Todos os itens entregues?
   - ✅ SIM → Comanda disponível para fechamento
   - ❌ NÃO → Aguarda próximos itens
8. Fim

**Diagrama BPMN:**
```
[Inserir imagem: img/processos/bpmn-entrega.png]
```

**Requisitos Derivados:**
- RF-004: Marcar como entregue
- RF-009: Histórico de pedidos

---

### 3.6. Processo: Pagamento e Fechamento de Comanda

**Descrição:** Cálculo, processamento de pagamento e fechamento da comanda.

**Atores:**
- Cliente
- Atendente/Caixa
- Sistema (PagamentoService, PedidoService, MesaService)

**Atividades:**
1. Cliente solicita conta
2. Atendente consulta comanda
3. Sistema calcula total (itens + acréscimos + taxa de serviço)
4. Atendente informa valor ao cliente
5. Cliente escolhe forma de pagamento
6. **[Decisão]** Forma de divisão?
   - Conta única
   - Divisão igual
   - Divisão por item
   - Divisão customizada
7. Atendente registra pagamento
8. Sistema processa pagamento
9. **[Decisão]** Pagamento aprovado?
   - ✅ SIM → Fecha comanda → Libera mesa → Registra venda
   - ❌ NÃO → Exibe erro → Retorna ao passo 5
10. Sistema gera comprovante (opcional)
11. Fim

**Diagrama BPMN:**
```
[Inserir imagem: img/processos/bpmn-pagamento.png]
```

**Backend:**
- `PedidoService`: GET /api/Comanda/{id}
- `PagamentoService`: POST /api/Pagamento
- `PedidoService`: PUT /api/Comanda/{id}/fechar
- `MesaService`: PUT /api/Mesa/{id}/status

**Frontend:**
- Web: `pagamento.tsx`
- Mobile: `app/pagamento.tsx`

**Requisitos Derivados:**
- RF-005: Pagamento e fechamento
- RF-010: Transferência de itens (divisão)
- RNF-002: Segurança em transações

---

### 3.7. Processo: Geração de Relatórios

**Descrição:** Consulta e exportação de relatórios gerenciais.

**Atores:**
- Gerente
- Sistema (RelatorioService)

**Atividades:**
1. Gerente acessa módulo de relatórios
2. Gerente seleciona tipo de relatório
3. Gerente define filtros (período, atendente, etc)
4. Sistema processa consulta
5. Sistema agrega dados
6. Sistema exibe relatório
7. **[Decisão]** Exportar?
   - ✅ SIM → Gerente escolhe formato (CSV/PDF) → Sistema gera arquivo
   - ❌ NÃO → Fim
8. Fim

**Diagrama BPMN:**
```
[Inserir imagem: img/processos/bpmn-relatorios.png]
```

**Backend:**
- `RelatorioService`: GET /api/Relatorio/vendas
- `RelatorioService`: GET /api/Relatorio/exportar

**Frontend:**
- Web: `relatorio.tsx`
- Mobile: `app/relatorio.tsx`

**Requisitos Derivados:**
- RF-006: Relatórios de vendas
- RNF-003: Logs de operações

---

### 3.8. Processo: Gestão de Usuários

**Descrição:** CRUD de funcionários e permissões.

**Atores:**
- Gerente/Admin
- Sistema (FuncionarioService)

**Atividades:**
1. Gerente acessa módulo de usuários
2. Gerente visualiza lista de funcionários
3. **[Decisão]** Ação desejada?
   - **Criar:** Gerente preenche formulário → Sistema valida → Cria usuário
   - **Editar:** Gerente seleciona usuário → Altera dados → Sistema atualiza
   - **Desativar:** Gerente seleciona usuário → Confirma → Sistema desativa
4. Sistema registra operação no log
5. Fim

**Diagrama BPMN:**
```
[Inserir imagem: img/processos/bpmn-usuarios.png]
```

**Backend:**
- `FuncionarioService`: GET /api/Funcionario
- `FuncionarioService`: POST /api/Funcionario
- `FuncionarioService`: PUT /api/Funcionario/{id}
- `FuncionarioService`: DELETE /api/Funcionario/{id}

**Frontend:**
- Web: `funcionarios.tsx`
- Mobile: `app/funcionarios.tsx`

**Requisitos Derivados:**
- RF-007: Administrar usuários
- RNF-002: Controle de acesso
- RNF-003: Auditoria

---

### 3.9. Processo: Gerenciamento de Cardápio

**Descrição:** CRUD de pratos, categorias e ingredientes.

**Atores:**
- Gerente/Admin
- Sistema (PratoService)

**Atividades:**
1. Gerente acessa módulo de cardápio
2. **[Decisão]** Gerenciar o quê?
   - **Pratos:** CRUD de pratos
   - **Categorias:** CRUD de categorias
   - **Ingredientes:** CRUD de ingredientes
   - **Acréscimos:** CRUD de acréscimos
3. Gerente realiza operação desejada
4. Sistema valida dados
5. Sistema persiste alterações
6. Sistema atualiza cache (se aplicável)
7. Fim

**Diagrama BPMN:**
```
[Inserir imagem: img/processos/bpmn-cardapio.png]
```

**Backend:**
- `PratoService`: Múltiplos endpoints

**Requisitos Derivados:**
- RNF-005: Manutenibilidade do código

---

### 3.10. Processo: Controle de Mesas

**Descrição:** Gerenciamento de status e disponibilidade de mesas.

**Atores:**
- Sistema (MesaService)
- Atendente

**Atividades:**
1. Sistema mantém lista de mesas
2. **[Evento]** Comanda aberta → Mesa marcada como "Ocupada"
3. **[Evento]** Comanda fechada → Mesa marcada como "Livre"
4. **[Manual]** Gerente pode marcar como "Reservada" ou "Bloqueada"
5. Fim

**Diagrama BPMN:**
```
[Inserir imagem: img/processos/bpmn-mesas.png]
```

**Requisitos Derivados:**
- RNF-007: Escalabilidade (múltiplas mesas)

---

## 4. Matriz de Rastreabilidade

### 4.1. Processos → Requisitos Funcionais

| Processo | RF-001 | RF-002 | RF-003 | RF-004 | RF-005 | RF-006 | RF-007 | RF-008 |
|----------|--------|--------|--------|--------|--------|--------|--------|--------|
| 3.1. Autenticação | ✅ | - | - | - | - | - | - | - |
| 3.2. Comandas | - | ✅ | - | - | - | - | - | ✅ |
| 3.3. KDS | - | - | ✅ | ✅ | - | - | - | - |
| 3.4. Notificações | - | - | - | ✅ | - | - | - | - |
| 3.5. Entrega | - | - | - | ✅ | - | - | - | - |
| 3.6. Pagamento | - | - | - | - | ✅ | - | - | - |
| 3.7. Relatórios | - | - | - | - | - | ✅ | - | - |
| 3.8. Usuários | ✅ | - | - | - | - | - | ✅ | - |

---

### 4.2. Processos → Implementação

| Processo | Backend | Frontend Web | Frontend Mobile |
|----------|---------|--------------|-----------------|
| 3.1. Autenticação | AutenticacaoService | login.tsx | app/login.tsx |
| 3.2. Comandas | PedidoService | pedidos.tsx | app/pedidos.tsx |
| 3.3. KDS | PainelService | kds.tsx | app/kds.tsx |
| 3.4. Notificações | NotificacaoService | componente | push |
| 3.6. Pagamento | PagamentoService | pagamento.tsx | app/pagamento.tsx |
| 3.7. Relatórios | RelatorioService | relatorio.tsx | app/relatorio.tsx |
| 3.8. Usuários | FuncionarioService | funcionarios.tsx | app/funcionarios.tsx |

---

## 5. Indicadores de Desempenho (KPIs) por Processo

### 5.1. Processo de Comandas
- **Tempo médio de abertura:** < 1 minuto
- **Tempo médio de adição de item:** < 30 segundos
- **Taxa de erro em pedidos:** < 3%

### 5.2. Processo KDS
- **Tempo médio de preparo:** < 15 minutos
- **Taxa de cancelamento:** < 5%
- **Pedidos atrasados:** < 10%

### 5.3. Processo de Pagamento
- **Tempo médio de fechamento:** < 3 minutos
- **Taxa de sucesso em pagamentos:** > 95%
- **Ticket médio:** R$ 80,00

---

## 6. Referências

- [BPMN 2.0 Specification](https://www.omg.org/spec/BPMN/2.0/)
- [Guia BPMN - BPM CBOK](https://www.abpmp-br.org/)

---

**Última atualização:** 30/11/2025
