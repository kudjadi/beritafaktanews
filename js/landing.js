/* =========================================================
   LANDING PAGE RENDERER
   Membaca DataStore & render ke index.html
   ========================================================= */

(function () {
  'use strict';

  function esc(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function render() {
    const d = DataStore.get();

    /* ---------- SITE ---------- */
    document.title = d.site.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', d.site.metaDescription);
    const navLogo = document.getElementById('nav-logo');
    const navTitle = document.getElementById('nav-title');
    if (navLogo) navLogo.textContent = d.site.favicon || 'P';
    if (navTitle) navTitle.textContent = d.site.title.toUpperCase();

    /* ---------- HERO ---------- */
    setText('hero-label', d.hero.label);
    setText('hero-title', d.hero.title);
    setText('hero-desc', d.hero.desc);
    setText('hero-btn1', d.hero.btn1);
    setText('hero-btn2', d.hero.btn2);
    const heroBg = document.getElementById('hero');
    if (heroBg && d.hero.image) {
      heroBg.style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.35)), url('${d.hero.image}')`;
      heroBg.style.backgroundSize = 'cover';
      heroBg.style.backgroundPosition = 'center 30%';
    }

    /* ---------- ABOUT ---------- */
    setText('about-subtitle', d.about.subtitle);
    setText('about-title', d.about.title);
    setText('about-para1', d.about.para1);
    setText('about-para2', d.about.para2);
    setText('about-quote', d.about.quote);

    /* ---------- FUNDAMENTALS ---------- */
    setText('fund-subtitle', d.fundamentals.subtitle);
    setText('fund-title', d.fundamentals.title);
    setText('fund-para1', d.fundamentals.para1);
    setText('fund-para2', d.fundamentals.para2);
    const fundImg = document.getElementById('fund-image');
    if (fundImg) {
      if (d.fundamentals.image) {
        fundImg.src = d.fundamentals.image;
        fundImg.style.display = '';
      } else {
        fundImg.style.display = 'none';
      }
    }
    const fundItems = document.getElementById('fund-items');
    if (fundItems) {
      fundItems.innerHTML = (d.fundamentals.items || []).map(item => `
        <li class="flex items-start">
          <span class="text-emerald-600 mr-2 font-bold">✓</span>
          <span class="text-gray-700">${esc(item)}</span>
        </li>
      `).join('');
    }

    /* ---------- SUSTAINABILITY ---------- */
    setText('sus-subtitle', d.sustainability.subtitle);
    setText('sus-title', d.sustainability.title);
    setText('sus-desc', d.sustainability.desc);
    const pillars = document.getElementById('sus-pillars');
    if (pillars) {
      pillars.innerHTML = (d.sustainability.pillars || []).map(p => `
        <div class="pillar-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-200">
          <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold mb-4">${esc(p.icon)}</div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">${esc(p.name)}</h3>
          <p class="text-gray-600 text-sm leading-relaxed">${esc(p.desc)}</p>
        </div>
      `).join('');
    }

    /* ---------- PRODUCTS ---------- */
    setText('prod-subtitle', d.products.subtitle);
    setText('prod-title', d.products.title);
    setText('prod-desc', d.products.desc);
    const prodItems = document.getElementById('prod-items');
    if (prodItems) {
      prodItems.innerHTML = (d.products.items || []).map(p => `
        <div class="bg-emerald-800/50 rounded-2xl p-8 border border-emerald-700 backdrop-blur-sm">
          <div class="flex items-center mb-4">
            <div class="w-14 h-14 rounded-full bg-emerald-700 flex items-center justify-center text-2xl">${esc(p.icon)}</div>
            <h3 class="text-2xl font-bold ml-4">${esc(p.name)}</h3>
          </div>
          <p class="text-emerald-100 leading-relaxed">${esc(p.desc)}</p>
        </div>
      `).join('');
    }

    /* ---------- FOOTER ---------- */
    const footDesc = document.getElementById('foot-desc');
    if (footDesc) footDesc.innerHTML = `${esc(d.footer.companyName)}<br>${esc(d.footer.tagline)}`;
    setText('foot-address', d.footer.address);
    const footEmail = document.getElementById('foot-email');
    if (footEmail) {
      footEmail.innerHTML = `<a href="mailto:${esc(d.footer.email)}" class="hover:text-emerald-400 transition">${esc(d.footer.email)}</a>`;
    }
    setText('foot-phone', d.footer.phone);
    setText('foot-copy', d.footer.copyright);
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value ?? '';
  }

  /* Initial render */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

  /* Re-render saat admin menyimpan */
  window.addEventListener('data-updated', render);
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) render();
  });
})();