/* =========================================================
   ARTICLE PAGE RENDERER
   ========================================================= */

(function () {
  'use strict';

  function escHtml(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return iso; }
  }

  function render() {
    const d = DataStore.get();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const items = d.news?.items || [];
    const article = items.find(n => n.id === id);

    const navLogo = document.getElementById('nav-logo');
    const navTitle = document.getElementById('nav-title');
    if (navLogo) navLogo.textContent = d.site.favicon || 'P';
    if (navTitle) navTitle.textContent = d.site.title.toUpperCase();
    const footCopy = document.getElementById('foot-copy');
    if (footCopy) footCopy.textContent = d.footer.copyright;

    const loading = document.getElementById('article-loading');
    const content = document.getElementById('article-content');
    const error = document.getElementById('article-error');

    if (!article) {
      if (loading) loading.classList.add('hidden');
      if (error) error.classList.remove('hidden');
      return;
    }

    document.title = article.title + ' — ' + d.site.title;
    const setMeta = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('content', val);
    };
    setMeta('og-title', article.title);
    setMeta('og-desc', article.excerpt);
    setMeta('og-image', article.image);
    const canonical = document.getElementById('canonical');
    if (canonical) canonical.setAttribute('href', location.origin + location.pathname + '?id=' + encodeURIComponent(article.id));
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', article.excerpt);

    const catEl = document.getElementById('art-category');
    if (catEl) catEl.textContent = article.category;
    const dateEl = document.getElementById('art-date');
    if (dateEl) {
      dateEl.textContent = formatDate(article.date);
      dateEl.setAttribute('datetime', article.date);
    }
    const titleEl = document.getElementById('art-title');
    if (titleEl) titleEl.textContent = article.title;
    const authorEl = document.getElementById('art-author');
    if (authorEl) authorEl.textContent = 'Oleh ' + article.author;
    const img = document.getElementById('art-image');
    if (img) { img.src = article.image; img.alt = article.title; }
    const body = document.getElementById('art-body');
    if (body) body.innerHTML = article.content || `<p>${escHtml(article.excerpt)}</p>`;

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": article.title,
      "image": [article.image],
      "datePublished": article.date,
      "dateModified": article.date,
      "author": { "@type": "Person", "name": article.author },
      "publisher": {
        "@type": "Organization",
        "name": d.footer.companyName,
        "logo": { "@type": "ImageObject", "url": location.origin + '/logo.png' }
      },
      "description": article.excerpt
    });
    document.head.appendChild(ld);

    const bc = document.createElement('script');
    bc.type = 'application/ld+json';
    bc.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": location.origin + '/' },
        { "@type": "ListItem", "position": 2, "name": "Berita", "item": location.origin + '/index.html#news' },
        { "@type": "ListItem", "position": 3, "name": article.title }
      ]
    });
    document.head.appendChild(bc);

    if (loading) loading.classList.add('hidden');
    if (content) content.classList.remove('hidden');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();