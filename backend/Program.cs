using Microsoft.Extensions.Options;
using MimeKit;
using VineCore.Api.Models;
using VineCore.Api.Options;
using VineCore.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// In the Vercel container, PORT is set (via the Dockerfile) and the app must
// bind 0.0.0.0 on that port. Locally PORT is unset, so `dotnet run` keeps using
// launchSettings.json (http://localhost:5000) for the frontend dev proxy.
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

builder.Services.Configure<SmtpOptions>(builder.Configuration.GetSection("Smtp"));
builder.Services.Configure<ContactOptions>(builder.Configuration.GetSection("Contact"));
builder.Services.AddSingleton<IEmailService, SmtpEmailService>();

var app = builder.Build();

app.UseCors();

app.MapGet("/", () => Results.Ok(new { name = "VineCore API", status = "ok" }));

app.MapPost("/api/contact", async (
    ContactRequest request,
    IEmailService email,
    IOptions<ContactOptions> contact,
    ILogger<Program> logger,
    CancellationToken ct) =>
{
    // Honeypot: a hidden field only bots fill in. Pretend success so bots learn nothing.
    if (!string.IsNullOrWhiteSpace(request.Website))
    {
        logger.LogInformation("Contact request discarded (honeypot filled).");
        return Results.Ok();
    }

    if (string.IsNullOrWhiteSpace(request.Name) ||
        string.IsNullOrWhiteSpace(request.Email) ||
        !MailboxAddress.TryParse(request.Email, out _) ||
        string.IsNullOrWhiteSpace(request.Message))
    {
        return Results.BadRequest(new
        {
            error = "Name, a valid email address, and a message are required."
        });
    }

    var subject = string.IsNullOrWhiteSpace(request.Subject)
        ? "New contact request via vinecore.com"
        : $"Contact request: {request.Subject}";

    var body = $"Name: {request.Name}\n" +
               $"Email: {request.Email}\n" +
               $"Subject: {request.Subject ?? "-"}\n\n" +
               request.Message;

    try
    {
        await email.SendAsync(contact.Value.From, contact.Value.Recipient, subject, body, ct);
        return Results.Ok();
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to send contact email.");
        return Results.Problem(
            detail: "Your message could not be sent right now. Please try again later.",
            statusCode: StatusCodes.Status502BadGateway);
    }
});

app.Run();
