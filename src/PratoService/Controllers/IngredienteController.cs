    /// <summary>
    /// Controller responsável pelo CRUD de ingredientes disponíveis.
    /// </summary>
    /// <remarks>
    /// Endpoints:
    /// - GET /api/ingrediente: Lista todos os ingredientes
    /// - GET /api/ingrediente/{id}: Consulta ingrediente por ID
    /// - POST /api/ingrediente: Cria novo ingrediente
    /// - PUT /api/ingrediente/{id}: Atualiza ingrediente
    /// - DELETE /api/ingrediente/{id}: Remove ingrediente
    /// </remarks>

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
        /// <summary>
        /// Lista todos os ingredientes disponíveis.
        /// </summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            var ingredientes = db.Query("Ingrediente").Get<Ingrediente>();
            return Ok(ingredientes);
        }

        /// <summary>
        /// Consulta um ingrediente pelo ID.
        /// </summary>
        /// <param name="id">ID do ingrediente</param>
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var ingrediente = db.Query("Ingrediente").Where("Id", id).FirstOrDefault<Ingrediente>();
            if (ingrediente == null) return NotFound();
            return Ok(ingrediente);
        }

        /// <summary>
        /// Cria um novo ingrediente.
        /// </summary>
        /// <param name="ingrediente">Dados do ingrediente</param>
        [HttpPost]
        public IActionResult Create([FromBody] Ingrediente ingrediente)
        {
            var id = db.Query("Ingrediente").InsertGetId<int>(new
            {
                ingrediente.Nome,
                ingrediente.Descricao
            });
            ingrediente.Id = id;
            return CreatedAtAction(nameof(GetById), new { id = ingrediente.Id }, ingrediente);
        }

        /// <summary>
        /// Atualiza um ingrediente existente.
        /// </summary>
        /// <param name="id">ID do ingrediente</param>
        /// <param name="ingrediente">Dados do ingrediente</param>
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Ingrediente ingrediente)
        {
            var exists = db.Query("Ingrediente").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("Ingrediente").Where("Id", id).Update(new
            {
                ingrediente.Nome,
                ingrediente.Descricao
            });
            return NoContent();
        }

        /// <summary>
        /// Remove um ingrediente pelo ID.
        /// </summary>
        /// <param name="id">ID do ingrediente</param>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var exists = db.Query("Ingrediente").Where("Id", id).FirstOrDefault();
            if (exists == null) return NotFound();
            db.Query("Ingrediente").Where("Id", id).Delete();
            return NoContent();
        }
    }
}
