namespace NotificacaoService.Models
{
    public class CriarNotificacaoRequest
    {
        public int IdPedido { get; set; }
        public int? IdItem { get; set; }
        public int IdAtendente { get; set; }
        public string? Mensagem { get; set; }
    }
}
