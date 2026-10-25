namespace VineCore.Api.Options;

/// <summary>SMTP settings for the outgoing mail relay. Bound from the "Smtp" config section.</summary>
public sealed class SmtpOptions
{
    public string Host { get; set; } = string.Empty;
    public int Port { get; set; } = 587;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public bool UseSsl { get; set; } = true;
}
