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
                .Where("IdFuncionario", id)
                .FirstOrDefault<Funcionario>();

            if (funcionario == null)
            {
                return NotFound();
            }

            return Ok(funcionario);
        }

        [HttpGet("login/{login}")]
        [AllowAnonymous]
        public IActionResult GetByUsername(
            string login)
        {
            var funcionario = db
                .Query("funcionario")
                .Where("Login", login)
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
            funcionario.Ativo = true;

            var id = db
                .Query("Funcionario")
                .InsertGetId<int>(
                    new
                    {
                        funcionario.Nome,
                        funcionario.Login,
                        funcionario.SenhaHash,
                        funcionario.Ativo
                    });

            funcionario.IdFuncionario = id;

            return CreatedAtAction(
                nameof(this.GetById),
                new { id = funcionario.IdFuncionario },
                funcionario);
        }

        [HttpPut("{id}")]
        public IActionResult Update(
            int id,
            [FromBody] Funcionario funcionario)
        {
            var exists = db
                .Query("funcionario")
                .Where("IdFuncionario", id)
                .FirstOrDefault();

            if (exists == null)
            {
                return NotFound();
            }

            db
                .Query("funcionario")
                .Where("IdFuncionario", id)
                .Update(
                    new
                    {
                        funcionario.Nome,
                        funcionario.Login,
                        funcionario.SenhaHash,
                        funcionario.Ativo
                    });

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var exists = db
                .Query("funcionario")
                .Where("IdFuncionario", id)
                .FirstOrDefault();

            if (exists == null)
            {
                return NotFound();
            }

            db
                .Query("funcionario")
                .Where("IdFuncionario", id)
                .Delete();

            return NoContent();
        }
    }
}
