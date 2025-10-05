using System.Data;
using MySqlConnector;
using Microsoft.OpenApi.Models;
using SqlKata.Compilers;
using SqlKata.Execution;

var builder = WebApplication.CreateBuilder(args);

// 1) Conexão MySQL a partir do appsettings.json
builder.Services.AddScoped<IDbConnection>(_ =>
{
    var cs = builder.Configuration.GetConnectionString("DefaultConnection");
    return new MySqlConnection(cs);
});

// 2) SqlKata
builder.Services.AddScoped<Compiler, MySqlCompiler>();
builder.Services.AddScoped(factory =>
{
    var conn = factory.GetRequiredService<IDbConnection>();
    var comp = factory.GetRequiredService<Compiler>();
    return new QueryFactory(conn, comp);
});

// 3) Controllers
builder.Services.AddControllers();

// 4) Swagger básico
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "NotificacaoService", Version = "v1" });
});

// 5) CORS aberto para demo  sugestão  ajuste depois
builder.Services.AddCors(o =>
{
    o.AddPolicy("default", p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

// Swagger no Dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("default");

// IMPORTANTE  mapear controllers
app.MapControllers();

app.Run();
