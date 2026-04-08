import type { Metadata } from "next"
import PhotographySection from "@/components/sections/photography-section"

export const metadata: Metadata = {
  title: "Photography",
  description: "A small gallery of Audrey Ng's photography with location and date metadata for each shot.",
  alternates: {
    canonical: "/photography",
  },
}

export default function PhotographyPage() {
  return <PhotographySection />
}
