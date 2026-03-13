import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Users, Telescope, Lightbulb, Heart } from "lucide-react"

const initiatives =[
  {
    title: "Women in SPIE",
    description: "Empowering women in optics and photonics through mentorship, networking, and professional development opportunities. We organize workshops, panel discussions, and events to support and celebrate women in STEM.",
    icon: Users,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    features:[
      "Mentorship programs for female students",
      "Career guidance and networking events",
      "Workshops on leadership and professional skills",
      "Celebration of women's achievements in optics",
    ],
  },
  {
    title: "Astronomy Wing",
    description: "Exploring the cosmos through telescope observations, astrophotography, and educational outreach. Our astronomy wing brings the wonders of the universe closer to students and the community.",
    icon: Telescope,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    features:[
      "Night sky observation sessions",
      "Astrophotography workshops",
      "Planetarium visits and field trips",
      "Educational talks on celestial phenomena",
    ],
  },
  {
    title: "Outreach Programs",
    description: "Bringing optics and photonics education to schools and communities. We conduct interactive demonstrations and hands-on experiments to inspire the next generation of scientists.",
    icon: Lightbulb,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    features:[
      "School visits and science demos",
      "Science fair participation",
      "Community awareness programs",
      "STEM education workshops",
    ],
  },
  {
    title: "Social Impact",
    description: "Using our technical expertise to create positive social impact. From assistive technologies to environmental monitoring, we apply optics for the greater good.",
    icon: Heart,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    features:[
      "Assistive technology projects",
      "Environmental monitoring initiatives",
      "Healthcare applications",
      "Sustainable technology research",
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
                      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                        <img
                          src={`https://images.unsplash.com/photo-${
                            index === 0 ? "1573164713714-d95e436ab8d6"
                            : index === 1 ? "1419242902214-272b3f66ee7a"
                            : index === 2 ? "1427504494785-3a9ca7044f45"
                            : "1559027615-cd4628902d4a"
                          }?w=800&q=80`}
                          alt={initiative.title}
                          className="h-full w-full object-cover"
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