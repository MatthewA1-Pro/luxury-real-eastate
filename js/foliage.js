/* ============================================================
   HERO FOLIAGE — LAYERED LEAF DEPTH SYSTEM
   ============================================================

   Draws the hero's framing foliage as hand-built SVG. Every
   cluster (top / bottom / left / right) is split across three
   depth tiers that move at different rates, which is what
   produces the 3D feel:

     tier 0  far   — small, darkest, barely moves
     tier 1  mid
     tier 2  near  — largest, lightest, moves most

   Motion sources:
     - scroll : every device, including mobile (this file)
     - mouse  : desktop only (handled in homepage.js)

   Must load BEFORE homepage.js, which animates the layers this
   file creates. Needs no library of its own — if the GSAP CDN
   ever fails, the leaves and their scroll parallax still work.

   ╔═══════════════════════════════════════════════╗
   ║  FOLIAGE CONFIG — EDIT THIS SECTION           ║
   ╚═══════════════════════════════════════════════╝
*/

const FOLIAGE_CONFIG = {

  /* Leaves per cluster, one number per depth tier [far, mid, near] */
  density: {
    desktop: { top: [9, 6, 4], bottom: [9, 6, 4], left: [6, 4, 3], right: [6, 4, 3] },
    mobile:  { top: [6, 4, 3], bottom: [6, 4, 3], left: [4, 3, 2], right: [4, 3, 2] }
  },

  /* Target on-screen leaf height in PIXELS, per depth tier.
     Sizing in pixels (rather than SVG units) is what keeps the
     top/bottom and left/right clusters looking consistent —
     each cluster has a different aspect ratio, so the same SVG
     scale would render very differently between them. */
  leafSize: {
    desktop: [124, 196, 300],
    mobile:  [94, 148, 218]
  },

  /* Random size variation, +/- this fraction */
  sizeJitter: 0.22,

  /* How far each tier drifts outward across a full hero scroll,
     in pixels. This is the mobile 3D effect. */
  scrollTravel: [14, 40, 82],

  /* Extra scale each tier gains across a full hero scroll */
  scrollZoom: [0.02, 0.05, 0.11],

  /* Change this number to reshuffle every leaf position */
  seed: 20260920
};

/* Leaf outlines. Drawn in a 100x140 box, tip at the top (50,0),
   stem at the bottom (50,140) — leaves rotate around their stem. */
const LEAF_PATHS = {
  broad: 'M50 3 C76 31 90 79 50 137 C10 79 24 31 50 3 Z',
  slim:  'M50 3 C65 33 73 85 50 137 C27 85 35 33 50 3 Z',
  blade: 'M43 138 C38 95 41 47 65 3 C72 46 61 96 57 138 Z'
};

/* Natural height of a leaf in its own drawing units */
const LEAF_UNITS = 140;

/* Per-cluster geometry.
     vb       : viewBox size [w, h]
     origin   : scaling pivot, in viewBox units
     axis/dir : which way the cluster drifts on scroll
                (always outward, away from screen centre)
     place    : where each leaf's stem sits, and its angle */
const CLUSTER_SPECS = {
  top: {
    vb: [1000, 420],
    preserve: 'xMidYMin slice',
    origin: [500, 40],
    axis: 'y',
    dir: -1,
    shapes: ['broad', 'slim', 'frond'],
    place: function (rand, t, tier) {
      return {
        x: -40 + t * 1080 + (rand() - 0.5) * 120,
        y: -30 + (rand() - 0.5) * 60 - tier * 12,
        rot: 180 + (t - 0.5) * 70 + (rand() - 0.5) * 28
      };
    }
  },

  bottom: {
    vb: [1000, 420],
    preserve: 'xMidYMax slice',
    origin: [500, 380],
    axis: 'y',
    dir: 1,
    shapes: ['blade', 'blade', 'slim', 'frond'],
    place: function (rand, t, tier) {
      return {
        x: -40 + t * 1080 + (rand() - 0.5) * 120,
        y: 448 + (rand() - 0.5) * 50 + tier * 12,
        rot: (t - 0.5) * -48 + (rand() - 0.5) * 26
      };
    }
  },

  left: {
    vb: [420, 1000],
    preserve: 'xMinYMid slice',
    origin: [40, 500],
    axis: 'x',
    dir: -1,
    shapes: ['broad', 'frond', 'slim'],
    place: function (rand, t, tier) {
      return {
        x: -34 + (rand() - 0.5) * 40 - tier * 10,
        y: -40 + t * 1080 + (rand() - 0.5) * 110,
        rot: 90 + (0.5 - t) * 62 + (rand() - 0.5) * 24
      };
    }
  },

  right: {
    vb: [420, 1000],
    preserve: 'xMaxYMid slice',
    origin: [380, 500],
    axis: 'x',
    dir: 1,
    shapes: ['broad', 'frond', 'slim'],
    place: function (rand, t, tier) {
      return {
        x: 454 + (rand() - 0.5) * 40 + tier * 10,
        y: -40 + t * 1080 + (rand() - 0.5) * 110,
        rot: -90 + (t - 0.5) * 62 + (rand() - 0.5) * 24
      };
    }
  }
};

