/* ============================================================
   HOMEPAGE — ANIMATIONS & INTERACTIONS (Enhanced with 3D Effects)
   ============================================================

   ╔═══════════════════════════════════════════════╗
   ║  PROPERTY DATA — EDIT THIS SECTION            ║
   ║  To update featured properties, simply edit   ║
   ║  the objects in the array below.              ║
   ╚═══════════════════════════════════════════════╝
*/

var FEATURED_PROPERTIES = [
  {
    id: 1,
    name: "The Meridian Villa",
    location: "Malibu, California",
    price: "$12,500,000",
    beds: 6,
    baths: 8,
    sqft: "9,200",
    badge: "For Sale",
    badgeType: "sale",
    image: "images/property-1.png"
  },
  {
    id: 2,
    name: "Villa Serenata",
    location: "Tuscany, Italy",
    price: "$8,750,000",
    beds: 5,
    baths: 6,
    sqft: "7,800",
    badge: "New",
    badgeType: "new",
    image: "images/property-2.png"
  },
  {
    id: 3,
    name: "The Azure Estate",
    location: "Saint-Tropez, France",
    price: "$15,200,000",
    beds: 7,
    baths: 9,
    sqft: "11,500",
    badge: "For Sale",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
  }
];

/* ============================================================
   RENDER FEATURED PROPERTIES
   ============================================================ */
(function renderFeatured() {
  var grid = document.getElementById('featured-grid');
  if (!grid) return;

  grid.innerHTML = FEATURED_PROPERTIES.map(function (p, i) {
    return '\
      <a href="listing.html?id=' + p.id + '" class="property-card reveal" data-delay="' + (i * 150) + '">\
        <div class="property-card__image">\
          <img src="' + p.image + '" alt="' + p.name + '" loading="lazy" />\
          <span class="property-card__badge property-card__badge--' + p.badgeType + '">' + p.badge + '</span>\
          <button class="property-card__favorite" aria-label="Save property" onclick="event.preventDefault(); this.classList.toggle(\'active\');">\
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>\
          </button>\
          <div class="property-card__overlay"></div>\
        </div>\
        <div class="property-card__body">\
          <div class="property-card__location">\
            <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>\
            ' + p.location + '\
          </div>\
          <h3 class="property-card__name">' + p.name + '</h3>\
          <div class="property-card__price">' + p.price + '</div>\
          <div class="property-card__stats">\
            <div class="property-card__stat">\
              <svg viewBox="0 0 24 24"><path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7M21 10H3M7 20V10m5 10V10m5 10V10"/></svg>\
              ' + p.beds + ' Beds\
            </div>\
            <div class="property-card__stat">\
              <svg viewBox="0 0 24 24"><path d="M4 12h16a1 1 0 011 1v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a1 1 0 011-1zM6 12V5a2 2 0 012-2h3a2 2 0 012 2v7"/></svg>\
              ' + p.baths + ' Baths\
            </div>\
            <div class="property-card__stat">\
              <svg viewBox="0 0 24 24"><path d="M3 21h18M3 7l9-4 9 4M5 7v14M19 7v14"/></svg>\
              ' + p.sqft + ' sqft\
            </div>\
          </div>\
        </div>\
      </a>';
  }).join('');
})();

/* ============================================================
   GSAP CUSTOM EASES
   ============================================================ */
gsap.registerEase("heroReveal",
  function (p) {
    return 1 - Math.pow(1 - p, 4);
  }
);

gsap.registerEase("contentReveal",
  function (p) {
    return p < 0.5
      ? 4 * p * p * p
      : 1 - Math.pow(-2 * p + 2, 3) / 2;
  }
);

/* ============================================================
   FLOATING PARTICLES — Canvas-based atmospheric dust motes
   ============================================================ */
