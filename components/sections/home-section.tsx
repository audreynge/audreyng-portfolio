"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const CubeScene = dynamic(() => import("@/components/cube-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  ),
})

type HomeSectionProps = {
  onNavigateAction: (section: "home" | "about" | "projects" | "skills" | "contact") => void
  onCubeClickAction: (face: string) => void
}

export default function HomeSection({ onNavigateAction, onCubeClickAction }: HomeSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-6xl mx-auto">
        <div className="order-2 md:order-1 flex flex-col items-center md:items-start">
          <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600 opacity-20 blur-xl"></div>
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-gray-800 shadow-xl">
              <Image
                src="/AudreyNg-Headshot.jpg?height=256&width=256"
                alt="Audrey Ng Headshot"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left">
            Hi, I&apos;m <span className="text-primary">Audrey</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6 text-center md:text-left">
            Software Engineer
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg text-center md:text-left">
            I build modern, interactive web applications with a focus on clean code, performance, and user experience.
            Explore my portfolio by interacting with the Rubik&apos;s cube!
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button onClick={() => onNavigateAction("projects")}>View Projects</Button>
            <Button variant="outline" onClick={() => onNavigateAction("contact")}>
              Contact Me
            </Button>
          </div>
        </div>
        <div className="order-1 md:order-2 w-full h-[300px] md:h-[400px] bg-gray-800 rounded-lg relative">
          <CubeScene onFaceClickAction={onCubeClickAction} />
          <div className="absolute bottom-4 left-0 right-0 text-center text-sm font-medium bg-gray-800/70 text-gray-100 py-2 rounded-md mx-4">
            Click on different faces of the cube to navigate
          </div>
        </div>
      </div>
    </motion.section>
  )
}
