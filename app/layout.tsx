import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteShell from "@/components/site-shell"
import { getSiteUrl } from "@/lib/site-url"

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Audrey Ng",
    template: "%s | Audrey Ng",
  },
  description: "Portfolio of Audrey Ng - software engineering projects, experience, and technical skills.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Audrey Ng",
    description: "Portfolio of Audrey Ng - software engineering projects, experience, and technical skills.",
    siteName: "Audrey Ng Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audrey Ng",
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