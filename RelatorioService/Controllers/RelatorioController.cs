using Microsoft.AspNetCore.Mvc;
using RelatorioService.Data;
using RelatorioService.Models;
using Microsoft.EntityFrameworkCore;

namespace RelatorioService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatorioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RelatorioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetRelatorios()
        {
            var lista = await _context.Relatorios.ToListAsync();
            return Ok(lista);
        }
    }
}
