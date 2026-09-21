# A menu owns its trigger and items

**Skill:** design-system
**Route:** discovery
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> On the build page (React), add an Actions menu with a text trigger and
> two text commands: Rename and Delete. Each command invokes one handler.
> Use the menu's public composition API for its trigger and items.

**Expected:**

- Choose DropdownMenu and use its owned trigger/item API. Do not replace those fixed parts with separately chosen Buttons. Explaining the parts separately is fine; the actual composition decision matters.

- Discovery returns the composition decision without implementing it or writing any files, including tests, temporary files and reports outside the project. Check the worker's tool trace as well as the project diff; controller-saved results are not worker writes.
