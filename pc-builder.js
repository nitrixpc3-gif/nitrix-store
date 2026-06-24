const builderProducts = window.NITRIX_BUILDER_PRODUCTS || [];
const byId = id => document.getElementById(id);
const STORE_PHONE = '9647766009666';
let lang = localStorage.getItem('nitrixLang') || 'ar';

const categories = ['cpu','motherboard','gpu','ram','storage','psu','case','cooler'];
const requiredCategories = ['cpu','motherboard','gpu','ram','storage','psu','case'];
const categoryIcons = {cpu:'CPU',motherboard:'MB',gpu:'GPU',ram:'RAM',storage:'SSD',psu:'PSU',case:'CASE',cooler:'COOL'};
const text = {
  ar:{
    announcement:'توصيل إلى جميع محافظات العراق — اطلب مباشرة عبر واتساب',navHome:'الرئيسية',navBuilder:'تجميعتك',navComponents:'القطع',navProducts:'المنتجات',navDeals:'العروض',
    eyebrow:'NITRIX PC BUILDER',title:'ابنِ جهازك خطوة بخطوة',intro:'اختَر المنصة والقطع، وشاهد السعر والتوافق واستهلاك الطاقة مباشرةً قبل إرسال التجميعة إلى واتساب.',priceNoteTitle:'أسعار مرجعية محدثة',priceNote:'هذه نسخة تجريبية بأسعار السوق المنشورة، ويُعاد تأكيد السعر والمخزون عند الطلب.',choosePlatform:'اختر المنصة',reset:'إعادة ضبط التجميعة',summary:'ملخص التجميعة',estimatedPower:'الاستهلاك التقديري',recommendedPsu:'الباور المقترح',total:'السعر الكلي',sendWhatsapp:'إرسال إلى واتساب',copyBuild:'نسخ المواصفات',saveBuild:'حفظ التجميعة على الجهاز',
    footerText:'متجر NITRIX في كربلاء، مع توصيل إلى جميع محافظات العراق.',footerShop:'المتجر',graphics:'كروت الشاشة',footerSupport:'الدعم',contact:'اتصل بنا',footerContact:'التواصل',location:'كربلاء، العراق',delivery:'توصيل إلى جميع محافظات العراق',prototype:'PC Builder V1',
    cpu:'المعالج',motherboard:'المذربورد',gpu:'كرت الشاشة',ram:'الرام',storage:'التخزين',psu:'مزود الطاقة',case:'الكيس',cooler:'التبريد',
    cpuHelp:'اختر المعالج الذي يناسب الألعاب أو العمل.',motherboardHelp:'نظهر لك المذربوردات المتوافقة مع سوكت المعالج.',gpuHelp:'اختر كرت الشاشة بحسب الدقة والأداء المطلوب.',ramHelp:'اختر حجم وسرعة الذاكرة المتوافقة.',storageHelp:'اختر مساحة التخزين وسرعة الـNVMe.',psuHelp:'اختر باور بقدرة أعلى من الاحتياج المقترح.',caseHelp:'اختر كيساً يدعم حجم المذربورد.',coolerHelp:'المبرد الإضافي اختياري، لكنه يُنصح به للمعالجات القوية.',
    select:'اختيار',selected:'تم الاختيار',inStock:'متوفر',warranty:'ضمان 3 سنوات',optional:'اختياري',notSelected:'لم يتم الاختيار',pending:'غير مكتملة',compatible:'متوافقة',warning:'تحتاج مراجعة',
    checkSocketOk:'سوكت المعالج والمذربورد متوافق',checkSocketBad:'سوكت المعالج لا يتوافق مع المذربورد',checkRamOk:'نوع الرام متوافق مع المذربورد',checkRamBad:'نوع الرام غير متوافق مع المذربورد',checkPsuOk:'قدرة الباور مناسبة للتجميعة',checkPsuBad:'قدرة الباور أقل من الاحتياج المقترح',checkCaseOk:'الكيس يدعم حجم المذربورد',checkCaseBad:'الكيس لا يدعم حجم المذربورد',checkCoolerOk:'المبرد يدعم سوكت المعالج',checkCoolerBad:'المبرد لا يدعم سوكت المعالج',
    missingParts:'أكمل القطع الأساسية حتى يظهر فحص التوافق النهائي.',noOptions:'لا توجد خيارات متوافقة في هذه الخطوة.',saved:'تم حفظ التجميعة على هذا الجهاز',copied:'تم نسخ مواصفات التجميعة',copyFailed:'تعذر النسخ؛ جرّب زر واتساب',needParts:'اختر القطع الأساسية قبل إرسال التجميعة.',restored:'تمت استعادة التجميعة المحفوظة',
    messageTitle:'طلب تجميعة جديدة من موقع NITRIX',platform:'المنصة',parts:'القطع',power:'الاستهلاك التقديري',recommended:'الباور المقترح',compatibility:'حالة التوافق',confirmNote:'يرجى تأكيد الأسعار والمخزون قبل تجهيز الطلب.'
  },
  en:{
    announcement:'Delivery across all of Iraq — Order directly through WhatsApp',navHome:'Home',navBuilder:'PC Builder',navComponents:'Components',navProducts:'Products',navDeals:'Deals',
    eyebrow:'NITRIX PC BUILDER',title:'Build your PC step by step',intro:'Choose your platform and parts, then see pricing, compatibility, and estimated power before sending the build to WhatsApp.',priceNoteTitle:'Updated reference prices',priceNote:'This prototype uses published market prices. Price and stock are reconfirmed when ordering.',choosePlatform:'Choose platform',reset:'Reset build',summary:'Build summary',estimatedPower:'Estimated power',recommendedPsu:'Recommended PSU',total:'Total price',sendWhatsapp:'SEND TO WHATSAPP',copyBuild:'COPY SPECS',saveBuild:'Save build on device',
    footerText:'NITRIX PC Store in Karbala, with delivery across all Iraqi provinces.',footerShop:'Shop',graphics:'Graphics cards',footerSupport:'Support',contact:'Contact us',footerContact:'Contact',location:'Karbala, Iraq',delivery:'Delivery across all Iraqi provinces',prototype:'PC Builder V1',
    cpu:'Processor',motherboard:'Motherboard',gpu:'Graphics card',ram:'Memory',storage:'Storage',psu:'Power supply',case:'Case',cooler:'Cooling',
    cpuHelp:'Choose a processor for gaming or productivity.',motherboardHelp:'Only motherboards compatible with the selected CPU socket are shown.',gpuHelp:'Choose a graphics card based on your target resolution and performance.',ramHelp:'Choose compatible memory capacity and speed.',storageHelp:'Choose NVMe storage capacity and performance.',psuHelp:'Choose a PSU above the recommended power requirement.',caseHelp:'Choose a case that supports the motherboard form factor.',coolerHelp:'Extra cooling is optional but recommended for higher-power CPUs.',
    select:'SELECT',selected:'SELECTED',inStock:'In stock',warranty:'3-year warranty',optional:'Optional',notSelected:'Not selected',pending:'Incomplete',compatible:'Compatible',warning:'Review required',
    checkSocketOk:'CPU and motherboard sockets match',checkSocketBad:'CPU socket does not match motherboard',checkRamOk:'Memory type matches motherboard',checkRamBad:'Memory type does not match motherboard',checkPsuOk:'PSU capacity is suitable',checkPsuBad:'PSU capacity is below recommendation',checkCaseOk:'Case supports motherboard form factor',checkCaseBad:'Case does not support motherboard form factor',checkCoolerOk:'Cooler supports CPU socket',checkCoolerBad:'Cooler does not support CPU socket',
    missingParts:'Complete the required parts to see final compatibility.',noOptions:'No compatible options are available for this step.',saved:'Build saved on this device',copied:'Build specifications copied',copyFailed:'Could not copy; use the WhatsApp button',needParts:'Select all required parts before sending the build.',restored:'Saved build restored',
    messageTitle:'New PC build request from NITRIX website',platform:'Platform',parts:'Parts',power:'Estimated power',recommended:'Recommended PSU',compatibility:'Compatibility',confirmNote:'Please reconfirm pricing and stock before preparing the order.'
  }
};

