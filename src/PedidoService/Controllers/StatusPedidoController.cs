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
        [HttpGet]
        public IActionResult GetAll()
        {
            var status = db.Query("StatusPedido").Get<StatusPedido>();
            return Ok(status);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var item = db.Query("StatusPedido").Where("Id", id).FirstOrDefault<StatusPedido>();
            if (item == null) return NotFound();
            return Ok(item);
        }

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
