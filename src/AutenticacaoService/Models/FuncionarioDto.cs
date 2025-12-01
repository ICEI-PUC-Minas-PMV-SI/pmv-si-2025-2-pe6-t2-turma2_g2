namespace AutenticacaoService.Models
{
    public class FuncionarioDto
    {
        public int IdFuncionario { get; set; }

        public string Nome { get; set; }

        public string Login { get; set; }

        public string SenhaHash { get; set; }
    }
}
