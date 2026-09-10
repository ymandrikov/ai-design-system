---
id: select
status: discoverable
sources:
  - react/select.tsx
  - web-components/select.ts
  - styles.css
tests:
  - react/select.test.tsx
  - web-components/select.test.ts
examples:
  - demo/react-app.tsx
---

# Select

## Purpose

Select lets the user pick one option from a moderate list by typing to
filter and choosing a match.

The system owns Select so that every filtered single choice in the product
has the same combobox behaviour and semantics. The consumer supplies the
options and the label; the filtering, the highlighted option and the
listbox roles are the system's.

## When to use

Use Select when all of these hold:

- The user picks exactly one option.
- The list has more than twelve options and at most five hundred, all known
  when the view renders.
- The user finds the option by typing part of its label.

## When not to use

- Do not use it for twelve options or fewer; use [NativeSelect](native-select.md).
- Do not use it for choosing more than one option.
- Do not use it for a setting that switches between two states, such as on
  and off.
- Do not use it when options are fetched as the user types.
- Do not use it for commands or navigation; use [DropdownMenu](dropdown-menu.md).

## Public API

### Web Components

```html
<ds-select name="country" label="Country" placeholder="Choose a country">
  <option value="au">Australia</option>
  <option value="br">Brazil</option>
</ds-select>
```

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| `name` | Required | The form field name of the hidden input that carries the value. |
| `label` | Required | The visible label text. |
| `value` | Empty | The selected option's value. Reflected as a property. |
| `placeholder` | Empty | Text shown in the empty input. |
| `disabled`, `required` | Absent | Applied to the input. |
| `option` children | Required | Plain text labels. Read once at upgrade. |

| Event | When |
| --- | --- |
| `change` | Dispatched on the host after the value changes. Bubbles. `detail.value` is the new value. |

### React

```tsx
import { Select } from "./react/select";

<Select
  name="country"
  label="Country"
  placeholder="Choose a country"
  options={[
    { value: "au", label: "Australia" },
    { value: "br", label: "Brazil" },
  ]}
  onChange={(value) => setCountry(value)}
/>
```

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| `name` | Required | The form field name. |
| `label` | Required | The visible label text. |
| `options` | Required | `{ value, label }` entries. Labels are plain text. |
| `value` | Omitted | The selected value, controlled. |
| `onChange` | Omitted | Called with the new value after a selection. |
| `placeholder`, `disabled`, `required` | Omitted | As in Web Components. |

## Behaviour and states

Typing filters the options by case-insensitive substring of the label and
opens the list. Arrow Down and Arrow Up move the highlighted option, Enter
selects it, Escape closes the list and restores the input to the selected
option's label. Choosing an option sets the value, shows its label in the
input and closes the list. With no match the list shows one non-selectable
"No matches" row.

Select requires JavaScript. Before the Web Components element upgrades, the
authored options are not visible and nothing is interactive.

## Accessibility

### Provided by the component

- The text input has `role="combobox"` with `aria-expanded`,
  `aria-controls` and `aria-activedescendant` kept current.
- The list has `role="listbox"` and each option `role="option"` with
  `aria-selected`.
- The label is associated with the input.
- Keyboard behaviour as described under Behaviour and states.

### Required of consumers

- Give the label text that names the choice.
- Keep option labels unique so a typed filter can distinguish them.
