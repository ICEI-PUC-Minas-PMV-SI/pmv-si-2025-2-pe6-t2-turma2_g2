using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PratoService.Models;
using SqlKata.Execution;

namespace PratoService.Controllers
{
    [ApiController]
    [Route("api/acrescimo")]
    [Authorize]
    public class AcressimoController(QueryFactory db) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var acressimos = db.Query("Acrescimo").Get<Acrescimo>();
            return Ok(acressimos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var acrescimo = db.Query("Acrescimo").Where("Id", id).FirstOrDefault<Acrescimo>();
            if (acrescimo == null) return NotFound();
            return Ok(acrescimo);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Acrescimo acrescimo)
        {
            var id = db.Query("Acrescimo").InsertGetId<int>(new
            {
                acrescimo.Nome,
                acrescimo.Descricao,
                acrescimo.Valor
            });
            acrescimo.Id = id;
            return CreatedAtAction(nameof(GetById), new { id = acrescimo.Id }, acrescimo);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Acrescimo acrescimo)
        {
            var exists = db.Query("Acrescimo").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("Acrescimo").Where("Id", id).Update(new
            {
                acrescimo.Nome,
                acrescimo.Descricao,
                acrescimo.Valor
            });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var exists = db.Query("Acrescimo").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("Acrescimo").Where("Id", id).Delete();
            return NoContent();
        }
    }
}
