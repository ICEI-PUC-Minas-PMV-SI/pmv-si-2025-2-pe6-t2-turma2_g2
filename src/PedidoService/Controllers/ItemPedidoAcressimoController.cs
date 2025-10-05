    /// <summary>
    /// Controller responsável pelo CRUD dos acréscimos vinculados a cada item do pedido.
    /// </summary>
    /// <remarks>
    /// Endpoints:
    /// - GET /api/itempedidoacressimo: Lista todos os acréscimos dos itens do pedido
    /// - GET /api/itempedidoacressimo/{idItemPedido}/{idAcressimo}: Consulta acréscimo por IDs
    /// - POST /api/itempedidoacressimo: Cria novo acréscimo para item do pedido
    /// - PUT /api/itempedidoacressimo/{idItemPedido}/{idAcressimo}: Atualiza acréscimo
    /// - DELETE /api/itempedidoacressimo/{idItemPedido}/{idAcressimo}: Remove acréscimo
    /// </remarks>

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
        /// <summary>
        /// Lista todos os acréscimos dos itens do pedido.
        /// </summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            var itens = db.Query("ItemPedidoAcressimo").Get<ItemPedidoAcressimo>();
            return Ok(itens);
        }

        /// <summary>
        /// Consulta um acréscimo pelo ID do item do pedido e ID do acréscimo.
        /// </summary>
        /// <param name="idItemPedido">ID do item do pedido</param>
        /// <param name="idAcressimo">ID do acréscimo</param>
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

        /// <summary>
        /// Cria um novo acréscimo para item do pedido.
        /// </summary>
        /// <param name="item">Dados do acréscimo</param>
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

        /// <summary>
        /// Atualiza um acréscimo de item do pedido existente.
        /// </summary>
        /// <param name="idItemPedido">ID do item do pedido</param>
        /// <param name="idAcressimo">ID do acréscimo</param>
        /// <param name="item">Dados do acréscimo</param>
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

        /// <summary>
        /// Remove um acréscimo pelo ID do item do pedido e ID do acréscimo.
        /// </summary>
        /// <param name="idItemPedido">ID do item do pedido</param>
        /// <param name="idAcressimo">ID do acréscimo</param>
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
