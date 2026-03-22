"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

export default function ContactSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-10rem)] flex flex-col justify-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Get In Touch</h2>
      <div className="max-w-2xl mx-auto w-full">
        <div>
          <p className="text-gray-300 mb-6">
            I'm always open to new opportunities and interesting projects. Feel free to reach out! :)
          </p>
          <div className="space-y-4">
            <a
              href="mailto:audreynge@gmail.com"
              className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
            >
              <Mail size={18} />
              <span>audreynge@gmail.com</span>
            </a>
            <a
              href="https://github.com/audreynge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
            >
              <Github size={20} />
              <span>github.com/audreynge</span>
            </a>
            <a
              href="https://linkedin.com/in/audrey-e-ng"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
              <span>linkedin.com/in/audrey-e-ng</span>
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
