import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Linkedin, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Dr. Raghavendra",
    role: "Faculty Advisor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Arjun Sharma",
    role: "President",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Priya Patel",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Rahul Menon",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    name: "Sneha Nair",
    role: "Events Coordinator",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    name: "Vikram Singh",
    role: "Outreach Head",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="border-b border-border bg-muted/30 py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Us</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The SPIE Student Chapter at NIT Goa is dedicated to promoting optics and photonics education, research, and community building.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  To foster interest in optics, photonics, and related fields among students through workshops, seminars, and hands-on experiences. We aim to bridge the gap between academic learning and industry applications.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Our Vision</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  To become a leading student chapter that inspires the next generation of scientists and engineers, contributing to advancements in optical sciences and photonics technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">What We Do</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Workshops", description: "Hands-on technical workshops on optics and photonics" },
                { title: "Lectures", description: "Guest lectures by industry experts and researchers" },
                { title: "Outreach", description: "Community programs to promote STEM education" },
                { title: "Research", description: "Supporting student research initiatives" },
              ].map((item, index) => (
                <div key={index} className="rounded-2xl bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Our Team</h2>
              <p className="mt-4 text-muted-foreground">
                Meet the passionate individuals behind SPIE@NITG
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                    <div className="mt-4 flex gap-3">
                      <a href="#" className="text-muted-foreground transition-colors hover:text-primary" aria-label={`${member.name} LinkedIn`}>
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-muted-foreground transition-colors hover:text-primary" aria-label={`${member.name} Email`}>
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}