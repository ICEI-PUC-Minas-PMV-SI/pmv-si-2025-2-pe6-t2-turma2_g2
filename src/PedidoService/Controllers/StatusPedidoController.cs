    /// <summary>
    /// Controller responsável pelo CRUD dos status possíveis para um pedido.
    /// </summary>
    /// <remarks>
    /// Endpoints:
    /// - GET /api/statuspedido: Lista todos os status
    /// - GET /api/statuspedido/{id}: Consulta status por ID
    /// - POST /api/statuspedido: Cria novo status
    /// - PUT /api/statuspedido/{id}: Atualiza status
    /// - DELETE /api/statuspedido/{id}: Remove status
    /// </remarks>

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PedidoService.Models;
using SqlKata.Execution;

namespace PedidoService.Controllers
{
    [ApiController]
    [Route("api/statuspedido")]
    [Authorize]
    public class StatusPedidoController(QueryFactory db) : ControllerBase
    {
        /// <summary>
        /// Lista todos os status possíveis para um pedido.
        /// </summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            var status = db.Query("StatusPedido").Get<StatusPedido>();
            return Ok(status);
        }

        /// <summary>
        /// Consulta um status pelo ID.
        /// </summary>
        /// <param name="id">ID do status</param>
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var item = db.Query("StatusPedido").Where("Id", id).FirstOrDefault<StatusPedido>();
            if (item == null) return NotFound();
            return Ok(item);
        }

        /// <summary>
        /// Cria um novo status de pedido.
        /// </summary>
        /// <param name="item">Dados do status</param>
        [HttpPost]
        public IActionResult Create([FromBody] StatusPedido item)
        {
            var id = db.Query("StatusPedido").InsertGetId<int>(new
            {
                item.Nome,
                item.Descricao
            });
            item.Id = id;
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        /// <summary>
        /// Atualiza um status de pedido existente.
        /// </summary>
        /// <param name="id">ID do status</param>
        /// <param name="item">Dados do status</param>
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] StatusPedido item)
        {
            var exists = db.Query("StatusPedido").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("StatusPedido").Where("Id", id).Update(new
            {
                item.Nome,
                item.Descricao
            });
            return NoContent();
        }

        /// <summary>
        /// Remove um status pelo ID.
        /// </summary>
        /// <param name="id">ID do status</param>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var exists = db.Query("StatusPedido").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("StatusPedido").Where("Id", id).Delete();
            return NoContent();
        }
    }
}
