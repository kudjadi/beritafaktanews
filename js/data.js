/* =========================================================
   DATA STORE — KPKS Jadi Mandiri
   ========================================================= */

const DEFAULT_DATA = {
  site: {
    title: "KPKS Jadi Mandiri",
    metaDescription: "PT KPKS Jadi Mandiri Tbk. - Agribisnis terintegrasi yang berkelanjutan.",
    favicon: "P",
    themeColor: "#194637"
  },
  github: {
    owner: "kudjadi",
    repo: "beritafaktanews",
    branch: "main",
    uploadPath: "uploads"
  },
  hero: {
    label: "PT KPKS Jadi Mandiri Tbk",
    title: "Membangun Fundamental Bisnis yang Berkelanjutan",
    desc: "Mengelola sumber daya alam terbarukan dengan tata kelola terbaik, sumber daya manusia yang berkomitmen pada keunggulan, serta kepatuhan terhadap standar nasional dan internasional.",
    btn1: "Pelajari Lebih Lanjut",
    btn2: "Laporan Tahunan",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
  },
  about: {
    subtitle: "Company Profile",
    title: "Tentang KPKS Jadi Mandiri",
    para1: "PT KPKS Jadi Mandiri (sebelumnya PT Sampoerna Agro Tbk.) terdaftar di Bursa Efek Indonesia. Kami adalah perusahaan agribisnis terintegrasi yang berfokus pada pengelolaan sumber daya alam secara bertanggung jawab dan berkelanjutan.",
    para2: "Dengan pengalaman sejak penanaman pertama pada tahun 1989, aset perkebunan kami memiliki nilai keberlanjutan yang tinggi, berkembang menjadi usaha agribisnis terintegrasi dan terdiversifikasi dalam empat komoditas utama: minyak kelapa sawit, inti sawit, dan benih.",
    quote: "Fokus pada upaya memperkuat fundamental bisnis melalui praktik pertanian yang baik dan bertanggung jawab, mulai dari perlindungan kawasan bernilai konservasi tinggi, penggunaan pupuk organik, pengendalian hama biologis, hingga daur ulang limbah menjadi energi."
  },
  fundamentals: {
    subtitle: "Fundamental Bisnis",
    title: "Building the Fundamentals",
    para1: "KPKS Jadi Mandiri terus fokus pada upaya memperkuat fundamental bisnis. Kini, perusahaan terdiri dari sumber daya alam terbarukan yang dikelola dengan baik, sumber daya manusia yang berkomitmen pada keunggulan, dan kepatuhan terhadap hukum yang berlaku serta persyaratan standar nasional dan internasional.",
    para2: "Praktik pertanian yang baik dan bertanggung jawab menciptakan keberlanjutan: mulai dari kawasan bernilai konservasi tinggi yang dilindungi, penggunaan pupuk organik, agen pengendalian hama biologis, penggunaan air secara bijak, daur ulang limbah perkebunan menjadi sumber energi, hingga sifat alami tanaman itu sendiri yang dapat ditanam ulang.",
    image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?q=80&w=1974&auto=format&fit=crop",
    items: [
      "Kawasan konservasi tinggi yang dilindungi",
      "Pupuk organik dan pengendalian hama biologis",
      "Daur ulang limbah menjadi energi terbarukan",
      "Tanaman dapat ditanam ulang secara berkelanjutan"
    ]
  },
  sustainability: {
    subtitle: "Keberlanjutan",
    title: "Pemberdayaan Masyarakat Lokal dan Pengelolaan Tenaga Kerja",
    desc: "Empat pilar utama yang menjadi landasan keberlanjutan kami: People, Planet, Product, Profit.",
    pillars: [
      { icon: "👥", name: "People", desc: "Sumber daya manusia, baik internal maupun eksternal. Kesejahteraan karyawan adalah cerminan keberhasilan perusahaan." },
      { icon: "🌍", name: "Planet", desc: "Menjaga kelestarian lingkungan melalui praktik perkebunan berkelanjutan dan perlindungan keanekaragaman hayati." },
      { icon: "🌿", name: "Product", desc: "Produk berkualitas tinggi yang dihasilkan dari proses ramah lingkungan dan berkelanjutan." },
      { icon: "📈", name: "Profit", desc: "Pertumbuhan ekonomi yang seimbang dengan tanggung jawab sosial dan lingkungan." }
    ]
  },
  products: {
    subtitle: "Our Products",
    title: "Palm Products",
    desc: "Dua produk utama perusahaan adalah crude palm oil (CPO) dan palm kernel (PK).",
    items: [
      { icon: "🫒", name: "Crude Palm Oil (CPO)", desc: "Minyak kelapa sawit mentah yang diproduksi melalui proses ramah lingkungan, digunakan sebagai bahan baku berbagai produk pangan dan non-pangan." },
      { icon: "🌰", name: "Palm Kernel (PK)", desc: "Inti sawit yang diolah menjadi produk bernilai tambah, termasuk minyak inti sawit dan bungkil sebagai pakan ternak." }
    ]
  },
  news: {
    subtitle: "Berita & Artikel",
    title: "Kabar Terbaru dari KPKS Jadi Mandiri",
    desc: "Ikuti perkembangan, inovasi, dan kegiatan terbaru perusahaan.",
    items: [
      {
        id: "prime-agri-raih-sertifikasi-ispo-2026",
        title: "KPKS Jadi Mandiri Raih Sertifikasi ISPO 2026",
        excerpt: "Perusahaan berhasil mempertahankan sertifikasi Indonesian Sustainable Palm Oil untuk seluruh unit perkebunan.",
        content: "<p>PT KPKS Jadi Mandiri Tbk. kembali meraih sertifikasi Indonesian Sustainable Palm Oil (ISPO) untuk tahun 2026. Sertifikasi ini mencakup seluruh unit perkebunan dan pabrik kelapa sawit perusahaan.</p><p>Direktur Utama menyampaikan bahwa pencapaian ini merupakan hasil kerja keras seluruh tim dalam menerapkan praktik perkebunan berkelanjutan sesuai standar nasional dan internasional.</p><p>Ke depan, perusahaan akan terus berkomitmen meningkatkan kualitas pengelolaan perkebunan dan kesejahteraan masyarakat sekitar.</p>",
        image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1200&auto=format&fit=crop",
        date: "2026-03-15",
        author: "Tim Komunikasi",
        category: "Sertifikasi",
        featured: true
      },
      {
        id: "program-pemberdayaan-petani-mitra-2026",
        title: "Program Pemberdayaan Petani Mitra Diperluas",
        excerpt: "KPKS Jadi Mandiri memperluas program kemitraan dengan petani swadaya di Sumatera dan Kalimantan.",
        content: "<p>KPKS Jadi Mandiri memperluas program pemberdayaan petani mitra ke wilayah Sumatera dan Kalimantan. Program ini mencakup pelatihan budidaya, akses pupuk organik, dan pendampingan pascapanen.</p><p>Sejak dimulai, program telah melibatkan lebih dari 500 petani swadaya dengan peningkatan hasil panen rata-rata 20%.</p>",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop",
        date: "2026-02-20",
        author: "Divisi CSR",
        category: "Pemberdayaan",
        featured: false
      },
      {
        id: "inovasi-energi-biogas-pabrik",
        title: "Inovasi Energi Biogas di Pabrik Kelapa Sawit",
        excerpt: "Pemanfaatan limbah cair menjadi biogas mengurangi emisi karbon hingga 35%.",
        content: "<p>Pabrik kelapa sawit KPKS Jadi Mandiri mulai mengoperasikan instalasi biogas yang mengolah limbah cair (POME) menjadi energi listrik. Inisiatif ini mengurangi emisi karbon hingga 35% dan menyuplai kebutuhan listrik pabrik.</p><p>Teknologi ini sejalan dengan komitmen perusahaan terhadap transisi energi bersih dan ekonomi sirkular.</p>",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop",
        date: "2026-01-10",
        author: "Divisi Teknik",
        category: "Inovasi",
        featured: false
      }
    ]
  },
  gallery: {
    subtitle: "Galeri Kegiatan",
    title: "Momen & Aktivitas Kami",
    desc: "Dokumentasi kegiatan perkebunan, pelatihan, dan komunitas.",
    items: [
      { id: "g1", image: "https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?q=80&w=800&auto=format&fit=crop", caption: "Panen kelapa sawit berkelanjutan" },
      { id: "g2", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop", caption: "Pelatihan petani mitra" },
      { id: "g3", image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop", caption: "Instalasi biogas pabrik" },
      { id: "g4", image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop", caption: "Audit sertifikasi ISPO" },
      { id: "g5", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop", caption: "Pembibitan bibit unggul" },
      { id: "g6", image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop", caption: "Kegiatan komunitas lokal" }
    ]
  },
  footer: {
    companyName: "PT KPKS Jadi Mandiri Tbk",
    tagline: "Agribisnis terintegrasi yang berkelanjutan.",
    email: "info@primeagri.co.id",
    phone: "+62 21 1234 5678",
    address: "Jakarta, Indonesia",
    copyright: "© 2026 PT KPKS Jadi Mandiri Tbk. All rights reserved."
  }
};

const STORAGE_KEY = 'prime_agri_data_v1';

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

function validateAndFix(data) {
  const base = deepClone(DEFAULT_DATA);
  if (!data || typeof data !== 'object') return base;
  const merged = deepMerge(base, data);
  if (!Array.isArray(merged.sustainability?.pillars)) merged.sustainability.pillars = [];
  if (!Array.isArray(merged.products?.items)) merged.products.items = [];
  if (!Array.isArray(merged.fundamentals?.items)) merged.fundamentals.items = [];
  if (!Array.isArray(merged.news?.items)) merged.news.items = [];
  if (!Array.isArray(merged.gallery?.items)) merged.gallery.items = [];
  return merged;
}

const DataStore = {
  get() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return deepClone(DEFAULT_DATA);
      return validateAndFix(JSON.parse(raw));
    } catch (e) {
      console.warn('DataStore.get fallback:', e);
      return deepClone(DEFAULT_DATA);
    }
  },
  save(data) {
    try {
      const safe = validateAndFix(data);
      const json = JSON.stringify(safe);
      localStorage.setItem(STORAGE_KEY, json);
      const verify = localStorage.getItem(STORAGE_KEY);
      if (verify !== json) throw new Error('Verifikasi penulisan gagal');
      window.dispatchEvent(new CustomEvent('data-updated', { detail: safe }));
      return { ok: true, data: safe };
    } catch (e) {
      console.error('DataStore.save error:', e);
      return { ok: false, error: e.message || String(e) };
    }
  },
  reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('data-updated', { detail: deepClone(DEFAULT_DATA) }));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },
  exportJSON() { return JSON.stringify(this.get(), null, 2); },
  importJSON(jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      return this.save(parsed);
    } catch (e) {
      return { ok: false, error: 'JSON tidak valid: ' + e.message };
    }
  }
};

