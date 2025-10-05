    /// <summary>
    /// Controller responsável pelo CRUD de categorias de pratos.
    /// </summary>
    /// <remarks>
    /// Endpoints:
    /// - GET /api/categoria: Lista todas as categorias
    /// - GET /api/categoria/{id}: Consulta categoria por ID
    /// - POST /api/categoria: Cria nova categoria
    /// - PUT /api/categoria/{id}: Atualiza categoria
    /// - DELETE /api/categoria/{id}: Remove categoria
    /// </remarks>

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
        /// <summary>
        /// Lista todas as categorias de pratos.
        /// </summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            var categorias = db.Query("Categoria").Get<Categoria>();
            return Ok(categorias);
        }

        /// <summary>
        /// Consulta uma categoria pelo ID.
        /// </summary>
        /// <param name="id">ID da categoria</param>
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var categoria = db.Query("Categoria").Where("Id", id).FirstOrDefault<Categoria>();
            if (categoria == null) return NotFound();
            return Ok(categoria);
        }

        /// <summary>
        /// Cria uma nova categoria de prato.
        /// </summary>
        /// <param name="categoria">Dados da categoria</param>
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

        /// <summary>
        /// Atualiza uma categoria existente.
        /// </summary>
        /// <param name="id">ID da categoria</param>
        /// <param name="categoria">Dados da categoria</param>
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

        /// <summary>
        /// Remove uma categoria pelo ID.
        /// </summary>
        /// <param name="id">ID da categoria</param>
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
