/* ==========================================================================
   DÚO BAILA BAILA — Motor Interactivo Multipágina + Asistente "Don Baila"
   Persistencia completa en localStorage para experiencia de usuario real.
   ========================================================================== */

const CATALOG = [
  {
    id: 'kit-vol-1',
    name: 'Kit Dúo Baila Baila — Vol. 1',
    category: 'kits',
    price: 18.50,
    tag: 'Más Vendido',
    tagColor: 'coral',
    badge: 'Set Coleccionable · Vol. 1',
    shortDesc: 'Caja cofre ilustrada (200×150×100 mm) con Trompo, Capirucho, Manual plegable, 4 Tarjetas de Retos y 7 Stickers.',
    specs: [
      'Caja cofre rígida FEFCO 0427 de 200 × 150 × 100 mm con acabado mate cálido.',
      '1 Trompo artesanal de madera torneada con punta metálica y cuerda de algodón.',
      '1 Capirucho tradicional pintado a mano con franjas típicas de El Salvador.',
      '1 Manual plegable ilustrado (190 × 140 mm) + 4 Tarjetas de Retos + 7 Stickers.'
    ],
    artType: 'duo'
  },
  {
    id: 'kit-coleccionista',
    name: 'Edición Regalo & Coleccionista',
    category: 'kits',
    price: 24.00,
    tag: 'Edición Especial',
    tagColor: 'gold',
    badge: 'Incluye Bolsa de Manta + Cera',
    shortDesc: 'El Set Vol. 1 completo más bolsa artesanal de manta cruda, pastilla de cera natural para cuerda y doble planilla de stickers.',
    specs: [
      'Todo el contenido del Kit Dúo Baila Baila Vol. 1.',
      'Bolsa transportadora de manta salvadoreña estampada con el sello Dúo Baila Baila.',
      'Pastilla de cera de abeja natural para mejorar el agarre de la cuerda.',
      '2 planillas completas de stickers coleccionables (14 calcomanías).'
    ],
    artType: 'caja'
  },
  {
    id: 'trompo-artesanal',
    name: 'Trompo Tradicional de Madera',
    category: 'individuales',
    price: 7.50,
    tag: 'Individual',
    tagColor: 'turquoise',
    badge: 'Madera Torneada + Cuerda',
    shortDesc: 'Trompo clásico equilibrado para lograr el "dormilón" perfecto, con franja turquesa y cuerda de algodón trenzado.',
    specs: [
      'Madera dura seleccionada y balanceada en torno artesanal.',
      'Herrón (punta) de acero redondeado para mayor estabilidad en piso o mano.',
      'Incluye cuerda de algodón de 1.40 metros y tarjeta individual de truco.'
    ],
    artType: 'trompo'
  },
  {
    id: 'capirucho-artesanal',
    name: 'Capirucho Típico Salvadoreño',
    category: 'individuales',
    price: 7.00,
    tag: 'Individual',
    tagColor: 'turquoise',
    badge: 'Pintado a Mano',
    shortDesc: 'Campana de madera torneada con franjas vibrantes rojo coral, turquesa y verde, unida a palito ergonómico.',
    specs: [
      'Orificio calibrado para facilitar el ensarte limpio en niveles inicial y pro.',
      'Acabado con tintes no tóxicos y barniz protector suave al tacto.',
      'Incluye tarjeta de reto "Tiro Directo" y sticker oficial.'
    ],
    artType: 'capirucho'
  },
  {
    id: 'pack-cuerdas',
    name: 'Pack 3 Cuerdas Trenzadas + Cera',
    category: 'accesorios',
    price: 4.50,
    tag: 'Repuesto Pro',
    tagColor: 'gold',
    badge: 'Alto Rendimiento',
    shortDesc: 'Tres cuerdas de algodón de alta resistencia en colores crema, coral y turquesa con bloque de cera natural.',
    specs: [
      '3 cuerdas trenzadas de 1.45 m que no se deshilachan con el uso intenso.',
      'Bloque de cera artesanal para evitar que la cuerda resbale al enrollar.',
      'Compatible con todos los trompos Dúo Baila Baila.'
    ],
    artType: 'trompo'
  },
  {
    id: 'pack-retos-stickers',
    name: 'Expansión: 4 Tarjetas + 7 Stickers',
    category: 'accesorios',
    price: 5.00,
    tag: 'Coleccionable',
    tagColor: 'coral',
    badge: 'Papelería Oficial',
    shortDesc: 'Juego adicional de las 4 tarjetas de retos (65×90 mm) en cartulina 300g y la planilla de 7 stickers semicortados.',
    specs: [
      '4 tarjetas de retos con esquinas redondeadas R=5 mm.',
      'Planilla de 190 × 110 mm con 7 stickers troquelados listos para pegar.',
      'Ideal para torneos escolares o compartir en familia.'
    ],
    artType: 'caja'
  }
];

const PROMO_CODES = {
  'BAILA10': { discount: 0.10, label: '10% de descuento tradicional' },
  'ELSALVADOR': { discount: 0.15, label: '15% Orgullo Salvadoreño' }
};

