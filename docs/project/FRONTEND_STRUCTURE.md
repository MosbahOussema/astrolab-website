# Architecture frontend

Cette structure est désormais implémentée pour le frontend Astrolab, tout en conservant les routes historiques du template Payload. La vue réelle, les dépendances par page et le contrat de raccordement Backend sont détaillés dans [FRONTEND_ARCHITECTURE.md](FRONTEND_ARCHITECTURE.md).

```text
src/
├── app/(frontend)/              Routes publiques, layout et métadonnées
├── app/(payload)/               Admin et routes techniques existants
├── components/
│   ├── layout/                  SiteHeader, SiteFooter, navigation
│   ├── ui/                      Boutons, badges, cartes, champs communs
│   └── sections/
│       ├── HomePage/
│       │   ├── HomePage.tsx
│       │   ├── HomePage.module.css
│       │   ├── shared/          Effets partagés seulement si nécessaires
│       │   └── sections/        Hero, Partners, Framework, Services,
│       │                       Impact, CaseStudies, FinalCta
│       ├── ContactPage/
│       ├── CaseStudyPage/
│       └── LegalDocument/
├── content/
│   ├── contracts/               Types sérialisables indépendants de Payload
│   ├── static/                  Textes anglais et métadonnées des médias
│   └── repositories/            Source statique derrière une interface stable
└── design-system/
    └── tokens.css              Thème, polices, couleurs et valeurs partagées

public/assets/                  Polices, logos, images et icônes locales
```

Les URLs publiques devront conserver celles du manifeste, même si plusieurs études de cas partagent un modèle. Choisir le routage après examen du `[slug]` existant du template afin d'éviter les collisions. Les routes héritées `posts`/`search` nécessitent un classement explicite lors de l'audit ; ne pas les supprimer implicitement.

Chaque section conserve sa structure `.tsx`, ses styles `.module.css` et les interactions `.client.tsx` utiles. Les grilles/listes répétées ont un parent de mise en page et des enfants réutilisables typés. Les composants visuels ne chargent pas directement Payload.

Le thème possède des rôles de couleur et de typographie mesurés sur Astrolab. Un bouton partagé utilise toujours les mêmes tokens ; un rôle particulier observé dans une page reçoit une variante explicite. Les styles d'une section ne redéfinissent pas arbitrairement une police ou une couleur commune.

Le layout public utilise l'anglais et LTR par défaut, avec des propriétés logiques et une vérification RTL temporaire. Les API navigateur et mouvements restent dans des composants client limités ; les routes et compositions restent serveur lorsque possible.

## Découpage obligatoire repris de Talinty — A-012

Référence d'organisation : `/Users/oussama/Documents/payloadcms/docs/project/FRONTEND_STRUCTURE.md` et son code frontend. Conserver les mêmes responsabilités de dossiers et le même flux de données, avec des noms de pages/sections adaptés au contenu Astrolab. L'identité de structure ne signifie pas copier les pages Knowledge Base, Demo ou les contenus propres à Talinty.

| Élément | Organisation attendue |
| --- | --- |
| Route `page.tsx` | Charge le contenu via le repository, compose le composant de page et gère les métadonnées ; aucun énorme composant de site intégré dans la route |
| Page `HomePage.tsx` | Assemble les sections ; `HomePage.module.css` gère leur composition et leurs limites, pas tous leurs styles internes |
| Section | Dossier dédié `HomePage/sections/<SectionName>/` contenant `<SectionName>.tsx`, son `.module.css` et les fichiers `.client.tsx` nécessaires |
| Interactions et fonds animés | Colocalisés dans leur section ; déplacer vers `shared/` uniquement les effets réellement réutilisés, sans recopier leur logique dans chaque page |
| Header et footer | Dossiers dédiés dans `components/layout/`, réutilisés entre les pages |
| Contrôles et cartes répétés | Primitives typées dans `components/ui/` ou enfants locaux réutilisables ; parent responsable de la grille/liste |
| Contenus | Fixtures anglaises dans `content/static/`, types UI dans `content/contracts/`, accès via `content/repositories/` |
| Thème et assets | Tokens partagés dans `design-system/`, fichiers fixes locaux dans `public/assets/` |

Exemple de découpage prévu, sans créer maintenant les fichiers applicatifs :

```text
HomePage/sections/HeroSection/
├── HeroSection.tsx
├── HeroSection.module.css
└── HeroBackground.client.tsx    si l'effet utilise des API navigateur
```

Une animation CSS seule ne nécessite pas de composant client. Ne pas créer de fichiers types/utils vides ou inutiles pour imiter une arborescence. La réutilisation doit préserver les variantes visuelles exactes d'Astrolab.

À la revue d'intégration, le coordinateur vérifie les fichiers réellement produits, leurs dépendances, la séparation des contenus, l'absence d'accès Payload dans les composants visuels et l'absence de duplication des styles/animations partagés. Documenter et justifier toute divergence substantielle de ce découpage ; faire accepter explicitement un changement de principe architectural avant de le retenir.
