import type { Metadata } from "next"
import ProjectsSection from "@/components/sections/projects-section"

export const metadata: Metadata = {
  title: "Software Projects | Audrey Ng Portfolio",
  description: "Explore Audrey Ng's software projects across web development, AI, and full-stack engineering.",
  alternates: {
    canonical: "/projects",
  },
}

export default function ProjectsPage() {
  return <ProjectsSection />
}
