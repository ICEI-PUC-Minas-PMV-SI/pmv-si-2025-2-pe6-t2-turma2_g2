var builder = WebApplication.CreateBuilder(args);

var expoPushServiceUrl = builder.Configuration["PushNotifications:ExpoPushServiceUrl"];
var backendPort = builder.Configuration["PushNotifications:BackendPort"];

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors();

app.UseRouting();

app.MapControllers();

app.Run();
