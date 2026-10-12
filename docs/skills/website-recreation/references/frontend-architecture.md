# Frontend architecture and theme

Adapt names to the existing project; the following is a useful Next.js pattern, not a mandate to migrate another framework:

`content fixtures → repository → server route → page → sections → reusable primitives`

- `content/contracts`: serializable UI types independent of CMS-generated types.
- `content/static`: source copy and media metadata when static delivery is selected.
- `content/repositories`: data boundary; future adapters map backend documents into the same contracts.
- `components/layout`: shared header, footer and navigation.
- `components/ui`: reusable, content-independent controls.
- `components/sections/<Page>/sections/<Section>`: page sections, their CSS modules and any client interaction.
- `design-system`: semantic theme and shared typography/motion values.
- `public/assets`: local fonts, vectors and raster media with provenance recorded in the reference audit.

Keep page-level files for composition. Add client files for state, browser APIs and motion only; add utility/type files only when they carry meaningful shared logic. Repeated lists have a parent owning layout and reusable children receiving typed props. Dedicated hero/sticky sections need not fit a generic grid.

## Theme and fonts

Build a measured role map: page/surface/text/muted/accent/border colors, gradients and state variants; display/body/control/legal font families with weight, style, size, line height and tracking. Use CSS variables, or `@theme` when the existing Tailwind setup calls for generated utilities. Components consume role tokens rather than embedding hex, RGB or font-family declarations independently.

Use the reference's actual font files where available and authorized. Record each role's exact family and weight; prevent accidental browser-default fonts on forms and buttons. Different reference font roles remain different. Check font loading and computed families before judging wrapping or spacing. A missing face is an open mismatch, not permission to declare a substitute identical.

For images, preserve source resolution, aspect ratio, crop/focal point and responsive sizing. SVG is for vector art, not a raster screenshot wrapper. Raster optimization must not introduce visible blur.

## Direction and hydration

When direction-ready layout is in scope, use `start/end`, `margin-inline`, `padding-inline`, `inset-inline`, `border-inline` and logical text alignment. Audit physical Tailwind equivalents too. Directional arrows, inline transforms, swipe/carousel motion and transform origins need explicit direction handling. Do not mirror logos, photos or nondirectional artwork indiscriminately. Maintain readable/focus order, and test both directions.

Keep server-rendered output deterministic. Clean up observers, listeners and animation loops; handle visibility changes and reduced-motion preferences. A frontend-only form may validate and simulate states, but its test mode must not imply that a message was actually delivered.
