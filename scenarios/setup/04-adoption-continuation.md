# Resume saved migration and honour explicit completion of every batch

**Skill:** ai-design
**Route:** craft
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- Use the same source preparation as [the batch scenario](03-adoption-batch.md),
  independently of any earlier run. Create and link `design-system/adoption.md`
  with all prepared wrappers pending migration and Button's existing contract linked.
- Mark one wrapper's API analysis complete with a concrete source-based finding;
  leave its migration pending. Record a separate wrapper's migration as blocked
  on missing browser evidence. Do not supply invented verification results.

**Request:**

> Resume contract migration from the saved list. Use batches of two and finish
> every batch without waiting for me between batches. Leave API analysis for later.

**Expected:**

- Read and reconcile the saved list, preserving the independent analysis result.
  Discover other owned entities missing from the prepared list before processing.
- Process dependency-ready migration items in batches of at most two and save
  progress after each, continuing beyond the first batch without confirmation.
- Save two as the migration batch size without asking; preserve any independently
  saved API-analysis size. Later continuation without a new size reuses this value.
- Reuse admission authority for successful items; keep unsupported newly adopted
  items hidden and unfinished. Do not equate analysis completion with admission.
- Revisit the recorded blocker only if the missing evidence becomes available.
  Stop with a clear remaining-work report when only blocked items remain instead
  of repeatedly retrying them or claiming the entire migration succeeded.
