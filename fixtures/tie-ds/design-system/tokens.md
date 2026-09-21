# Consumer token definitions

These named, typed decisions are authoritative for this documentation-only fixture.
Values are not CSS variable declarations. Consumers use them only for properties they
control; a UI contract's owned property must use its supported public setting instead.

| Token | Type | Light value | Dark value | Role and constraints |
| --- | --- | --- | --- | --- |
| space.field-group | dimension | 0.5rem | 0.5rem | Vertical gap between related fields in a consumer-owned group. |
| space.section | dimension | 1.5rem | 1.5rem | Gap between independent sections, not fields in one group. |
| color.red | color | #9c1526 | #ff9aa9 | Base palette value; use a defined semantic role for UI text. |
| color.text.error | color | alias: color.red | alias: color.red | Validation error text on the theme's form background. |
| color.text.destructive | color | alias: color.red | alias: color.red | Destructive-action labels, not validation messages. |

The error and destructive roles remain distinct despite equal values. Resolve aliases
in the selected theme. Theme background definitions and rendered contrast evidence are
absent in this fixture; token selection alone establishes no contrast or visual pass.
