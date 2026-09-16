---
sourcesHash: 9d9ac175737d49cb21f0350bffdde3bde7328d0ee43605385b86787b6e79e0d6
id: native-select
description: |-
  NativeSelect lets the user pick one option from a short, fixed list with the
  platform's own select control.

  The system owns NativeSelect so that a short single choice in a form is
  always the platform's control. The popup, the keyboard behaviour and the
  mobile picker come from the platform, and no consumer builds a custom picker
  for a list the platform already handles.
status: discoverable
sources:
  - react/native-select.tsx
  - styles.css
tests:
  - react/native-select.test.tsx
examples:
  - demo/react-app.tsx
---

# NativeSelect

## When to use

Use NativeSelect when all of these hold:

- The user picks exactly one option.
- The list has twelve options or fewer, all known when the view renders.
- The choice is a form value that the surrounding form submits or saves.

## When not to use

- Do not use it for more than twelve options, or when the user searches the
  list by typing; use [Select](select.md).
- Do not use it for commands or navigation; use [DropdownMenu](dropdown-menu.md).
- Do not use it for choosing more than one option.
- Do not use it for a setting that switches between two states, such as on
  and off.
- Do not use it when an option needs more than plain text.

## Public API

### Web Components

NativeSelect is direct markup: a native `select` carrying
`data-ds="native-select"`. No custom element is registered and no JavaScript
runs.

```html
<label for="environment">Environment</label>
<select id="environment" name="environment" data-ds="native-select">
  <option value="production">Production</option>
  <option value="staging">Staging</option>
</select>
```

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| Native `select` | Required | Single selection only. `multiple` is unsupported. |
| `data-ds` | Required | Must be `native-select`. |
| `option` children | Required | Plain text labels. |
| `name`, `required`, `disabled` | Native defaults | Native behaviour. |

### React

```tsx
import { NativeSelect } from "./react/native-select";

<NativeSelect
  name="environment"
  label="Environment"
  options={[
    { value: "production", label: "Production" },
    { value: "staging", label: "Staging" },
  ]}
/>
```

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| `name` | Required | The form field name. |
| `label` | Required | The visible label text. |
| `options` | Required | `{ value, label }` entries. Labels are plain text. |
| `value`, `defaultValue`, `onChange` | Omitted | Native controlled or uncontrolled behaviour. |
| `required`, `disabled` | Omitted | Native behaviour. |

The React binding owns `data-ds="native-select"`; forwarded attributes cannot replace
that identity. Load [shared styles](../../styles.css) once for both bindings.

## Behaviour and states

The platform owns opening, keyboard navigation, selection and form
participation. NativeSelect adds no JavaScript. The value is the selected
option's `value`.

## Accessibility

### Provided by the component

- The control is a native `select` with native semantics.
- The React binding associates the label with the control.

### Required of consumers

- In direct markup, associate a visible `label` with the control.
- When a choice is required, make the first option a disabled placeholder
  such as "Choose an environment" rather than preselecting a real value.
