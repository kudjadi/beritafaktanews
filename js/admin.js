/* =========================================================
   ADMIN CMS LOGIC
   ========================================================= */

(function () {
  'use strict';

  let currentData = DataStore.get();

  const pageTitles = {
    dashboard:    { title: 'Dashboard',            subtitle: 'Ringkasan dan pengaturan konten landing page' },
    hero:         { title: 'Hero Section',         subtitle: 'Atur konten bagian hero di landing page' },
    about:        { title: 'About / Company Profile', subtitle: 'Atur profil perusahaan dan kutipan' },
    fundamentals: { title: 'Fundamental Bisnis',   subtitle: 'Atur bagian building the fundamentals' },
    sustainability:{ title: 'Keberlanjutan',       subtitle: 'Atur empat pilar keberlanjutan' },
    products:     { title: 'Produk',               subtitle: 'Kelola produk yang ditampilkan' },
    news:         { title: 'Berita / Artikel',     subtitle: 'Kelola artikel dan berita perusahaan' },
    gallery:      { title: 'Galeri Foto',          subtitle: 'Kelola foto kegiatan' },
    footer:       { title: 'Footer & Kontak',      subtitle: 'Atur informasi kontak dan footer' },
    settings:     { title: 'Pengaturan Situs',     subtitle: 'Konfigurasi situs & GitHub upload' },
    backup:       { title: 'Import / Export',      subtitle: 'Backup dan restore data konten' }
  };

  window.switchTab = function (tabName, element) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const tab = document.getElementById('tab-' + tabName);
    if (tab) tab.classList.add('active');
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    if (element) element.classList.add('active');
    const info = pageTitles[tabName] || pageTitles.dashboard;
    const tEl = document.getElementById('page-title');
    const sEl = document.getElementById('page-subtitle');
    if (tEl) tEl.textContent = info.title;
    if (sEl) sEl.textContent = info.subtitle;
  };

  /* TOAST */
  function showToast(message, type) {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toast-message');
    if (!toast || !msgEl) return;
    msgEl.textContent = message;
    toast.classList.remove('bg-brand-700', 'bg-red-600', 'bg-emerald-600');
    toast.classList.add(type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-emerald-600' : 'bg-brand-700');
    toast.classList.remove('hidden');
    toast.style.animation = 'none';
    void toast.offsetHeight;
    toast.style.animation = '';
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
  }
  window.showToast = showToast;

  /* HELPERS */
  function getByPath(obj, path) {
    return path.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), obj);
  }
  function setByPath(obj, path, value) {
    const keys = path.split('.');
    const last = keys.pop();
    const target = keys.reduce((acc, k) => {
      if (!acc[k] || typeof acc[k] !== 'object') acc[k] = {};
      return acc[k];
    }, obj);
    target[last] = value;
  }
  function escHtml(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escAttr(s) {
    return String(s ?? '').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  /* FILL FORM */
  function fillForm() {
    document.querySelectorAll('.field').forEach(el => {
      const path = el.dataset.field;
      const type = el.dataset.type;
      const val = getByPath(currentData, path);
      if (type === 'array') {
        el.value = Array.isArray(val) ? val.join('\n') : '';
      } else {
        el.value = (val !== undefined && val !== null) ? val : '';
      }
    });
    const ghToken = document.getElementById('gh-token');
    if (ghToken) ghToken.value = GitHubUploader.getToken();
    renderPillars();
    renderProducts();
    renderNews();
    renderGallery();
    updateStats();
  }

  function updateStats() {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('stat-products', (currentData.products?.items || []).length);
    set('stat-pillars', (currentData.sustainability?.pillars || []).length);
    set('stat-news', (currentData.news?.items || []).length);
    set('stat-gallery', (currentData.gallery?.items || []).length);
  }

  function collectFields() {
    document.querySelectorAll('.field').forEach(el => {
      const path = el.dataset.field;
      const type = el.dataset.type;
      let val = el.value;
      if (type === 'array') val = val.split('\n').map(s => s.trim()).filter(Boolean);
      setByPath(currentData, path, val);
    });
  }

  /* PILLARS */
  function renderPillars() {
    const wrap = document.getElementById('pillars-editor');
    if (!wrap) return;
    const pillars = currentData.sustainability?.pillars || [];
    wrap.innerHTML = pillars.map((p, i) => `
      <div class="border border-gray-200 rounded-lg p-4" data-pillar-index="${i}">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-gray-500">Pilar #${i + 1}</span>
          <button type="button" onclick="removePillar(${i})" class="text-red-500 hover:text-red-700 text-xs">Hapus</button>
        </div>
        <div class="grid grid-cols-3 gap-2 mb-2">
          <input data-pillar="${i}" data-key="icon" value="${escAttr(p.icon)}" placeholder="Icon" class="pillar-field border border-gray-300 rounded px-2 py-1 text-sm">
          <input data-pillar="${i}" data-key="name" value="${escAttr(p.name)}" placeholder="Nama" class="pillar-field border border-gray-300 rounded px-2 py-1 text-sm col-span-2">
        </div>
        <textarea data-pillar="${i}" data-key="desc" rows="2" placeholder="Deskripsi" class="pillar-field w-full border border-gray-300 rounded px-2 py-1 text-sm">${escHtml(p.desc)}</textarea>
      </div>
    `).join('');
    wrap.querySelectorAll('.pillar-field').forEach(el => {
      el.addEventListener('input', () => {
        const i = +el.dataset.pillar;
        const key = el.dataset.key;
        if (currentData.sustainability.pillars[i]) currentData.sustainability.pillars[i][key] = el.value;
      });
    });
  }
  window.removePillar = function (i) {
    if (!confirm('Hapus pilar ini?')) return;
    currentData.sustainability.pillars.splice(i, 1);
    renderPillars(); updateStats();
  };
  window.addPillar = function () {
    currentData.sustainability.pillars.push({ icon: '⭐', name: 'Pilar Baru', desc: 'Deskripsi pilar...' });
    renderPillars(); updateStats();
  };

  /* PRODUCTS */
  function renderProducts() {
    const wrap = document.getElementById('products-editor');
    if (!wrap) return;
    const items = currentData.products?.items || [];
    wrap.innerHTML = items.map((p, i) => `
      <div class="border border-gray-200 rounded-lg p-4" data-product-index="${i}">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-gray-500">Produk #${i + 1}</span>
          <button type="button" onclick="removeProduct(${i})" class="text-red-500 hover:text-red-700 text-xs">Hapus</button>
        </div>
        <div class="grid grid-cols-3 gap-2 mb-2">
          <input data-product="${i}" data-key="icon" value="${escAttr(p.icon)}" placeholder="Icon" class="product-field border border-gray-300 rounded px-2 py-1 text-sm">
          <input data-product="${i}" data-key="name" value="${escAttr(p.name)}" placeholder="Nama Produk" class="product-field border border-gray-300 rounded px-2 py-1 text-sm col-span-2">
        </div>
        <textarea data-product="${i}" data-key="desc" rows="2" placeholder="Deskripsi" class="product-field w-full border border-gray-300 rounded px-2 py-1 text-sm">${escHtml(p.desc)}</textarea>
      </div>
    `).join('');
    wrap.querySelectorAll('.product-field').forEach(el => {
      el.addEventListener('input', () => {
        const i = +el.dataset.product;
        const key = el.dataset.key;
        if (currentData.products.items[i]) currentData.products.items[i][key] = el.value;
      });
    });
  }
  window.removeProduct = function (i) {
    if (!confirm('Hapus produk ini?')) return;
    currentData.products.items.splice(i, 1);
    renderProducts(); updateStats();
  };
  window.addProduct = function () {
    currentData.products.items.push({ icon: '📦', name: 'Produk Baru', desc: 'Deskripsi produk...' });
    renderProducts(); updateStats();
  };

  /* NEWS (with live preview + upload) */
  function renderNews() {
    const wrap = document.getElementById('news-editor');
    if (!wrap) return;
    if (!currentData.news) currentData.news = { subtitle: '', title: '', desc: '', items: [] };
    const items = currentData.news.items || [];
    wrap.innerHTML = items.map((n, i) => `
      <details class="border border-gray-200 rounded-lg" ${i === 0 ? 'open' : ''}>
        <summary class="cursor-pointer px-4 py-3 flex items-center justify-between hover:bg-gray-50">
          <span class="text-sm font-medium text-gray-800 truncate">📰 ${escHtml(n.title || 'Artikel Baru')}</span>
          <div class="flex gap-2">
            <button type="button" onclick="event.preventDefault(); toggleNewsPreview(${i})" class="text-brand-600 hover:text-brand-800 text-xs font-medium">👁 Preview</button>
            <button type="button" onclick="event.preventDefault(); removeNews(${i})" class="text-red-500 hover:text-red-700 text-xs">Hapus</button>
          </div>
        </summary>
        <div class="p-4 space-y-2 border-t border-gray-200">
          <input data-news="${i}" data-key="id" value="${escAttr(n.id)}" placeholder="ID unik (slug)" class="news-field w-full border border-gray-300 rounded px-2 py-1 text-sm">
          <input data-news="${i}" data-key="title" value="${escAttr(n.title)}" placeholder="Judul" class="news-field w-full border border-gray-300 rounded px-2 py-1 text-sm">
          <div class="grid grid-cols-2 gap-2">
            <input data-news="${i}" data-key="category" value="${escAttr(n.category)}" placeholder="Kategori" class="news-field w-full border border-gray-300 rounded px-2 py-1 text-sm">
            <input data-news="${i}" data-key="date" type="date" value="${escAttr(n.date)}" class="news-field w-full border border-gray-300 rounded px-2 py-1 text-sm">
          </div>
          <input data-news="${i}" data-key="author" value="${escAttr(n.author)}" placeholder="Penulis" class="news-field w-full border border-gray-300 rounded px-2 py-1 text-sm">
          <div class="flex gap-2 items-center">
            <input data-news="${i}" data-key="image" value="${escAttr(n.image)}" placeholder="URL Gambar" class="news-field flex-1 border border-gray-300 rounded px-2 py-1 text-sm">
            <label class="cursor-pointer bg-brand-50 text-brand-700 border border-brand-200 text-xs font-medium px-3 py-1.5 rounded hover:bg-brand-100 transition whitespace-nowrap">
              📤 Upload
              <input type="file" accept="image/*" class="hidden" onchange="uploadNewsImage(event, ${i})">
            </label>
          </div>
          <textarea data-news="${i}" data-key="excerpt" rows="2" placeholder="Ringkasan" class="news-field w-full border border-gray-300 rounded px-2 py-1 text-sm">${escHtml(n.excerpt)}</textarea>
          <textarea data-news="${i}" data-key="content" rows="5" placeholder="Konten lengkap (HTML diperbolehkan)" class="news-field w-full border border-gray-300 rounded px-2 py-1 text-sm font-mono">${escHtml(n.content)}</textarea>
          <div id="news-preview-${i}" class="hidden mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200"></div>
        </div>
      </details>
    `).join('');
    wrap.querySelectorAll('.news-field').forEach(el => {
      el.addEventListener('input', () => {
        const i = +el.dataset.news;
        const key = el.dataset.key;
        if (currentData.news.items[i]) currentData.news.items[i][key] = el.value;
      });
    });
  }

  window.toggleNewsPreview = function (i) {
    const panel = document.getElementById('news-preview-' + i);
    if (!panel) return;
    if (!panel.classList.contains('hidden')) {
      panel.classList.add('hidden');
      return;
    }
    const n = currentData.news.items[i];
    if (!n) return;
    panel.innerHTML = `
      <div class="text-xs font-semibold text-gray-500 mb-2">PREVIEW</div>
      <article class="bg-white rounded-lg overflow-hidden border border-gray-200">
        <img src="${escAttr(n.image)}" alt="${escAttr(n.title)}" class="w-full aspect-video object-cover" onerror="this.style.display='none'">
        <div class="p-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">${escHtml(n.category || 'Umum')}</span>
            <span class="text-xs text-gray-400">${escHtml(n.date || '')}</span>
          </div>
          <h3 class="font-bold text-lg text-gray-800 mb-2">${escHtml(n.title || '(Judul)')}</h3>
          <p class="text-sm text-gray-600 mb-3">${escHtml(n.excerpt || '(Ringkasan)')}</p>
          <div class="text-sm text-gray-700 leading-relaxed">${n.content || '<p>(Isi artikel)</p>'}</div>
        </div>
      </article>
    `;
    panel.classList.remove('hidden');
  };

  window.uploadNewsImage = async function (event, i) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      showToast('Mengunggah ke GitHub...', 'info');
      const result = await GitHubUploader.upload(file);
      currentData.news.items[i].image = result.url;
      const input = document.querySelector(`[data-news="${i}"][data-key="image"]`);
      if (input) input.value = result.url;
      showToast('✓ Gambar berhasil di-upload ke GitHub!', 'success');
    } catch (err) {
      console.error('Upload error:', err);
      showToast('Upload gagal: ' + err.message, 'error');
    } finally {
      event.target.value = '';
    }
  };

  window.removeNews = function (i) {
    if (!confirm('Hapus artikel ini?')) return;
    currentData.news.items.splice(i, 1);
    renderNews(); updateStats();
  };
  window.addNews = function () {
    const id = 'artikel-' + Date.now();
    currentData.news.items.unshift({
      id, title: 'Artikel Baru', excerpt: 'Ringkasan...', content: '<p>Isi artikel...</p>',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop',
      date: new Date().toISOString().slice(0, 10), author: 'Admin', category: 'Umum', featured: false
    });
    renderNews(); updateStats();
  };

  /* GALLERY (with upload) */
  function renderGallery() {
    const wrap = document.getElementById('gallery-editor');
    if (!wrap) return;
    if (!currentData.gallery) currentData.gallery = { subtitle: '', title: '', desc: '', items: [] };
    const items = currentData.gallery.items || [];
    wrap.innerHTML = items.map((g, i) => `
      <div class="border border-gray-200 rounded-lg p-3" data-gallery-index="${i}">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-gray-500">Foto #${i + 1}</span>
          <button type="button" onclick="removeGallery(${i})" class="text-red-500 hover:text-red-700 text-xs">Hapus</button>
        </div>
        <div class="aspect-video rounded bg-gray-100 mb-2 overflow-hidden">
          <img src="${escAttr(g.image)}" alt="" class="w-full h-full object-cover" onerror="this.style.display='none'">
        </div>
        <div class="flex gap-2 items-center mb-2">
          <input data-gallery="${i}" data-key="image" value="${escAttr(g.image)}" placeholder="URL Gambar" class="gallery-field flex-1 border border-gray-300 rounded px-2 py-1 text-sm">
          <label class="cursor-pointer bg-brand-50 text-brand-700 border border-brand-200 text-xs font-medium px-3 py-1.5 rounded hover:bg-brand-100 transition whitespace-nowrap">
            📤 Upload
            <input type="file" accept="image/*" class="hidden" onchange="uploadGalleryImage(event, ${i})">
          </label>
        </div>
        <input data-gallery="${i}" data-key="caption" value="${escAttr(g.caption)}" placeholder="Caption" class="gallery-field w-full border border-gray-300 rounded px-2 py-1 text-sm">
      </div>
    `).join('');
    wrap.querySelectorAll('.gallery-field').forEach(el => {
      el.addEventListener('input', () => {
        const i = +el.dataset.gallery;
        const key = el.dataset.key;
        if (currentData.gallery.items[i]) currentData.gallery.items[i][key] = el.value;
      });
    });
  }

  window.uploadGalleryImage = async function (event, i) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      showToast('Mengunggah ke GitHub...', 'info');
      const result = await GitHubUploader.upload(file);
      currentData.gallery.items[i].image = result.url;
      const input = document.querySelector(`[data-gallery="${i}"][data-key="image"]`);
      if (input) input.value = result.url;
      showToast('✓ Foto berhasil di-upload ke GitHub!', 'success');
    } catch (err) {
      console.error('Upload error:', err);
      showToast('Upload gagal: ' + err.message, 'error');
    } finally {
      event.target.value = '';
    }
  };

  window.removeGallery = function (i) {
    if (!confirm('Hapus foto ini?')) return;
    currentData.gallery.items.splice(i, 1);
    renderGallery(); updateStats();
  };
  window.addGallery = function () {
    currentData.gallery.items.push({
      id: 'g' + Date.now(),
      image: 'https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?q=80&w=800&auto=format&fit=crop',
      caption: 'Foto baru'
    });
    renderGallery(); updateStats();
  };

  /* GITHUB TOKEN */
  window.saveGithubToken = function () {
    const input = document.getElementById('gh-token');
    const token = input?.value?.trim() || '';
    if (!token) { showToast('Token kosong', 'error'); return; }
    GitHubUploader.setToken(token);
    showToast('✓ Token GitHub disimpan', 'success');
  };
  window.testGithubToken = async function () {
    const status = document.getElementById('gh-status');
    const input = document.getElementById('gh-token');
    if (input?.value?.trim()) GitHubUploader.setToken(input.value.trim());
    if (status) { status.textContent = 'Menguji token...'; status.className = 'text-sm text-gray-500'; }
    const r = await GitHubUploader.testToken();
    if (r.ok) {
      if (status) { status.textContent = '✓ Token valid untuk user: ' + r.user; status.className = 'text-sm text-emerald-600 font-medium'; }
      showToast('Token valid: ' + r.user, 'success');
    } else {
      if (status) { status.textContent = '✗ Token tidak valid: ' + r.error; status.className = 'text-sm text-red-600 font-medium'; }
      showToast('Token tidak valid: ' + r.error, 'error');
    }
  };
  window.clearGithubToken = function () {
    if (!confirm('Hapus token GitHub dari browser?')) return;
    GitHubUploader.setToken('');
    const input = document.getElementById('gh-token');
    if (input) input.value = '';
    const status = document.getElementById('gh-status');
    if (status) { status.textContent = 'Token dihapus.'; status.className = 'text-sm text-gray-500'; }
    showToast('Token dihapus', 'success');
  };

  /* SAVE ALL */
  window.saveAll = function () {
    try {
      collectFields();

      const pillarEls = document.querySelectorAll('#pillars-editor [data-pillar-index]');
      if (pillarEls.length > 0) {
        const fresh = [];
        pillarEls.forEach(box => {
          const idx = +box.dataset.pillarIndex;
          fresh[idx] = {
            icon: box.querySelector('[data-key="icon"]').value,
            name: box.querySelector('[data-key="name"]').value,
            desc: box.querySelector('[data-key="desc"]').value
          };
        });
        currentData.sustainability.pillars = fresh.filter(Boolean);
      }

      const productEls = document.querySelectorAll('#products-editor [data-product-index]');
      if (productEls.length > 0) {
        const fresh = [];
        productEls.forEach(box => {
          const idx = +box.dataset.productIndex;
          fresh[idx] = {
            icon: box.querySelector('[data-key="icon"]').value,
            name: box.querySelector('[data-key="name"]').value,
            desc: box.querySelector('[data-key="desc"]').value
          };
        });
        currentData.products.items = fresh.filter(Boolean);
      }

      const newsEls = document.querySelectorAll('#news-editor details');
      if (newsEls.length > 0) {
        const fresh = [];
        newsEls.forEach(detail => {
          const obj = {};
          detail.querySelectorAll('.news-field').forEach(f => { obj[f.dataset.key] = f.value; });
          if (obj.id || obj.title) fresh.push(obj);
        });
        currentData.news.items = fresh;
      }

      const galEls = document.querySelectorAll('#gallery-editor [data-gallery-index]');
      if (galEls.length > 0) {
        const fresh = [];
        galEls.forEach(box => {
          const obj = {};
          box.querySelectorAll('.gallery-field').forEach(f => { obj[f.dataset.key] = f.value; });
          if (obj.image) {
            obj.id = obj.id || 'g' + Date.now() + Math.random().toString(36).slice(2, 6);
            fresh.push(obj);
          }
        });
        currentData.gallery.items = fresh;
      }

      const result = DataStore.save(currentData);
      if (!result.ok) {
        showToast('Gagal menyimpan: ' + result.error, 'error');
        return;
      }
      currentData = result.data;
      fillForm();

      const statusEl = document.getElementById('save-status');
      if (statusEl) {
        statusEl.textContent = '✓ Tersimpan ' + new Date().toLocaleTimeString('id-ID');
        statusEl.className = 'text-xs text-emerald-600 mr-2 font-medium';
      }
      showToast('✓ Perubahan berhasil disimpan!', 'success');
    } catch (err) {
      console.error('saveAll error:', err);
      showToast('Error: ' + err.message, 'error');
    }
  };

  /* EXPORT / IMPORT / RESET */
  window.exportData = function () {
    try {
      collectFields();
      const data = DataStore.get();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'prime-agri-content-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('✓ Data berhasil di-export', 'success');
    } catch (err) {
      showToast('Export gagal: ' + err.message, 'error');
    }
  };

  window.importData = function () {
    const input = document.getElementById('import-file');
    const file = input?.files?.[0];
    if (!file) { showToast('Pilih file JSON terlebih dahulu', 'error'); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        const result = DataStore.save(parsed);
        if (!result.ok) { showToast('Import gagal: ' + result.error, 'error'); return; }
        currentData = DataStore.get();
        fillForm();
        input.value = '';
        showToast('✓ Data berhasil di-import', 'success');
      } catch (err) {
        showToast('File JSON tidak valid: ' + err.message, 'error');
      }
    };
    reader.onerror = () => showToast('Gagal membaca file', 'error');
    reader.readAsText(file);
  };

  window.resetData = function () {
    if (!confirm('Reset semua konten ke default? Tindakan ini tidak bisa dibatalkan.')) return;
    const result = DataStore.reset();
    if (!result.ok) { showToast('Reset gagal: ' + result.error, 'error'); return; }
    currentData = DataStore.get();
    fillForm();
    showToast('✓ Data direset ke default', 'success');
  };

  /* INIT */
  function init() {
    currentData = DataStore.get();
    fillForm();
    console.log('[CMS] Ready.');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();