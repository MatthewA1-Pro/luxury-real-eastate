/* ============================================================
   SINGLE LISTING PAGE — PROPERTY DATA & INTERACTIONS

   ╔═══════════════════════════════════════════════╗
   ║  TO UPDATE PROPERTY DETAILS:                  ║
   ║  Edit the PROPERTIES object below.            ║
   ║  Each key is a property ID.                   ║
   ║  Add new properties by adding new keys.       ║
   ╚═══════════════════════════════════════════════╝
   ============================================================ */

const PROPERTIES = {
  1: {
    name: "The Meridian Villa",
    location: "Malibu, California",
    price: "$12,500,000",
    description1: "Perched on a dramatic Malibu bluff with unobstructed ocean views, The Meridian Villa is a masterpiece of contemporary architecture. This 9,200 square foot residence seamlessly blends indoor and outdoor living through walls of floor-to-ceiling glass that frame the Pacific coastline like living art.",
    description2: "The estate features a stunning infinity pool that appears to merge with the ocean horizon, a state-of-the-art chef's kitchen with Italian marble countertops, a private home theater, temperature-controlled wine cellar, and a rooftop observation deck. The master suite offers panoramic ocean views, a spa-inspired bathroom with soaking tub, and a private terrace.",
    beds: 6,
    baths: 8,
    sqft: "9,200",
    yearBuilt: "2022",
    lotSize: "1.8 Acres",
    garage: "4 Cars",
    images: [
      "images/property-1.png",
      "images/property-2.png",
      "images/property-3.png",
      "images/property-4.png",
      "images/property-5.png"
    ],
    features: [
      "Infinity Edge Pool", "Ocean Views", "Home Theater",
      "Wine Cellar", "Smart Home System", "Chef's Kitchen",
      "Spa Bathroom", "Private Beach Access", "Rooftop Deck",
      "EV Charging", "Security System", "Guest House"
    ]
  },
  2: {
    name: "Villa Serenata",
    location: "Tuscany, Italy",
    price: "$8,750,000",
    description1: "Nestled among the rolling hills of Tuscany, Villa Serenata is a lovingly restored 18th-century estate that marries historical grandeur with contemporary luxury. Stone walls, original frescoes, and hand-laid terracotta floors tell centuries of stories within its 7,800 square feet of living space.",
    description2: "The property features 15 acres of olive groves and private vineyards producing award-winning Sangiovese. A renovated farmhouse serves as a guest cottage, while the main villa boasts a professional kitchen, library, and heated infinity pool overlooking the Val d'Orcia valley.",
    beds: 5,
    baths: 6,
    sqft: "7,800",
    yearBuilt: "1785 (Restored 2021)",
    lotSize: "15 Acres",
    garage: "3 Cars",
    images: [
      "images/property-2.png",
      "images/property-3.png",
      "images/property-1.png",
      "images/property-4.png",
      "images/property-5.png"
    ],
    features: [
      "Private Vineyard", "Olive Groves", "Original Frescoes",
      "Heated Pool", "Guest Cottage", "Professional Kitchen",
      "Wine Tasting Room", "Library", "Terrace Dining",
      "Panoramic Views", "Historical Architecture", "Gardens"
    ]
  },
  3: {
    name: "The Azure Estate",
    location: "Saint-Tropez, France",
    price: "$15,200,000",
    description1: "Set within the exclusive enclave of Les Parcs de Saint-Tropez, The Azure Estate commands sweeping views of the Mediterranean Sea. This 11,500 sq ft Provençal masterpiece is surrounded by centuries-old pine trees and features direct access to a private sandy beach.",
    description2: "The property includes a professional-grade outdoor kitchen, a 60-foot heated lap pool, a fully equipped gym and spa with hammam, separate staff quarters, and a helipad. Every bedroom is en-suite and opens to private terraces with sea views.",
    beds: 7,
    baths: 9,
    sqft: "11,500",
    yearBuilt: "2019",
    lotSize: "3.2 Acres",
    garage: "5 Cars",
    images: [
      "images/property-3.png",
      "images/property-4.png",
      "images/property-1.png",
      "images/property-5.png",
      "images/property-2.png"
    ],
    features: [
      "Private Beach", "Heated Lap Pool", "Helipad",
      "Gym & Spa", "Hammam", "Outdoor Kitchen",
      "Staff Quarters", "Sea Views", "Wine Cellar",
      "Security Gate", "Gardens", "Multiple Terraces"
    ]
  },
  4: {
    name: "Palazzo Lumière",
    location: "Upper East Side, New York",
    price: "$22,000,000",
    description1: "Occupying the entire top floor of a pre-war landmark building on Fifth Avenue, Palazzo Lumière is a 6,400 square foot penthouse that defines Manhattan luxury. Soaring 12-foot ceilings, a private elevator landing, and uninterrupted Central Park views create an incomparable living experience.",
    description2: "The residence features a grand salon with fireplace, a formal dining room for 16 guests, Boffi kitchen with Gaggenau appliances, a library study, and a 1,200 sq ft wraparound terrace. The master wing includes a walk-in closet designed by a Parisian couture house.",
    beds: 4,
    baths: 5,
    sqft: "6,400",
    yearBuilt: "1929 (Renovated 2023)",
    lotSize: "N/A",
    garage: "2 Spaces",
    images: [
      "images/property-4.png",
      "images/property-3.png",
      "images/property-5.png",
      "images/property-1.png",
      "images/property-2.png"
    ],
    features: [
      "Central Park Views", "Private Elevator", "Fireplace",
      "Wraparound Terrace", "12ft Ceilings", "Boffi Kitchen",
      "Wine Storage", "Formal Dining", "Library Study",
      "Walk-in Closet", "Doorman Building", "Concierge"
    ]
  },
  5: {
    name: "Casa del Mare",
    location: "Fisher Island, Miami",
    price: "$4,800,000",
    description1: "An intimate waterfront condo on exclusive Fisher Island, Casa del Mare offers 4,100 sq ft of refined living with direct bay views and access to the island's world-class amenities. Italian marble flooring and custom millwork define the elegant interiors.",
    description2: "Residents enjoy a private beach club, 18-hole golf course, spa, and deep-water marina. The unit features a gourmet kitchen, expansive balcony with summer kitchen, and a master suite with dual walk-in closets and ocean-view soaking tub.",
    beds: 3, baths: 4, sqft: "4,100", yearBuilt: "2020", lotSize: "N/A", garage: "2 Spaces",
    images: [
      "images/property-5.png",
      "images/property-1.png",
      "images/property-2.png",
      "images/property-3.png",
      "images/property-4.png"
    ],
    features: ["Bay Views", "Beach Club", "Golf Course", "Marina", "Summer Kitchen", "Spa Access", "Italian Marble", "Concierge", "Pool"]
  },
  6: {
    name: "Alpine Summit Lodge",
    location: "Aspen, Colorado",
    price: "$18,500,000",
    description1: "A trophy mountain estate spanning 14,200 sq ft on 5 acres in Aspen's most prestigious enclave. Floor-to-ceiling windows frame panoramic views of Aspen Mountain and the Elk Range from every room.",
    description2: "Features include ski-in/ski-out access, an indoor lap pool and spa, professional home theater, two-story library, climate-controlled wine vault for 3,000 bottles, and a separate caretaker's residence.",
    beds: 8, baths: 10, sqft: "14,200", yearBuilt: "2018", lotSize: "5 Acres", garage: "6 Cars",
    images: [
      "images/hero-bg.png",
      "images/property-1.png",
      "images/property-2.png",
      "images/property-3.png",
      "images/property-4.png"
    ],
    features: ["Ski-In/Ski-Out", "Indoor Pool", "Home Theater", "Wine Vault", "Mountain Views", "Spa", "Library", "Caretaker Suite", "Heated Driveway"]
  },
  7: {
    name: "Overwater Paradise",
    location: "North Malé Atoll, Maldives",
    price: "$9,900,000",
    description1: "An extraordinary overwater villa in the Maldives featuring 5,600 sq ft of luxury living suspended above crystal-clear lagoon waters. Glass floor panels reveal the vibrant marine life below.",
    description2: "Includes a private infinity pool, outdoor bathtub, direct ocean slide, butler service, and a private 40-foot yacht. Every room offers uninterrupted Indian Ocean views.",
    beds: 4, baths: 5, sqft: "5,600", yearBuilt: "2023", lotSize: "Private Overwater", garage: "N/A",
    images: [
      "images/property-1.png",
      "images/property-2.png",
      "images/property-3.png",
      "images/property-4.png",
      "images/property-5.png"
    ],
    features: ["Overwater Living", "Glass Floor", "Infinity Pool", "Private Yacht", "Butler Service", "Ocean Slide", "Spa", "Snorkeling", "Sunset Deck"]
  },
  8: {
    name: "Kensington Grand",
    location: "London, United Kingdom",
    price: "$31,000,000",
    description1: "A magnificent 8,900 sq ft penthouse in one of London's most prestigious addresses. Spanning three floors with a private rooftop terrace overlooking Kensington Palace Gardens and Hyde Park.",
    description2: "Features include a ballroom-sized reception, Clive Christian kitchen, indoor pool, private cinema, and 24-hour concierge. The master suite occupies an entire floor with bespoke dressing rooms.",
    beds: 5, baths: 7, sqft: "8,900", yearBuilt: "1890 (Renovated 2024)", lotSize: "N/A", garage: "3 Spaces",
    images: [
      "images/property-2.png",
      "images/property-3.png",
      "images/property-4.png",
      "images/property-5.png",
      "images/property-1.png"
    ],
    features: ["Hyde Park Views", "Indoor Pool", "Private Cinema", "Rooftop Terrace", "24hr Concierge", "Clive Christian Kitchen", "Ballroom", "Bespoke Dressing", "Wine Room"]
  }
};

