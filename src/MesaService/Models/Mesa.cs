using System;

namespace MesaService.Models
{
    public class Mesa
    {
        public int Id { get; set; }

        public string Identificacao { get; set; }

        public int Lugares { get; set; }

        public bool Ocupada { get; set; }
    }
}
