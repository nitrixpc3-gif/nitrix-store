const products = window.NITRIX_PRODUCTS || [];
const el = id => document.getElementById(id);
let lang = localStorage.getItem('nitrixLang') || 'ar';

const SHIPPING_KARBALA = 3000;
const SHIPPING_OTHER = 5000;
const STORE_PHONE = '9647766009666';

const provinces = [
  {ar:'اختر المحافظة',en:'Select province',value:''},
  {ar:'كربلاء',en:'Karbala',value:'karbala'},
  {ar:'بغداد',en:'Baghdad',value:'baghdad'},
  {ar:'البصرة',en:'Basra',value:'basra'},
  {ar:'النجف',en:'Najaf',value:'najaf'},
  {ar:'بابل',en:'Babylon',value:'babylon'},
  {ar:'الأنبار',en:'Anbar',value:'anbar'},
  {ar:'ديالى',en:'Diyala',value:'diyala'},
  {ar:'كركوك',en:'Kirkuk',value:'kirkuk'},
  {ar:'نينوى',en:'Nineveh',value:'nineveh'},
  {ar:'صلاح الدين',en:'Saladin',value:'saladin'},
  {ar:'واسط',en:'Wasit',value:'wasit'},
  {ar:'ميسان',en:'Maysan',value:'maysan'},
  {ar:'ذي قار',en:'Dhi Qar',value:'dhiqar'},
  {ar:'المثنى',en:'Muthanna',value:'muthanna'},
  {ar:'القادسية',en:'Al-Qadisiyah',value:'qadisiyah'},
  {ar:'دهوك',en:'Duhok',value:'duhok'},
  {ar:'أربيل',en:'Erbil',value:'erbil'},
  {ar:'السليمانية',en:'Sulaymaniyah',value:'sulaymaniyah'},
  {ar:'حلبجة',en:'Halabja',value:'halabja'}
];