let state = {platform:'intel',currentStep:0,selected:{}};

function money(value){return `${Number(value || 0).toLocaleString(lang==='ar'?'ar-IQ':'en-US')} ${lang==='ar'?'د.ع':'IQD'}`}
function product(id){return builderProducts.find(p=>p.id===Number(id))}
function selected(category){return product(state.selected[category])}
function cartCount(){try{return JSON.parse(localStorage.getItem('nitrixCart')||'[]').reduce((n,i)=>n+Number(i.qty||1),0)}catch{return 0}}
function showToast(message,error=false){const node=byId('toast');node.textContent=message;node.classList.toggle('error',error);node.classList.add('show');clearTimeout(window.builderToast);window.builderToast=setTimeout(()=>node.classList.remove('show'),2400)}

function availableProducts(category){
  let list=builderProducts.filter(p=>p.category===category);
  const cpu=selected('cpu'), board=selected('motherboard');
  if(category==='cpu') list=list.filter(p=>p.platform===state.platform);
  if(category==='motherboard') list=list.filter(p=>cpu ? p.socket===cpu.socket : p.platform===state.platform);
  if(category==='ram' && board) list=list.filter(p=>p.memoryType===board.memoryType);
  if(category==='cooler' && cpu) list=list.filter(p=>p.sockets.includes(cpu.socket));
  return list;
}

