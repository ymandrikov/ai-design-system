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
the basis for the affected decisions. Inspect applicable rules and directly affected
consumers; extraction includes every consumer being consolidated. This is not a
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

## Record and resolve

Reuse a matching open entry or add one per independent cause. Preserve the request,
actual result, original Expected result and reproducible evidence: source paths,
deciding clauses, failed checks or measurements. State what must become possible,
including discoverability when needed. Categories are optional. A matching Purpose
sentence alone does not demonstrate resolution.

Record without asking and report the gap. Recording neither blocks product work nor
authorises repairs. Hand system work to the separate [craft workflow](craft.md),
which requires authorised system scope. Craft archives an in-scope entry as Resolved
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
