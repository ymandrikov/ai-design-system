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

## Survey the existing sources

Read repository instructions, existing DESIGN.md or legacy profile, UI libraries,
token definitions, themes, design rules, public usage and verification commands.
Find pages from the code when useful; a user-selected page is not required. Inspect
representative consumers to distinguish actual evidence from naming or popularity.
Report conflicting sources and unresolved normative choices without choosing new
system rules on the owner's behalf. Complete when the available sources and gaps in
project context are known; surveying pages does not authorise their adoption.

## Connect the project

Before migration checks, settle [migration verification](model.md#migration-verification).
Its saved choice governs connection checks and any subsequent migration stages.
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

## Report the connection

Report DESIGN.md, linked sources, created artifacts, unmanaged UI and decisions needed.
If automatic codebase migration was explicitly requested, continue to
[automatic migration](#automatic-migration) after connection. Its startup decisions
and batching apply instead of the gradual-adoption offers and batch-size question.
For a connection-only request, follow the offers below.
Offer two separate next steps through [gradual adoption](adoption.md): migrate
remaining components/layouts and existing patterns with contracts, checks and admission; or analyse their
APIs and consumers for escape-hatch recommendations. Explain that each uses a chosen
batch size and saved progress. A connection-only request ends with these offers;
an explicit request for either step starts its list without renewed permission.
Also mention [automatic migration](#automatic-migration) as an explicit opt-in for completing
the selected scope, with contracts only, repairs, or repairs with escape hatches.
Before processing, follow [batch size selection](adoption.md#choose-the-batch-size).
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
| 1 — Contracts only | Component, layout and existing pattern contracts, indexes, DESIGN.md and supporting links, journals and progress. Runtime code stays unchanged. |
| 2 — Contracts and repairs | Mode 1 plus implementation and affected consumer repairs against authoritative rules within the selected area. Apply ordinary admission checks. |
| 3 — Repairs with escape hatches | Mode 2 plus justified local exceptions, including creating a bounded mechanism when none fits. |

Include any missing [verification choice](model.md#migration-verification) in this
startup round; an earlier setup choice already settles it.
Reuse explicit answers and saved decisions for this migration. If the mode is
missing, ask for it and separately ask whether business-logic changes are allowed,
in one round using [the question format](model.md#questions-to-the-user).
Recommend **mode 3, without business-logic changes**. If mode 2 or 3 is already
chosen, ask only for missing business-logic authority. Mode 1 already excludes such
changes. Explicit delegation to choose permits the recommended combination without
questions; a request for automation alone is not that delegation. Wait for required
answers before dependent edits; the survey and work list can proceed meanwhile.

Business logic includes domain-data validation, permissions, calculations,
persistence, network operations and business-process transitions. Fixing a field's
label may be UI work; changing when its form submits crosses this boundary.
Even when authorised, change business logic only as needed for an evidenced
in-scope repair. Without authority, leave that repair blocked and continue others.

Modes 2 and 3 authorise the necessary craft changes and migration of their affected
product consumers. Inspect all callers before changing a shared API or appearance.
Preserve compatibility with consumers outside the selected area; if this cannot be
done, block the change pending a scope decision. Keep unrelated redesign outside
the migration. New normative rules require authoritative sources or explicit
delegation from the decision owner; observed behaviour alone does not establish a
standard. Record conflicts and unresolved decisions instead of weakening promises.

Complete this step when mode, area, business-logic authority and verification choice
are settled and saved.

### Execute and resume

Complete and link the shared work list before the first batch. Include project-owned
components, layouts and existing patterns; in modes 2 and 3 also list affected
consumer locations and repair dependencies. Pages are consumers, not automatically
new patterns. Group supported bindings and process dependencies first.

Save the mode, area, business-logic decision, verification choice and any delegated
normative authority in `design-system/adoption.md`. Track documentation, admission, repairs and verification
separately, with evidence, exceptions, blockers and the next work. Preserve independent
API-analysis results; using mode 3 does not require a separate analysis campaign.

Use an explicit batch size, otherwise a saved migration size, otherwise choose a
suitable positive size (10 is a starting point). Save it without asking. Automatic
migration authorises every batch: save each item's result and each batch's progress,
then continue without confirmation. Count attempted blocked items toward batch size.
On resume, reconcile sources and saved decisions; recheck only invalidated results.
Revisit blockers only when their missing decision or evidence changes. A mode change
retains prior evidence but reopens obligations newly required by that mode.

For each entity, follow [contract authoring](contract.md) and the applicable
[craft audits](craft.md#edit-and-audit), subject to the saved
[verification choice](model.md#migration-verification). A refusal uses that rule's
admission and completion exceptions in every mode. Otherwise mode 1 uses the rule below.
In modes 2 and 3, complete the needed craft repair before updating its consumers
through [use](use.md); when verification is enabled, verify each stage before proceeding.
Existing authority settles the scope of those
consumer updates; unresolved API defaults or normative decisions remain blockers.
Mode 2 repairs through supported APIs without introducing or applying new exceptions.
Mode 3 first uses supported APIs or repairs the violation. Use an escape hatch only
for an evidenced local need, following [craft's exception rules](craft.md#design-public-apis-and-escape-hatches)
and [exception recording](gaps.md#record-exceptions). Reuse a suitable mechanism;
otherwise create only the bounded mechanism needed. Mode 3 authorises the mechanism,
not a waiver of project approval conditions or behaviour/accessibility guarantees.

### Contracts-only admission

For mode 1, completing a structurally valid contract and index entry for an existing
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

### Complete and report

Stop when every in-scope item has its mode's result or only blocked work remains.
An empty scope is a completed result. Report the mode and area, business-logic
authority, documentation and eligibility, repairs and exceptions, static/behavioural/
visual evidence, and one consolidated list of remaining blockers and decisions.
With verification skipped, apply [migration verification](model.md#migration-verification)
for completion and report the unverified result separately from completed repairs.
With verification enabled, mode 1 documentation may be complete with failed or unverified
runtime promises; report those separately. Modes 2 and 3 remain partially complete while
required repairs or enabled verification are blocked. An exception records a local deviation; close
a gap only under [the existing resolution rules](gaps.md#record-and-resolve).
