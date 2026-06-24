const products = window.NITRIX_PRODUCTS || [];

const i18n = {
  ar:{announcement:'توصيل إلى جميع محافظات العراق — اطلب مباشرة عبر واتساب',navHome:'الرئيسية',navBuilder:'تجميعتك',navComponents:'القطع',navPrebuilt:'تجميعات جاهزة',navDeals:'العروض',searchPlaceholder:'ابحث عن منتج أو فئة...',heroEyebrow:'ابنِ جهازك بدون حدود',heroTitle:'أداء قوي.<br><span>اختيار أذكى.</span>',heroText:'قطع مختارة بعناية وتجميعات تناسب استخدامك وميزانيتك، بدعم مباشر من Nitrix في كربلاء وتوصيل إلى جميع محافظات العراق.',buildBtn:'ابدأ تجميعتك',shopBtn:'تصفح القطع',trustQuality:'منتجات موثوقة',trustSupport:'مساعدة بالاختيار',trustDelivery:'توصيل داخل العراق',categoriesEyebrow:'الأقسام الرئيسية',categoriesTitle:'كل شيء لبناء جهازك',catPrebuilt:'تجميعات جاهزة',catPrebuiltText:'جاهزة للعمل واللعب',catComponents:'قطع الكمبيوتر',catComponentsText:'معالجات وكروت وباقي القطع',catLaptops:'لابتوبات',catLaptopsText:'للعمل والدراسة والألعاب',catMonitors:'شاشات',catMonitorsText:'وضوح وسلاسة أعلى',catAccessories:'إكسسوارات',catAccessoriesText:'كمّل إعدادك بالكامل',featuredEyebrow:'مختارات Nitrix',featuredTitle:'منتجات مميزة',viewAll:'عرض الكل ←',builderEyebrow:'جهازك بطريقتك',builderTitle:'NITRIX PC BUILDER',builderText:'اختَر القطع خطوة بخطوة، احسب السعر، وتأكد من التوافق الأساسي قبل إرسال التجميعة إلى واتساب.',builderPoint1:'✓ توافق المعالج والمذربورد',builderPoint2:'✓ تقدير استهلاك الطاقة',builderPoint3:'✓ مشاركة التجميعة مباشرة',startBuilding:'ابدأ الآن',dealsEyebrow:'عروض البداية',dealsTitle:'وفر على إعدادك',deal1:'كومبو كيبورد وماوس',deal2:'SSD NVMe 1TB',deal3:'مزود طاقة 750W',dealLimited:'لفترة محدودة',footerText:'وجهتك لقطع الكمبيوتر والتجميعات المختارة بعناية، من كربلاء إلى جميع محافظات العراق.',footerShop:'المتجر',footerSupport:'الدعم',contactUs:'اتصل بنا',warranty:'الضمان والاستبدال',footerContact:'التواصل',prototypeNote:'نسخة أولية — الأسبوع الأول',add:'أضف للسلة',details:'التفاصيل',added:'تمت إضافة المنتج للسلة',builderSoon:'صفحة PC Builder راح نبنيها بالمرحلة القادمة',noResults:'ماكو منتج مطابق للبحث',inStock:'متوفر',warranty3:'ضمان 3 سنوات',graphicsCard:'كرت شاشة'},
  en:{announcement:'Delivery across all of Iraq — Order directly through WhatsApp',navHome:'Home',navBuilder:'PC Builder',navComponents:'Components',navPrebuilt:'Prebuilt PCs',navDeals:'Deals',searchPlaceholder:'Search products or categories...',heroEyebrow:'BUILD WITHOUT LIMITS',heroTitle:'POWERFUL PERFORMANCE.<br><span>SMARTER CHOICE.</span>',heroText:'Carefully selected components and builds tailored to your needs and budget, with direct support from Nitrix in Karbala and delivery across Iraq.',buildBtn:'BUILD YOUR PC',shopBtn:'SHOP COMPONENTS',trustQuality:'Trusted products',trustSupport:'Expert guidance',trustDelivery:'Delivery across Iraq',categoriesEyebrow:'MAIN CATEGORIES',categoriesTitle:'Everything to build your PC',catPrebuilt:'Prebuilt PCs',catPrebuiltText:'Ready for work and play',catComponents:'PC Components',catComponentsText:'CPUs, GPUs and more',catLaptops:'Laptops',catLaptopsText:'For work, study and gaming',catMonitors:'Monitors',catMonitorsText:'Sharper and smoother',catAccessories:'Accessories',catAccessoriesText:'Complete your setup',featuredEyebrow:'NITRIX PICKS',featuredTitle:'Featured Products',viewAll:'View all →',builderEyebrow:'BUILD IT YOUR WAY',builderTitle:'NITRIX PC BUILDER',builderText:'Select parts step by step, calculate the price, and check basic compatibility before sending the build to WhatsApp.',builderPoint1:'✓ CPU and motherboard compatibility',builderPoint2:'✓ Power consumption estimate',builderPoint3:'✓ Share your build instantly',startBuilding:'START BUILDING',dealsEyebrow:'LAUNCH DEALS',dealsTitle:'Save on your setup',deal1:'Keyboard & Mouse Combo',deal2:'1TB NVMe SSD',deal3:'750W Power Supply',dealLimited:'Limited time',footerText:'Your destination for carefully selected PC components and builds, based in Karbala with delivery across Iraq.',footerShop:'Shop',footerSupport:'Support',contactUs:'Contact us',warranty:'Warranty & returns',footerContact:'Contact',prototypeNote:'Week-one prototype',add:'ADD TO CART',details:'DETAILS',added:'Product added to cart',builderSoon:'The PC Builder page will be built in the next stage',noResults:'No matching products found',inStock:'In stock',warranty3:'3-year warranty',graphicsCard:'Graphics card'}
};

