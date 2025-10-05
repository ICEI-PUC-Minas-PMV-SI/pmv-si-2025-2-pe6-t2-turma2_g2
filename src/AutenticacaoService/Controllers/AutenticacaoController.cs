using AutenticacaoService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AutenticacaoService.Controllers
{
    [ApiController]
    [Route("api/autenticacao")]
    public class AutenticacaoController(
        IHttpClientFactory httpClientFactory,
        IConfiguration config) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]Login request)
        {
            var client = httpClientFactory.CreateClient("FuncionarioService");

            var response = await client.GetAsync($"api/funcionario/usuario/{request.Usuario}");

            if (!response.IsSuccessStatusCode)
            {
                return Unauthorized("Usuário ou senha inválidos");
            }

            var usuario = await response.Content.ReadFromJsonAsync<FuncionarioDto>();

            if (usuario == null || usuario.Senha != request.Senha)
            {
                return Unauthorized("Usuário ou senha inválidos");
            }

            var token = this.GenerateJwtToken(usuario);
            return Ok(new { token });
        }

        private string GenerateJwtToken(FuncionarioDto user)
        {
            var key = Encoding.ASCII.GetBytes(config["Jwt:Key"] ?? string.Empty);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                [
                    new Claim(ClaimTypes.Name, user.Usuario),
                    new Claim(ClaimTypes.Role, user.Funcao)
                ]),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
