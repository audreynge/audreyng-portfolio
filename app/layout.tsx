import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteShell from "@/components/site-shell"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Audrey Ng | Software Engineer",
    template: "%s | Audrey Ng",
  },
  description: "Portfolio of Audrey Ng - software engineering projects, experience, and technical skills.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Audrey Ng | Software Engineer",
    description: "Portfolio of Audrey Ng - software engineering projects, experience, and technical skills.",
    siteName: "Audrey Ng Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audrey Ng | Software Engineer",
    description: "Portfolio of Audrey Ng - software engineering projects, experience, and technical skills.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  )
}