using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PedidoService.Models;
using SqlKata.Execution;

namespace PedidoService.Controllers
{
    [ApiController]
    [Route("api/itempedidoacrescimo")]
    [Authorize]
    public class ItemPedidoAcrescimoController(QueryFactory db) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var itens = db.Query("ItemPedidoAcrescimo").Get<ItemPedidoAcrescimo>();
            return Ok(itens);
        }

        [HttpGet("{idItemPedido}/{idAcrescimo}")]
        public IActionResult GetById(int idItemPedido, int idAcrescimo)
        {
            var item = db.Query("ItemPedidoAcrescimo")
                .Where("IdItemPedido", idItemPedido)
                .Where("IdAcrescimo", idAcrescimo)
                .FirstOrDefault<ItemPedidoAcrescimo>();
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ItemPedidoAcrescimo item)
        {
            db.Query("ItemPedidoAcrescimo").Insert(new
            {
                item.IdItemPedido,
                item.IdAcrescimo,
                item.Quantidade
            });
            return CreatedAtAction(nameof(GetById), new { idItemPedido = item.IdItemPedido, idAcrescimo = item.IdAcrescimo }, item);
        }

        [HttpPut("{idItemPedido}/{idAcrescimo}")]
        public IActionResult Update(int idItemPedido, int idAcrescimo, [FromBody] ItemPedidoAcrescimo item)
        {
            var exists = db.Query("ItemPedidoAcrescimo")
                .Where("IdItemPedido", idItemPedido)
                .Where("IdAcrescimo", idAcrescimo)
                .FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("ItemPedidoAcrescimo")
                .Where("IdItemPedido", idItemPedido)
                .Where("IdAcrescimo", idAcrescimo)
                .Update(new
                {
                    item.Quantidade
                });
            return NoContent();
        }

        [HttpDelete("{idItemPedido}/{idAcrescimo}")]
        public IActionResult Delete(int idItemPedido, int idAcrescimo)
        {
            var exists = db.Query("ItemPedidoAcrescimo")
                .Where("IdItemPedido", idItemPedido)
                .Where("IdAcrescimo", idAcrescimo)
                .FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("ItemPedidoAcrescimo")
                .Where("IdItemPedido", idItemPedido)
                .Where("IdAcrescimo", idAcrescimo)
                .Delete();
            return NoContent();
        }
    }
}
