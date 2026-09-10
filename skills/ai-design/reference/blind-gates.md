# Optional independent quality mode

Load only when the task or DESIGN.md requires independent quality checks. Ordinary
contract audits and setup connection do not depend on this mode. Run consumption after
creation or contract edits; run discovery for admission or changes to selection,
composition eligibility or index routing. A hidden entity staying hidden can skip
discovery. In this mode promotion requires both gates. Apply only affected gates to
clarifications. Failures or unavailable required gates remain explicit and block the
admission they are required to support. In [automatic modes 1 and 3](setup.md#admission-without-repairs),
use its admission exception and report gate failures or unavailable evidence separately;
explicit project approval conditions still apply.

Use a fresh agent context for each gate, with the current skill files and only the
raw project artifacts it needs. A fresh subagent or independent session is required;
the author's own reasoning is not gate evidence. If unavailable, record not run.
The controller saves prompts, complete answers, generated artifacts and executable
results in the provided evidence directory outside the product copy when supplied. Do not
supply expected answers to the worker. A controller checks results, not prose style.

## Prepare tasks before dispatch

Derive a must-fit request from a supported use without naming the target, an explicit
must-not-fit request from a real disqualifier, and an API/composition edge using a
valid combination of optional features. Do not set mutually exclusive inputs together.
A general component's canonical example is not automatically a disqualifier.
Record the expected decisions and deciding constraints separately from worker inputs.
For a pattern/layout, also prepare a composition that violates one required rule;
record which rule the verifier must reject. Prefer an actual project defect or boundary.

## Discovery gate: run the actual procedure

Give the worker a DESIGN.md, both indexes, PATTERNS.md, their linked contracts and the current
ai-design entrypoint and discovery procedure. Keep competing candidates present.
For admission only, use an isolated copy with the target's proposed discoverable
status in its contract frontmatter or pattern section; label this as proposed admission evidence, never change the source status.
For an already admitted entity use its actual status.

Dispatch one independent request per must-fit/must-not-fit case:

```text
Read <copy>/skills/ai-design/SKILL.md and follow ai-design discovery.
Design: <DESIGN.md in copy>.
Request: <unnamed task>.
Read only the supplied copy. Return the full discovery response in the conversation.
Use only read/search operations; the controller saves your response.
```

Compare the actual selection, required questions and composition decisions with
the prepared expectations. Must-fit selects the target under actual ranking after
candidate contracts are compared; must-not-fit excludes it for the applicable clause.
A different valid candidate may expose bad expected evidence: inspect contracts
before deciding whether the task, summary or contract needs correction. Do not alter
other contracts just to force a target win. A missing fact may legitimately require
an answer; supply it in a new run instead of marking a conditional choice as verified.

## Consumption/composition gate

Give a fresh worker the target contract and linked public dependencies, the supported
binding and the three tasks. Implementation, prior tests, previews and expected
answers remain hidden from the worker. A component-only case needs no unrelated
pattern contracts. A composition case needs all public dependencies it consumes.

```text
Use only these contracts: <paths>. Binding/context: <context>.
A: <must-fit request>. B: <must-not-fit request>. C: <valid edge request>.
Decide use for A/B and expressibility for C. For A and C write the actual invocation
or composition to <scratch artifact paths>. For a supplied invalid composition,
identify any required rule it violates. Explain any fact the contracts leave
undecidable. Do not inspect implementation or tests.
Return clear decisions, artifact paths, violations and unresolved facts.
```

The controller checks valid APIs, mandatory relationships and whether A fits, B is
excluded and C is expressible against the prepared evidence. Judge meaning rather
than response formatting or a printed candidate list. A stated false restriction
is a failure even when the chosen id is correct. Run generated artifacts with the
project's real bindings and focused checks in an isolated copy. For patterns/layouts verify that
the target composition exists, valid compositions pass and the deliberate violation
is rejected for the intended reason. Use assertions that fail on a violated condition;
passing checks over unrelated existing UI are insufficient. A schema validator or a
worker saying "valid" does not replace runnable composition evidence when code exists.
Visual/interactive promises need the browser evidence described by
[verification](verify.md); document-only work can have executable checks not applicable,
with that limit named.

Pass requires correct decisions, valid artifacts, no unresolved fact needed for those
tasks, and passing applicable executable checks. Classify failures as contract,
implementation, test expectation or owner decision; route contract changes to craft
and component fixes to the project process, then rerun affected gates on final artifacts.
An unavailable check is not run, not pass. Record each applicable gate with raw evidence.

## Optional setup demonstration

When an analogous-page demonstration is requested, use an existing page found during
setup or named by the task. Give a fresh worker an analogous request, root DESIGN.md
and public sources in an isolated copy. Run build with actual discovery, then verify
the resulting page and a deliberate composition violation. Save requests, artifacts,
commands and available browser evidence. Report demonstration limits separately from
the completed connection; this does not authorise admission of unadmitted entities.
