# Front-end Web

Este projeto tem como objetivo desenvolver a interface web de um sistema de gerenciamento de comandas para restaurantes, com diferentes perfis de usuário (atendente, cozinha, caixa e gerente).  
O MVP visa digitalizar o fluxo de atendimento e preparo, desde a abertura da comanda até o fechamento e emissão de relatórios, garantindo controle, agilidade e integração entre as áreas do estabelecimento.

---

## Projeto da Interface Web

A aplicação web é dividida em telas que atendem a diferentes papéis no processo operacional do restaurante.  
Cada tela foi projetada com base em usabilidade, clareza e eficiência para o usuário final.

As telas definidas são:

- **T01. Login (RF-001):** autenticação e direcionamento do usuário conforme papel.  
- **T02. Mesas e Comandas (RF-002):** visualização e abertura de comandas.  
- **T03. Comanda (RF-002):** registro e envio de itens à cozinha.  
- **T04. Prontos para Entrega (RF-004):** listagem e controle de itens prontos.  
- **T05. KDS Cozinha (RF-003):** gestão do preparo e status dos pedidos.  
- **T06. Pagamento e Fechamento (RF-005):** registro de pagamentos e encerramento da comanda.  
- **T07. Relatórios de Vendas (RF-006):** visão consolidada das vendas.  
- **T08. Usuários e Perfis (RF-007):** gerenciamento de usuários e permissões.

### Wireframes

Os wireframes representam a disposição dos elementos principais de cada tela.

- **T01 - Login:** campos de e-mail e senha, botão "Entrar" e mensagem de erro.  
- **T02 - Mesas e Comandas:** grade de mesas, botão "Abrir Comanda" e campo de busca.  
- **T03 - Comanda:** catálogo de produtos, lista de itens, subtotal e botões de envio.  
- **T04 - Prontos para Entrega:** lista de itens prontos com botão "Marcar como entregue".  
- **T05 - KDS Cozinha:** cartões de itens com mesa, produto e status, ações de preparo.  
- **T06 - Pagamento:** resumo de valores, opções de pagamento e botão "Fechar Comanda".  
- **T07 - Relatórios:** filtros e tabela de resultados com botão "Exportar CSV".  
- **T08 - Usuários:** lista de usuários e formulário de criação/edição.

*(Os wireframes podem ser adicionados como imagens nesta seção.)*

---

### Design Visual

O design visual segue uma abordagem moderna e intuitiva, com foco na clareza das informações.

- **Tipografia:**  
  - Família: *Roboto*, sem serifa, para leitura limpa e consistente.

- **Ícones:**  
  - Utilização de biblioteca *Material Icons* para padronização visual.

- **Layout:**  
  - Estrutura responsiva baseada em *Flexbox* e *Grid*.  
  - Cabeçalhos fixos e botões destacados para ações principais.

---

## Fluxo de Dados

O fluxo de dados ocorre de forma integrada entre os perfis da aplicação:

1. O **atendente** abre uma comanda (T02) e adiciona itens (T03).  
2. Os itens são enviados à **cozinha** (T05) com status *pendente*.  
3. A cozinha altera o status conforme o preparo (*em preparo*, *pronto*).  
4. O **atendente** visualiza os itens prontos (T04) e marca como *entregue*.  
5. O **caixa** realiza o fechamento e pagamento (T06).  
6. O **gerente** visualiza relatórios consolidados (T07) e gerencia usuários (T08).

Diagrama simplificado:

---

## Tecnologias Utilizadas

- **Front-end:**
  - REDIS CACHE
  - .NET
  - React

- **Back-end (para integração):**
  - Node.js (Express)
  - Banco de Dados: PostgreSQL

- **Outras ferramentas:**
  - GitHub para controle de versão
  - Figma para design e prototipagem

---

## Considerações de Segurança

- **Autorização:** controle de acesso baseado em papéis (role-based access control).  
- **Proteção de dados:** uso de HTTPS e criptografia de senhas (bcrypt).  
- **Prevenção de ataques:** medidas contra *SQL Injection*
- **Sessão:** logout automático por inatividade.

---

## Implantação

1. **Requisitos de hardware e software:**  
   - Servidor Node.js v18+  
   - Banco de dados PostgreSQL 14+  

2. **Configuração do ambiente:**  
   - Instalar dependências via `npm install`  
   - Configurar variáveis de ambiente (`.env`)  
     ```
     DATABASE_URL=
     JWT_SECRET=
     API_BASE_URL=
     ```

3. **Deploy:**  
   - Executar build com `npm run build`  
   - Fazer upload dos arquivos para o servidor ou CI/CD configurado

4. **Testes pós-deploy:**  
   - Verificar login, envio de itens, atualizações em tempo real e geração de relatórios.

---

## Testes

A estratégia de testes inclui validação funcional, integração e desempenho.

1. **Casos de teste:** cobrindo todos os RFs (RF-001 a RF-007).  
2. **Testes unitários:** funções de login, cálculo de subtotal, atualização de status.  
3. **Testes de integração:** fluxo completo entre T03 (comanda) e T05 (cozinha).  
4. **Testes de carga:** simulação de múltiplos pedidos simultâneos.  
5. **Ferramentas:**  
   - Jest e React Testing Library  
   - React para testes de API  

---

# Planejamento

## Quadro de Tarefas

### Semana 1

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito           | Iniciado em | Prazo      | Status | Terminado em |
| :----         | :----                      | :----:       | :----:     | :----: | :----:       |
| Guilherme     | Definição de Telas    | 27/10/2025   | 27/10/2025 | ✔️     | 27/10/2025 |
| Isabela       | Wireframes das Telas       | 27/10/2025   | 27/10/2025 | ✔️     | 27/10/2025 |
| Gilberto      | Protótipo no Figma         | 27/10/2025   | 27/10/2025 | ✔️     | 27/10/2025 |
| Aluno C       | Configuração do ambiente   | 27/10/2025   | 27/10/2025 | ✔️     | 27/10/2025 |

---

### Semana 2

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito          | Iniciado em | Prazo      | Status | Terminado em |
| :----         | :----                     | :----:       | :----:     | :----: | :----:       |
| Guilherme     | Implementar Login (T01)   | 20/10/2025   | 02/11/2025 | ✔️     | 02/11/2025 |
| Isabela       | Página Mesas e Comandas   | 20/10/2025   | 02/11/2025 | ✔️     | 02/11/2025 |
| Gilverto       | Integração API Lista    | 20/10/2025   | 02/11/2025 | ✔️     | 02/11/2025 |
| Aluno C       | Testes Unitários          | 20/10/2025   | 02/11/2025 | ✔️     | 02/11/2025 |

---

**Legenda:**
- ✔️: terminado  
- 📝: em execução  
- ⌛: atrasado  
- ❌: não iniciado

