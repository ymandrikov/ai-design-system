# Ask before implementing a conditional choice

**Skill:** design-system
**Route:** use
**Design:** fixtures/tie-ds/DESIGN.md
**Request:**

> In the billing address form (React), add a country picker for 40 countries,
> all available at render time. Users type to find them. Product has not
> decided whether users may select one country or several. Either an inline
> list or a popup is acceptable. Resolve the required selection decision
> before implementing this field; there is no independent UI work to do.

**Expected:**

- Ask whether the field permits one or multiple selections before implementation; this fact determines contract validity. Do not block on the explicitly permitted inline/popup preference. Leave product files unchanged; unavailable verification while awaiting the answer is correct.
