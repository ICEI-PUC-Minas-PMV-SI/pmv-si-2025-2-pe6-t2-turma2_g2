    /// <summary>
    /// Controller responsável pelo CRUD de pratos do cardápio.
    /// </summary>
    /// <remarks>
    /// Endpoints:
    /// - GET /api/prato: Lista todos os pratos
    /// - GET /api/prato/{id}: Consulta prato por ID
    /// - POST /api/prato: Cria novo prato
    /// - PUT /api/prato/{id}: Atualiza prato
    /// - DELETE /api/prato/{id}: Remove prato
    /// </remarks

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
        /// <summary>
        /// Lista todos os pratos cadastrados.
        /// </summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            var pratos = db.Query("Pratos").Get<Prato>();
            return Ok(pratos);
        }

        /// <summary>
        /// Consulta um prato pelo ID.
        /// </summary>
        /// <param name="id">ID do prato</param>
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var prato = db.Query("Pratos").Where("Id", id).FirstOrDefault<Prato>();
            if (prato == null) return NotFound();
            return Ok(prato);
        }

        /// <summary>
        /// Cria um novo prato.
        /// </summary>
        /// <param name="prato">Dados do prato</param>
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

        /// <summary>
        /// Atualiza um prato existente.
        /// </summary>
        /// <param name="id">ID do prato</param>
        /// <param name="prato">Dados do prato</param>
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

        /// <summary>
        /// Remove um prato pelo ID.
        /// </summary>
        /// <param name="id">ID do prato</param>
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
