namespace PratoService.Models
{
    public class Prato
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public int CategoriaId { get; set; }
        public decimal Preco { get; set; }
        public int TempoMedioPreparo { get; set; }
    }
}