const GitHubUploader = {
  getConfig() {
    const cfg = DataStore.get().github || {};
    const token = localStorage.getItem('prime_agri_gh_token') || '';
    return {
      owner: cfg.owner || 'kudjadi',
      repo: cfg.repo || 'beritafaktanews',
      branch: cfg.branch || 'main',
      path: cfg.uploadPath || 'uploads',
      token
    };
  },
  setToken(token) {
    if (token) localStorage.setItem('prime_agri_gh_token', token);
    else localStorage.removeItem('prime_agri_gh_token');
  },
  getToken() { return localStorage.getItem('prime_agri_gh_token') || ''; },
  async testToken() {
    const { token } = this.getConfig();
    if (!token) return { ok: false, error: 'Token belum diisi' };
    try {
      const res = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }
      });
      if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
      const u = await res.json();
      return { ok: true, user: u.login };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },
  async upload(file, onProgress) {
    const { owner, repo, branch, path, token } = this.getConfig();
    if (!token) throw new Error('Token GitHub belum diisi. Buka Pengaturan Situs.');
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const filename = `${path}/${Date.now()}-${safeName}`;
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    if (onProgress) onProgress(30);
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`;
    const body = { message: `upload: ${safeName}`, content: base64, branch };
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (onProgress) onProgress(80);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${res.status}`);
    }
    if (onProgress) onProgress(100);
    return { url: `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filename}`, path: filename };
  }
};

