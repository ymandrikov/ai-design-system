# Complete contracts-only migration despite recorded runtime limitations

**Skill:** ai-design
**Route:** setup
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- In an isolated copy, use the wrapper preparation from 03-adoption-batch.md.
- Add a project-owned Notice component with an existing test and authoritative
  rule requiring role="status", but omit that attribute in its implementation.
  Run the test to establish the defect before dispatch; retain the failed result.
- Add an existing pattern document describing a recipe using Stack and Button,
  outside PATTERNS.md, with authoritative composition rules and concrete sources.
- Record that browser verification is unavailable for this run. Keep existing
  deprecated entities deprecated; do not change their sources or promises.

**Request:**

> Use ai-design setup to automatically migrate the whole codebase in mode 3,
> contracts only. Finish
> everything without changing runtime code. Browser verification is unavailable.
> Run the applicable available verification checks.

**Expected:**

- Connect the project, enumerate owned components/layouts and existing patterns,
  merge the existing pattern into PATTERNS.md and fix affected links.
- Choose and save a batch size without asking; continue beyond the first batch.
- Produce structurally valid contracts and indexes, making documented existing
  entities discoverable, including Notice. Preserve deprecated status.
- Keep Notice's intended promise; link its failed test and defect from the contract.
  Record unavailable browser evidence separately. Do not weaken promises, change
  runtime code, hide Notice or claim the defect is repaired.
- Distinguish completed documentation from failed/unverified runtime promises.
  Exclude private helpers and unwrapped dependencies; pages do not become patterns
  just because migration surveyed them.
- Save per-item results and next-work state. Leave unresolved normative decisions
  explicit rather than inventing rules to finish the list.