/* ============================================================
   INTERNALS — no need to edit below
   ============================================================ */

const SVG_NS = 'http://www.w3.org/2000/svg';
const XLINK_NS = 'http://www.w3.org/1999/xlink';

/* Seeded RNG so the arrangement is identical on every reload */
function makeRandom(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function svgEl(name, attrs) {
  const el = document.createElementNS(SVG_NS, name);
  if (attrs) {
    for (const key in attrs) el.setAttribute(key, attrs[key]);
  }
  return el;
}

/* A fern-style compound frond: central stem plus paired leaflets */
function buildFrondSymbol() {
  const sym = svgEl('symbol', { id: 'foliage-frond', viewBox: '0 0 100 140' });

  sym.appendChild(svgEl('path', {
    d: 'M50 138 C47 98 47 48 50 6',
    stroke: 'rgba(255,255,255,0.10)',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    fill: 'none'
  }));

  const LEAFLETS = 11;

  for (let i = 0; i < LEAFLETS; i++) {
    const t = i / (LEAFLETS - 1);
    const y = 130 - t * 118;
    const len = Math.sin(t * Math.PI * 0.86 + 0.18) * 30 + 7;
    const lift = len * 0.85;

    [1, -1].forEach(function (side) {
      const cx1 = (50 + side * len * 0.55).toFixed(1);
      const cy1 = (y - lift * 0.55).toFixed(1);
      const tipX = (50 + side * len).toFixed(1);
      const tipY = (y - lift).toFixed(1);
      const cx2 = (50 + side * len * 0.45).toFixed(1);
      const cy2 = (y - lift * 0.12).toFixed(1);
      const base = y.toFixed(1);

      sym.appendChild(svgEl('path', {
        d: 'M50 ' + base +
           ' Q' + cx1 + ' ' + cy1 + ' ' + tipX + ' ' + tipY +
           ' Q' + cx2 + ' ' + cy2 + ' 50 ' + base + ' Z',
        stroke: 'rgba(0,0,0,0.30)',
        'stroke-width': '1',
        'vector-effect': 'non-scaling-stroke'
      }));
    });
  }

  return sym;
}

/* Hidden sprite holding the tier gradients and the leaf symbols */
function buildSprite() {
  if (document.getElementById('foliage-sprite')) return;

  const sprite = svgEl('svg', { id: 'foliage-sprite', 'aria-hidden': 'true', focusable: 'false' });
  sprite.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';

  const defs = svgEl('defs');

  /* The hero photo is itself a dark jungle, so a near-black leaf
     simply vanishes into it. These are deep but readable greens,
     stepping lighter towards the camera — together with the
     per-tier blur in styles.css, that separation is what reads
     as depth. */
  const TIER_STOPS = [
    ['#0d1710', '#1a2a18'],
    ['#132015', '#263a21'],
    ['#1a2b1b', '#354c2c']
  ];

  TIER_STOPS.forEach(function (stops, i) {
    const grad = svgEl('linearGradient', {
      id: 'foliage-tier-' + i,
      x1: '0',
      y1: '0',
      x2: '0.4',
      y2: '1'
    });
    grad.appendChild(svgEl('stop', { offset: '0', 'stop-color': stops[1] }));
    grad.appendChild(svgEl('stop', { offset: '1', 'stop-color': stops[0] }));
    defs.appendChild(grad);
  });

  sprite.appendChild(defs);

  /* Simple leaves get a midrib and side veins so they read as
     leaves rather than flat blobs. No `fill` is set here — it is
     inherited from each <use>, which carries the tier gradient.
     The hairline stroke keeps overlapping leaves from merging
     into one shapeless mass. */
  Object.keys(LEAF_PATHS).forEach(function (name) {
    const sym = svgEl('symbol', { id: 'foliage-' + name, viewBox: '0 0 100 140' });

    sym.appendChild(svgEl('path', {
      d: LEAF_PATHS[name],
      stroke: 'rgba(0,0,0,0.35)',
      'stroke-width': '1',
      'vector-effect': 'non-scaling-stroke'
    }));

    if (name !== 'blade') {
      sym.appendChild(svgEl('path', {
        d: 'M50 10 L50 132',
        stroke: 'rgba(255,255,255,0.09)',
        'stroke-width': '1.6',
        'stroke-linecap': 'round',
        fill: 'none'
      }));

      for (let v = 1; v <= 4; v++) {
        const y = 24 + v * 22;
        const spread = 13 + v * 2;

        [1, -1].forEach(function (side) {
          sym.appendChild(svgEl('path', {
            d: 'M50 ' + y +
               ' Q' + (50 + side * spread * 0.7) + ' ' + (y + 6) +
               ' ' + (50 + side * spread) + ' ' + (y + 17),
            stroke: 'rgba(255,255,255,0.06)',
            'stroke-width': '1.1',
            fill: 'none'
          }));
        });
      }
    }

    sprite.appendChild(sym);
  });

  sprite.appendChild(buildFrondSymbol());
  document.body.appendChild(sprite);
}

/* How many pixels one viewBox unit occupies once the browser has
   applied preserveAspectRatio="... slice" (i.e. cover) */
function sliceScaleFor(spec, host) {
  const rect = host.getBoundingClientRect();
  const w = rect.width || host.offsetWidth || spec.vb[0];
  const h = rect.height || host.offsetHeight || spec.vb[1];
  return Math.max(w / spec.vb[0], h / spec.vb[1]) || 1;
}

/* Fill one cluster's SVG with three tiers of leaves. The <svg>
   element itself is reused across rebuilds so that homepage.js
   never ends up holding a stale reference for mouse parallax. */
function populateCluster(svg, spec, host, isMobile, rand) {
  const mode = isMobile ? 'mobile' : 'desktop';
  const counts = FOLIAGE_CONFIG.density[mode][svg.dataset.cluster];
  const sizes = FOLIAGE_CONFIG.leafSize[mode];
  const slice = sliceScaleFor(spec, host);

  while (svg.firstChild) svg.removeChild(svg.firstChild);

  /* Appended far -> near so painting order matches the depth */
  counts.forEach(function (count, tier) {
    const group = svgEl('g', { class: 'foliage-tier', 'data-tier': tier });

    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const pos = spec.place(rand, t, tier);
      const shape = spec.shapes[Math.floor(rand() * spec.shapes.length)];

      /* Convert the target pixel height into an SVG scale factor */
      const jitter = 1 + (rand() - 0.5) * 2 * FOLIAGE_CONFIG.sizeJitter;
      const scale = (sizes[tier] * jitter) / (LEAF_UNITS * slice);

      /* width/height are required: a <use> pointing at a <symbol>
         defaults to 100% of the host viewport, which would rescale
         every leaf and throw the placement maths out. Pinning them
         to the symbol's own viewBox keeps it 1:1. */
      const use = svgEl('use', {
        width: 100,
        height: LEAF_UNITS,
        fill: 'url(#foliage-tier-' + tier + ')',
        transform: 'translate(' + pos.x.toFixed(1) + ',' + pos.y.toFixed(1) + ')' +
                   ' rotate(' + pos.rot.toFixed(1) + ')' +
                   ' scale(' + scale.toFixed(4) + ')' +
                   ' translate(-50,-' + LEAF_UNITS + ')'
      });

      /* href for modern browsers, xlink:href for older Safari */
      use.setAttribute('href', '#foliage-' + shape);
      use.setAttributeNS(XLINK_NS, 'xlink:href', '#foliage-' + shape);
      group.appendChild(use);
    }

    svg.appendChild(group);
  });

  return slice;
}

