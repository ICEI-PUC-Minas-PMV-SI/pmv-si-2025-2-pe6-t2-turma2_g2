namespace NotificacaoService.Models
{
	public class Notificacao
	{
		public int IdNotificacao { get; set; }
		public int IdPedido { get; set; }
		public int? IdItem { get; set; }
		public int IdAtendente { get; set; }
		public string Mensagem { get; set; } = string.Empty;
		public string Status { get; set; } = "Pendente";
		public DateTime DataCriacao { get; set; }
		public DateTime? DataEntrega { get; set; }
	}
}
