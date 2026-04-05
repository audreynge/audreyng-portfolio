import type { Metadata } from "next"
import SkillsSection from "@/components/sections/skills-section"

export const metadata: Metadata = {
  title: "Technical Skills | Audrey Ng",
  description: "Browse Audrey Ng's technical skills, tools, and areas of focus in software engineering.",
  alternates: {
    canonical: "/skills",
  },
}

export default function SkillsPage() {
  return <SkillsSection />
}
