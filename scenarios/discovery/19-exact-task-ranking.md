# Exact task outranks a viable broader category

**Skill:** ai-design
**Route:** discovery
**Design:** fixtures/tie-ds/DESIGN.md
**Request:**

> Use `ranking-inventory.md` as the component index for this request.

> In the billing form (React), let the user choose one country from a fixed
> list of 40 countries by typing part of its name. Submit the selected
> country value with the form. CountryPicker and the generic typed pickers
> are available; choose by their contracts.

**Expected:**

- Select CountryPicker under the exact-task ranking rule. Autocomplete and Select remain viable broader choices; omitting them from the report is fine, falsely declaring them incompatible is not.

- Discovery leaves project files unchanged.
