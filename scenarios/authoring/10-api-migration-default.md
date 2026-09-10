# Agree migration and defaults before extending a component API

**Skill:** ai-design
**Route:** craft
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> Add an optional fullWidth boolean prop to React Button: true fills the available
> inline space, false keeps the current content-sized width. Use it for actions
> that should occupy their container's width. Update its implementation and contract.

**Expected:**

- Inspect Button's implementation, contract, styles and existing React consumers
  before presenting the concrete proposal and consumer impact.
- Ask in one batch whether and which existing Button uses to migrate, and what
  omitted fullWidth means, even though this is an optional, compatible extension.
- Recommend preserving current content-sized behaviour when omitted and explain
  how that leaves existing calls unchanged; do not silently adopt that default.
- Limit the migration decision to existing uses of the changed component; do not
  propose spreading fullWidth to LinkButton, CopyButton or other components.
- Await the missing answers before implementing dependent API, contract or consumer
  changes. The general request to extend Button does not settle these choices.
