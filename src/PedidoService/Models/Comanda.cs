namespace PedidoService.Models
{
    public class Comanda
    {
        public int Id { get; set; }
        public int MesaId { get; set; }
        public string Status { get; set; }
        public DateTime DataAbertura { get; set; }
        public DateTime? DataFechamento { get; set; }
        public decimal? ValorFinal { get; set; }
    }
}
