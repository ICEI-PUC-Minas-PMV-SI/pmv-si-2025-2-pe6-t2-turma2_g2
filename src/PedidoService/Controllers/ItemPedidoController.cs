using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PedidoService.Models;
using SqlKata.Execution;

namespace PedidoService.Controllers
{
    [ApiController]
    [Route("api/itempedido")]
    [Authorize]
    public class ItemPedidoController(QueryFactory db) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var itens = db.Query("ItemPedido").Get<ItemPedido>();
            return Ok(itens);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var item = db.Query("ItemPedido").Where("Id", id).FirstOrDefault<ItemPedido>();
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ItemPedido item)
        {
            var prato = db.Query("pratos").Where("id", item.PratoId).FirstOrDefault();
            if (prato == null)
                return BadRequest("Prato não encontrado.");
            item.Valor = prato.preco;

            var id = db.Query("ItemPedido").InsertGetId<int>(new
            {
                item.DataHora,
                item.PratoId,
                item.StatusId,
                item.Valor,
                item.Especificacoes,
                item.ComandaId
            });
            item.Id = id;
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] ItemPedido item)
        {
            var exists = db.Query("ItemPedido").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("ItemPedido").Where("Id", id).Update(new
            {
                item.DataHora,
                item.PratoId,
                item.StatusId,
                item.Valor,
                item.Especificacoes
            });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var exists = db.Query("ItemPedido").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("ItemPedido").Where("Id", id).Delete();
            return NoContent();
        }
    }
}
