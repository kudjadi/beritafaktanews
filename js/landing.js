/* =========================================================
   LANDING PAGE RENDERER
   ========================================================= */

(function () {
  'use strict';

  // Guard: pastikan DataStore tersedia
  if (typeof window.DataStore === 'undefined') {
    console.error('[Landing] DataStore tidak ditemukan. Pastikan js/data.js dimuat sebelum js/landing.js.');
    return;
  }

  function esc(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escAttr(s) {
    return String(s ?? '').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }
  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return iso; }
  }

  function render() {
    let d;
    try {
      d = DataStore.get();
    } catch (err) {
      console.error('[Landing] Gagal memuat data:', err);
      return;
    }

    document.title = d.site.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', d.site.metaDescription);
    const navLogo = document.getElementById('nav-logo');
    const navTitle = document.getElementById('nav-title');
    if (navLogo) navLogo.textContent = d.site.favicon || 'P';
    if (navTitle) navTitle.textContent = d.site.title.toUpperCase();

    setText('hero-label', d.hero.label);
    setText('hero-title', d.hero.title);
    setText('hero-desc', d.hero.desc);
    setText('hero-btn1', d.hero.btn1);
    setText('hero-btn2', d.hero.btn2);
    const heroBg = document.getElementById('hero');
    if (heroBg && d.hero.image) {
      heroBg.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.35)), url('${d.hero.image}')`;
      heroBg.style.backgroundSize = 'cover';
      heroBg.style.backgroundPosition = 'center 30%';
    }

    setText('about-subtitle', d.about.subtitle);
    setText('about-title', d.about.title);
    setText('about-para1', d.about.para1);
    setText('about-para2', d.about.para2);
    setText('about-quote', d.about.quote);

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

    setText('fund-subtitle', d.fundamentals.subtitle);
    setText('fund-title', d.fundamentals.title);
    setText('fund-para1', d.fundamentals.para1);
    setText('fund-para2', d.fundamentals.para2);
    const fundImg = document.getElementById('fund-image');
    if (fundImg && d.fundamentals.image) fundImg.src = d.fundamentals.image;
    const fundItems = document.getElementById('fund-items');
    if (fundItems) {
      fundItems.innerHTML = (d.fundamentals.items || []).map(item => `
        <li class="flex items-start">
          <span class="text-emerald-600 mr-2 font-bold">✓</span>
          <span class="text-gray-700">${esc(item)}</span>
        </li>
      `).join('');
    }

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

    setText('news-subtitle', d.news?.subtitle);
    setText('news-title', d.news?.title);
    setText('news-desc', d.news?.desc);
    const newsGrid = document.getElementById('news-grid');
    if (newsGrid) {
      const items = d.news?.items || [];
      newsGrid.innerHTML = items.map(n => `
        <article class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col">
          <a href="article.html?id=${encodeURIComponent(n.id)}" class="block aspect-[16/10] overflow-hidden bg-gray-100">
            <img src="${escAttr(n.image)}" alt="${escAttr(n.title)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          </a>
          <div class="p-5 flex flex-col flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">${esc(n.category)}</span>
              <time datetime="${escAttr(n.date)}" class="text-xs text-gray-400">${formatDate(n.date)}</time>
            </div>
            <h3 class="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-800 transition">
              <a href="article.html?id=${encodeURIComponent(n.id)}">${esc(n.title)}</a>
            </h3>
            <p class="text-sm text-gray-600 line-clamp-3 flex-1">${esc(n.excerpt)}</p>
            <a href="article.html?id=${encodeURIComponent(n.id)}" class="mt-3 inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800">
              Baca selengkapnya
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </article>
      `).join('');
    }

    setText('gallery-subtitle', d.gallery?.subtitle);
    setText('gallery-title', d.gallery?.title);
    setText('gallery-desc', d.gallery?.desc);
    const track = document.getElementById('gallery-track');
    const dots = document.getElementById('gallery-dots');
    if (track) {
      const items = d.gallery?.items || [];
      window.__galleryItems = items;
      track.innerHTML = items.map((g, i) => `
        <div class="snap-center shrink-0 w-[85%] sm:w-[45%] lg:w-[32%] xl:w-[24%]" data-slide="${i}">
          <button onclick="openLightbox(${i})" class="group block relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 w-full">
            <img src="${escAttr(g.image)}" alt="${escAttr(g.caption)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
              <span class="text-white text-sm font-medium text-left line-clamp-2">${esc(g.caption)}</span>
            </div>
          </button>
        </div>
      `).join('');
      if (dots) {
        dots.innerHTML = items.map((_, i) => `
          <button onclick="goToSlide(${i})" class="w-2.5 h-2.5 rounded-full bg-emerald-200 hover:bg-emerald-400 transition" data-dot="${i}" aria-label="Slide ${i+1}"></button>
        `).join('');
        setTimeout(updateDots, 100);
      }
      track.addEventListener('scroll', updateDots);
    }

    const footDesc = document.getElementById('foot-desc');
    if (footDesc) footDesc.innerHTML = `${esc(d.footer.companyName)}<br>${esc(d.footer.tagline)}`;
    setText('foot-address', d.footer.address);
    const footEmail = document.getElementById('foot-email');
    if (footEmail) footEmail.innerHTML = `<a href="mailto:${escAttr(d.footer.email)}" class="hover:text-emerald-400 transition">${esc(d.footer.email)}</a>`;
    setText('foot-phone', d.footer.phone);
    setText('foot-copy', d.footer.copyright);

    const ogTitle = document.getElementById('og-title');
    if (ogTitle) ogTitle.setAttribute('content', d.site.title + ' — ' + d.hero.title);
    const ogDesc = document.getElementById('og-desc');
    if (ogDesc) ogDesc.setAttribute('content', d.site.metaDescription);
    const ogImg = document.getElementById('og-image');
    if (ogImg) ogImg.setAttribute('content', d.hero.image);
    const ldOrg = document.getElementById('json-ld-org');
    if (ldOrg) {
      ldOrg.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": d.footer.companyName,
        "url": location.origin + location.pathname,
        "email": d.footer.email,
        "telephone": d.footer.phone,
        "address": { "@type": "PostalAddress", "addressLocality": d.footer.address }
      });
    }
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value ?? '';
  }

  window.prevSlide = function () {
    const track = document.getElementById('gallery-track');
    if (!track) return;
    const first = track.querySelector('[data-slide]');
    if (!first) return;
    const w = first.offsetWidth + 16;
    track.scrollBy({ left: -w, behavior: 'smooth' });
  };
  window.nextSlide = function () {
    const track = document.getElementById('gallery-track');
    if (!track) return;
    const first = track.querySelector('[data-slide]');
    if (!first) return;
    const w = first.offsetWidth + 16;
    track.scrollBy({ left: w, behavior: 'smooth' });
  };
  window.goToSlide = function (i) {
    const track = document.getElementById('gallery-track');
    if (!track) return;
    const target = track.querySelector(`[data-slide="${i}"]`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };
  function updateDots() {
    const track = document.getElementById('gallery-track');
    if (!track) return;
    const slides = Array.from(track.querySelectorAll('[data-slide]'));
    if (!slides.length) return;
    const trackCenter = track.scrollLeft + track.offsetWidth / 2;
    let active = 0;
    let minDist = Infinity;
    slides.forEach((s, i) => {
      const slideCenter = s.offsetLeft + s.offsetWidth / 2;
      const dist = Math.abs(trackCenter - slideCenter);
      if (dist < minDist) { minDist = dist; active = i; }
    });
    document.querySelectorAll('[data-dot]').forEach((dot, i) => {
      dot.classList.toggle('bg-emerald-600', i === active);
      dot.classList.toggle('bg-emerald-200', i !== active);
    });
  }

  let lbIndex = 0;
  window.openLightbox = function (i) {
    lbIndex = i;
    updateLightbox();
    const lb = document.getElementById('lightbox');
    if (lb) { lb.classList.remove('hidden'); lb.classList.add('flex'); }
    document.body.style.overflow = 'hidden';
  };
  window.closeLightbox = function () {
    const lb = document.getElementById('lightbox');
    if (lb) { lb.classList.add('hidden'); lb.classList.remove('flex'); }
    document.body.style.overflow = '';
  };
  window.prevLightbox = function () {
    const items = window.__galleryItems || [];
    if (!items.length) return;
    lbIndex = (lbIndex - 1 + items.length) % items.length;
    updateLightbox();
  };
  window.nextLightbox = function () {
    const items = window.__galleryItems || [];
    if (!items.length) return;
    lbIndex = (lbIndex + 1) % items.length;
    updateLightbox();
  };
  function updateLightbox() {
    const items = window.__galleryItems || [];
    const item = items[lbIndex];
    if (!item) return;
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    if (img) { img.src = item.image; img.alt = item.caption; }
    if (cap) cap.textContent = item.caption;
  }
  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb || lb.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
  window.addEventListener('data-updated', render);
  window.addEventListener('storage', (e) => {
    if (e.key === 'prime_agri_data_v1') render();
  });
})();