export interface ContactRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
  /** Honeypot field: hidden from humans, filled by bots. */
  website?: string;
}
