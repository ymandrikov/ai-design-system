# Repair evidenced UI and business-logic defects while preserving correct behaviour

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
  behaviour/accessibility. Provide no existing exception mechanism.

**Request:**

> Automatically migrate the settings product area and its owned UI dependencies
> in mode 2. Other product areas are outside scope.
> Run the applicable verification checks.

**Expected:**

- Reuse the selected mode without a separate business-logic question or a batch
  size prompt. Save the complete scope and process independent work to exhaustion.
- Restore the field's accessible label and add the required domain validation:
  reject an empty name while preserving the successful save for a valid name.
  Verify both repairs using the focused checks. Mode 2 supplies the necessary
  business-logic authority; preserving correct behaviour does not preserve the defect.
- Inspect callers of the shared component and block the incompatible API change
  on scope expansion rather than breaking or migrating the outside caller.
- Use supported APIs for repairs and create only the bounded escape hatch needed
  for the authorised host deviation. Record its use, validate its reason and limits,
  and verify preserved geometry, behaviour and accessibility. Keep normative rules intact.
- Report ordinary admission and verification accurately, preserve unrelated code
  and return one consolidated list of blockers with partial completion.

**Independent variant:** Add "Do not change business logic" to the Request. Honour
that explicit narrower scope: repair the label and apply the authorised exception,
but leave domain validation blocked and saving behaviour unchanged. Report partial
completion without asking the removed startup question again.
