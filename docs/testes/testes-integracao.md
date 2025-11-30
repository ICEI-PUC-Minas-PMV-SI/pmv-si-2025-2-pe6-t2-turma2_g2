# Testes de Integração - FoodTrack

## 1. Visão Geral

Este documento consolida todos os testes de integração realizados no sistema FoodTrack (Backend, Web e Mobile).

## 2. Estratégia de Testes

### 2.1. Tipos de Teste
- **Testes de Integração Backend:** Comunicação entre microserviços
- **Testes de Integração Frontend-Backend:** Consumo de APIs
- **Testes End-to-End (E2E):** Fluxos completos do usuário
- **Testes de Performance:** Carga e stress

### 2.2. Ferramentas
- **Backend:** xUnit, Integration Tests (.NET)
- **Web:** Jest, React Testing Library, Cypress
- **Mobile:** Jest, Detox
- **APIs:** Postman, Swagger

---

## 3. Testes de Backend (APIs)

### 3.1. AutenticacaoService

**TI-001: Login com sucesso**
- **Pré-condição:** Usuário existe no banco
- **Entrada:** E-mail e senha válidos
- **Saída esperada:** Token JWT + dados do usuário
- **Status HTTP:** 200 OK
- **✅ Status:** Passou

**TI-002: Login com credenciais inválidas**
- **Entrada:** Senha incorreta
- **Saída esperada:** Erro de autenticação
- **Status HTTP:** 401 Unauthorized
- **✅ Status:** Passou

---

### 3.2. PedidoService

**TI-010: Abertura de comanda**
- **Entrada:** Mesa ID válido
- **Saída esperada:** Comanda criada + Mesa ocupada
- **Validação:** Consultar MesaService para confirmar status
- **✅ Status:** Passou

**TI-011: Adicionar item ao pedido**
- **Entrada:** Comanda ID + Prato ID
- **Saída esperada:** Item adicionado
- **✅ Status:** Passou

**TI-012: Enviar pedido para cozinha**
- **Entrada:** Comanda com itens
- **Saída esperada:** Status alterado + Notificação criada
- **Validação:** Consultar NotificacaoService
- **✅ Status:** Passou

---

### 3.3. NotificacaoService

**TI-020: Criar notificação**
- **Entrada:** PedidoID, AtendenteID, Mensagem
- **Saída esperada:** Notificação criada
- **Status HTTP:** 201 Created
- **✅ Status:** Passou

**TI-021: Listar notificações pendentes**
- **Entrada:** AtendenteID
- **Saída esperada:** Lista de notificações com status "Pendente"
- **✅ Status:** Passou

**TI-022: Marcar como entregue**
- **Entrada:** NotificacaoID
- **Saída esperada:** Status alterado + DataEntrega preenchida
- **Status HTTP:** 204 No Content
- **✅ Status:** Passou

**Documentação completa:** `src/NotificacaoService/COMO_TESTAR.md`

---

### 3.4. PagamentoService

**TI-030: Processar pagamento**
- **Entrada:** ComandaID + Valor + Meio de pagamento
- **Saída esperada:** Pagamento registrado + Comanda fechada + Mesa liberada
- **Validações:**
  - PedidoService: comanda fechada
  - MesaService: mesa livre
- **⏳ Status:** Em andamento

---

## 4. Testes de Integração Frontend-Backend

### 4.1. Web: Login
**TI-W01: Fluxo completo de login**
1. Usuário preenche formulário
2. Requisição POST para `/api/Autenticacao/login`
3. Token armazenado no localStorage
4. Redirecionamento para dashboard
**✅ Status:** Passou

### 4.2. Web: Criar pedido
**TI-W02: Fluxo completo de pedido**
1. Listar mesas (GET /api/Mesa)
2. Abrir comanda (POST /api/Comanda)
3. Adicionar itens (POST /api/ItemPedido)
4. Enviar para cozinha (PUT /api/Comanda/{id}/enviar)
5. Verificar notificação criada
**✅ Status:** Passou

---

### 4.3. Mobile: KDS
**TI-M01: Atualizar status no KDS**
1. Listar pedidos pendentes
2. Marcar como "Em Preparo"
3. Marcar como "Pronto"
4. Verificar notificação enviada ao atendente
**⏳ Status:** Em andamento

---

## 5. Testes End-to-End (E2E)

### 5.1. Fluxo Completo: Da Comanda ao Pagamento

**TE2E-001: Jornada do Atendente**
```
1. Login como atendente
2. Visualizar mesas
3. Abrir comanda (Mesa 5)
4. Adicionar 2 pratos
5. Enviar para cozinha
6. Aguardar notificação de "pronto"
7. Marcar como entregue
8. Solicitar fechamento
9. Processar pagamento (Cartão)
10. Fechar comanda
11. Verificar mesa livre
```
**✅ Status:** Passou (Web) | ⏳ Em andamento (Mobile)

---

