namespace RelatorioService.Models
{
    public class RelatorioVenda
    {
        public int Id { get; set; }

        public string Garcom { get; set; }

        public int Comandas { get; set; }

        public int ItensVendidos { get; set; }

        public decimal TotalBruto { get; set; }

        public decimal TiqueteMedio { get; set; }
    }
}
