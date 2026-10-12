# Travail restant pour terminer le frontend Astrolab

Checkpoint : 29 septembre 2026. Ce document consolide les écarts connus et les vérifications obligatoires ; il ne remplace pas les preuves détaillées. Aucun pourcentage de fidélité ni délai certain n’est déduit du nombre de pages codées. De nouveaux écarts peuvent être découverts pendant les contrôles encore ouverts.

Audit responsive finalisé le 30 septembre : l’ordre de composition des styles des études de cas est corrigé afin que les règles responsive prennent bien le pas sur les variantes desktop. À 375px, EldoWallet utilise la colonne source de 300px avec un inset de 30px ; Talinty, Rawi et Mazad utilisent 320px avec un inset de 20px. La matrice 1440/1280/1024/768/390/375 ne présente plus de débordement horizontal ni de chevauchement titre/image. Home, les documents légaux et les quatre études de cas ont été recontrôlés en live. Les différences verticales de Rawi et Mazad qui subsistent par rapport au mobile de référence sont les corrections explicitement approuvées A-014/A-015 : vrais contenus Rawi et couverture Mazad non superposée au titre.

## Ce qui existe

Les neuf routes publiques identifiées sont implémentées avec contenu anglais statique, composants/sections, CSS colocalisé, fichiers client ciblés, contrats/repositories et thème partagé. Le template Payload, l’administration et Docker sont conservés. La404 a été remplacée selon l’écran source et contrôlée1280/390,HTTP404 et retourclavier réussis ; sa matrice complète reste ouverte. Une route accessible n’est pas une page visuellement terminée.

## Corrections et contrôles par route