/* ---------------- Estado Global en localStorage ---------------- */
const Storage = {
  getCart() {
    try { return JSON.parse(localStorage.getItem('dbb_cart')) || []; }
    catch { return []; }
  },
  saveCart(cart) {
    localStorage.setItem('dbb_cart', JSON.stringify(cart));
    updateCartUI();
  },
  getPromo() {
    return localStorage.getItem('dbb_promo') || '';
  },
  savePromo(code) {
    localStorage.setItem('dbb_promo', code);
  },
  getChallenges() {
    try { return JSON.parse(localStorage.getItem('dbb_challenges')) || []; }
    catch { return []; }
  },
  saveChallenges(list) {
    localStorage.setItem('dbb_challenges', JSON.stringify(list));
  },
  getPlayerName() {
    return localStorage.getItem('dbb_player_name') || '';
  },
  savePlayerName(name) {
    localStorage.setItem('dbb_player_name', name);
  },
  getOrders() {
    try { return JSON.parse(localStorage.getItem('dbb_orders')) || []; }
    catch { return []; }
  },
  saveOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    localStorage.setItem('dbb_orders', JSON.stringify(orders));
  },
  getWaitlist() {
    try { return JSON.parse(localStorage.getItem('dbb_waitlist')) || []; }
    catch { return []; }
  },
  toggleWaitlist(volId) {
    const list = this.getWaitlist();
    const idx = list.indexOf(volId);
    if (idx === -1) list.push(volId);
    else list.splice(idx, 1);
    localStorage.setItem('dbb_waitlist', JSON.stringify(list));
    return idx === -1;
  },
  getChatHistory() {
    try { return JSON.parse(localStorage.getItem('dbb_chat_history')) || []; }
    catch { return []; }
  },
  saveChatHistory(msgs) {
    localStorage.setItem('dbb_chat_history', JSON.stringify(msgs.slice(-30)));
  }
};

/* ---------------- Ilustraciones SVG Reutilizables ---------------- */
function getArtworkSVG(type, size = 140) {
  if (type === 'trompo') {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M35,72 C20,86 42,98 26,108 C18,113 30,118 39,112" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
        <path d="M35,72 C20,86 42,98 26,108 C18,113 30,118 39,112" fill="none" stroke="#542314" stroke-width="1.6" stroke-dasharray="4 3" stroke-linecap="round"/>
        <polygon points="55,84 65,84 60,99" fill="#CBD5E1" stroke="#542314" stroke-width="2"/>
        <path d="M38,54 C40,70 50,81 55,84 L65,84 C70,81 80,70 82,54 Z" fill="#D99B52" stroke="#542314" stroke-width="2.2"/>
        <path d="M35,46 C35,51 36.5,54 38,54 L82,54 C83.5,54 85,51 85,46 C85,41 83,39 80,39 L40,39 C37,39 35,41 35,46 Z" fill="#1CA39E" stroke="#542314" stroke-width="2.2"/>
        <circle cx="48" cy="46.5" r="2.4" fill="#F6B61E"/>
        <circle cx="60" cy="46.5" r="2.4" fill="#F6B61E"/>
        <circle cx="72" cy="46.5" r="2.4" fill="#F6B61E"/>
        <path d="M40,39 C45,29 53,26 60,26 C67,26 75,29 80,39 Z" fill="#E5A960" stroke="#542314" stroke-width="2.2"/>
        <rect x="54" y="20" width="12" height="6" rx="3" fill="#E33B2B" stroke="#542314" stroke-width="2"/>
      </svg>`;
  }
  if (type === 'capirucho') {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M60,68 C67,82 48,88 55,100" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M60,68 C67,82 48,88 55,100" fill="none" stroke="#542314" stroke-width="1.4" stroke-linecap="round"/>
        <g transform="translate(52, 102) rotate(-30)">
          <rect x="-4" y="-14" width="8" height="30" rx="3" fill="#E5A960" stroke="#542314" stroke-width="2"/>
          <line x1="-4" y1="-6" x2="4" y2="-6" stroke="#E33B2B" stroke-width="2.5"/>
        </g>
        <path d="M43,26 L77,26 L83,62 C83,67 72,70 60,70 C48,70 37,67 37,62 Z" fill="#F6B61E" stroke="#542314" stroke-width="2.2"/>
        <polygon points="41.5,37 78.5,37 79.8,43 40.2,43" fill="#E33B2B"/>
        <polygon points="40.2,43 79.8,43 81,49 39,49" fill="#1CA39E"/>
        <polygon points="39,49 81,49 82.2,55 37.8,55" fill="#2E9E5B"/>
        <ellipse cx="60" cy="26" rx="17" ry="4.5" fill="#D99B52" stroke="#542314" stroke-width="2"/>
        <ellipse cx="60" cy="26" rx="10" ry="2.5" fill="#542314"/>
      </svg>`;
  }
  if (type === 'caja') {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 130 120" aria-hidden="true">
        <polygon points="20,44 65,24 110,44 110,88 65,108 20,88" fill="#F1DFC0" stroke="#542314" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="20,44 65,64 110,44 65,24" fill="#FFFDF9" stroke="#542314" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="20,44 65,64 65,108 20,88" fill="#E6CFA9" stroke="#542314" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="65,64 110,44 110,88 65,108" fill="#542314" stroke="#542314" stroke-width="2.5" stroke-linejoin="round"/>
        <text x="65" y="43" text-anchor="middle" fill="#E33B2B" font-family="Fredoka, Arial" font-weight="700" font-size="11">DÚO</text>
        <text x="65" y="53" text-anchor="middle" fill="#542314" font-family="Fredoka, Arial" font-weight="700" font-size="9">BAILA BAILA</text>
        <rect x="74" y="68" width="28" height="16" rx="4" transform="skewY(-22)" fill="#E33B2B"/>
      </svg>`;
  }
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 160 120" aria-hidden="true">
      <circle cx="80" cy="62" r="46" fill="#F1DFC0" stroke="#E6CFA9" stroke-width="2"/>
      <g transform="translate(46, 58) rotate(-15) scale(0.76)">
        <path d="M-16,14 C-26,24 -10,34 -22,42" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M-16,14 C-26,24 -10,34 -22,42" fill="none" stroke="#542314" stroke-width="1.4" stroke-dasharray="3 2"/>
        <polygon points="-4,24 4,24 0,36" fill="#CBD5E1" stroke="#542314" stroke-width="2"/>
        <path d="M-18,0 C-16,12 -8,21 -4,24 L4,24 C8,21 16,12 18,0 Z" fill="#D99B52" stroke="#542314" stroke-width="2.2"/>
        <path d="M-20,-7 C-20,-3 -19,0 -18,0 L18,0 C19,0 20,-3 20,-7 C20,-11 18,-13 16,-13 L-16,-13 C-18,-13 -20,-11 -20,-7 Z" fill="#1CA39E" stroke="#542314" stroke-width="2.2"/>
        <circle cx="-9" cy="-6.5" r="2" fill="#F6B61E"/><circle cx="0" cy="-6.5" r="2" fill="#F6B61E"/><circle cx="9" cy="-6.5" r="2" fill="#F6B61E"/>
        <path d="M-16,-13 C-12,-21 -5,-24 0,-24 C5,-24 12,-21 16,-13 Z" fill="#E5A960" stroke="#542314" stroke-width="2.2"/>
        <rect x="-5" y="-29" width="10" height="5" rx="2.5" fill="#E33B2B" stroke="#542314" stroke-width="1.8"/>
      </g>
      <g transform="translate(112, 54) rotate(14) scale(0.76)">
        <path d="M0,16 C5,28 -10,33 -4,44" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
        <path d="M0,16 C5,28 -10,33 -4,44" fill="none" stroke="#542314" stroke-width="1.3"/>
        <g transform="translate(-6, 46) rotate(-32)">
          <rect x="-3.5" y="-12" width="7" height="26" rx="2.5" fill="#E5A960" stroke="#542314" stroke-width="1.8"/>
          <line x1="-3.5" y1="-5" x2="3.5" y2="-5" stroke="#E33B2B" stroke-width="2"/>
        </g>
        <path d="M-14,-20 L14,-20 L19,10 C19,14 10,16 0,16 C-10,16 -19,14 -19,10 Z" fill="#F6B61E" stroke="#542314" stroke-width="2.2"/>
        <polygon points="-15.2,-11 15.2,-11 16.2,-6 -16.2,-6" fill="#E33B2B"/>
        <polygon points="-16.2,-6 16.2,-6 17.2,-1 -17.2,-1" fill="#1CA39E"/>
        <polygon points="-17.2,-1 17.2,-1 18.2,4 -18.2,4" fill="#2E9E5B"/>
        <ellipse cx="0" cy="-20" rx="14" ry="3.8" fill="#D99B52" stroke="#542314" stroke-width="1.8"/>
        <ellipse cx="0" cy="-20" rx="8" ry="2" fill="#542314"/>
      </g>
    </svg>`;
}

/* ---------------- Toast Notification ---------------- */
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 260);
  }, 2800);
}

