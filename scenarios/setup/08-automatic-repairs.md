# Repair UI while preserving business logic and external consumers

**Skill:** ai-design
**Route:** setup
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- In an isolated copy, remove the accessible label from one existing settings-page
  field without changing its input, state, submission or authoritative contract.
  Save the failing focused composition check as preparation evidence.
- Add a product form and authoritative rule requiring a domain validation condition
  before saving. Implement saving without that condition, with a test exposing the
  mismatch. This repair changes business logic, unlike the label repair.
- Add a shared component used both inside and outside the requested product area.
  Record a required API correction whose requested result cannot coexist with the
  outside caller's existing behaviour. Keep the outside caller out of scope.
- Add a local styling deviation for which only a specifically authorised exception
  could preserve the required host geometry; record the rule and need explicitly.

**Request:**

> Automatically migrate the settings product area and its owned UI dependencies
> in mode 2. Do not change business logic. Other product areas are outside scope.
> Run the applicable verification checks.

**Expected:**

- Reuse the selected mode and business-logic boundary without questions or a batch
  size prompt. Save the complete scope and process independent work to exhaustion.
- Restore the field's accessible label and verify its composition/behaviour using
  the existing focused check; retain the domain validation and saving behaviour.
- Record the validation repair as blocked on business-logic authority, not repaired
  or waived by the automation request. Continue other items.
- Inspect callers of the shared component and block the incompatible API change
  on scope expansion rather than breaking or migrating the outside caller.
- Use supported APIs for repairs; do not introduce an escape hatch, apply a new
  exception or change a normative rule to make the host deviation pass in mode 2.
- Report ordinary admission and verification accurately, preserve unrelated code
  and return one consolidated list of blockers with partial completion.
