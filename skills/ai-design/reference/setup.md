# Set up the project

Read [the shared model](model.md). Use its standard contract directories and uppercase
index/pattern filenames for new and existing projects. Preserve implementation paths;
DESIGN.md stays at the repository root.
Setup connects sources and records missing capabilities. For a new system, the
[craft workflow](craft.md) owns the requested design decisions and implementation;
connect its established sources as they become available. Missing sources may be
recorded as absent, and empty indexes are valid.
For an explicit request to migrate automatically, setup also owns the
[automatic migration stage](#automatic-migration), including its mode, authority and
continuation. A connection-only request ends after reporting the connection.

Use plain language in the user's language throughout setup questions, explanations
and reports. Briefly explain each new technical term at its first mention, beside
the decision or result it describes. For example, introduce a contract as documented
rules for using a component, and ask "What may I change during migration?" when
presenting the modes below; describe each option by its practical effect.

At the first mention of an escape hatch, before a migration-mode choice or an
analysis offer, briefly explain it as a controlled local exception to design-system
rules, with a required reason and explicit limits that preserve behaviour and
accessibility. Explain that these boundaries help keep a local exception from
silently becoming a general rule and the design system from drifting. Use
[craft's exception rules](craft.md#design-public-apis-and-escape-hatches) for its
actual permissions and requirements.

## Survey the existing sources

Read repository instructions, existing DESIGN.md or legacy profile, UI libraries,
token definitions, themes, design rules, public usage and verification commands.
Find pages from the code when useful; a user-selected page is not required. Inspect
representative consumers to distinguish actual evidence from naming or popularity.
Report conflicting sources and unresolved normative choices without inventing new
system rules. Complete when the available sources and gaps in
project context are known; surveying pages does not authorise their adoption.

## Reconcile repository skills

During the initial survey, analyse existing skills inside the target repository
without asking whether to analyse them. Inspect hidden skill directories and
repository instructions that invoke skills; read relevant SKILL.md files and their
supporting instructions. Keep discovery inside the repository, including symlink
targets; report externally linked or unreadable skills as outside the inspected
coverage. Global and session/plugin skill catalogues are outside this analysis.

Compare actual instructions, triggers and responsibilities with ai-design's setup,
craft, use and supporting procedures. Distinguish complementary guidance, overlapping
functionality and incompatible instructions. Ground conflicts in source passages and
a concrete affected operation, such as replacing DESIGN.md or bypassing component
contracts. Judge fit for this project rather than general skill quality or popularity.

For overlapping functionality, recommend replacing the existing skill with ai-design,
even when no direct conflict exists. Prepare a concrete proposal identifying the
skill files to remove, responsibilities covered by ai-design, differing instructions
to transfer into root DESIGN.md, and any capabilities that would be lost. Preserve
existing DESIGN.md content and resolve contradictory rules explicitly with the user.
Inspect referenced resources and scripts before proposing deletion: prose does not
replace executable capabilities. Retain necessary resources and repair links from
their new location, or disclose the loss for the user's decision. Preserve unrelated
and complementary skills.

Present replacement proposals during setup using [the question format](model.md#questions-to-the-user),
batched with other independent startup decisions. Analysis alone authorises neither
skill removal nor instruction transfer. Apply the user's selected changes, reusing
any explicit authority already supplied: transfer the agreed instructions before
removing the replaced skill and update affected repository references. A request for
automatic codebase migration alone does not authorise skill replacement.

If a replacement is declined, offer a concrete division of responsibilities in
AGENTS.md when it resolves the conflict. Preserve the retained skill; record any
unresolved conflict and its affected operations in DESIGN.md. Continue independent
setup work and block only actions that depend on resolving that conflict. Declining
a replacement does not itself block connection. With no other repository skills,
continue without a replacement question.

Complete the analysis when inspected coverage, evidence and proposed or selected
dispositions are explicit. Report pending choices and unresolved conflicts separately
from the completed connection; do not claim compatibility beyond the inspected scope.

## Connect the project

Before migration checks, settle [migration verification](model.md#migration-verification).
Its saved choice governs optional connection checks and subsequent migration checks;
[final document reconciliation](#reconcile-final-documents) is always required.
For an explicitly requested automatic migration, gather its missing boundary decisions
in that same round before connection checks; for gradual adoption, include batch size.

Use [the DESIGN.md template](../assets/DESIGN.md) to create or complete root DESIGN.md.
Preserve existing design content and link authoritative sources. Record actual paths,
commands and missing tools; source conflicts remain explicit. Existing profiles may
supply facts, but DESIGN.md becomes the framework's entry point.

Create or migrate COMPONENTS.md and LAYOUTS.md using [the index template](../assets/inventory.md).
Move existing component/layout contracts into their respective group directories;
add [frontmatter](formats.md#contract-frontmatter) from evidenced identity, lifecycle
and actual source files. Preserve valid public promises and eligibility during moves.
Merge existing full pattern contracts into PATTERNS.md using [the pattern template](../assets/patterns.md).
Update incoming links, index links, document-relative references and examples that
resolve relative imports from the moved document. Keep root-relative code paths intact.
IDs remain unique across components, layouts and patterns; report collisions before
choosing a new identity. Empty groups are valid. Complete migration when the standard
locations and metadata validate and all affected links resolve.
Link an existing token catalogue or directly usable definitions without duplicating
it. Record absent token sources explicitly rather than inventing definitions.

Use `design-system/gaps.md` for new journals with [the gap template](../assets/gap-ledger.md).
Link the archive in DESIGN.md, using `design-system/gaps-archive.md` for a new one;
initialise a missing archive with a title and no entries. Existing journals and archives can remain
linked at their current paths. Add a short DESIGN.md and
`ai-design` pointer to existing AGENTS.md within the authorised setup scope, identifying
`use` for product interfaces and `craft` for system development and maintenance.
Create AGENTS.md with that pointer if absent. The installed package belongs in
`.agents/skills/ai-design/`.

Complete when DESIGN.md reaches the real sources, indexes and available verification
instructions, and missing capabilities are explicit. Check links from their containing
files; operational paths in DESIGN.md resolve from the repository root.

## Reconcile final documents

Before reporting connection, reread from disk every document created or changed by
setup, plus root DESIGN.md, AGENTS.md and existing CLAUDE.md files in the affected
area, even if setup did not edit them. Do not create an absent CLAUDE.md for this check.
Compare their contents with the actual project state and completed setup results:
source and skill paths, links, configured commands, craft/use responsibilities,
transferred rules and references affected by moves or skill replacements. Check links
from their containing files and operational paths from the repository root; existence
alone does not establish that a document describes the resulting setup accurately.

Correct factual mismatches within setup scope and reread the corrected files. Preserve
unrelated instructions; record contradictory rules and ask for unresolved normative
decisions rather than choosing a new rule. This reconciliation runs in every setup,
including when testing or verification is skipped; it is a mandatory exception to
[migration verification](model.md#migration-verification). Complete when every in-scope
document has been reconciled and actionable mismatches are corrected. Report coverage
and any unreadable files or unresolved conflicts explicitly, without claiming those
parts are reconciled. Repeat after automatic migration changes documents before its
final report, using the same scope rule for that stage's documents.

## Report the connection

Report DESIGN.md, linked sources, created artifacts, unmanaged UI and decisions needed,
including the repository skill analysis, applied replacements and remaining conflicts.
If automatic codebase migration was explicitly requested, continue to
[automatic migration](#automatic-migration) after connection. Its startup decisions
and batching apply instead of the next-step question below.
For a connection-only request, ask "What next?" using
[the question format](model.md#questions-to-the-user), with these four explicit
options in this order:

- **A. Automatic migration (recommended)** — complete the selected scope with saved
  progress, continuing through all batches without repeated confirmation.
- **B. Gradual adoption** — write contracts, run checks and admit existing components,
  layouts and patterns in batches, pausing after each for the user to continue.
- **C. API and consumer analysis** — recommend escape hatches from actual APIs and
  callers, without implementing them; use batches and save findings.
- **D. Stop here** — finish with the completed connection.

Automatic migration must be a selectable option, not a note below the question.
Connection is complete without an answer; start further work only when selected.
Choosing A explicitly opts into [automatic migration](#automatic-migration). Ask
for its missing mode next, recommending mode 1; selecting A alone does not choose
the mode. Reuse an already supplied mode and verification choice, and ask for any
missing verification choice in that same startup round. Choose an unspecified batch
size automatically and continue all batches under that stage's rules.
Choosing B or C starts the corresponding [gradual adoption](adoption.md) step
without renewed permission; follow its [batch size selection](adoption.md#choose-the-batch-size)
before processing. Choosing D ends setup.
Adoption and admission are separate; connection requires neither. For an analogous-page
demonstration requested by the task or project policy, follow
[optional independent quality](blind-gates.md).
Its absence does not make ordinary setup incomplete.

## Automatic migration

Run this setup stage only when automatic codebase migration is explicitly requested,
including equivalent natural language. Ordinary connection, product work and gradual
adoption do not start it. Reuse the survey and connections above and
[adoption](adoption.md#save-the-work-list) for the saved work list.

### Establish the boundaries

Inspect repository instructions, DESIGN.md, authoritative rules, implementations
and actual consumers before asking for decisions. Use the requested area; an explicit
whole-codebase request covers the whole project. Report the discovered scope.

| Mode | Authorised work |
| --- | --- |
| 1 — Contracts and escape hatches without behaviour changes (recommended) | Contracts and supporting documents, plus bounded local exceptions. API and consumer edits may connect an exception while preserving existing appearance and observable behaviour; no standalone repairs. |
| 2 — Contracts, escape hatches and repairs preserving correct behaviour | Mode 1 plus implementation and affected consumer repairs against authoritative requirements within the selected area, including business logic. Correct behaviour stays intact; evidenced defects may change. Apply ordinary admission checks. |
| 3 — Contracts only | Component, layout and existing pattern contracts, indexes, DESIGN.md and supporting links, journals and progress. Runtime code stays unchanged. |

Include any missing [verification choice](model.md#migration-verification) in this
startup round; an earlier setup choice already settles it.
Reuse explicit answers and saved decisions for this migration. If the mode is
missing, present the three options in the order above using
[the question format](model.md#questions-to-the-user). Recommend **mode 1**.
The selected mode settles business-logic authority; do not ask a separate question.
Explicit delegation to choose permits mode 1 without questions; a request for
automation alone is not that delegation. Wait for required
answers before dependent edits; the survey and work list can proceed meanwhile.

Mode 1 may replace an existing styling override with a documented escape hatch
that produces the same appearance and behaviour. Record defects that require repairs
without fixing them. Mode 2 preserves correct behaviour, not defects: if an
authoritative requirement forbids saving an empty name but the form allows it,
add the missing validation. This authority also covers necessary in-scope repairs to
permissions, calculations, persistence, network operations and business-process
transitions. Preserve unaffected behaviour and honour any explicitly narrower scope.

Modes 1 and 2 authorise their permitted craft changes and migration of their affected
product consumers. Inspect all callers before changing a shared API or appearance.
Preserve compatibility with consumers outside the selected area; if this cannot be
done, block the change pending a scope decision. Keep unrelated redesign outside
the migration. New normative rules require authoritative sources or explicit
delegation from the user; observed behaviour alone does not establish a
standard. Record conflicts and unresolved decisions instead of weakening promises.

Complete this step when mode, area, any explicit restrictions and verification choice
are settled and saved.

### Execute and resume

Before the first batch, follow [migration planning](migration-planning.md) to complete
and link the shared work list and execution plan in `design-system/adoption.md`.
Include project-owned components, layouts and existing patterns; in modes 1 and 2 also list affected
consumer locations and change dependencies. Pages are consumers, not automatically
new patterns. Group supported bindings and process dependencies first.

Save the mode, area, explicit restrictions, verification choice and any delegated
normative authority in `design-system/adoption.md`. Track documentation, admission, repairs and verification
separately, with evidence, exceptions, blockers and the next work. Preserve independent
API-analysis results; using escape hatches does not require a separate analysis campaign.

Use an explicit batch size, otherwise a saved migration size, otherwise choose a
suitable positive size (10 is a starting point). Save it without asking. Automatic
migration authorises every batch: save each item's result and each batch's progress,
then continue without confirmation. Count attempted blocked items toward batch size.
On resume, reconcile sources and saved decisions, updating affected tasks through
[migration planning](migration-planning.md); recheck only invalidated results.
Revisit blockers only when their missing decision or evidence changes. A mode change
retains prior evidence but reopens obligations newly required by that mode.

For each entity, follow [contract authoring](contract.md) and the applicable
[craft audits](craft.md#edit-and-audit), subject to the saved
[verification choice](model.md#migration-verification). A refusal uses that rule's
admission and completion exceptions in every mode. Otherwise modes 1 and 3 use the
admission rule below. In modes 1 and 2, complete permitted craft changes before updating consumers
through [use](use.md); when verification is enabled, verify each stage before proceeding.
Existing authority settles the scope of those
consumer updates; unresolved API defaults or normative decisions remain blockers.
Use supported APIs within the selected mode's behaviour boundary; mode 2 also repairs
violations. In modes 1 and 2, use an escape hatch only
for an evidenced local need, following [craft's exception rules](craft.md#design-public-apis-and-escape-hatches)
and [exception recording](gaps.md#record-exceptions). Reuse a suitable mechanism;
otherwise create only the bounded mechanism needed. Both modes authorise creation
and use, with a mandatory non-empty reason, explicit limits and the project's approval
conditions and behaviour/accessibility guarantees. Add mechanisms only where needed.

### Admission without repairs

For modes 1 and 3, completing a structurally valid contract and index entry for an existing
entity includes making it `discoverable`, even when a behavioural/visual check fails
or evidence is unavailable. Preserve existing `deprecated` status. This is an explicit
exception to ordinary evidence-gated admission, not a claim of runtime readiness.
Keep unimplemented drafts outside this exception. An unresolved normative choice
still blocks the dependent contract decision; document the settled parts meanwhile.

Run applicable checks and record their actual outcomes. Keep the intended promises;
link known defects and unverified promises from the relevant existing contract
sections to the journal or saved evidence. Do not add a new contract format or hide
documented entities merely because those checks could not pass. Consumers must
consider these limitations during discovery and verify the promises they rely on.
Mandatory project approval conditions still apply; report a policy conflict as a
blocker instead of silently declaring admission or changing the policy.

### Validate plan completion

After the batches finish, follow [plan completion validation](migration-planning.md#validate-plan-completion)
to reconcile the plan with actual results and save the assessment in
`design-system/adoption.md`. Complete any actionable omissions before the final report;
if only blocked work remains, record the partial result.

### Complete and report

Before reporting, complete [final document reconciliation](#reconcile-final-documents)
for documents changed by migration. Stop when every in-scope item has its mode's
result or only blocked work remains.
An empty scope is a completed result. Report the mode, area and explicit restrictions,
documentation and eligibility, repairs and exceptions, static/behavioural/
visual evidence, and one consolidated list of remaining blockers and decisions.
With verification skipped, apply [migration verification](model.md#migration-verification)
for completion and report the unverified result separately from completed repairs.
In modes 1 and 3, defects requiring repairs outside the mode do not block documentation
completion; report failed or unverified runtime promises separately. In mode 1,
unfinished exception changes or failed/unavailable enabled checks of those changes
still block completion. Mode 2 remains partially complete while required repairs or
enabled verification are blocked. Unresolved requirements and mandatory approvals
remain blockers in every mode. An exception records a local deviation; close
a gap only under [the existing resolution rules](gaps.md#record-and-resolve).
