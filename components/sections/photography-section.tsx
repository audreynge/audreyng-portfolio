"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CalendarDays, MapPin } from "lucide-react"

type PhotoItem = {
  src: string
  location: string
  date: string
}

const photos: PhotoItem[] = [
  {
    src: "/images/photography/DSC_9272.jpg",
    location: "Seattle, Washington",
    date: "Jan. 2026",
  },
  {
    src: "/images/photography/DSC_9259.jpg",
    location: "Seattle, Washington",
    date: "Jan. 2026",
  },
  {
    src: "/images/photography/IMG_4141.jpg",
    location: "Seattle, Washington",
    date: "Jan. 2026",
  },
  {
    src: "/images/photography/IMG_4143.jpg",
    location: "Seattle, Washington",
    date: "Jan. 2026",
  },
  {
    src: "/images/photography/keshi-concert.jpg",
    location: "Boston, Massachusetts",
    date: "Jul. 2025",
  },
  {
    src: "/images/photography/IMG_1769.jpg",
    location: "Boston, Massachusetts",
    date: "May 2025",
  }
]

export default function PhotographySection() {

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="min-h-[calc(100vh-10rem)]"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Photography</h2>
          <p className="mt-3 text-gray-300">
            I&apos;ve been taking photos on and off since 2018. I started by photographing Rubik&apos;s cubes (you can find on
            @cubeogram on Instagram), and now I mostly shoot street photography with a Nikon D7100 / iPhone 16 Pro. I&apos;m still continuing to grow my skills, planning
            to upgrade to a Fujifilm X-T5 eventually. I aim to turn photography into a side hustle one day 📷
          </p>
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {photos.map((photo) => {
            return (
              <article key={photo.src} className="group mb-6 break-inside-avoid">
                <button
                  type="button"
                  className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-2xl"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
                    <Image
                      src={photo.src}
                      alt={photo.location}
                      width={1600}
                      height={1000}
                      className="h-auto w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100" />
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 text-white opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
                      <div className="mt-2 space-y-1 text-sm text-gray-100">
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {photo.location}
                        </p>
                        <p className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          {photo.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
