---
sourcesHash: 8f273cabb7fd100863d2fffe3c8395b5ef4999705a6b69a645225ac6042de378
id: copy-button
status: discoverable
sources:
  - react/copy-button.tsx
  - web-components/copy-button.ts
  - styles.css
tests:
  - react/copy-button.test.tsx
  - web-components/copy-button.test.ts
examples:
  - demo/react-app.tsx
---

# CopyButton

## Purpose

CopyButton lets the user copy one known string to the clipboard with one
activation, confirmed in place.

The system owns CopyButton so that every copy control in the product writes
the clipboard and confirms success the same way. The consumer supplies the
value and the label; the clipboard call, the confirmation and its
announcement are the system's.

## When to use

Use CopyButton when all of these hold:

- The value to copy is known when the view renders, such as an id, a URL or
  a token.
- The user copies one string.

## When not to use

- Do not use CopyButton when activation does anything besides copying; use
  Button.
- Do not use it when the user chooses between values. Offer the choice first,
  then copy the chosen value.
- Do not use it for text the user edits before copying.
- Do not use it where clipboard access is not guaranteed, such as inside a
  cross-origin frame. CopyButton has no failure state.

## Public API

### Web Components

```html
<ds-copy-button value="bkua_1234">
  <button type="button">Copy token</button>
</ds-copy-button>
```

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| `value` | Required | The string written to the clipboard. |
| `confirmation` | `Copied` | The label shown in the button after a successful write. |
| Child `button` | Required | One native button the consumer authors. Its text is the label. |

| Event | When |
| --- | --- |
| `ds-copy` | Dispatched on the host after a successful write. Bubbles. `detail.value` is the copied string. |

### React

```tsx
import { CopyButton } from "./react/copy-button";

<CopyButton value="bkua_1234">Copy token</CopyButton>
```

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| `value` | Required | The string written to the clipboard. |
| `confirmation` | `"Copied"` | The label shown after a successful write. |
| `onCopy` | Omitted | Called with the copied string after a successful write. |
| `children` | Short text | The label. |

## Behaviour and states

Activation writes `value` with the platform clipboard API. On success the
label changes to the confirmation text for two seconds and then reverts; the
control stays enabled and focusable throughout. On failure the label does not
change and no event fires.

Before the Web Components element upgrades, the authored native button is
present and inert.

## Accessibility

### Provided by the component

- The control is a native `button`.
- The confirmation is announced through a polite live region.

### Required of consumers

- Name what is copied in the label ("Copy token"), not "Copy" alone, when a
  view has more than one copy control.
- Show the value or its name near the control so the user knows what they
  received.
