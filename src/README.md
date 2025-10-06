# Instruções de utilização

## Instalação do Site

O site em HTML/CSS/JS é um projeto estático, logo pode ser utilizado tanto em servidores...

## Histórico de versões

### [0.1.0] - DD/MM/AAAA
#### Adicionado
- Adicionado ...

## Funcionamento das Controllers dos Microserviços


## PedidoService
Gerencia os pedidos realizados nas mesas, incluindo abertura de comandas, inclusão de itens e acréscimos. Permite consultar comandas e atualizar o status da mesa conforme o fluxo do pedido.

**Principais Endpoints:**
- `POST /comanda`: Abre uma nova comanda para uma mesa.
- `GET /comanda/{id}`: Consulta detalhes da comanda.
- `POST /itempedido`: Adiciona item ao pedido.
- `POST /itempedidoacrescimo`: Adiciona acréscimo ao item do pedido.

## PratoService
Administra o cardápio do restaurante, permitindo o cadastro e consulta de pratos, ingredientes, categorias e acréscimos.

**Principais Endpoints:**
- `GET /prato`: Lista todos os pratos.
- `POST /prato`: Cadastra novo prato.
- `GET /acrescimo`: Lista acréscimos disponíveis.
- `POST /ingrediente`: Cadastra ingrediente.

## MesaService
Controla o cadastro e status das mesas do estabelecimento, integrando com o fluxo de comandas e pedidos.

**Principais Endpoints:**
- `GET /mesa`: Lista mesas cadastradas.
- `POST /mesa`: Cadastra nova mesa.
- `PUT /mesa/{id}/status`: Atualiza status da mesa (livre, ocupada, reservada).

## PagamentoService
Gerencia os pagamentos realizados, vinculando-os às comandas e permitindo o controle dos meios e status de pagamento.

**Principais Endpoints:**
- `POST /pagamento`: Gera pagamento para uma comanda.
- `GET /pagamento/{id}`: Consulta pagamento.
- `POST /meiopagamento`: Cadastra meio de pagamento.
- `POST /statuspagamento`: Cadastra status de pagamento.

---

## Integração entre Serviços

- **PedidoService** integra com **MesaService** para atualizar o status da mesa ao abrir uma comanda.
- **PagamentoService** vincula pagamentos às comandas gerenciadas pelo **PedidoService**.
- **PratoService** fornece dados de pratos e acréscimos para inclusão nos pedidos.

---