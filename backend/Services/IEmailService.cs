namespace VineCore.Api.Services;

/// <summary>Sends outgoing email.</summary>
public interface IEmailService
{
    Task SendAsync(
        string from,
        string to,
        string subject,
        string textBody,
        CancellationToken ct = default);
}
