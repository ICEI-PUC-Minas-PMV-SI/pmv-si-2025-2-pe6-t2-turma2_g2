namespace FuncionarioService.Models
{
    public class Funcionario
    {
        public int IdFuncionario { get; set; }

        public string Nome { get; set; }

        public string Login { get; set; }

        public string SenhaHash { get; set; }

        public bool Ativo { get; set; }

        public string Funcao { get; set; }
    }
}
