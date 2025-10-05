using Microsoft.AspNetCore.Mvc;
using NotificacaoService.Models;
using SqlKata.Execution;

namespace NotificacaoService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificacoesController : ControllerBase
    {
        private readonly QueryFactory _db;

        public NotificacoesController(QueryFactory db)
        {
            _db = db;
        }

        // 1) Criar notifica��o quando item ou pedido ficar pronto
        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] CriarNotificacaoRequest req)
        {
            if (req.IdPedido <= 0 || req.IdAtendente <= 0)
                return BadRequest("IdPedido e IdAtendente s�o obrigat�rios");

            var mensagem = string.IsNullOrWhiteSpace(req.Mensagem)
                ? (req.IdItem.HasValue
                    ? $"Item {req.IdItem} do pedido {req.IdPedido} est� pronto"
                    : $"Pedido {req.IdPedido} est� pronto")
                : req.Mensagem;

            var id = await _db.Query("notificacao").InsertGetIdAsync<int>(new
            {
                IdPedido = req.IdPedido,
                IdItem = req.IdItem,
                IdAtendente = req.IdAtendente,
                Mensagem = mensagem,
                Status = "Pendente",
                DataCriacao = DateTime.UtcNow
            });

            return CreatedAtAction(nameof(ObterPorId), new { id }, new { IdNotificacao = id });
        }

        // 2) Obter notifica��o por id
        [HttpGet("{id:int}")]
        public async Task<IActionResult> ObterPorId(int id)
        {
            var n = await _db.Query("notificacao")
                .Where("IdNotificacao", id)
                .FirstOrDefaultAsync<Notificacao>();

            if (n == null) return NotFound();
            return Ok(n);
        }

        // 3) Listar pendentes por atendente
        [HttpGet("pendentes")]
        public async Task<IActionResult> Pendentes([FromQuery] int atendenteId, [FromQuery] int limite = 50)
        {
            if (atendenteId <= 0) return BadRequest("Informe atendenteId");

            var lista = await _db.Query("notificacao")
                .Where("IdAtendente", atendenteId)
                .Where("Status", "Pendente")
                .OrderByDesc("DataCriacao")
                .Limit(limite)
                .GetAsync<Notificacao>();

            return Ok(lista);
        }

        // 4) Marcar como entregue com atualiza��o do item e do pedido quando couber
        [HttpPatch("{id:int}/entregar")]
        public async Task<IActionResult> MarcarEntregue(int id)
        {
            // entregar a notifica��o
            var linhas = await _db.Query("notificacao")
                .Where("IdNotificacao", id)
                .UpdateAsync(new { Status = "Entregue", DataEntrega = DateTime.UtcNow });

            if (linhas == 0) return NotFound();

            // buscar dados essenciais
            var notif = await _db.Query("notificacao")
                .Where("IdNotificacao", id)
                .Select("IdPedido", "IdItem")
                .FirstOrDefaultAsync<Notificacao>();

            if (notif == null) return NoContent();

            // se for notifica��o de item, atualizar o item
            if (notif.IdItem != null)
            {
                await _db.Query("pedido_item")
                    .Where("IdItem", notif.IdItem.Value)
                    .UpdateAsync(new { Status = "Entregue", DataStatus = DateTime.UtcNow });

                // verificar de forma leve se ainda existe item do pedido que n�o esteja Entregue
                var existePendente = await _db.Query("pedido_item")
                    .Where("IdPedido", notif.IdPedido)
                    .WhereNot("Status", "Entregue")
                    .SelectRaw("1")
                    .FirstOrDefaultAsync<int?>();

                // se n�o existe pendente, fechar o pedido
                if (existePendente == null)
                {
                    await _db.Query("pedido")
                        .Where("IdPedido", notif.IdPedido)
                        .UpdateAsync(new { Status = "Entregue", DataAtualizacao = DateTime.UtcNow });
                }
            }
            else
            {
                // notifica��o do pedido inteiro. opcional: fechar pedido se j� estiver Pronto
                var statusPedido = await _db.Query("pedido")
                    .Where("IdPedido", notif.IdPedido)
                    .Select("Status")
                    .FirstOrDefaultAsync<string>();

                if (!string.IsNullOrEmpty(statusPedido) &&
                    string.Equals(statusPedido, "Pronto", StringComparison.OrdinalIgnoreCase))
                {
                    await _db.Query("pedido")
                        .Where("IdPedido", notif.IdPedido)
                        .UpdateAsync(new { Status = "Entregue", DataAtualizacao = DateTime.UtcNow });
                }
            }

            return NoContent();
        }
    }
}