/* ============================================================
   BOOT
   ============================================================ */
(function initFoliage() {
  const container = document.getElementById('hero-overlays');
  const hero = document.getElementById('hero');
  if (!container || !hero) return;

  buildSprite();

  const KEYS = ['top', 'bottom', 'left', 'right'];
  const clusters = [];

  KEYS.forEach(function (key) {
    const host = document.getElementById('overlay-' + key);
    if (!host) return;

    const spec = CLUSTER_SPECS[key];
    const svg = svgEl('svg', {
      class: 'foliage-art',
      viewBox: '0 0 ' + spec.vb[0] + ' ' + spec.vb[1],
      preserveAspectRatio: spec.preserve,
      'aria-hidden': 'true',
      focusable: 'false'
    });
    svg.dataset.cluster = key;

    host.innerHTML = '';
    host.appendChild(svg);
    clusters.push({ key: key, spec: spec, host: host, svg: svg, slice: 1 });
  });

  if (!clusters.length) return;

  /* Scroll parallax reads from this list; rebuild() refills it so
     the listeners below only ever need registering once. */
  const tiers = [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rebuild() {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const rand = makeRandom(FOLIAGE_CONFIG.seed);

    tiers.length = 0;

    clusters.forEach(function (cluster) {
      cluster.slice = populateCluster(cluster.svg, cluster.spec, cluster.host, isMobile, rand);

      if (reduceMotion) return;

      const groups = cluster.svg.querySelectorAll('.foliage-tier');

      Array.prototype.forEach.call(groups, function (group, tier) {
        tiers.push({
          group: group,
          axis: cluster.spec.axis,
          dir: cluster.spec.dir,
          ox: cluster.spec.origin[0],
          oy: cluster.spec.origin[1],
          /* px -> viewBox units for this cluster */
          travel: (FOLIAGE_CONFIG.scrollTravel[tier] || 0) / cluster.slice,
          zoom: FOLIAGE_CONFIG.scrollZoom[tier] || 0
        });
      });
    });
  }

  let progress = 0;
  let queued = false;

  /* The transform attribute is written directly rather than through
     GSAP: gsap.quickSetter silently does nothing on inner SVG nodes
     like <g> (it only drives the CSS transform path, which SVG
     children ignore), and this is the cheaper route regardless.
     Scaling is wrapped in a translate pair so it pivots around the
     cluster's origin instead of the viewBox corner. */
  function render() {
    queued = false;

    for (let i = 0; i < tiers.length; i++) {
      const tier = tiers[i];
      const drift = progress * tier.travel * tier.dir;
      const dx = tier.axis === 'x' ? drift : 0;
      const dy = tier.axis === 'y' ? drift : 0;
      const scale = 1 + progress * tier.zoom;

      tier.group.setAttribute('transform',
        'translate(' + dx.toFixed(2) + ',' + dy.toFixed(2) + ')' +
        ' translate(' + tier.ox + ',' + tier.oy + ')' +
        ' scale(' + scale.toFixed(4) + ')' +
        ' translate(' + (-tier.ox) + ',' + (-tier.oy) + ')');
    }
  }

  function onScroll() {
    const height = hero.offsetHeight || window.innerHeight;
    progress = Math.min(1, Math.max(0, window.scrollY / height));

    if (!queued) {
      queued = true;
      requestAnimationFrame(render);
    }
  }

  rebuild();

  if (!reduceMotion) {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Leaf sizes are derived from the rendered box, so a resize or
     an orientation change needs a rebuild. Debounced, and only
     when the width actually changed — iOS fires resize on scroll
     as the address bar collapses. */
  let lastWidth = window.innerWidth;
  let resizeTimer = null;

  window.addEventListener('resize', function () {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      rebuild();
      onScroll();
    }, 180);
  });
})();
