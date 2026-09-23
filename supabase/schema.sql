-- Hepsen Sigorta Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Leads Table (Teklif Talepleri)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    city TEXT,
    preferred_contact TEXT DEFAULT 'phone',
    message TEXT,
    status TEXT DEFAULT 'Yeni',
    admin_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Blog Categories
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
    category_name TEXT,
    reading_time TEXT DEFAULT '4 dk',
    seo_title TEXT,
    seo_description TEXT,
    status TEXT DEFAULT 'published',
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Announcements (Duyurular & Kampanyalar)
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Site Settings (Merkezi Site Ayarları)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Admin Notes on Leads
CREATE TABLE IF NOT EXISTS public.admin_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    author TEXT DEFAULT 'Merve Doğan',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Leads: Anyone can submit a lead (INSERT), only authenticated users can view/modify
DROP POLICY IF EXISTS "Public can submit leads" ON public.leads;
CREATE POLICY "Public can submit leads" ON public.leads
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can view leads" ON public.leads;
CREATE POLICY "Authenticated can view leads" ON public.leads
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated can update leads" ON public.leads;
CREATE POLICY "Authenticated can update leads" ON public.leads
    FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated can delete leads" ON public.leads;
CREATE POLICY "Authenticated can delete leads" ON public.leads
    FOR DELETE TO authenticated USING (true);

-- Blog Posts: Anyone can view published posts, authenticated can manage all
DROP POLICY IF EXISTS "Public can view published posts" ON public.blog_posts;
CREATE POLICY "Public can view published posts" ON public.blog_posts
    FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated can manage blog" ON public.blog_posts;
CREATE POLICY "Authenticated can manage blog" ON public.blog_posts
    FOR ALL TO authenticated USING (true);

-- Announcements: Anyone can view active announcements
DROP POLICY IF EXISTS "Public can view active announcements" ON public.announcements;
CREATE POLICY "Public can view active announcements" ON public.announcements
    FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Authenticated can manage announcements" ON public.announcements;
CREATE POLICY "Authenticated can manage announcements" ON public.announcements
    FOR ALL TO authenticated USING (true);

-- Site Settings: Anyone can read, authenticated can update
DROP POLICY IF EXISTS "Public can read settings" ON public.site_settings;
CREATE POLICY "Public can read settings" ON public.site_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated can manage settings" ON public.site_settings;
CREATE POLICY "Authenticated can manage settings" ON public.site_settings
    FOR ALL TO authenticated USING (true);

-- Initial Categories
INSERT INTO public.blog_categories (name, slug, description) VALUES
    ('Bireysel Emeklilik', 'bireysel-emeklilik', 'BES ve uzun vadeli birikim rehberleri'),
    ('Hayat Sigortası', 'hayat-sigortasi', 'Aile güvencesi ve hayat sigortası rehberleri'),
    ('Sağlık Sigortası', 'saglik-sigortasi', 'Tamamlayıcı ve özel sağlık sigortası bilgileri'),
    ('Finansal Planlama', 'finansal-planlama', 'Tasarruf ve finansal hedef yönetimi'),
    ('Rehberler', 'rehberler', 'Sigortacılık ve emeklilik sektörü rehberleri')
ON CONFLICT (slug) DO NOTHING;
