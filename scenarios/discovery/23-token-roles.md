# Select token roles without treating them as UI entities

**Skill:** ai-design
**Route:** discovery
**Design:** fixtures/tie-ds/DESIGN.md
**Request:**

> For a consumer-owned group of related form fields in the dark theme, choose
> the vertical spacing and validation-error text colour from the design system.
> No component owns these two properties. Return the token choices and values.

**Expected:**

- Select space.field-group (0.5rem) and color.text.error (alias to color.red,
  resolved to #ff9aa9 in dark theme). Do not substitute color.text.destructive.
- Read role/constraints rather than require UI contract sections or discoverable
  status. No invented CSS-variable API or contrast/browser pass.
- Leave files unchanged. No new catalogue, token definitions or gates.
