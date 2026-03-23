"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Menu, X } from "lucide-react"
import BackgroundAudio from "@/components/background-audio"

type SiteShellProps = {
  children: React.ReactNode
}

const navItems = [
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "skills", href: "/skills" },
  { label: "contact", href: "/contact" },
]

export default function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-white bg-clip-text">
            <Image src="/icon.png" alt="Audrey Ng logo" width={28} height={28} priority />
            <span>Audrey Ng</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`capitalize text-sm font-medium transition-colors ${
                    isActive ? "text-primary" : "text-gray-300 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <button className="md:hidden text-gray-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gray-900 border-b border-gray-800"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`capitalize text-sm font-medium transition-colors ${
                      isActive ? "text-primary" : "text-gray-300 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16">{children}</main>

      <footer className="bg-gray-900 border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 mb-4 md:mb-0">© {new Date().getFullYear()} Audrey Ng. All rights reserved.</div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/audreynge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/audrey-e-ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:audreynge@gmail.com" className="text-gray-300 hover:text-primary transition-colors">
              <Mail size={20} />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </footer>

      <BackgroundAudio src="/audio/start_the_neighbourhood.mp3" />
    </div>
  )
}
