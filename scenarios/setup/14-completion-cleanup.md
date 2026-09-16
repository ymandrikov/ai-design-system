# Remove execution-only artifacts after completed migration

**Skill:** design-system
**Design:** fixtures/mini-ds/DESIGN.md
**Route:** migrate
**Preparation:**

- Use an isolated mini-ds copy. Seed `design-system/adoption.md` with a completed
  mode-3 migration plan and verification skipped by explicit user choice. Link it from DESIGN.md and record results matching the actual files.
- In that same document, save a still-pending independent API-analysis item and
  a known runtime limitation linked from its affected contract. Include a completed
  analysis recommendation that remains useful for future work.
- Add a one-off migration script, a temporary gate copy and execution logs with
  no continuing use. Add a legacy guide fully superseded by the migrated contracts,
  with one incoming link still pointing to it. Record their paths for the evaluator.
- Include a lasting component test, example and evidence file supporting a current
  contract claim. Add an older mixed guide whose remaining process instructions
  are still in use. These files must survive.

**Request:**

> Finish the saved migration and report the result. Keep the saved scope
> and verification choice.

**Expected:**

- Reconcile the completed plan against actual results and perform mandatory final
  document reconciliation. Preserve the unverified result without running skipped
  checks or requesting a cleanup decision.
- Enter migrate directly without reconstructing connection history or reading setup.
- Before the final report, remove execution-only scripts, copies, logs, the
  superseded legacy guide and completed planning/progress content, without creating
  a separate setup-history archive.
- First move the runtime limitation and useful completed recommendation to suitable
  permanent documents, retaining their meaning and evidence. Repair the contract's
  limitation link and the legacy guide's incoming link.
- Keep `adoption.md` and its DESIGN.md link for the pending API analysis, including
  its inputs, decisions and next action. Do not start that analysis merely to delete
  the file. Keep lasting tests, examples, required evidence and the mixed guide's
  active instructions regardless of their age or creation during setup.
- Reconcile the surviving documents after cleanup, including affected links, and
  report what was removed and what remains for continuing work.

**Independent variants:**

- **No remaining work:** omit the pending analysis. Transfer lasting results, delete
  `adoption.md` and remove its obsolete DESIGN.md link; do not recreate it to report
  completion or archive the completed plan.
- **Paused or blocked:** leave a migration item unfinished, or enable verification
  with a required independent check unavailable. Preserve execution materials and
  progress for continuation; a completed batch or blocked stop does not trigger cleanup.
- **Connection only:** change Route to setup, seed only completed connection work and temporary connection
  materials. Request connection without migration and skip optional verification.
  Clean up after document reconciliation before reporting connection and offering
  next steps; preserve the saved verification choice needed if a next step is selected.
