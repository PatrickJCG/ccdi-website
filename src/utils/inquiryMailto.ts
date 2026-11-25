/**
 * Builds a properly encoded mailto: URL from recipient, subject, and body text.
 */
export function buildMailtoUrl(to: string, subject: string, body: string): string {
  const params = new URLSearchParams({
    subject,
    body,
  });
  // URLSearchParams encodes spaces as '+', while mailto clients expect '%20'
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${to}?${query}`;
}
