# Project workflow and durable documentation

## Start and resume

Read the project's applicable instructions, maintained handoff information and durable decisions. Inspect changes before editing. Follow the user's current authorized task; a pending phase is not automatic authorization to implement it. Use existing document names when possible.

For a new documented recreation, useful records are:

- `docs/project/DECISIONS.md`: durable choices with their origin and later supersession.
- `docs/project/FRONTEND_STRUCTURE.md`: actual or explicitly proposed file/data architecture.
- `docs/reference/REFERENCE_AUDIT.md`: dated routes, screen states, assets and motion observations, including unknowns.
- `docs/project/REMAINING_WORK.md`: current remaining work and unresolved validation items when the project keeps this handoff.
- `docs/client-reports/RAPPORT_CLIENT.md`: one chronological non-technical report; append validated phases, not separate phase files.

Create only documents useful for the assignment; never copy a previous project's completion status, branding, URLs, passwords, exceptions, or metrics. Keep evidence in one place and link to it.

## Status and reporting

Distinguish proposed, in progress, verified, deferred by scope and blocked. A user-requested planning stop is not a technical blocker. State which checks actually ran, against which revision/date, and what remains untested. Do not translate historical checks into current guarantees.

Update the maintained handoff after meaningful work when the project keeps one. Record lasting decisions without silently overwriting prior ones. Append a client report only when the stated phase gate is satisfied; a documentation phase is not a completed frontend.

For interrupted work, inspect the named files and evidence, then rerun only the smallest check needed to establish the current state.

## Handoff boundary

Document the future data integration boundary if relevant. Label proposed contracts and future APIs as proposed until they exist. A frontend handoff is not authorization to add database schemas, live submission, analytics, translation, deployment, or migrations.
