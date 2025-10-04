using FuncionarioService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SqlKata.Execution;

namespace FuncionarioService.Controllers
{
    [ApiController]
    [Route("api/funcionario")]
    [Authorize]
    public class FuncionarioController(QueryFactory db) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var funcionarios = db
                .Query("Funcionario")
                .Get<Funcionario>();

            return Ok(funcionarios);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var funcionario = db
                .Query("Funcionario")
                .Where("Id", id)
                .FirstOrDefault<Funcionario>();

            if (funcionario == null)
            {
                return NotFound();
            }

            return Ok(funcionario);
        }

        [HttpGet("usuario/{usuario}")]
        [AllowAnonymous]
        public IActionResult GetByUsername(
            string usuario)
        {
            var funcionario = db
                .Query("funcionario")
                .Where("Usuario", usuario)
                .FirstOrDefault<Funcionario>();

            if (funcionario == null)
            {
                return NotFound();
            }

            return Ok(funcionario);
        }

        [HttpPost]
        public IActionResult Create(
            [FromBody] Funcionario funcionario)
        {
            var id = db
                .Query("Funcionario")
                .InsertGetId<int>(
                    new
                    {
                        funcionario.Nome,
                        funcionario.Usuario
                    });

            funcionario.Id = id;

            return CreatedAtAction(
                nameof(this.GetById),
                new { id = funcionario.Id },
                funcionario);
        }

        [HttpPut("{id}")]
        public IActionResult Update(
            int id,
            [FromBody] Funcionario funcionario)
        {
            var exists = db
                .Query("funcionario")
                .Where("Id", id)
                .FirstOrDefault();

            if (exists == null)
            {
                return NotFound();
            }

            db
                .Query("funcionario")
                .Where("Id", id)
                .Update(
                    new
                    {
                        funcionario.Nome,
                        funcionario.Usuario
                    });

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var exists = db
                .Query("funcionario")
                .Where("Id", id)
                .FirstOrDefault();

            if (exists == null)
            {
                return NotFound();
            }

            db
                .Query("funcionario")
                .Where("Id", id)
                .Delete();

            return NoContent();
        }
    }
}
