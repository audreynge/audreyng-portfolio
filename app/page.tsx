import type { Metadata } from "next"
import HomeSection from "@/components/sections/home-section"

export const metadata: Metadata = {
  title: "Home",
  description: "Software engineer portfolio of Audrey Ng featuring projects, experience, and technical skills.",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return <HomeSection />
}