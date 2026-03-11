"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import Galaxy from "@/components/galaxy"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      <Galaxy
        mouseRepulsion={false}
        mouseInteraction={false}
        density={1.2}
        glowIntensity={0.35}
        saturation={0}
        hueShift={140}
        twinkleIntensity={0.4}
        rotationSpeed={0.05}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={0.8}
        transparent={false}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
          Welcome to SPIE at NIT Goa
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">
          A dynamic student organization passionate about optics, photonics, and making a difference in the world of science and technology.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="h-12 rounded-full px-8 text-base">
            <Link href="/about">
              Learn More
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-full border-white/30 bg-white/10 px-8 text-base text-white hover:bg-white/20 hover:text-white"
          >
            <Link href="/events">View Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const stats =[
  { value: "10+", label: "Years Active" },
  { value: "42+", label: "Events Organized" },
  { value: "35+", label: "Active Members" },
]

export function StatsSection() {
  return (
    <section className="border-y border-border bg-muted/30 py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Our Impact</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-2xl bg-card p-8 shadow-sm"
            >
              <span className="text-4xl font-bold text-primary sm:text-5xl">{stat.value}</span>
              <span className="mt-2 text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EventsPreview() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (response.ok) {
          const data = await response.json()
          setEvents(data.slice(0, 3))
        }
      } catch (error) {
        console.error('Failed to fetch events:', error)
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  },[])

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Upcoming Events</h2>
            <p className="mt-2 text-muted-foreground">
              Join us at our latest workshops, lectures, and activities
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/events">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-muted-foreground">No upcoming events at this time.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg"
              >
                {/* Image Section - This renders the cover picture if provided */}
                {event.image_url && (
                  <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                    <img 
                      src={event.image_url} 
                      alt={event.title} 
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {event.type || 'Event'}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold tracking-tight group-hover:text-primary">
                    {event.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {event.description || 'Join us for this exciting event'}
                  </p>
                  <div className="space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}