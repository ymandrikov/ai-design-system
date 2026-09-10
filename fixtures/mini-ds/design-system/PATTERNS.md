# mini-ds patterns

- [Settings page](#settings-page)

<a id="settings-page"></a>
## Settings page

ID: settings-page
Status: discoverable

### Purpose

Settings page groups related editable preferences with one save action and separates destructive actions from routine changes.

The product owns this pattern so agents preserve field relationships, submission boundaries and action placement while composing different settings pages.

### When to use

Use Settings page when all of these hold:

- The user edits related persistent preferences for one subject.
- Routine changes share one explicit save action.
- Fields can be grouped by meaning rather than by arbitrary visual columns.

### When not to use

- Do not use for a step-by-step onboarding flow.
- Do not use for an immediate action menu or an autosaving control panel.
- Do not group independent subjects under one save action without a product decision.

### Structure

#### Required

- A page heading and introduction precede the settings form.
- The form contains named field groups, then its save actions and submission feedback.
- Each group uses a native `fieldset` with a visible `legend`.
- Destructive actions, when present, occupy a separate final section outside the settings form.
- The consumer owns grouping, field and message IDs, validation, submission and feedback. The layout owns space between adjacent groups. Visual values and responsive sizing are defined in [the demo stylesheet](../demo/demo.css) and [shared Stack styles](../styles.css).

#### Recommendations

- Use one vertical sequence so fields remain readable on narrow screens.
- Put frequently edited groups before occasional preferences.

#### Exceptions

- Omit the destructive section when the subject has no destructive action. The save group remains last in the form.

### Composition

#### Required

- The supported binding for this executable pattern is React.
- Use [Stack](layouts/stack.md) to arrange the field groups and final save group. Nested Stack instances can arrange fields inside a fieldset.
- Use [Button](components/button.md) with `type="submit"` for the routine save action. Destructive buttons have `type="button"` and danger styling; they never submit the settings form.
- Use [NativeSelect](components/native-select.md) for one option from a small list; native inputs cover text, email and checkbox fields in this slice. These platform elements have no managed component contract here: use their native HTML API directly, preserving the instance-specific type, label, name and validation constraints required by the product.
- Every control has a unique ID, a visible explicit label and a `name` when its value is submitted. Help and inline errors reference that control through `aria-describedby`; invalid controls also expose `aria-invalid="true"`.
- Keep save controls outside fieldsets and after all field groups. Submit using native form semantics and display feedback beside the save action.
- Mark the outer article with `data-settings-page`, its form with `data-settings-form`, and the final save group with `data-settings-actions`. Mark the optional destructive section with `data-settings-danger` and any inline error with `data-field-error`. These hooks identify regions required by this product's checker; they add no runtime behaviour.

Minimal React composition (imports resolve from this contract's directory; load the shared stylesheet once at the application entry):

```tsx
import { Stack } from "../react/stack";
import { Button } from "../react/button";

<article data-settings-page="account">
  <header><h1>Account settings</h1><p>Edit your public name.</p></header>
  <form data-settings-form onSubmit={saveAccount}>
    <Stack space="lg">
      <fieldset>
        <legend>Public profile</legend>
        <label htmlFor="account-name">Display name</label>
        <input id="account-name" name="displayName" required />
      </fieldset>
      <div data-settings-actions>
        <Button type="submit" variant="primary">Save account</Button>
        <output aria-live="polite">{saveResult}</output>
      </div>
    </Stack>
  </form>
</article>
```

The consumer supplies `saveAccount` and `saveResult`; each additional page instance uses distinct control and message IDs. The [two executable examples](../product/settings-pages.tsx) demonstrate local submissions and associated validation errors.

#### Recommendations

- Preserve native constraint validation before applying any product-specific validation.

#### Exceptions

None.

### Verification

- Run [the product composition checker](../product/check-composition.ts) over the composed page. [Its tests](../product/check-composition.test.tsx) cover two valid pages and mutations with broken labels, descriptions, error associations, group labels and action order.
- In a browser, verify keyboard traversal, native invalid-submit blocking, visible associated errors, submit feedback, responsive grouping and spacing. The tests alone do not establish visual correctness.
- The [local demo](../demo/settings.html) serializes native form values into visible feedback without sending or persisting them. Preview-only destructive actions report their request without deleting anything; a consuming application supplies its own persistence and destructive-action handling.
