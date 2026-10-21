/* =========================================================
   DATA STORE — Prime Agri Resources
   Simpan di localStorage, fallback ke DEFAULT_DATA
   ========================================================= */

const DEFAULT_DATA = {
  site: {
    title: "Prime Agri Resources",
    metaDescription: "PT Prime Agri Resources Tbk. - Agribisnis terintegrasi yang berkelanjutan.",
    favicon: "P",
    themeColor: "#194637"
  },
  hero: {
    label: "PT Prime Agri Resources Tbk",
    title: "Membangun Fundamental Bisnis yang Berkelanjutan",
    desc: "Mengelola sumber daya alam terbarukan dengan tata kelola terbaik, sumber daya manusia yang berkomitmen pada keunggulan, serta kepatuhan terhadap standar nasional dan internasional.",
    btn1: "Pelajari Lebih Lanjut",
    btn2: "Laporan Tahunan",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
  },
  about: {
    subtitle: "Company Profile",
    title: "Tentang Prime Agri Resources",
    para1: "PT Prime Agri Resources (sebelumnya PT Sampoerna Agro Tbk.) terdaftar di Bursa Efek Indonesia. Kami adalah perusahaan agribisnis terintegrasi yang berfokus pada pengelolaan sumber daya alam secara bertanggung jawab dan berkelanjutan.",
    para2: "Dengan pengalaman sejak penanaman pertama pada tahun 1989, aset perkebunan kami memiliki nilai keberlanjutan yang tinggi, berkembang menjadi usaha agribisnis terintegrasi dan terdiversifikasi dalam empat komoditas utama: minyak kelapa sawit, inti sawit, dan benih.",
    quote: "Fokus pada upaya memperkuat fundamental bisnis melalui praktik pertanian yang baik dan bertanggung jawab, mulai dari perlindungan kawasan bernilai konservasi tinggi, penggunaan pupuk organik, pengendalian hama biologis, hingga daur ulang limbah menjadi energi."
  },
  fundamentals: {
    subtitle: "Fundamental Bisnis",
    title: "Building the Fundamentals",
    para1: "Prime Agri Resources terus fokus pada upaya memperkuat fundamental bisnis. Kini, perusahaan terdiri dari sumber daya alam terbarukan yang dikelola dengan baik, sumber daya manusia yang berkomitmen pada keunggulan, dan kepatuhan terhadap hukum yang berlaku serta persyaratan standar nasional dan internasional.",
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
  footer: {
    companyName: "PT Prime Agri Resources Tbk",
    tagline: "Agribisnis terintegrasi yang berkelanjutan.",
    email: "info@primeagri.co.id",
    phone: "+62 21 1234 5678",
    address: "Jakarta, Indonesia",
    copyright: "© 2026 PT Prime Agri Resources Tbk. All rights reserved."
  }
};

const STORAGE_KEY = 'prime_agri_data_v1';

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

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
  exportJSON() {
    return JSON.stringify(this.get(), null, 2);
  },
  importJSON(jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      return this.save(parsed);
    } catch (e) {
      return { ok: false, error: 'JSON tidak valid: ' + e.message };
    }
  }
};

window.DEFAULT_DATA = DEFAULT_DATA;
window.DataStore = DataStore;
window.deepClone = deepClone;