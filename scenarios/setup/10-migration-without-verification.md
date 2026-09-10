# Honour verification refusal while preserving migration work and admission

**Skill:** ai-design
**Route:** setup
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- In an isolated copy, use the wrapper sources and authoritative rules from
  [the batch scenario](03-adoption-batch.md). Leave their contracts and indexes absent.
- Remove one existing settings-page field's accessible label without changing its
  input, state or submission. Keep its authoritative contract and existing focused
  check available, so the required repair is evident from source inspection.
- Record that defect as an open gap. Include a deprecated entity and an
  unimplemented hidden draft as controls, seeding them if absent.
- Keep structural validators, tests and browser instructions available. The worker's
  tool log is the evidence for whether checks ran; missing tools cannot explain a skip.

**Request:**

> Automatically migrate the whole codebase in mode 3, without business-logic changes.
> Do not run the testing procedure. Finish all batches, including code repairs.

**Expected:**

- Honour the explicit refusal without asking for confirmation or downgrading the
  mode. Save the verification choice alongside mode, scope and progress.
- Read implementations, tests and consumers to author contracts and repair the
  missing label and its affected references within the selected scope.
- Run no verification commands or audit procedures, including setup link/structure
  validation, tests, build, contract/selection audits, browser/visual checks or
  independent gates. Do not rename a check as inspection, a smoke test or a repair step.
- Complete contracts, indexes, supporting links and progress across all batches.
  Make the newly documented implemented wrappers discoverable immediately without
  structural validation or admission evidence. Preserve deprecated status and keep
  the unimplemented draft hidden.
- Mark affected checks and promises unverified due to user choice, link limitations
  from contracts and report the user's acceptance of the risk of nonworking code.
  Leave the defect gap open without proof; distinguish a performed repair from a
  verified repair. Skipped checks alone do not block migration completion.
- Preserve business-logic, scope and exception-approval boundaries. The refusal
  authorises neither unrelated changes nor weaker behaviour/accessibility promises.

**Independent variants:** Start each from fresh preparation and evaluate the same
refusal, reporting and admission criteria with these scope differences:

- Mode 1: replace mode 3 with mode 1 and remove "including code repairs". Runtime
  stays unchanged; the missing-label defect remains recorded rather than repaired.
- Mode 2: replace mode 3 with mode 2. Repair the label without new escape hatches.
- Gradual adoption: request "Add contracts for all reusable components and layouts.
  Use batches of two and finish every batch. Do not run any verification." Newly
  documented wrappers become discoverable, while runtime repairs remain outside scope.
- Setup moves: request "Connect existing sources and move existing contracts to the
  standard structure. Do not run verification." Complete documents and links without
  checks or runtime repairs; do not start whole-codebase adoption.
- Resume and mode change: save mode 1, batch size two and verification skipped by
  explicit user choice in adoption.md, with wrappers still pending. Request "Resume
  migration in mode 2 without business-logic changes and finish all batches."
  Reuse the refusal without asking, keep all checks skipped and perform the label repair.
