"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import { useMobile } from "@/hooks/use-mobile"
import dynamic from "next/dynamic"
import Image from "next/image"

const CubeScene = dynamic(() => import("@/components/cube-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  ),
})

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMobile()

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Sending message:", contactForm)
    alert("Message sent!")
    setContactForm({ name: "", email: "", message: "" })
  }

  const sections = ["home", "about", "projects", "skills", "contact"]

  const handleSectionChange = (section: string) => {
    console.log(`Changing section to: ${section}`)
    setActiveSection(section)
    setMobileMenuOpen(false)
  }

  const handleCubeClick = (face: string) => {
    console.log(`Cube face clicked: ${face}`)
    // map cube faces to sections
    const sectionMap = {
      front: "about",
      back: "contact",
      left: "home",
      right: "projects",
      top: "skills",
      bottom: "home",
    }
    const section = sectionMap[face as keyof typeof sectionMap]
    if (section) {
      console.log(`Navigating to section: ${section}`)
      handleSectionChange(section)
    }
  }

  const skills = [
    {
      category: "Frontend Development",
      items: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML/CSS",
        "Tailwind CSS",
        "Next.js",
      ]
    },
    {
      category: "Backend Development",
      items: [
        "Node.js",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "REST APIs",
        "Python",
        "Flask",
        "Java"
      ]
    },
    {
      category: "Tools & Others",
      items: [
        "Git",
        "Figma",
        "Agile/Scrum",
        "Pandas",
        "Scikit-learn",
        "Linux"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-black bg-clip-text">
            Audrey Ng
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleSectionChange(section)}
                className={`capitalize text-sm font-medium transition-colors ${
                  activeSection === section
                    ? "text-primary"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => handleSectionChange(section)}
                  className={`capitalize text-sm font-medium transition-colors ${
                    activeSection === section
                      ? "text-primary"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Home Section */}
        {activeSection === "home" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-6xl mx-auto">
              {/* Profile Image */}
              <div className="order-2 md:order-1 flex flex-col items-center md:items-start">
                <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600 opacity-20 blur-xl"></div>
                  <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                    <Image
                      src="/AudreyHeadshot.jpg?height=256&width=256"
                      alt="Your Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left">
                  Hi, I'm <span className="text-primary">Audrey</span>
                </h1>
                <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 text-center md:text-left">
                  Software Engineer & ML Enthusiast
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg text-center md:text-left">
                  I build modern, interactive web applications with a focus on clean code, performance, and user
                  experience. Explore my portfolio by interacting with the Rubik's cube!
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button onClick={() => handleSectionChange("projects")}>View Projects</Button>
                  <Button variant="outline" onClick={() => handleSectionChange("contact")}>
                    Contact Me
                  </Button>
                </div>
              </div>
              {/* 3D Cube */}
              <div className="order-1 md:order-2 w-full h-[300px] md:h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg relative">
                <CubeScene onFaceClick={handleCubeClick} />
                <div className="absolute bottom-4 left-0 right-0 text-center text-sm font-medium bg-white/70 dark:bg-gray-800/70 py-2 rounded-md mx-4">
                  Click on different faces of the cube to navigate
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* About Section */}
        {activeSection === "about" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[calc(100vh-10rem)] flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  I'm a passionate software engineer with 2+ years of experience building web applications and solving
                  complex problems. I specialize in front-end development with React and TypeScript, but I'm also
                  proficient in back-end technologies.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  My journey in software development began during my junior year of high school when I learned web development 
                  myself through The Odin Project, where I discovered my passion for creating intuitive and efficient user interfaces. 
                  Since then, I've worked on various projects, ranging from personal websites to complex applications for hackathons, startups, and companies.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  I'm a huge self-learner and believe that the best way to grow is by taking on new challenges, being consistent, and finishing what you start. 
                  Outside of coding, I enjoy speedcubing, photography, and taking walks!
                </p>
                <h3 className="text-xl font-semibold mb-4 mt-8">Education & Experience</h3>
                <ul className="space-y-4">
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="flex items-center space-x-2 font-medium">
                      <span className="font-semibold">BSc in Computer Science</span> - Northeastern University
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Sep 2024 - Present</div>
                  </li>
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">
                      <span className="font-semibold">Technology and Innovation Intern</span> - Siemens Digital Industries Software
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Jun - Aug 2025</div>
                  </li>
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">
                      <span className="font-semibold">Full Stack Developer Intern</span> - LSQ
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Mar 2025 - Present</div>
                  </li>
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">
                      <span className="font-semibold">Artificial Intelligence Development Intern</span> - GAWNE
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Feb - Apr 2025</div>
                  </li>
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">
                      <span className="font-semibold">Software Engineer</span> - Northeastern SGA
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Jan 2025 - Present</div>
                  </li>
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">
                      <span className="font-semibold">Software Engineer Intern</span> - Wordmogul
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">May - Nov 2024</div>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600 opacity-20 blur-xl"></div>
                  <img
                    src="/AudreyHeadshot.jpg?height=320&width=320"
                    alt="John Doe"
                    className="relative z-10 rounded-full object-cover w-full h-full border-4 border-white dark:border-gray-800"
                  />
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Projects Section */}
        {activeSection === "projects" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[calc(100vh-10rem)] flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">My Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard
                title="Lumen"
                description="Platform that finds the safest and quickest path through neighborhoods, making it easier for tourists, travelers, and students."
                tags={["Express.js", "Flask", "Leaflet", "Next.js", "OSMnx", "React.js", "Tailwind CSS", "Tesseract"]}
                imageUrl="https://media.licdn.com/dms/image/v2/D562DAQGzN4mF2Bgedw/profile-treasury-image-shrink_800_800/B56ZUXn2DmGoAY-/0/1739858079046?e=1745179200&v=beta&t=a9rpT_5iQutxxA5z914FFp5tyLbvi76LIS2swBlaRwo"
                demoUrl="https://www.youtube.com/watch?v=lcP4n6n1Ke8&ab_channel=AudreyN"
                repoUrl="https://github.com/audreynge/Lumen"
              />
              <ProjectCard
                title="Inquisiv."
                description="Streamlines the dropshipping process by identifying top-trending products and creating customized ad content with NLP-based sentiment analysis and generative AI models."
                tags={["Bootstrap", "Flask", "React.js", "NLTK", "PyTorch", "Sckit-learn", "Tailwind CSS", "TanStack Query"]}
                imageUrl="https://d112y698adiu2z.cloudfront.net/photos/production/software_thumbnail_photos/003/220/300/datas/medium.png"
                demoUrl="https://devpost.com/software/inquisiv"
                repoUrl="https://github.com/Sadfahlsdj/Finhacks_2025.git"
              />
              <ProjectCard
                title="TrackNTrip"
                description="Combines eco-conscious travel, budget optimization, and immersive discovery into an AI-driven web app by helping travelers make cost-effective and sustainable choices and transform their journey into an engaging and educational adventure."
                tags={["Leaflet", "OSMnx", "React.js", "Tailwind CSS", "TanStack Query", "XGBoost"]}
                imageUrl="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/260/209/datas/medium.png"
                demoUrl="https://devpost.com/software/trackntrip"
                repoUrl="https://github.com/Sadfahlsdj/Hack_Beanpot_2025"
              />
              <ProjectCard
                title="EduVenture"
                description="Aims to elevate FGLI students' college admissions journey with gamified milestones and integrated admissions chancing."
                tags={["Figma", "HTML", "JavaScript", "Tailwind CSS"]}
                imageUrl="https://d112y698adiu2z.cloudfront.net/photos/production/software_thumbnail_photos/002/566/393/datas/medium.png"
                demoUrl="https://devpost.com/software/eduventure"
                repoUrl="https://github.com/mustafa-nom/Empower-Hacks"
              />
            </div>
          </motion.section>
        )}

        {/* Skills Section */}
        {activeSection === "skills" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[calc(100vh-10rem)] flex flex-col justify-center py-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">My Skills</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {skills.map((group, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-xl shadow-lg p-6 bg-primary/10"
                  >
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 border-b pb-2 border-gray-200 dark:border-gray-700">
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {group.items.map((skill, j) => (
                        <span
                          key={j}
                          className="bg-white/50 dark:bg-gray-800/50 text-primary dark:text-primary font-medium px-3 py-2 rounded-lg shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Learning & Goals */}
              <div className="bg-primary/10 rounded-xl p-6 mb-12 mx-80">
                <h3 className="text-2xl font-bold mb-4 text-center">Currently Learning</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {["Machine Learning", "AWS"].map((item, i) => (
                    <span key={i} className="bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-lg shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )} 

        {/* Contact Section */}
        {activeSection === "contact" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[calc(100vh-10rem)] flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  I'm currently open to freelance opportunities and interesting projects. Feel free to reach out if
                  you'd like to collaborate or just say hello!
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:audreynge@gmail.com"
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    <Mail size={20} />
                    <span>audreynge@gmail.com</span>
                  </a>
                  <a
                    href="https://github.com/audreynge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    <Github size={20} />
                    <span>github.com/audreynge</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/audrey-e-ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    <Linkedin size={20} />
                    <span>linkedin.com/in/audrey-e-ng</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Send Me a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </motion.section>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
            © {new Date().getFullYear()} Audrey Ng. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/audreynge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/audrey-e-ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="mailto:audreynge@gmail.com"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <Mail size={20} />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}