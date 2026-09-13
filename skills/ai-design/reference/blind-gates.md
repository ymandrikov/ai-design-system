# Independent contract gates

For migrations within setup, follow [setup discovery](setup.md#discovery-during-setup-migration)
for timing, coverage, admission and completion instead of the per-batch rules below.
Use the scenario quality, public-input isolation and result assessment here with
setup’s saved scenarios.
Outside setup, the following strict rules apply.

Discovery is mandatory for contract creation (including adoption and intended hidden
contracts) and changes to selection, composition eligibility or index routing.
Admission requires passing evidence for the current contracts and competing candidates;
reuse it while those inputs and relevant rules remain unchanged. Typographical or
other clarifications that preserve these decisions need no new discovery gate.
Connection-only setup needs no gate unless it creates or changes those boundaries.

Independent consumption/composition is additional: run it after creation or affected
public-use edits only when the task or DESIGN.md requires that check. Optional setup
demonstrations follow the last section. These checks supplement ordinary author audits.

Use one fresh subagent or independent session for the discovery requests in each
authoring batch, with the current skill files and only the public inputs below.
Use a separate fresh context for optional consumption. The author's own reasoning is
not independent evidence. If unavailable, record not run; keep the required audit and
dependent admission incomplete. A failed discovery gate also blocks contract completion.
The runtime-evidence exception in [automatic modes 1 and 3](setup.md#admission-without-repairs)
does not waive discovery. An explicit [migration verification refusal](model.md#migration-verification)
still takes precedence; report skipped evidence under that rule.
The controller saves prompts, complete answers, generated artifacts and executable
results in the provided evidence directory outside the product copy when supplied. Do not
supply expected answers to the worker. A controller checks results, not prose style.

## Prepare tasks before dispatch

Apply [scenario quality](#scenario-quality) to every prepared request.
For each affected entity, derive a must-fit request in a new supported context beyond
its examples, and a nearby must-not-fit request from a real disqualifier. Neither
request names the target. Choose the closest plausible confusion, not just an obvious
mismatch; include a native alternative or no managed match where relevant. If the
entity has no disqualifiers, record that and test its boundary against a competing
candidate without inventing an exclusion. Prepare an API/composition edge for the
ordinary audit and optional consumption gate using a valid combination of optional
features. Do not set mutually exclusive inputs together.
A general component's canonical example is not automatically a disqualifier.
Record the expected decisions and deciding constraints separately from worker inputs.
For a pattern/layout, also prepare a composition that violates one required rule;
record which rule the verifier must reject. Prefer an actual project defect or boundary.

## Scenario quality

Start with a product situation: who is doing what, what the content represents,
its surrounding context and the required interaction or outcome. Derive real cases
from consumer tasks and product requirements; derive synthetic cases when those are
absent and identify them as synthetic in the controller's evidence. Prepare these
facts independently of the contract's wording and keep gate cases out of its examples.

For a close comparison, hold the task/context steady and change the fact that should
change the choice. For example, a saved item carries the text "Sync failed": compare
a state marker beside its name with an explanation of the failure and recovery steps
in the same location. The controller establishes the expected choice from this
project's rules; this example sets no universal Badge policy.

Before dispatch, save each case's origin, competing uses and deciding fact beside
the separate expectations. A request must leave the component decision to discovery.
Copying or paraphrasing a selection criterion, naming the desired presentation, or
saying that the required recipe already calls for it does not exercise that decision.
Shared domain words are fine; judge whether the request supplies a situation or the
answer, not lexical similarity. Rewrite invalid cases before counting their coverage.
A correct answer to an invalid case supplies no evidence of contract sufficiency.

## Discovery gate: run the actual procedure

Give the worker an isolated copy containing DESIGN.md, all three UI indexes, their
linked contracts, required public rules/token definitions and the current ai-design
skill. Keep competing candidates present. Omit component implementations, private
styles, tests, previews, consumer code and authoring history; source/evidence links
in the copied contracts are references, not additional permitted inputs. Keep expected
answers outside the worker's inputs. Validate structure and source links on the
author's full copy, not this reduced one.
For hidden new contracts or admission, set proposed discoverable status only in the
gate copy. Label the result proposed-selection evidence; it authorises neither source
status changes nor runtime-readiness claims. Already admitted entities keep actual status.

Dispatch all unnamed requests for the batch together, with neutral case ids and no
must-fit/must-not-fit labels. The worker decides each request separately:

```text
Read <copy>/skills/ai-design/SKILL.md and follow ai-design discovery.
Design: <DESIGN.md in copy>.
Requests: <case ids and unnamed tasks>.
Read only the supplied copy. Return the full discovery response in the conversation.
For each case, connect request facts to the deciding contract or linked public rule.
Use only read/search operations; the controller saves your response.
```

First check the cases against [scenario quality](#scenario-quality); a successful
response cannot compensate for an invalid case. Then compare the actual selection,
required questions and composition decisions with
the prepared expectations. Must-fit selects the target under actual ranking after
candidate contracts are compared; must-not-fit excludes it for the applicable clause.
A correct id with an invented reason, a guess filling a missing rule, or reliance on
implementation knowledge fails. Assess the decision and its stated basis, not response
length or formatting. A missing contract rule is an authoring defect, not a request fact
for the worker to invent or the controller to supply as an expected answer.
A different valid candidate may expose bad expected evidence: inspect contracts
before deciding whether the task, summary or contract needs correction. Do not alter
other contracts just to force a target win. A missing request fact may legitimately
require an answer; supply it in a new run instead of marking a conditional choice as
verified. Save each case's clauses and actual result. After corrections, rerun affected
cases in a fresh context against the final public inputs; retain earlier failures.

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
is rejected for the intended reason. Follow the project's established engineering
verification procedure; the framework defines these expected contract outcomes, not
how to author tests. Passing checks over unrelated existing UI are insufficient. A schema validator or a
worker saying "valid" does not replace runnable composition evidence when code exists.
Visual/interactive promises need the browser evidence described by
[verification](verify.md); document-only work can have executable checks not applicable,
with that limit named.

Pass requires correct decisions, valid artifacts, no unresolved fact needed for those
tasks, and passing applicable executable checks. Classify failures as contract,
implementation, test expectation or decision; route contract changes to craft
and component fixes to the project process, then rerun affected gates on final artifacts.
An unavailable check is not run, not pass. Record each applicable gate with raw evidence.

## Optional setup demonstration

When an analogous-page demonstration is requested, use an existing page found during
setup or named by the task. Give a fresh worker an analogous request, root DESIGN.md
and public sources in an isolated copy. Run build with actual discovery, then verify
the resulting page and a deliberate composition violation. Save requests, artifacts,
commands and available browser evidence. Report demonstration limits separately from
the completed connection; this does not authorise admission of unadmitted entities.
