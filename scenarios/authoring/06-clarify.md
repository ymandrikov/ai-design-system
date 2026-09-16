# Clarify wording without changing valid calls

**Skill:** design-system
**Route:** craft
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> In `design-system/layouts/stack.md`, clarify the second paragraph of description:
> state explicitly that Stack draws no surface, border or inset of its own.
> Do not change which calls or compositions are valid.

**Expected:**

- Clarify Stack’s second description paragraph: it draws no surface, border or inset. Preserve valid calls, composition and implementation; recognise the change as nonbreaking.

- Inspect layout structural validation and affected public-use/composition evidence, with no mandatory fresh-agent gate. Discovery need not rerun if selection and composition eligibility are unchanged. Shared changes stay within this contract and its regenerated index description.
