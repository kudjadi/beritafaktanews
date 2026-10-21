# Prime Agri Resources — Landing Page + CMS

Landing page statis dengan CMS admin (localStorage) + News/Artikel + Galeri Foto. Siap deploy ke GitHub Pages.

## 📁 Struktur

- `index.html` — landing page
- `admin.html` — CMS admin
- `article.html` — halaman detail artikel
- `js/data.js` — data store & default content
- `js/landing.js` — render landing
- `js/article.js` — render detail artikel
- `js/admin.js` — logika CMS
- `sitemap.xml`, `robots.txt` — SEO

## 🚀 Deploy

1. Push semua file ke GitHub (branch `main`).
2. **Settings → Pages** → Source: `Deploy from a branch` → `main` / `/ (root)` → Save.
3. Akses:
   - Landing: `https://<user>.github.io/<repo>/`
   - Admin:   `https://<user>.github.io/<repo>/admin.html`
   - Artikel: `https://<user>.github.io/<repo>/article.html?id=...`

## ⚠️ Catatan

- CMS simpan di **localStorage** — perubahan hanya terlihat di browser Anda.
- Untuk konten default publik: edit `DEFAULT_DATA` di `js/data.js` → commit.
- Gunakan **Import/Export** untuk backup.

## 🎯 Fitur SEO

- Meta tags dinamis (OG, Twitter, canonical)
- JSON-LD: `Organization`, `NewsArticle`, `BreadcrumbList`
- `sitemap.xml` & `robots.txt`
- Lazy loading gambar + alt text
- Semantic HTML (`<article>`, `<time>`, `<figure>`)
- Mobile-first responsive
- Accessible lightbox (ESC, ←/→)

## 🎨 Fitur

- Hero, About, Sustainability, Fundamentals, Products
- News/Artikel dengan halaman detail
- Galeri foto dengan lightbox
- CRUD penuh via CMS