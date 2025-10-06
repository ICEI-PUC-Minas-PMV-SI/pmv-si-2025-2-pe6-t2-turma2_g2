using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FuncionarioService.Models
{
    [Table("Consumos")]
    public class Consumo
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Descricao { get; set; }
        [Required]
        public DateTime Data { get; set; }
        [Required]
        public TipoGenero Tipo { get; set; }

        [Required]
        public int FuncionarioId { get; set; }

        public Funcionario Funcionario { get; set; }

    }

    public enum TipoGenero
    {
        Masculino,
        Feminino,
        Outro
    }
}