(function initParticles() {
  var canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var PARTICLE_COUNT = 60;
  var animationId = null;
  var heroEl = document.getElementById('hero');

  function resize() {
    var rect = heroEl.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio > 1 ? 1.5 : 1);
    canvas.height = rect.height * (window.devicePixelRatio > 1 ? 1.5 : 1);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.35 - 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      fadeSpeed: Math.random() * 0.003 + 0.001,
      fadeDir: 1,
      /* Golden-warm hue with slight variation */
      hue: 38 + Math.random() * 20,
      sat: 50 + Math.random() * 30,
      light: 75 + Math.random() * 20
    };
  }

  function init() {
    resize();
    particles = [];
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      /* Move */
      p.x += p.speedX;
      p.y += p.speedY;

      /* Oscillating opacity (twinkling) */
      p.opacity += p.fadeSpeed * p.fadeDir;
      if (p.opacity >= 0.6) { p.fadeDir = -1; }
      if (p.opacity <= 0.05) { p.fadeDir = 1; }

      /* Recycle if out of bounds */
      if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
        p.x = Math.random() * canvas.width;
        p.y = canvas.height + 10;
        p.opacity = 0.05;
        p.fadeDir = 1;
      }

      /* Draw */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + p.hue + ', ' + p.sat + '%, ' + p.light + '%, ' + p.opacity + ')';
      ctx.fill();

      /* Subtle glow on larger particles */
      if (p.size > 1.4) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + p.hue + ', ' + p.sat + '%, ' + p.light + '%, ' + (p.opacity * 0.15) + ')';
        ctx.fill();
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  init();
  draw();

  window.addEventListener('resize', function () {
    resize();
  });

  /* Pause when not visible */
  var particleObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      if (!animationId) draw();
    } else {
      if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
    }
  }, { threshold: 0.01 });

  particleObserver.observe(heroEl);
})();

/* ============================================================
   HERO INTRO ANIMATION (Enhanced with 3D depth)
   ============================================================ */
