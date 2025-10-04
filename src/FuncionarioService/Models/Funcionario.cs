using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FuncionarioService.Models
{
    [Table("Funcionarios")]
    public class Funcionario
    {

        public int Id { get; set; }
     
        public string Nome { get; set; }

        public string Usuario { get; set; }

        public string Senha { get; set; }
      
        public string Funcao { get; set; }

        public ICollection<Consumo> Consumos { get; set; }
    }
}
