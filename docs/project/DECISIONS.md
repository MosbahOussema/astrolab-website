# Décisions Astrolab

| ID | Date | Décision et origine |
| --- | --- | --- |
| A-001 | 2026-09-28 | L'utilisateur demande la reproduction de tout le site Astrolab et de son comportement visuel ; fidélité desktop, tablette et mobile. |
| A-002 | 2026-09-28 | L'utilisateur choisit le frontend statique d'abord, comme Talinty ; conserver une frontière de données prête pour une future intégration Payload. |
| A-003 | 2026-09-28 | L'utilisateur choisit l'anglais uniquement et exige les propriétés start/end pour une compatibilité RTL ultérieure ; tester temporairement RTL sans ajouter de langue. |
| A-004 | 2026-09-28 | Reprendre l'organisation routes/contenus/repositories/composants/sections du projet de référence ; l'adapter à Astrolab, sans copier ses contenus ou exceptions propres à Talinty. |
| A-005 | 2026-09-28 | L'utilisateur insiste sur des tests live pour reproduire exactement les animations. Comparaison référence/local à états identiques obligatoire ; captures seules insuffisantes. |
| A-006 | 2026-09-28 | L'utilisateur exige les couleurs issues du thème et les mêmes polices sur les composants. Interprétation : tokens sémantiques partagés et polices exactes de la référence par rôle, sans imposer une famille unique si le site en utilise plusieurs. |
| A-007 | 2026-09-28 | L'utilisateur autorise la création de docs et d'une skill générale réutilisable à partir des méthodes du projet précédent. Cette tâche reste documentaire ; réalisation du frontend non démarrée. |
| A-008 | 2026-09-28 | Convention adaptée de la documentation actuelle de Talinty : un seul rapport client chronologique, des résultats actuels distincts de l'historique, et un checkpoint précis après chaque tâche. |
| A-009 | 2026-09-28 | Le périmètre statique comprend une interface de formulaire sans livraison réelle des messages ; préciser les simulations. Les intégrations backend feront l'objet d'un travail ultérieur. |
| A-010 | 2026-09-28 | L'utilisateur exige une précision renforcée sur tous les détails visuels, les polices et les animations des composants ET des fonds. La comparaison live est obligatoire. Tous les écarts connus, même mineurs, doivent être corrigés ou acceptés explicitement et individuellement par l'utilisateur avant validation de la parité concernée. Les inconnues restent non vérifiées. Cette décision renforce A-005/A-006 et remplace le critère initial autorisant une sortie de phase avec de simples écarts mineurs recensés. |

Ajouter une nouvelle décision lorsqu'un choix change et indiquer l'ancienne décision remplacée. Ne pas transformer une hypothèse de l'audit en décision utilisateur.

## A-011 — Répartition des modèles et coordination (2026-09-28)

Demande explicite de l'utilisateur : agent principal GPT-6 Astra ; sous-agents GPT-6 Luna ou GPT-5.6 Sol au choix du coordinateur selon la complexité. Luna reçoit les tâches bornées simples, Sol les tâches complexes et la revue live exigeante. Le coordinateur garde architecture, contrats/thème partagés, intégration et validation finale. Un à deux sous-agents simultanés en général, uniquement pour des travaux indépendants utiles ; responsabilités de fichiers exclusives et preuves de QA obligatoires.

Cette autorisation de délégation suit le périmètre de la tâche ; elle ne lance pas le développement à ce stade documentaire. Le modèle de la conversation principale reste à sélectionner/vérifier dans l'application ; aucune activation d'Astra n'est attestée par ces fichiers. Aucun remplacement silencieux de modèle et aucune garantie de fidélité fondée sur le seul nom d'un modèle : appliquer A-010 au résultat intégré.

## A-012 — Fidélité du rendu et du découpage frontend (2026-09-28)

L'utilisateur réaffirme la priorité du design, de l'affichage et surtout des animations, avec l'organisation de fichiers du projet `payloadcms` de référence. A-010 reste le critère de fidélité visuelle/comportementale. A-012 précise A-004 : reprendre les mêmes responsabilités de dossiers et le découpage page/section/CSS/client/contenus/thème documentés dans `FRONTEND_STRUCTURE.md`, en adaptant les noms et modèles aux écrans Astrolab. Ajouter une revue explicite de structure aux gates de fondations et de livraison ; ne pas importer les pages ou exceptions métier de Talinty.

