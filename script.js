const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const page=location.pathname.split('/').pop()||'index.html';
const chev='<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

/* En-tête, recherche et pied de page */
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
document.body.insertAdjacentHTML('beforeend',`
<footer class="sitefoot"><div class="wrap"><div class="cols">
  <div><img src="assets/logo-blanc.png" alt=""><p>Un Québec qui reprend la parole.</p></div>
  ${col('Le parti',['dirigeant','parti','deputes','idees'])}
  ${col('S\'informer',['medias','actualites','evenements','faq'])}
  ${col('Agir',['rejoindre','don','benevole','contact'])}
</div><small>Nom du Parti. Autorisé et payé par l'agent officiel du parti. <a href="mentions.html">Mentions légales</a></small></div></footer>`);

/* Rendu des données */
const put=(id,fn)=>{const el=document.getElementById(id);if(el)el.innerHTML=fn(el)};
const lim=(el,a)=>a.slice(0,+el.dataset.limit||a.length);
const card=p=>`<article class="card"><div class="ph"><img src="assets/logo-blanc.png" alt=""></div><div class="info"><h3>${p.nom}</h3><p>${p.circ}</p>${p.bio?`<p>${p.bio}</p>`:''}</div></article>`;
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

/* Vidéos : chargées si le fichier existe, sinon fond animé */
$$('video[data-src]').forEach(v=>{
  fetch(v.dataset.src,{method:'HEAD'}).then(r=>{
    if(!r.ok)return;
    v.src=v.dataset.src;
    v.addEventListener('canplay',()=>{v.classList.add('ready');if(!v.closest('.vid'))v.play().catch(()=>{})},{once:true});
  }).catch(()=>{});
});
$$('.vid').forEach(f=>{const v=$('video',f);
  f.addEventListener('mouseenter',()=>v.src&&v.play().catch(()=>{}));
  f.addEventListener('mouseleave',()=>v.pause())});

/* Navigation */
const nav=$('#nav'),links=$('#links');
const onScroll=()=>nav.classList.toggle('solid',scrollY>40);
onScroll();addEventListener('scroll',onScroll,{passive:true});
$('#burger').onclick=()=>links.classList.toggle('open');

/* Apparition */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>io.observe(el));

/* Parallaxe du logo (accueil) */
const mark=$('.hero-mark');
if(mark)addEventListener('scroll',()=>{if(scrollY<innerHeight)mark.style.marginTop=(scrollY*.18)+'px'},{passive:true});

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
