import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase.from('events').select('*')
    if (error) throw error

    const now = new Date()
    const activeEvents: any[] = []
    const expiredIds: string[] =[]

    // Filter events and find expired ones using IST (+05:30)
    data.forEach((ev: any) => {
      const eventDate = new Date(`${ev.date}T${ev.time}+05:30`)
      if (eventDate < now) {
        expiredIds.push(ev.id)
      } else {
        activeEvents.push(ev)
      }
    })

    // Auto-delete expired events from the database
    if (expiredIds.length > 0) {
      await supabase.from('events').delete().in('id', expiredIds)
    }

    // Sort remaining events by closest date
    activeEvents.sort((a, b) => 
      new Date(`${a.date}T${a.time}+05:30`).getTime() - new Date(`${b.date}T${b.time}+05:30`).getTime()
    )

    return NextResponse.json(activeEvents)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { title, description, date, time, location, type, image_url } = body
    const { data, error } = await supabase
      .from('events')
      .insert([{ title, description, date, time, location, type, image_url }])
      .select()

    if (error) throw error
    return NextResponse.json(data[0], { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// NEW: Manual Delete Route
export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing Event ID' }, { status: 400 })

    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}