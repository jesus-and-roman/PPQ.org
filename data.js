/* ===== Contenu modifiable ===== */
const PAGES=[
  {t:'Notre dirigeant',u:'dirigeant.html',k:'chef biographie parcours citation'},
  {t:'Nos futurs députés',u:'deputes.html',k:'candidats circonscriptions équipe régions'},
  {t:'Ce Parti',u:'parti.html',k:'histoire valeurs structure statuts financement éthique'},
  {t:'Médias',u:'medias.html',k:'vidéos entrevues presse communiqués logo kit'},
  {t:'Actualités',u:'actualites.html',k:'nouvelles communiqués campagne'},
  {t:'Nos Idées',u:'idees.html',k:'plateforme programme économie langue santé éducation régions environnement'},
  {t:'Événements',u:'evenements.html',k:'calendrier assemblée rassemblement rencontre'},
  {t:'Devenir membre',u:'rejoindre.html',k:'adhésion carte membre rejoindre'},
  {t:'Faire un don',u:'don.html',k:'contribution financement don'},
  {t:'Devenir bénévole',u:'benevole.html',k:'bénévolat militer porte-à-porte pancartes'},
  {t:'Questions fréquentes',u:'faq.html',k:'aide questions réponses vote inscription'},
  {t:'Nous joindre',u:'contact.html',k:'contact courriel téléphone permanence'},
  {t:'Mentions légales et confidentialité',u:'mentions.html',k:'confidentialité légal agent officiel témoins'}
];
const DEPUTES=[
  {nom:'Prénom Nom',circ:'Chicoutimi',reg:'Saguenay–Lac-Saint-Jean',bio:'Enseignant depuis 15 ans, engagé dans sa communauté.'},
  {nom:'Prénom Nom',circ:'Lac-Saint-Jean',reg:'Saguenay–Lac-Saint-Jean',bio:'Productrice agricole et présidente d\'une coopérative.'},
  {nom:'Prénom Nom',circ:'Jonquière',reg:'Saguenay–Lac-Saint-Jean',bio:'Ingénieur, ancien conseiller municipal.'},
  {nom:'Prénom Nom',circ:'Taschereau',reg:'Capitale-Nationale',bio:'Infirmière et déléguée syndicale.'},
  {nom:'Prénom Nom',circ:'Maurice-Richard',reg:'Montréal',bio:'Entrepreneur dans le secteur culturel.'},
  {nom:'Prénom Nom',circ:'Gaspé',reg:'Gaspésie',bio:'Pêcheur et porte-parole d\'un regroupement régional.'}
];
const NOUVELLES=[
  {d:'3 octobre 2026',c:'Campagne',t:'Lancement officiel de la campagne électorale'},
  {d:'28 septembre 2026',c:'Régions',t:'Notre plan pour les régions dévoilé'},
  {d:'20 septembre 2026',c:'Équipe',t:'Cinq nouveaux candidats se joignent à l\'équipe'},
  {d:'12 septembre 2026',c:'Communiqué',t:'Assemblée des membres : les résultats'},
  {d:'2 septembre 2026',c:'Communiqué',t:'Réaction du parti au budget provincial'},
  {d:'24 août 2026',c:'Campagne',t:'Tournée des régions : première étape au Saguenay'}
];
const EVENEMENTS=[
  {j:'10',m:'oct.',t:'Grand rassemblement de lancement',l:'Saguenay',h:'19 h'},
  {j:'17',m:'oct.',t:'Assemblée citoyenne sur la santé',l:'Québec',h:'18 h 30'},
  {j:'24',m:'oct.',t:'Soirée de financement et rencontre avec les candidats',l:'Montréal',h:'19 h'},
  {j:'31',m:'oct.',t:'Journée de porte-à-porte provinciale',l:'Partout au Québec',h:'10 h'}
];
const IDEES=[
  {t:'Économie',l:['Soutenir les entreprises d\'ici et les emplois en région.','Réduire la paperasse pour les petites entreprises.','Investir dans les infrastructures locales.']},
  {t:'Langue et culture',l:['Protéger et promouvoir le français partout.','Financer la création artistique québécoise.','Valoriser le patrimoine et l\'héritage de la Nouvelle-France.']},
  {t:'Santé',l:['Un médecin de famille pour chaque personne.','Réduire les temps d\'attente à l\'urgence.','Renforcer les soins à domicile.']},
  {t:'Éducation',l:['Des classes plus petites et des enseignants soutenus.','Un accès égal à l\'éducation partout sur le territoire.','Formation professionnelle liée aux besoins régionaux.']},
  {t:'Régions',l:['Décentraliser les décisions vers les régions.','Améliorer le transport et l\'accès à Internet haute vitesse.','Garder les jeunes en région.']},
  {t:'Environnement',l:['Protéger nos forêts, nos lacs et nos rivières.','Accélérer l\'énergie propre produite ici.','Un plan de transition juste pour les travailleurs.']}
];
const FAQ=[
  {q:'Comment devenir membre ?',r:'Remplissez le formulaire de la page Devenir membre. Votre carte est valide un an.'},
  {q:'Comment savoir dans quelle circonscription je vote ?',r:'Entrez votre code postal dans l\'outil de localisation du directeur général des élections.'},
  {q:'Puis-je faire un don ?',r:'Oui. Les contributions sont encadrées par la Loi électorale et réservées aux électeurs.'},
  {q:'Comment devenir candidat ?',r:'Écrivez-nous via la page Contact en indiquant votre circonscription. Un comité vous rencontrera.'},
  {q:'Comment vous aider sans être membre ?',r:'Consultez la page Devenir bénévole : pancartes, appels, porte-à-porte, partage en ligne.'},
  {q:'Comment sont financées vos activités ?',r:'Par les cotisations et contributions des électeurs. La liste des revenus est publiée selon la loi.'}
];
