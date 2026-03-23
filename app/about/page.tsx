import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Linkedin } from "lucide-react"
import img1 from "./img1.jpeg"
import img2 from "./img2.jpeg"
import img3 from "./img3.jpeg"
import img4 from "./img4.jpeg"
import img5 from "./img5.jpeg"
import img6 from "./img6.jpeg"
import img7 from "./img7.jpeg"
import img8 from "./img8.jpeg"
import Image from "next/image"

const teamMembers = [
  {
    name: "Dr. Saidi Reddy Parne",
    role: "Faculty Advisor",
    image: img6,
    linkedin: "",
  },
  {
    name: "Rainer Tuscano",
    role: "President",
    image: img2,
    linkedin: "https://www.linkedin.com/in/rainer-tuscano-b513192ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Shrujal Hedaoo",
    role: "Vice President",
    image: img1,
    linkedin: "https://www.linkedin.com/in/shrujalhedaoo?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  {
    name: "Soha Sarmalker",
    role: "Secretary",
    image: img8,
    linkedin: "https://www.linkedin.com/in/soha-sarmalker?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Mayuresh Nalavade",
    role: "Treasurer",
    image: img5,
    linkedin: "",
  },
  {
    name: "Kartikey Tiwari",
    role: "Member Coordinator",
    image: img3,
    linkedin: "https://www.linkedin.com/in/kartikey-tiwari-319047342?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Parth Mundra",
    role: "Executive Head",
    image: img4,
    linkedin: "",
  },
  {
    name: "Fahad Haneef",
    role: "Logistics Head",
    image: img7,
    linkedin: "",
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
              The SPIE Student Chapter at NIT Goa is dedicated to promoting optics and photonics education, research,
              and community building.
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
                  To foster interest in optics, photonics, and related fields among students through workshops,
                  seminars, and hands-on experiences. We aim to bridge the gap between academic learning and industry
                  applications.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Our Vision</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  To become a leading student chapter that inspires the next generation of scientists and engineers,
                  contributing to advancements in optical sciences and photonics technology.
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
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
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
              <p className="mt-4 text-muted-foreground">Meet the passionate individuals behind SPIE@NITG</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                    <div className="mt-4 flex gap-3">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground transition-colors hover:text-primary"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
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