# Browser verification procedure

## Render the actual composition

Use the DESIGN.md's application for a screen and previews for component-level work.
Use the relevant data, supported themes and narrow/wide containers. Inspect the real
loaded styles and wiring, not a reconstruction that omits the project's environment.
When the environment is unavailable, record the missing check and continue static
verification. No markup-derived claim becomes a browser result.

## Measure and exercise

Measure layout, spacing, size and typography with computed styles and bounding boxes
in the browser. Compare with the linked visual specification, tokens or implementation
identified by the contract or DESIGN.md. A screenshot supports measurement, not substitutes
for it. If the source defines a tolerance, use it; otherwise record any difference.

Exercise affected states and relationships: required regions/order, labels and errors,
form submission/validation, keyboard/focus, disabled/empty states, responsive adaptation
and themes. A JS test environment's DOM assertions do not establish rendered geometry.
Check native behaviour even for components without a JS implementation file.

## Reconcile

For each affected reference element or contracted region, check presence, selected
entity, required composition, measured values and states. Report a match count when
there is a reference and one row per deviation:

| Element | Expected | Actual | Cause | Evidence / gap |
| --- | --- | --- | --- | --- |

Causes distinguish product defects/decisions, selection assumptions, contract drift,
system limitations and unavailable tooling. Missing evidence is unverified; it is not
a matching element. With no reference, name the documented promises checked and leave
undefined visual comparisons unverified. Do not fabricate a reference match count.

Report static, behavioural and visual outcomes independently. Fully verified UI has
no failed applicable checks or unverified affected runtime properties. A documentation
change can have behavioural/visual checks not applicable, with that reason recorded.
