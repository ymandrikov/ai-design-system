# Archive a gap after proving token discoverability

**Skill:** design-system
**Route:** craft
**Design:** fixtures/tie-ds/DESIGN.md
**Preparation:** In the isolated copy's design-system/gaps.md, add "Field-group spacing
token not found": Need is a dimension token for related consumer-owned fields in dark
theme; Actual result is no choice; Expected result is discovery returning the token
and dark-theme value, with rendered layout outside scope. Add an unrelated open gap
"Missing focus ring token" whose Expected result is a defined focus ring token.
**Request:**

> Resolve only "Field-group spacing token not found" against its original expectation.
> Do not change definitions or availability. Use ordinary quality mode.

**Expected:**

- Rerun discovery and find space.field-group with dimension type and dark value 0.5rem.
- Move only the resolved entry in full to the archive linked in DESIGN.md, with
  Status: Resolved, Closed date, Resolution and Verified by evidence identifying
  the selected token, type and dark-theme value. Preserve the original expectation.
- Remove it from the open journal after archiving; preserve the unrelated focus-ring
  gap and existing archive entries exactly.
- Report evidence without claiming runtime/visual verification.
