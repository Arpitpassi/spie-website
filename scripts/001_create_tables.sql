-- Create events table (upcoming events)
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location TEXT NOT NULL,
    type TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create past_events table (completed events with images/PDFs)
CREATE TABLE IF NOT EXISTS past_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    image_url TEXT,
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create members table (member registration)
CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    year INTEGER NOT NULL CHECK (year >= 1 AND year <= 4),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create settings table (app configuration)
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default join page setting if not exists
INSERT INTO settings (key, value) 
VALUES ('join_page_enabled', 'true')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS on all tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE past_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read access for events (anyone can view events)
CREATE POLICY "events_public_read" ON events FOR SELECT USING (true);

-- Public read access for past_events (anyone can view past events)
CREATE POLICY "past_events_public_read" ON past_events FOR SELECT USING (true);

-- Public read access for settings (anyone can check settings like join page status)
CREATE POLICY "settings_public_read" ON settings FOR SELECT USING (true);

-- Only authenticated users (admins) can insert/update/delete events
CREATE POLICY "events_admin_insert" ON events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "events_admin_update" ON events FOR UPDATE TO authenticated USING (true);
CREATE POLICY "events_admin_delete" ON events FOR DELETE TO authenticated USING (true);

-- Only authenticated users (admins) can insert/update/delete past_events
CREATE POLICY "past_events_admin_insert" ON past_events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "past_events_admin_update" ON past_events FOR UPDATE TO authenticated USING (true);
CREATE POLICY "past_events_admin_delete" ON past_events FOR DELETE TO authenticated USING (true);

-- Only authenticated users (admins) can read members
CREATE POLICY "members_admin_read" ON members FOR SELECT TO authenticated USING (true);

-- Public can insert members (registration form)
CREATE POLICY "members_public_insert" ON members FOR INSERT WITH CHECK (true);

-- Only authenticated users can update/delete members
CREATE POLICY "members_admin_update" ON members FOR UPDATE TO authenticated USING (true);
CREATE POLICY "members_admin_delete" ON members FOR DELETE TO authenticated USING (true);

-- Only authenticated users can update settings
CREATE POLICY "settings_admin_update" ON settings FOR UPDATE TO authenticated USING (true);
