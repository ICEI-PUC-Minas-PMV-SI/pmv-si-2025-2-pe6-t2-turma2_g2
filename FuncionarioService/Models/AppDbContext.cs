using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;




namespace FuncionarioService.Models
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Funcionario> Funcionarios { get; set; }
        public DbSet<Consumo> Consumos { get; set; }
    }
}

 
