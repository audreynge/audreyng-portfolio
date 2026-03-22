"use client"

import { motion } from "framer-motion"
import {
  Bot,
  Braces,
  KanbanSquare,
  Monitor,
  Puzzle,
  Server,
  Settings2,
  Wrench,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

type SkillItem = {
  name: string
  iconUrl?: string
  fallbackIcon?: LucideIcon
}

const skills: Array<{
  category: string
  icon: LucideIcon
  items: SkillItem[]
}> = [
  {
    category: "Frontend Development",
    icon: Monitor,
    items: [
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "TypeScript", iconUrl: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "JavaScript", iconUrl: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "HTML/CSS", fallbackIcon: Braces },
      { name: "Tailwind CSS", iconUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "Next.js", iconUrl: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
    ],
  },
  {
    category: "Backend Development",
    icon: Server,
    items: [
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "Express", iconUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "PostgreSQL", iconUrl: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "Python", iconUrl: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "Java", iconUrl: "https://cdn.simpleicons.org/openjdk/FFFFFF" },
      { name: "MCP Servers", fallbackIcon: Puzzle },
      { name: "Agentic Workflows", fallbackIcon: Bot },
    ],
  },
  {
    category: "Tools & Others",
    icon: Wrench,
    items: [
      { name: "Git", iconUrl: "https://cdn.simpleicons.org/git/F05032" },
      { name: "Figma", iconUrl: "https://cdn.simpleicons.org/figma/F24E1E" },
      { name: "Agile/Scrum", fallbackIcon: KanbanSquare },
    ],
  },
]

export default function SkillsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-10rem)] flex flex-col justify-center py-8"
    >
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Technical Skills</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl shadow-lg p-6 bg-primary/10 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-700">
                <div className="p-2 rounded-lg bg-gray-800 text-primary">
                  <group.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-200">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {group.items.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-2 bg-gray-800/60 text-primary font-medium px-3 py-2 rounded-lg shadow-sm border border-gray-700"
                  >
                    {skill.iconUrl ? (
                      <img src={skill.iconUrl} alt={`${skill.name} icon`} className="h-3.5 w-3.5" />
                    ) : skill.fallbackIcon ? (
                      <skill.fallbackIcon className="h-3.5 w-3.5 opacity-90" />
                    ) : (
                      <Settings2 className="h-3.5 w-3.5 opacity-90" />
                    )}
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
