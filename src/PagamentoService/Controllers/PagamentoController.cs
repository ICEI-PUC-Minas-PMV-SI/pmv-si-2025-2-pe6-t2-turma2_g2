
using Microsoft.AspNetCore.Mvc;
using PagamentoService.Models;
using SqlKata.Execution;

namespace PagamentoService.Controllers
{
    [ApiController]
    [Route("api/pagamento")]
    public class PagamentoController : ControllerBase
    {
        private readonly QueryFactory _db;
        public PagamentoController(QueryFactory db)
        {
            _db = db;
        }

        [HttpPost]
        public IActionResult GerarPagamento([FromBody] GerarPagamentoRequest request)
        {
            var comanda = _db.Query("Comanda").Where("Id", request.ComandaId).FirstOrDefault();
            if (comanda == null || comanda.ValorFinal == null)
                return BadRequest("Comanda não encontrada ou sem valor final.");

            var meioPagamento = _db.Query("MeiosPagamento").Where("Id", request.MeioPagamentoId).FirstOrDefault();
            if (meioPagamento == null)
                return BadRequest("Meio de pagamento inválido.");

            var statusPagamento = _db.Query("StatusPagamento").Where("Nome", "Pendente").FirstOrDefault();
            if (statusPagamento == null)
                return BadRequest("Status de pagamento padrão não encontrado.");

            var pagamento = new Pagamento
            {
                Id = Guid.NewGuid(),
                ComandaId = request.ComandaId,
                MeioPagamentoId = request.MeioPagamentoId,
                MeioPagamento = new MeioPagamento { Id = meioPagamento.id, Nome = meioPagamento.nome },
                Valor = (decimal)comanda.ValorFinal,
                StatusPagamentoId = statusPagamento.id,
                StatusPagamento = new StatusPagamento { Id = statusPagamento.id, Nome = statusPagamento.nome }
            };
            _db.Query("Pagamento").Insert(new
            {
                Id = pagamento.Id,
                ComandaId = pagamento.ComandaId,
                MeioPagamentoId = pagamento.MeioPagamentoId,
                Valor = pagamento.Valor,
                StatusPagamentoId = pagamento.StatusPagamentoId
            });
            return Ok(pagamento);
        }

        [HttpPut("{id}/confirmar")]
        public IActionResult ConfirmarPagamento(Guid id)
        {
            var pagamento = _db.Query("Pagamento").Where("Id", id).FirstOrDefault<Pagamento>();
            if (pagamento == null) return NotFound();
            var statusConfirmado = _db.Query("StatusPagamento").Where("Nome", "Confirmado").FirstOrDefault();
            if (statusConfirmado == null) return BadRequest("Status 'Confirmado' não encontrado.");
            if (pagamento.StatusPagamentoId == statusConfirmado.id) return BadRequest("Pagamento já confirmado.");
            _db.Query("Pagamento").Where("Id", id).Update(new { StatusPagamentoId = statusConfirmado.id, DataHora = DateTime.Now });
            pagamento.StatusPagamentoId = statusConfirmado.id;
            pagamento.StatusPagamento = new StatusPagamento { Id = statusConfirmado.id, Nome = statusConfirmado.nome };
            return Ok(pagamento);
        }
    }

    public class GerarPagamentoRequest
    {
        public int ComandaId { get; set; }
        public int MeioPagamentoId { get; set; }
    }
}
