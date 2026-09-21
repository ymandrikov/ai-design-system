# mini-ds design

## Terminology

mini-ds uses components, layouts and page patterns. Its browser preview is the demo.

## Intent and shared rules

The [settings pages](product/settings-pages.tsx) demonstrate editing profile and
notification preferences in named groups, with one save action per subject and
separate destructive actions. The [settings pattern](design-system/patterns/settings-page.md)
defines their required composition and exceptions. The [demo styles](demo/demo.css)
define preview typography and surfaces; these are not rules for every product.

## Indexes

- Components: [inventory](design-system/COMPONENTS.md)
- Layouts: [index](design-system/LAYOUTS.md)
- Patterns: [index](design-system/PATTERNS.md)

## Contracts

Contracts in `design-system/components/` and `design-system/layouts/` cover both
bindings; `design-system/patterns/settings-page.md` holds the settings recipe. Frontmatter owns
id/status and file paths relative to this mini-ds root. Code stays in react/,
web-components/ and product/. Public usage examples use paths relative to mini-ds
unless an example explicitly states another base.

## Bindings

- Web Components: `web-components/<id>.ts`, imported once to register behaviour;
  native/static markup uses `data-ds` and may need styles but no custom element.
  Consumers author the light DOM specified in the contract.
- React: `react/<id>.tsx`, named exports; product examples in `product/`.
  React and native markup load `styles.css` once; it owns layout and visual values.

## Verification and public use

- From the enclosing workspace root (`../..`), `pnpm test <test-path>`
  runs focused Vitest tests; tests sit beside each binding. `pnpm test` runs all checks.
- Composition: `pnpm test fixtures/mini-ds/product/check-composition.test.tsx`.
  `product/check-composition.ts` checks the settings pattern's DOM relationships.
- Accessibility: WCAG 2.2 AA; modern browsers supporting native form validation and CSS gap.
- Preview: from `../..` run `pnpm run demo`, then `python3 -m http.server 4173`.
  Open `http://localhost:4173/fixtures/mini-ds/demo/settings.html` for two product pages,
  `http://localhost:4173/fixtures/mini-ds/demo/index.html` for component previews.
  No login. Test at narrow and wide widths; one light theme, no theme switch.
- Running production application: none. The local form demo simulates save without persistence.

## Design rules and tokens

Public token catalogue: none. `styles.css` supplies fixture values; Stack exposes
`sm`, `md` and `lg` spacing settings through its contract, not private token overrides.

## Design reference

`styles.css` defines fixture values. `design-system/patterns/settings-page.md` defines grouping,
order and relationships. Browser computed styles/bounding boxes verify actual layout;
there is no external visual design reference or production backend.

## Gaps

[Open gaps](design-system/gaps.md) and [archive](design-system/gaps-archive.md).
Move closed entries to the archive in full with their disposition, closure date and
basis. Resolution requires demonstrating the original expectation.

## Decisions and quality

The person running the skill owns normative choices and lifecycle decisions.
Honour explicit decisions already given in the task.

Follow design-system's ordinary checks. Independent discovery, consumption, final
review and setup demonstrations run only when explicitly requested by the task.
