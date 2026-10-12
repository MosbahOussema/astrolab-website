# Frontière de la future intégration Payload

Document de préparation : aucun contrat Astrolab ou adapter CMS n'est encore implémenté. L'actuelle livraison prévue est frontend statique.

Les composants recevront des contenus sérialisables définis dans `src/content/contracts/`, fournis par un repository statique. Une intégration future pourra mapper des documents Payload vers les mêmes contrats sans réécrire HTML, CSS, thème, RTL ou animations.

Les futurs contrats devront couvrir : shell, accueil, contact, études de cas, documents légaux, SEO et médias avec `src`, `alt`, dimensions et cadrage utile. Déterminer les modèles Payload après stabilisation des contrats, sans créer maintenant de nouvelles collections/globals.

Les interactions locales (menu, accordéons éventuels, animations et état du formulaire) resteront indépendantes de la source de contenu. Remplacer plus tard la simulation contact par un service explicitement défini ; ne pas faire dépendre des composants visuels des types générés Payload.

Avant ce raccordement futur : inventorier les contrats réellement livrés, fixer stratégie de médias/cache/revalidation/brouillons et erreurs, importer les contenus, comparer à nouveau le rendu live/local et préserver l'admin existant. Ces opérations ne font pas partie de la tâche documentaire ni du frontend statique.