/* ============================================================
   LOAD PROPERTY DATA
   ============================================================ */
(function loadProperty() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '1';
  const property = PROPERTIES[id];

  if (!property) {
    document.getElementById('listing-name').textContent = 'Property Not Found';
    return;
  }

  /* Update page title */
  document.title = property.name + ' — Aurelia Estates';

  /* Basic info */
  document.getElementById('listing-name').textContent = property.name;
  document.getElementById('listing-location-text').textContent = property.location;
  document.getElementById('listing-price').textContent = property.price;
  document.getElementById('listing-description-1').textContent = property.description1;
  document.getElementById('listing-description-2').textContent = property.description2;

  /* Gallery */
  const galleryWrapper = document.getElementById('gallery-main-wrapper');
  const thumbsWrapper = document.getElementById('gallery-thumbs-wrapper');

  galleryWrapper.innerHTML = property.images.map(function (img) {
    return `<div class="swiper-slide"><div class="listing-gallery__main"><img src="${img}" alt="${property.name}" /></div></div>`;
  }).join('');

  thumbsWrapper.innerHTML = property.images.map(function (img, i) {
    return `<div class="listing-gallery__thumb ${i === 0 ? 'active' : ''}" data-index="${i}"><img src="${img}" alt="Thumbnail ${i + 1}" /></div>`;
  }).join('');

  /* Initialize gallery swiper */
  const gallerySwiper = new Swiper('#gallery-main', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 600,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    on: {
      slideChange: function (sw) {
        const realIndex = sw.realIndex;
        thumbsWrapper.querySelectorAll('.listing-gallery__thumb').forEach(function (t, i) {
          t.classList.toggle('active', i === realIndex);
        });
      }
    }
  });

  /* Thumbnail click */
  thumbsWrapper.querySelectorAll('.listing-gallery__thumb').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      gallerySwiper.slideToLoop(parseInt(this.dataset.index, 10));
    });
  });

  /* Key Facts */
  const keyFactsList = document.getElementById('key-facts-list');
  const facts = [
    { icon: 'M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7M21 10H3M7 20V10m5 10V10m5 10V10', label: 'Bedrooms', value: property.beds },
    { icon: 'M4 12h16a1 1 0 011 1v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a1 1 0 011-1zM6 12V5a2 2 0 012-2h3a2 2 0 012 2v7', label: 'Bathrooms', value: property.baths },
    { icon: 'M3 21h18M3 7l9-4 9 4M5 7v14M19 7v14', label: 'Sq. Footage', value: property.sqft + ' sqft' },
    { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Year Built', value: property.yearBuilt },
    { icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', label: 'Lot Size', value: property.lotSize },
    { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5', label: 'Garage', value: property.garage }
  ];

  keyFactsList.innerHTML = facts.map(function (f) {
    return `
      <div class="key-fact">
        <div class="key-fact__label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="${f.icon}"/></svg>
          ${f.label}
        </div>
        <div class="key-fact__value">${f.value}</div>
      </div>
    `;
  }).join('');

  /* Features */
  const featuresGrid = document.getElementById('features-grid');
  featuresGrid.innerHTML = property.features.map(function (feature) {
    return `
      <div class="feature-item">
        <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span>${feature}</span>
      </div>
    `;
  }).join('');

  /* Similar Properties */
  const similarGrid = document.getElementById('similar-grid');
  const allIds = Object.keys(PROPERTIES).filter(function (k) { return k !== id; });
  const shuffled = allIds.sort(function () { return 0.5 - Math.random(); }).slice(0, 3);

  similarGrid.innerHTML = shuffled.map(function (sid, i) {
    const sp = PROPERTIES[sid];
    return `
      <a href="listing.html?id=${sid}" class="property-card reveal" data-delay="${i * 150}" style="text-decoration:none;">
        <div class="property-card__image">
          <img src="${sp.images[0]}" alt="${sp.name}" loading="lazy" />
          <div class="property-card__overlay"></div>
        </div>
        <div class="property-card__body">
          <div class="property-card__location">
            <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${sp.location}
          </div>
          <h3 class="property-card__name">${sp.name}</h3>
          <div class="property-card__price">${sp.price}</div>
          <div class="property-card__stats">
            <div class="property-card__stat">
              <svg viewBox="0 0 24 24"><path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7"/></svg>
              ${sp.beds} Beds
            </div>
            <div class="property-card__stat">
              <svg viewBox="0 0 24 24"><path d="M4 12h16a1 1 0 011 1v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a1 1 0 011-1z"/></svg>
              ${sp.baths} Baths
            </div>
            <div class="property-card__stat">
              <svg viewBox="0 0 24 24"><path d="M3 21h18M3 7l9-4 9 4"/></svg>
              ${sp.sqft} sqft
            </div>
          </div>
        </div>
      </a>
    `;
  }).join('');

})();
