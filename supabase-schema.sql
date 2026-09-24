-- ==============================================================================
-- HEPSEN SİGORTA - SUPABASE VERİTABANI VE DEPOLAMA KURULUMU (SQL)
-- Bu kodu Supabase Dashboard -> SQL Editor kısmına yapıştırıp "Run" butonuna basınız.
-- ==============================================================================

-- 1. TEKLİF TALEPLERİ TABLOSU (LEADS)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    service TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    city TEXT,
    preferred_contact TEXT DEFAULT 'WhatsApp',
    message TEXT,
    status TEXT DEFAULT 'Yeni',
    admin_note TEXT
);

-- Leads Indexleri
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads (status);

-- Leads RLS (Güvenlik İlkeleri)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Herkes teklif formu gönderebilir (Insert)
DROP POLICY IF EXISTS "Allow public insert on leads" ON public.leads;
CREATE POLICY "Allow public insert on leads"
ON public.leads FOR INSERT
TO public
WITH CHECK (true);

-- Tüm okuma ve güncelleme işlemleri (Admin ve Service Role için serbest)
DROP POLICY IF EXISTS "Allow all on leads" ON public.leads;
CREATE POLICY "Allow all on leads"
ON public.leads FOR ALL
TO public
USING (true)
WITH CHECK (true);


-- 2. BLOG VE REHBERLER TABLOSU (BLOGS)
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'Bireysel Emeklilik',
    cover_image TEXT,
    published BOOLEAN DEFAULT true,
    author_name TEXT DEFAULT 'Merve DOĞAN',
    read_time TEXT DEFAULT '4 dk'
);

-- Blogs Indexleri
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON public.blogs (slug);
CREATE INDEX IF NOT EXISTS blogs_published_idx ON public.blogs (published);
CREATE INDEX IF NOT EXISTS blogs_created_at_idx ON public.blogs (created_at DESC);

-- Blogs RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Ziyaretçiler yayındaki blogları görebilir, adminler hepsini görebilir ve yönetebilir
DROP POLICY IF EXISTS "Allow public read on blogs" ON public.blogs;
CREATE POLICY "Allow public read on blogs"
ON public.blogs FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Allow all on blogs" ON public.blogs;
CREATE POLICY "Allow all on blogs"
ON public.blogs FOR ALL
TO public
USING (true)
WITH CHECK (true);


-- 3. DUYURULAR VE KAMPANYALAR TABLOSU (ANNOUNCEMENTS)
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    badge TEXT DEFAULT 'Duyuru',
    is_featured BOOLEAN DEFAULT false,
    link TEXT
);

-- Announcements Indexleri
CREATE INDEX IF NOT EXISTS announcements_created_at_idx ON public.announcements (created_at DESC);

-- Announcements RLS
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on announcements" ON public.announcements;
CREATE POLICY "Allow all on announcements"
ON public.announcements FOR ALL
TO public
USING (true)
WITH CHECK (true);


-- 4. GÖRSEL YÜKLEME ALANI (STORAGE BUCKET: uploads)
-- Eğer storage eklentisi aktifse 'uploads' bucket'ını oluştur ve public yap
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage RLS İlkeleri (Herkes görselleri görebilir, yükleme serbest)
DROP POLICY IF EXISTS "Public Access to uploads bucket" ON storage.objects;
CREATE POLICY "Public Access to uploads bucket"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'uploads');

DROP POLICY IF EXISTS "Allow public upload to uploads bucket" ON storage.objects;
CREATE POLICY "Allow public upload to uploads bucket"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'uploads');

DROP POLICY IF EXISTS "Allow update and delete on uploads bucket" ON storage.objects;
CREATE POLICY "Allow update and delete on uploads bucket"
ON storage.objects FOR ALL
TO public
USING (bucket_id = 'uploads')
WITH CHECK (bucket_id = 'uploads');


-- 5. ACENTE VE SİTE AYARLARI TABLOSU (SITE_SETTINGS)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'main',
    name TEXT DEFAULT 'Hepsen Sigorta',
    legal_name TEXT DEFAULT 'Hepsen Sigorta Aracılık Hizmetleri',
    slogan TEXT DEFAULT 'Seni Düşünen Sigorta',
    person_name TEXT DEFAULT 'Merve DOĞAN',
    person_title TEXT DEFAULT 'Fon Yöneticisi',
    phone TEXT DEFAULT '0545 710 14 19',
    landline TEXT DEFAULT '0850 223 98 66',
    whatsapp TEXT DEFAULT '0545 710 14 19',
    email_primary TEXT DEFAULT 'merve.dogan@hepsensigorta.com',
    email_contact TEXT DEFAULT 'info@hepsensigorta.com',
    address_full TEXT DEFAULT 'Kozyatağı Mah. Bayer Cad. Şakacı Sk. Baytur Kozyatağı Konutları E Blok D:3, Kadıköy / İstanbul',
    working_hours TEXT DEFAULT 'Pazartesi - Cuma: 09:00 - 18:30 | Cumartesi: 09:30 - 14:00',
    tobb_levha_no TEXT DEFAULT 'G1234-5678',
    vergi_dairesi TEXT DEFAULT 'Kozyatağı V.D. / 1234567890',
    mersis_no TEXT DEFAULT '0123456789000001',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Site Settings RLS İlkeleri
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on site_settings" ON public.site_settings;
CREATE POLICY "Allow public read on site_settings"
ON public.site_settings FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Allow all on site_settings" ON public.site_settings;
CREATE POLICY "Allow all on site_settings"
ON public.site_settings FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- İlk varsayılan kaydı oluştur
INSERT INTO public.site_settings (
    id, name, legal_name, slogan, person_name, person_title, phone, landline, whatsapp, email_primary, email_contact, address_full, working_hours, tobb_levha_no, vergi_dairesi, mersis_no
) VALUES (
    'main',
    'Hepsen Sigorta',
    'Hepsen Sigorta Aracılık Hizmetleri',
    'Seni Düşünen Sigorta',
    'Merve DOĞAN',
    'Fon Yöneticisi',
    '0545 710 14 19',
    '0850 223 98 66',
    '0545 710 14 19',
    'merve.dogan@hepsensigorta.com',
    'info@hepsensigorta.com',
    'Kozyatağı Mah. Bayer Cad. Şakacı Sk. Baytur Kozyatağı Konutları E Blok D:3, Kadıköy / İstanbul',
    'Pazartesi - Cuma: 09:00 - 18:30 | Cumartesi: 09:30 - 14:00',
    'G1234-5678',
    'Kozyatağı V.D. / 1234567890',
    '0123456789000001'
) ON CONFLICT (id) DO NOTHING;