/* ---------------- Operaciones del Carrito ---------------- */
function addToCart(productId, qty = 1, openDrawer = true) {
  const product = CATALOG.find(p => p.id === productId);
  if (!product) return;

  const cart = Storage.getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  Storage.saveCart(cart);
  showToast(`✓ Agregado: ${product.name}`);
  if (openDrawer) toggleCartDrawer(true);
}

function updateItemQty(productId, delta) {
  let cart = Storage.getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  Storage.saveCart(cart);
  if (typeof renderCheckoutSummary === 'function') renderCheckoutSummary();
}

function removeFromCart(productId) {
  const cart = Storage.getCart().filter(i => i.id !== productId);
  Storage.saveCart(cart);
  if (typeof renderCheckoutSummary === 'function') renderCheckoutSummary();
}

function buyNow(productId) {
  addToCart(productId, 1, false);
  window.location.href = 'checkout.html';
}

function getCartTotals() {
  const cart = Storage.getCart();
  let subtotal = 0;
  let totalItems = 0;
  cart.forEach(item => {
    const prod = CATALOG.find(p => p.id === item.id);
    if (prod) {
      subtotal += prod.price * item.qty;
      totalItems += item.qty;
    }
  });
  const promoCode = Storage.getPromo();
  const promoObj = PROMO_CODES[promoCode];
  const discount = promoObj ? subtotal * promoObj.discount : 0;
  return {
    subtotal,
    discount,
    totalAfterDiscount: Math.max(0, subtotal - discount),
    totalItems,
    promoCode,
    promoLabel: promoObj ? promoObj.label : ''
  };
}

