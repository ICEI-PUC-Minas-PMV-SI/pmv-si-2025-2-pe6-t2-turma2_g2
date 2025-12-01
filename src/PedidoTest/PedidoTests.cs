using FluentAssertions;
using System.Net;
using System.Net.Http.Json;

namespace PedidoTest
{
    public class PedidoTests : IClassFixture<TestWebApplicationFactory>
    {
        private readonly HttpClient _client;

        public PedidoTests(TestWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Post_Pedidos_Deve_Criar_Pedido()
        {
            var novo = new
            {
                comanda = "Alice"
            };

            var response = await _client.PostAsJsonAsync("api/pedido", novo);

            response.StatusCode.Should().Be(HttpStatusCode.Created);

            var body = await response.Content.ReadFromJsonAsync<PedidoResponseDto>();

            body.Should().NotBeNull();
            body!.Comanda.Should().Be("Alice");
        }

        [Fact]
        public async Task Get_Pedidos_Deve_Retornar_Lista()
        {
            var response = await _client.GetAsync("api/pedido");

            response.EnsureSuccessStatusCode();

            var lista = await response.Content.ReadFromJsonAsync<List<PedidoResponseDto>>();

            lista.Should().NotBeNull();
            lista!.Should().NotBeEmpty();
        }
    }

    public class PedidoResponseDto
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
