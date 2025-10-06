using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PratoService.Models;
using SqlKata.Execution;

namespace PratoService.Controllers
{
    [ApiController]
    [Route("api/categoria")]
    [Authorize]
    public class CategoriaController(QueryFactory db) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var categorias = db.Query("Categoria").Get<Categoria>();
            return Ok(categorias);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var categoria = db.Query("Categoria").Where("Id", id).FirstOrDefault<Categoria>();
            if (categoria == null) return NotFound();
            return Ok(categoria);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Categoria categoria)
        {
            var id = db.Query("Categoria").InsertGetId<int>(new
            {
                categoria.Nome,
                categoria.Descricao
            });
            categoria.Id = id;
            return CreatedAtAction(nameof(GetById), new { id = categoria.Id }, categoria);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Categoria categoria)
        {
            var exists = db.Query("Categoria").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("Categoria").Where("Id", id).Update(new
            {
                categoria.Nome,
                categoria.Descricao
            });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var exists = db.Query("Categoria").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("Categoria").Where("Id", id).Delete();
            return NoContent();
        }
    }
}
