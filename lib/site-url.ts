const localhostFallback = "http://localhost:3001"

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL
  if (configured && configured.trim().length > 0) {
    return configured
  }

  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl && vercelUrl.trim().length > 0) {
    return `https://${vercelUrl}`
  }

  return localhostFallback
}
