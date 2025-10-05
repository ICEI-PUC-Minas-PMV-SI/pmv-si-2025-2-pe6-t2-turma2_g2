using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PratoService.Models;
using SqlKata.Execution;

namespace PratoService.Controllers
{
    [ApiController]
    [Route("api/acressimo")]
    [Authorize]
    public class AcressimoController(QueryFactory db) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var acressimos = db.Query("Acressimo").Get<Acressimo>();
            return Ok(acressimos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var acressimo = db.Query("Acressimo").Where("Id", id).FirstOrDefault<Acressimo>();
            if (acressimo == null) return NotFound();
            return Ok(acressimo);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Acressimo acressimo)
        {
            var id = db.Query("Acressimo").InsertGetId<int>(new
            {
                acressimo.Nome,
                acressimo.Descricao,
                acressimo.Valor
            });
            acressimo.Id = id;
            return CreatedAtAction(nameof(GetById), new { id = acressimo.Id }, acressimo);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Acressimo acressimo)
        {
            var exists = db.Query("Acressimo").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("Acressimo").Where("Id", id).Update(new
            {
                acressimo.Nome,
                acressimo.Descricao,
                acressimo.Valor
            });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var exists = db.Query("Acressimo").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("Acressimo").Where("Id", id).Delete();
            return NoContent();
        }
    }
}