function updateCartUI() {
  const { subtotal, totalItems } = getCartTotals();
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = totalItems;
  });

  const drawerBody = document.getElementById('cartDrawerBody');
  const drawerSubtotal = document.getElementById('cartDrawerSubtotal');
  const drawerCheckoutBtn = document.getElementById('cartDrawerCheckoutBtn');
  if (!drawerBody) return;

  const cart = Storage.getCart();
  if (cart.length === 0) {
    drawerBody.innerHTML = `
      <div style="text-align:center; padding: 36px 12px;">
        <div style="font-size:2.5rem; margin-bottom:10px;">🪀</div>
        <h3 style="margin-bottom:8px;">Tu bolsa artesanal está vacía</h3>
        <p style="font-size:0.9rem; color:var(--choco-soft); margin-bottom:20px;">
          Explora el Kit Coleccionable Vol. 1 o nuestros juguetes de madera hechos en El Salvador.
        </p>
        <a href="tienda.html" class="btn btn-coral btn-sm">Ir a la Tienda</a>
      </div>`;
    if (drawerSubtotal) drawerSubtotal.textContent = '$0.00';
    if (drawerCheckoutBtn) drawerCheckoutBtn.style.display = 'none';
    return;
  }

  drawerBody.innerHTML = cart.map(item => {
    const prod = CATALOG.find(p => p.id === item.id);
    if (!prod) return '';
    return `
      <div class="cart-item-row">
        <div style="flex:1;">
          <div style="font-weight:800; font-size:0.92rem;">${prod.name}</div>
          <div style="font-size:0.82rem; color:var(--coral); font-weight:700;">$${prod.price.toFixed(2)} c/u</div>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="updateItemQty('${prod.id}', -1)" aria-label="Restar">−</button>
          <span style="font-weight:800; min-width:18px; text-align:center;">${item.qty}</span>
          <button class="qty-btn" onclick="updateItemQty('${prod.id}', 1)" aria-label="Sumar">+</button>
        </div>
        <button onclick="removeFromCart('${prod.id}')" style="background:none; border:none; color:var(--choco-soft); font-weight:800; cursor:pointer;" title="Eliminar">✕</button>
      </div>`;
  }).join('');

  if (drawerSubtotal) drawerSubtotal.textContent = `$${subtotal.toFixed(2)} USD`;
  if (drawerCheckoutBtn) drawerCheckoutBtn.style.display = 'inline-flex';
}

function toggleCartDrawer(forceState) {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (!drawer || !backdrop) return;
  const shouldOpen = typeof forceState === 'boolean' ? forceState : !drawer.classList.contains('open');
  drawer.classList.toggle('open', shouldOpen);
  backdrop.classList.toggle('open', shouldOpen);
}

/* ---------------- Modal de Vista Rápida de Producto ---------------- */
function openQuickView(productId) {
  const prod = CATALOG.find(p => p.id === productId);
  const modal = document.getElementById('quickViewModal');
  const content = document.getElementById('quickViewContent');
  if (!prod || !modal || !content) return;

  content.innerHTML = `
    <span class="badge-pill ${prod.tagColor}">${prod.badge}</span>
    <h2 style="margin:12px 0 8px;">${prod.name}</h2>
    <div class="quickview-grid">
      <div class="product-thumb" style="margin:0; height:180px;">
        ${getArtworkSVG(prod.artType, 135)}
      </div>
      <div>
        <p style="font-size:0.95rem; margin-bottom:12px;">${prod.shortDesc}</p>
        <div class="product-price">$${prod.price.toFixed(2)} <small>USD · IVA incluido</small></div>
      </div>
    </div>
    <h4 style="margin-bottom:8px;">Especificaciones del Set:</h4>
    <ul style="padding-left:18px; margin-bottom:20px; font-size:0.9rem; color:var(--choco-mid);">
      ${prod.specs.map(s => `<li style="margin-bottom:6px;">${s}</li>`).join('')}
    </ul>
    <div style="display:flex; gap:10px; flex-wrap:wrap;">
      <button class="btn btn-coral" onclick="addToCart('${prod.id}', 1, true); closeQuickView();">🛒 Agregar a mi Bolsa</button>
      <button class="btn btn-gold" onclick="buyNow('${prod.id}')">⚡ Comprar Ahora</button>
    </div>
  `;
  modal.classList.add('open');
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  if (modal) modal.classList.remove('open');
}

/* ---------------- Renderizado de Catálogo ---------------- */
function renderProductCards(containerId, filterCategory = 'all', limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let list = filterCategory === 'all'
    ? CATALOG
    : CATALOG.filter(p => p.category === filterCategory);

  if (limit) list = list.slice(0, limit);

  container.innerHTML = list.map(prod => `
    <article class="craft-card">
      <div class="product-thumb">
        <span class="product-tag badge-pill ${prod.tagColor}">${prod.tag}</span>
        ${getArtworkSVG(prod.artType, 138)}
      </div>
      <span style="font-size:0.78rem; font-weight:800; color:var(--turquoise-dark); text-transform:uppercase;">${prod.badge}</span>
      <h3 style="margin:4px 0 8px; font-size:1.25rem;">${prod.name}</h3>
      <p style="font-size:0.9rem; color:var(--choco-soft); margin-bottom:10px;">${prod.shortDesc}</p>
      <div class="product-price">$${prod.price.toFixed(2)} <small>USD</small></div>
      <div class="product-actions">
        <button class="btn btn-coral btn-sm" style="flex:1;" onclick="addToCart('${prod.id}', 1, true)">+ Agregar</button>
        <button class="btn btn-cream btn-sm" onclick="openQuickView('${prod.id}')">Detalles</button>
      </div>
    </article>
  `).join('');
}

