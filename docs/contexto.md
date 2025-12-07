# Introdução

 Com o avanço da tecnologia e a busca constante por praticidade, o setor de alimentação tem investido em soluções digitais para otimizar operações e fidelizar clientes. Imagine a cena: o cliente chega ao restaurante, faz o pedido com o garçom e essa informação precisa ser repassada à cozinha de forma rápida e precisa. Se houver falhas nessa comunicação, o prato pode atrasar, vir errado ou não ser registrado corretamente no caixa. Situações como essa evidenciam que a agilidade no atendimento, o controle eficiente dos processos e a integração entre salão, cozinha e caixa se tornaram fatores decisivos para a competitividade dos restaurantes. Nesse contexto, a adoção de sistemas de gestão integrados (ERP) surge como uma estratégia essencial. O aplicativo/site proposto centraliza todas as etapas do atendimento em uma única plataforma — da abertura da comanda ao pagamento — oferecendo maior eficiência, redução de falhas, insights gerenciais e uma experiência mais satisfatória para o cliente.

---

## 📚 Documentação Relacionada

- **Backend:** [APIs e Web Services](backend-apis.md) - Arquitetura de microserviços
- **Frontend Web:** [Aplicação Web](frontend-web.md) - Interface para desktop
- **Frontend Mobile:** [Aplicação Mobile](frontend-mobile.md) - App React Native
- **Processos:** [Modelagem BPMN](processos/modelagem-bpmn.md) - 10 processos documentados
- **Apresentação:** [Resultados da Solução](../presentation/README.md)

---

## Problema
 Muitos restaurantes ainda enfrentam dificuldades operacionais por utilizarem processos manuais ou sistemas não integrados. Entre os principais problemas estão:
  * Falta de integração entre salão, cozinha e caixa, resultando em atrasos nos pedidos.
  * Erros de comunicação entre garçom e cozinha, que comprometem a entrega correta dos pratos.
  * Ausência de controle efetivo de estoque e insumos, ocasionando desperdícios ou falta de produtos.
  * Gestão financeira pouco precisa, dificultando tomadas de decisão.
  * Carência de relatórios gerenciais que auxiliem na estratégia do negócio.
  * Experiência do cliente prejudicada, marcada por esperas longas, pedidos incorretos, pagamentos pouco práticos e ausência de ferramentas de fidelização.
 Essas falhas impactam não apenas a eficiência interna, mas também a satisfação e a fidelidade dos clientes, que cada vez mais buscam rapidez, conveniência e qualidade no atendimento.

## Objetivos

 O objetivo geral deste projeto é o desenvolvimento de aplicação distribuída para gerenciar ou automatizar as tarefas de um restaurante, tendo como objetivos específicos:
  * Automatizar e integrar processos do atendimento ao cliente, cozinha e caixa.
  * Reduzir erros operacionais, garantindo que os pedidos sejam enviados corretamente e no tempo adequado.
  * Controlar estoque e insumos em tempo real, evitando desperdícios e faltas.
  * Oferecer relatórios gerenciais que apoiem na tomada de decisões estratégicas.
  * Melhorar a experiência do cliente, com atendimento mais rápido, pagamentos simplificados e maior transparência.

## Justificativa

A implantação de um ERP voltado para restaurantes justifica-se pela necessidade crescente de modernização do setor, que demanda soluções práticas e integradas. Com a concorrência cada vez mais acirrada e a exigência dos clientes por agilidade e qualidade no atendimento, investir em tecnologia é essencial para garantir a sustentabilidade do negócio.
Além disso, a centralização das informações em uma única plataforma permite maior controle gerencial, redução de custos operacionais e aumento da lucratividade. Dessa forma, o aplicativo/site não é apenas uma ferramenta de gestão, mas um diferencial estratégico que contribui para o crescimento e fortalecimento do restaurante no mercado.

## Público-Alvo

1. Perfil do Negócio
 * Restaurantes de pequeno a médio porte que buscam digitalizar seus processos.
 * Redes de restaurantes que necessitam de padronização e integração entre unidades.
 * Bares, lanchonetes, cafés e pizzarias, que também compartilham as mesmas necessidades de controle de pedidos, estoque e caixa.

2. Perfil do Usuário
 * Gestores e proprietários de restaurantes, que desejam ter controle financeiro, de estoque e relatórios gerenciais para tomada de decisão.
 * Garçons e atendentes, que precisam de uma solução prática para abertura de comandas, anotações de pedidos e agilidade no atendimento.
 * Equipe de cozinha, que depende da comunicação clara e rápida para preparação dos pedidos.
 * Caixa e equipe administrativa, responsáveis pelo fechamento de contas, conciliação de pagamentos e emissão de notas fiscais.

3. Necessidades do Público
 * Reduzir erros em pedidos e pagamentos.
 * Melhorar a experiência do cliente no atendimento.
 * Integrar diferentes etapas do serviço (salão, cozinha, caixa).
 * Obter relatórios claros para decisões estratégicas.
 * Ter uma ferramenta intuitiva, de fácil uso e acessível em dispositivos móveis e web.

# Especificações do Projeto

## Requisitos

Técnica Utilizada: MoSCoW
Uma técnica é muito usada em projetos ágeis. Ela classifica os requisitos em quatro categorias:

 * Must Have (Obrigatório) → Essenciais, sem eles o sistema não funciona.
 * Should Have (Importante) → Muito relevante, mas o sistema pode operar sem eles no início.
 * Could Have (Desejável) → São diferenciais, agregam valor, mas não são urgentes.
 * Won’t Have (Não será incluído agora) → Fora do escopo da versão inicial, mas podem ser considerados futuramente.

