/* ============================================================
   LUXURY REAL ESTATE — SHARED UTILITIES
   ============================================================ */

/* --- Navigation Scroll Effect --- */
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile toggle */
  const toggle = document.querySelector('.nav__toggle');
  const mobile = document.querySelector('.nav__mobile');

  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      mobile.classList.toggle('active');
      document.body.style.overflow = mobile.classList.contains('active') ? 'hidden' : '';
    });

    mobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        mobile.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
})();

/* --- Scroll Reveal --- */
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(function () {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();

/* --- Smooth anchor scrolling --- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* --- Current year in footer --- */
(function setYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
