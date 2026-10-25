namespace VineCore.Api.Models;

/// <summary>A contact request submitted through the site's contact form.</summary>
/// <param name="Name">The visitor's name.</param>
/// <param name="Email">The visitor's reply-to email address.</param>
/// <param name="Subject">An optional subject line.</param>
/// <param name="Message">The message body.</param>
/// <param name="Website">Honeypot field. Only bots fill it in; humans never see it.</param>
public sealed record ContactRequest(
    string Name,
    string Email,
    string? Subject,
    string Message,
    string? Website);
