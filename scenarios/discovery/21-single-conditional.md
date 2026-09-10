# A single conditional candidate still needs a decision

**Skill:** ai-design
**Route:** discovery
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> In a React form, choose a country picker for 40 plain-text countries, all
> known when the view renders. Users must type to find countries. Product
> has not decided whether to allow exactly one selection or several.

**Expected:**

- Select is valid only for exactly one selection. Make that condition clear and ask whether one or several selections are required before implementation. No other candidate is needed. Accept omitted Alternative, “none”, prose, or a qualification beside the component name when the decision is unambiguous.

- Discovery leaves project files unchanged.
