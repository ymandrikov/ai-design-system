---
id: stack
status: discoverable
sources:
  - react/stack.tsx
  - styles.css
tests:
  - react/stack.test.tsx
examples:
  - demo/react-app.tsx
---

# Stack

## Purpose

Stack arranges its children in one vertical flow with one consistent space
between adjacent children.

The system owns Stack so that every vertical group in the product has one
rhythm and no child carries outer margins of its own. Stack paints nothing: a surface, a border or an inset around the group is its
host's job.

## When to use

Use Stack when all of these hold:

- The children belong in one vertical sequence.
- The same space is right between every pair of adjacent children.

## When not to use

- Do not use Stack for a sequence that needs list semantics.
- Do not use Stack when children flow horizontally or wrap across rows.
- Do not use Stack to paint a surface, a border or an inset around its
  children.

## Public API

### Composition rules

- Children are any elements or components, shown in source order. Stack
  owns spacing and removes direct children’s outer block margins.
- Nest a Stack inside a Stack when two sequences need different spaces.
- A host that paints a surface wraps the Stack; a Stack never wraps a
  surface on the group's behalf.

### Web Components

Stack is direct markup: an element carrying `data-ds="stack"`. No custom
element is registered and no JavaScript runs.

```html
<div data-ds="stack" data-space="lg">
  <p>First</p>
  <p>Second</p>
</div>
```

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| `data-ds` | Required | Must be `stack`. |
| `data-space` | `md` | `sm`, `md` or `lg`: the one space between adjacent children. |
| Children | Required | The elements of the sequence, in source order. |

### React

```tsx
import { Stack } from "./react/stack";

<Stack space="lg">
  <p>First</p>
  <p>Second</p>
</Stack>
```

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| `space` | `"md"` | `sm`, `md` or `lg`. |
| `children` | Required | The elements of the sequence, in source order. |

Stack renders a `div` and accepts native `div` attributes. It exposes no
events or methods of its own.

## Composition

### Required

Stack owns the vertical space between adjacent direct children, including
resetting their outer block margins. It does not paint a surface or supply list
semantics. Consumers provide child content and its semantic relationships.
Nested groups may use another Stack with a different space. The host owns width
and surface; Stack fills that available width and keeps one column at narrow sizes.
Load [the shared stylesheet](../../styles.css) once in the application entry point.
That stylesheet defines the space values; `sm`, `md` and `lg` mean small, medium
and large spacing. Static markup and React share the same layout.

### Recommendations

Use the default space for ordinary peer blocks. Use separate groups when different
relationships require different spaces.

### Exceptions

None. Stack owns no custom JavaScript behaviour or state transitions.

## Accessibility

### Provided by the component

- Nothing. Stack renders a plain `div` with no role and adds no semantics
  to its children.

### Required of consumers

- Keep the sequence's own semantics in the children: a list stays a native
  `ul` or `ol`, a group of form fields stays inside its `form` or
  `fieldset`.