const t = {
  ar:{
    announcement:'التوصيل داخل كربلاء 3,000 د.ع — باقي المحافظات 5,000 د.ع — الاستلام من المحل مجاناً',
    navHome:'الرئيسية',navBuilder:'تجميعتك',navComponents:'القطع',navProducts:'المنتجات',navCart:'السلة',
    eyebrow:'إتمام الطلب',title:'سلة مشترياتك',intro:'راجع المنتجات، اختَر التوصيل أو الاستلام من المحل، ثم أرسل الطلب إلى واتساب.',
    cartTitle:'المنتجات',continueShopping:'متابعة التسوق',deliveryTitle:'طريقة الاستلام',deliveryMethod:'توصيل إلى العنوان',deliveryMethodText:'3,000 د.ع داخل كربلاء و5,000 د.ع لبقية المحافظات',pickupMethod:'استلام من المحل',pickupMethodText:'الاستلام من NITRIX في كربلاء مجاناً',
    customerTitle:'معلومات الزبون',nameLabel:'الاسم الكامل',namePlaceholder:'اكتب اسمك الكامل',phoneLabel:'رقم الهاتف',phonePlaceholder:'07XX XXX XXXX',provinceLabel:'المحافظة',addressLabel:'العنوان بالتفصيل',addressPlaceholder:'المنطقة، الشارع، أقرب نقطة دالة',notesLabel:'ملاحظات إضافية (اختياري)',notesPlaceholder:'أي ملاحظة تخص الطلب أو وقت التواصل',paymentTitle:'الدفع عند الاستلام',paymentText:'يتم تأكيد الطلب وتفاصيل التوصيل عبر واتساب.',
    summaryTitle:'ملخص الطلب',subtotal:'مجموع المنتجات',shipping:'أجرة التوصيل',total:'المجموع الكلي',submitOrder:'تأكيد وإرسال الطلب عبر واتساب',secureNote:'لا يتم الدفع داخل الموقع حالياً؛ يتم التأكيد مباشرةً مع NITRIX.',
    footerText:'متجر NITRIX في كربلاء، مع توصيل إلى جميع محافظات العراق.',footerShop:'المتجر',graphics:'كروت الشاشة',products:'المنتجات',footerSupport:'الدعم',contact:'اتصل بنا',footerContact:'التواصل',location:'كربلاء، العراق',deliveryFooter:'توصيل إلى جميع محافظات العراق',
    emptyTitle:'السلة فارغة',emptyText:'أضف منتجاً واحداً على الأقل حتى تكمل الطلب.',browse:'تصفح كروت الشاشة',remove:'حذف',quantity:'الكمية',each:'للقطعة',
    pickupShipping:'الاستلام من المحل مجاني.',karbalaShipping:'أجرة التوصيل داخل كربلاء 3,000 د.ع.',otherShipping:'أجرة التوصيل لبقية المحافظات 5,000 د.ع.',selectProvinceHint:'اختَر المحافظة حتى نحسب أجرة التوصيل.',
    requiredName:'اكتب اسمك الكامل.',requiredPhone:'اكتب رقم هاتف صحيح.',requiredProvince:'اختَر المحافظة.',requiredAddress:'اكتب العنوان بالتفصيل.',emptyCartError:'السلة فارغة. أضف منتجاً أولاً.',orderReady:'تم تجهيز الطلب؛ أكمل إرساله داخل واتساب.',
    orderHeader:'طلب جديد من موقع NITRIX',itemsLabel:'المنتجات',qtyLabel:'الكمية',itemTotal:'المجموع',customerLabel:'معلومات الزبون',fulfillmentLabel:'طريقة الاستلام',deliveryValue:'توصيل إلى العنوان',pickupValue:'استلام من المحل — كربلاء',provinceValue:'المحافظة',addressValue:'العنوان',notesValue:'ملاحظات',subtotalValue:'مجموع المنتجات',shippingValue:'أجرة التوصيل',totalValue:'المجموع الكلي',paymentValue:'الدفع عند الاستلام'
  },
  en:{
    announcement:'Delivery in Karbala: 3,000 IQD — Other provinces: 5,000 IQD — Free store pickup',
    navHome:'Home',navBuilder:'PC Builder',navComponents:'Components',navProducts:'Products',navCart:'Cart',
    eyebrow:'CHECKOUT',title:'Your Shopping Cart',intro:'Review your products, choose delivery or store pickup, then send the order through WhatsApp.',
    cartTitle:'Products',continueShopping:'Continue shopping',deliveryTitle:'Fulfillment method',deliveryMethod:'Delivery to your address',deliveryMethodText:'3,000 IQD in Karbala and 5,000 IQD to other provinces',pickupMethod:'Store pickup',pickupMethodText:'Free pickup from NITRIX in Karbala',
    customerTitle:'Customer information',nameLabel:'Full name',namePlaceholder:'Enter your full name',phoneLabel:'Phone number',phonePlaceholder:'07XX XXX XXXX',provinceLabel:'Province',addressLabel:'Full address',addressPlaceholder:'Area, street and nearest landmark',notesLabel:'Additional notes (optional)',notesPlaceholder:'Any note about the order or preferred contact time',paymentTitle:'Cash on delivery',paymentText:'The order and delivery details are confirmed through WhatsApp.',
    summaryTitle:'Order summary',subtotal:'Products subtotal',shipping:'Delivery fee',total:'Grand total',submitOrder:'Confirm and send order on WhatsApp',secureNote:'No online payment is collected; confirmation is handled directly with NITRIX.',
    footerText:'NITRIX PC Store in Karbala, with delivery across all Iraqi provinces.',footerShop:'Shop',graphics:'Graphics cards',products:'Products',footerSupport:'Support',contact:'Contact us',footerContact:'Contact',location:'Karbala, Iraq',deliveryFooter:'Delivery across all Iraqi provinces',
    emptyTitle:'Your cart is empty',emptyText:'Add at least one product to continue.',browse:'Browse graphics cards',remove:'Remove',quantity:'Quantity',each:'each',
    pickupShipping:'Store pickup is free.',karbalaShipping:'Delivery inside Karbala is 3,000 IQD.',otherShipping:'Delivery to other provinces is 5,000 IQD.',selectProvinceHint:'Select a province to calculate delivery.',
    requiredName:'Enter your full name.',requiredPhone:'Enter a valid phone number.',requiredProvince:'Select a province.',requiredAddress:'Enter your full address.',emptyCartError:'Your cart is empty. Add a product first.',orderReady:'Your order is ready; complete sending it in WhatsApp.',
    orderHeader:'New order from NITRIX website',itemsLabel:'Products',qtyLabel:'Quantity',itemTotal:'Total',customerLabel:'Customer information',fulfillmentLabel:'Fulfillment',deliveryValue:'Delivery to address',pickupValue:'Store pickup — Karbala',provinceValue:'Province',addressValue:'Address',notesValue:'Notes',subtotalValue:'Products subtotal',shippingValue:'Delivery fee',totalValue:'Grand total',paymentValue:'Cash on delivery'
  }
};

