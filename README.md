# Prime Agri Resources — Landing Page + CMS

Landing page statis dengan CMS admin berbasis browser (localStorage). Siap deploy ke GitHub Pages.

## 📁 Struktur

- `index.html` — landing page (render dinamis dari data)
- `admin.html` — CMS admin
- `js/data.js` — data store & default content
- `js/landing.js` — render landing page
- `js/admin.js` — logika CMS

## 🚀 Deploy ke GitHub Pages

1. Push semua file ke repo GitHub (branch `main`).
2. Buka **Settings → Pages**.
3. Source: **Deploy from a branch** → Branch `main` → Folder `/ (root)`.
4. Save, tunggu 1–2 menit.
5. Akses:
   - Landing: `https://<username>.github.io/<repo>/`
   - Admin:   `https://<username>.github.io/<repo>/admin.html`

## ⚠️ Catatan Penting

- CMS menyimpan data di **localStorage browser**.
- Perubahan **hanya terlihat di browser Anda sendiri**.
- Untuk mengubah konten default untuk semua pengunjung: edit `DEFAULT_DATA` di `js/data.js` → commit → push.
- Gunakan menu **Import / Export** untuk backup atau pindah konten.
- Untuk CMS multi-user real-time, butuh backend (Supabase, Firebase, dll).

## 🔧 Cara Pakai CMS

1. Buka `admin.html`.
2. Edit konten di tab yang diinginkan.
3. Klik **Simpan Semua** di kanan atas.
4. Buka `index.html` (refresh) untuk melihat hasil.
5. Gunakan **Import/Export** untuk backup konten.

## ✅ Perbaikan Bug Simpan

- `saveAll` mengumpulkan semua field, sinkronkan pillars/products dari DOM, verifikasi tulis ke `localStorage`, lalu re-render form.
- Error ditampilkan di toast merah; sukses di toast hijau.
- Status "Tersimpan [waktu]" muncul di header.