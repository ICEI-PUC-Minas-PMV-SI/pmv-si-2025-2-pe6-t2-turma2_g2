using Microsoft.AspNetCore.Mvc;
using PedidoService.Models;
using SqlKata.Execution;

namespace PedidoService.Controllers
{
    [ApiController]
    [Route("api/pedido")]
    public class PedidoController(QueryFactory db) : ControllerBase
    {        
        [HttpGet]
        public IActionResult GetAll()
        {
            var pedidos = db.Query("Pedido").Get<Pedido>();
            return Ok(pedidos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var pedido = db.Query("pedido").Where("IdPedido", id).FirstOrDefault<Pedido>();

            if (pedido == null)
            {
                return NotFound();
            }

            return Ok(pedido);
        }

        [HttpPost]
        public IActionResult Create(
            [FromBody] Pedido pedido)
        {
            var ultimoNumeroComanda = db
                .Query("pedido")
                .Where("NumeroComanda", pedido.NumeroComanda)
                .Max<int?>("NumeroComanda") ?? 0;

            pedido.Data = DateTime.Now;
            pedido.NumeroComanda = ultimoNumeroComanda + 1;
            pedido.Status = "Pendente";

            var id = db
                .Query("pedido")
                .InsertGetId<int>(
                    new
                    {
                        pedido.NumeroMesa,
                        pedido.Comanda,
                        pedido.ValorTotal,
                        pedido.Status,
                        pedido.FormaPagamento,
                        pedido.Observacao,
                        pedido.Data
                    });

            pedido.IdPedido = id;

            return CreatedAtAction(
                nameof(this.GetById),
                new { id = pedido.IdPedido },
                pedido);
        }

        [HttpPut("{id}")]
        public IActionResult Update(
            int id,
            [FromBody] Pedido pedido)
        {
            var exists = db
                .Query("pedido")
                .Where("IdPedido", id)
                .FirstOrDefault();

            if (exists == null)
            {
                return NotFound();
            }

            db
                .Query("pedido")
                .Where("IdPedido", id)
                .Update(
                    new
                    {
                        pedido.NumeroMesa,
                        pedido.Comanda,
                        pedido.ValorTotal,
                        pedido.Status,
                        pedido.FormaPagamento,
                        pedido.Observacao,
                        pedido.Data
                    });

            db
                .Query("ItemPedido")
                .Where("IdPedido", id)
                .Delete();

            return NoContent();
        }
    }
}
