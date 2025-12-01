using ProdutoService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SqlKata.Execution;

namespace ProdutoService.Controllers
{
    [ApiController]
    [Route("api/produto")]
    [Authorize]
    public class ProdutoController(QueryFactory db) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var produtos = db
                .Query("produto")
                .Get<Produto>();

            return Ok(produtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var produto = db
                .Query("produto")
                .Where("IdProduto", id)
                .FirstOrDefault<Produto>();

            if (produto == null)
            {
                return NotFound();
            }

            return Ok(produto);
        }

        [HttpPost]
        public IActionResult Create(
            [FromBody] Produto produto)
        {
            var id = db
                .Query("produto")
                .InsertGetId<int>(
                    new
                    {
                        produto.Nome,
                        produto.PrecoUnitario,
                        produto.Estacao
                    });

            produto.IdProduto = id;

            return CreatedAtAction(
                nameof(this.GetById),
                new { id = produto.IdProduto },
                produto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(
            int id,
            [FromBody] Produto produto)
        {
            var exists = db
                .Query("produto")
                .Where("IdProduto", id)
                .FirstOrDefault();

            if (exists == null)
            {
                return NotFound();
            }

            db
                .Query("produto")
                .Where("IdProduto", id)
                .Update(
                    new
                    {
                        produto.Nome,
                        produto.PrecoUnitario,
                        produto.Estacao
                    });

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var exists = db
                .Query("produto")
                .Where("IdProduto", id)
                .FirstOrDefault();

            if (exists == null)
            {
                return NotFound();
            }

            db
                .Query("produto")
                .Where("IdProduto", id)
                .Delete();

            return NoContent();
        }
    }
}
