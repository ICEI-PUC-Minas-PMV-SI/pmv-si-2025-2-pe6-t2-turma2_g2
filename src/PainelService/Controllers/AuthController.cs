using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration; // Necessário para acessar a chave JWT
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;

namespace PainelService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        // O ideal é ter um serviço para gerenciar usuários e validação
        // private readonly IUserService _userService; 

        public AuthController(IConfiguration configuration /*, IUserService userService */)
        {
            _configuration = configuration;
            // _userService = userService;
        }

        // Modelo simples para receber as credenciais de login
        public class LoginModel
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        /// <summary>
        /// Endpoint para autenticar o usuário e retornar um JWT.
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            // 1. **Substitua esta lógica pelo acesso ao seu banco de dados**
            //    e validação real da senha (com hashing).

            // Exemplo Simples: Verificar credenciais estáticas
            if (login.Username != "admin" || login.Password != "123456")
            {
                // Se a validação falhar:
                return Unauthorized(new { Message = "Credenciais inválidas." });
            }

            // 2. **Se a validação for bem-sucedida, gere o token.**
            var tokenString = GenerateJwtToken(login.Username);

            return Ok(new { Token = tokenString });
        }

        // Método auxiliar para gerar o JWT
        private string GenerateJwtToken(string username)
        {
            // 1. Definir as Claims (informações do usuário a serem incluídas no token)
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                // new Claim(ClaimTypes.Role, "Admin") // Adicionar roles se necessário
            };

            // 2. Obter a Chave Secreta do seu appsettings.json
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            // 3. Criar as Credenciais de Assinatura
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // 4. Configurar o Token
            var token = new JwtSecurityToken(
                // issuer: "SeuAppIssuer", // Opcional
                // audience: "SeuAppAudience", // Opcional
                claims: claims,
                expires: DateTime.Now.AddHours(2), // O token expira em 2 horas
                signingCredentials: creds
            );

            // 5. Escrever e retornar o token como string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
