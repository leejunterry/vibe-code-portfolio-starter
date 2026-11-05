const root=document.documentElement;
const themeToggle=document.getElementById('theme-toggle');
function setTheme(theme){root.dataset.theme=theme;try{localStorage.setItem('journey-theme',theme)}catch(e){}}
themeToggle.addEventListener('click',()=>setTheme(root.dataset.theme==='light'?'dark':'light'));

const menuToggle=document.getElementById('menu-toggle');
const mobileNav=document.getElementById('mobile-nav');
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!open));mobileNav.classList.toggle('open',!open)});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const counters=document.querySelectorAll('[data-count]');
const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,end=Number(el.dataset.count),start=performance.now();function tick(now){const t=Math.min((now-start)/1200,1);el.textContent=Math.floor(end*(1-Math.pow(1-t,3))).toLocaleString();if(t<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);countObserver.unobserve(el)}),{threshold:.5});
counters.forEach(el=>countObserver.observe(el));

document.querySelectorAll('.train-expand').forEach(button=>button.addEventListener('click',()=>{const card=button.closest('.train-card');const open=card.classList.toggle('open');button.textContent=open?'Hide specifications −':'View specifications +'}));
const trainSearch=document.getElementById('train-search'),trainFilter=document.getElementById('train-filter'),trainSort=document.getElementById('train-sort');
function filterTrains(){const query=trainSearch.value.toLowerCase(),category=trainFilter.value;document.querySelectorAll('.train-card').forEach(card=>{card.classList.toggle('hidden',!(card.dataset.name.toLowerCase().includes(query)||card.textContent.toLowerCase().includes(query))||(category!=='all'&&card.dataset.category!==category))})}
trainSearch.addEventListener('input',filterTrains);trainFilter.addEventListener('change',filterTrains);
trainSort.addEventListener('change',()=>{const grid=document.getElementById('fleet-grid');const cards=[...grid.children].sort((a,b)=>trainSort.value==='year'?Number(b.dataset.year)-Number(a.dataset.year):a.dataset.name.localeCompare(b.dataset.name));cards.forEach(card=>grid.appendChild(card))});

document.querySelectorAll('[data-nature-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-nature-filter]').forEach(b=>b.classList.remove('active'));button.classList.add('active');const value=button.dataset.natureFilter;document.querySelectorAll('.nature-photo').forEach(photo=>photo.classList.toggle('hidden',value!=='all'&&photo.dataset.category!==value))}));

const placeCopy={
 Singapore:['Garden city, island railways and familiar routes made new through the camera.','#singapore'],
 Bangkok:['Elevated rails, river journeys and gold-lit temple mornings.','#bangkok'],
 Taipei:['Mountain edges meet dense metro lines and glowing night streets.','#taipei'],
 Dubai:['Driverless trains trace a future-facing city across the desert.','#dubai']
};
document.querySelectorAll('.map-marker').forEach(marker=>marker.addEventListener('click',()=>{const place=marker.dataset.place;const preview=document.getElementById('map-preview');preview.querySelector('strong').textContent=place;preview.querySelector('p').textContent=placeCopy[place][0];preview.querySelector('a').href=placeCopy[place][1]}));

const lightbox=document.getElementById('lightbox'),lightboxImage=lightbox.querySelector('img'),lightboxCaption=lightbox.querySelector('figcaption');
document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{const image=button.querySelector('img');lightboxImage.src=image.src;lightboxImage.alt=image.alt;lightboxCaption.textContent=button.dataset.caption||image.alt;lightbox.hidden=false;document.body.style.overflow='hidden'}));
function closeLightbox(){lightbox.hidden=true;document.body.style.overflow=''}
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lightbox.hidden)closeLightbox()});
document.getElementById('year').textContent=new Date().getFullYear();
