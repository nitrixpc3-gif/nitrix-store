const products = window.NITRIX_PRODUCTS || [];
const el = id => document.getElementById(id);
let lang = localStorage.getItem('nitrixLang') || 'ar';

const t = {
  ar:{announcement:'توصيل إلى جميع محافظات العراق — اطلب مباشرة عبر واتساب',navHome:'الرئيسية',navBuilder:'تجميعتك',navComponents:'القطع',navProducts:'المنتجات',navDeals:'العروض',eyebrow:'قطع الكمبيوتر',title:'كروت الشاشة',intro:'اختَر كرت الشاشة المناسب، وشاهد السعر بشكل مباشر. جميع المنتجات المعروضة متوفرة بضمان 3 سنوات وتوصيل إلى كل محافظات العراق.',available:'منتجات متوفرة',filters:'الفلاتر',reset:'إعادة ضبط',searchLabel:'بحث',searchPlaceholder:'اسم المنتج...',brand:'الشركة',memory:'الذاكرة',results:'منتجات',sortFeatured:'الترتيب المقترح',sortLow:'السعر: من الأقل',sortHigh:'السعر: من الأعلى',details:'عرض التفاصيل',add:'أضف للسلة',inStock:'متوفر',warranty:'ضمان 3 سنوات',noResults:'لا توجد منتجات مطابقة',added:'تمت إضافة المنتج للسلة',footerText:'متجر NITRIX في كربلاء، مع توصيل إلى جميع محافظات العراق.',footerShop:'المتجر',graphics:'كروت الشاشة',products:'المنتجات',footerSupport:'الدعم',builder:'PC Builder',contact:'اتصل بنا',footerContact:'التواصل',location:'كربلاء، العراق',delivery:'توصيل إلى جميع محافظات العراق'},
  en:{announcement:'Delivery across all of Iraq — Order directly through WhatsApp',navHome:'Home',navBuilder:'PC Builder',navComponents:'Components',navProducts:'Products',navDeals:'Deals',eyebrow:'PC COMPONENTS',title:'Graphics Cards',intro:'Choose the right graphics card and view its price directly. All listed products are in stock with a 3-year warranty and delivery across Iraq.',available:'products available',filters:'Filters',reset:'Reset',searchLabel:'Search',searchPlaceholder:'Product name...',brand:'Brand',memory:'Memory',results:'products',sortFeatured:'Featured order',sortLow:'Price: low to high',sortHigh:'Price: high to low',details:'VIEW DETAILS',add:'ADD TO CART',inStock:'In stock',warranty:'3-year warranty',noResults:'No matching products',added:'Product added to cart',footerText:'NITRIX PC Store in Karbala, with delivery across all Iraqi provinces.',footerShop:'Shop',graphics:'Graphics cards',products:'Products',footerSupport:'Support',builder:'PC Builder',contact:'Contact us',footerContact:'Contact',location:'Karbala, Iraq',delivery:'Delivery across all Iraqi provinces'}
};

function getCart(){try{return JSON.parse(localStorage.getItem('nitrixCart')||'[]')}catch{return []}}
function setCart(cart){localStorage.setItem('nitrixCart',JSON.stringify(cart));updateCartCount()}
function updateCartCount(){el('cartCount').textContent=getCart().reduce((n,i)=>n+Number(i.qty||1),0)}
function addToCart(id){const cart=getCart();const item=cart.find(i=>i.id===id);if(item)item.qty++;else cart.push({id,qty:1});setCart(cart);showToast(t[lang].added)}
function showToast(message){const toast=el('toast');toast.textContent=message;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}

function selectedValues(name){return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(i=>i.value)}
function filteredProducts(){
  const brands=selectedValues('brand');
  const memories=selectedValues('memory').map(Number);
  const q=el('catalogSearch').value.trim().toLowerCase();
  let list=products.filter(p=>(!brands.length||brands.includes(p.brand))&&(!memories.length||memories.includes(p.memory))&&(!q||p.ar.toLowerCase().includes(q)||p.en.toLowerCase().includes(q)));
  const sort=el('sortSelect').value;
  if(sort==='low')list.sort((a,b)=>a.priceNum-b.priceNum);
  if(sort==='high')list.sort((a,b)=>b.priceNum-a.priceNum);
  return list;
}
function render(){
  const list=filteredProducts();
  el('resultCount').textContent=list.length;
  el('productTotal').textContent=products.length;
  el('catalogGrid').innerHTML=list.length?list.map(p=>`<article class="product-card">
    <span class="product-badge">${lang==='ar'?p.badgeAr:p.badgeEn}</span>
    <a class="product-visual" href="product.html?id=${p.id}"><img src="${p.image}" alt="${lang==='ar'?p.ar:p.en}" loading="lazy"></a>
    <h3><a href="product.html?id=${p.id}">${lang==='ar'?p.ar:p.en}</a></h3>
    <p class="product-specs">${lang==='ar'?p.specsAr:p.specsEn}</p>
    <div class="product-meta"><span class="stock-pill">● ${t[lang].inStock}</span><span class="warranty-pill">✓ ${t[lang].warranty}</span></div>
    <div class="price-wrap"><div class="price">${p.price} <small>IQD</small></div>${p.oldPrice?`<div class="old-price">${p.oldPrice} IQD</div>`:''}</div>
    <div class="product-actions-row"><a class="details-btn" href="product.html?id=${p.id}">${t[lang].details}</a><button class="add-btn" data-id="${p.id}">${t[lang].add}</button></div>
  </article>`).join(''):`<div class="empty-state">${t[lang].noResults}</div>`;
  document.querySelectorAll('.add-btn').forEach(btn=>btn.onclick=()=>addToCart(Number(btn.dataset.id)));
}
function applyLang(){
  document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';localStorage.setItem('nitrixLang',lang);
  document.querySelectorAll('[data-i18n]').forEach(node=>{const key=node.dataset.i18n;if(t[lang][key])node.textContent=t[lang][key]});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(node=>node.placeholder=t[lang][node.dataset.i18nPlaceholder]);
  el('langBtn').textContent=lang==='ar'?'EN':'عربي';
  render();
}

document.querySelectorAll('input[name="brand"],input[name="memory"]').forEach(i=>i.addEventListener('change',render));
el('catalogSearch').addEventListener('input',render);el('sortSelect').addEventListener('change',render);
el('resetFilters').onclick=()=>{document.querySelectorAll('.filters-panel input').forEach(i=>{if(i.type==='checkbox')i.checked=false;else i.value=''});el('sortSelect').value='featured';render()};
el('langBtn').onclick=()=>{lang=lang==='ar'?'en':'ar';applyLang()};
const menuBtn=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');menuBtn.onclick=()=>{nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',nav.classList.contains('open'))};
updateCartCount();applyLang();
