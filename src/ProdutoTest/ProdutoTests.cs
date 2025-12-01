using FluentAssertions;
using System.Net;
using System.Net.Http.Json;

namespace ProdutoTest
{
    public class ProdutoTests : IClassFixture<TestWebApplicationFactory>
    {
        private readonly HttpClient _client;

        public ProdutoTests(TestWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Post_Produtos_Deve_Criar_Produto()
        {
            var novo = new
            {
                nome = "Coca-cola",
                precoUnitario = 7.50m,
                estacao = "Bebidas"
            };

            var response = await _client.PostAsJsonAsync("api/produto", novo);

            response.StatusCode.Should().Be(HttpStatusCode.Created);

            var body = await response.Content.ReadFromJsonAsync<ProdutoResponseDto>();

            body.Should().NotBeNull();
            body!.Nome.Should().Be("Coca-cola");
        }

        [Fact]
        public async Task Get_Produtos_Deve_Retornar_Lista()
        {
            var response = await _client.GetAsync("api/funcionarios");

            response.EnsureSuccessStatusCode();

            var lista = await response.Content.ReadFromJsonAsync<List<ProdutoResponseDto>>();

            lista.Should().NotBeNull();
            lista!.Should().NotBeEmpty();
        }
    }

    public class ProdutoResponseDto
    {
        public int IdProduto { get; set; }

        public string Nome { get; set; }

        public decimal PrecoUnitario { get; set; }

        public string Estacao { get; set; }
    }
}