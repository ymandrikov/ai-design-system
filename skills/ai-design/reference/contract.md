# Author a consumer contract

Enter from [craft](craft.md). Read [fixed formats](formats.md), DESIGN.md
and the index's Contract link. Store component/layout/pattern
contracts in their standard group directories. Maintain id, status and root-relative
source/evidence paths in frontmatter; connect source files to the supported public
bindings in Public API or the pattern's Structure.
Use actual paths instead of deriving them from an id. A document-only pattern needs
no new code.
The framework owns contract correctness and the audits below. Follow the project's
established procedures for engineering evidence; describing or detecting a logic
mismatch does not authorise repairing component internals or business logic.

## Write the promise

For creation or a public change, describe intended valid use from the request and
authoritative sources. Report new unresolved normative choices to the user.
An intended promise is not evidence that its implementation already exists.

For adoption, inspect code, styles, tests and actual consumers as evidence of public
use and observable outcomes. Separate entity responsibilities from consumer choices.
An emitted change event demonstrates notification, not a required save policy.
Trace each promise and restriction to evidence or an explicit decision;
report source contradictions and desired improvements separately. Incidental internal
acceptance need not become public API.
Capture the resulting selection reasoning in the contract. A consumer cannot rely
on the author's knowledge of the implementation or infer a restriction from the
absence of other call sites.

Clarification preserves valid calls, composition and observable promises. Reclassify
as a contract change if meaning changes. Complete when the required sections describe
the intended public boundary and any unresolved decisions are explicit.

## Ordinary audit

Check every selection item against the [shared selection rules](formats.md#shared-selection-sections):
list form, one criterion per item and a single interpretation. Compare the combined
When-to-use logic with every disqualifier, including boundary values, and look for a
request that both allows and forbids use. Any such case is a contract contradiction;
resolve it from authoritative evidence or report the unresolved decision.

For every affected public parameter, use the [Public API rules](formats.md#component)
to determine a value from a concrete request. Follow linked rules and check defaults,
interacting inputs and permitted free choice. If only accepted values or examples
explain the choice, report the missing basis through craft's gap process.

Compare public calls, defaults, states, events, form values and accessibility with
evidence for each supported binding. Check promised parity and documented differences,
not identical internal DOM. Include layout spacing, region order/grouping and all
consumer obligations from linked contracts. Report unsupported promises as defects;
use the project's implementation conventions for internal mechanics.

Check a new suitable context beyond the documented examples, the nearest plausible
unsuitable use (when the contract has a disqualifier) and a valid edge case. For each,
connect request facts to the deciding contract clauses and the resulting selection,
configuration or composition. An obvious mismatch alone does not test a disputed
boundary. The [explanations](formats.md#detail-for-agent-decisions) are sufficient when
these decisions follow without implementation knowledge, invented restrictions or
treating examples as the only valid uses; report any missing basis through craft's gap process.
For patterns/layouts also check a deliberate violation of a
required composition rule.

For migration within setup, defer independent discovery and use
[setup’s coverage and admission rules](setup.md#discovery-during-setup-migration);
ordinary author audits above still apply. Outside setup, run the mandatory [independent discovery gate](blind-gates.md) for contract creation,
including adoption and intended hidden contracts, and changes to selection, composition
eligibility or index routing. It runs the actual discovery procedure once per authoring
batch in fresh context; the author's ordinary audit cannot replace it. Admission needs
current passing discovery evidence. Clarification with no eligibility/routing change
needs only affected ordinary checks. Independent consumption remains optional unless
the task or DESIGN.md requires it.

Use existing tests, examples and focused public-use checks as evidence where they
prove the current promises; inspect their actual results. Missing runtime evidence
remains unverified. Browser-dependent promises need rendered/interactive evidence via
[UI verification](verify.md). Unchanged evidenced promises
need no new test or browser run merely because their wording was clarified.

Align index summaries, actual Contract links and directly affected incoming contract
references. Run structural validation with the entity's group and all three indexes:

```sh
node <ai-design-directory>/scripts/check-contract.mjs --kind <component|layout|pattern> \
  --inventory <components-index> --inventory <layouts-index> \
  --inventory <design-system/PATTERNS.md> <contract-path>
```

For `--kind pattern`, pass the individual `design-system/patterns/<name>.md` contract.
The checker validates its sections, metadata, index membership and cross-group identity.
Source paths resolve from the nearest ancestor DESIGN.md.

Record the command, result and output or evidence path. The checker validates
structure/links/indexes, not semantic correctness. Fix structural errors and report
semantic contradictions, failing or unavailable checks to craft. Complete the
audit when each affected public promise has evidence or an explicit limitation and
any required independent discovery has passed, subject to an explicit
[migration verification refusal](model.md#migration-verification).
Craft owns admission and coordinates the applicable independent gates.
