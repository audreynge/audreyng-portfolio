"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap, type LucideIcon } from "lucide-react"

const experienceItems: Array<{
  title: string
  organization: string
  period: string
  description?: string
  icon?: LucideIcon
  companyLogo?: {
    src: string
    alt: string
  }
}> = [
  {
    title: "Bachelor of Science in Computer Science",
    organization: "Northeastern University",
    period: "Sep. 2024 - May. 2028",
    icon: GraduationCap,
    companyLogo: {
      src: "https://logos.hunter.io/northeastern.edu",
      alt: "Northeastern University logo",
    },
  },
  {
    title: "Software Engineer Intern",
    organization: "Zipline",
    period: "Jun. 2026 - Sep. 2026",
    description: "Incoming Summer 2026 | Application Software",
    icon: Briefcase,
    companyLogo: {
      src: "https://logos.hunter.io/flyzipline.com",
      alt: "Zipline logo",
    },
  },
  {
    title: "Software Engineer Intern",
    organization: "Microsoft",
    period: "Apr. 2026 - Jun. 2026",
    description: "Azure Resource Graph",
    icon: Briefcase,
    companyLogo: {
      src: "https://logos.hunter.io/microsoft.com",
      alt: "Microsoft logo",
    },
  },
  {
    title: "Software Engineer Intern",
    organization: "Microsoft",
    period: "Jan. 2026 - Apr. 2026",
    description: "Dynamics 365 Field Service",
    icon: Briefcase,
    companyLogo: {
      src: "https://logos.hunter.io/microsoft.com",
      alt: "Microsoft logo",
    },
  },
  {
    title: "Software Engineer Intern",
    organization: "Siemens",
    period: "Jun. 2025 - Dec. 2025",
    description: "Technology & Innovation - Central R&D",
    icon: Briefcase,
    companyLogo: {
      src: "https://logos.hunter.io/siemens.com",
      alt: "Siemens logo",
    },
  },
  {
    title: "Software Engineer",
    organization: "Northeastern SGA",
    period: "Jan. 2025 - Oct. 2025",
    icon: Briefcase,
  },
  {
    title: "Software Engineer Intern",
    organization: "Wordmogul",
    period: "May 2024 - Nov. 2024",
    icon: Briefcase,
  },
]

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-10rem)] flex flex-col justify-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h2>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <p className="text-gray-300 mb-4">
            I&apos;m a passionate software engineer from Queens, NY with 3+ years of experience building web applications and solving
            complex problems. I specialize in full-stack development and agentic AI systems.
          </p>
          <p className="text-gray-300 mb-4">
            My journey in software development began during my junior year of high school when I learned web
            development myself through <a href="https://www.theodinproject.com/" target="_blank" rel="noopener noreferrer" className="underline">The Odin Project</a>, where I discovered my passion for bringing ideas to life through code. Since then, I&apos;ve worked on various projects, ranging from personal websites to
            complex applications for hackathons, startups, and companies.
          </p>
          <p className="text-gray-300 mb-4">
            I&apos;m a huge self-learner and believe that the best way to grow is by taking on new challenges, being
            consistent, and finishing what you start. Outside of coding, I enjoy speedcubing and photography / photo editing.
          </p>
          <h3 className="text-xl font-semibold mb-4 mt-8">Education & Experience</h3>
          <ul className="space-y-4">
            {experienceItems.map((item) => (
              <li key={`${item.title}-${item.organization}-${item.period}`} className="border-l-2 border-primary pl-4 py-1">
                <div className="font-medium flex items-center gap-2">
                  {item.icon && <item.icon className="h-4 w-4 text-primary shrink-0" />}
                  {item.companyLogo && (
                    <img
                      src={item.companyLogo.src}
                      alt={item.companyLogo.alt}
                      className="h-5 w-5 shrink-0 rounded-sm"
                    />
                  )}
                  <span>
                    <span className="font-semibold">{item.title}</span> - {item.organization}
                  </span>
                </div>
                <div className="text-sm text-gray-400">{item.period}</div>
                {item.description && <p className="text-sm text-gray-300 mt-1">{item.description}</p>}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="w-64 md:w-80 space-y-12">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600 opacity-20 blur-xl"></div>
              <img
                src="images/AudreyNg-Headshot.jpg?height=320&width=320"
                alt="Audrey Ng Headshot"
                className="relative z-10 rounded-full object-cover w-full h-full border-4 border-gray-800"
              />
            </div>
            <div className="hidden md:block">
              <video
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                preload="metadata"
                className="w-full rounded-lg border border-gray-700 pointer-events-none"
                aria-label="Speedcubing video"
              >
                <source src="/videos/speedcubing.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-300 mt-2 text-center">I average ~11 seconds on the 3x3 ⚡️</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
