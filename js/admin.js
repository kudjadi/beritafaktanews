/* =========================================================
   ADMIN CMS LOGIC
   ========================================================= */

(function () {
  'use strict';

  let currentData = DataStore.get();

  /* ---------- TAB SWITCH ---------- */
  const pageTitles = {
    dashboard:   { title: 'Dashboard',            subtitle: 'Ringkasan dan pengaturan konten landing page' },
    hero:        { title: 'Hero Section',         subtitle: 'Atur konten bagian hero di landing page' },
    about:       { title: 'About / Company Profile', subtitle: 'Atur profil perusahaan dan kutipan' },
    fundamentals:{ title: 'Fundamental Bisnis',   subtitle: 'Atur bagian building the fundamentals' },
    sustainability:{ title: 'Keberlanjutan',      subtitle: 'Atur empat pilar keberlanjutan' },
    products:    { title: 'Produk',               subtitle: 'Kelola produk yang ditampilkan' },
    footer:      { title: 'Footer & Kontak',      subtitle: 'Atur informasi kontak dan footer' },
    settings:    { title: 'Pengaturan Situs',     subtitle: 'Konfigurasi umum situs' },
    backup:      { title: 'Import / Export',      subtitle: 'Backup dan restore data konten' }
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

  /* ---------- TOAST ---------- */
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

  /* ---------- PATH HELPERS ---------- */
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

  /* ---------- FILL FORM FROM currentData ---------- */
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
    renderPillars();
    renderProducts();
    updateStats();
  }

  function updateStats() {
    const prodEl = document.getElementById('stat-products');
    const pilEl = document.getElementById('stat-pillars');
    if (prodEl) prodEl.textContent = (currentData.products?.items || []).length;
    if (pilEl) pilEl.textContent = (currentData.sustainability?.pillars || []).length;
  }

  /* ---------- COLLECT FIELDS ---------- */
  function collectFields() {
    document.querySelectorAll('.field').forEach(el => {
      const path = el.dataset.field;
      const type = el.dataset.type;
      let val = el.value;
      if (type === 'array') {
        val = val.split('\n').map(s => s.trim()).filter(Boolean);
      }
      setByPath(currentData, path, val);
    });
  }

  /* ---------- PILLARS ---------- */
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
        if (currentData.sustainability.pillars[i]) {
          currentData.sustainability.pillars[i][key] = el.value;
        }
      });
    });
  }

  window.removePillar = function (i) {
    if (!confirm('Hapus pilar ini?')) return;
    currentData.sustainability.pillars.splice(i, 1);
    renderPillars();
    updateStats();
  };

  window.addPillar = function () {
    currentData.sustainability.pillars.push({ icon: '⭐', name: 'Pilar Baru', desc: 'Deskripsi pilar...' });
    renderPillars();
    updateStats();
  };

  /* ---------- PRODUCTS ---------- */
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
        if (currentData.products.items[i]) {
          currentData.products.items[i][key] = el.value;
        }
      });
    });
  }

  window.removeProduct = function (i) {
    if (!confirm('Hapus produk ini?')) return;
    currentData.products.items.splice(i, 1);
    renderProducts();
    updateStats();
  };

  window.addProduct = function () {
    currentData.products.items.push({ icon: '📦', name: 'Produk Baru', desc: 'Deskripsi produk...' });
    renderProducts();
    updateStats();
  };

  /* ---------- SAVE ALL (FIXED) ---------- */
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

  /* ---------- EXPORT / IMPORT / RESET ---------- */
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
    if (!file) {
      showToast('Pilih file JSON terlebih dahulu', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        const result = DataStore.save(parsed);
        if (!result.ok) {
          showToast('Import gagal: ' + result.error, 'error');
          return;
        }
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
    if (!result.ok) {
      showToast('Reset gagal: ' + result.error, 'error');
      return;
    }
    currentData = DataStore.get();
    fillForm();
    showToast('✓ Data direset ke default', 'success');
  };

  /* ---------- HELPERS ---------- */
  function escHtml(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escAttr(s) {
    return String(s ?? '').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  /* ---------- INIT ---------- */
  function init() {
    currentData = DataStore.get();
    fillForm();
    console.log('[CMS] Ready. Data:', currentData);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();