/* ==========================================================================
   ASISTENTE VIRTUAL "DON BAILA" — Motor Conversacional & Acciones Directas
   ========================================================================== */
function normalizeText(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getDonBailaReply(rawQuery) {
  const q = normalizeText(rawQuery);

  // 1. Cómo bailar el trompo / cuerda / dormilón
  if (q.includes('trompo') || q.includes('enroll') || q.includes('cuerda') || q.includes('dormilon') || q.includes('cera')) {
    return {
      text: `🪀 <strong>¡A bailar el trompo!</strong> Sigue estos 3 pasos:<br>
      1️⃣ Haz un nudo corredizo en tu dedo medio y enrolla la cuerda firme desde la punta metálica hacia arriba.<br>
      2️⃣ Sujétalo con la punta hacia arriba, lánzalo con decisión y jala la cuerda hacia atrás antes de que toque el piso.<br>
      3️⃣ Si la cuerda resbala, frótala un poco con cera. ¡Si no baila, inténtalo otra vez!`,
      actionLabel: '⏱️ Abrir Cronómetro Dormilón',
      actionUrl: 'academia.html'
    };
  }

  // 2. Cómo jugar el capirucho
  if (q.includes('capirucho') || q.includes('ensart') || q.includes('palito')) {
    return {
      text: `🎯 <strong>Truco clave para el Capirucho:</strong><br>
      • Sujeta el palito en vertical y deja la campana quieta sin balancearla.<br>
      • Flexiona levemente las rodillas y da un impulso recto hacia arriba.<br>
      • Mantén la vista fija en el orificio y suaviza la caída acompañando con la mano.`,
      actionLabel: '🎯 Ver Guía y Reto Tiro Directo',
      actionUrl: 'academia.html'
    };
  }

  // 3. Qué incluye el kit / medidas / caja / stickers
  if (q.includes('incluye') || q.includes('trae') || q.includes('contenido') || q.includes('medida') || q.includes('caja') || q.includes('sticker')) {
    return {
      text: `📦 <strong>El Kit Dúo Baila Baila Vol. 1 ($18.50) incluye:</strong><br>
      • Caja cofre rígida ilustrada (<code>200×150×100 mm</code>).<br>
      • 1 Trompo de madera torneada + cuerda de algodón.<br>
      • 1 Capirucho típico salvadoreño pintado a mano.<br>
      • Manual plegable (<code>190×140 mm</code>), 4 Tarjetas de Retos y 7 Stickers coleccionables.`,
      actionLabel: '🛒 Agregar Kit Vol. 1 ($18.50)',
      actionFn: "addToCart('kit-vol-1', 1, true)"
    };
  }

  // 4. Cupones y descuentos
  if (q.includes('cupon') || q.includes('descuento') || q.includes('codigo') || q.includes('promo') || q.includes('oferta')) {
    return {
      text: `🎉 <strong>¡Tengo dos códigos activos para ti!</strong><br>
      • <code>BAILA10</code> → <strong>10% de descuento</strong> en tu compra.<br>
      • <code>ELSALVADOR</code> → <strong>15% de descuento</strong> especial.<br>
      Además, si tu compra supera los <strong>$35.00</strong>, ¡el envío es GRATIS!`,
      actionLabel: '🎟️ Aplicar BAILA10 ahora',
      actionFn: "Storage.savePromo('BAILA10'); showToast('🎉 Cupón BAILA10 activado'); if(typeof renderCheckoutSummary==='function') renderCheckoutSummary();"
    };
  }

  // 5. Envíos, entregas, métodos de pago y rastreo de órdenes
  if (q.includes('envio') || q.includes('entrega') || q.includes('departamento') || q.includes('pago') || q.includes('pagar') || q.includes('tarjeta') || q.includes('pedido') || q.includes('orden')) {
    const orders = Storage.getOrders();
    const orderNote = orders.length > 0
      ? `<br>📦 Veo que tienes <strong>${orders.length} pedido(s)</strong> registrado(s); el más reciente es <strong>${orders[0].id}</strong> (${orders[0].status}).`
      : '';
    return {
      text: `🚚 <strong>Envíos y Pagos en El Salvador:</strong><br>
      • Retiro en San Salvador: <strong>Gratis ($0.00)</strong>.<br>
      • Área Metropolitana SS: <strong>$3.00</strong> | Departamentos: <strong>$3.50 – $5.00</strong> (Gratis en compras +$35).<br>
      • Aceptamos <strong>Tarjeta</strong>, <strong>Transferencia/QR</strong> y <strong>Pago Contra Entrega</strong>.${orderNote}`,
      actionLabel: '💳 Ir a Pagar / Ver Pedidos',
      actionUrl: 'checkout.html'
    };
  }

  // 6. Retos Pro y Certificado Maestro
  if (q.includes('reto') || q.includes('certificado') || q.includes('diploma') || q.includes('nivel') || q.includes('pro')) {
    const done = Storage.getChallenges().length;
    return {
      text: `🏆 <strong>Bitácora de 4 Retos Pro:</strong><br>
      Llevas <strong>${done} de 4 retos</strong> completados. Al superar <em>El Bailarín</em>, <em>Tiro Directo</em>, <em>Dormilón en Mano</em> y <em>Reto Baila Baila</em>, desbloqueas tu <strong>Certificado Maestro</strong> personalizado para imprimir.`,
      actionLabel: '🏆 Ir a mi Bitácora de Retos',
      actionUrl: 'academia.html#retos'
    };
  }

  // 7. Colegios, cotizaciones por mayor, eventos
  if (q.includes('colegio') || q.includes('escuela') || q.includes('mayor') || q.includes('cotiz') || q.includes('evento') || q.includes('empresa')) {
    return {
      text: `🏫 <strong>Kits para Colegios y Eventos Culturales:</strong><br>
      Preparamos pedidos especiales desde <strong>15 unidades</strong> con descuentos por volumen y tarjetón personalizado para instituciones en todo El Salvador.`,
      actionLabel: '📩 Solicitar Cotización',
      actionUrl: 'tradicion.html#contacto'
    };
  }

  // 8. Seguridad y edad recomendada
  if (q.includes('edad') || q.includes('seguridad') || q.includes('nino') || q.includes('pequeno') || q.includes('peligro')) {
    return {
      text: `⚠️ <strong>Seguridad ante todo:</strong><br>
      • No apto para niños menores de <strong>3 años (0-3)</strong> por contener cuerda y piezas pequeñas.<br>
      • Juega en espacios abiertos, lejos de vidrios o objetos frágiles, y nunca apuntes el trompo o capirucho hacia el rostro.`
    };
  }

  // 9. Próximos volúmenes / marca / historia
  if (q.includes('vol') || q.includes('yoyo') || q.includes('piscucha') || q.includes('chibola') || q.includes('marca') || q.includes('historia')) {
    return {
      text: `🇸🇻 <strong>Colección Dúo Baila Baila:</strong><br>
      Nacemos bajo tres pilares: <strong>Memoria · Identidad · Pertenencia</strong>. Hoy puedes disfrutar el <strong>Vol. 1 (Trompo & Capirucho)</strong>, y ya vienen en camino el <strong>Vol. 2 (Yoyo & Chibolas)</strong> y el <strong>Vol. 3 (Piscucha)</strong>.`,
      actionLabel: '🔔 Ver Próximos Volúmenes',
      actionUrl: 'index.html'
    };
  }

  // 10. Saludo o consulta general
  return {
    text: `¡Qué gusto saludarte! Soy <strong>Don Baila</strong>, tu guía de <em>Dúo Baila Baila</em>. Puedo ayudarte con:<br>
    • Trucos para bailar el <strong>trompo</strong> o ensartar el <strong>capirucho</strong>.<br>
    • Contenido del <strong>Kit Vol. 1</strong>, precios y <strong>cupones</strong>.<br>
    • Costos de <strong>envío en El Salvador</strong> y estado de tus pedidos.`,
    actionLabel: '🛍️ Explorar Tienda Oficial',
    actionUrl: 'tienda.html'
  };
}

function toggleDonBaila(forceState) {
  const panel = document.getElementById('donBailaPanel');
  if (!panel) return;
  const shouldOpen = typeof forceState === 'boolean' ? forceState : !panel.classList.contains('open');
  panel.classList.toggle('open', shouldOpen);
  if (shouldOpen) {
    renderChatMessages();
    const input = document.getElementById('donBailaInput');
    if (input && window.innerWidth > 768) setTimeout(() => input.focus(), 120);
  }
}

function renderChatMessages() {
  const box = document.getElementById('donBailaMessages');
  if (!box) return;

  let history = Storage.getChatHistory();
  if (history.length === 0) {
    history = [{
      sender: 'bot',
      html: '¡Hola! Soy <strong>Don Baila</strong> 🪀✨ Tu guía oficial de <strong>DÚO BAILA BAILA</strong>. ¿Quieres aprender a hacer el <em>dormilón</em>, ver qué trae el Kit Vol. 1 o conseguir un cupón de descuento?'
    }];
    Storage.saveChatHistory(history);
  }

  box.innerHTML = history.map(msg => {
    let actionBtn = '';
    if (msg.actionUrl) {
      actionBtn = `<br><a href="${msg.actionUrl}" class="db-msg-action">${msg.actionLabel}</a>`;
    } else if (msg.actionFn) {
      actionBtn = `<br><button type="button" class="db-msg-action" onclick="${msg.actionFn}">${msg.actionLabel}</button>`;
    }
    return `<div class="db-msg ${msg.sender}">${msg.html}${actionBtn}</div>`;
  }).join('');

  box.scrollTop = box.scrollHeight;
}

function askDonBaila(text) {
  const clean = text.trim();
  if (!clean) return;

  const history = Storage.getChatHistory();
  history.push({ sender: 'user', html: clean.replace(/</g, '&lt;') });
  Storage.saveChatHistory(history);
  renderChatMessages();

  const box = document.getElementById('donBailaMessages');
  const typing = document.createElement('div');
  typing.className = 'db-msg bot';
  typing.id = 'dbTypingIndicator';
  typing.innerHTML = '<em>Don Baila está enrollando la cuerda...</em>';
  box.appendChild(typing);
  box.scrollTop = box.scrollHeight;

  setTimeout(() => {
    const reply = getDonBailaReply(clean);
    const updated = Storage.getChatHistory();
    updated.push({
      sender: 'bot',
      html: reply.text,
      actionLabel: reply.actionLabel || '',
      actionUrl: reply.actionUrl || '',
      actionFn: reply.actionFn || ''
    });
    Storage.saveChatHistory(updated);
    renderChatMessages();
  }, 420);
}

function handleDonBailaSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('donBailaInput');
  if (!input) return;
  const val = input.value;
  input.value = '';
  askDonBaila(val);
}