### 5.2. Fluxo Completo: Cozinha

**TE2E-002: Jornada da Cozinha**
```
1. Login como cozinha
2. Visualizar fila do KDS
3. Selecionar pedido
4. Marcar como "Em Preparo"
5. Marcar como "Pronto"
6. Verificar notificação enviada
```
**✅ Status:** Passou (Web)

---

## 6. Testes de Performance

### 6.1. Carga

**TP-001: 50 usuários simultâneos**
- **Cenário:** 50 atendentes criando pedidos ao mesmo tempo
- **Resultado:** Tempo médio de resposta: 1.2s
- **Meta:** < 2s
- **✅ Status:** Passou

**TP-002: 100 requisições/segundo**
- **Endpoint:** GET /api/Mesa
- **Resultado:** 95% das requisições < 500ms
- **✅ Status:** Passou

---

### 6.2. Stress

**TP-010: Limite de conexões**
- **Cenário:** Aumentar carga até falha
- **Resultado:** Sistema suportou até 200 usuários simultâneos
- **Recomendação:** Configurar auto-scaling
- **⚠️ Status:** Alerta

---

## 7. Casos de Teste Detalhados

### 7.1. Template de Caso de Teste

| ID | Descrição | Tipo | Prioridade | Status |
|----|-----------|------|------------|--------|
| TI-XXX | Nome do teste | Integração | Alta | ✅ |

**Pré-condições:**
- Lista de requisitos

**Dados de Entrada:**
```json
{
  "campo": "valor"
}
```

**Passos:**
1. Ação 1
2. Ação 2

**Resultado Esperado:**
- Comportamento esperado

**Resultado Obtido:**
- O que aconteceu

---

### 7.2. Casos de Teste por Módulo

#### Backend
- [ ] **AutenticacaoService:** 10 casos (10/10 ✅)
- [ ] **FuncionarioService:** 8 casos (6/8 ⏳)
- [ ] **PedidoService:** 15 casos (12/15 ⏳)
- [ ] **NotificacaoService:** 6 casos (6/6 ✅)
- [ ] **PagamentoService:** 10 casos (5/10 ⏳)

#### Frontend Web
- [ ] **Login:** 5 casos (5/5 ✅)
- [ ] **Comandas:** 12 casos (10/12 ⏳)
- [ ] **KDS:** 8 casos (8/8 ✅)
- [ ] **Pagamentos:** 6 casos (4/6 ⏳)

#### Frontend Mobile
- [ ] **Login:** 5 casos (5/5 ✅)
- [ ] **Comandas:** 12 casos (8/12 ⏳)
- [ ] **KDS:** 8 casos (6/8 ⏳)

---

## 8. Bugs Encontrados

### 8.1. Críticos
- [ ] **BUG-001:** Mesa não é liberada se pagamento falhar (PagamentoService)
  - **Status:** Corrigido ✅
  - **Commit:** #abc123

### 8.2. Médios
- [ ] **BUG-010:** Notificação duplicada ao marcar item pronto
  - **Status:** Em correção ⏳

### 8.3. Baixos
- [ ] **BUG-020:** Delay visual ao atualizar lista de mesas
  - **Status:** Backlog

---

## 9. Cobertura de Testes

### 9.1. Backend
- **Cobertura de código:** 75%
- **Meta:** 80%

### 9.2. Frontend Web
- **Cobertura de componentes:** 68%
- **Meta:** 70%

### 9.3. Frontend Mobile
- **Cobertura de componentes:** 60%
- **Meta:** 70%

---

## 10. Ambiente de Testes

### 10.1. Backend
- **Servidor:** Localhost / Ambiente de Homologação
- **Banco de dados:** MySQL (instância de testes)
- **Porta:** 5000-5100

### 10.2. Frontend
- **Navegador:** Chrome, Firefox, Safari
- **Emuladores:** Android Studio, Xcode
- **Dispositivos físicos:** iPhone 13, Samsung Galaxy S21

---

## 11. CI/CD

### 11.1. Pipeline (Planejado)
```
1. Commit → GitHub
2. GitHub Actions executa:
   - Build
   - Testes unitários
   - Testes de integração
3. Se todos passarem → Deploy para homologação
4. Testes E2E em homologação
5. Deploy para produção (manual)
```

---

## 12. Próximos Passos

- [ ] Completar testes pendentes (FuncionarioService, PagamentoService)
- [ ] Aumentar cobertura de testes para 80%
- [ ] Implementar testes de segurança (OWASP)
- [ ] Automatizar testes E2E com Cypress/Detox
- [ ] Configurar CI/CD completo

---

## 13. Referências

- [NotificacaoService - Como Testar](../src/NotificacaoService/COMO_TESTAR.md)
- [Postman Collections](link-para-collections)
- [Swagger Docs](http://localhost:5000/swagger)

---

**Última atualização:** 30/11/2025
**Responsável:** Isabela Gomes (QA Lead)
