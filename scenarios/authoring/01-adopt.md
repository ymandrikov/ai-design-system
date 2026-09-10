# Adopt an undocumented component

**Skill:** ai-design
**Route:** craft
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> The Toggle switch exists in both bindings (`web-components/toggle.ts`,
> `react/toggle.tsx`) but has no contract. Adopt it into mini-ds, with its
> shared contract under `design-system/components/`. Assess the open gap
> "No component for a setting the user switches on or off" against its
> original Expected result. Admission is not part of this task.

**Expected:**

- Adopt evidenced Toggle behaviour into a shared contract under `design-system/components/` and add an index entry with hidden status in contract frontmatter. Keep bindings, previews and unrelated contracts unchanged. Do not silently introduce new normative restrictions (for example, a blanket prohibition of a separate Save step) without source evidence or an owner decision.

- Inspect structural-check output, focused public-use tests and suitable/unsuitable/edge-case reasoning. Independent agents are not required in ordinary mode. Admission discovery need not run while Toggle remains hidden; do not confuse it with assessment of the original gap request.
- Leave the original discoverability gap open and the gap journal unchanged: a matching Purpose plus hidden status does not satisfy its Expected result. Recognise adoption as nonbreaking without requiring literal Mode/Breaking labels.
