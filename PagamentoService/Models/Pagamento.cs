using System;

namespace PagamentoService.Models
{
    public class Pagamento
    {
        public Guid Id { get; set; }
        public int ComandaId { get; set; }
        public int MeioPagamentoId { get; set; }
        public MeioPagamento MeioPagamento { get; set; }
        public decimal Valor { get; set; }
        public int StatusPagamentoId { get; set; }
        public StatusPagamento StatusPagamento { get; set; }
        public DateTime DataHora { get; set; }
    }
}
