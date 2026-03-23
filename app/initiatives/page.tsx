import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Users, Telescope, Bot } from "lucide-react"
import img1 from "./img1.jpeg"
import img2 from "./img2.jpeg"
import img3 from "./img3.jpeg"
import Image from "next/image"

const initiatives = [
  {
    title: "Women in STEM",
    description: "An outreach workshop introducing young girls to science and technology at a formative stage. Through hands-on activities spanning optics, physics, chemistry, and robotics — diffraction glasses, coloured shadows, magnetic fields, IR sensors, slime making, and a line-following robot — students explored STEM in an engaging, approachable way, guided by SPIE members throughout.",
    icon: Users,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    image: img1,
    features: [
      "Interactive experiments in optics and physics",
      "Chemistry and robotics demonstrations",
      "Encouraging curiosity and confidence in STEM",
      "Fostering inclusivity in scientific exploration",
    ],
  },
  {
    title: "Robotics Workshop",
    description: "A hands-on session focused on how Arduino works and communicates, giving students a solid conceptual foundation before moving to practical work. Students collaborated in groups to build four mini-projects, culminating in a fully functional object-avoidance robot — each team assembling and demonstrating their prototypes from scratch.",
    icon: Bot,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    image: img2,
    features: [
      "Conceptual introduction to Arduino and microcontrollers",
      "Group-based hands-on project building",
      "Progressive mini-projects leading to a final robot",
      "Student-assembled and demonstrated prototypes",
    ],
  },
  {
    title: "Astronomy Wing",
    description: "An observational session that demonstrated the dynamic, ever-changing nature of planetary motion. Participants engaged in discussions on telescopes, space exploration, and planetary science, with conversations extending to the possibility of extraterrestrial life. The session blended live observation with scientific dialogue, fostering curiosity and interest in space science.",
    icon: Telescope,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    image: img3,
    features: [
      "Live sky observation sessions",
      "Discussions on telescopes and space exploration",
      "Planetary science and motion demonstrations",
      "Conversations on astrobiology and extraterrestrial life",
    ],
  },
]

export default function InitiativesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="border-b border-border bg-muted/30 py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Initiatives</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Discover the various programs and initiatives we run to make a difference in optics, photonics, and beyond.
            </p>
          </div>
        </section>

        {/* Initiatives List */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="space-y-16">
              {initiatives.map((initiative, index) => {
                const Icon = initiative.icon
                const isReversed = index % 2 === 1
                return (
                  <div
                    key={initiative.title}
                    className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${isReversed ? "lg:flex-row-reverse" : ""}`}
                  >
                    <div className="flex-1">
                      <div className={`mb-4 inline-flex rounded-xl p-3 ${initiative.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        {initiative.title}
                      </h2>
                      <p className="mt-4 leading-relaxed text-muted-foreground">
                        {initiative.description}
                      </p>
                      <ul className="mt-6 space-y-3">
                        {initiative.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                        <Image
                          src={initiative.image}
                          alt={initiative.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}