### Requisitos Funcionais

| ID     | Descrição do Requisito                                                                                      | Prioridade                                                   |
|--------|--------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| RF-001 | Autenticar usuário e aplicar acesso por papéis                                                               | OBRIGATÓRIO                                                  |
| RF-002 | Atendente registra pedidos: abrir comanda, incluir itens, editar antes do envio e enviar para a cozinha      | OBRIGATÓRIO                                                  |
| RF-003 | KDS Cozinha visualiza a fila por estação e atualiza status de itens (pendente, em preparo, pronto, cancelado)| OBRIGATÓRIO                                                  |
| RF-004 | Atendente recebe notificação de item pronto e pode marcar como entregue                                      | OBRIGATÓRIO                                                  |
| RF-005 | Pagamentos e fechamento de conta com divisão simples                                                         | IMPORTANTE (sugestão: integração de pagamento simulada nesta versão) |
| RF-006 | Relatórios de vendas por período                                                                             | IMPORTANTE                                                   |
| RF-007 | Gerente administra usuários: criar, editar, desativar e definir papéis                                       | OBRIGATÓRIO                                                  |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O tempo de resposta para envio e recebimento de pedidos deve ser inferior a 2 segundos                                  | IMPORTANTE  |
|RNF-002| O sistema deve garantir segurança dos dados, realizando a criptografia das senhas no processo de autenticação           | OBRIGATÓRIO |
|RNF-004| O sistema deve registrar logs de operação                                                                               | IMPORTANTE  | 
|RNF-005| O sistema deve ser responsivo e funcionar em smartphones, tablets e desktops                                            | OBRIGATÓRIO | 
|RNF-006| O código deve ser modular e seguir boas práticas de arquitetura, permitindo atualizações sem afetar o sistema existente | OBRIGATÓRIO | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deve ser entregue no prazo estipulado pelo cronograma da disciplina (até o fim do semestre) |
|02| O projeto não possui orçamento financeiro |

# Catálogo de Serviços

- **Autenticação e Acesso (RF-001)**
  - Login com aplicação de papéis de acesso.
  - Permissões de navegação conforme papel.

- **Gestão de Comandas (RF-002)**
  - Abrir comanda por mesa ou balcão.
  - Incluir e editar itens **antes do envio** à cozinha.
  - Enviar itens para a cozinha.
  - Visualizar retorno de itens prontos para entrega.

- **KDS Cozinha (RF-003)**
  - Visualizar fila por estação.
  - Ver detalhes do pedido com mesa, itens e observações.
  - Atualizar status de itens: pendente, em preparo, pronto, cancelado.

- **Notificações e Entrega (RF-004)**
  - Listar itens prontos para o atendente com alerta imediato.
  - Marcar item como entregue.

- **Pagamentos e Fechamento (RF-005)**
  - Calcular total da comanda.
  - Registrar pagamento em dinheiro, cartão ou PIX.
  - Fechamento da comanda com **divisão simples**.
  - Integração de pagamento **simulada** nesta versão.

- **Relatório de Vendas (RF-006)**
  - Relatório por período.

- **Administração de Usuários (RF-007)**
  - Criar, editar e desativar usuários.
  - Definir papéis dos usuários.

# Arquitetura da Solução

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

<img width="1920" height="1080" alt="arquiteturasolucao" src="https://github.com/user-attachments/assets/ca4f6ecf-60ce-4e5c-a37b-341384a971cd" />

## Tecnologias Utilizadas

O FoodTrack é composto por um backend em .NET 9 (APIs REST), um frontend em Reactive Native, e um banco relacional MySQL. Integra-se a módulos internos (KDS/cozinha, comanda, pagamentos) e serviços externos (provedor de pagamentos, mensageria). Usuários: atendente, cozinha, caixa, gerente.

## Hospedagem

O ERP será hospedado na Amazon Web Services (AWS), utilizando serviços gerenciados para garantir escalabilidade, disponibilidade e segurança.

---

# Planejamento

O planejamento detalhado do projeto está distribuído nos documentos específicos de cada etapa:

- **Etapa 2 - Backend:** Ver [backend-apis.md - Planejamento](backend-apis.md#planejamento)
- **Etapa 3 - Frontend Web:** Ver [frontend-web.md - Planejamento](frontend-web.md#planejamento)
- **Etapa 4 - Frontend Mobile:** Ver [frontend-mobile.md - Planejamento](frontend-mobile.md#102-planejamento---desenvolvimento-mobile)

## Contribuições Gerais da Equipe

| Responsável       | Atividades Realizadas | Status |
| :----             | :----                 | :----: |
| Gilberto Modesto  | Documentação inicial, prototipagem, FuncionarioService, PainelService | ✔️ |
| Guilherme Lanza   | Documentação inicial, definição de processos, revisão de código backend, documentação backend-apis.md, revisão documentação frontend-web.md | ✔️ |
| Isabela Gomes     | Definição de tecnologias, revisão e organização da documentação no GitHub, criação estrutura de microserviços, configuração React Native + Expo, implementação COMPLETA do frontend (7 telas + 3 componentes + 5 serviços + authContext), ajustes finais de documentação | ✔️ |
| Luana Paula       | Documentação inicial, prototipagem, RelatorioService | ✔️ |
| Maria Eduarda     | Documentação inicial, definição de processos, PagamentoService, documentação completa da etapa 4 | ✔️ |
| Victor Antoniel   | Documentação inicial, definição das APIs e arquitetura da solução | ✔️ |
| Warley Junio      | Documentação inicial, definição das APIs e arquitetura, PedidoService (microserviço crítico), documentação técnica completa da etapa 4 | ✔️ |

**Legenda:**
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

---
