import type { Metadata } from "next"
import ContactSection from "@/components/sections/contact-section"

export const metadata: Metadata = {
  title: "Contact Audrey Ng | Collaboration Opportunities",
  description: "Get in touch with Audrey Ng for collaboration, opportunities, and project inquiries.",
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return <ContactSection />
}
