(()=>{
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const page=location.pathname.split('/').pop()||'index.html';
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const chev='<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

/* Transition entre pages + barre de progression */
document.body.insertAdjacentHTML('afterbegin','<div class="wipe" id="wipe"><img src="assets/logo-blanc.png" alt=""></div><div class="prog" id="prog"></div>');
const wipe=$('#wipe');
addEventListener('pageshow',e=>{if(e.persisted){wipe.style.animation='none';void wipe.offsetWidth;wipe.className='wipe';wipe.style.animation=''}});
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href]');
  if(!a||a.target||a.hasAttribute('download')||e.metaKey||e.ctrlKey)return;
  const h=a.getAttribute('href');
  if(!h||h[0]==='#'||/^(https?:|mailto:|tel:)/.test(h)||!/\.html$/.test(h.split('#')[0]))return;
  e.preventDefault();
  wipe.style.animation='none';void wipe.offsetWidth;wipe.className='wipe in';wipe.style.animation='';
  setTimeout(()=>location.href=h,calm?0:520);
});

/* En-tête, recherche, pied de page */
const MAIN=['dirigeant','deputes','parti','medias','actualites','idees'].map(k=>PAGES.find(p=>p.u===k+'.html'));
document.body.insertAdjacentHTML('afterbegin',`
<header class="nav" id="nav">
  <a class="brand" href="index.html" aria-label="Accueil"><img src="assets/logo-blanc.png" alt=""><span>Nom du Parti</span></a>
  <nav class="links" id="links">${MAIN.map(p=>`<a href="${p.u}"${p.u===page?' class="on"':''}>${p.t}</a>`).join('')}</nav>
  <div class="nav-actions">
    <button class="icon-btn" id="searchBtn" aria-label="Rechercher"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg></button>
    <a class="cta" href="rejoindre.html">Joindre le parti</a>
    <button class="icon-btn burger" id="burger" aria-label="Menu"><span></span><span></span></button>
  </div>
</header>
<div class="search" id="search" hidden><input id="searchInput" type="search" placeholder="Rechercher une page ou un sujet" autocomplete="off"><div class="results" id="results"></div></div>`);
const col=(t,keys)=>`<div><h4>${t}</h4><ul>${keys.map(k=>{const p=PAGES.find(x=>x.u===k+'.html');return `<li><a href="${p.u}">${p.t}</a></li>`}).join('')}</ul></div>`;
const words=['Notre langue','Notre économie','Nos régions','Notre avenir'];
const skipBand=['index.html','','rejoindre.html','don.html','benevole.html','mentions.html'];
if(!skipBand.includes(page)){
  const row=[...words,...words,...words].map(w=>`<span>${w}</span>`).join('');
  document.body.insertAdjacentHTML('beforeend',`<section class="ctaband"><div class="wrap"><h2>Prêt à agir pour le Québec ?</h2><div class="acts"><a class="btn solid light" href="rejoindre.html">Devenir membre</a><a class="btn ghost" href="don.html">Faire un don</a><a class="btn ghost" href="benevole.html">Devenir bénévole</a></div></div><div class="outline" aria-hidden="true"><div class="track">${row}</div></div></section>`);
}
document.body.insertAdjacentHTML('beforeend',`
<footer class="sitefoot"><div class="wrap"><div class="cols">
  <div><img src="assets/logo-blanc.png" alt=""><p>Un Québec qui reprend la parole.</p></div>
  ${col('Le parti',['dirigeant','parti','deputes','idees'])}
  ${col("S'informer",['medias','actualites','evenements','faq'])}
  ${col('Agir',['rejoindre','don','benevole','contact'])}
</div><small>Nom du Parti. Autorisé et payé par l'agent officiel du parti. <a href="mentions.html">Mentions légales</a></small></div></footer>`);

/* Apparition échelonnée */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -5% 0px'});
const groups='.grid,.press,.tiers,.values,.news,.events,.timeline,.faq,.acc,.steps,.videos,.rail';
const single='.head,.prose,.callout,.quote,.tbl,.form,.chips,.cols2>div,.split>*';
const mark=el=>{el.classList.add('reveal');io.observe(el)};
function reveal(root=document){
  const gs=root.matches&&root.matches(groups)?[root]:$$(groups,root);
  gs.forEach(g=>[...g.children].forEach((el,i)=>{el.style.setProperty('--i',Math.min(i,8));mark(el)}));
  if(root===document)$$(single).forEach(mark);
}

