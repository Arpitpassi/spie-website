"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, Users, Calendar, Clock, Settings, BookOpen, Trash2 } from "lucide-react"

export function AdminClient({ initialMembers, initialEvents, initialPastEvents }: any) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("events")
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [isAddingPastEvent, setIsAddingPastEvent] = useState(false)
  
  // Local state to instantly update UI on delete
  const [localEvents, setLocalEvents] = useState(initialEvents ||[])
  const [localPastEvents, setLocalPastEvents] = useState(initialPastEvents ||[])

  // Sync state if server data changes
  useEffect(() => setLocalEvents(initialEvents || []), [initialEvents])
  useEffect(() => setLocalPastEvents(initialPastEvents || []), [initialPastEvents])

  // States for forms
  const [eventForm, setEventForm] = useState({ title: "", description: "", date: "", time: "", location: "", type: "Regular", image_url: "" })
  const[pastEventForm, setPastEventForm] = useState({ title: "", description: "", date: "", image_url: "", pdf_url: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // --- UPCOMING EVENTS LOGIC ---
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventForm),
      })
      const data = await res.json()
      if (res.ok) {
        setIsAddingEvent(false)
        setEventForm({ title: "", description: "", date: "", time: "", location: "", type: "Regular", image_url: "" })
        router.refresh() 
      } else {
        alert(`Failed to add event: ${data.error}`)
      }
    } catch (error) {
      alert("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return
    try {
      // Optimistically remove from UI, but save old state to revert if failed
      const previousEvents = [...localEvents]
      setLocalEvents((prev: any[]) => prev.filter((ev) => ev.id !== id))
      
      const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" })
      if (!res.ok) {
        setLocalEvents(previousEvents) // Revert
        alert("Failed to delete event.")
      } else {
        router.refresh()
      }
    } catch (error) {
      alert("Network error. Please try again.")
    }
  }

  // --- PAST EVENTS LOGIC ---
  const handleAddPastEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/past-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pastEventForm),
      })
      const data = await res.json()
      if (res.ok) {
        setIsAddingPastEvent(false)
        setPastEventForm({ title: "", description: "", date: "", image_url: "", pdf_url: "" })
        router.refresh()
      } else {
        alert(`Failed to add past event: ${data.error}`)
      }
    } catch (error) {
      alert("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePastEvent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this past event?")) return
    try {
      // Optimistically remove from UI, but save old state to revert if failed
      const previousEvents = [...localPastEvents]
      setLocalPastEvents((prev: any[]) => prev.filter((ev) => ev.id !== id))

      const res = await fetch(`/api/past-events?id=${id}`, { method: "DELETE" })
      if (!res.ok) {
        setLocalPastEvents(previousEvents) // Revert
        alert("Failed to delete past event.")
      } else {
        router.refresh()
      }
    } catch (error) {
      alert("Network error. Please try again.")
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar Navigation */}
      <div className="flex flex-col gap-2">
        <Button variant={activeTab === "events" ? "default" : "ghost"} className="justify-start" onClick={() => setActiveTab("events")}>
          <Calendar className="mr-2 h-4 w-4" /> Upcoming Events
        </Button>
        <Button variant={activeTab === "past" ? "default" : "ghost"} className="justify-start" onClick={() => setActiveTab("past")}>
          <BookOpen className="mr-2 h-4 w-4" /> Past Events
        </Button>
        <Button variant={activeTab === "members" ? "default" : "ghost"} className="justify-start" onClick={() => setActiveTab("members")}>
          <Users className="mr-2 h-4 w-4" /> Member Applications
        </Button>
        <Button variant={activeTab === "settings" ? "default" : "ghost"} className="justify-start" onClick={() => setActiveTab("settings")}>
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="md:col-span-3 space-y-6">
        
        {/* === UPCOMING EVENTS TAB === */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
              <Button onClick={() => setIsAddingEvent(!isAddingEvent)}>
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </div>

            {isAddingEvent && (
              <form onSubmit={handleAddEvent} className="p-6 border rounded-xl bg-card space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium">Event Title</label>
                    <input required type="text" className="w-full p-2 border rounded bg-background" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea required className="w-full p-2 border rounded bg-background" value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium">Cover Image URL (Optional)</label>
                    <input type="url" className="w-full p-2 border rounded bg-background" placeholder="https://images.unsplash.com/..." value={eventForm.image_url} onChange={e => setEventForm({...eventForm, image_url: e.target.value})} />
                  </div>
                  
                  {/* BEAUTIFUL DATE POPUP */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <div 
                      className="relative flex items-center border rounded-md bg-background focus-within:ring-2 focus-within:ring-ring cursor-pointer overflow-hidden group"
                      onClick={(e) => {
                        const input = e.currentTarget.querySelector('input');
                        if (input && 'showPicker' in input) { try { input.showPicker(); } catch (err) {} }
                      }}
                    >
                      <Calendar className="ml-3 h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                      <input required type="date" className="w-full p-2 pl-3 bg-transparent outline-none cursor-pointer appearance-none" style={{ colorScheme: 'dark' }} value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} />
                    </div>
                  </div>

                  {/* BEAUTIFUL TIME POPUP */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <div 
                      className="relative flex items-center border rounded-md bg-background focus-within:ring-2 focus-within:ring-ring cursor-pointer overflow-hidden group"
                      onClick={(e) => {
                        const input = e.currentTarget.querySelector('input');
                        if (input && 'showPicker' in input) { try { input.showPicker(); } catch (err) {} }
                      }}
                    >
                      <Clock className="ml-3 h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                      <input required type="time" className="w-full p-2 pl-3 bg-transparent outline-none cursor-pointer appearance-none" style={{ colorScheme: 'dark' }} value={eventForm.time} onChange={e => setEventForm({...eventForm, time: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <input required type="text" className="w-full p-2 border rounded bg-background" value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <select className="w-full p-2 border rounded bg-background cursor-pointer" value={eventForm.type} onChange={e => setEventForm({...eventForm, type: e.target.value})}>
                      <option>Regular</option><option>Special</option><option>Workshop</option><option>Outreach</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddingEvent(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Event"}</Button>
                </div>
              </form>
            )}

            <div className="grid gap-4">
              {localEvents?.map((ev: any) => (
                <div key={ev.id} className="p-4 border rounded-xl bg-card flex gap-4 items-start">
                  {ev.image_url && <img src={ev.image_url} className="w-24 h-24 object-cover rounded bg-muted shrink-0" alt="Cover" />}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg">{ev.title} <span className="text-xs font-normal bg-primary/10 text-primary px-2 py-1 rounded-full ml-2">{ev.type}</span></h3>
                    <p className="text-muted-foreground mt-1 text-sm">{ev.description}</p>
                    <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center"><Calendar className="mr-1 h-3 w-3"/> {ev.date}</span>
                      <span className="flex items-center"><Clock className="mr-1 h-3 w-3"/> {ev.time}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="h-8 w-8 shrink-0 self-start"
                    onClick={() => handleDeleteEvent(ev.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {(!localEvents || localEvents.length === 0) && (
                <p className="text-muted-foreground border border-dashed rounded-xl p-8 text-center bg-muted/20">No upcoming events scheduled.</p>
              )}
            </div>
          </div>
        )}

        {/* === PAST EVENTS TAB === */}
        {activeTab === "past" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Past Events</h2>
              <Button onClick={() => setIsAddingPastEvent(!isAddingPastEvent)}>
                <Plus className="mr-2 h-4 w-4" /> Add Past Event
              </Button>
            </div>

            {isAddingPastEvent && (
              <form onSubmit={handleAddPastEvent} className="p-6 border rounded-xl bg-card space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Title</label>
                  <input required type="text" className="w-full p-2 border rounded bg-background" value={pastEventForm.title} onChange={e => setPastEventForm({...pastEventForm, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea required className="w-full p-2 border rounded bg-background" value={pastEventForm.description} onChange={e => setPastEventForm({...pastEventForm, description: e.target.value})} />
                </div>

                {/* BEAUTIFUL DATE POPUP */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <div 
                    className="relative flex items-center border rounded-md bg-background focus-within:ring-2 focus-within:ring-ring cursor-pointer overflow-hidden group"
                    onClick={(e) => {
                      const input = e.currentTarget.querySelector('input');
                      if (input && 'showPicker' in input) { try { input.showPicker(); } catch (err) {} }
                    }}
                  >
                    <Calendar className="ml-3 h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                    <input required type="date" className="w-full p-2 pl-3 bg-transparent outline-none cursor-pointer appearance-none" style={{ colorScheme: 'dark' }} value={pastEventForm.date} onChange={e => setPastEventForm({...pastEventForm, date: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Image URL (Optional)</label>
                  <input type="url" className="w-full p-2 border rounded bg-background" placeholder="https://unsplash.com/..." value={pastEventForm.image_url} onChange={e => setPastEventForm({...pastEventForm, image_url: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">PDF Link URL (Optional)</label>
                  <input type="url" className="w-full p-2 border rounded bg-background" placeholder="https://example.com/report.pdf" value={pastEventForm.pdf_url} onChange={e => setPastEventForm({...pastEventForm, pdf_url: e.target.value})} />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddingPastEvent(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Past Event"}</Button>
                </div>
              </form>
            )}

            <div className="grid gap-4">
              {localPastEvents?.map((ev: any) => (
                <div key={ev.id} className="p-4 border rounded-xl bg-card flex gap-4 items-start">
                  {ev.image_url && <img src={ev.image_url} className="w-24 h-24 object-cover rounded bg-muted shrink-0" alt="Event" />}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg">{ev.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{ev.date}</p>
                    <p className="mt-2 text-sm line-clamp-2">{ev.description}</p>
                    {ev.pdf_url && (
                      <span className="text-sm text-primary mt-2 inline-block font-medium">
                        Contains PDF Attachment
                      </span>
                    )}
                  </div>

                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="h-8 w-8 shrink-0 self-start"
                    onClick={() => handleDeletePastEvent(ev.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {(!localPastEvents || localPastEvents.length === 0) && (
                <p className="text-muted-foreground border border-dashed rounded-xl p-8 text-center bg-muted/20">No past events recorded.</p>
              )}
            </div>
          </div>
        )}

        {/* === MEMBERS TAB === */}
        {activeTab === "members" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">New Applications</h2>
            <div className="border rounded-xl bg-card divide-y">
              {initialMembers?.map((member: any) => (
                <div key={member.id} className="p-4 flex justify-between items-center hover:bg-muted/10">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email} • {member.phone || 'No phone'}</p>
                  </div>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Year {member.year}</span>
                </div>
              ))}
              {(!initialMembers || initialMembers.length === 0) && (
                <p className="p-8 text-muted-foreground text-center">No applications yet.</p>
              )}
            </div>
          </div>
        )}

        {/* === SETTINGS TAB === */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Dashboard Settings</h2>
            <div className="p-6 border rounded-xl bg-card flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg">Accepting New Members</h3>
                <p className="text-sm text-muted-foreground">Toggle whether the "Join Us" page accepts submissions.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}