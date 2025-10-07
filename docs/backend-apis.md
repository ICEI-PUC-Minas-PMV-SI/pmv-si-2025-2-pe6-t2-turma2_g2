# APIs e Web Services

O planejamento de uma aplicação de APIS Web é uma etapa fundamental para o sucesso do projeto. Ao planejar adequadamente, você pode evitar muitos problemas e garantir que a sua API seja segura, escalável e eficiente.

Aqui estão algumas etapas importantes que devem ser consideradas no planejamento de uma aplicação de APIS Web.

**Descrição do projeto:**  
NotificacaoService: é um microserviço de notificações de pedidos desenvolvido e testado por **Guilherme Lanza**. O serviço registra notificações, lista pendências por atendente e permite marcar a entrega. Os testes foram executados via Swagger no ambiente local.

- Base local: `http://localhost:5034`  
- Swagger: `http://localhost:5034/swagger`

## Objetivos da API

- Criar uma notificação ligada a um pedido e direcionada a um atendente.  
- Listar notificações com status **Pendente** filtradas por `atendenteId`.  
- Marcar a entrega de uma notificação e retirá-la da lista de pendentes.  

## Modelagem da Aplicação

Estrutura observada nas respostas e parâmetros dos endpoints.

- `idNotificacao` inteiro  
- `idPedido` inteiro  
- `mensagem` string  
- `status` string com valor observado: `Pendente`  
- `dataCriacao` string em formato ISO 8601  
- A consulta de pendências recebe `atendenteId` como parâmetro de query

Exemplo de item retornado em pendentes:
~~~json
{
  "idNotificacao": 1,
  "idPedido": 1,
  "mensagem": "Pedido #1 está pronto para retirada!",
  "status": "Pendente",
  "dataCriacao": "2025-10-05T14:30:00Z"
}
~~~

## Tecnologias Utilizadas

- API REST com **JSON**
- **Swagger UI** para documentação e testes manuais no ambiente local

---

## API Endpoints

### Endpoint 1: Criar notificação

- Método: **POST**  
- URL: `/api/Notificacoes`  
- Parâmetros:
  - Corpo (JSON):
    ~~~json
    {
      "idPedido": 1,
      "idAtendente": 1,
      "mensagem": "Pedido #1 está pronto para retirada!"
    }
    ~~~
- Resposta:
  - Sucesso
    ~~~json
    {
      "idNotificacao": 1
    }
    ~~~
- Observação  
  O status HTTP exato na criação não aparece nas evidências. O corpo acima foi retornado no teste manual.

---

### Endpoint 2: Listar notificações pendentes por atendente

- Método: **GET**  
- URL: `/api/Notificacoes/pendentes`  
- Parâmetros:
  - Query:
    - `atendenteId` inteiro obrigatório
- Resposta:
  - Sucesso
    ~~~json
    [
      {
        "idNotificacao": 1,
        "idPedido": 1,
        "mensagem": "Pedido #1 está pronto para retirada!",
        "status": "Pendente",
        "dataCriacao": "2025-10-05T14:30:00Z"
      }
    ]
    ~~~

---

### Endpoint 3: Marcar notificação como entregue

- Método: **PATCH**  
- URL: `/api/Notificacoes/{id}/entregar`  
- Parâmetros:
  - Rota:
    - `id` inteiro obrigatório
- Resposta:
  - Sucesso  
    `204 No Content`

Após a entrega, uma nova chamada a `/api/Notificacoes/pendentes?atendenteId=1` retorna **lista vazia**.

---

## Considerações de Segurança

No fluxo testado via Swagger não foi exigida autenticação. Outras políticas de segurança não constam nas evidências fornecidas.

---

## Implantação

Execução local utilizada nos testes.

1. Iniciar a aplicação ouvindo na porta `5034`.  
2. Acessar `http://localhost:5034/swagger`.  
3. Em `POST /api/Notificacoes` enviar o corpo de exemplo para criar a notificação.  
4. Em `GET /api/Notificacoes/pendentes` informar `atendenteId=1` para visualizar pendências.  
5. Em `PATCH /api/Notificacoes/{id}/entregar` informar `id=1` para marcar a entrega.  
6. Repetir o GET de pendentes para confirmar que a lista está vazia.

---

## Testes

Fluxo funcional executado manualmente no Swagger.

1. Criação retornou objeto com `idNotificacao`.  
2. Consulta de pendentes retornou a notificação criada com `status` igual a `Pendente`.  
3. Entrega da notificação retornou `204 No Content`.  
4. Nova consulta de pendentes retornou lista vazia para `atendenteId=1`.

---

## Referências

- Swagger UI do serviço  
- Evidências e prints fornecidos

---

## Planejamento

### Quadro de tarefas

A divisão abaixo reflete somente o que foi realizado por **Guilherme Lanza** conforme os prints enviados.

#### Semana 1

Atualizado em: 06/10

| Responsável     | Tarefa/Requisito                          | Iniciado em | Prazo | Status | Terminado em |
| :-------------- | :---------------------------------------- | :---------: | :---: | :----: | :----------: |
| Guilherme Lanza | Desenvolvimento de Funcionalidades - API |   08/09     | 15/09 |   ✔️   |    15/09     |

#### Semana 2

Atualizado em: 06/10

| Responsável     | Tarefa/Requisito                          | Iniciado em | Prazo | Status | Terminado em |
| :-------------- | :---------------------------------------- | :---------: | :---: | :----: | :----------: |
| Guilherme Lanza | Desenvolvimento de Funcionalidades - API |   15/09     | 22/09 |   ✔️   |    22/09     |

#### Semana 3

Atualizado em: 06/10

| Responsável     | Tarefa/Requisito                          | Iniciado em | Prazo | Status | Terminado em |
| :-------------- | :---------------------------------------- | :---------: | :---: | :----: | :----------: |
| Guilherme Lanza | Desenvolvimento de Funcionalidades - API |   22/09     | 29/09 |   ✔️   |    29/09     |

#### Semana 4

Atualizado em: 06/10

| Responsável     | Tarefa/Requisito | Iniciado em | Prazo | Status | Terminado em |
| :-------------- | :--------------- | :---------: | :---: | :----: | :----------: |
| Guilherme Lanza | Testes - API     |   29/09     | 06/10 |   ✔️   |    06/10     |

**Legenda**  
- ✔️: terminado  
- 📝: em execução  
- ⌛: atrasado  
- ❌: não iniciado
