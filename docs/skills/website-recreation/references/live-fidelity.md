# Live visual and motion fidelity

## Reference capture

Inventory all in-scope routes from navigation, footer and available sitemap; count unique URLs rather than responsive DOM duplicates. Include menu variants, hover/focus, open/closed, selected, scroll/sticky transitions, empty/error and unknown-route states when relevant. Do not follow live submission flows that create external side effects just for QA.

Record source date, browser, viewport, zoom, language, theme, loaded fonts, scroll coordinate or section progress, and control state. Match these settings on the local page. Inspect normal desktop, tablet and touch layouts and breakpoint boundaries; adapt dimensions to the reference. A useful baseline matrix is 1440×900, 1280×800, 1024×768, 768×1024, 390×844 and 375×667.

## Motion ledger

For every meaningful effect record:

| Field | Evidence to record |
| --- | --- |
| Identity | Route, section, element and reference observation date |
| Trigger | Load, viewport entrance, scroll progress, hover, click or timer |
| States | Initial, intermediate and final geometry/opacity/transform |
| Timing | Delay, duration, stagger, easing/spring or explicitly unmeasured |
| Scroll | Start/end anchors, sticky bounds, direction and reversal behavior |
| Lifecycle | Loop, replay, pause offscreen, tab return and resize behavior |
| Variants | Desktop/tablet/mobile, keyboard, reduced motion and RTL if required |
| Result | Reference/local comparison, residual discrepancy and evidence |

Compare in the same engine side by side or by switching between matching states. Observe the transition itself, not just endpoints. Repeat scroll in both directions; inspect hover entry and exit, cycling controls and viewport changes. Derive timings from available measurements; label estimates and never report them as exact measurements.

Use CSS transitions/keyframes for simple motion, Intersection Observer for entrances and native sticky where suitable. Use an animation library when the measured effect warrants it and the project permits dependencies. Choose based on the effect, not on the reference's authoring tool.

## Acceptance and regressions

Prioritize geometry, font/wrapping, asset crop/resolution, spacing, colors/materials, control states and motion. Keep a discrepancy ledger: blocking, major, minor, accepted, or unverified, with routes and evidence. Do not certify a phase while blocking/major discrepancies remain. Minor and accepted differences must remain visible in the handoff, not be described as exact identity.

After live comparison passes, establish deterministic screenshot baselines for regression. Reduced motion and masking volatile content are useful for snapshots, but their results do not validate normal animation timing. Verify masked integrations separately within scope.

Cover keyboard/focus, normal and reduced motion, layout overflow, touch navigation, temporary RTL where required, asset/font loading, hydration and browser errors. Run build/type/lint and targeted functional checks appropriate to the phase, including existing admin availability if frontend routing/layout changes could affect it. Do not weaken lint or tests just to manufacture a pass; record inherited findings distinctly.

If a live reference or browser is unavailable, complete useful code/static checks and report live fidelity as unverified. Never call screenshot-only or source-only inspection a live animation test.
