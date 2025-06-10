"use client"

import * as React from "react"
import { useState, useEffect, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Plus,
  GraduationCap,
  Code,
  Users,
  Award,
  ChevronDown,
  Menu,
  X,
  Star,
  Sparkles,
} from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  image?: string
}

interface NewProject {
  title: string
  description: string
  technologies: string
  githubUrl: string
  liveUrl: string
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Chess Game",
      description: "An interactive chess game built with React and CSS, featuring engaging UI design and game logic.",
      technologies: ["React", "CSS", "JavaScript", "Game Logic"],
      githubUrl: "https://github.com/ananyapandey9895/Chess_Game",
      liveUrl: "https://chess-game-delta-ruddy.vercel.app/",
    },
  ])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const [newProject, setNewProject] = useState<NewProject>({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
  })

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "education", "experience", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const addProject = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies.split(",").map((tech: string) => tech.trim()),
        githubUrl: newProject.githubUrl || undefined,
        liveUrl: newProject.liveUrl || undefined,
      }
      setProjects([...projects, project])
      setNewProject({ title: "", description: "", technologies: "", githubUrl: "", liveUrl: "" })
    }
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const skills = [
    "Artificial Intelligence",
    "Machine Learning",
    "React",
    "TypeScript",
    "JavaScript",
    "Python",
    "CSS",
    "HTML",
    "Git",
    "Open Source",
    "UI/UX Design",
    "Problem Solving",
  ]

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setNewProject((prev: NewProject) => ({ ...prev, [id]: value }))
  }

  // Floating particles component
  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <Star className="text-yellow-400 opacity-20" size={Math.random() * 10 + 5} />
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,179,8,0.1),transparent_50%)]" />
      </div>

      {/* Mouse follower */}
      <div
        className="fixed w-6 h-6 bg-yellow-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      />

      <FloatingParticles />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl z-40 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent animate-pulse">
              Ananya Pandey
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "education", "experience", "projects", "skills", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:scale-110 ${
                    activeSection === item
                      ? "text-yellow-400 font-semibold glow-text"
                      : "text-gray-300 hover:text-purple-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              className="md:hidden text-yellow-400 hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-purple-500/20 animate-slideDown">
              {["home", "about", "education", "experience", "projects", "skills", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 capitalize text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20 relative">
            <div className="mb-8 animate-fadeInUp">
              <div className="w-40 h-40 mx-auto bg-gradient-to-br from-yellow-400 via-purple-500 to-yellow-400 rounded-full flex items-center justify-center text-black text-5xl font-bold mb-8 animate-spin-slow shadow-2xl shadow-purple-500/50">
                <span className="animate-pulse">AP</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent mb-6 animate-slideInLeft">
                Ananya Pandey
              </h1>
              <div className="relative">
                <p className="text-2xl md:text-3xl text-purple-300 mb-8 animate-slideInRight">
                  AI/ML Student & Open Source Contributor
                </p>
                <Sparkles className="absolute -top-2 -right-4 text-yellow-400 animate-bounce" size={24} />
              </div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 animate-fadeIn animation-delay-500">
                Building innovative solutions with AI and Machine Learning at Newton School Of Technology Pune
              </p>
              <div className="flex justify-center space-x-6 mb-8 animate-fadeIn animation-delay-700">
                <Button
                  onClick={() => scrollToSection("projects")}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-400/25"
                >
                  View My Work
                </Button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="outline"
                  size="lg"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transform hover:scale-105 transition-all duration-300"
                >
                  Get In Touch
                </Button>
              </div>
              <div className="flex justify-center space-x-8 animate-fadeIn animation-delay-1000">
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-125 transform"
                >
                  <Github size={28} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-125 transform"
                >
                  <Linkedin size={28} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-125 transform"
                >
                  <Mail size={28} />
                </a>
              </div>
            </div>
            <div className="animate-bounce mt-16">
              <ChevronDown size={40} className="mx-auto text-purple-400" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent animate-slideInUp">
            About Me
          </h2>
          <div className="prose prose-lg mx-auto text-gray-300 leading-relaxed space-y-6">
            <div className="animate-slideInLeft animation-delay-200">
              <p className="text-lg leading-relaxed">
                Hi, I'm Ananya Pandey – a passionate and innovative B.Tech student specializing in Artificial Intelligence and
                Machine Learning at Newton School Of Technology Pune. With a strong drive for technology and innovation, I excel in
                building real-world solutions and continuously challenge myself to grow as a developer and problem solver.
              </p>
            </div>
            <div className="animate-slideInRight animation-delay-400">
              <p className="text-lg leading-relaxed">
                I'm an active contributor to open-source projects, most notably with AOSSIE (Australian Open Source
                Software Innovation and Education), where I improved the UI/UX of their main website and successfully
                raised a pull request that enhanced both design and functionality. Open source has taught me the value
                of writing clean, maintainable code and collaborating with diverse global teams.
              </p>
            </div>
            <div className="animate-slideInLeft animation-delay-600">
              <p className="text-lg leading-relaxed">
                In addition to open source, I love working on creative development projects. One of my favorite builds
                is a Chess Game using React and CSS, where I combined logic with UI design to create an engaging user
                experience. I regularly participate in hackathons that push my limits in real-time coding, teamwork, and
                algorithmic thinking, helping me become more confident in fast-paced development environments.
              </p>
            </div>
            <div className="animate-slideInRight animation-delay-800">
              <p className="text-lg leading-relaxed">
                I've also volunteered at the ICPC Go for Gold Camp, supporting and guiding aspiring
                programmers. This role helped me sharpen my leadership and communication skills while giving back to the
                tech community.
              </p>
            </div>
            <div className="animate-slideInUp animation-delay-1000">
              <p className="text-lg leading-relaxed">
                My key strengths include teamwork, leadership, and problem-solving, and I believe in constantly pushing
                my boundaries. Looking ahead, my long-term vision is to become a successful entrepreneur who leads with
                purpose, builds impactful technology, and inspires innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-yellow-900/10 to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent animate-slideInUp">
            Education
          </h2>
          <div className="space-y-8">
            <Card className="bg-black/50 border-purple-500/30 hover:border-yellow-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 animate-slideInLeft">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-purple-500 rounded-full">
                    <GraduationCap className="text-black" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-yellow-400 text-xl">
                      B.Tech in Artificial Intelligence and Machine Learning
                    </CardTitle>
                    <CardDescription className="text-purple-300">
                      NST, Pune • Currently Pursuing
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Specializing in AI/ML with focus on real-world applications and innovative solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-purple-500/30 hover:border-yellow-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 animate-slideInRight animation-delay-200">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-yellow-400 rounded-full">
                    <GraduationCap className="text-black" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-purple-400 text-xl">12th Grade</CardTitle>
                    <CardDescription className="text-yellow-300">Bharat Ram Global School • CGPA: 7.4</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Completed higher secondary education with strong foundation in science and mathematics.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-purple-500/30 hover:border-yellow-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 animate-slideInLeft animation-delay-400">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-purple-500 rounded-full">
                    <GraduationCap className="text-black" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-yellow-400 text-xl">10th Grade</CardTitle>
                    <CardDescription className="text-purple-300">Bharat Ram Global School • CGPA: 9.1</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Achieved excellent academic performance with strong fundamentals in core subjects.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-yellow-900/10" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent animate-slideInUp">
            Experience
          </h2>
          <div className="space-y-8">
            <Card className="bg-black/50 border-yellow-500/30 hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 animate-slideInRight">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-purple-500 rounded-full animate-pulse">
                    <Code className="text-black" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-yellow-400 text-xl">Open Source Contributor</CardTitle>
                    <CardDescription className="text-purple-300">
                      AOSSIE (Australian Open Source Software Innovation and Education)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Improved the UI/UX of AOSSIE's main website and successfully raised a pull request that enhanced both
                  design and functionality. Gained valuable experience in collaborative development and writing clean,
                  maintainable code.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">UI/UX Design</Badge>
                  <Badge className="bg-purple-400/20 text-purple-400 border-purple-400/30">Frontend Development</Badge>
                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">Open Source</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-purple-500/30 hover:border-yellow-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 animate-slideInLeft animation-delay-200">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-yellow-400 rounded-full animate-pulse">
                    <Users className="text-black" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-purple-400 text-xl">Volunteer</CardTitle>
                    <CardDescription className="text-yellow-300">ICPC Go for Gold Camp</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Volunteered as a mentor supporting and guiding aspiring programmers. Developed leadership and
                  communication skills while contributing to the tech community.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-400/20 text-purple-400 border-purple-400/30">Mentoring</Badge>
                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">Leadership</Badge>
                  <Badge className="bg-purple-400/20 text-purple-400 border-purple-400/30">Programming</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-yellow-500/30 hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 animate-slideInRight animation-delay-400">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-purple-500 rounded-full animate-pulse">
                    <Award className="text-black" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-yellow-400 text-xl">Hackathon Participant</CardTitle>
                    <CardDescription className="text-purple-300">Various Hackathons</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Regular participant in hackathons, pushing limits in real-time coding, teamwork, and algorithmic
                  thinking. Gained confidence in fast-paced development environments.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-400/20 text-purple-400 border-purple-400/30">Problem Solving</Badge>
                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">Teamwork</Badge>
                  <Badge className="bg-purple-400/20 text-purple-400 border-purple-400/30">Rapid Development</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-purple-900/10 to-yellow-900/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent animate-slideInLeft">
              Projects
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-yellow-400 to-purple-500 text-black hover:from-yellow-500 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-400/25 animate-slideInRight">
                  <Plus size={20} className="mr-2" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black border-purple-500/30">
                <DialogHeader>
                  <DialogTitle className="text-yellow-400">Add New Project</DialogTitle>
                  <DialogDescription className="text-gray-300">Add a new project to your portfolio</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-purple-400">
                      Project Title
                    </Label>
                    <Input
                      id="title"
                      value={newProject.title}
                      onChange={handleInputChange}
                      placeholder="Enter project title"
                      className="bg-black/50 border-purple-500/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-purple-400">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newProject.description}
                      onChange={handleInputChange}
                      placeholder="Describe your project"
                      className="bg-black/50 border-purple-500/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="technologies" className="text-purple-400">
                      Technologies (comma-separated)
                    </Label>
                    <Input
                      id="technologies"
                      value={newProject.technologies}
                      onChange={handleInputChange}
                      placeholder="React, TypeScript, Node.js"
                      className="bg-black/50 border-purple-500/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="githubUrl" className="text-purple-400">
                      GitHub URL (optional)
                    </Label>
                    <Input
                      id="githubUrl"
                      value={newProject.githubUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username/repo"
                      className="bg-black/50 border-purple-500/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="liveUrl" className="text-purple-400">
                      Live URL (optional)
                    </Label>
                    <Input
                      id="liveUrl"
                      value={newProject.liveUrl}
                      onChange={handleInputChange}
                      placeholder="https://project-demo.com"
                      className="bg-black/50 border-purple-500/30 text-white"
                    />
                  </div>
                  <Button
                    onClick={addProject}
                    className="w-full bg-gradient-to-r from-yellow-400 to-purple-500 text-black"
                  >
                    Add Project
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="bg-black/50 border-purple-500/30 hover:border-yellow-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:rotate-1 animate-slideInUp"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-yellow-400">
                    {project.title}
                    <div className="flex space-x-2">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github
                            size={20}
                            className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-125"
                          />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink
                            size={20}
                            className="text-gray-400 hover:text-purple-400 transition-colors transform hover:scale-125"
                          />
                        </a>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        className={`${
                          techIndex % 2 === 0
                            ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                            : "bg-purple-400/20 text-purple-400 border-purple-400/30"
                        } hover:scale-110 transition-transform`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card
              key="shelfswap"
              className="bg-black/50 border-purple-500/30 hover:border-yellow-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:rotate-1 animate-slideInUp"
              style={{ animationDelay: '800ms' }}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-yellow-400">
                  ShelfSwap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  I made an e-commerce website to buy and sell books easily, encouraging more people to learn and read.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">HTML</Badge>
                  <Badge className="bg-purple-400/20 text-purple-400 border-purple-400/30">CSS</Badge>
                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">JavaScript</Badge>
                </div>
              </CardContent>
            </Card>
            <Card
              key="todo-list-planner"
              className="bg-black/50 border-purple-500/30 hover:border-yellow-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:rotate-1 animate-slideInUp"
              style={{ animationDelay: '1000ms' }}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-yellow-400">
                  To Do List Planner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  I made a To Do List Planner using HTML, CSS, and JS, targeting to create such tough-sounding trackers with just basic coding languages.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">HTML</Badge>
                  <Badge className="bg-purple-400/20 text-purple-400 border-purple-400/30">CSS</Badge>
                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">JavaScript</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/10 to-purple-900/10" />
        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent animate-slideInUp">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black/80 to-purple-900/20 p-6 rounded-xl text-center hover:shadow-2xl hover:shadow-yellow-400/25 transition-all duration-500 transform hover:scale-110 hover:-rotate-2 border border-purple-500/20 hover:border-yellow-400/50 animate-slideInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-medium text-gray-200 hover:text-yellow-400 transition-colors">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-yellow-900/20" />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent animate-slideInUp">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 mb-8 animate-fadeIn animation-delay-200">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!
          </p>
          <div className="flex justify-center space-x-8 mb-8">
            <a
              href="mailto:ananyapandey.brgs@gmail.com"
              className="flex items-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-400/25 animate-slideInLeft"
            >
              <Mail size={24} />
              <span className="font-semibold">Email Me</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ananya-pandey-97b705259/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 animate-slideInUp animation-delay-200"
            >
              <Linkedin size={24} />
              <span className="font-semibold">LinkedIn</span>
            </a>
            <a
              href="https://github.com/ananyapandey9895"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-gray-800 to-black text-white px-8 py-4 rounded-xl hover:from-gray-700 hover:to-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gray-800/25 animate-slideInRight animation-delay-400"
            >
              <Github size={24} />
              <span className="font-semibold">GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-black via-purple-900/20 to-black py-8 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">Made by Ananya Pandey. Built with passion and a touch of magic ✨</p>
        </div>
      </footer>
    </div>
  )
}
