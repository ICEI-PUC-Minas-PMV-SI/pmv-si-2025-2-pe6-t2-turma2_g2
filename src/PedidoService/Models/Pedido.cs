namespace PedidoService.Models
{
    public class Pedido
    {
        public int IdPedido { get; set; }

        public int NumeroMesa { get; set; }

        public string Comanda { get; set; }

        public int NumeroComanda { get; set; }

        public decimal ValorTotal { get; set; }

        public string Status { get; set; }

        public string? Observacao { get; set; }

        public DateTime Data { get; set; }

        public string? FormaPagamento { get; set; }
    }
}
