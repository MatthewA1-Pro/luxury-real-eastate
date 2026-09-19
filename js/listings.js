/* ============================================================
   LISTINGS PAGE — PROPERTY DATA & FILTERING

   ╔═══════════════════════════════════════════════╗
   ║  TO UPDATE LISTINGS:                          ║
   ║  Edit the ALL_PROPERTIES array below.         ║
   ║  Each object is one listing card.             ║
   ║  Image can be a local path or URL.            ║
   ╚═══════════════════════════════════════════════╝
   ============================================================ */

const ALL_PROPERTIES = [
  {
    id: 1,
    name: "The Meridian Villa",
    location: "Malibu, California",
    locationKey: "california",
    type: "villa",
    price: 12500000,
    priceDisplay: "$12,500,000",
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
    locationKey: "italy",
    type: "villa",
    price: 8750000,
    priceDisplay: "$8,750,000",
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
    locationKey: "france",
    type: "estate",
    price: 15200000,
    priceDisplay: "$15,200,000",
    beds: 7,
    baths: 9,
    sqft: "11,500",
    badge: "For Sale",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
  },
  {
    id: 4,
    name: "Palazzo Lumière",
    location: "Upper East Side, New York",
    locationKey: "new-york",
    type: "penthouse",
    price: 22000000,
    priceDisplay: "$22,000,000",
    beds: 4,
    baths: 5,
    sqft: "6,400",
    badge: "For Sale",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
  },
  {
    id: 5,
    name: "Casa del Mare",
    location: "Fisher Island, Miami",
    locationKey: "miami",
    type: "condo",
    price: 4800000,
    priceDisplay: "$4,800,000",
    beds: 3,
    baths: 4,
    sqft: "4,100",
    badge: "New",
    badgeType: "new",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80"
  },
  {
    id: 6,
    name: "Alpine Summit Lodge",
    location: "Aspen, Colorado",
    locationKey: "aspen",
    type: "estate",
    price: 18500000,
    priceDisplay: "$18,500,000",
    beds: 8,
    baths: 10,
    sqft: "14,200",
    badge: "For Sale",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
  },
  {
    id: 7,
    name: "Overwater Paradise",
    location: "North Malé Atoll, Maldives",
    locationKey: "maldives",
    type: "villa",
    price: 9900000,
    priceDisplay: "$9,900,000",
    beds: 4,
    baths: 5,
    sqft: "5,600",
    badge: "Sold",
    badgeType: "sold",
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80"
  },
  {
    id: 8,
    name: "Kensington Grand",
    location: "London, United Kingdom",
    locationKey: "london",
    type: "penthouse",
    price: 31000000,
    priceDisplay: "$31,000,000",
    beds: 5,
    baths: 7,
    sqft: "8,900",
    badge: "For Sale",
    badgeType: "sale",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
  }
];

/* ============================================================
   RENDER FUNCTIONS
   ============================================================ */

function renderPropertyCard(p, index) {
  return `
    <a href="listing.html?id=${p.id}" class="property-card reveal" data-delay="${index * 100}" style="text-decoration:none;">
      <div class="property-card__image">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <span class="property-card__badge property-card__badge--${p.badgeType}">${p.badge}</span>
        <button class="property-card__favorite" aria-label="Save" onclick="event.preventDefault(); event.stopPropagation(); this.classList.toggle('active');">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="property-card__overlay"></div>
      </div>
      <div class="property-card__body">
        <div class="property-card__location">
          <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${p.location}
        </div>
        <h3 class="property-card__name">${p.name}</h3>
        <div class="property-card__price">${p.priceDisplay}</div>
        <div class="property-card__stats">
          <div class="property-card__stat">
            <svg viewBox="0 0 24 24"><path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7M21 10H3M7 20V10m5 10V10m5 10V10"/></svg>
            ${p.beds} Beds
          </div>
          <div class="property-card__stat">
            <svg viewBox="0 0 24 24"><path d="M4 12h16a1 1 0 011 1v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a1 1 0 011-1zM6 12V5a2 2 0 012-2h3a2 2 0 012 2v7"/></svg>
            ${p.baths} Baths
          </div>
          <div class="property-card__stat">
            <svg viewBox="0 0 24 24"><path d="M3 21h18M3 7l9-4 9 4M5 7v14M19 7v14"/></svg>
            ${p.sqft} sqft
          </div>
        </div>
      </div>
    </a>
  `;
}

function renderGrid(properties) {
  const grid = document.getElementById('listings-grid');
  const count = document.getElementById('listing-count');
  if (!grid) return;

  grid.innerHTML = properties.length
    ? properties.map(renderPropertyCard).join('')
    : '<p style="grid-column:1/-1;text-align:center;padding:4rem 0;color:var(--color-muted);font-size:1.125rem;">No properties match your filters. Try adjusting your criteria.</p>';

  if (count) count.textContent = properties.length;

  /* Re-trigger reveal animations */
  grid.querySelectorAll('.reveal').forEach(function (el) {
    el.classList.remove('revealed');
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
      { threshold: 0.1 }
    );
    observer.observe(el);
  });
}

/* ============================================================
   FILTERING
   ============================================================ */
function getFilteredProperties() {
  const location = document.getElementById('filter-location').value;
  const priceRange = document.getElementById('filter-price').value;
  const type = document.getElementById('filter-type').value;
  const minBeds = document.getElementById('filter-beds').value;

  return ALL_PROPERTIES.filter(function (p) {
    if (location && p.locationKey !== location) return false;

    if (priceRange) {
      const parts = priceRange.split('-');
      const min = parseInt(parts[0], 10);
      const max = parseInt(parts[1], 10);
      if (p.price < min || p.price > max) return false;
    }

    if (type && p.type !== type) return false;
    if (minBeds && p.beds < parseInt(minBeds, 10)) return false;

    return true;
  });
}

function applyFilters() {
  renderGrid(getFilteredProperties());
}

/* ============================================================
   INITIALIZE
   ============================================================ */
(function init() {
  renderGrid(ALL_PROPERTIES);

  ['filter-location', 'filter-price', 'filter-type', 'filter-beds'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', applyFilters);
  });
})();
