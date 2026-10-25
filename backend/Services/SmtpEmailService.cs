using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using VineCore.Api.Options;

namespace VineCore.Api.Services;

/// <summary>Delivers email over SMTP using MailKit.</summary>
public sealed class SmtpEmailService(
    IOptions<SmtpOptions> options,
    ILogger<SmtpEmailService> logger) : IEmailService
{
    public async Task SendAsync(
        string from,
        string to,
        string subject,
        string textBody,
        CancellationToken ct = default)
    {
        var smtp = options.Value;

        if (string.IsNullOrWhiteSpace(smtp.Host))
        {
            throw new InvalidOperationException(
                "SMTP is not configured. Set Smtp:Host (and credentials) in appsettings or environment variables.");
        }

        var message = new MimeMessage();
        message.From.Add(MailboxAddress.Parse(from));
        message.To.Add(MailboxAddress.Parse(to));
        message.Subject = subject;
        message.Body = new TextPart("plain") { Text = textBody };

        using var client = new SmtpClient();
        var secureOptions = smtp.UseSsl ? SecureSocketOptions.StartTls : SecureSocketOptions.None;

        await client.ConnectAsync(smtp.Host, smtp.Port, secureOptions, ct);

        if (!string.IsNullOrWhiteSpace(smtp.Username))
        {
            await client.AuthenticateAsync(smtp.Username, smtp.Password, ct);
        }

        await client.SendAsync(message, ct);
        await client.DisconnectAsync(true, ct);

        logger.LogInformation("Contact email sent to {Recipient} from {Sender}.", to, from);
    }
}
