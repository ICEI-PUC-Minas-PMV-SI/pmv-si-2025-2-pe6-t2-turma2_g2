using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PainelService.Models
{
    [Table("pedido")]
    public class Pedido
    {
        public int Id { get; set; }

        // Apenas o nome do cliente
        public string Cliente { get; set; } = string.Empty;

        public DateTime DataHora { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Recebido";
        public decimal Total { get; set; }

        public List<PedidoItem> Itens { get; set; } = new();
    }

}





