import type { Metadata } from "next"
import HomeSection from "@/components/sections/home-section"

export const metadata: Metadata = {
  title: "Audrey Ng | Portfolio",
  description:
    "Explore Audrey Ng's portfolio featuring full-stack software engineering projects, AI experiences, and technical skills across web and product development.",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return <HomeSection />
}