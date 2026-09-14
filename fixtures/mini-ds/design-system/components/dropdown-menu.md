---
sourcesHash: efbf1448702efb6aab5346eb1742a58540a80e47dfc73e1acdd57e377fd0aff6
id: dropdown-menu
status: discoverable
sources:
  - react/dropdown-menu.tsx
  - web-components/dropdown-menu.ts
  - styles.css
tests:
  - react/dropdown-menu.test.tsx
  - web-components/dropdown-menu.test.ts
examples:
  - demo/react-app.tsx
---

# DropdownMenu

## Purpose

DropdownMenu lets the user open a short list of commands or destinations
from one trigger.

The system owns DropdownMenu so that every command menu in the product has
the same menu semantics, focus movement and keyboard behaviour. The consumer
supplies the trigger and the items; a menu never carries a form value, so a
value chosen through one is not something the system supports.

## When to use

Use DropdownMenu when all of these hold:

- The items are commands or destinations.
- The list has two to eight items.

## When not to use

- Do not use it to choose a value that is saved or submitted; use
  NativeSelect or Select.
- Do not use it for a single action; use [Button](button.md).
- Do not use it as the view's primary navigation.

## Public API

### Composition rules

- Items are commands or links. Content, form fields and multi-step flows
  inside the menu are unsupported.

### Web Components

```html
<ds-dropdown-menu>
  <button type="button" data-slot="trigger">Actions</button>
  <div role="menu" hidden>
    <button type="button" role="menuitem">Rename</button>
    <a role="menuitem" href="/builds/1">Open</a>
  </div>
</ds-dropdown-menu>
```

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| Trigger | Required | One native `button` with `data-slot="trigger"`. Its text is the menu's name. |
| Menu | Required | One element with `role="menu"`, initially `hidden`. |
| Items | Required | Native `button` or `a[href]` children of the menu with `role="menuitem"`. An item with `aria-disabled="true"` is skipped. |

Consumers attach their own handlers to the items. DropdownMenu exposes no
events or methods of its own.

### React

```tsx
import { DropdownMenu, MenuItem, MenuLink } from "./react/dropdown-menu";

<DropdownMenu label="Actions">
  <MenuItem onSelect={rename}>Rename</MenuItem>
  <MenuLink href="/builds/1">Open</MenuLink>
</DropdownMenu>
```

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| `label` | Required | The trigger text. |
| `children` | Required | `MenuItem` and `MenuLink` elements only. |
| `MenuItem.onSelect` | Omitted | Called when the item is activated. |
| `MenuItem.disabled` | `false` | The item is shown and skipped. |
| `MenuLink.href` | Required | The destination. |

## Behaviour and states

Activating the trigger opens the menu and moves focus to the first enabled
item. Arrow Down and Arrow Up move focus between enabled items and wrap.
Escape closes the menu and returns focus to the trigger. Activating an item
closes the menu. A pointer press outside the menu closes it.

The menu is closed by default and has no other states.

Before the Web Components element upgrades, the trigger is present and inert
and the menu stays hidden.

## Accessibility

### Provided by the component

- The trigger carries `aria-haspopup="menu"` and `aria-expanded`.
- Focus moves into the menu on open and back to the trigger on close.
- Keyboard behaviour as described under Behaviour and states.

### Required of consumers

- Give the trigger a text label that names the group of commands.
- Give each item text that names its command or destination.
- Explain a destructive item in its text; position or colour does not carry
  that meaning.
