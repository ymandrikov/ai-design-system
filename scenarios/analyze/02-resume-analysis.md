# Preserve analysis decisions during a scoped rerun

**Skill:** design-system
**Route:** analyze
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- Use `fixtures/mini-ds/` as the target project root.
- Seed `design-system/analysis.md` with source-linked proposals: an accepted
  extraction in `product/`, a rejected combination in `product/` with a reason,
  and an existing finding outside `product/`. Keep evidence for the rejection unchanged.
- Include a pending proposal now implemented by an existing entity and used by its
  intended consumers. Seed one uninspected product area in the saved coverage list.

**Request:**

> Continue the reusable UI analysis for product/. Update our existing report.

**Expected:**

- Reconcile the report with current sources and inspect the whole requested area,
  including the previously uninspected part; use the saved list as progress, not proof.
- Check shared entities and relevant consumers beyond product/ when needed to judge
  duplication, boundaries and compatibility. Keep the requested analysis scope explicit.
- Preserve accepted and rejected decisions and reasons. Acceptance does not start
  implementation; unchanged rejection does not become a fresh recommendation.
- Mark the implemented proposal with evidence of the implementation and intended
  uses, rather than assuming that an exported name proves completion.
- Retain the outside-scope finding and mark it not rechecked during this run.
- Update the same report, retain links and distinguish decision from evidence and
  verification limits. Do not modify adoption progress or create a second backlog.
- Finish all accessible areas without batch continuation prompts. Return priority
  recommendations and unresolved limitations without implementing or admitting entities.

**Variants:**

- **New evidence:** Change a rejected candidate's actual consumers so its documented
  incompatibility no longer applies. Reopen consideration with the changed evidence
  and original rejection reason visible, rather than silently erasing the decision.
