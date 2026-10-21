# Berita Fakta News — Landing + CMS

Landing page statis dengan CMS admin responsif (mobile-friendly), live preview artikel, galeri carousel, upload gambar ke GitHub, dan push konten 1 klik ke GitHub.

## 📁 Struktur

- `index.html` — landing page
- `admin.html` — CMS admin (responsif mobile)
- `article.html` — halaman detail artikel
- `js/data.js` — data store + GitHub uploader + pusher
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

## 🔑 Setup GitHub (sekali)

1. Buat folder `uploads/` di repo + file `.gitkeep`.
2. Buat **Personal Access Token (Fine-grained)**:
   - https://github.com/settings/tokens?type=beta
   - Scope: **Contents: Read and Write** → repo `beritafaktanews`.
3. Buka `admin.html` → **Pengaturan Situs** → bagian **GitHub Upload**:
   - Owner: `kudjadi`
   - Repo: `beritafaktanews`
   - Branch: `main`
   - Folder Upload: `uploads`
   - Paste token → **Simpan Token** → **Test Token**.

## ✨ Fitur

- **Live preview artikel** — tombol 👁 Preview
- **Upload gambar ke GitHub** — tombol 📤 Upload di tab Berita & Galeri
- **Galeri carousel** — swipe/scroll, tombol ←/→, dots
- **Push konten ke GitHub** — tombol 🚀 di tab Import/Export → commit `js/data.js` → semua pengunjung lihat perubahan
- **CMS responsif mobile** — sidebar drawer, form full-width, tombol besar
- **SEO** — OG, Twitter Card, JSON-LD, sitemap, robots

## 📱 Alur Kerja

1. Edit konten di CMS.
2. Klik **Simpan Semua** (simpan lokal).
3. Klik **🚀 Push ke GitHub** (tab Import/Export) untuk publish.
4. Tunggu 1–2 menit → buka landing page → hard refresh (Ctrl+Shift+R).

## ⚠️ Catatan

- Token disimpan di `localStorage` — **jangan pakai di komputer publik**.
- `js/data.js` akan ditimpa otomatis saat push — jangan edit manual.
- Setelah push, GitHub Pages rebuild 1–2 menit.