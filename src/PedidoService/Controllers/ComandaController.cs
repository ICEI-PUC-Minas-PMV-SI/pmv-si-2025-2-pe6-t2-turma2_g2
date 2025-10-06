using Microsoft.AspNetCore.Mvc;
using PedidoService.Models;
using SqlKata.Execution;

namespace PedidoService.Controllers
{
    [ApiController]
    [Route("api/comanda")]
    public class ComandaController(QueryFactory db) : ControllerBase
    {
        [HttpGet("mesa/{mesaId}")]
        public IActionResult GetByMesa(int mesaId)
        {
            var comandas = db.Query("Comanda").Where("MesaId", mesaId).Get<Comanda>();
            return Ok(comandas);
        }
        
        [HttpGet]
        public IActionResult GetAll()
        {
            var comandas = db.Query("Comanda").Get<Comanda>();
            return Ok(comandas);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var comanda = db.Query("Comanda").Where("Id", id).FirstOrDefault<Comanda>();
            if (comanda == null) return NotFound();
            var itens = db.Query("ItemPedido").Where("ComandaId", id).Get<ItemPedido>();
            return Ok(new { comanda, itens });
        }

        [HttpPost]
        public IActionResult Create([FromBody] Comanda comanda)
        {
            comanda.Status = "Aberta";
            comanda.DataAbertura = DateTime.Now;
            var id = db.Query("Comanda").InsertGetId<int>(new
            {
                comanda.MesaId,
                comanda.Status,
                comanda.DataAbertura
            });
            comanda.Id = id;

            db.Query("Mesa").Where("Id", comanda.MesaId).Update(new { Ocupada = true });

            return CreatedAtAction(nameof(GetById), new { id = comanda.Id }, comanda);
        }

        [HttpPut("{id}/fechar")]
        public IActionResult Fechar(int id)
        {
            var comanda = db.Query("Comanda").Where("Id", id).FirstOrDefault<Comanda>();
            if (comanda == null) return NotFound();
            if (comanda.Status == "Fechada") return BadRequest("Comanda já está fechada.");

            var itens = db.Query("ItemPedido").Where("ComandaId", id).Get<ItemPedido>();
            decimal? valorFinal = itens.Sum(i => i.Valor);
            var dataFechamento = DateTime.Now;

            db.Query("Comanda").Where("Id", id).Update(new
            {
                Status = "Fechada",
                DataFechamento = dataFechamento,
                ValorFinal = valorFinal
            });

            var comandaAtualizada = db.Query("Comanda").Where("Id", id).FirstOrDefault<Comanda>();

            return Ok(new { comanda = comandaAtualizada, itens });
        }
    }
}
