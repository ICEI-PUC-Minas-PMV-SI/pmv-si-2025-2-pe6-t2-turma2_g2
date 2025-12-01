using FluentAssertions;
using System.Net;
using System.Net.Http.Json;

namespace FuncionarioTest
{
    public class FuncionarioTests
    {
        private readonly HttpClient _client;

        public FuncionarioTests(TestWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Post_Funcionarios_Deve_Criar_Funcionario()
        {
            var novo = new
            {
                nome = "Administrador"
            };

            var response = await _client.PostAsJsonAsync("api/funcionario", novo);

            response.StatusCode.Should().Be(HttpStatusCode.Created);

            var body = await response.Content.ReadFromJsonAsync<FuncionarioResponseDto>();

            body.Should().NotBeNull();
            body!.Nome.Should().Be("Administrador");
        }

        [Fact]
        public async Task Get_Funcionarios_Deve_Retornar_Lista()
        {
            var novo = new { nome = "João" };
            await _client.PostAsJsonAsync("api/funcionarios", novo);

            var response = await _client.GetAsync("api/funcionarios");

            response.EnsureSuccessStatusCode();

            var lista = await response.Content.ReadFromJsonAsync<List<FuncionarioResponseDto>>();

            lista.Should().NotBeNull();
            lista!.Should().NotBeEmpty();
            lista!.Any(f => f.Nome == "João da Silva").Should().BeTrue();
        }
    }

    public class FuncionarioResponseDto
    {
        public int IdFuncionario { get; set; }

        public string Nome { get; set; }

        public string Login { get; set; }

        public string SenhaHash { get; set; }

        public bool Ativo { get; set; }
    }
}
