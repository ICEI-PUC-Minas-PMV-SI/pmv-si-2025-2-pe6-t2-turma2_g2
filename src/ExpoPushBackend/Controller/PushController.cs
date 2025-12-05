using Microsoft.AspNetCore.Mvc;
using ExpoPushBackend.Models;
using System.Text;
using System.Text.Json;

namespace ExpoPushBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PushController : ControllerBase
    {
        private static Dictionary<string, string> userTokens = new Dictionary<string, string>();

        [HttpPost("save-token")]
        public IActionResult SaveToken([FromBody] PushToken pushToken)
        {
            if (string.IsNullOrEmpty(pushToken.UserId) || string.IsNullOrEmpty(pushToken.Token))
                return BadRequest("userId e token são obrigatórios");

            userTokens[pushToken.UserId] = pushToken.Token;
            return Ok(new { success = true });
        }

        [HttpPost("send-notification")]
        public async Task<IActionResult> SendNotification([FromBody] PushToken pushToken)
        {
            if (!userTokens.TryGetValue(pushToken.UserId, out var token))
                return BadRequest("Usuário não registrado");

            var message = new
            {
                to = token,
                sound = "default",
                title = pushToken.UserId,
                body = "Nova notificação!",
                data = new { userId = pushToken.UserId }
            };

            var json = JsonSerializer.Serialize(message);
            using var client = new HttpClient();
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("https://exp.host/--/api/v2/push/send", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            return Ok(responseBody);
        }
    }
}
