---
id: country-picker
status: discoverable
sources: []
---

# CountryPicker

## Purpose

CountryPicker lets the user pick one country by typing to filter a supplied
country list, with the list shown in a popup.

The system owns CountryPicker so country fields use a consistent single
selection model. The consumer supplies the country list and form field name.

## When to use

Use CountryPicker when all of these hold:

- The user picks exactly one country.
- The user finds the country by typing part of its name.

## When not to use

- Do not use it for choosing more than one country.
- Do not use it when options are fetched as the user types.
- Do not use it for choices other than countries; use Autocomplete.

## Public API

### React

| Input | Default | Meaning and constraints |
| --- | --- | --- |
| `name` | Required | Form field name. |
| `label` | Required | Visible label. |
| `options` | Required | `{ value, label }` entries for countries; plain text labels. |
| `value` | Omitted | Controlled selected country value. |
| `onChange` | Omitted | Called with the country value after selection. |

## Behaviour and states

Typing filters the supplied list by case-insensitive substring and shows
matches in a popup. Arrow keys move the highlighted option; Enter selects;
Escape closes the popup. Selection sets the form value and input label.

## Accessibility

### Provided by the component

- A labelled combobox controls a listbox with selectable options.
- Keyboard operation follows Behaviour and states.

### Required of consumers

- Supply a visible label and unique country labels.
