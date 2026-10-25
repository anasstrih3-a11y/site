// Affiliate link helper. Set NEXT_PUBLIC_AMAZON_TAG to your Amazon
// Associates tracking ID (e.g. "nexusarsenal-20") and it will be appended
// to every outbound Amazon link automatically.
const TAG = process.env.NEXT_PUBLIC_AMAZON_TAG;

export function amazonLink(baseUrl: string): string {
  if (!TAG) return baseUrl;
  const sep = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${sep}tag=${encodeURIComponent(TAG)}`;
}
