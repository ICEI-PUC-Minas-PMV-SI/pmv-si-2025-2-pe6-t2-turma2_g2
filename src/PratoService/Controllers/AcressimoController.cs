    /// <summary>
    /// Controller responsável pelo CRUD de acréscimos opcionais para pratos.
    /// </summary>
    /// <remarks>
    /// Endpoints:
    /// - GET /api/acressimo: Lista todos os acréscimos
    /// - GET /api/acressimo/{id}: Consulta acréscimo por ID
    /// - POST /api/acressimo: Cria novo acréscimo
    /// - PUT /api/acressimo/{id}: Atualiza acréscimo
    /// - DELETE /api/acressimo/{id}: Remove acréscimo
    /// </remarks>

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
        /// <summary>
        /// Lista todos os acréscimos opcionais.
        /// </summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            var acressimos = db.Query("Acressimo").Get<Acressimo>();
            return Ok(acressimos);
        }

        /// <summary>
        /// Consulta um acréscimo pelo ID.
        /// </summary>
        /// <param name="id">ID do acréscimo</param>
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var acressimo = db.Query("Acressimo").Where("Id", id).FirstOrDefault<Acressimo>();
            if (acressimo == null) return NotFound();
            return Ok(acressimo);
        }

        /// <summary>
        /// Cria um novo acréscimo.
        /// </summary>
        /// <param name="acressimo">Dados do acréscimo</param>
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

        /// <summary>
        /// Atualiza um acréscimo existente.
        /// </summary>
        /// <param name="id">ID do acréscimo</param>
        /// <param name="acressimo">Dados do acréscimo</param>
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

        /// <summary>
        /// Remove um acréscimo pelo ID.
        /// </summary>
        /// <param name="id">ID do acréscimo</param>
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
