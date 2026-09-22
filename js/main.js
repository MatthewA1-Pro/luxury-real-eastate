/* ============================================================
   LUXURY REAL ESTATE — SHARED UTILITIES (Enhanced with 3D Effects)
   ============================================================ */

/* --- Navigation Scroll Effect --- */
(function initNav() {
  var nav = document.querySelector('.nav');
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
  var toggle = document.querySelector('.nav__toggle');
  var mobile = document.querySelector('.nav__mobile');

  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      mobile.classList.toggle('active');
      document.body.style.overflow = mobile.classList.contains('active') ? 'hidden' : '';
    });

    mobile.querySelectorAll('a, button').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        mobile.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
})();

/* ============================================================
   GSAP ScrollTrigger — Enhanced 3D Scroll Reveals
   ============================================================ */
(function initScrollReveals() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    /* Fallback to basic IntersectionObserver if GSAP isn't available */
    var reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = entry.target.dataset.delay || 0;
            setTimeout(function () {
              entry.target.classList.add('revealed');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) { observer.observe(el); });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* Standard reveals with 3D rotation */
  gsap.utils.toArray('.reveal').forEach(function (el) {
    var delay = (parseInt(el.dataset.delay, 10) || 0) / 1000;
    gsap.fromTo(el,
      { y: 60, rotateX: 8, opacity: 0, transformOrigin: 'bottom center' },
      {
        y: 0, rotateX: 0, opacity: 1, duration: 1.2,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  /* Left reveals */
  gsap.utils.toArray('.reveal-left').forEach(function (el) {
    gsap.fromTo(el,
      { x: -80, rotateY: 10, opacity: 0, transformOrigin: 'left center' },
      {
        x: 0, rotateY: 0, opacity: 1, duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  /* Right reveals */
  gsap.utils.toArray('.reveal-right').forEach(function (el) {
    gsap.fromTo(el,
      { x: 80, rotateY: -10, opacity: 0, transformOrigin: 'right center' },
      {
        x: 0, rotateY: 0, opacity: 1, duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  /* Scale reveals from depth */
  gsap.utils.toArray('.reveal-scale').forEach(function (el) {
    gsap.fromTo(el,
      { scale: 0.85, z: -80, opacity: 0 },
      {
        scale: 1, z: 0, opacity: 1, duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  /* CTA Section parallax background */
  var ctaBg = document.querySelector('.cta-section__bg img');
  if (ctaBg) {
    gsap.fromTo(ctaBg,
      { yPercent: -15, scale: 1.15 },
      {
        yPercent: 15, scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6
        }
      }
    );
  }

  /* About section image parallax */
  var aboutImg = document.querySelector('.about__image img');
  if (aboutImg) {
    gsap.fromTo(aboutImg,
      { yPercent: -8, scale: 1.1 },
      {
        yPercent: 8, scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about__image',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5
        }
      }
    );
  }
})();

/* ============================================================
   3D TILT CARDS — Mouse-tracking perspective rotation
   ============================================================ */
(function initTiltCards() {
  if (window.matchMedia('(pointer: coarse)').matches) return; /* Skip on touch devices */

  var cards = document.querySelectorAll('.property-card');
  if (!cards.length) return;

  var TILT_MAX = 12; /* degrees */
  var GLOW_RADIUS = 280; /* px */

  cards.forEach(function (card) {
    /* Add glow element */
    var glow = document.createElement('div');
    glow.className = 'property-card__glow';
    card.appendChild(glow);

    card.addEventListener('mouseenter', function () {
      card.style.transition = 'none';
    });

    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var cx = e.clientX - rect.left;
      var cy = e.clientY - rect.top;

      /* Normalise -1 → 1 */
      var nx = (cx / rect.width - 0.5) * 2;
      var ny = (cy / rect.height - 0.5) * 2;

      var rotateY = nx * TILT_MAX;
      var rotateX = -ny * TILT_MAX;

      card.style.transform =
        'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(12px) scale3d(1.02, 1.02, 1.02)';

      /* Radial glow follows cursor */
      glow.style.background =
        'radial-gradient(circle ' + GLOW_RADIUS + 'px at ' + cx + 'px ' + cy + 'px, rgba(223,197,98,0.12), transparent 70%)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0) scale3d(1, 1, 1)';
      glow.style.background = 'none';
    });
  });
})();

/* ============================================================
   MAGNETIC BUTTONS — Subtle cursor-following effect
   ============================================================ */
(function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  var buttons = document.querySelectorAll('.btn--primary, .btn--outline, .nav__cta, .hero__cta');
  if (!buttons.length) return;

  var PULL_STRENGTH = 0.35;

  buttons.forEach(function (btn) {
    btn.classList.add('btn--magnetic');

    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var cx = e.clientX - rect.left - rect.width / 2;
      var cy = e.clientY - rect.top - rect.height / 2;

      btn.style.transform =
        'translate(' + (cx * PULL_STRENGTH) + 'px, ' + (cy * PULL_STRENGTH) + 'px)';
    });

    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
})();

/* --- Smooth anchor scrolling --- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* --- Current year in footer --- */
(function setYear() {
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

/* ============================================================
   COUNTER ANIMATION — animates any [data-count] stat into view
   ============================================================ */
(function initCounters() {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.dataset.count, 10);
          var duration = 2000;
          var startTime = performance.now();

          function animate(now) {
            var elapsed = now - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + '+';
            if (progress < 1) requestAnimationFrame(animate);
          }

          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (el) { observer.observe(el); });
})();

/* ============================================================
   INTERACTIVE MORTGAGE & WEALTH CALCULATOR
   ============================================================ */
(function initWealthCalculator() {
  var priceInput = document.getElementById('calc-price');
  var downInput = document.getElementById('calc-down');
  var rateInput = document.getElementById('calc-rate');
  var termInput = document.getElementById('calc-term');
  if (!priceInput || !downInput || !rateInput || !termInput) return;

  function formatMoney(num) {
    return '$' + Math.round(num).toLocaleString();
  }

  function update() {
    var price = parseFloat(priceInput.value);
    var downPct = parseFloat(downInput.value) / 100;
    var rate = parseFloat(rateInput.value) / 100;
    var term = parseInt(termInput.value, 10);

    document.getElementById('calc-price-val').textContent = formatMoney(price);
    document.getElementById('calc-down-val').textContent = Math.round(downPct * 100) + '%';
    document.getElementById('calc-rate-val').textContent = (rate * 100).toFixed(2) + '%';
    document.getElementById('calc-term-val').textContent = term + ' Years';

    var downAmt = price * downPct;
    var loanAmt = price - downAmt;
    var monthlyRate = rate / 12;
    var n = term * 12;

    var monthly = (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    if (isNaN(monthly)) monthly = 0;

    var equity10 = price * Math.pow(1.048, 10);

    document.getElementById('calc-monthly').textContent = formatMoney(monthly) + ' /mo';
    document.getElementById('calc-down-amt').textContent = formatMoney(downAmt);
    document.getElementById('calc-equity').textContent = formatMoney(equity10);
  }

  [priceInput, downInput, rateInput, termInput].forEach(function (el) {
    el.addEventListener('input', update);
  });
  update();
})();
