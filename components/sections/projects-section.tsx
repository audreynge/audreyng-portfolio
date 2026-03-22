"use client"

import { motion } from "framer-motion"
import ProjectCard from "@/components/project-card"

const projects = [
  {
    title: "Lumen",
    description:
      "Platform that finds the safest and quickest path through neighborhoods, making it easier for tourists, travelers, and students.",
    tags: ["Express.js", "Flask", "Leaflet", "Next.js", "OSMnx", "React.js", "Tailwind CSS", "Tesseract"],
    imageUrl: "https://i.ytimg.com/an_webp/lcP4n6n1Ke8/mqdefault_6s.webp?du=3000&sqp=CJLJ_s0G&rs=AOn4CLAt8BSPRPs4jNSsd6OhWy1zQ0r9pw",
    demoUrl: "https://www.youtube.com/watch?v=lcP4n6n1Ke8&ab_channel=AudreyN",
    repoUrl: "https://github.com/audreynge/Lumen",
  },
  {
    title: "Inquisiv.",
    description:
      "Streamlines the dropshipping process by identifying top-trending products and creating customized ad content with NLP-based sentiment analysis and generative AI models.",
    tags: ["Bootstrap", "Flask", "React.js", "NLTK", "PyTorch", "Sckit-learn", "Tailwind CSS", "TanStack Query"],
    imageUrl: "https://i.ytimg.com/vi/0Oie1cL4HYI/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYACnAWKAgwIABABGCYgZSg4MA8=&rs=AOn4CLAzbb2_mQulP6bwihdcGmzAEKt1ng",
    demoUrl: "https://devpost.com/software/inquisiv",
    repoUrl: "https://github.com/Sadfahlsdj/Finhacks_2025.git",
  },
  {
    title: "TrackNTrip",
    description:
      "Combines eco-conscious travel, budget optimization, and immersive discovery into an AI-driven web app by helping travelers make cost-effective and sustainable choices and transform their journey into an engaging and educational adventure.",
    tags: ["Leaflet", "OSMnx", "React.js", "Tailwind CSS", "TanStack Query", "XGBoost"],
    imageUrl: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/260/209/datas/medium.png",
    demoUrl: "https://devpost.com/software/trackntrip",
    repoUrl: "https://github.com/Sadfahlsdj/Hack_Beanpot_2025",
  },
  {
    title: "EduVenture",
    description: "Aims to elevate FGLI students' college admissions journey with gamified milestones and integrated admissions chancing.",
    tags: ["Figma", "HTML", "JavaScript", "Tailwind CSS"],
    imageUrl:
      "https://d112y698adiu2z.cloudfront.net/photos/production/software_thumbnail_photos/002/566/393/datas/medium.png",
    demoUrl: "https://devpost.com/software/eduventure",
    repoUrl: "https://github.com/mustafa-nom/Empower-Hacks",
  },
]

export default function ProjectsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-10rem)] flex flex-col justify-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">My Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            tags={project.tags}
            imageUrl={project.imageUrl}
            demoUrl={project.demoUrl}
            repoUrl={project.repoUrl}
          />
        ))}
      </div>
    </motion.section>
  )
}
