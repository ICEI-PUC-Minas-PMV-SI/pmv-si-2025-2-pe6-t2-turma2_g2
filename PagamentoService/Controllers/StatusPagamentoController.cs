using Microsoft.AspNetCore.Mvc;
using PagamentoService.Models;
using SqlKata.Execution;

namespace PagamentoService.Controllers
{
    [ApiController]
    [Route("api/statuspagamento")]
    public class StatusPagamentoController : ControllerBase
    {
        private readonly QueryFactory _db;
        public StatusPagamentoController(QueryFactory db) { _db = db; }

        [HttpGet]
        public IActionResult GetAll() => Ok(_db.Query("StatusPagamento").Get<StatusPagamento>());

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var status = _db.Query("StatusPagamento").Where("Id", id).FirstOrDefault<StatusPagamento>();
            return status == null ? NotFound() : Ok(status);
        }

        [HttpPost]
        public IActionResult Create([FromBody] StatusPagamento status)
        {
            var id = _db.Query("StatusPagamento").InsertGetId<int>(new { Nome = status.Nome, Descricao = status.Descricao });
            status.Id = id;
            return CreatedAtAction(nameof(Get), new { id = status.Id }, status);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] StatusPagamento status)
        {
            var exists = _db.Query("StatusPagamento").Where("Id", id).Exists();
            if (!exists) return NotFound();
            _db.Query("StatusPagamento").Where("Id", id).Update(new { Nome = status.Nome, Descricao = status.Descricao });
            status.Id = id;
            return Ok(status);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted = _db.Query("StatusPagamento").Where("Id", id).Delete();
            return deleted > 0 ? NoContent() : NotFound();
        }
    }
}