(function heroIntro() {

  var IS_PHONE = window.matchMedia("(max-width: 767px)").matches;
  var IS_TABLET = window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches;

  /* Overlay image elements */
  var leftEl = document.getElementById('overlay-left');
  var rightEl = document.getElementById('overlay-right');
  var topEl = document.getElementById('overlay-top');
  var bottomEl = document.getElementById('overlay-bottom');

  var leftInner = leftEl ? leftEl.querySelector('img') : null;
  var rightInner = rightEl ? rightEl.querySelector('img') : null;
  var topInner = topEl ? topEl.querySelector('img') : null;
  var bottomInner = bottomEl ? bottomEl.querySelector('img') : null;

  /* Outside offsets */
  var LEFT_OUTSIDE = IS_PHONE ? -42 : IS_TABLET ? -32 : -25;
  var RIGHT_OUTSIDE = IS_PHONE ? 20 : IS_TABLET ? 28 : 11;
  var TOP_OUTSIDE = IS_PHONE ? -12 : IS_TABLET ? -13 : -9;
  var BOTTOM_OUTSIDE = IS_PHONE ? 20 : IS_TABLET ? 32 : 25;

  /* Inner parallax */
  var LEFT_PARALLAX = IS_PHONE ? -6 : IS_TABLET ? -5 : -4;
  var RIGHT_PARALLAX = IS_PHONE ? 4 : IS_TABLET ? 3 : 1.8;
  var TOP_PARALLAX = IS_PHONE ? -3 : IS_TABLET ? -2.2 : -1.5;
  var BOTTOM_PARALLAX = IS_PHONE ? 6 : IS_TABLET ? 5 : 4;

  var DURATION = 2.9;

  /* Initial: overlay images scaled up to cover */
  gsap.set([leftEl, rightEl, topEl, bottomEl].filter(Boolean), {
    scale: IS_PHONE ? 3 : 2,
    xPercent: 0,
    yPercent: 0,
    force3D: true,
    transformPerspective: 1200
  });

  gsap.set([leftInner, rightInner, topInner, bottomInner].filter(Boolean), {
    scale: 1.04,
    xPercent: 0,
    yPercent: 0,
    force3D: true
  });

  /* Content elements */
  var heading = document.getElementById('hero-heading');
  var description = document.getElementById('hero-description');
  var slides = gsap.utils.toArray('#hero-slider .swiper-slide');
  var circleBtn = document.getElementById('hero-circle-btn');
  var scrollIndicator = document.getElementById('hero-scroll-indicator');

  if (heading) gsap.set(heading, { y: -28, autoAlpha: 0, rotationX: -12, force3D: true, transformPerspective: 1000 });
  if (description) gsap.set(description, { y: 26, autoAlpha: 0, rotationX: 8, force3D: true, transformPerspective: 1000 });
  if (slides.length) gsap.set(slides, { y: -36, autoAlpha: 0, rotationY: -6, force3D: true, transformPerspective: 1000 });
  if (circleBtn) gsap.set(circleBtn, { y: 20, scale: 0.94, autoAlpha: 0, force3D: true });

  /* Initialize hero slider */
  var heroSwiper = new Swiper('#hero-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    speed: 700,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: {
      el: '#hero-pagination',
      clickable: true
    },
    breakpoints: {
      768: { slidesPerView: 1.3 },
      1024: { slidesPerView: 1.5, spaceBetween: 24 }
    }
  });

  /* Wait a frame for swiper init */
  requestAnimationFrame(function () {

    var paginationBullets = gsap.utils.toArray('#hero-pagination .swiper-pagination-bullet');

    gsap.set(paginationBullets, {
      y: 5, scaleX: 0.45, scaleY: 0.7,
      transformOrigin: 'center center', force3D: true
    });

    /* Master timeline */
    var tl = gsap.timeline();

    /* IMAGE REVEAL with 3D depth */
    if (leftEl) tl.to(leftEl, { scale: 1, xPercent: LEFT_OUTSIDE, duration: DURATION, ease: 'heroReveal' }, 0);
    if (leftInner) tl.to(leftInner, { scale: 1, xPercent: LEFT_PARALLAX, duration: DURATION + 0.2, ease: 'heroReveal' }, 0);

    if (rightEl) tl.to(rightEl, { scale: 1, xPercent: RIGHT_OUTSIDE, duration: DURATION, ease: 'heroReveal' }, 0.04);
    if (rightInner) tl.to(rightInner, { scale: 1, xPercent: RIGHT_PARALLAX, duration: DURATION + 0.2, ease: 'heroReveal' }, 0.04);

    if (topEl) tl.to(topEl, { scale: 1, yPercent: TOP_OUTSIDE, duration: DURATION, ease: 'heroReveal' }, 0.08);
    if (topInner) tl.to(topInner, { scale: 1, yPercent: TOP_PARALLAX, duration: DURATION + 0.2, ease: 'heroReveal' }, 0.08);

    if (bottomEl) tl.to(bottomEl, { scale: 1, yPercent: BOTTOM_OUTSIDE, duration: DURATION, ease: 'heroReveal' }, 0.12);
    if (bottomInner) tl.to(bottomInner, { scale: 1, yPercent: BOTTOM_PARALLAX, duration: DURATION + 0.2, ease: 'heroReveal' }, 0.12);

    /* CONTENT REVEAL with 3D rotations */
    var CS = 2.52;

    if (heading) tl.to(heading, { y: 0, autoAlpha: 1, rotationX: 0, duration: 1.05, ease: 'contentReveal' }, CS);
    if (description) tl.to(description, { y: 0, autoAlpha: 1, rotationX: 0, duration: 1, ease: 'contentReveal' }, CS + 0.1);

    if (slides.length) {
      tl.to(slides, {
        y: 0, autoAlpha: 1, rotationY: 0, duration: 0.74,
        stagger: { each: 0.055, from: 'start' },
        ease: 'power3.out', force3D: true
      }, CS + 0.06);
    }

    if (circleBtn) {
      tl.to(circleBtn, { y: 0, scale: 1, autoAlpha: 1, duration: 0.9, ease: 'contentReveal' }, CS + 0.24);
    }

    if (paginationBullets.length) {
      tl.to(paginationBullets, {
        y: 0, scaleX: 1, scaleY: 1, duration: 0.48,
        stagger: { each: 0.055, from: 'start' },
        ease: 'power3.out', force3D: true
      }, CS + 0.52);
    }

    /* CUSTOM CURSOR + MOUSE PARALLAX */
    var heroRoot = document.getElementById('hero');

    if (heroRoot && window.matchMedia('(pointer: fine)').matches) {
      var cursor = document.createElement('div');
      cursor.className = 'hero-custom-cursor';
      document.body.appendChild(cursor);
      gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0.8 });

      var cursorX = gsap.quickTo(cursor, 'x', { duration: 0.32, ease: 'power3.out' });
      var cursorY = gsap.quickTo(cursor, 'y', { duration: 0.32, ease: 'power3.out' });

      var MOUSE_X_OUTER = 1.5;
      var MOUSE_Y_OUTER = 1.3;
      var MOUSE_X_INNER = 0.35;
      var MOUSE_Y_INNER = 0.30;

      /* Quick setters for outer images */
      var moveLeftX = leftEl ? gsap.quickTo(leftEl, 'xPercent', { duration: 1, ease: 'power2.out' }) : null;
      var moveLeftY = leftEl ? gsap.quickTo(leftEl, 'yPercent', { duration: 1, ease: 'power2.out' }) : null;
      var moveRightX = rightEl ? gsap.quickTo(rightEl, 'xPercent', { duration: 1, ease: 'power2.out' }) : null;
      var moveRightY = rightEl ? gsap.quickTo(rightEl, 'yPercent', { duration: 1, ease: 'power2.out' }) : null;
      var moveTopX = topEl ? gsap.quickTo(topEl, 'xPercent', { duration: 1, ease: 'power2.out' }) : null;
      var moveTopY = topEl ? gsap.quickTo(topEl, 'yPercent', { duration: 1, ease: 'power2.out' }) : null;
      var moveBottomX = bottomEl ? gsap.quickTo(bottomEl, 'xPercent', { duration: 1, ease: 'power2.out' }) : null;
      var moveBottomY = bottomEl ? gsap.quickTo(bottomEl, 'yPercent', { duration: 1, ease: 'power2.out' }) : null;

      /* Inner image setters */
      var moveLeftInnerX = leftInner ? gsap.quickTo(leftInner, 'xPercent', { duration: 1.15, ease: 'power2.out' }) : null;
      var moveLeftInnerY = leftInner ? gsap.quickTo(leftInner, 'yPercent', { duration: 1.15, ease: 'power2.out' }) : null;
      var moveRightInnerX = rightInner ? gsap.quickTo(rightInner, 'xPercent', { duration: 1.15, ease: 'power2.out' }) : null;
      var moveRightInnerY = rightInner ? gsap.quickTo(rightInner, 'yPercent', { duration: 1.15, ease: 'power2.out' }) : null;
      var moveTopInnerX = topInner ? gsap.quickTo(topInner, 'xPercent', { duration: 1.15, ease: 'power2.out' }) : null;
      var moveTopInnerY = topInner ? gsap.quickTo(topInner, 'yPercent', { duration: 1.15, ease: 'power2.out' }) : null;
      var moveBottomInnerX = bottomInner ? gsap.quickTo(bottomInner, 'xPercent', { duration: 1.15, ease: 'power2.out' }) : null;
      var moveBottomInnerY = bottomInner ? gsap.quickTo(bottomInner, 'yPercent', { duration: 1.15, ease: 'power2.out' }) : null;

      /* 3D Rotation setters for hero background */
      var heroScene = document.getElementById('hero-overlays');
      var moveSceneRotX = heroScene ? gsap.quickTo(heroScene, 'rotationX', { duration: 1.2, ease: 'power2.out' }) : null;
      var moveSceneRotY = heroScene ? gsap.quickTo(heroScene, 'rotationY', { duration: 1.2, ease: 'power2.out' }) : null;

      var interactionEnabled = false;
      tl.eventCallback('onComplete', function () { interactionEnabled = true; });

      heroRoot.addEventListener('mouseenter', function (e) {
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        gsap.to(cursor, { autoAlpha: 1, scale: 1, duration: 0.28, ease: 'power3.out' });
      });

      heroRoot.addEventListener('mousemove', function (e) {
        cursorX(e.clientX);
        cursorY(e.clientY);
        if (!interactionEnabled) return;

        var rect = heroRoot.getBoundingClientRect();
        var nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        var ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        nx = gsap.utils.clamp(-1, 1, nx);
        ny = gsap.utils.clamp(-1, 1, ny);

        var sceneX = nx * MOUSE_X_OUTER;
        var sceneY = ny * MOUSE_Y_OUTER;

        /* 3D Scene rotation — subtle tilt of the entire depth scene */
        if (moveSceneRotX) moveSceneRotX(-ny * 3);
        if (moveSceneRotY) moveSceneRotY(nx * 4);

        if (moveLeftX) moveLeftX(LEFT_OUTSIDE + sceneX);
        if (moveLeftY) moveLeftY(sceneY);
        if (moveRightX) moveRightX(RIGHT_OUTSIDE + sceneX);
        if (moveRightY) moveRightY(sceneY);
        if (moveTopX) moveTopX(sceneX);
        if (moveTopY) moveTopY(TOP_OUTSIDE + sceneY);
        if (moveBottomX) moveBottomX(sceneX);
        if (moveBottomY) moveBottomY(BOTTOM_OUTSIDE + sceneY);

        var innerX = nx * MOUSE_X_INNER;
        var innerY = ny * MOUSE_Y_INNER;

        if (moveLeftInnerX) moveLeftInnerX(LEFT_PARALLAX - innerX);
        if (moveLeftInnerY) moveLeftInnerY(-innerY);
        if (moveRightInnerX) moveRightInnerX(RIGHT_PARALLAX - innerX);
        if (moveRightInnerY) moveRightInnerY(-innerY);
        if (moveTopInnerX) moveTopInnerX(-innerX);
        if (moveTopInnerY) moveTopInnerY(TOP_PARALLAX - innerY);
        if (moveBottomInnerX) moveBottomInnerX(-innerX);
        if (moveBottomInnerY) moveBottomInnerY(BOTTOM_PARALLAX - innerY);
      });

      heroRoot.addEventListener('mouseleave', function () {
        gsap.to(cursor, { autoAlpha: 0, scale: 0.8, duration: 0.25, ease: 'power3.out' });
        if (!interactionEnabled) return;

        /* Reset 3D rotation */
        if (moveSceneRotX) moveSceneRotX(0);
        if (moveSceneRotY) moveSceneRotY(0);

        if (moveLeftX) moveLeftX(LEFT_OUTSIDE);
        if (moveLeftY) moveLeftY(0);
        if (moveRightX) moveRightX(RIGHT_OUTSIDE);
        if (moveRightY) moveRightY(0);
        if (moveTopX) moveTopX(0);
        if (moveTopY) moveTopY(TOP_OUTSIDE);
        if (moveBottomX) moveBottomX(0);
        if (moveBottomY) moveBottomY(BOTTOM_OUTSIDE);

        if (moveLeftInnerX) moveLeftInnerX(LEFT_PARALLAX);
        if (moveLeftInnerY) moveLeftInnerY(0);
        if (moveRightInnerX) moveRightInnerX(RIGHT_PARALLAX);
        if (moveRightInnerY) moveRightInnerY(0);
        if (moveTopInnerX) moveTopInnerX(0);
        if (moveTopInnerY) moveTopInnerY(TOP_PARALLAX);
        if (moveBottomInnerX) moveBottomInnerX(0);
        if (moveBottomInnerY) moveBottomInnerY(BOTTOM_PARALLAX);
      });

      /* Cursor scale on interactive elements */
      heroRoot.addEventListener('mouseover', function (e) {
        if (e.target.closest('a, button, .swiper-pagination-bullet')) {
          gsap.to(cursor, { scale: 1.3, duration: 0.25, ease: 'power3.out' });
        }
      });
      heroRoot.addEventListener('mouseout', function (e) {
        if (e.target.closest('a, button, .swiper-pagination-bullet')) {
          gsap.to(cursor, { scale: 1, duration: 0.25, ease: 'power3.out' });
        }
      });
    }

    /* SCROLL PARALLAX — Enhanced 3D Depth with ScrollTrigger
       Drives the four overlay layers at different rates for a
       true cinematic parallax depth effect on scroll. */
    if (heroRoot && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        && typeof ScrollTrigger !== 'undefined') {

      gsap.registerPlugin(ScrollTrigger);

      /* Pin the hero section and scrub depth layers */
      var heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRoot,
          start: 'top top',
          end: '+=120%',
          pin: true,
          pinSpacing: true,
          scrub: 0.4,
          anticipatePin: 1
        }
      });

      /* Each layer moves at a different speed based on depth */
      if (topEl) {
        heroTimeline.to(topEl, { y: -40, scale: 1.05, duration: 1, ease: 'none' }, 0);
      }
      if (leftEl) {
        heroTimeline.to(leftEl, { x: -70, scale: 1.04, duration: 1, ease: 'none' }, 0);
      }
      if (rightEl) {
        heroTimeline.to(rightEl, { x: 70, scale: 1.04, duration: 1, ease: 'none' }, 0);
      }
      if (bottomEl) {
        heroTimeline.to(bottomEl, { y: 110, scale: 1.08, duration: 1, ease: 'none' }, 0);
      }

      /* Hero background zooms in subtly */
      var heroBgImg = document.querySelector('.hero__bg img');
      if (heroBgImg) {
        heroTimeline.to(heroBgImg, { scale: 1.12, duration: 1, ease: 'none' }, 0);
      }

      /* Content fades and lifts */
      var heroTopLayer = document.getElementById('hero-top-layer');
      if (heroTopLayer) {
        heroTimeline.to(heroTopLayer, { y: -60, opacity: 0.3, duration: 1, ease: 'none' }, 0);
      }

      /* Scroll indicator fades out */
      if (scrollIndicator) {
        heroTimeline.to(scrollIndicator, { opacity: 0, y: -15, duration: 0.25, ease: 'none' }, 0);
      }

    } else if (heroRoot && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      /* Fallback: simple scroll parallax without ScrollTrigger */
      var SCROLL_TRAVEL = {
        top: IS_PHONE ? 26 : 34,
        left: IS_PHONE ? 52 : 66,
        right: IS_PHONE ? 52 : 66,
        bottom: IS_PHONE ? 104 : 128
      };

      var scrollLayers = [
        { el: topEl, axis: 'y', dir: -1, travel: SCROLL_TRAVEL.top },
        { el: leftEl, axis: 'x', dir: -1, travel: SCROLL_TRAVEL.left },
        { el: rightEl, axis: 'x', dir: 1, travel: SCROLL_TRAVEL.right },
        { el: bottomEl, axis: 'y', dir: 1, travel: SCROLL_TRAVEL.bottom }
      ].filter(function (l) { return l.el; });

      scrollLayers.forEach(function (layer) {
        layer.set = gsap.quickSetter(layer.el, layer.axis, 'px');
      });

      var scrollProgress = 0;
      var scrollQueued = false;

      function renderScroll() {
        scrollQueued = false;
        scrollLayers.forEach(function (layer) {
          layer.set(scrollProgress * layer.travel * layer.dir);
        });
      }

      function onHeroScroll() {
        var height = heroRoot.offsetHeight || window.innerHeight;
        scrollProgress = Math.min(1, Math.max(0, window.scrollY / height));
        if (!scrollQueued) {
          scrollQueued = true;
          requestAnimationFrame(renderScroll);
        }
      }

      window.addEventListener('scroll', onHeroScroll, { passive: true });
      window.addEventListener('resize', onHeroScroll);
      onHeroScroll();
    }
  });

})();

