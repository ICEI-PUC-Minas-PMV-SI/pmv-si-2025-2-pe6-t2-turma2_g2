# FOODTRACK

`CURSO: Sistemas de Informação`

`DISCIPLINA: Projeto - Arquitetura de Sistemas Distribuídos`

`SEMESTRE: 6º`

O projeto consiste no desenvolvimento de um sistema ERP voltado para restaurantes, com acesso via aplicativo e site, cujo objetivo é integrar de forma simples e eficiente as principais operações do negócio. A solução abrange desde a abertura de comandas pelo garçom, envio automático dos pedidos para a cozinha, acompanhamento do preparo e entrega ao cliente, até o fechamento da conta e realização do pagamento. Além disso, o sistema permitirá o controle básico de estoque e a geração de relatórios de vendas e atendimentos, oferecendo uma visão gerencial para os administradores do restaurante.

## Integrantes

* Gilberto Modesto
* Guilherme Lanza Japolino
* Isabela Gomes Lima
* Luana Paula Ramos de Souza
* Maria Eduarda Sousa
* Victor Antoniel Borges da Cruz
* Warley Junio Martins Vieira

## Orientador

* Kleber Jacques Ferreira de Souza

# Planejamento

| Etapa         | Atividades |
|  :----:   | ----------- |
| ETAPA 1         |[Documentação de Contexto](docs/contexto.md) <br> |
| ETAPA 2         |[Planejar, desenvolver e gerenciar APIs e Web Services](docs/backend-apis.md) <br> |
| ETAPA 3         |[Planejar, desenvolver e gerenciar uma aplicação Web](docs/frontend-web.md) |
| ETAPA 4        |[Planejar, desenvolver e gerenciar uma aplicação Móvel](docs/frontend-mobile.md) <br>  |
| ETAPA 5         | [Apresentação](presentation/README.md) |

# Documentação

## 📚 Navegação por Etapa

### Etapa 1 - Contexto
- **Documento:** [Documentação de Contexto](docs/contexto.md)
- **Conteúdo:** Introdução, problema, objetivos, justificativa, público-alvo, requisitos

### Etapa 2 - Backend (APIs e Web Services)
- **Documento principal:** [Backend APIs](docs/backend-apis.md)
- **Microserviços detalhados:**
  - [Arquitetura de Microserviços](docs/backend/arquitetura-microservicos.md)
  - [AutenticacaoService](docs/backend/autenticacao-service.md)
  - [FuncionarioService](docs/backend/funcionario-service.md)
  - [PedidoService](docs/backend/pedido-service.md)
  - [PratoService](docs/backend/prato-service.md)
  - [MesaService](docs/backend/mesa-service.md)
  - [PagamentoService](docs/backend/pagamento-service.md)
  - [NotificacaoService](docs/backend/notificacao-service.md)
  - [PainelService](docs/backend/painel-service.md)
  - [RelatorioService](docs/backend/relatorio-service.md)

### Etapa 3 - Frontend Web
- **Documento principal:** [Frontend Web](docs/frontend-web.md)
- **Design:** [Wireframes](docs/interface/wireframes.md)
- **Prototipação:** [Protótipo](docs/interface/prototipo.md)

### Etapa 4 - Frontend Mobile
- **Documento principal:** [Frontend Mobile](docs/frontend-mobile.md)
- **Design:** [Wireframes](docs/interface/wireframes.md)
- **Processos:** [Modelagem BPMN](docs/processos/modelagem-bpmn.md)
- **Testes:** [Testes de Integração](docs/testes/testes-integracao.md)

### Etapa 5 - Apresentação
- **Documento:** [Apresentação da Solução](presentation/README.md)

---

## 🔍 Navegação por Tópico

### Arquitetura e Design
- [Arquitetura de Microserviços](docs/backend/arquitetura-microservicos.md)
- [Wireframes](docs/interface/wireframes.md)
- [Prototipação](docs/interface/prototipo.md) 

### Processos de Negócio
- [Modelagem BPMN Completa](docs/processos/modelagem-bpmn.md) - 10 processos modelados com diagramas

### Requisitos
- **Funcionais:** Ver [Frontend Mobile](docs/frontend-mobile.md#331-requisitos-funcionais-rf)
- **Não Funcionais:** Ver [Frontend Mobile](docs/frontend-mobile.md#332-requisitos-não-funcionais-rnf)

### Testes
- [Testes de Integração](docs/testes/testes-integracao.md) - Backend, Web, Mobile, E2E, Performance

### Equipe e Responsabilidades
- Ver seção "Controle de Mudanças" em cada documento de etapa

---

## Instruções de utilização

### Documentação Técnica Detalhada
Para instruções específicas de instalação, configuração, endpoints e execução:

- **Backend:** Consulte a documentação individual de cada microserviço em [docs/backend/](docs/backend/)
- **Frontend Mobile:** Ver [docs/frontend-mobile.md](docs/frontend-mobile.md)
- **Frontend Web:** Ver [docs/frontend-web.md](docs/frontend-web.md)

# Código

<li><a href="src/README.md"> Código Fonte</a></li>

# Apresentação

<li><a href="presentation/README.md"> Apresentação da solução</a></li>
