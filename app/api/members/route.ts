import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, year } = body

    // Validate input
    if (!name || !email || !year) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (year < 1 || year > 4) {
      return NextResponse.json(
        { error: 'Year must be between 1 and 4' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('members')
      .insert([{ name, email, phone: phone || null, year }])
      .select()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        )
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to register member' },
      { status: 500 }
    )
  }
}
