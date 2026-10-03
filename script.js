/* Contenu modifiable */
const DEPUTES=[
  {nom:'Prénom Nom',circ:'Chicoutimi'},{nom:'Prénom Nom',circ:'Lac-Saint-Jean'},
  {nom:'Prénom Nom',circ:'Jonquière'},{nom:'Prénom Nom',circ:'Québec'},
  {nom:'Prénom Nom',circ:'Montréal'},{nom:'Prénom Nom',circ:'Gaspésie'}
];
const NOUVELLES=[
  {d:'3 octobre 2026',t:'Lancement officiel de la campagne électorale'},
  {d:'28 septembre 2026',t:'Notre plan pour les régions dévoilé'},
  {d:'20 septembre 2026',t:'Cinq nouveaux candidats se joignent à l\'équipe'},
  {d:'12 septembre 2026',t:'Assemblée des membres : les résultats'}
];
const IDEES=[
  {t:'Économie',l:['Soutenir les entreprises d\'ici et les emplois en région.','Réduire la paperasse pour les petites entreprises.','Investir dans les infrastructures locales.']},
  {t:'Langue et culture',l:['Protéger et promouvoir le français partout.','Financer la création artistique québécoise.','Valoriser le patrimoine et l\'héritage de la Nouvelle-France.']},
  {t:'Santé',l:['Un médecin de famille pour chaque personne.','Réduire les temps d\'attente à l\'urgence.','Renforcer les soins à domicile.']},
  {t:'Éducation',l:['Des classes plus petites et des enseignants soutenus.','Un accès égal à l\'éducation partout sur le territoire.','Formation professionnelle liée aux besoins régionaux.']},
  {t:'Régions',l:['Décentraliser les décisions vers les régions.','Améliorer le transport et l\'accès à Internet haute vitesse.','Garder les jeunes en région.']},
  {t:'Environnement',l:['Protéger nos forêts, nos lacs et nos rivières.','Accélérer l\'énergie propre produite ici.','Un plan de transition juste pour les travailleurs.']}
];

const $=s=>document.querySelector(s);
const chev='<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

/* Génération */
$('#rail').innerHTML=DEPUTES.map(p=>`<article class="card"><div class="ph"><img src="assets/logo-blanc.png" alt=""></div><div class="info"><h3>${p.nom}</h3><p>${p.circ}</p></div></article>`).join('');
$('#news').innerHTML=NOUVELLES.map(n=>`<li><a href="#"><time>${n.d}</time><strong>${n.t}</strong>${chev}</a></li>`).join('');
$('#acc').innerHTML=IDEES.map(i=>`<details><summary>${i.t}</summary><div class="body"><div><ul>${i.l.map(x=>`<li>${x}</li>`).join('')}</ul></div></div></details>`).join('');

/* Vidéos : charge le fichier s'il existe, sinon le fond animé reste */
document.querySelectorAll('video[data-src]').forEach(v=>{
  const src=v.dataset.src;
  fetch(src,{method:'HEAD'}).then(r=>{
    if(!r.ok)return;
    v.src=src;
    v.addEventListener('canplay',()=>{v.classList.add('ready');v.play().catch(()=>{})},{once:true});
  }).catch(()=>{});
});
/* Vignettes médias : lecture au survol */
document.querySelectorAll('.vid').forEach(f=>{
  const v=f.querySelector('video');
  f.addEventListener('mouseenter',()=>v.src&&v.play().catch(()=>{}));
  f.addEventListener('mouseleave',()=>v.pause());
});

/* Barre de navigation */
const nav=$('#nav');
const onScroll=()=>nav.classList.toggle('solid',scrollY>40);
onScroll();addEventListener('scroll',onScroll,{passive:true});
const links=$('#links'),burger=$('#burger');
burger.onclick=()=>links.classList.toggle('open');
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

/* Lien actif */
const secs=[...links.querySelectorAll('a')].map(a=>({a,s:document.querySelector(a.getAttribute('href'))}));
secs.forEach(x=>{
  new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){secs.forEach(y=>y.a.classList.remove('on'));x.a.classList.add('on')}
  }),{rootMargin:'-45% 0px -50% 0px'}).observe(x.s);
});

/* Apparition */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* Parallaxe légère du logo du héros */
const mark=document.querySelector('.hero-mark');
addEventListener('scroll',()=>{if(scrollY<innerHeight)mark.style.marginTop=(scrollY*.18)+'px'},{passive:true});

/* Défilement par glissement des candidats */
const rail=$('#rail');let down=false,sx=0,sl=0;
rail.addEventListener('pointerdown',e=>{down=true;sx=e.clientX;sl=rail.scrollLeft;rail.classList.add('drag')});
addEventListener('pointerup',()=>{down=false;rail.classList.remove('drag')});
addEventListener('pointermove',e=>{if(down)rail.scrollLeft=sl-(e.clientX-sx)});

/* Recherche */
const box=$('#search'),inp=$('#searchInput'),res=$('#results');
const index=[...document.querySelectorAll('[data-search]')].map(s=>({
  id:s.id,
  titre:(s.querySelector('h2')||{}).textContent||'Adhésion',
  mots:(s.dataset.search+' '+s.textContent).toLowerCase()
}));
$('#searchBtn').onclick=()=>{box.hidden=!box.hidden;if(!box.hidden)inp.focus()};
addEventListener('keydown',e=>{if(e.key==='Escape')box.hidden=true});
inp.addEventListener('input',()=>{
  const q=inp.value.trim().toLowerCase();
  if(!q){res.innerHTML='';return}
  const hits=index.filter(i=>i.mots.includes(q));
  res.innerHTML=hits.length?hits.map(h=>`<a href="#${h.id}">${h.titre}</a>`).join(''):'<a>Aucun résultat</a>';
});
res.addEventListener('click',e=>{if(e.target.closest('a[href]')){box.hidden=true;inp.value='';res.innerHTML=''}});

/* Formulaire d'adhésion (à relier à votre backend) */
$('#joinForm').addEventListener('submit',e=>{
  e.preventDefault();
  const f=e.target,msg=$('#formMsg');
  let ok=true;
  f.querySelectorAll('[required]').forEach(i=>{
    const bad=!i.value.trim()||(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value));
    i.classList.toggle('err',bad);if(bad)ok=false;
  });
  if(!ok){msg.textContent='Vérifiez les champs en surbrillance.';return}
  msg.textContent='Merci. Votre demande d\'adhésion est reçue.';
  f.reset();
});