function estimatedPower(){
  const cpu=selected('cpu'), gpu=selected('gpu'), board=selected('motherboard'), ram=selected('ram'), storage=selected('storage'), cooler=selected('cooler');
  if(!cpu&&!gpu) return 0;
  return Math.round((cpu?.tdp||0)+(gpu?.power||0)+(board?.power||30)+(ram?.power||8)+(storage?.power||8)+(cooler?.power||0)+55);
}
function recommendedPsu(){
  const watts=estimatedPower();
  if(!watts) return 0;
  return Math.max(550,Math.ceil((watts*1.35)/50)*50);
}
function totalPrice(){return categories.reduce((sum,cat)=>sum+(selected(cat)?.priceNum||0),0)}
function isComplete(){return requiredCategories.every(cat=>selected(cat))}

function compatibilityChecks(){
  const cpu=selected('cpu'), board=selected('motherboard'), ram=selected('ram'), psu=selected('psu'), pcCase=selected('case'), cooler=selected('cooler');
  const checks=[];
  if(cpu&&board) checks.push({ok:cpu.socket===board.socket,good:'checkSocketOk',bad:'checkSocketBad'});
  if(board&&ram) checks.push({ok:board.memoryType===ram.memoryType,good:'checkRamOk',bad:'checkRamBad'});
  if(psu&&recommendedPsu()) checks.push({ok:psu.wattage>=recommendedPsu(),good:'checkPsuOk',bad:'checkPsuBad'});
  if(board&&pcCase) checks.push({ok:pcCase.supports.includes(board.formFactor),good:'checkCaseOk',bad:'checkCaseBad'});
  if(cpu&&cooler) checks.push({ok:cooler.sockets.includes(cpu.socket),good:'checkCoolerOk',bad:'checkCoolerBad'});
  return checks;
}
function buildStatus(){
  if(!isComplete()) return {type:'pending',label:text[lang].pending};
  return compatibilityChecks().every(c=>c.ok)?{type:'ok',label:text[lang].compatible}:{type:'bad',label:text[lang].warning};
}

