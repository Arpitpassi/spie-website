import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { AdminClient } from "./admin-client"

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect("/auth/login")
  }

  // Fetch all required data
  const [membersRes, eventsRes, pastEventsRes] = await Promise.all([
    supabase.from("members").select("*").order("created_at", { ascending: false }),
    supabase.from("events").select("*"),
    supabase.from("past_events").select("*").order("date", { ascending: false })
  ])

  // AUTO-CLEANUP LOGIC: Remove expired events using IST time
  const now = new Date()
  const activeEvents: any[] = []
  const expiredIds: string[] =[]

  eventsRes.data?.forEach((ev: any) => {
    const eventDate = new Date(`${ev.date}T${ev.time}+05:30`)
    if (eventDate < now) {
      expiredIds.push(ev.id)
    } else {
      activeEvents.push(ev)
    }
  })

  // Delete expired events from database and storage bucket silently in the background
  if (expiredIds.length > 0) {
    const { data: expiredEvents } = await supabase.from("events").select("image_url").in("id", expiredIds)
    
    await supabase.from("events").delete().in("id", expiredIds)

    if (expiredEvents) {
      for (const ev of expiredEvents) {
        if (ev.image_url && ev.image_url.includes('/storage/v1/object/public/')) {
          try {
            const parts = ev.image_url.split('/storage/v1/object/public/')[1].split('/')
            const bucket = parts[0]
            const filePath = parts.slice(1).join('/')
            await supabase.storage.from(bucket).remove([filePath])
          } catch (err) {
            console.error("Auto-cleanup storage deletion failed:", err)
          }
        }
      }
    }
  }

  // Sort remaining active events
  activeEvents.sort((a, b) => 
    new Date(`${a.date}T${a.time}+05:30`).getTime() - new Date(`${b.date}T${b.time}+05:30`).getTime()
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Logged in as: {user.email}</p>
            </div>
            
            <form action={async () => {
              "use server"
              const supabase = await createClient()
              await supabase.auth.signOut()
              redirect("/auth/login")
            }} className="mt-4 md:mt-0">
              <Button variant="outline" type="submit">Sign Out</Button>
            </form>
          </div>

          <AdminClient 
            initialMembers={membersRes.data ||[]} 
            initialEvents={activeEvents} 
            initialPastEvents={pastEventsRes.data ||[]} 
          />
        </div>
      </main>
    </div>
  )
}