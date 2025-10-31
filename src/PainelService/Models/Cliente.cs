
namespace PainelService.Models
{
    public class Cliente
    {
        public int Id { get; set; }

        public string Nome { get; set; } = string.Empty;

        public string? Telefone { get; set; }

        public string? Email { get; set; }

        public List<Pedido> Pedidos { get; set; } = new();

        public static implicit operator string(Cliente v)
        {
            throw new NotImplementedException();
        }
    }
}