/* Données */
const put=(id,fn)=>{const el=document.getElementById(id);if(!el)return;el.innerHTML=fn(el);reveal(el)};
const lim=(el,a)=>a.slice(0,+el.dataset.limit||a.length);
const ini=n=>n.split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();
const card=p=>`<article class="card"><div class="ph">${p.photo?`<img class="cover" src="${p.photo}" alt="">`:`<span class="ini">${ini(p.nom)}</span>`}</div><div class="info"><h3>${p.nom}</h3><p>${p.circ}</p>${p.bio?`<p>${p.bio}</p>`:''}</div></article>`;
put('rail',()=>DEPUTES.map(card).join(''));
const drawNews=c=>put('news',el=>lim(el,NOUVELLES.filter(n=>!c||n.c===c)).map(n=>`<li><a href="actualites.html"><time>${n.d}</time><strong>${n.t}</strong>${chev}</a></li>`).join(''));
drawNews();
const drawDep=r=>put('grid-deputes',()=>DEPUTES.filter(p=>!r||p.reg===r).map(card).join(''));
drawDep();
const chips=(id,vals,fn)=>{const el=document.getElementById(id);if(!el)return;
  el.innerHTML=['Tous',...vals].map((v,i)=>`<button class="chip${i?'':' on'}">${v}</button>`).join('');
  el.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;$$('.chip',el).forEach(x=>x.classList.remove('on'));b.classList.add('on');fn(b.textContent==='Tous'?'':b.textContent)})};
chips('chips-deputes',[...new Set(DEPUTES.map(p=>p.reg))],drawDep);
chips('chips-news',[...new Set(NOUVELLES.map(n=>n.c))],drawNews);
put('events',el=>lim(el,EVENEMENTS).map(e=>`<li><div class="d"><b>${e.j}</b>${e.m}</div><div><h3>${e.t}</h3><p>${e.l}, ${e.h}</p></div><a class="btn solid" href="contact.html">S'inscrire</a></li>`).join(''));
put('acc',el=>lim(el,IDEES).map(i=>`<details><summary>${i.t}</summary><div class="body"><div><ul>${i.l.map(x=>`<li>${x}</li>`).join('')}</ul></div></div></details>`).join(''));
put('faq',()=>FAQ.map(f=>`<details><summary>${f.q}</summary><p>${f.r}</p></details>`).join(''));

/* Titres des pages internes, mot par mot */
const h1=$('.phero h1');
if(h1)h1.innerHTML=h1.textContent.trim().split(/\s+/).map((w,i)=>`<span class="line"><span style="animation-delay:${.6+i*.12}s">${w}</span></span>`).join(' ');

/* Vidéos et photos : utilisées si le fichier existe, sinon fond animé */
$$('video[data-src]').forEach(v=>fetch(v.dataset.src,{method:'HEAD'}).then(r=>{
  if(!r.ok)return;
  v.src=v.dataset.src;
  v.addEventListener('canplay',()=>{v.classList.add('ready');const p=v.closest('.portrait');if(p)p.classList.add('has-photo');if(!v.closest('.vid'))v.play().catch(()=>{})},{once:true});
}).catch(()=>{}));
$$('.portrait[data-photo]').forEach(p=>fetch(p.dataset.photo,{method:'HEAD'}).then(r=>{
  if(!r.ok)return;
  p.insertAdjacentHTML('beforeend',`<img class="cover" src="${p.dataset.photo}" alt="">`);p.classList.add('has-photo');
}).catch(()=>{}));
$$('.vid').forEach(f=>{const v=$('video',f);
  f.addEventListener('mouseenter',()=>v.src&&v.play().catch(()=>{}));
  f.addEventListener('mouseleave',()=>v.pause())});

/* Navigation, progression, parallaxe */
const nav=$('#nav'),links=$('#links'),prog=$('#prog'),mk=$('.hero-mark');
const onScroll=()=>{
  nav.classList.toggle('solid',scrollY>40);
  const m=document.documentElement.scrollHeight-innerHeight;
  prog.style.transform=`scaleX(${m>0?scrollY/m:0})`;
  if(mk&&scrollY<innerHeight)mk.style.marginTop=(scrollY*.18)+'px';
};
onScroll();addEventListener('scroll',onScroll,{passive:true});
$('#burger').onclick=()=>links.classList.toggle('open');

