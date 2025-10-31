using Microsoft.AspNetCore.Mvc;
using PagamentoService.Models;
using SqlKata.Execution;

namespace PagamentoService.Controllers
{
    [ApiController]
    [Route("api/meiospagamento")]
    public class MeiosPagamentoController : ControllerBase
    {
        private readonly QueryFactory _db;
        public MeiosPagamentoController(QueryFactory db) { _db = db; }

        [HttpGet]
        public IActionResult GetAll() => Ok(_db.Query("MeiosPagamento").Get<MeioPagamento>());

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var meio = _db.Query("MeiosPagamento").Where("Id", id).FirstOrDefault<MeioPagamento>();
            return meio == null ? NotFound() : Ok(meio);
        }

        [HttpPost]
        public IActionResult Create([FromBody] MeioPagamento meio)
        {
            var id = _db.Query("MeiosPagamento").InsertGetId<int>(new { Nome = meio.Nome, Descricao = meio.Descricao });
            meio.Id = id;
            return CreatedAtAction(nameof(Get), new { id = meio.Id }, meio);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] MeioPagamento meio)
        {
            var exists = _db.Query("MeiosPagamento").Where("Id", id).Exists();
            if (!exists) return NotFound();
            _db.Query("MeiosPagamento").Where("Id", id).Update(new { Nome = meio.Nome, Descricao = meio.Descricao });
            meio.Id = id;
            return Ok(meio);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted = _db.Query("MeiosPagamento").Where("Id", id).Delete();
            return deleted > 0 ? NoContent() : NotFound();
        }
    }
}
