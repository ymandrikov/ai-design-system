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

First [determine the repository's agent mode](#determine-the-agent-mode), before
creating or changing files. Then continue the source survey below.

Read repository instructions, existing DESIGN.md or legacy profile, UI libraries,
token definitions, themes, design rules, public usage and verification commands.
Find pages from the code when useful; a user-selected page is not required. Inspect
representative consumers to distinguish actual evidence from naming or popularity.
Report conflicting sources and unresolved normative choices without inventing new
system rules. Complete when the available sources and gaps in
project context are known; surveying pages does not authorise their adoption.

### Determine the agent mode

Use an explicit user-selected mode when supplied. Otherwise inspect project-owned
agent instructions and configuration, including hidden directories and nested packages:

- **Multiple agents:** any existing `.agents/` directory or `AGENTS.md`, or evidence
  of another agent's configuration, selects this mode. This includes `.agents/`
  created by an installer before setup.
- **Claude-only:** `CLAUDE.md` or `.claude/` exists, with no evidence of other agents.
- **Unknown:** use the multiple-agent mode, including when no repository skills or
  agent instruction files exist. Missing evidence does not require a question.

Exclude dependencies, third-party code and symlink targets outside the repository.
Report the selected mode and its evidence. Setup uses the already installed ai-design
package, whether repository-local or user-global; keep it and other skills at their
actual locations. Global installations and the current agent do not determine the
repository's mode. Setup neither installs nor relocates skills.

### Consolidate agent instructions

For Claude-only repositories, retain the Claude-specific structure and extend
`CLAUDE.md` routing; create a root `CLAUDE.md` if missing. Keep setup's new agent
instructions there, without creating `.agents/` or `AGENTS.md`.

For multiple-agent repositories, use `AGENTS.md` as the canonical instruction file.
At the root and beside every project-owned nested `CLAUDE.md`, merge its contents
into the sibling `AGENTS.md`, then replace `CLAUDE.md` with a relative symlink to
`AGENTS.md`. Create the root pair even when neither file exists. Preserve each file's
directory scope, all unique instructions, invocation order and references; remove
only exact duplicates and mark Claude-specific instructions as applying only to Claude.
Preserve referenced instructions and repair affected links or imports.

When instructions contradict each other, present the conflicting passages and settle
the rule with the user before replacing that file; neither filename wins automatically.
Continue independent connection work. Read and preserve existing symlink contents
before changing links, normalise reverse links without cycles, and leave an already
correct pair intact. Externally linked or unreadable instructions stay unchanged and
are reported as unresolved. Confirm merged contents are saved before replacing a file.

This consolidation is part of ordinary setup authority. Complete when every in-scope
pair preserves its instructions and resolves to its canonical file, or report the
specific pairs blocked by unresolved conflicts or unreadable sources.

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

Preserve existing skills and processes by default under the
[shared responsibility boundary](model.md#authority-and-task-scope):

- **Compatible overlap:** retain the skill and its entrypoint. Connect ai-design to
  its relevant stages through repository instructions, preserving the overall process.
  No replacement proposal or replacement decision is needed, even for fully overlapping
  UI responsibilities. Preserve unrelated and complementary skills too.
- **Concrete conflict:** propose the smallest rule or responsibility-boundary change
  that resolves the evidenced operation; one conflicting rule does not justify removing
  the skill. For example, route authorised shared-component work through craft before
  resuming use. Existing task authority counts; ask only for missing authority or an
  unresolved rule choice. Present the concrete edit using
  [the question format](model.md#questions-to-the-user), batched with independent decisions.
- **Explicit replacement or consolidation request:** first map every responsibility
  to its proposed owner, including triggers, stage order, handoffs, approvals and
  completion checks. Read referenced Markdown resources and scripts; identify what
  survives, changes or is lost before proposing a concrete migration with affected
  files and invocation routes. Apply already supplied authority without repeated
  confirmation, but settle newly discovered losses or uncovered responsibilities
  before removal. Preserve required behaviour and resources at their agreed destinations
  and repair references before deleting anything. A request for automatic codebase
  migration alone does not request skill replacement or consolidation.

Link existing project rules from DESIGN.md at their authoritative locations after
[agent instruction consolidation](#consolidate-agent-instructions); other instruction
transfer requires separately agreed reorganisation. Record unresolved conflicts and
their affected operations in DESIGN.md. Continue independent connection work and block
only dependent actions; retaining a skill or declining a proposed edit does not itself
block connection. With no other repository skills, continue without a reconciliation
question.

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
For documents mixing contracts and process instructions, apply the
[shared model's deferred-move rule](model.md#designmd-and-indexes): link the existing
document and report the deferred reorganisation without blocking independent connection.
Link an existing token catalogue or directly usable definitions without duplicating
it. Record absent token sources explicitly rather than inventing definitions.

Use `design-system/gaps.md` for new journals with [the gap template](../assets/gap-ledger.md).
Link the archive in DESIGN.md, using `design-system/gaps-archive.md` for a new one;
initialise a missing archive with a title and no entries. Existing journals and archives can remain
linked at their current paths. Apply [agent instruction consolidation](#consolidate-agent-instructions)
and extend the selected AGENTS.md or CLAUDE.md invocation
routes within authorised setup scope with a DESIGN.md and `ai-design` pointer and the
[division of responsibilities](model.md#authority-and-task-scope). Keep the project
skill as the overall entrypoint; identify use for selection and reuse in product UI,
craft for contracts and system development, and the results returned to the caller.
Reference the installed package at its actual location; do not invent a repository-local
copy for a globally installed skill.

Complete when DESIGN.md reaches the real sources, indexes and available verification
instructions, and missing capabilities are explicit. Check links from their containing
files; operational paths in DESIGN.md resolve from the repository root.

## Reconcile final documents

Before reporting connection, reread from disk every document created or changed by
setup, plus root DESIGN.md and existing AGENTS.md and CLAUDE.md files in the affected
area, even if setup did not edit them. Do not create absent instruction files for this check.
Compare their contents with the actual project state and completed setup results:
source and skill paths, links, configured commands, project/craft/use responsibilities,
selected agent mode, canonical instruction files and relative symlink targets,
preserved invocation routes and process checks, authoritative rule links and references
affected by agreed moves or replacements. Check links
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
including inspected repository skills, preserved workflows, specialist routing,
any explicitly requested migrations and remaining conflicts.
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
