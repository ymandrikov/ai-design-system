# Gradual adoption and API analysis

Enter from [setup](setup.md) when a proposed next step is accepted, or from
[craft](craft.md) for an explicit contract migration or escape-hatch analysis request.
Migration delivers contracts, checks and admission; API analysis delivers
recommendations independently of contract readiness. Honour an explicitly narrower
scope, such as documentation only. Selecting one step does not start the other.
Before migration checks, settle [migration verification](model.md#migration-verification)
alongside any missing batch-size decision. Reuse the choice from setup or saved progress.
For explicitly requested automatic codebase migration, use [setup’s automatic migration stage](setup.md#automatic-migration):
it reuses this work list but owns mode selection, automatic batches and completion.

## Save the work list

Inspect source exports, implementations and consumers to enumerate all project-owned
reusable components, layouts and existing patterns in scope, including wrappers around dependencies.
Exclude private implementation details, pages and unwrapped third-party components;
record ambiguous candidates with the classification question still open. Group
bindings of the same entity together and order dependencies before their consumers.

Create or update `design-system/adoption.md` and link it from DESIGN.md. Use a compact
checklist or table with each entity's kind, source paths, contract link when present,
and separate migration and API-analysis progress. Record recommendations, evidence,
blockers and the next batch there. Preserve existing contract lifecycle statuses when
updating the list. The work list does not grant eligibility;
contract metadata and indexes remain authoritative.
Keep this execution state while work remains; apply
[completion cleanup](setup.md#clean-up-completed-work) after the selected scope's
final checks, preserving independent unfinished work and transferring lasting results.

Complete the list before starting the first batch. On continuation, read saved
progress and reconcile source changes, preserving prior results. An empty list is
a valid result; report it without inventing entities or work.

## Choose the batch size

After saving a nonempty work list, show its scope and remaining count. Use an explicit
requested size, otherwise reuse the saved size for the selected step. If neither
exists, ask once using the [question format](model.md#questions-to-the-user): offer
5 or 10 entities, recommend 10, and accept any other positive integer. Wait for the
answer before processing the first batch. Explicit delegation to choose the size
allows choosing it without a question. An empty or completed list needs no size choice.

Save the selected size in `design-system/adoption.md` separately for migration and
API analysis. Reuse it on continuation until the user changes it; a new explicit
size replaces the saved value. Permission to finish all batches controls continuation,
not size selection.

## Run a batch

Process one batch up to the selected size for the selected step.
Count attempted entities, including blocked ones, toward the limit.
Save each result and leave blocked items unfinished with a reason. Continue independent
items within the batch; revisit a blocker when its missing decision or evidence changes.

After one batch, report completed work, blockers and remaining work, then wait for
continuation. An explicit request to finish everything authorises successive batches
without repeated confirmation; save progress after each. Stop when the selected step
is complete or only blocked work remains. Requesting contracts for all entities sets
the list's scope; it alone does not override the one-batch default. When the entire
selected step is complete, apply [completion cleanup](setup.md#clean-up-completed-work)
before its final report; an intermediate batch or blocked stop retains resume materials.

## Migrate contracts and admit

Apply the saved [verification choice](model.md#migration-verification): a refusal
skips audits and admits documented implemented entities with an unverified result.
For migration accepted within setup, save that origin and follow
[setup discovery](setup.md#discovery-during-setup-migration), including on resume,
for whole-set timing, admission and completion. Also apply
[setup delegation](setup-delegation.md), including its final review before completing
the selected migration scope. Otherwise the check-based admission
and completion requirements below apply when checks are enabled.

For each migration item, follow [craft](craft.md#edit-and-audit) to author or complete
its contract and index entry and run the applicable audits. A request for this migration,
including acceptance of the setup offer, includes admission authority for entities
that pass, subject to project policy and any explicitly narrower request; reuse that
authority for each batch.
It does not settle new normative choices or authorise unrelated implementation changes.

Mark migration complete only when the contract and applicable checks are complete
and the entity is `discoverable`. Newly adopted entities with failed or unavailable
evidence remain `hidden`; record what prevents completion. Preserve existing eligibility
during document moves, and handle existing defects through craft. For an explicit
documentation-only request, track document completion separately from admission.

## Analyse APIs and escape hatches

For each analysis item, inspect the public API and actual consumers against
[craft's API and escape-hatch rules](craft.md#design-public-apis-and-escape-hatches).
Look for concrete local needs and unrestricted styling or composition overrides
that bypass established rules, including className, style and slots where applicable.
An override's existence alone does not establish a violation; identify the affected
rule or record the missing basis through [gaps](gaps.md#check-the-basis-for-choices).

Recommend a supported public API for recurring needs. For local exceptions, propose
reuse of the project's exception mechanism, a mandatory non-empty reason, permitted
deviations and approval conditions, preserving behaviour and accessibility guarantees.
Show actual use locations, the need, affected rules and impact on existing calls.
Save recommendations in the work list and link systemic findings to the gap journal;
an evidenced finding that no change is needed also completes analysis of an item.
Record unavailable evidence as unfinished analysis with a reason.

Complete an analysis item when its findings are supported by saved evidence. Implementation
of recommendations is a separate craft step requiring that scope; analysis alone
does not change APIs, consumers or contract promises.
