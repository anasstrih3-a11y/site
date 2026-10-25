export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function compactCount(n: number): string {
  if (n >= 1000) {
    const v = n / 1000;
    return `${v >= 100 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return `${n}`;
}

export function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${days >= 14 ? "s" : ""} ago`;
  return `${Math.floor(days / 30)} month${days >= 60 ? "s" : ""} ago`;
}
