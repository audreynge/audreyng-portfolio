import type { Metadata } from "next"
import AboutSection from "@/components/sections/about-section"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Audrey Ng's background, education, and software engineering experience.",
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  return <AboutSection />
}
