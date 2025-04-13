import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

type ProjectCardProps = {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  demoUrl: string
  repoUrl: string
}

export default function ProjectCard({ title, description, tags, imageUrl, demoUrl, repoUrl }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline" size="sm" asChild>
          <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <Github className="h-4 w-4" />
            <span>Code</span>
          </a>
        </Button>
        <Button size="sm" asChild>
          <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            <span>Demo</span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