function getCart(){
  try{return JSON.parse(localStorage.getItem('nitrixCart') || '[]')}catch{return []}
}
function setCart(cart){localStorage.setItem('nitrixCart',JSON.stringify(cart));renderAll()}
function updateCartCount(){
  const badge=el('cartCount');
  if(badge) badge.textContent=getCart().reduce((n,item)=>n+Number(item.qty||1),0);
}
function formatMoney(value){
  return `${Number(value||0).toLocaleString(lang==='ar'?'ar-IQ':'en-US')} ${lang==='ar'?'د.ع':'IQD'}`;
}
function currentFulfillment(){return document.querySelector('input[name="fulfillment"]:checked')?.value || 'delivery'}
function currentProvince(){return el('provinceSelect').value}
function provinceName(value){const p=provinces.find(x=>x.value===value);return p ? p[lang] : ''}
function cartDetails(){
  return getCart().map(item=>({item,product:products.find(p=>p.id===Number(item.id))})).filter(x=>x.product);
}
function subtotal(){return cartDetails().reduce((sum,{item,product})=>sum+(product.priceNum*Number(item.qty||1)),0)}
function shippingFee(){
  if(currentFulfillment()==='pickup') return 0;
  const province=currentProvince();
  if(!province) return 0;
  return province==='karbala' ? SHIPPING_KARBALA : SHIPPING_OTHER;
}
function showToast(message,isError=false){
  const toast=el('toast');toast.textContent=message;toast.classList.toggle('error',isError);toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('show'),2600);
}
function renderProvinces(){
  const selected=el('provinceSelect').value;
  el('provinceSelect').innerHTML=provinces.map(p=>`<option value="${p.value}">${p[lang]}</option>`).join('');
  if(provinces.some(p=>p.value===selected)) el('provinceSelect').value=selected;
}
function renderCart(){
  const details=cartDetails();
  const box=el('cartItems');
  if(!details.length){
    box.innerHTML=`<div class="cart-empty"><span>🛒</span><h3>${t[lang].emptyTitle}</h3><p>${t[lang].emptyText}</p><a class="btn btn-primary" href="graphics-cards.html">${t[lang].browse}</a></div>`;
    return;
  }
  box.innerHTML=details.map(({item,product})=>{
    const name=lang==='ar'?product.ar:product.en;
    const qty=Number(item.qty||1);
    return `<article class="cart-line" data-id="${product.id}">
      <a class="cart-line-image" href="product.html?id=${product.id}"><img src="${product.image}" alt="${name}"></a>
      <div class="cart-line-info"><span>${product.brand}</span><h3><a href="product.html?id=${product.id}">${name}</a></h3><p>${product.memory}GB • ${t[lang].each}: ${formatMoney(product.priceNum)}</p><button class="remove-item" data-action="remove" data-id="${product.id}">${t[lang].remove}</button></div>
      <div class="cart-line-actions"><div class="qty-control cart-qty"><button data-action="minus" data-id="${product.id}" aria-label="-">−</button><b>${qty}</b><button data-action="plus" data-id="${product.id}" aria-label="+">+</button></div><strong>${formatMoney(product.priceNum*qty)}</strong></div>
    </article>`;
  }).join('');
  box.querySelectorAll('button[data-action]').forEach(btn=>btn.onclick=()=>changeItem(Number(btn.dataset.id),btn.dataset.action));
}
function changeItem(id,action){
  let cart=getCart();
  const row=cart.find(i=>Number(i.id)===id);
  if(!row) return;
  if(action==='plus') row.qty=Number(row.qty||1)+1;
  if(action==='minus') row.qty=Math.max(1,Number(row.qty||1)-1);
  if(action==='remove') cart=cart.filter(i=>Number(i.id)!==id);
  setCart(cart);
}
function renderFulfillment(){
  const mode=currentFulfillment();
  document.querySelectorAll('.delivery-option').forEach(card=>card.classList.toggle('active',card.querySelector('input').checked));
  const delivering=mode==='delivery';
  el('provinceField').classList.toggle('field-hidden',!delivering);
  el('addressField').classList.toggle('field-hidden',!delivering);
  el('provinceSelect').required=delivering;
  el('customerAddress').required=delivering;
}
function renderSummary(){
  const sub=subtotal(), shipping=shippingFee(), total=sub+shipping;
  el('subtotalValue').textContent=formatMoney(sub);
  el('shippingValue').textContent=formatMoney(shipping);
  el('totalValue').textContent=formatMoney(total);
  const mode=currentFulfillment(), province=currentProvince();
  let hint=t[lang].selectProvinceHint;
  if(mode==='pickup') hint=t[lang].pickupShipping;
  else if(province==='karbala') hint=t[lang].karbalaShipping;
  else if(province) hint=t[lang].otherShipping;
  el('shippingHint').textContent=hint;
  el('submitOrder').disabled=getCart().length===0;
}
function renderAll(){renderCart();updateCartCount();renderFulfillment();renderSummary()}
function phoneIsValid(value){return /^(?:\+?964|0)?7[3-9]\d{8}$/.test(value.replace(/[\s-]/g,''))}
function validate(){
  const mode=currentFulfillment();
  const name=el('customerName').value.trim();
  const phone=el('customerPhone').value.trim();
  if(!getCart().length){showToast(t[lang].emptyCartError,true);return false}
  if(name.length<2){el('customerName').focus();showToast(t[lang].requiredName,true);return false}
  if(!phoneIsValid(phone)){el('customerPhone').focus();showToast(t[lang].requiredPhone,true);return false}
  if(mode==='delivery'&&!currentProvince()){el('provinceSelect').focus();showToast(t[lang].requiredProvince,true);return false}
  if(mode==='delivery'&&el('customerAddress').value.trim().length<5){el('customerAddress').focus();showToast(t[lang].requiredAddress,true);return false}
  return true;
}
function orderMessage(){
  const mode=currentFulfillment();
  const details=cartDetails();
  const lines=[`*${t[lang].orderHeader}*`,'',`*${t[lang].itemsLabel}:*`];
  details.forEach(({item,product},idx)=>{
    const name=lang==='ar'?product.ar:product.en;
    const qty=Number(item.qty||1);
    lines.push(`${idx+1}. ${name}`);
    lines.push(`${t[lang].qtyLabel}: ${qty} — ${t[lang].itemTotal}: ${formatMoney(product.priceNum*qty)}`);
  });
  lines.push('',`*${t[lang].customerLabel}:*`);
  lines.push(`${t[lang].nameLabel}: ${el('customerName').value.trim()}`);
  lines.push(`${t[lang].phoneLabel}: ${el('customerPhone').value.trim()}`);
  lines.push(`${t[lang].fulfillmentLabel}: ${mode==='pickup'?t[lang].pickupValue:t[lang].deliveryValue}`);
  if(mode==='delivery'){
    lines.push(`${t[lang].provinceValue}: ${provinceName(currentProvince())}`);
    lines.push(`${t[lang].addressValue}: ${el('customerAddress').value.trim()}`);
  }
  const notes=el('customerNotes').value.trim();
  if(notes) lines.push(`${t[lang].notesValue}: ${notes}`);
  lines.push('',`*${t[lang].subtotalValue}:* ${formatMoney(subtotal())}`);
  lines.push(`*${t[lang].shippingValue}:* ${formatMoney(shippingFee())}`);
  lines.push(`*${t[lang].totalValue}:* ${formatMoney(subtotal()+shippingFee())}`);
  lines.push(`*${t[lang].paymentValue}*`);
  return lines.join('\n');
}
function submitOrder(){
  if(!validate()) return;
  const draft={name:el('customerName').value.trim(),phone:el('customerPhone').value.trim(),province:currentProvince(),address:el('customerAddress').value.trim(),notes:el('customerNotes').value.trim(),fulfillment:currentFulfillment()};
  localStorage.setItem('nitrixCheckoutDraft',JSON.stringify(draft));
  window.open(`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(orderMessage())}`,'_blank','noopener');
  showToast(t[lang].orderReady);
}
function restoreDraft(){
  try{
    const d=JSON.parse(localStorage.getItem('nitrixCheckoutDraft')||'{}');
    el('customerName').value=d.name||'';el('customerPhone').value=d.phone||'';el('customerAddress').value=d.address||'';el('customerNotes').value=d.notes||'';
    if(d.province) el('provinceSelect').value=d.province;
    if(d.fulfillment){const radio=document.querySelector(`input[name="fulfillment"][value="${d.fulfillment}"]`);if(radio)radio.checked=true}
  }catch{}
}
function applyLang(){
  document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';localStorage.setItem('nitrixLang',lang);
  document.querySelectorAll('[data-i18n]').forEach(node=>{const key=node.dataset.i18n;if(t[lang][key])node.textContent=t[lang][key]});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(node=>{const key=node.dataset.i18nPlaceholder;if(t[lang][key])node.placeholder=t[lang][key]});
  el('langBtn').textContent=lang==='ar'?'EN':'عربي';
  renderProvinces();renderAll();
}

document.querySelectorAll('input[name="fulfillment"]').forEach(r=>r.addEventListener('change',()=>{renderFulfillment();renderSummary()}));
el('provinceSelect').addEventListener('change',renderSummary);
el('submitOrder').onclick=submitOrder;
el('langBtn').onclick=()=>{lang=lang==='ar'?'en':'ar';applyLang()};
const menuBtn=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');
menuBtn.onclick=()=>{nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',nav.classList.contains('open'))};

renderProvinces();restoreDraft();applyLang();
