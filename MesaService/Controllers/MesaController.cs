using Microsoft.AspNetCore.Mvc;
using MesaService.Models;
using SqlKata.Execution;
using System.Collections.Generic;
using System.Linq;

namespace MesaService.Controllers
{
    [ApiController]
    [Route("api/mesa")]
    public class MesaController(QueryFactory db) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var mesas = db.Query("Mesa").Get<Mesa>();
            return Ok(mesas);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var mesa = db.Query("Mesa").Where("Id", id).FirstOrDefault<Mesa>();
            if (mesa == null) return NotFound();
            return Ok(mesa);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Mesa mesa)
        {
            var id = db.Query("Mesa").InsertGetId<int>(new
            {
                mesa.Identificacao,
                mesa.Lugares,
                mesa.Ocupada
            });
            mesa.Id = id;
            return CreatedAtAction(nameof(GetById), new { id = mesa.Id }, mesa);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Mesa mesa)
        {
            var affected = db.Query("Mesa").Where("Id", id).Update(new
            {
                mesa.Identificacao,
                mesa.Lugares,
                mesa.Ocupada
            });
            if (affected == 0) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var affected = db.Query("Mesa").Where("Id", id).Delete();
            if (affected == 0) return NotFound();
            return NoContent();
        }
    }
}