/* ============================================================
   CIRCULAR ARC SLIDER (Second Layer)
   ============================================================ */
(function initArcSlider() {

  var ARC_DEPTH = 14;
  var MAX_DROP = 120;
  var ROTATION = 8;
  var MAX_ROTATION = 28;
  var SCALE_STEP = 0.055;
  var MIN_SCALE = 0.80;

  function applyCircularEffect(swiper) {
    swiper.slides.forEach(function (slide) {
      var progress = Number(slide.progress) || 0;
      progress = Math.max(-4, Math.min(4, progress));

      var distance = Math.abs(progress);
      var translateY = Math.min(MAX_DROP, distance * distance * ARC_DEPTH);
      var rotate = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, progress * -ROTATION));
      var scale = Math.max(MIN_SCALE, 1 - distance * SCALE_STEP);
      var opacity = Math.max(0.55, 1 - Math.max(0, distance - 2.5) * 0.18);

      slide.style.transform = 'translate3d(0, ' + translateY + 'px, 0) rotate(' + rotate + 'deg) scale(' + scale + ')';
      slide.style.opacity = opacity;
      slide.style.zIndex = Math.round(100 - distance * 10);
    });
  }

  var slider = document.getElementById('hero-arc-slider');
  if (!slider) return;

  var bottomImage = document.querySelector('#hero-second-bottom img');
  var BOTTOM_IMAGE_STEP = 15;
  var MAX_BOTTOM_IMAGE_MOVE = 100;
  var bottomImagePosition = 0;
  var pendingDirection = 0;

  function moveBottomImage(position, duration) {
    if (!bottomImage) return;
    bottomImage.style.transitionDuration = duration + 'ms';
    bottomImage.style.transform = 'translate3d(' + position + 'px, 0, 0) scale(1.04)';
  }

  var arcSwiper = new Swiper(slider, {
    direction: 'horizontal',
    loop: true,
    loopAdditionalSlides: 8,
    initialSlide: 4,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 0,
    speed: 850,
    grabCursor: true,
    watchSlidesProgress: true,
    on: {
      init: function (sw) {
        sw.update();
        applyCircularEffect(sw);
        moveBottomImage(0, 0);
        requestAnimationFrame(function () {
          sw.updateSlides();
          sw.updateProgress();
          applyCircularEffect(sw);
        });
      },
      progress: function (sw) { applyCircularEffect(sw); },
      setTranslate: function (sw) { applyCircularEffect(sw); },
      setTransition: function (sw, dur) {
        sw.slides.forEach(function (s) { s.style.transitionDuration = dur + 'ms'; });
      },
      slideNextTransitionStart: function () { pendingDirection = -1; },
      slidePrevTransitionStart: function () { pendingDirection = 1; },
      slideChangeTransitionEnd: function () {
        if (!bottomImage || pendingDirection === 0) return;
        bottomImagePosition = Math.max(-MAX_BOTTOM_IMAGE_MOVE, Math.min(MAX_BOTTOM_IMAGE_MOVE, bottomImagePosition + pendingDirection * BOTTOM_IMAGE_STEP));
        moveBottomImage(bottomImagePosition, 550);
        pendingDirection = 0;
      },
      slideChange: function (sw) { applyCircularEffect(sw); },
      resize: function (sw) { sw.update(); applyCircularEffect(sw); moveBottomImage(bottomImagePosition, 0); }
    }
  });

  slider._arcSwiper = arcSwiper;

})();

