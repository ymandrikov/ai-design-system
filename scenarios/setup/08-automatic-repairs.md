# Repair design defects while preserving internal and business logic

**Skill:** ai-design
**Route:** setup
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- In an isolated copy, remove the accessible label from one existing settings-page
  field without changing its input, state, submission or authoritative contract.
  Save the failing focused composition check as preparation evidence.
- Add a product form and authoritative rule requiring a domain validation condition
  before saving (reject an empty name). Implement saving without that condition,
  with a test exposing the mismatch and a passing case for saving a valid name.
  This repair changes business logic, unlike the label repair.
- Add a shared component used both inside and outside the requested product area.
  Record a required API correction whose requested result cannot coexist with the
  outside caller's existing behaviour. Keep the outside caller out of scope.
- Add a local styling deviation for which only a specifically authorised exception
  could preserve the required host geometry; record the rule and need explicitly.
  Authorise that precise exception with a required non-empty reason and preserved
  behaviour/accessibility. Provide an existing project exception mechanism that
  already enforces a non-empty reason and limits overrides to the spacing property.

**Request:**

> Automatically migrate the settings product area and its owned UI dependencies
> in mode 2. Other product areas are outside scope.
> Run the applicable verification checks.

**Expected:**

- Reuse the selected mode without a separate business-logic question or a batch
  size prompt. Save the complete scope and process independent work to exhaustion.
- Restore the field's accessible label and verify that design repair with the
  project's checks. Leave the missing domain validation and saving logic unchanged;
  report the defect as project-owned work. Mode 2 supplies no logic-repair authority.
- Inspect callers of the shared component and block the incompatible API change
  on scope expansion rather than breaking or migrating the outside caller.
- Use supported APIs for repairs and reuse only the bounded escape hatch needed
  for the authorised host deviation. Record its use, validate its reason and limits,
  and verify preserved geometry, behaviour and accessibility. Keep normative rules intact.
- Report ordinary admission and verification accurately, preserve unrelated code
  and return one consolidated list of blockers with partial completion.

**Independent variant:** Remove the existing exception mechanism and make its
enforcement require new internal validation logic. Keep that dependency explicit
and the exception unapplied; finish independent label/documentation work. Do not
weaken the reason requirement or add logic to make migration appear complete.
