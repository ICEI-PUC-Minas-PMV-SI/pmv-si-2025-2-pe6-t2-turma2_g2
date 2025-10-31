using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SqlKata.Compilers;
using SqlKata.Execution;
using MySqlConnector;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var keyBase64 = builder.Configuration["Jwt:Key"];
var keyBytes = Convert.FromBase64String(keyBase64);
var signingKey = new SymmetricSecurityKey(keyBytes);

builder.Services.AddHttpClient("FuncionarioService", client =>
{
    client.BaseAddress = new Uri("http://localhost:5099/");
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = signingKey
    };
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var connection = new MySqlConnection(connectionString);
var compiler = new MySqlCompiler();
var db = new QueryFactory(connection, compiler);
builder.Services.AddSingleton(db);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

    app.Run();
