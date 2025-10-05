    /// <summary>
    /// Controller responsável pelo CRUD dos itens do pedido.
    /// </summary>
    /// <remarks>
    /// Endpoints:
    /// - GET /api/itempedido: Lista todos os itens do pedido
    /// - GET /api/itempedido/{id}: Consulta item do pedido por ID
    /// - POST /api/itempedido: Cria novo item do pedido
    /// - PUT /api/itempedido/{id}: Atualiza item do pedido
    /// - DELETE /api/itempedido/{id}: Remove item do pedido
    /// </remarks>

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
        /// <summary>
        /// Lista todos os itens do pedido.
        /// </summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            var itens = db.Query("ItemPedido").Get<ItemPedido>();
            return Ok(itens);
        }

        /// <summary>
        /// Consulta um item do pedido pelo ID.
        /// </summary>
        /// <param name="id">ID do item do pedido</param>
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var item = db.Query("ItemPedido").Where("Id", id).FirstOrDefault<ItemPedido>();
            if (item == null) return NotFound();
            return Ok(item);
        }

        /// <summary>
        /// Cria um novo item do pedido.
        /// </summary>
        /// <param name="item">Dados do item do pedido</param>
        [HttpPost]
        public IActionResult Create([FromBody] ItemPedido item)
        {
            var id = db.Query("ItemPedido").InsertGetId<int>(new
            {
                item.DataHora,
                item.PratoId,
                item.StatusId,
                item.Valor,
                item.Especificacoes
            });
            item.Id = id;
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        /// <summary>
        /// Atualiza um item do pedido existente.
        /// </summary>
        /// <param name="id">ID do item do pedido</param>
        /// <param name="item">Dados do item do pedido</param>
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

        /// <summary>
        /// Remove um item do pedido pelo ID.
        /// </summary>
        /// <param name="id">ID do item do pedido</param>
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