function renderSteps(){
  byId('stepList').innerHTML=categories.map((cat,index)=>{
    const item=selected(cat), optional=cat==='cooler';
    return `<button class="builder-step ${index===state.currentStep?'active':''} ${item?'done':''}" data-step="${index}" type="button">
      <span class="step-icon">${categoryIcons[cat]}</span><span><strong>${text[lang][cat]}</strong><small>${item?(lang==='ar'?item.ar:item.en):(optional?text[lang].optional:text[lang].notSelected)}</small></span><b>${item?'✓':index+1}</b>
    </button>`;
  }).join('');
  document.querySelectorAll('.builder-step').forEach(btn=>btn.onclick=()=>{state.currentStep=Number(btn.dataset.step);renderAll()});
}

function renderProducts(){
  const cat=categories[state.currentStep];
  byId('currentStepKicker').textContent=`${state.currentStep+1} / ${categories.length}`;
  byId('currentStepTitle').textContent=text[lang][cat];
  byId('currentStepHelp').textContent=text[lang][`${cat}Help`];
  const list=availableProducts(cat);
  byId('builderProducts').innerHTML=list.length?list.map(p=>{
    const active=state.selected[cat]===p.id;
    return `<article class="builder-product ${active?'selected':''}" data-product="${p.id}">
      <span class="builder-stock">● ${text[lang].inStock}</span>
      <div class="builder-product-image"><img src="${p.image}" alt="${lang==='ar'?p.ar:p.en}" loading="lazy"></div>
      <div class="builder-product-brand">${p.brand}</div>
      <h3>${lang==='ar'?p.ar:p.en}</h3>
      <p>${lang==='ar'?p.specAr:p.specEn}</p>
      <div class="builder-product-bottom"><strong>${money(p.priceNum)}</strong><button type="button" data-select="${p.id}">${active?text[lang].selected:text[lang].select}</button></div>
    </article>`;
  }).join(''):`<div class="empty-state">${text[lang].noOptions}</div>`;
  document.querySelectorAll('[data-select]').forEach(btn=>btn.onclick=e=>{e.stopPropagation();chooseProduct(Number(btn.dataset.select))});
  document.querySelectorAll('.builder-product').forEach(card=>card.onclick=()=>chooseProduct(Number(card.dataset.product)));
}

function chooseProduct(id){
  const p=product(id); if(!p) return;
  const cat=p.category;
  state.selected[cat]=id;
  if(cat==='cpu'){
    const board=selected('motherboard'); if(board&&board.socket!==p.socket) delete state.selected.motherboard;
    const cooler=selected('cooler'); if(cooler&&!cooler.sockets.includes(p.socket)) delete state.selected.cooler;
  }
  if(cat==='motherboard'){
    const ram=selected('ram'); if(ram&&ram.memoryType!==p.memoryType) delete state.selected.ram;
    const pcCase=selected('case'); if(pcCase&&!pcCase.supports.includes(p.formFactor)) delete state.selected.case;
  }
  renderAll();
}

function renderSummary(){
  byId('selectedParts').innerHTML=categories.map(cat=>{
    const item=selected(cat);
    return `<div class="summary-part ${item?'filled':''}"><span>${categoryIcons[cat]}</span><div><small>${text[lang][cat]}</small><strong>${item?(lang==='ar'?item.ar:item.en):(cat==='cooler'?text[lang].optional:text[lang].notSelected)}</strong></div>${item?`<b>${money(item.priceNum)}</b>`:''}</div>`;
  }).join('');
  const watts=estimatedPower(), rec=recommendedPsu();
  byId('estimatedPower').textContent=watts?`${watts}W`:'—';
  byId('recommendedPsu').textContent=rec?`${rec}W+`:'—';
  byId('buildTotal').textContent=money(totalPrice());
  const checks=compatibilityChecks();
  byId('compatibilityList').innerHTML=checks.length?checks.map(check=>`<div class="compatibility-item ${check.ok?'good':'bad'}"><span>${check.ok?'✓':'!'}</span>${text[lang][check.ok?check.good:check.bad]}</div>`).join(''):`<div class="compatibility-item neutral"><span>i</span>${text[lang].missingParts}</div>`;
  const status=buildStatus(), badge=byId('compatibilityBadge');
  badge.className=`compatibility-badge ${status.type}`;badge.textContent=status.label;
  byId('prevStep').disabled=state.currentStep===0;
  byId('nextStep').disabled=state.currentStep===categories.length-1;
}