function resetDonBailaChat() {
  localStorage.removeItem('dbb_chat_history');
  renderChatMessages();
}

/* ---------------- Inyección de Navbar, Asistente y Footer ---------------- */
function injectSharedShell(activePage) {
  const headerSlot = document.getElementById('siteHeader');
  if (headerSlot) {
    headerSlot.innerHTML = `
      <div class="top-ribbon">
        🇸🇻 JUEGOS TRADICIONALES DE EL SALVADOR · <span>ENVÍO GRATIS EN COMPRAS MAYORES A $35 · CÓDIGO: BAILA10</span>
      </div>
      <header class="navbar">
        <div class="container nav-inner">
          <a href="index.html" class="brand-logo" aria-label="Dúo Baila Baila Inicio">
            <svg width="42" height="42" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="28" fill="#542314" stroke="#F6B61E" stroke-width="3"/>
              <polygon points="27,41 33,41 30,50" fill="#CBD5E1"/>
              <path d="M18,27 C19,35 24,40 27,41 L33,41 C36,40 41,35 42,27 Z" fill="#D99B52"/>
              <rect x="16" y="21" width="28" height="6" rx="3" fill="#1CA39E"/>
              <path d="M19,21 C22,15 26,13 30,13 C34,13 38,15 41,21 Z" fill="#F6B61E"/>
              <rect x="27" y="9" width="6" height="4" rx="2" fill="#E33B2B"/>
            </svg>
            <div class="brand-wordmark">
              <span class="brand-duo"><span class="rays">✦</span> DÚO <span class="rays">✦</span></span>
              <span class="brand-baila">BAILA BAILA</span>
            </div>
          </a>

          <ul class="nav-links" id="mainNavLinks">
            <li><a href="index.html" class="${activePage === 'inicio' ? 'active' : ''}">Inicio</a></li>
            <li><a href="tienda.html" class="${activePage === 'tienda' ? 'active' : ''}">Shopping Baila Baila</a></li>
            <li><a href="academia.html" class="${activePage === 'academia' ? 'active' : ''}">Retos Don Baila</a></li>
            <li><a href="tradicion.html" class="${activePage === 'tradicion' ? 'active' : ''}">Tradición SV</a></li>
            <li><a href="checkout.html" class="${activePage === 'checkout' ? 'active' : ''}">Money Baila Baila</a></li>
          </ul>

          <div class="nav-actions">
            <button class="cart-trigger" onclick="toggleCartDrawer(true)" aria-label="Abrir bolsa de compra">
              <span>🛍️ Bolsa</span>
              <span class="cart-badge">0</span>
            </button>
            <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menú">☰</button>
          </div>
        </div>
      </header>
    `;
  }

  const footerSlot = document.getElementById('siteFooter');
  if (footerSlot) {
    footerSlot.innerHTML = `
      <footer class="site-footer bg-choco-pattern">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div class="brand-wordmark" style="margin-bottom:14px;">
                <span class="brand-duo" style="font-size:1.6rem;"><span class="rays">✦</span> DÚO <span class="rays">✦</span></span>
                <span class="brand-baila" style="color:#FFFFFF; font-size:1.35rem;">BAILA BAILA</span>
              </div>
              <p style="font-size:0.92rem; color:rgba(255,255,255,0.85); margin-bottom:14px;">
                Colección oficial de juegos tradicionales de El Salvador. Porque nuestras tradiciones también se mantienen vivas cuando jugamos.
              </p>
              <div class="pillars-row">
                <span class="pillar-chip" style="background:#E33B2B;">MEMORIA</span>
                <span class="pillar-chip" style="background:#1CA39E;">IDENTIDAD</span>
                <span class="pillar-chip" style="background:#F6B61E; color:#542314;">PERTENENCIA</span>
              </div>
            </div>

            <div>
              <h4 style="color:var(--gold);">Explora el Kit</h4>
              <ul class="footer-links">
                <li><a href="index.html">Inicio</a></li>
                <li><a href="tienda.html">Set Coleccionable Vol. 1</a></li>
                <li><a href="academia.html">Guía Trompo & Capirucho</a></li>
                <li><a href="academia.html#retos">Bitácora de 4 Retos Pro</a></li>
              </ul>
            </div>

            <div>
              <h4 style="color:var(--gold);">Experiencia Cliente</h4>
              <ul class="footer-links">
                <li><a href="checkout.html">Finalizar Compra</a></li>
                <li><a href="checkout.html#mis-pedidos">Rastrear mi Pedido</a></li>
                <li><a href="tradicion.html#contacto">Pedidos Escolares / Eventos</a></li>
                <li><a href="tradicion.html">Nuestra Historia SV</a></li>
              </ul>
            </div>

            <div>
              <div class="safety-banner" style="padding:14px;">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div class="age-03-icon">0-3</div>
                  <div style="font-size:0.8rem; line-height:1.35;">
                    <strong>ADVERTENCIA DE SEGURIDAD</strong><br>
                    No recomendado para niños menores de 3 años. Contiene cuerda y piezas pequeñas.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <span>© 2026 DÚO BAILA BAILA · Juegos Tradicionales de El Salvador. Todos los derechos reservados.</span>
            <span>¡Si no baila, inténtalo otra vez!</span>
          </div>
        </div>
      </footer>

      <!-- Botón Flotante Asistente "Don Baila" -->
      <button class="don-baila-launcher" onclick="toggleDonBaila()" aria-label="Abrir asistente Don Baila">
        <div class="don-baila-avatar">
          <svg width="30" height="30" viewBox="0 0 60 60" aria-hidden="true">
            <polygon points="27,43 33,43 30,53" fill="#94A3B8" stroke="#542314" stroke-width="2"/>
            <path d="M17,27 C18,36 24,41 27,43 L33,43 C36,41 42,36 43,27 Z" fill="#D99B52" stroke="#542314" stroke-width="2"/>
            <rect x="15" y="21" width="30" height="6" rx="3" fill="#1CA39E" stroke="#542314" stroke-width="2"/>
            <path d="M18,21 C21,14 26,12 30,12 C34,12 39,14 42,21 Z" fill="#F6B61E" stroke="#542314" stroke-width="2"/>
            <rect x="26" y="7" width="8" height="5" rx="2" fill="#E33B2B" stroke="#542314" stroke-width="2"/>
          </svg>
          <span class="don-baila-online-dot"></span>
        </div>
        <div class="don-baila-label">
          <strong>✦ Don Baila</strong>
          <span>¿Dudas? ¡Pregúntame!</span>
        </div>
      </button>

      <!-- Ventana de Chat Asistente "Don Baila" -->
      <aside class="don-baila-panel" id="donBailaPanel" aria-label="Asistente virtual Don Baila">
        <div class="db-chat-header">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:50%; background:var(--gold); color:var(--choco-dark); display:flex; align-items:center; justify-content:center; font-weight:900;">🪀</div>
            <div>
              <div style="font-family:var(--font-display); font-size:1.05rem; color:var(--gold);">Don Baila · Guía Oficial</div>
              <div style="font-size:0.74rem; opacity:0.88;">En línea · Trucos, Kits y Envíos SV</div>
            </div>
          </div>
          <div style="display:flex; gap:6px;">
            <button type="button" onclick="resetDonBailaChat()" title="Reiniciar chat" style="background:rgba(255,255,255,0.14); border:1.5px solid #FFF; color:#FFF; width:30px; height:30px; border-radius:50%; cursor:pointer; font-size:0.8rem;">↺</button>
            <button type="button" onclick="toggleDonBaila(false)" title="Cerrar" style="background:var(--coral); border:1.5px solid #FFF; color:#FFF; width:30px; height:30px; border-radius:50%; font-weight:800; cursor:pointer;">✕</button>
          </div>
        </div>

        <div class="db-chat-messages" id="donBailaMessages"></div>

        <div class="db-quick-chips">
          <button type="button" class="db-chip" onclick="askDonBaila('¿Qué trae el Kit Vol. 1?')">📦 ¿Qué trae el Kit?</button>
          <button type="button" class="db-chip" onclick="askDonBaila('¿Cómo bailar el trompo?')">🪀 Truco Trompo</button>
          <button type="button" class="db-chip" onclick="askDonBaila('¿Cómo ensartar el capirucho?')">🎯 Truco Capirucho</button>
          <button type="button" class="db-chip" onclick="askDonBaila('¿Tienen cupones de descuento?')">🎟️ Cupones</button>
          <button type="button" class="db-chip" onclick="askDonBaila('¿Cuánto cuesta el envío?')">🚚 Envíos SV</button>
          <button type="button" class="db-chip" onclick="askDonBaila('¿Cómo gano el certificado?')">🏆 Certificado</button>
        </div>

        <form class="db-chat-form" onsubmit="handleDonBailaSubmit(event)">
          <input type="text" id="donBailaInput" class="db-chat-input" placeholder="Escribe tu duda aquí..." autocomplete="off">
          <button type="submit" class="db-chat-send" aria-label="Enviar pregunta">➤</button>
        </form>
      </aside>

      <!-- Drawer Lateral del Carrito -->
      <div class="drawer-backdrop" id="drawerBackdrop" onclick="toggleCartDrawer(false)"></div>
      <aside class="cart-drawer" id="cartDrawer" aria-label="Bolsa de compras">
        <div class="drawer-header">
          <h3 style="font-size:1.2rem;">🛍️ Tu Bolsa Artesanal</h3>
          <button onclick="toggleCartDrawer(false)" style="background:var(--coral); border:2px solid #FFF; color:#FFF; width:32px; height:32px; border-radius:50%; font-weight:800; cursor:pointer;">✕</button>
        </div>
        <div class="drawer-body" id="cartDrawerBody"></div>
        <div class="drawer-footer">
          <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.05rem; margin-bottom:12px;">
            <span>Subtotal:</span>
            <span id="cartDrawerSubtotal" style="color:var(--coral);">$0.00</span>
          </div>
          <a href="checkout.html" id="cartDrawerCheckoutBtn" class="btn btn-coral btn-block">Proceder al Pago →</a>
        </div>
      </aside>

      <!-- Modal Vista Rápida -->
      <div class="modal-overlay" id="quickViewModal" onclick="if(event.target===this) closeQuickView()">
        <div class="modal-box">
          <button class="modal-close" onclick="closeQuickView()">✕</button>
          <div id="quickViewContent"></div>
        </div>
      </div>
    `;
  }

  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('mainNavLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  updateCartUI();
}
