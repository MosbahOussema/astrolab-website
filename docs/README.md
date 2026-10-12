# Documentation Astrolab

Cette documentation adapte l'organisation du projet de référence `payloadcms` (frontend Talinty). Elle décrit Astrolab uniquement : aucune validation historique de Talinty n'est transférée à ce projet.

## Reprendre le projet

- [Décisions validées](project/DECISIONS.md)
- [Structure frontend prévue](project/FRONTEND_STRUCTURE.md)
- [Architecture frontend et raccordement Backend](project/FRONTEND_ARCHITECTURE.md)
- [Travail restant](project/REMAINING_WORK.md)
- [Audit de référence et mesures à compléter](reference/REFERENCE_AUDIT.md)
- [Frontière de la future intégration Payload](project/BACKEND_HANDOFF.md)
- [Rapport client unique](client-reports/RAPPORT_CLIENT.md) et [modèle d'entrée](project/CLIENT_REPORT_TEMPLATE.md)

## Skill réutilisable

[website-recreation](skills/website-recreation/SKILL.md) réunit les méthodes de suivi, construction et comparaison visuelle live. Elle est indépendante d'Astrolab et de Talinty : les langues, le backend et le périmètre d'un futur site restent des choix de son projet.

La version conservée ici est la source portable. Une copie personnelle a été installée dans `/Users/oussama/.codex/skills/website-recreation` et vérifiée identique le 28 septembre 2026. Exemple d'invocation : « Utilise $website-recreation pour préparer la reproduction de [URL] dans ce projet. » Le mode préparation n'autorise pas à démarrer le développement. Pour une mise à jour future, modifier la source portable, la valider, puis synchroniser la copie personnelle après contrôle des différences.

Les règles spécifiques à Astrolab sont dans `AGENTS.md` et les décisions. La skill générale ne copie ni les contenus, ni les exceptions Calendly, ni les données ou historiques de l'ancien site.
