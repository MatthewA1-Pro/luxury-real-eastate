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
    image: "images/property-3.png"
  },
  {
    id: 4,
    name: "Palazzo Lumière",
    location: "Lake Como, Italy",
    price: "$22,000,000",
    beds: 8,
    baths: 10,
    sqft: "14,000",
    badge: "Trophy Asset",
    badgeType: "sale",
    image: "images/property-4.png"
  },
  {
    id: 5,
    name: "Bel-Air Grand Manor",
    location: "Los Angeles, CA",
    price: "$28,500,000",
    beds: 9,
    baths: 12,
    sqft: "16,800",
    badge: "Exclusive",
    badgeType: "new",
    image: "images/property-5.png"
  },
  {
    id: 6,
    name: "Skyline Penthouse",
    location: "Manhattan, NY",
    price: "$18,900,000",
    beds: 5,
    baths: 6,
    sqft: "8,500",
    badge: "For Sale",
    badgeType: "sale",
    image: "images/hero-bg.png"
  }
];

/* ============================================================
   RENDER FEATURED PROPERTIES
   ============================================================ */
(function renderFeatured() {
  var grid = document.getElementById('featured-grid');
  if (!grid) return;

  if (!grid.children.length) {
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
  }

  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
})();

/* ============================================================
   HERO — 3D TILT ON FEATURED RESIDENCE IMAGE
   Mouse-tracked perspective tilt on desktop, plus a continuous
   gentle idle sway so the depth effect still reads on touch
   devices that can't fire mousemove.
   ============================================================ */
(function initHeroTilt() {
  var frame = document.getElementById('hero-image-frame');
  var img = frame ? frame.querySelector('img') : null;
  if (!frame || !img) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(pointer: fine)').matches;

  var targetRX = 0, targetRY = 0, curRX = 0, curRY = 0;
  var idlePhase = Math.random() * Math.PI * 2;

  if (canHover) {
    frame.addEventListener('mousemove', function (e) {
      var rect = frame.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width;
      var py = (e.clientY - rect.top) / rect.height;
      targetRY = (px - 0.5) * 16;
      targetRX = -(py - 0.5) * 12;
    });

    frame.addEventListener('mouseleave', function () {
      targetRX = 0;
      targetRY = 0;
    });
  }

  function tick(t) {
    curRX += (targetRX - curRX) * 0.07;
    curRY += (targetRY - curRY) * 0.07;
    var idleY = reduceMotion ? 0 : Math.sin(t / 1600 + idlePhase) * 2.4;
    img.style.transform =
      'scale(1.08) rotateX(' + curRX.toFixed(2) + 'deg) rotateY(' + (curRY + idleY).toFixed(2) + 'deg)';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

/* ============================================================
   HERO — MOVING DOT NAVIGATION
   Vertical (row on mobile) dot track beside the hero image; the
   accent indicator glides between dots automatically and on click.
   ============================================================ */
(function initHeroDotNav() {
  var nav = document.getElementById('hero-dot-nav');
  var indicator = document.getElementById('hero-dot-indicator');
  if (!nav || !indicator) return;

  var dots = Array.prototype.slice.call(nav.querySelectorAll('.hero__dot'));
  if (!dots.length) return;

  var active = 0;
  var isRow = function () { return window.matchMedia('(max-width: 767px)').matches; };

  function positionIndicator(index) {
    var dot = dots[index];
    indicator.style.transform = isRow()
      ? 'translateX(' + dot.offsetLeft + 'px)'
      : 'translateY(' + dot.offsetTop + 'px)';
  }

  function setActive(index) {
    dots[active].classList.remove('hero__dot--active');
    active = index;
    dots[active].classList.add('hero__dot--active');
    positionIndicator(active);
  }

  var timer;
  function restartAutoplay() {
    clearInterval(timer);
    timer = setInterval(function () {
      setActive((active + 1) % dots.length);
    }, 2800);
  }

  dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () {
      setActive(index);
      restartAutoplay();
    });
  });

  window.addEventListener('resize', function () { positionIndicator(active); });
  requestAnimationFrame(function () { positionIndicator(active); });
  restartAutoplay();
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