/* ============================================================
   ENTER EXPERIENCE — REVEAL ANIMATION
   ============================================================ */
(function initRevealAnimation() {

  var circleBtn = document.getElementById('hero-circle-btn');
  var topLayer = document.getElementById('hero-top-layer');
  var secondLayer = document.getElementById('hero-second-layer');
  var secondContent = document.getElementById('hero-second-content');
  var arcWrapper = document.getElementById('hero-arc-wrapper');
  var secondBottom = document.getElementById('hero-second-bottom');

  if (!circleBtn || !topLayer || !secondLayer) return;

  var isAnimating = false;
  var isRevealed = false;

  var bottomStartY = window.innerWidth <= 767 ? 100 : 170;
  var sliderStartY = window.innerWidth <= 767 ? 85 : 130;

  /* Initial states */
  gsap.set(secondLayer, { autoAlpha: 1, pointerEvents: 'none' });

  if (secondContent) {
    gsap.set(secondContent, { autoAlpha: 0, y: 28, scale: 0.9, rotationX: -10, transformOrigin: '50% 50%', transformPerspective: 1000, force3D: true });
  }
  if (secondBottom) {
    gsap.set(secondBottom, { autoAlpha: 0, y: bottomStartY, force3D: true });
  }
  if (arcWrapper) {
    gsap.set(arcWrapper, { autoAlpha: 0, y: sliderStartY, force3D: true });
  }

  function stabilizeSlider() {
    var slider = document.getElementById('hero-arc-slider');
    if (slider && slider._arcSwiper) {
      var sw = slider._arcSwiper;
      sw.updateSize();
      sw.updateSlides();
      sw.updateProgress();
    }
  }

  function playReveal() {
    var timeline = gsap.timeline({
      defaults: { overwrite: 'auto' },
      onComplete: function () {
        isAnimating = false;
        isRevealed = true;
      }
    });

    /* 3D Zoom & fade top layer */
    timeline.to(topLayer, { scale: 5, rotationX: -8, duration: 1.5, ease: 'power4.inOut', force3D: true, transformPerspective: 1000 }, 0);
    timeline.to(topLayer, { autoAlpha: 0, duration: 0.42, ease: 'power2.out', pointerEvents: 'none' }, 1.08);
    timeline.set(secondLayer, { pointerEvents: 'auto' }, 1.28);

    /* Second layer content with 3D */
    if (secondContent) {
      timeline.to(secondContent, { autoAlpha: 1, y: 0, scale: 1, rotationX: 0, duration: 1.05, ease: 'power3.out', force3D: true }, 1.30);
    }

    /* Bottom image */
    if (secondBottom) {
      timeline.to(secondBottom, { autoAlpha: 1, y: 0, duration: 1.5, ease: 'none', force3D: true }, 1.52);
    }

    /* Arc slider */
    if (arcWrapper) {
      timeline.to(arcWrapper, { autoAlpha: 1, y: 0, duration: 1.45, ease: 'none', force3D: true }, 1.68);
    }
  }

  circleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (isAnimating || isRevealed) return;
    isAnimating = true;
    circleBtn.style.pointerEvents = 'none';

    gsap.killTweensOf([topLayer, secondContent, secondBottom, arcWrapper].filter(Boolean));

    stabilizeSlider();
    requestAnimationFrame(function () {
      stabilizeSlider();
      requestAnimationFrame(function () {
        playReveal();
      });
    });
  });

})();

/* ============================================================
   TESTIMONIALS SLIDER
   ============================================================ */
(function initTestimonials() {
  new Swiper('#testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 600,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: {
      el: '#testimonials-pagination',
      clickable: true
    }
  });
})();

/* ============================================================
   COUNTER ANIMATION
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
          var suffix = el.textContent.replace(/[0-9]/g, '');
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
