# Berita Fakta News — Landing + CMS

Landing page statis dengan CMS admin (localStorage), News/Artikel (live preview), Galeri carousel, dan upload gambar langsung ke GitHub.

## 📁 Struktur

- `index.html` — landing page
- `admin.html` — CMS admin
- `article.html` — halaman detail artikel
- `js/data.js` — data store + GitHub uploader
- `js/landing.js` — render landing
- `js/article.js` — render detail artikel
- `js/admin.js` — logika CMS
- `sitemap.xml`, `robots.txt` — SEO

## 🚀 Deploy

1. Push ke GitHub (branch `main`).
2. **Settings → Pages** → Source: `Deploy from a branch` → `main` / `/ (root)` → Save.
3. Akses:
   - Landing: `https://kudjadi.github.io/beritafaktanews/`
   - Admin:   `https://kudjadi.github.io/beritafaktanews/admin.html`
   - Artikel: `https://kudjadi.github.io/beritafaktanews/article.html?id=...`

## 🔑 Upload Gambar ke GitHub

1. Buat **Personal Access Token (Fine-grained)**:
   - https://github.com/settings/tokens?type=beta
   - Scope: **Contents: Read and Write** → repo `beritafaktanews`.
2. Buka `admin.html` → **Pengaturan Situs**.
3. Isi bagian **GitHub Upload** → paste token → **Simpan Token** → **Test Token**.
4. Buka tab **Berita** atau **Galeri** → klik **📤 Upload**.
5. Gambar otomatis ter-upload ke folder `uploads/` di repo.
6. URL `raw.githubusercontent.com` otomatis terisi.

## ✨ Fitur

- Live preview artikel (tombol 👁)
- Upload gambar langsung ke GitHub
- Galeri carousel (swipe/scroll, tombol ←/→, dots)
- Lightbox galeri (ESC, ←/→)
- CRUD penuh via CMS
- Responsive mobile-first
- SEO: OG, Twitter Card, JSON-LD, sitemap, robots

## ⚠️ Catatan

- Token disimpan di `localStorage` browser — **jangan pakai di komputer publik**.
- CMS simpan data di `localStorage` — perubahan hanya terlihat di browser Anda.
- Untuk konten default publik: edit `DEFAULT_DATA` di `js/data.js` → commit.