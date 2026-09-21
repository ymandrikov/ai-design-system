# Adopt an undocumented component

**Skill:** design-system
**Route:** craft
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> The Toggle switch exists in both bindings (`web-components/toggle.ts`,
> `react/toggle.tsx`) but has no contract. Adopt it into mini-ds, with its
> shared contract under `design-system/components/`. Assess the open gap
> "No component for a setting the user switches on or off" against its
> original Expected result. Admission is not part of this task.

**Expected:**

- Adopt evidenced Toggle behaviour into a shared contract under `design-system/components/` with hidden status in frontmatter; regenerate indexes, keeping Toggle out until admission. Keep bindings, previews and unrelated contracts unchanged. Do not silently introduce new normative restrictions (for example, a blanket prohibition of a separate Save step) without source evidence or a decision.

- Inspect structural-check output, focused public-use tests and suitable/unsuitable/edge-case reasoning. Do not run independent discovery without an explicit request or project requirement. Hidden status does not close the original discoverability gap.
- Leave the original discoverability gap open and the gap journal unchanged: a matching description plus hidden status does not satisfy its Expected result. Recognise adoption as nonbreaking without requiring literal Mode/Breaking labels.
