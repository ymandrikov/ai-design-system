# Analyse escape hatches independently of contract migration

**Skill:** design-system
**Route:** craft
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- In the isolated copy, add a product usage file with three Stack consumers:
  two unrelated dense lists using `style={{ gap: "0.25rem" }}`, and one embedded
  inspector using `style={{ gap: "0.375rem" }}` to align with its host rows.
  Record these actual needs in source comments. Keep existing spacing rules intact.
- Seed and link `design-system/adoption.md` with migration pending for unmanaged
  Toggle and API analysis pending for Stack. Preserve existing fixture contracts.

**Request:**

> Analyse our components and layouts for escape-hatch recommendations, starting
> with Stack. Use a batch of two. Save findings; we'll implement changes later.

**Expected:**

- Reconcile the full owned work list and inspect Stack's API, contract, styles and
  real consumers. Analyse at most two entities and preserve migration progress.
- Distinguish the recurring dense-list need from the local host-alignment need.
  Consider a supported spacing option for the former and a bounded exception for
  the latter, grounded in applicable rules rather than treating all style props
  as inherently invalid or existing overrides as already authorised.
- Proposals include actual call sites, reasons, permitted deviations, approval
  conditions and compatibility impact. Apply craft's behaviour/accessibility
  constraints and reuse an existing exception mechanism if one is found.
- Save recommendations and evidence in the work list and link systemic findings
  to the gap journal. Record missing evidence explicitly; an evidenced finding
  that no change is needed can complete an analysis item.
- Leave implementation, consumer calls, contract promises and eligibility unchanged.
  Analysis neither requires completed migration nor starts it.