/* =========================================================
   GITHUB DATA PUSHER — hanya ganti blok DEFAULT_DATA
   ========================================================= */
const GitHubDataPusher = {
  getConfig() {
    const cfg = DataStore.get().github || {};
    const token = localStorage.getItem('prime_agri_gh_token') || '';
    return {
      owner: cfg.owner || 'kudjadi',
      repo: cfg.repo || 'beritafaktanews',
      branch: cfg.branch || 'main',
      token
    };
  },

  async getFile(path) {
    const { owner, repo, branch, token } = this.getConfig();
    if (!token) throw new Error('Token GitHub belum diisi.');
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${res.status} saat ambil file`);
    }
    const data = await res.json();
    // decode base64 → string
    const decoded = decodeURIComponent(escape(atob(data.content.replace(/\n/g, ''))));
    return { sha: data.sha, content: decoded };
  },

  // Ganti HANYA blok "const DEFAULT_DATA = {...};" di file lama
  replaceDefaultData(oldContent, newData) {
    const jsonStr = JSON.stringify(newData, null, 2);
    const newBlock = `const DEFAULT_DATA = ${jsonStr};`;

    // Cari awal & akhir blok DEFAULT_DATA dengan pencocokan kurung kurawal
    const startMarker = 'const DEFAULT_DATA = ';
    const startIdx = oldContent.indexOf(startMarker);
    if (startIdx === -1) {
      throw new Error('Tidak menemukan "const DEFAULT_DATA" di js/data.js');
    }

    // Cari '{' pertama setelah startIdx
    let braceStart = oldContent.indexOf('{', startIdx);
    if (braceStart === -1) throw new Error('Format DEFAULT_DATA tidak valid.');

    // Hitung kurung kurawal sampai seimbang
    let depth = 0;
    let braceEnd = -1;
    for (let i = braceStart; i < oldContent.length; i++) {
      const ch = oldContent[i];
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) { braceEnd = i; break; }
      }
    }
    if (braceEnd === -1) throw new Error('Kurung kurawal DEFAULT_DATA tidak seimbang.');

    // Cari titik koma setelah braceEnd
    let semicolonIdx = oldContent.indexOf(';', braceEnd);
    if (semicolonIdx === -1) semicolonIdx = braceEnd;

    const before = oldContent.slice(0, startIdx);
    const after = oldContent.slice(semicolonIdx + 1);

    return before + newBlock + after;
  },

  async pushData(data, commitMessage) {
    const { owner, repo, branch, token } = this.getConfig();
    if (!token) throw new Error('Token GitHub belum diisi. Buka Pengaturan Situs.');
    const path = 'js/data.js';

    // 1. Ambil file lama
    const { sha, content } = await this.getFile(path);

    // 2. Ganti hanya blok DEFAULT_DATA
    const updated = this.replaceDefaultData(content, data);

    // 3. Commit
    const base64 = btoa(unescape(encodeURIComponent(updated)));
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const body = {
      message: commitMessage || 'chore: update content via CMS',
      content: base64,
      sha,
      branch
    };
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `HTTP ${res.status}`);
    }
    const result = await res.json();
    return { url: result.content?.html_url, commit: result.commit?.sha };
  }
};

window.DEFAULT_DATA = DEFAULT_DATA;
window.DataStore = DataStore;
window.GitHubUploader = GitHubUploader;
window.GitHubDataPusher = GitHubDataPusher;
window.deepClone = deepClone;