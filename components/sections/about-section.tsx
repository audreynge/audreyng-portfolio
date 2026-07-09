"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Briefcase, GraduationCap, type LucideIcon } from "lucide-react"

type ExperienceItem = {
  role: string
  organization: string
  team?: string
  period: string
  description?: string
  icon: LucideIcon
  companyLogo?: {
    src: string
    alt: string
  }
}

const experienceItems: ExperienceItem[] = [
  {
    role: "Bachelor of Science in Computer Science",
    organization: "Northeastern University",
    period: "Sep. 2024 - May 2028",
    icon: GraduationCap,
    companyLogo: {
      src: "https://logos.hunter.io/northeastern.edu",
      alt: "Northeastern University logo",
    },
  },
  {
    role: "Software Engineer Intern",
    organization: "Zipline",
    team: "Marketplace Software",
    period: "Jun. 2026 - Sep. 2026",
    description:
      "Building a merchant portal in Go that integrates Snowflake analytics with Redis caching to surface customer and financial metrics for delivery partners, plus a partner-facing feature request pipeline.",
    icon: Briefcase,
    companyLogo: {
      src: "https://logos.hunter.io/flyzipline.com",
      alt: "Zipline logo",
    },
  },
  {
    role: "Software Engineer Intern",
    organization: "Microsoft",
    team: "Azure Resource Graph",
    period: "Apr. 2026 - Jun. 2026",
    description:
      "Built a distributed C# background worker to reconcile inconsistencies between Azure Data Lake and Cosmos DB and clean up abandoned staging data, using Cosmos DB FeedRanges, ETag-based concurrency control, and batch processing validated across 200+ unit tests.",
    icon: Briefcase,
    companyLogo: {
      src: "https://logos.hunter.io/microsoft.com",
      alt: "Microsoft logo",
    },
  },
  {
    role: "Software Engineer Intern",
    organization: "Microsoft",
    team: "Dynamics 365 Field Service",
    period: "Jan. 2026 - Apr. 2026",
    description:
      "Designed 2 end-to-end agent architectures with MCP servers, Power Automate, and Azure to automate work order operations via Copilot, building 10 agentic workflows and running 30+ LLM evaluations to validate prompt and tool behavior.",
    icon: Briefcase,
    companyLogo: {
      src: "https://logos.hunter.io/microsoft.com",
      alt: "Microsoft logo",
    },
  },
  {
    role: "Software Engineer Intern",
    organization: "Siemens",
    team: "Technology & Innovation - Central R&D",
    period: "Jun. 2025 - Dec. 2025",
    description:
      "Deployed a project management platform for 300+ employees with TypeScript, React, Next.js, and PostgreSQL, improving query performance ~30% and accelerating deployments by containerizing services on Rancher.",
    icon: Briefcase,
    companyLogo: {
      src: "https://logos.hunter.io/siemens.com",
      alt: "Siemens logo",
    },
  },
  {
    role: "Software Engineer",
    organization: "Northeastern SGA",
    team: "Digital Innovation",
    period: "Jan. 2025 - Oct. 2025",
    icon: Briefcase,
  },
  {
    role: "Software Engineer Intern",
    organization: "Wordmogul",
    period: "May 2024 - Nov. 2024",
    description:
      "Implemented AI blog content generation and scheduling features using Python and Go.",
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
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">About Me</h2>
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start max-w-6xl mx-auto w-full">
        <div className="space-y-4">
          <div className="relative w-44 h-44 md:w-56 md:h-56 mb-6 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600 opacity-20 blur-xl" />
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-gray-800 shadow-xl">
              <Image
                src="/images/goldengatephoto.jpg"
                alt="Audrey Ng at the Golden Gate Bridge"
                fill
                className="object-cover object-[center_30%]"
              />
            </div>
          </div>
          <p className="text-gray-300">
            I&apos;m a passionate software engineer from Queens, NY with 3+ years of experience building web applications and solving
            complex problems. I specialize in full-stack development and agentic AI systems.
          </p>
          <p className="text-gray-300">
            My journey in software development began during my junior year of high school when I learned web
            development myself through <a href="https://www.theodinproject.com/" target="_blank" rel="noopener noreferrer" className="underline">The Odin Project</a>, where I discovered my passion for bringing ideas to life through code. Since then, I&apos;ve worked on various projects, ranging from personal websites to
            complex applications for hackathons, startups, and companies.
          </p>
          <p className="text-gray-300">
            I&apos;m a huge self-learner and believe that the best way to grow is by taking on new challenges, being
            consistent, and finishing what you start. Outside of coding, I enjoy speedcubing and photography / photo editing.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Education & Experience</h3>
          <ul className="space-y-5">
            {experienceItems.map((item) => (
              <li
                key={`${item.role}-${item.organization}-${item.period}`}
                className="border-l-2 border-primary pl-4"
              >
                <div className="flex items-center gap-2">
                  {item.companyLogo ? (
                    <img
                      src={item.companyLogo.src}
                      alt={item.companyLogo.alt}
                      className="h-6 w-6 shrink-0 rounded-sm"
                    />
                  ) : (
                    <item.icon className="h-5 w-5 text-primary shrink-0" />
                  )}
                  <span className="font-semibold text-base">{item.organization}</span>
                </div>
                <div className="mt-1 text-primary font-medium">{item.role}</div>
                {item.team && <div className="text-sm text-gray-300">{item.team}</div>}
                <div className="mt-1 text-xs uppercase tracking-wide text-gray-400">{item.period}</div>
                {item.description && <p className="mt-1 text-sm text-gray-400">{item.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  )
}
