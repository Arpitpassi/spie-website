export interface Event {
  id: string
  title: string
  description: string | null
  date: string
  time: string
  location: string
  type: string | null
  created_at: string
}

export interface PastEvent {
  id: string
  title: string
  description: string | null
  date: string
  image_url: string | null
  pdf_url: string | null
  created_at: string
}

export interface Member {
  id: string
  name: string
  email: string
  phone: string | null
  year: number
  created_at: string
}

export interface Settings {
  key: string
  value: string
  updated_at: string
}
