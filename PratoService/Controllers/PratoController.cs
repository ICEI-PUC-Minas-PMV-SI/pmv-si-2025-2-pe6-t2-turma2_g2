using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PratoService.Models;
using SqlKata.Execution;

namespace PratoService.Controllers
{
    [ApiController]
    [Route("api/prato")]
    [Authorize]
    public class PratoController(QueryFactory db) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var pratos = db.Query("Pratos").Get<Prato>();
            return Ok(pratos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var prato = db.Query("Pratos").Where("Id", id).FirstOrDefault<Prato>();
            if (prato == null) return NotFound();
            return Ok(prato);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Prato prato)
        {
            var id = db.Query("Pratos").InsertGetId<int>(new
            {
                prato.Nome,
                prato.Descricao,
                prato.CategoriaId,
                prato.Preco,
                prato.TempoMedioPreparo
            });
            prato.Id = id;
            return CreatedAtAction(nameof(GetById), new { id = prato.Id }, prato);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Prato prato)
        {
            var exists = db.Query("Pratos").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("Pratos").Where("Id", id).Update(new
            {
                prato.Nome,
                prato.Descricao,
                prato.CategoriaId,
                prato.Preco,
                prato.TempoMedioPreparo
            });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var exists = db.Query("Pratos").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("Pratos").Where("Id", id).Delete();
            return NoContent();
        }
    }
}
