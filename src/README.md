# Instruções de utilização

## Instalação do Site

O site em HTML/CSS/JS é um projeto estático, logo pode ser utilizado tanto em servidores...

## Histórico de versões

### [0.1.0] - DD/MM/AAAA
#### Adicionado
- Adicionado ...

## Funcionamento das Controllers dos Microserviços

### Controllers do PratoService

As controllers do PratoService permitem o gerenciamento completo do cardápio:

- **PratoController**: CRUD de pratos (nome, descrição, categoria, preço, tempo de preparo).
- **CategoriaController**: CRUD de categorias de pratos.
- **IngredienteController**: CRUD de ingredientes disponíveis.
- **AcressimoController**: CRUD de acréscimos opcionais para pratos.

Todas utilizam o padrão REST e SqlKata para acesso ao banco de dados. Os endpoints seguem o formato `/api/[entidade]` e exigem autenticação via `[Authorize]`.

---

### Controllers do PedidoService

As controllers do PedidoService permitem o gerenciamento dos pedidos realizados:

- **ItemPedidoController**: CRUD dos itens do pedido (prato, status, valor, especificações).
- **ItemPedidoAcressimoController**: CRUD dos acréscimos vinculados a cada item do pedido.
- **StatusPedidoController**: CRUD dos status possíveis para um pedido.

Todos os endpoints seguem o padrão REST, usam SqlKata para acesso ao banco e exigem autenticação.

---

### Exemplo de uso dos endpoints

- Para criar um prato: `POST /api/prato`
- Para consultar todos os pedidos: `GET /api/itempedido`
- Para adicionar acréscimo a um item do pedido: `POST /api/itempedidoacressimo`

---