Cette précision ne constitue ni une réalisation ni une preuve de zéro défaut. Toute déclaration de conformité doit porter sur les contrôles réellement exécutés ; les écarts détectés restent soumis à A-010. Le périmètre demeure la préparation documentaire jusqu'à demande de démarrage.

## A-013 — Démarrage de la réalisation (2026-09-28)

L'utilisateur demande maintenant de commencer l'implémentation du plan complet. L'autorisation documentaire est remplacée par la réalisation frontend statique, audit puis fondations, pages et QA. Le coordinateur a indiqué que son identité exacte de modèle n'est pas vérifiable ; aucune affirmation d'Astra actif. Les modèles délégués sont explicitement Luna (inventaire) et Sol (audit secondaire complexe). Préserver les frontières backend et les critères A-010/A-012.

## A-014 — Exceptions mobiles Rawi acceptées (2026-09-28)

Après présentation des anomalies de la référence mobile Rawi (textes repris d’EldoWallet et cartes de résultats coupées), l’utilisateur répond explicitement «Corriger ces défauts précis». Conserver les contenus propres à Rawi, y compris ses titres de défis/partenariats/résultats, et laisser les cartes afficher leur contenu complet en hauteur naturelle. Préserver le design, les fontes, couleurs, espacements internes et motion. Les différences de texte/hauteur qui en découlent sont des exceptions ciblées acceptées à A-010, pas une autorisation générale de modifier d’autres écarts. Vérifier leur lisibilité sur375/390px et absence de régression desktop.

## A-015 — Couverture Mazad mobile lisible (2026-09-29)

L’utilisateur répond «Oui, corriger ce chevauchement» au défaut source où la couverture1032px masque le titre mobileMazad. Conserver l’asset original, le redimensionner à la largeur disponible et laisser le hero prendre la hauteur nécessaire pour afficher titre et image sans chevauchement. Cette exception ciblée accepte les différences de hauteur/position résultantes sur mobile, pas d’autres écarts. La question distincte sur le titre mobile copié d’EldoWallet reste en attente.

## A-016 — Vrais titres Talinty sur mobile (2026-09-29)

L’utilisateur répond «Oui, garder les vrais titres Talinty» après présentation des titres mobiles copiés d’EldoWallet : «Breaking Through Loyalty Barriers», «Transaction Volume» et «Customer Acquisition Cost». Utiliser les titres Talinty des défis et résultats sur mobile comme sur desktop. Les césures/hauteurs résultantes sont des exceptions ciblées acceptées ; toutes les autres exigences A-010 restent applicables. Cette décision n’étend pas implicitement l’accord au titreMazad, soumis séparément.

## A-017 — Libellés de faits authentiques sur mobile (2026-09-30)

L’utilisateur demande de supprimer le libellé générique «Title» affiché en responsive dans les quatre études de cas. Les champs de faits conservent désormais leurs vrais libellés «Market» et «Platform» à toutes les largeurs, sans autre changement de contenu ou de présentation.

## A-018 — Prototype Framework et maintien du fait Platform (2026-09-30)

Le contrôle live de la référence confirme que la carte Direction enchaîne quatre états : «Planning Phase 01», «Wireframing 02», «Design 03» et «Prototype 04». L’état Prototype est donc rétabli dans le cycle local. Le contrôle approfondi demandé ensuite confirme que chaque état est composé de trois cartes superposées : l’étape courante et les deux historiques, animées par changement de géométrie avec ressort. Cette structure doit être conservée sur desktop et mobile. La référence contient également un second fait Platform et sa valeur sur chacune des quatre études de cas, y compris en mobile. Ce bloc doit rester ; seul le libellé mobile générique «Title» de la référence demeure volontairement corrigé en «Market» et «Platform» conformément à A-017.

## A-019 — Build de production stabilisé sur Webpack (2026-09-30)

Le build Next.js 16 par défaut est resté bloqué dans Turbopack sans erreur ni worker actif. Le même projet a compilé, validé TypeScript, généré les 20 pages et produit le sitemap avec Webpack. Le script `pnpm build` utilise donc explicitement `next build --webpack`. En dehors du réseau Docker, le build local doit recevoir une `DATABASE_URL` pointant vers MongoDB sur `127.0.0.1`; dans Docker, le nom de service `mongo` de `.env` demeure correct. Ce choix ne modifie pas le rendu frontend.
