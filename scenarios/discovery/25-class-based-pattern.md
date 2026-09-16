# Adapt a pattern expressed through permitted classes

**Skill:** design-system
**Route:** discovery
**Design:** fixtures/tie-ds/DESIGN.md

**Preparation (controller only):**

- Add synthetic discoverable Panel and Button component contracts and index entries
  following tie-ds's existing documentation-only convention (`sources: []`). Panel
  supplies a surface/inset and accepts `className` for ordinary composition. Button
  supports native `type="submit"`. Both retain consumer-owned content and semantics.
- Add a discoverable notification-preferences pattern with `sources: []` to PATTERNS.md.
  It serves editing one subject's notification preferences with one explicit save.
  Its recipe is a native form containing Panel with `className="settings-flow"`,
  named fieldsets for groups, then a submit Button and feedback. Consumers own
  labels, validation, submission and feedback; field groups may be added or removed.
- Link rules from DESIGN.md and the contracts: `settings-flow` is a permitted public
  class that arranges Panel's children with the system's group spacing and stacks
  at narrow widths. It is normal usage, with no exception approval or reason needed.
  Panel retains surface/inset ownership. Keep the layout index empty.

**Request:**

> Recommend how to compose notification preferences for one account with email
> and push field groups and one Save button. Adapt the existing recipe to these
> groups and explain responsibility for spacing and narrow-screen arrangement.

**Expected:**

- Select notification-preferences and validate its Panel/Button dependencies.
  Describe the form, named field groups, save action and feedback in recipe order.
- Use Panel with the permitted settings-flow class as the pattern's composition;
  explain its arrangement versus Panel's surface/inset and consumer behaviour.
- Identify group content as adaptable while preserving one save boundary and
  accessibility obligations. Do not invent a Stack/layout requirement, an exception
  approval or a new component merely because the recipe uses classes.
- Respect synthetic runtime limits; no implementation/browser pass claim or writes.