| Route / partie | Travail restant précis |
| --- | --- |
| `/` — navigation | Lenis1.1.2/2.4s intégré aux cinq routes source, scroll et positionServices contrôlés. Hash initial `/#framework` corrigé et validé1280 : capsule pleine au saut, compacte au premier scroll utilisateur ; reload sans hash correct. Terminer historique/cross-page/reduced-motion/resize/RTL, puis rejouer menu langue, hover du drapeau, interruption/inversion du header, ancres depuisContact/mobile, menu clavier/focus et tablette. |
| `/` — hero et partenaires | Compositing, carousel5s/.5s, ticker35px/s/hover.5, pauseoffscreen, resize/onglet/reduced, RTL et entrée ticker sont intégrés. Le carousel reprojette désormais sa progression au resize au lieu de sauter à l’endpoint. Rejouer ses états live intermédiaires/retour d’onglet/resize/RTL/reduced et la tonalité finale ; vérifier visuellement les trajectoires du Starfield. |
| `/` — Framework | Géométrie375/809/1024 et entrée extérieure Direction/Execution corrigées ; Mapping reste fixe comme la source. Les graphes internes sont maintenant calés sur les étapes source : Direction500/500/2000/2000/2000/2000ms et reprise à2, Mapping reprend à4, Execution comporte cinq états et reprend à2 ; pause hors écran/onglet et reprise du délai restant sont intégrées. Restent la comparaison live de chaque étape, Design, reduced-motion, RTL, resize et la recapture desktop fractionnaire. |
| `/` — Services | Shell et frontières809/810/1199/1200 corrigés ; géométrieCloud/Design1280, grille1024 et cinqpositions de titre375 mesurées. Apps/Venture/Automation/Cloud/fonds/titre suspendent maintenant timers/RAF/CSS hors écran ou onglet masqué et conservent leur phase ; reduced-motion premier rendu Apps/Venture corrigé. Rejouer390/1440 et comparer les cycles/entrées/fonds à phases source alignées. Design et le reliquat exactFramework restent ouverts ; matériaux/fonds/illustrations complets non acceptés sans live. |
| `/` — Impact | Six icônes source, césures, espacements, géométrie et entrées corrigés/comparés375/809/1024/1280. Rejouer états intermédiaires synchronisés, non-rejeu, hidden-tab, reduced-motion, RTL et micro-interactions avant acceptation. |
| `/` — cartes de cas | Mobile390 corrigé/mesuré, variante tablette empilée et ressorts source intégrés. Contrôle local rapide29septembre : aucun débordement horizontal à375×667 ni1200×800 sur les quatre routes. Recapturer post-HMR1280/1024/375 contre la référence, synchroniser les états intermédiaires, vérifier pointeur/focus/reduced-motion/RTL/resize et arbitrer le vieux contenuKickWin du DOM source1024. |
| `/` et pages avec CTA/footer | Mobile apparié :390×844 footer335×1979 et375×667 footer320×1979. Tablette appariée1024×768 : footer969×1639.75 àx20, bloc bas869×780 et document5531 égaux, sans overflow. Restent1280 interne, liens/retour haut, états intermédiaires/fin, hover/focus/RTL/reduced-motion et trajectoire/distribution du Starfield partagé avant accepter le fond. |
| `/contact` | Paires live1280×800,390×844 et375×667 appariées. À1024×768 après hydratation complète : document1009×2925, hero909×310.59375, formulaire909×625, footer1009×1639.75 et ses quatre blocs sont exacts source/local. Copie locale et annonce `Email copied` vérifiées. Restent timing exact de copie, validation/focus/RTL/reduced en live et états animés complets du footer ; aucun envoi réel. |
| `/thank-you` | Carte/particules et variantes focus/RTL/reduced sont intégrées. Desktop1280, mobile390 et tablette1024 appariés : à1024 la carte944×369 est à(40,320), le titre et le CTA ont les mêmes boîtes source/local. Entrée locale échantillonnée jusqu’à la fin. Restent états source synchronisés, resize/onglet masqué et navigation. |
| `/eldowallet-use-case` | Hero980px/trois lignes, géométrie des sections desktop et texte riche corrigés. Terminer fin mobile/projets associés, états intermédiaires de texte, springs,375/tablette/RTL/lifecycle et shell. Les dérives de l’audit initial ne décrivent plus le code actuel. |
| `/talinty-ai-recruitment-platform` | Hero et sections corrigés, positions desktop contrôlées ; variantes390/375 et vrais titresA-016 intégrés. Terminer recaptures après correction du découpage caractère/césure>12, entrées parents/images, contrôle des états intermédiaires, tablette/RTL/reduced-motion/lifecycle et shell. L’ancien décalage+2620px ne décrit plus le code actuel. |
| `/rawi-al-kotob-use-case` | Titre4lignes, positions desktop des sections, images et cartes corrigés. A-014 : bons textesRawi et cartes sans clipping vérifiés390/375. À810, le masque héros755×419.4375 et le bitmap755×646 centré à−113.03125 sont exacts source/local ; les légendes des projets associés utilisent20px comme la source. Terminer comparaison mobile des autres sections,1200, tous états animés et shell. Aucun écart autre que les exceptions précises A-014 accepté. |
| `/mazad-al-jomrok-use-case` | Couverture1032×660.71875, sections desktop et listes numérotées corrigées. A-015 : chevauchement mobile corrigé et vérifié390/375. Seule la question distincte sur le titreChallenge copié d’EldoWallet reste en attente. Recontrôler le nouveau découpage partagé des caractères, fin mobile, tablette/motion/shell. |
| `/policies/privacy-policy` | Hero/date et corps corrigés ; corps3398.984375desktop/4486.609375mobile390 historiques et paire1024 finale appariée (corps873×3210, Onest16/25.6). Liens `_blank`/noopener et footer1024 exacts. À768, indentation de liste18.62px corrigée : document753×5733, footer et onze titres appariés. Vérifier375 sur une référence correctement hydratée, puis ressort, clavier/RTL/reduced-motion. |
| `/policies/terms-conditions` | Hero/date et corps corrigés ; corps2690.640625desktop/3678.484375mobile390 et positions des11titres contrôlés. À375, document360×6399, titre, premier H2, footer et cadre final20px sont appariés. Vérifier motion,768 et états des liens. |
| URL inconnue —404 | Rendu autonome remplacé ; géométrie/typo1280,390 et375 égales,HTTP404 et retourEnter vérifiés. Hover375 apparié ; focus natif source retesté local après correction (`rgb(0,95,204) auto 1px`, offset1). Restent préférenceclaire/RTL/reduced-motion live, autres tailles et régression détaillée des routes historiquesPayload. VoirNOT_FOUND_CORRECTION. |

