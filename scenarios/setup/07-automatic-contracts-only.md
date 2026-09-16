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
  entities discoverable before independent discovery, including Notice. Preserve
  deprecated status. Finish ordinary author audits and all in-scope contracts and
  reconcile indexes before dispatch; abbreviated drafts do not count as ready.
- Save real page scenarios and at least one distinguishing request per group of
  similar candidates; list uncovered entities. Run these against the whole public
  set in fresh independent context. No per-entity positive/negative pair is required,
  and batch completion alone never triggers an independent discovery run.
  Copies or paraphrases of contract conditions do not count as coverage, even with
  matching answers; inspect recorded origins and the facts distinguishing candidates.
- Keep Notice's intended promise; link its failed test and defect from the contract.
  Record unavailable browser evidence separately. Do not weaken promises, change
  runtime code, hide Notice or claim the defect is repaired.
- Distinguish completed documentation from failed/unverified runtime promises.
  Exclude private helpers and unwrapped dependencies; pages do not become patterns
  just because migration surveyed them.
- Save per-item results and next-work state. Leave unresolved normative decisions
  explicit rather than inventing rules to finish the list.

Repeat with the independent discovery worker unavailable. Finish the settled document
work and retain discoverable status; record verification and migration completion as
pending. The author's own reasoning does not replace independent evidence.

Repeat with one contract blocked by a missing normative decision: finish independent
work and save progress, but defer discovery of the whole set until it is resolved.
Repeat with a discovery failure: repair the contract and rerun affected cases in a
fresh context without reverting discoverable status or claiming migration complete early.
Repeat with no real consumers or similar candidate groups: save synthetic scenarios
from contract purposes and composition rules, label the coverage and still run discovery.
Repeat as gradual migration across multiple batches and a resumed session: save
admission after ordinary audits and structural checks, and independent discovery
after the whole area is ready. Preserve these conditions without any origin label.
In modes 1 and 2, allow discovery for actual page updates once needed contracts are
ready; this does not count as the final independent check or waive required repairs.
