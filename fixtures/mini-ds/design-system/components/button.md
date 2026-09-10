---
id: button
status: discoverable
sources:
  - react/button.tsx
  - styles.css
tests:
  - react/button.test.tsx
examples:
  - demo/react-app.tsx
---

# Button

## Purpose

Button lets the user invoke one immediate action or go to one destination
with a native button or link.

The system owns Button so that every action and every button-styled link in
the product shares one activation model. Each instance is a native `button`
or `a[href]`, so the platform owns focus, activation, form submission and
navigation, and no consumer re-implements them.

## When to use

Use Button when all of these hold:

- Activating the control performs one action, submits or resets a form, or
  navigates to one destination.

## When not to use

- Do not use Button to put a known value on the clipboard; use [CopyButton](copy-button.md).
- Do not use Button as the trigger for a list of commands; use [DropdownMenu](dropdown-menu.md).
- Do not use Button as a form field, a toggle or a labelled input.

## Public API

### Semantic choices

A variant expresses the importance of the action, never a colour or a shape.

| Choice | Use when |
| --- | --- |
| `secondary` | The action has ordinary importance. This is the default. |
| `primary` | This is the single primary action in its group. |
| `danger` | The action commits difficult-to-reverse work. |

### Composition rules

- A `button` performs an action; an `a[href]` navigates. A link for an
  action or a button for navigation is unsupported.
- Children are a short text label. Layouts, images, counters and interactive
  descendants inside the control are unsupported.

### Web Components

Button is direct markup: a native element carrying `data-ds="button"`. No
custom element is registered and no JavaScript runs.

```html
<button type="button" data-ds="button" data-variant="primary">Save</button>
<a href="/builds" data-ds="button">View builds</a>
```

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| Native element | Required | `button` for an action, `a[href]` for navigation. |
| `data-ds` | Required | Must be `button`. |
| `data-variant` | `secondary` | `secondary`, `primary` or `danger`. Links exclude `danger`. |
| `type` | `button` | Buttons only. Native button types. |
| `disabled` | Absent | Buttons only. Native disabled behaviour. |
| Children | Short text | Other element children are unsupported. |

### React

```tsx
import { Button, LinkButton } from "./react/button";

<Button variant="primary" type="submit">Save</Button>
<LinkButton href="/builds">View builds</LinkButton>
```

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| `Button` | — | Renders a native `button`. Accepts native button attributes. |
| `LinkButton` | — | Renders a native `a`. Requires `href`. Excludes `danger`, `disabled` and `type`. |
| `variant` | `"secondary"` | `secondary`, `primary` or `danger`. |
| `type` | `"button"` | `Button` only. Native button types. |
| `children` | Short text | Other element children are unsupported. |

Button exposes no events or methods of its own.

The React binding owns `data-ds="button"`; forwarded attributes cannot replace
that identity. Load [shared styles](../../styles.css) once for both bindings.

## Behaviour and states

The native element owns focus, keyboard activation, clicks, form behaviour,
navigation and disabled behaviour. Button adds no JavaScript.

A button defaults to `type="button"`. Disabled links, loading states and
pressed states are unsupported.

## Accessibility

### Provided by the component

- The interactive element is a native `button` or `a[href]`. No role, tab
  index or key handling is added.
- Native and ARIA attributes remain on the native element.

### Required of consumers

- Use a button for an action and a link for navigation.
- Give every control a visible text label.
- Supply the ARIA state for a toggle (`aria-pressed`), a disclosure
  (`aria-expanded`) or the current destination (`aria-current`). Button
  supplies none.
- Explain a destructive consequence in the label or the surrounding text;
  the `danger` variant alone does not carry that meaning.
