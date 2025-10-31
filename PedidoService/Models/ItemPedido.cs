namespace PedidoService.Models
{
    public class ItemPedido
    {
        public int Id { get; set; }
        public DateTime DataHora { get; set; }
        public int PratoId { get; set; }
        public int StatusId { get; set; }
        public decimal? Valor { get; set; }
        public string Especificacoes { get; set; }
        public int ComandaId { get; set; }
    }
}