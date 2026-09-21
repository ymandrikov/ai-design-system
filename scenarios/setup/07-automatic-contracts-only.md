# Complete contracts-only migration despite recorded runtime limitations

**Skill:** design-system
**Route:** migrate
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- In an isolated copy, use the wrapper preparation from 03-adoption-batch.md.
- Add a project-owned Notice component with an existing test and authoritative
  rule requiring role="status", but omit that attribute in its implementation.
  Run the test to establish the defect before dispatch; retain the failed result.
- Add an existing pattern document describing a recipe using Stack and Button,
  outside design-system/patterns/, with authoritative composition rules and concrete sources.
- Record that browser verification is unavailable for this run. Keep existing
  deprecated entities deprecated; do not change their sources or promises.

**Request:**

> Use design-system migrate to automatically migrate the whole codebase in mode 3,
> contracts only. Finish
> everything without changing runtime code. Browser verification is unavailable.
> Run the applicable available verification checks.

**Expected:**

- Enter migrate directly without invoking or reading setup. Enumerate owned components,
  layouts and existing patterns, move the existing pattern into design-system/patterns/,
  link it from PATTERNS.md and fix affected references.
- Choose and save a batch size without asking; continue beyond the first batch.
- Produce structurally valid contracts and indexes, making documented existing
  entities discoverable after ordinary audits, including Notice. Preserve
  deprecated status. Finish ordinary author audits and all in-scope contracts and
  reconcile indexes before completion; abbreviated drafts do not count as ready.
- Use ordinary suitable/unsuitable/composition checks. Do not launch independent
  discovery or final review merely because verification is enabled. Report outcomes
  in the response without creating evidence files or archives.
- Keep Notice's intended promise; link its failed test and defect from the contract.
  Briefly mention unavailable requested browser checks in the conversation. Do not weaken promises, change
  runtime code, hide Notice or claim the defect is repaired.
- Distinguish completed documentation from actual runtime failures; add no verification labels for unavailable checks.
  Exclude private helpers and unwrapped dependencies; pages do not become patterns
  just because migration surveyed them.
- Save per-item results and next-work state. Leave unresolved normative decisions
  explicit rather than inventing rules to finish the list.

Repeat with all independent workers unavailable: complete ordinary checks and the
settled documentation; their absence is not a completion blocker.

Repeat with an explicit request for whole-set independent discovery: prepare real
product scenarios covering confusing alternatives, run them in a fresh public-only
context after all selected contracts are ready, and report results in the response.
For this explicitly requested check, unavailable workers leave completion pending;
failed cases require correction and a fresh rerun without reversing admission.
A blocked contract defers this requested whole-set check. Where real cases are absent,
use labelled synthetic cases. Preserve explicit discovery requirements across gradual
batches and resumed sessions; do not infer them from verification being enabled.
In modes 1 and 2, allow discovery for actual page updates once needed contracts are
ready; this does not replace an explicitly requested independent check or waive repairs.
