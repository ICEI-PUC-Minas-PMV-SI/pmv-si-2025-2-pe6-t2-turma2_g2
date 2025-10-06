using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PratoService.Models;
using SqlKata.Execution;

namespace PratoService.Controllers
{
    [ApiController]
    [Route("api/ingrediente")]
    [Authorize]
    public class IngredienteController(QueryFactory db) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var ingredientes = db.Query("Ingredientes").Get<Ingrediente>();
            return Ok(ingredientes);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var ingrediente = db.Query("Ingredientes").Where("Id", id).FirstOrDefault<Ingrediente>();
            if (ingrediente == null) return NotFound();
            return Ok(ingrediente);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Ingrediente ingrediente)
        {
            var id = db.Query("Ingredientes").InsertGetId<int>(new
            {
                ingrediente.Nome,
                ingrediente.Descricao
            });
            ingrediente.Id = id;
            return CreatedAtAction(nameof(GetById), new { id = ingrediente.Id }, ingrediente);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Ingrediente ingrediente)
        {
            var exists = db.Query("Ingredientes").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("Ingredientes").Where("Id", id).Update(new
            {
                ingrediente.Nome,
                ingrediente.Descricao
            });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var exists = db.Query("Ingredientes").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("Ingredientes").Where("Id", id).Delete();
            return NoContent();
        }
    }
}