/* Inclinaison des cartes au pointeur */
let last=null;
document.addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse'||calm)return;
  const el=e.target.closest&&e.target.closest('.card,.tier,.press a');
  if(last&&last!==el){last.style.setProperty('--rx','0deg');last.style.setProperty('--ry','0deg')}
  last=el;if(!el)return;
  const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  el.style.setProperty('--ry',x*10+'deg');el.style.setProperty('--rx',-y*10+'deg');
});

/* Fleurs de lys flottantes */
if(!calm){
  const img=new Image();img.src='assets/logo-blanc.png';
  const items=[];
  $$('.hero,.phero,.join,.ctaband').forEach(host=>{
    const c=document.createElement('canvas');c.className='fx';host.prepend(c);
    const o={c,ctx:c.getContext('2d'),vis:false,ps:[]};
    const size=()=>{c.width=host.clientWidth;c.height=host.clientHeight};size();addEventListener('resize',size);
    for(let i=0;i<16;i++)o.ps.push({x:Math.random(),y:Math.random(),s:24+Math.random()*70,v:.00005+Math.random()*.00009,r:Math.random()*6,rv:(Math.random()-.5)*.0016,a:.05+Math.random()*.13,ph:Math.random()*6});
    new IntersectionObserver(e=>o.vis=e[0].isIntersecting).observe(host);
    items.push(o);
  });
  let t0=0;
  const frame=t=>{
    const dt=Math.min(t-t0,50);t0=t;
    if(img.complete&&img.naturalWidth)items.forEach(o=>{
      if(!o.vis)return;
      const{ctx,c}=o;ctx.clearRect(0,0,c.width,c.height);
      o.ps.forEach(p=>{
        p.y-=p.v*dt;p.r+=p.rv*dt;if(p.y<-.25)p.y=1.25;
        ctx.save();ctx.globalAlpha=p.a;
        ctx.translate((p.x+Math.sin(t/3000+p.ph)*.03)*c.width,p.y*c.height);
        ctx.rotate(Math.sin(p.r)*.5);ctx.drawImage(img,-p.s/2,-p.s/2,p.s,p.s);ctx.restore();
      });
    });
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* Carrousel glissant */
const rail=$('#rail');
if(rail){let down=false,sx=0,sl=0;
  rail.addEventListener('pointerdown',e=>{down=true;sx=e.clientX;sl=rail.scrollLeft;rail.classList.add('drag')});
  addEventListener('pointerup',()=>{down=false;rail.classList.remove('drag')});
  addEventListener('pointermove',e=>{if(down)rail.scrollLeft=sl-(e.clientX-sx)})}

/* Recherche */
const box=$('#search'),inp=$('#searchInput'),res=$('#results');
$('#searchBtn').onclick=()=>{box.hidden=!box.hidden;if(!box.hidden)inp.focus()};
addEventListener('keydown',e=>{if(e.key==='Escape')box.hidden=true});
inp.addEventListener('input',()=>{
  const q=inp.value.trim().toLowerCase();
  if(!q){res.innerHTML='';return}
  const h=PAGES.filter(p=>(p.t+' '+p.k).toLowerCase().includes(q));
  res.innerHTML=h.length?h.map(p=>`<a href="${p.u}">${p.t}</a>`).join(''):'<a>Aucun résultat</a>';
});

/* Formulaires (à relier à Supabase) */
$$('form[data-form]').forEach(f=>f.addEventListener('submit',e=>{
  e.preventDefault();
  const msg=$('.form-msg',f.parentElement);let ok=true;
  $$('[required]',f).forEach(i=>{
    const bad=!i.value.trim()||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value));
    i.classList.toggle('err',bad);if(bad)ok=false});
  msg.textContent=ok?f.dataset.ok:'Vérifiez les champs en surbrillance.';
  if(ok)f.reset();
}));
$$('.amounts').forEach(a=>a.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  $$('button',a).forEach(x=>x.classList.remove('on'));b.classList.add('on');
  const t=$('#montant');if(t)t.value=b.dataset.v}));

reveal();
})();
