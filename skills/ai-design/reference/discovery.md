# Discover UI and tokens

This invocation ends by returning a selection decision in the conversation. For a
request to add or build UI, describe the intended composition and return to the
caller; implementation is the caller's next task, not a second phase of discovery.
The caller also owns pending questions, saving results and recording gaps.
Use only read/search operations. Never create, modify or delete files, including
temporary files, reports, logs and tests, through any tool or delegated agent.

Compare contracts, then choose. An omitted fact is unknown, not false.
Read [the shared vocabulary and project rules](model.md) once per
conversation, then root DESIGN.md and any supplied design reference. Without the
required context, report what is missing and return [setup](setup.md) to the caller.

## Start at the affected level

For a new screen, read PATTERNS.md first, then the layouts and components
needed by viable patterns. Compare candidates at each level. For a local change,
read the containing composition's constraints and start at the affected level.
Split meaningful controls, layout containers and semantic surfaces into elements.
Fixed parts owned by a selected contract need contract validation, not separate
choices. Regions whose implementation the consumer chooses do need discovery.

When no pattern fits, continue layout/component discovery using the request and
existing product structure. Report the uncovered pattern only when relevant.
Reconsider an outer choice when no allowed inner composition can fulfil it.
For token-only requests, start at token selection below. For compositions, identify
consumer-controlled visual decisions alongside UI choices. Complete when every
requested element, inherited obligation and affected token role is accounted for.

## Find candidates

Read the relevant indexes or PATTERNS.md contents. For each entry whose Purpose
covers the task or a broader category, follow its Contract link and read the
frontmatter to establish id and status. Pattern sections supply their own id/status.
Shortlist only discoverable entities, including eligible entities named by the request,
widget/context language or shortlisted contracts. Read every shortlisted contract or
pattern section in full, including linked composition obligations. The index summary
routes; it does not add requirements, metadata authority or visual values.

Read linked known defects and verification limits as well. A discoverable entity
admitted through migration may have unverified or failing promises.
If a known defect prevents the requested result, report it and seek a working
alternative; missing evidence requires verification by the caller, not an assumed pass.

Keep a candidate when its purpose covers the task, no explicitly applicable
When-not-to-use clause rejects it, and its API/Structure and required composition
can express the stated request. An explicit conflict with a required When-to-use
condition rejects it. Unknown facts leave a conditional candidate, not a rejection.

Code does not grant managed eligibility. Hidden/deprecated entities stay out of
Candidates and Choice, including through pattern dependencies. Missing/broken
contracts are defects. An explicit request for an excluded entity gets a separate
availability explanation; do not disguise it as unmanaged fallback.

## Rank and decide

Prefer, in order: exact task over broad category; stated means/context over an
assumption; fewer material assumptions. Compare the contracts of all contenders
before choosing; never lock an id from a summary alone.

State assumptions that affect the choice. Ask whether the missing fact could change
the selected composition's validity, required parts or material behaviour. If that
choice works for every possible answer, choose it now; an alternative's unknown
eligibility does not block it. State any preference assumption and continue.
If the selected composition depends on the answer, return a provisional choice
and a distinguishing Question before implementation. A single conditional candidate
can require a question without an Alternative.
If conflicting contracts need a new normative rule, identify the owner decision.
A design reference that contradicts a required rule needs that decision unless a
documented exception applies. A reference selecting a valid preference needs none.

For API values and visual variants, check the
[basis for choices](gaps.md#check-the-basis-for-choices).
Return a missing or conflicting basis to the caller for gap recording and any required
owner decision; discovery remains read-only. An accepted value alone does not settle
the choice.

Return `nothing fits` only when no eligible candidate can cover the element.
Complete when each choice has its basis, assumptions and any required decision.

## Select tokens for consumer decisions

Read DESIGN.md's design rules and token catalogue or definitions. Select by intended
role, type, scope, theme and usage constraints, not name resemblance or equal values.
Follow aliases to authoritative values and theme overrides without erasing the role
of the selected token. Base tokens and semantic tokens need not form mandatory tiers.
An existing source may serve as the token index; UI statuses and contract formats do
not apply to token definitions.

Choose tokens only for consumer-controlled properties or settings exposed by a UI
contract. A component's use of a shared token does not grant an override. For owned
spacing, for example, use the contract's supported setting rather than injecting a
raw gap or private component variable. Fixed internal values need no separate choice.

Apply required rules and documented exceptions. A missing fact that changes validity
or the resolved theme choice requires a question; state harmless preferences and
continue. If a needed role/definition is absent, report that limitation and return the
system extension to [craft](craft.md) through the caller. Do not invent a token or silently
substitute an equal-valued token with a different role. Complete when each affected
consumer decision has a valid token/setting, or an explicit limitation or question.

## Result

Make the choice for each requested need unambiguous: identify the component, layout
or pattern, and any selected token/setting with its source, or explain what is missing.
State material conditions and questions needed before implementation. Prose, a table
or labelled fields are all suitable.

Compare shortlisted contracts during discovery, but list all candidates only when
the request asks for comparison. A valid choice need not name every runner-up. Brief
reasons and references to an already explained clause suffice; do not invent a
restriction to justify a choice or rejection. Omit irrelevant alternatives rather
than manufacturing them. The meaning matters, not field names or block counts.

The [use workflow](use.md) may inspect unmanaged code after `nothing fits`; that
fallback remains separate from the managed Candidates and Choice.
