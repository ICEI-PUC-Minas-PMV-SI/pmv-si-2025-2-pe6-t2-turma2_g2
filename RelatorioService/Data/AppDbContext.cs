using Microsoft.EntityFrameworkCore;
using RelatorioService.Models;

namespace RelatorioService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<RelatorioVenda> Relatorios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RelatorioVenda>().ToTable("relatorios_vendas");
        }
    }
}
