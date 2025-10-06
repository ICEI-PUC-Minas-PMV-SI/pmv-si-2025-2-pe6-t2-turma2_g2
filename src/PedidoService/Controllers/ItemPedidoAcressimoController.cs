using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PedidoService.Models;
using SqlKata.Execution;

namespace PedidoService.Controllers
{
    [ApiController]
    [Route("api/itempedidoacressimo")]
    [Authorize]
    public class ItemPedidoAcressimoController(QueryFactory db) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var itens = db.Query("ItemPedidoAcressimo").Get<ItemPedidoAcressimo>();
            return Ok(itens);
        }

        [HttpGet("{idItemPedido}/{idAcressimo}")]
        public IActionResult GetById(int idItemPedido, int idAcressimo)
        {
            var item = db.Query("ItemPedidoAcressimo")
                .Where("IdItemPedido", idItemPedido)
                .Where("IdAcressimo", idAcressimo)
                .FirstOrDefault<ItemPedidoAcressimo>();
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ItemPedidoAcressimo item)
        {
            db.Query("ItemPedidoAcressimo").Insert(new
            {
                item.IdItemPedido,
                item.IdAcressimo,
                item.Quantidade
            });
            return CreatedAtAction(nameof(GetById), new { idItemPedido = item.IdItemPedido, idAcressimo = item.IdAcressimo }, item);
        }

        [HttpPut("{idItemPedido}/{idAcressimo}")]
        public IActionResult Update(int idItemPedido, int idAcressimo, [FromBody] ItemPedidoAcressimo item)
        {
            var exists = db.Query("ItemPedidoAcressimo")
                .Where("IdItemPedido", idItemPedido)
                .Where("IdAcressimo", idAcressimo)
                .FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("ItemPedidoAcressimo")
                .Where("IdItemPedido", idItemPedido)
                .Where("IdAcressimo", idAcressimo)
                .Update(new
                {
                    item.Quantidade
                });
            return NoContent();
        }

        [HttpDelete("{idItemPedido}/{idAcressimo}")]
        public IActionResult Delete(int idItemPedido, int idAcressimo)
        {
            var exists = db.Query("ItemPedidoAcressimo")
                .Where("IdItemPedido", idItemPedido)
                .Where("IdAcressimo", idAcressimo)
                .FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("ItemPedidoAcressimo")
                .Where("IdItemPedido", idItemPedido)
                .Where("IdAcressimo", idAcressimo)
                .Delete();
            return NoContent();
        }
    }
}
