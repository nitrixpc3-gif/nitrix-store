const products = window.NITRIX_PRODUCTS || [];
const id = Number(new URLSearchParams(location.search).get('id') || 1);
const product = products.find(p=>p.id===id) || products[0];
let lang = localStorage.getItem('nitrixLang') || 'ar';
let qty = 1;
const el = id => document.getElementById(id);

const t = {
  ar:{announcement:'توصيل إلى جميع محافظات العراق — اطلب مباشرة عبر واتساب',navHome:'الرئيسية',navBuilder:'تجميعتك',navComponents:'القطع',navDeals:'العروض',home:'الرئيسية',graphics:'كروت الشاشة',specsEyebrow:'المواصفات',specsTitle:'المواصفات الأساسية',warrantyTitle:'ضمان 3 سنوات',warrantyText:'حسب شروط الضمان والاستبدال المعتمدة.',deliveryTitle:'توصيل إلى كل العراق',deliveryText:'3,000 د.ع داخل كربلاء و5,000 د.ع لبقية المحافظات، مع استلام مجاني من المحل.',supportTitle:'مساعدة قبل الشراء',supportText:'نتأكد أن القطعة مناسبة لجهازك.',relatedEyebrow:'خيارات أخرى',relatedTitle:'منتجات مشابهة',footerText:'متجر NITRIX في كربلاء، مع توصيل إلى جميع محافظات العراق.',footerShop:'المتجر',products:'المنتجات',footerSupport:'الدعم',contact:'اتصل بنا',footerContact:'التواصل',location:'كربلاء، العراق',deliveryFooter:'توصيل إلى جميع محافظات العراق',inStock:'متوفر',warranty:'ضمان 3 سنوات',delivery:'التوصيل إلى جميع محافظات العراق',quantity:'الكمية',add:'أضف للسلة',order:'اطلب عبر واتساب',details:'التفاصيل',added:'تمت إضافة المنتج للسلة',priceLabel:'السعر',taxNote:'السعر ظاهر ومثبت حسب آخر تحديث للمتجر.'},
  en:{announcement:'Delivery across all of Iraq — Order directly through WhatsApp',navHome:'Home',navBuilder:'PC Builder',navComponents:'Components',navDeals:'Deals',home:'Home',graphics:'Graphics Cards',specsEyebrow:'SPECIFICATIONS',specsTitle:'Core Specifications',warrantyTitle:'3-Year Warranty',warrantyText:'Subject to the approved warranty and return policy.',deliveryTitle:'Delivery Across Iraq',deliveryText:'3,000 IQD inside Karbala, 5,000 IQD to other provinces, or free store pickup.',supportTitle:'Pre-Purchase Support',supportText:'We help confirm the part is suitable for your PC.',relatedEyebrow:'MORE OPTIONS',relatedTitle:'Similar Products',footerText:'NITRIX PC Store in Karbala, with delivery across all Iraqi provinces.',footerShop:'Shop',products:'Products',footerSupport:'Support',contact:'Contact us',footerContact:'Contact',location:'Karbala, Iraq',deliveryFooter:'Delivery across all Iraqi provinces',inStock:'In stock',warranty:'3-year warranty',delivery:'Delivery across all Iraqi provinces',quantity:'Quantity',add:'ADD TO CART',order:'ORDER ON WHATSAPP',details:'DETAILS',added:'Product added to cart',priceLabel:'Price',taxNote:'The displayed price is visible and based on the store’s latest update.'}
};

