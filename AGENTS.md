# Astrolab website — project instructions

Read `docs/project/DECISIONS.md` and the relevant maintained project documentation before project work. Use the reusable skill at `docs/skills/website-recreation/SKILL.md` for reference-site planning, frontend implementation and fidelity review; follow its mode-specific reference routing.

## Current authorization

The user has now explicitly authorized implementation of the approved plan. Build the complete static English frontend, starting with live-reference audit and shared foundations, then independent page work and integrated QA. Preserve backend, admin, data and Docker as scoped below. This supersedes the earlier documentation-only checkpoint.

## Approved frontend contract

- Recreate the entire public Astrolab site at `https://astrolab.co/` in the existing Next.js + Payload project, with English static content. The initial route list must be completed by a live audit before implementation.
- Keep typed content, repositories and visual components separate, following the proposed structure document. Preserve the existing Payload/admin/backend and Docker setup during frontend-only work.
- Apply A-012: use the same frontend responsibility boundaries and section/file partitioning as the reference project `/Users/oussama/Documents/payloadcms`, detailed in `docs/project/FRONTEND_STRUCTURE.md`. Review source organization as an explicit delivery gate alongside live visual/motion fidelity. Adapt page/section names to Astrolab, without copying Talinty-only routes, branding or integrations.
- Use semantic theme tokens for colors, gradients and typography. Reproduce the reference's exact available font families/weights/styles by role across every component, including controls; do not introduce unapproved substitutes.
- Use logical CSS and Tailwind `start/end`, `ms/me`, `ps/pe` and logical alignment. Test temporary RTL and direction-aware icons/motion. English-only delivery does not mean translation support.
- Compare reference and localhost live in the same browser engine, with matching viewport, state and scroll progress. Validate actual animation trigger, intermediate states, duration/easing, reversal and responsive behavior. Screenshots alone cannot pass this gate.
- Apply A-010: audit every in-scope route, section, component, decorative background and relevant state, including small details. No known visual or motion discrepancy, even minor, may be silently accepted. Fix it or obtain the user's explicit acceptance of that specific documented difference before declaring the affected parity phase complete. Continue independent work while a particular finding remains open.
- Do not replace reference background motion with a static image or generic effect, nor missing fonts with approximate faces, to claim completion. Unknown measurements and inaccessible live states remain unverified. Passing build/tests or an aggregate screenshot score does not prove exact identity.
- Use local fixed assets and record provenance. Report missing assets/fonts and unmeasured motion explicitly.
- Static contact UI has no live message delivery; simulations must be identified as such during local testing. Do not submit reference forms or bookings for QA.
- No changes to the reference project, automatic commits or deployment as part of this scope.

## Agent coordination — A-011

The user explicitly requests multi-agent work for the authorized project phases, with `gpt-6-astra` as the main coordinator and only `gpt-6-luna` or `gpt-5.6-sol` as delegated models. This authorizes delegation within the current task, not starting frontend implementation during documentation-only preparation.

- Coordinator: GPT-6 Astra owns scope, architecture, shared theme/contracts, task assignment, integration, discrepancy resolution and final acceptance. The root conversation model is selected by the user in the app; repository instructions do not switch it. Do not claim Astra is active unless established by the environment. If its identity is unavailable, state this before implementation rather than inventing confirmation.
- Use `gpt-6-luna` for bounded low-complexity work with established contracts: route/asset inventories, structured content entry, simple components following approved primitives, and deterministic checks.
- Use `gpt-5.6-sol` for complex interactions, measured component/background motion, responsive/RTL edge cases, multi-file debugging and independent live fidelity review. Escalate an unresolved Luna task to Sol with the existing evidence, not repeated blind retries.
- Choose based on task complexity and record the reason; this is a project allocation policy, not a claim of measured model performance. Never silently substitute another model if the requested one is unavailable.
- Pass the selected model explicitly to the delegation tool. In this environment, model overrides require `fork_turns: "none"` or a bounded numeric history, not `"all"`; include a self-contained task brief with the necessary context and document paths.
- Normally run one or two subagents concurrently, only for useful independent tasks. Keep dependency-sensitive foundation/integration work sequential. Do not force delegation of trivial tasks or launch nested agents without coordination.
- Each assignment specifies objective, owned files, read-only/shared files, content/theme contracts, reference URLs and measurements, applicable A-010 criteria, allowed checks, and required handoff. Agents must read the applicable project rules and skill references.
- Assign a single writer to each file; changes to shared tokens/contracts/components require coordinator integration. Browser comparisons use separate tabs where possible and serialize changes to shared viewport/browser settings.
- Require handoffs listing changed files, checks actually run, live evidence, remaining discrepancies and unknowns. A subagent's completion claim is not phase acceptance. The coordinator reviews changes and verifies the integrated result against the live reference; complex visual/motion work also gets an independent review.
- Keep compact checkpoints and reuse existing evidence to avoid duplicate work. Do not reduce A-010 fidelity gates to save usage. No model choice guarantees exact results; evidence and correction determine acceptance.

## Checkpoint and reports

Add durable decisions to `docs/project/DECISIONS.md`. Append validated phases to the single `docs/client-reports/RAPPORT_CLIENT.md` using `docs/project/CLIENT_REPORT_TEMPLATE.md`; never copy Talinty's historical completion claims or create separate phase reports.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
