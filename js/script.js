// Hülya Uşan – Sanat Portfolyosu / Genel Script

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollReveal();
  initFilters();
  initLightbox();
});

// ---------- Mobil menü ----------

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
}

// ---------- Scroll-reveal ----------
// Tek bir elemana "reveal" class'ı eklenebilir, ya da bir kapsayıcıya
// "reveal-group" eklenirse çocukları otomatik olarak (kademeli gecikmeyle)
// "reveal" class'ı alır.

function initScrollReveal() {
  document.querySelectorAll('.reveal-group').forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      child.classList.add('reveal');
      child.style.setProperty('--i', i);
    });
  });

  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

// ---------- Eserler sayfası: kategori filtresi ----------

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');
  if (!filterBtns.length || !workCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;

      workCards.forEach((card) => {
        const match = category === 'tumu' || card.dataset.category === category;
        if (match) {
          card.style.display = '';
          // Bir sonraki frame'de class kaldırılınca CSS geçişi tetiklenir.
          requestAnimationFrame(() => card.classList.remove('card-hidden'));
        } else {
          card.classList.add('card-hidden');
          setTimeout(() => {
            if (card.classList.contains('card-hidden')) card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

// ---------- Lightbox (eser fotoğrafına tıklayınca büyük gösterim) ----------

function initLightbox() {
  const thumbImages = document.querySelectorAll('.work-card .thumb img');
  if (!thumbImages.length) return; // henüz gerçek fotoğraf eklenmemiş

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Kapat">&times;</button>
    <button class="lightbox-prev" aria-label="Önceki">&#10094;</button>
    <img class="lightbox-img" src="" alt="">
    <button class="lightbox-next" aria-label="Sonraki">&#10095;</button>
  `;
  document.body.appendChild(lightbox);

  const imgEl = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;

  function getVisibleImages() {
    return Array.from(document.querySelectorAll('.work-card .thumb img')).filter((img) => {
      const card = img.closest('.work-card');
      return card && card.style.display !== 'none' && !card.classList.contains('card-hidden');
    });
  }

  function show(index) {
    const images = getVisibleImages();
    if (!images.length) return;
    currentIndex = (index + images.length) % images.length;
    const target = images[currentIndex];
    imgEl.src = target.currentSrc || target.src;
    imgEl.alt = target.alt || '';
  }

  function open(index) {
    show(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const img = e.target.closest('.work-card .thumb img');
    if (!img) return;
    const images = getVisibleImages();
    const index = images.indexOf(img);
    if (index !== -1) open(index);
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(currentIndex - 1));
  nextBtn.addEventListener('click', () => show(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  });
}
