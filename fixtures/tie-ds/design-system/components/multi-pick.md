---
id: multi-pick
description: |-
  MultiPick lets the user pick one or more options from a list of any
  length by typing to filter it.

  The system owns MultiPick so that every typed single choice in the product has
  the same filtering, highlighting and listbox semantics. The consumer supplies
  the options and the label; the filtering and the roles are the system's.
status: hidden
sources: []
---

# MultiPick

## When to use

Use MultiPick when all of these hold:

- The user picks one option or several.
- The user finds the option by typing part of its label.

## When not to use

- Do not use it when exactly one option must be chosen; use Combobox.
- Do not use it when options are fetched as the user types.

## Public API

### React

```tsx
import { MultiPick } from "./react/multi-pick";

<MultiPick
  name="country"
  label="Country"
  options={[
    { value: "au", label: "Australia" },
    { value: "br", label: "Brazil" },
  ]}
/>
```

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| `name` | Required | The form field name. |
| `label` | Required | The visible label text. |
| `options` | Required | `{ value, label }` entries. Labels are plain text. |
| `value` | Omitted | The selected values, controlled. |
| `onChange` | Omitted | Called with the new values after a selection. |

## Behaviour and states

Typing filters the options by case-insensitive substring of the label and
shows the list inline below the input, pushing the content after it down. Arrow Down and Arrow Up move the highlighted option,
Enter selects it, Escape closes the list. Choosing an option adds its value
and shows its label as a chip before the input.

## Accessibility

### Provided by the component

- The text input has `role="combobox"` with `aria-expanded`,
  `aria-controls` and `aria-activedescendant` kept current.
- The list has `role="listbox"` and each option `role="option"`.
- The label is associated with the input.

### Required of consumers

- Give the label text that names the choice.
- Keep option labels unique so a typed filter can distinguish them.