Les mesures historiques de pages secondaires proviennent de [l’audit secondaire](../reference/SECONDARY_SCREEN_AUDIT.md), pas d’une nouvelle comparaison de ces pages à chaque checkpoint.

Mise à jour cas29septembre : les entrées parents/images/diviseurs sont maintenant intégrées, et la géométrie1280/1440/1024/768 ainsi que les retests375/390 ont avancé selon [CASE_LAYOUT_CORRECTION](../reference/CASE_LAYOUT_CORRECTION.md). Ne pas réimplémenter ces entrées. Crops/coins/tracking/légendes et carteRawi4 corrigés. Restent les frontières810/1200, tous les écrans non encore comparés visuellement, projets associés au repos/hover, synchronisationmotion, shell et variantesaccessibilité. La revueSol a corrigé hover tactile/pressed et bascule reduced-motion pendant uneancre ;37testsNode et6tests lifecycle isolés passent, sans fermer la vérificationlive correspondante.

## Validation transversale obligatoire avant « terminé »

- [ ] Revue de chaque route, section et petit détail à viewport/scroll/état identiques : polices réellement chargées, graisses/OpenType, césures, couleurs issues du thème, contours, ombres, flous, icônes, crops et couches.
- [ ] Matrice desktop1440×900/1280×800, tablette1024×768/768×1024, mobile390×844/375×667 et frontières de breakpoints ; aucune largeur débordante ni texte/bouton coupé.
- [ ] Animations normales en live : déclenchement, états intermédiaires, durée/courbe/spring, aller-retour, pause, répétition, hover entrée/sortie, resize, onglet masqué/réaffiché. Les captures finales seules ne ferment aucun contrôle motion.
- [ ] Clavier, focus, menu, contrôles et liens ; reduced-motion séparément ; RTL temporaire avec ordre, propriétés logiques et éléments directionnels sans miroir des logos/images.
- [ ] Vérifier tous les textes/liens/assets du manifeste et le rendu sans erreur d’hydratation attribuable à l’application ; distinguer les injections d’extension.
- [ ] Revue d’architecture finale : composants et styles colocalisés, contenus séparés, tokens sémantiques, anglais statique et frontière CMS préservés.
- [ ] Nouveau TypeScript/lint/tests et build production sur le code final, puis vérification des neuf routes,404, assets et administration. Un build historique n’est pas un build final.
- [ ] Captures finales de régression, registre des écarts vidé ou exceptions précises acceptées explicitement, rapport et guide de raccordement futur mis à jour.

## Hors livraison actuelle

Pas d’édition de contenu via Payload, d’envoi d’emails/CRM/calendrier, de traduction, de déploiement ou création automatique de compte. L’administration a affiché `/admin/create-first-user` au dernier contrôle : sa disponibilité est vérifiée, pas un tableau de bord authentifié.

## Ordre de reprise

1. Finir Services (surfaces, Venture puis Web/Mobile/Automation) et recontrôler les variantes.
2. Terminer les sections restantes de l’accueil et CTA/footer, puis les finitions Contact/confirmation.
3. Terminer les cas (Mazad puisTalinty, matrice et motion des quatre), vérifier les corrections légales intégrées et réaliser la404.
4. Exécuter toute la matrice transversale, corriger les écarts découverts, puis seulement clore les phases5/6.
