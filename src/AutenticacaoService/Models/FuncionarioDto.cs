namespace AutenticacaoService.Models
{
    public class FuncionarioDto
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public int Codigo { get; set; }

        public string Usuario { get; set; }

        public string Senha { get; set; }

        public string Funcao { get; set; }
    }
}
