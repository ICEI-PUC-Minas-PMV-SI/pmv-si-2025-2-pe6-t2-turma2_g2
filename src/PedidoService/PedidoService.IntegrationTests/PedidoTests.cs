using System.Net;
using FluentAssertions;
using PedidoService.IntegrationTests;
using Xunit;

namespace PedidoService.IntegrationTests;

public class PedidoTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly HttpClient _client;

    public PedidoTests(TestWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Post_Funcionarios_Deve_Criar_Funcionario()
    {
        var novoFuncionario = new
        {
            nome = "Administrador"
        };

        var response = await _client.PostAsJsonAsync("/funcionarios", novoFuncionario);

        response.StatusCode.Should().Be(HttpStatusCode.Created);

        var body = await response.Content.ReadFromJsonAsync<PedidoResponseDto>();

        body.Should().NotBeNull();
        body!.Nome.Should().Be("Administrador");
    }

    [Fact]
    public async Task Get_Funcionarios_Deve_Retornar_Lista()
    {
        var novoFuncionario = new { nome = "João da Silva" };
        await _client.PostAsJsonAsync("/funcionarios", novoFuncionario);

        var response = await _client.GetAsync("api/funcionarios");

        response.EnsureSuccessStatusCode();

        var lista = await response.Content.ReadFromJsonAsync<List<PedidoResponseDto>>();

        lista.Should().NotBeNull();
        lista!.Should().NotBeEmpty();
        lista!.Any(f => f.Nome == "João da Silva").Should().BeTrue();
    }

    public class PedidoResponseDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = "";
    }
}
