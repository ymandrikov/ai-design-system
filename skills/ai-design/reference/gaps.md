# Record a design-system gap

Read [the shared model](model.md) and
DESIGN.md for the journal and archive; the defaults are `design-system/gaps.md` and
`design-system/gaps-archive.md`. Missing project context routes to setup rather
than guessing a different path.

Record systemic missing capabilities, misleading rules, contract drift or a design
reference that conflicts with required rules. This includes token roles and definitions.
Missing request facts and product-specific choices within permitted freedom are not
gaps. A persistent missing verification capability is a tooling gap; a transient
outage is a verification limit.

## Record exceptions

Record every escape-hatch use and design-lint suppression in the journal, including
authorised product-specific exceptions. Capture the source location, end-user need,
actual and expected result, affected rule, reason and evidence, and any required
approval. Link each use to its entry using the project's annotation convention.
Reuse an entry for a shared cause and retain every use location. Ordinary
product-specific fallback within permitted freedom alone needs no entry.
Recording an exception or suppressing a warning does not grant authorisation or
establish a reusable design-system rule. Follow the recording and review procedures
below; an explanation alone does not resolve the underlying limitation.

## Check the basis for choices

When choosing API values, comparing visual variants or extracting shared UI, check
the basis for the affected decisions in applicable public rules. Discovery uses its
[public selection inputs](discovery.md); authoring, refactoring and verification also
inspect directly affected consumers. Extraction includes every consumer being consolidated. This is not a
whole-product audit. Uses are comparable when they serve the same user task under
conditions material to the decision, such as input method or available space for
density. Page names and entity types alone do not justify a difference.

A choice needs an applicable rule, explicitly permitted freedom within a defined
scope, or an authorised exception. Missing, ambiguous or contradictory guidance is
a system gap, including unclear conditions for allowing differences. When the rule
exists but a material fact of the request is unknown, ask for that fact instead.
Permitted freedom needs no approval for each individual choice.

Existing calls, API value lists and individual mockups demonstrate use; they do not
alone establish permission to vary. When creating or changing a normative rule,
identify a pre-existing authoritative source or an explicit decision. A rule
just written from observed implementation cannot independently justify that same
implementation. Inspect the prior rule when replacing it; record an unsupported
replacement as drift rather than claiming that no rule ever existed.

During refactoring, existing appearance may remain as temporary compatibility with
an explicit link to the open gap, not as a newly established standard. New uses
follow the applicable standard or permitted freedom. If neither provides a basis,
prepare a concrete proposal and obtain the decision before implementing the
dependent part; independent work can continue. Recording a gap grants no exception.

Resolve a choice gap only after establishing the standard, selection conditions or
explicitly permitted freedom and verifying affected contracts and consumers against
that decision. Adding a prop, documenting current calls or passing technical tests
alone does not establish the missing basis.

## Assess resolvability

Assessment records the least design-system intervention needed to fulfil the original
Expected result. It applies to components, layouts, patterns, tokens, rules and tooling;
it does not measure priority, value, effort or diff size. Split independent causes
before assessing; categories do not determine the level.

Use the first level whose complete conditions are proven:

- **A — Autonomous resolution.** Conflict-free authoritative sources determine one
  result, and a reproducible verification path exists in the supported agent
  environment. Resolution requires no new or changed shared capability, public API,
  semantic intent, token or visual rule, interaction or accessibility model, contract
  semantics, or discovery/verification infrastructure. Cite the source and verification
  path. Normal review and merge gates do not disqualify A.
- **B — Bounded clarification.** A is not proven only because existing behaviour is
  missing from the evidence, ambiguous or contradictory. State one concrete question
  to the system owner whose answer makes resolution deterministic while preserving
  existing capabilities and promises. An editorial clarification can be B; creating
  a new rule or changing a promise is C even if one question settles it.
- **C — System change or insufficient evidence.** Resolution requires a shared change
  excluded by A, or B cannot be proven. State which basis applies: a demonstrated
  required change, or the missing evidence preventing proof of A/B.

Record `Assessment: <level> — <evidence-based reason>` for every new gap. Evaluate
against the original Expected result; narrowing it cannot justify a lower level.
Assess the standard supported environment: a transient outage is a verification
limit and does not change the level; persistently missing tooling is a separate gap.

Add or update assessments on existing entries only within scoped triage or repair,
as evidence changes; no journal-wide backfill is required. An assessment grants no
repair authority and does not expand scope to unrelated entries or their underlying
code. Priority remains governed by [triage](triage.md#recommend-the-next-work).

## Record and resolve

Reuse a matching open entry or add one per independent cause. Preserve the request,
actual result, original Expected result and reproducible evidence: source paths,
deciding clauses, failed checks or measurements. State what must become possible,
including discoverability when needed. Categories are optional. A matching Purpose
sentence alone does not demonstrate resolution.

Record without asking. After saving, report each added or supplemented gap to the
user with its exact journal heading and a clickable `path:line` link. Use the
heading's 1-based line number verified in the saved journal after all edits. For
multiple gaps, use one list item per entry.

Recording neither blocks product work nor authorises repairs. Hand system work to
the separate [craft workflow](craft.md),
which requires authorised design-system scope. Internal component and business-logic
repairs belong to project development; retain their contract drift until the original
expectation is demonstrated. Craft archives an in-scope entry as Resolved
only after proving its original expectation, including admission when required.

For reviewing existing entries, merging duplicates, dismissing erroneous records
or recognising already-resolved gaps, follow [triage](triage.md). Journal cleanup
does not repair the system or authorise a rule change.

## Archive an entry

Every entry leaving the open journal moves in full to the archive named in DESIGN.md.
Preserve its source, original expectation, evidence and original date when present.
Set Status and add Closed date (`YYYY-MM-DD`) with the disposition's basis:

| Status | Required basis |
| --- | --- |
| Resolved | Resolution and Verified by: what changed or already fulfils the expectation, with reproducible verification evidence. |
| Dismissed | Reason: evidence that the record is not a system gap; dismissal does not mean a repair. |
| Merged | Merged into: a link to the retained entry, and the shared cause justifying the merge. |

For a merge, preserve all sources and expectations in the retained open entry before
archiving the duplicate's original record. Keep entry and evidence links valid when
moving records. Preserve existing archive entries outside cleanup; create a missing archive with a
title when first needed. Remove the open entry only after its archive record is saved,
then report the disposition and evidence. Retain uncertain entries in the open journal.

After adding archive entries, count the archive's lines with a local command without
loading its contents into context. At 500 or more lines, follow
[archive cleanup](archive-cleanup.md), including when called from craft.