function getCart(){try{return JSON.parse(localStorage.getItem('nitrixCart')||'[]')}catch{return []}}
function setCart(cart){localStorage.setItem('nitrixCart',JSON.stringify(cart));updateCartCount()}
function updateCartCount(){el('cartCount').textContent=getCart().reduce((n,i)=>n+Number(i.qty||1),0)}
function addToCart(){const cart=getCart();const item=cart.find(i=>i.id===product.id);if(item)item.qty+=qty;else cart.push({id:product.id,qty});setCart(cart);showToast(t[lang].added)}
function showToast(message){const toast=el('toast');toast.textContent=message;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
function whatsappLink(){
  const name=lang==='ar'?product.ar:product.en;
  const msg=lang==='ar'
    ?`مرحباً NITRIX، أريد طلب:\n${name}\nالكمية: ${qty}\nالسعر: ${product.price} د.ع\nالمحافظة:`
    :`Hello NITRIX, I would like to order:\n${name}\nQuantity: ${qty}\nPrice: ${product.price} IQD\nProvince:`;
  return `https://wa.me/9647766009666?text=${encodeURIComponent(msg)}`;
}
function renderMain(){
  const name=lang==='ar'?product.ar:product.en;
  const desc=lang==='ar'?product.shortAr:product.shortEn;
  el('crumbProduct').textContent=name;
  document.title=`NITRIX | ${name}`;
  el('productDetail').innerHTML=`
    <div class="product-gallery">
      <div class="main-product-image"><img src="${product.image}" alt="${name}"></div>
      <div class="gallery-note">NITRIX • ${product.brand} • ${product.memory}GB</div>
    </div>
    <div class="product-info-panel">
      <span class="product-page-badge">${lang==='ar'?product.badgeAr:product.badgeEn}</span>
      <p class="product-brand">${product.brand}</p>
      <h1>${name}</h1>
      <p class="product-page-desc">${desc}</p>
      <div class="product-meta product-page-meta"><span class="stock-pill">● ${t[lang].inStock}</span><span class="warranty-pill">✓ ${t[lang].warranty}</span><span class="delivery-pill">⌁ ${t[lang].delivery}</span></div>
      <div class="price-box"><span>${t[lang].priceLabel}</span><strong>${product.price} <small>IQD</small></strong>${product.oldPrice?`<del>${product.oldPrice} IQD</del>`:''}<p>${t[lang].taxNote}</p></div>
      <div class="purchase-row"><span>${t[lang].quantity}</span><div class="qty-control"><button id="qtyMinus" type="button">−</button><b id="qtyValue">${qty}</b><button id="qtyPlus" type="button">+</button></div></div>
      <div class="product-cta-row"><button class="btn btn-primary" id="addMain">${t[lang].add}</button><a class="btn whatsapp-order" id="whatsappOrder" target="_blank" rel="noreferrer">${t[lang].order}</a></div>
    </div>`;
  el('qtyMinus').onclick=()=>{qty=Math.max(1,qty-1);el('qtyValue').textContent=qty;el('whatsappOrder').href=whatsappLink()};
  el('qtyPlus').onclick=()=>{qty++;el('qtyValue').textContent=qty;el('whatsappOrder').href=whatsappLink()};
  el('addMain').onclick=addToCart;
  el('whatsappOrder').href=whatsappLink();
}
function renderSpecs(){
  const rows=product.details[lang]||[];
  el('specsTable').innerHTML=rows.map(([k,v])=>`<div class="spec-row"><span>${k}</span><strong>${v}</strong></div>`).join('');
}
function renderRelated(){
  const related=products.filter(p=>p.id!==product.id).slice(0,4);
  el('relatedGrid').innerHTML=related.map(p=>`<article class="product-card"><span class="product-badge">${lang==='ar'?p.badgeAr:p.badgeEn}</span><a class="product-visual" href="product.html?id=${p.id}"><img src="${p.image}" alt="${lang==='ar'?p.ar:p.en}"></a><h3><a href="product.html?id=${p.id}">${lang==='ar'?p.ar:p.en}</a></h3><p class="product-specs">${lang==='ar'?p.specsAr:p.specsEn}</p><div class="price-wrap"><div class="price">${p.price} <small>IQD</small></div>${p.oldPrice?`<div class="old-price">${p.oldPrice} IQD</div>`:''}</div><a class="details-btn related-details" href="product.html?id=${p.id}">${t[lang].details}</a></article>`).join('');
}
function applyLang(){
  document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';localStorage.setItem('nitrixLang',lang);
  document.querySelectorAll('[data-i18n]').forEach(node=>{const key=node.dataset.i18n;if(t[lang][key])node.textContent=t[lang][key]});
  el('langBtn').textContent=lang==='ar'?'EN':'عربي';renderMain();renderSpecs();renderRelated();
}
el('langBtn').onclick=()=>{lang=lang==='ar'?'en':'ar';applyLang()};
const menuBtn=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');menuBtn.onclick=()=>{nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',nav.classList.contains('open'))};
updateCartCount();applyLang();
