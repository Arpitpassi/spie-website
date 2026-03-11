"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, ExternalLink } from "lucide-react"

export default function EventsPage() {
  const[pastEvents, setPastEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const response = await fetch('/api/past-events')
        if (response.ok) {
          const data = await response.json()
          setPastEvents(data)
        }
      } catch (error) {
        console.error('Failed to fetch past events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPastEvents()
  },[])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="border-b border-border bg-muted/30 py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Past Events</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Explore our past events and relive the moments of learning, collaboration, and innovation.
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            {loading ? (
              <div className="text-center text-muted-foreground">Loading events...</div>
            ) : pastEvents.length === 0 ? (
              <div className="text-center text-muted-foreground">No past events found.</div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => {
                  
                  // The Card UI
                  const CardContent = (
                    <article className="group h-full flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg cursor-pointer">
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        {event.image_url ? (
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                            No Image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                          <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(event.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground flex-1">
                          {event.description}
                        </p>
                        <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:text-primary/80">
                          {event.pdf_url ? "View PDF Document" : "Learn More"}
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </div>
                      </div>
                    </article>
                  );

                  return (
                    <Dialog key={event.id}>
                      <DialogTrigger asChild>
                        <div className="h-full">{CardContent}</div>
                      </DialogTrigger>
                      
                      {/* Dynamic Dialog Size: PDF = Large, Image = Standard */}
                      <DialogContent className={event.pdf_url ? "max-w-5xl h-[85vh] flex flex-col bg-card border-border p-4 sm:p-6" : "max-w-2xl bg-card border-border"}>
                        <DialogHeader>
                          <DialogTitle className="text-xl pr-6">{event.title}</DialogTitle>
                        </DialogHeader>
                        
                        {event.pdf_url ? (
                          // PDF View Layout
                          <div className="flex-1 mt-4 overflow-hidden rounded-lg border border-border">
                            <iframe 
                              src={event.pdf_url} 
                              className="w-full h-full bg-white" 
                              title={event.title} 
                            />
                          </div>
                        ) : (
                          // Standard Image/Text Layout
                          <div className="mt-4">
                            {event.image_url && (
                              <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted">
                                <img
                                  src={event.image_url}
                                  alt={event.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground font-medium">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(event.date).toLocaleDateString('en-US', { dateStyle: 'full' })}</span>
                            </div>
                            <p className="mt-4 leading-relaxed text-foreground whitespace-pre-wrap">
                              {event.description}
                            </p>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}