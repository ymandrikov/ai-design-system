# tie-ds design

## Terminology

The design system is called tie-ds. Its parts are called components. It
ships contracts only; there is no code and no preview tool.

## Intent and shared rules

This fixture describes selection boundaries for form pickers and consumer token roles.
Contracts define eligible uses; token definitions distinguish roles even when values
match. There is no complete visual identity or rendered reference.

## Indexes

- Components: [inventory](design-system/COMPONENTS.md)
- Layouts: [index](design-system/LAYOUTS.md)
- Patterns: [index](design-system/PATTERNS.md)

## Contracts

Contracts live in `design-system/components/`; the three uppercase indexes
use the framework structure. Frontmatter owns identity/status; `sources: []` records
that this fixture deliberately has no implementation. Its discoverable statuses are
synthetic inputs for selection tests only, not evidence of runtime readiness or an
example of admitting unimplemented components in a product system.

## Bindings

- **React** — contracts describe intended public usage, but this fixture ships
  no React implementation. Discovery reads contracts; runtime use remains unverified.

## Verification and public use

- Tests: none.
- Accessibility standard: WCAG 2.2 AA.
- Preview: none. Running application: none.

## Design rules and tokens

[Token definitions](design-system/tokens.md) describe consumer-controlled field-group
spacing and validation text. This fixture is documentation-only; these definitions
are named design decisions, not declarations of existing CSS variables or runtime APIs.

## Design reference

Requests describe intent in words and may supply a local Markdown design
reference. Read that file when supplied.

## Gaps

[Open gaps](design-system/gaps.md) and [archive](design-system/gaps-archive.md).
Move closed entries to the archive in full with their disposition, closure date and
basis. Resolution requires demonstrating the original expectation.

## Decisions and quality

Ask the person running the skill.

Independent quality mode is optional unless explicitly requested.