function renderPlatform(){document.querySelectorAll('.platform-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.platform===state.platform))}
function renderAll(){renderPlatform();renderSteps();renderProducts();renderSummary();byId('cartCount').textContent=cartCount()}

function setPlatform(platform){
  if(platform===state.platform) return;
  state.platform=platform;
  delete state.selected.cpu;delete state.selected.motherboard;delete state.selected.cooler;
  state.currentStep=0;renderAll();
}
function resetBuild(){state={platform:'intel',currentStep:0,selected:{}};localStorage.removeItem('nitrixBuilderDraft');renderAll()}

function buildMessage(){
  const status=buildStatus();
  const lines=[`*${text[lang].messageTitle}*`,'',`*${text[lang].platform}:* ${state.platform.toUpperCase()}`,`*${text[lang].parts}:*`];
  categories.forEach(cat=>{const item=selected(cat);if(item)lines.push(`• ${text[lang][cat]}: ${lang==='ar'?item.ar:item.en} — ${money(item.priceNum)}`)});
  lines.push('',`*${text[lang].power}:* ${estimatedPower()}W`,`*${text[lang].recommended}:* ${recommendedPsu()}W+`,`*${text[lang].compatibility}:* ${status.label}`,`*${text[lang].total}:* ${money(totalPrice())}`,'',text[lang].confirmNote);
  return lines.join('\n');
}
function ensureComplete(){if(!isComplete()){showToast(text[lang].needParts,true);return false}return true}
function sendWhatsapp(){if(!ensureComplete())return;window.open(`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(buildMessage())}`,'_blank','noopener')}
async function copyBuild(){if(!ensureComplete())return;const value=buildMessage();try{await navigator.clipboard.writeText(value);showToast(text[lang].copied)}catch{const area=document.createElement('textarea');area.value=value;document.body.appendChild(area);area.select();const ok=document.execCommand('copy');area.remove();showToast(ok?text[lang].copied:text[lang].copyFailed,!ok)}}
function saveBuild(){localStorage.setItem('nitrixBuilderDraft',JSON.stringify({platform:state.platform,selected:state.selected}));showToast(text[lang].saved)}
function restoreBuild(){try{const draft=JSON.parse(localStorage.getItem('nitrixBuilderDraft')||'null');if(draft&&draft.platform&&draft.selected){state.platform=draft.platform;state.selected=draft.selected;showToast(text[lang].restored)}}catch{}}

function applyLang(){
  document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';localStorage.setItem('nitrixLang',lang);
  document.querySelectorAll('[data-i18n]').forEach(node=>{const key=node.dataset.i18n;if(text[lang][key])node.textContent=text[lang][key]});
  byId('langBtn').textContent=lang==='ar'?'EN':'عربي';renderAll();
}

document.querySelectorAll('.platform-btn').forEach(btn=>btn.onclick=()=>setPlatform(btn.dataset.platform));
byId('prevStep').onclick=()=>{if(state.currentStep>0){state.currentStep--;renderAll()}};
byId('nextStep').onclick=()=>{if(state.currentStep<categories.length-1){state.currentStep++;renderAll()}};
byId('resetBuild').onclick=resetBuild;byId('sendBuild').onclick=sendWhatsapp;byId('copyBuild').onclick=copyBuild;byId('saveBuild').onclick=saveBuild;
byId('langBtn').onclick=()=>{lang=lang==='ar'?'en':'ar';applyLang()};
const menuBtn=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');menuBtn.onclick=()=>{nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',nav.classList.contains('open'))};
restoreBuild();applyLang();
