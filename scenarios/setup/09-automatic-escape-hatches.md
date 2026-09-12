# Default to escape hatches without changing behaviour or waiving approval

**Skill:** ai-design
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- In an isolated copy, add two Stack consumers: an embedded inspector requiring
  6px spacing to align with host rows, and another local view with a different
  override. Preserve the established Stack spacing rules.
- Link an authoritative decision permitting the inspector's precise spacing
  exception, requiring a non-empty reason and preserving behaviour/accessibility.
  State that the second view's deviation still requires approval.
- Provide no existing exception mechanism. Add one ordinary incorrect consumer
  configuration whose correction through Stack's public API would change its visible
  spacing. Record its defect and current rendering as preparation evidence.
- Seed adoption.md with an independent completed API-analysis result and evidence,
  plus a migration item blocked on that second view's missing approval.

**Request:**

> Fully automatically migrate this whole codebase to ai-design-system. Choose
> the migration mode using your recommendation, and
> finish all available work. Preserve saved results that are still valid.
> Run the applicable verification checks.

**Expected:**

- Select mode 1 through explicit delegation; save that decision, choose an
  unspecified batch size and continue without a mode or business-logic question.
- Reconcile the work list while preserving independent API-analysis evidence.
- Use the authorised inspector need to create only a bounded exception mechanism
  in project style and move its existing override into it. Preserve its rendered
  spacing, interaction and behaviour; API and consumer edits are allowed for this work.
- Leave the ordinary configuration defect unchanged and record it in the contract
  and journal. Its repair would change appearance and is outside mode 1.
- Require and validate a non-empty reason; prevent unrelated behaviour and
  accessibility overrides. Check valid local use and rejected invalid input.
- Update the inspector and its contract, and link its exception use to a journal
  entry with source, need, affected rule, reason and evidence.
- Keep the second view blocked without applying its exception: mode 1 does not
  waive approval. Do not retry the unchanged blocker between batches.
- Do not normalise the exception as a reusable variant, close the underlying gap
  just because it is recorded, or run a separate whole-system API-analysis campaign.
- Verify affected implementations and consumers; report partial completion and
  the remaining approval once independent work is exhausted.

**Independent variant:** Omit the second view and its approval blocker. Complete
mode 1, including its verified exception changes, and make structurally documented
existing entities discoverable with the ordinary configuration defect linked.
That unchanged defect does not block completion or become repaired/waived.
