using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PedidoService.Models;
using SqlKata.Execution;

namespace PedidoService.Controllers
{
    [ApiController]
    [Route("api/itemPedido")]
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
        public IActionResult GetByIdPedido(int idPedido)
        {
            var item = db.Query("ItemPedido").Where("Id", idPedido).FirstOrDefault<ItemPedido>();
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] ItemPedido item)
        {
            var produto = db.Query("pratos").Where("id", item.PratoId).FirstOrDefault();

            if (produto == null)
                return BadRequest("Prato não encontrado.");

            item.Valor = produto.preco;

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
            return CreatedAtAction("", item);
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
