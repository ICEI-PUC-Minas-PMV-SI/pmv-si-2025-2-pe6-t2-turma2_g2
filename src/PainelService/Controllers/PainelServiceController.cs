using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SqlKata.Execution;
using PainelService.Models;

namespace PainelService.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PainelServiceController(QueryFactory db) : ControllerBase
    {
        private readonly QueryFactory _db = db;

        [HttpGet]
        public IActionResult GetAll()
        {
            var pedidos = _db.Query("pedido")
                .Join("cliente", "cliente.Id", "pedido.ClienteId")
                .Select("pedido.Id", "cliente.Nome as cliente", "pedido.Status", "pedido.Total", "pedido.DataHora")
                .OrderByDesc("pedido.DataHora")
                .Get<Pedido>();

            return Ok(pedidos);
        }

        // Retorna um pedido específico com seus itens
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var pedido = _db.Query("pedido")
                .Join("cliente", "cliente.Id", "pedido.ClienteId")
                .Select("pedido.Id", "cliente.Nome as Cliente", "pedido.Status", "pedido.Total", "pedido.DataHora")
                .Where("pedido.Id", id)
                .FirstOrDefault<Pedido>();

            if (pedido == null)
                return NotFound("Pedido não encontrado.");

            var itens = _db.Query("pedidoitem")
                .Join("produto", "produto.Id", "pedidoItem.ProdutoId")
                .Select("pedidoitem.Id", "pedidoitem.Quantidade", "pedidoitem.PrecoUnitario", "Produto.Nome as NomeProduto")
                .Where("Pedidoitem.PedidoId", id)
                .Get<PedidoItem>()
                .ToList();

            pedido.Itens = itens;

            return Ok(pedido);
        }

        // ✅ PUT: api/pedido/{id}/status
        // Atualiza o status do pedido
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatusAsync(int id, [FromBody] string novoStatus)
        {
            if (string.IsNullOrWhiteSpace(novoStatus))
                return BadRequest("O status não pode ser vazio.");

            // Busca o pedido pelo ID de forma assíncrona
            var pedido = await _db.Query("pedido")
                                  .Where("Id", id)
                                  .FirstOrDefaultAsync<Pedido>();

            if (pedido == null)
                return NotFound("Pedido não encontrado.");

            // Atualiza o status de forma assíncrona
            await _db.Query("pedido")
                     .Where("Id", id)
                     .UpdateAsync(new { Status = novoStatus });

            // Atualiza o objeto local para retorno
            pedido.Status = novoStatus;

            return Ok(pedido);
        }



        // ✅ DELETE: api/pedido/{id}
        // Exclui um pedido e seus itens
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var pedido = _db.Query("pedido").Where("Id", id).FirstOrDefault();

            if (pedido == null)
                return NotFound("Pedido não encontrado.");

            _db.Query("pedidoitem").Where("PedidoId", id).Delete();
            _db.Query("pedido").Where("Id", id).Delete();

            return Ok(new { Mensagem = $"Pedido #{id} excluído com sucesso." });
        }
    }
}

