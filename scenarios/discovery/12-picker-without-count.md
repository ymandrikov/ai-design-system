# A picker whose list size the request omits

**Skill:** ai-design
**Route:** discovery
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> In the deploy form (React), add a field where the user picks the region.
> The chosen value is submitted with the form.

**Expected:**

- Treat unknown list size and search needs as unresolved facts, not disqualifiers. NativeSelect or Select may be provisional when qualified by their actual constraints. Ask about list size and typed search before implementation. An unqualified final choice is incorrect.

- Discovery leaves project files unchanged.
