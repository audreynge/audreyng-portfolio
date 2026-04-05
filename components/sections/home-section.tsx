"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const CubeScene = dynamic(() => import("@/components/cube-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  ),
})

const ROLE_ROTATION = ["Software Engineer", "CS @ Northeastern", "Speedcuber"]

export default function HomeSection() {
  const router = useRouter()
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayedRole, setDisplayedRole] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = ROLE_ROTATION[roleIndex]
    const delay = isDeleting ? 45 : displayedRole.length === currentRole.length ? 1200 : 90

    const timer = window.setTimeout(() => {
      if (isDeleting) {
        if (displayedRole.length > 0) {
          setDisplayedRole((prev) => prev.slice(0, -1))
          return
        }

        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % ROLE_ROTATION.length)
        return
      }

      if (displayedRole.length < currentRole.length) {
        setDisplayedRole(currentRole.slice(0, displayedRole.length + 1))
        return
      }

      setIsDeleting(true)
    }, delay)

    return () => {
      window.clearTimeout(timer)
    }
  }, [displayedRole, isDeleting, roleIndex])

  const handleNavigate = (section: "home" | "about" | "projects" | "skills" | "contact") => {
    const pathMap = {
      home: "/",
      about: "/about",
      projects: "/projects",
      skills: "/skills",
      contact: "/contact",
    } as const
    router.push(pathMap[section])
  }

  const handleCubeClickAction = (face: string) => {
    const sectionMap = {
      front: "about",
      back: "contact",
      left: "home",
      right: "projects",
      top: "skills",
      bottom: "home",
    } as const
    const section = sectionMap[face as keyof typeof sectionMap]
    if (section) handleNavigate(section)
  }

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
                src="/images/AudreyNg-Headshot.jpg?height=256&width=256"
                alt="Audrey Ng Headshot"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left">
            Hi, I&apos;m <span className="text-primary">Audrey</span>
          </h1>
          <h2 className="text-xl md:text-2xl mb-6 text-center md:text-left min-h-8">
            <span className="inline-flex items-center rounded-md border border-violet-500/35 bg-violet-950/30 px-3 py-1.5 font-mono text-violet-300 shadow-[0_0_14px_rgba(167,139,250,0.18)]">
              <span>{displayedRole}</span>
              <span className="ml-0.5 inline-block h-[1.05em] w-[2px] animate-pulse rounded-full bg-violet-200/90" aria-hidden />
            </span>
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg text-center md:text-left">
            I build modern, interactive web applications with a focus on clean architecture, measurable performance, and
            clear user experience outcomes. Explore my portfolio by interacting with the Rubik&apos;s cube and visiting each section.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button onClick={() => handleNavigate("projects")}>View Projects</Button>
            <Button variant="outline" onClick={() => handleNavigate("contact")}>
              Contact Me
            </Button>
          </div>
          <div className="mt-10 max-w-2xl space-y-6 text-gray-300 text-sm md:text-base text-left">
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">What I Build</h3>
              <p>
                I enjoy shipping full-stack products from idea to deployment. That includes building responsive frontends in React and
                Next.js, designing backend APIs, and connecting data flows so features stay reliable under real usage. My recent work spans
                internal platforms, startup products, and AI-assisted user experiences, with an emphasis on maintainable code and fast iteration.
              </p>
            </section>
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">How I Work</h3>
              <p>
                I care about the details that make software usable at scale: strong typing, sensible abstractions, clear monitoring, and
                thoughtful UX decisions. I like to start with product goals, break them into technical milestones, and then deliver in small
                increments so improvements are visible quickly. I also document decisions so teams can extend systems without rebuilding core logic.
              </p>
            </section>
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">Current Focus</h3>
              <p>
                Right now, I&apos;m focused on full-stack engineering and agentic AI systems. I&apos;m especially interested in how AI can improve
                developer workflows, operational tooling, and customer support without sacrificing reliability. Outside of internships and coursework,
                I continue building side projects that help me experiment with new frameworks, testing strategies, and deployment patterns.
              </p>
            </section>
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">Explore More</h3>
              <p>
                You can learn more about my background on the <Link href="/about" className="underline hover:text-white">About</Link> page,
                review production-focused case studies on <Link href="/projects" className="underline hover:text-white">Projects</Link>, check my
                technical toolkit on <Link href="/skills" className="underline hover:text-white">Skills</Link>, or reach out directly through
                <Link href="/contact" className="underline hover:text-white"> Contact</Link>. I&apos;m always open to collaborating on meaningful products.
              </p>
            </section>
          </div>
        </div>
        <div className="order-1 md:order-2 w-full h-[300px] md:h-[400px] bg-gray-800 rounded-lg relative">
          <CubeScene onFaceClickAction={handleCubeClickAction} />
          <div className="absolute bottom-4 left-0 right-0 text-center text-sm font-medium bg-gray-800/70 text-gray-100 py-2 rounded-md mx-4">
            Click on different faces of the cube to navigate
          </div>
        </div>
      </div>
    </motion.section>
  )
}
