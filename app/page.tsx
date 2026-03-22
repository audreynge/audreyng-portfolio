"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Menu, X } from "lucide-react"
import AboutSection from "@/components/sections/about-section"
import BackgroundAudio from "@/components/background-audio"
import ContactSection from "@/components/sections/contact-section"
import HomeSection from "@/components/sections/home-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section"

const sections = ["home", "about", "projects", "skills", "contact"] as const
type Section = (typeof sections)[number]

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSectionChange = (section: Section) => {
    setActiveSection(section)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCubeClick = (face: string) => {
    const sectionMap: Record<string, Section> = {
      front: "about",
      back: "contact",
      left: "home",
      right: "projects",
      top: "skills",
      bottom: "home",
    }
    const section = sectionMap[face]
    if (section) handleSectionChange(section)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white bg-clip-text">Audrey Ng</div>
          <nav className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleSectionChange(section)}
                className={`capitalize text-sm font-medium transition-colors ${
                  activeSection === section
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
              >
                {section}
              </button>
            ))}
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
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => handleSectionChange(section)}
                  className={`capitalize text-sm font-medium transition-colors ${
                    activeSection === section
                      ? "text-primary"
                      : "text-gray-300 hover:text-primary"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16">
        {activeSection === "home" && (
          <HomeSection onNavigateAction={handleSectionChange} onCubeClickAction={handleCubeClick} />
        )}
        {activeSection === "about" && <AboutSection />}
        {activeSection === "projects" && <ProjectsSection />}
        {activeSection === "skills" && <SkillsSection />}
        {activeSection === "contact" && <ContactSection />}
      </main>

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
            <a
              href="mailto:audreynge@gmail.com"
              className="text-gray-300 hover:text-primary transition-colors"
            >
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