namespace ProdutoService.Models
{
    public class Produto
    {
        public int IdProduto { get; set; }

        public string Nome { get; set; }

        public decimal PrecoUnitario { get; set; }

        public string Estacao { get; set; }
    }
}
