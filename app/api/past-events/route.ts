import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from('past_events')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
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
    const { title, description, date, image_url, pdf_url } = body
    
    // Inserts into past_events
    const { data, error } = await supabase
      .from('past_events')
      .insert([{ title, description, date, image_url, pdf_url }])
      .select()

    if (error) throw error
    return NextResponse.json(data[0], { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing Event ID' }, { status: 400 })

    // Look inside past_events
    const { data: pastEvents } = await supabase.from('past_events').select('image_url, pdf_url').eq('id', id)
    const event = pastEvents?.[0]

    // Delete from past_events DB
    const { error } = await supabase.from('past_events').delete().eq('id', id)
    if (error) throw error

    // Silently attempt to delete Image from storage
    if (event?.image_url && event.image_url.includes('/storage/v1/object/public/')) {
      try {
        const parts = event.image_url.split('/storage/v1/object/public/')[1].split('/')
        const bucket = parts[0]
        const filePath = parts.slice(1).join('/')
        await supabase.storage.from(bucket).remove([filePath])
      } catch (err) {}
    }

    // Silently attempt to delete PDF from storage
    if (event?.pdf_url && event.pdf_url.includes('/storage/v1/object/public/')) {
      try {
        const parts = event.pdf_url.split('/storage/v1/object/public/')[1].split('/')
        const bucket = parts[0]
        const filePath = parts.slice(1).join('/')
        await supabase.storage.from(bucket).remove([filePath])
      } catch (err) {}
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}