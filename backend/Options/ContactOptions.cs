namespace VineCore.Api.Options;

/// <summary>Contact-related settings. Bound from the "Contact" config section.</summary>
public sealed class ContactOptions
{
    public string Recipient { get; set; } = string.Empty;
    public string From { get; set; } = string.Empty;
}