let lang = localStorage.getItem('nitrixLang') || 'ar';
let showAll = false;
const grid = document.getElementById('productGrid');
const toast = document.getElementById('toast');

function getCart(){
  try{return JSON.parse(localStorage.getItem('nitrixCart') || '[]')}catch{return []}
}
function setCart(cart){
  localStorage.setItem('nitrixCart', JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount(){
  const count = getCart().reduce((sum,item)=>sum + Number(item.qty || 1),0);
  const badge = document.getElementById('cartCount');
  if(badge) badge.textContent = count;
}
function addToCart(id){
  const cart = getCart();
  const found = cart.find(item=>item.id===id);
  if(found) found.qty += 1;
  else cart.push({id,qty:1});
  setCart(cart);
  showToast(i18n[lang].added);
}

function renderProducts(query=''){
  const q=query.trim().toLowerCase();
  let list=products.filter(p =>
    p.ar.toLowerCase().includes(q) ||
    p.en.toLowerCase().includes(q) ||
    p.specsAr.toLowerCase().includes(q) ||
    p.specsEn.toLowerCase().includes(q)
  );
  if(!showAll) list=list.slice(0,5);
  if(!list.length){grid.innerHTML=`<p style="color:#94a0b8;grid-column:1/-1">${i18n[lang].noResults}</p>`;return;}
  grid.innerHTML=list.map(p=>`<article class="product-card">
    <span class="product-badge">${lang==='ar'?p.badgeAr:p.badgeEn}</span>
    <a class="product-visual" href="product.html?id=${p.id}" aria-label="${lang==='ar'?p.ar:p.en}"><img src="${p.image}" alt="${lang==='ar'?p.ar:p.en}" loading="lazy"></a>
    <h3><a href="product.html?id=${p.id}">${lang==='ar'?p.ar:p.en}</a></h3>
    <p class="product-specs">${lang==='ar'?p.specsAr:p.specsEn}</p>
    <div class="product-meta">
      <span class="stock-pill">● ${i18n[lang].inStock}</span>
      <span class="warranty-pill">✓ ${i18n[lang].warranty3}</span>
    </div>
    <div class="price-wrap">
      <div class="price">${p.price} <small>IQD</small></div>
      ${p.oldPrice?`<div class="old-price">${p.oldPrice} IQD</div>`:''}
    </div>
    <div class="product-actions-row">
      <a class="details-btn" href="product.html?id=${p.id}">${i18n[lang].details}</a>
      <button class="add-btn" data-id="${p.id}">${i18n[lang].add}</button>
    </div>
  </article>`).join('');
  document.querySelectorAll('.add-btn').forEach(btn=>btn.onclick=()=>addToCart(Number(btn.dataset.id)));
}
function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
function applyLang(){
  document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  localStorage.setItem('nitrixLang',lang);
  document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(i18n[lang][k])el.innerHTML=i18n[lang][k]});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{const k=el.dataset.i18nPlaceholder;el.placeholder=i18n[lang][k]});
  document.getElementById('langBtn').textContent=lang==='ar'?'EN':'عربي';renderProducts(document.getElementById('searchInput').value);
}
document.getElementById('langBtn').onclick=()=>{lang=lang==='ar'?'en':'ar';applyLang()};
document.getElementById('showAllBtn').onclick=()=>{showAll=!showAll;renderProducts(document.getElementById('searchInput').value)};
document.getElementById('searchForm').onsubmit=e=>{e.preventDefault();showAll=true;renderProducts(document.getElementById('searchInput').value);document.getElementById('products').scrollIntoView({behavior:'smooth'})};
const menuBtn=document.querySelector('.menu-toggle'), nav=document.querySelector('.main-nav');
menuBtn.onclick=()=>{nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',nav.classList.contains('open'))};
nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
updateCartCount();
applyLang();
