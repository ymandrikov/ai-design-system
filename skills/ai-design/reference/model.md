# Design-system project boundary

Read this and [the canonical domain glossary](CONTEXT.md) once when entering any
framework workflow. DESIGN.md maps canonical terms to the project's names;
their responsibilities stay the same. Existing instructions using `entity` mean
**UI entity**, with managed status determined separately. Existing `user task`
wording means an end-user task; a component that `owns` a property has a
**Responsibility**. Token indexes lead to token definitions; they do not inherit UI contract formats or eligibility statuses.

## DESIGN.md and indexes

Read `DESIGN.md` at the target repository root. It explains design intent and shared
rules, and links UI indexes, token definitions, themes, public usage, verification
instructions. Operational paths in it resolve from that root; ordinary Markdown
links resolve relative to their containing file. Missing connections for existing
sources route to [setup](setup.md). For a new system, [craft](craft.md) establishes
the requested decisions and sources, then uses setup to connect them.

New and connected projects use this contract structure:

```text
design-system/
  components/          # component contracts only
  layouts/             # layout contracts only
  COMPONENTS.md         # component index
  LAYOUTS.md            # layout index
  PATTERNS.md           # contents and full pattern descriptions
```

Each component/layout has one Markdown contract in its group directory. Its
frontmatter owns the stable id, status and code/evidence paths; see [formats](formats.md).
The two indexes contain display names, Purpose descriptions sufficient for candidate
discovery (see [formats](formats.md#shared-selection-sections)) and Contract links.
Read identity and eligibility from the linked contract, not the index label. Layouts
appear only in LAYOUTS.md. PATTERNS.md contains one section per pattern with an id,
status and stable anchor; links target that section. IDs are unique across all three
groups. Empty indexes and a PATTERNS.md with only its title are valid.

Setup moves existing UI contracts and indexes into this structure and merges pattern
contracts into PATTERNS.md, updating incoming links and relative references. Code,
styles, tests, token catalogues and other existing sources keep their project paths.
A contract id does not determine code paths or exports. Patterns can describe recipes
without implementation files. New gap journals also live under design-system/.
The ai-design package installs in `.agents/skills/ai-design/`; root AGENTS.md points
to DESIGN.md and the two workflows.

## UI eligibility and gradual adoption

| State | New product use |
| --- | --- |
| discoverable | Eligible for comparison by contract. Verify actual implementation before claiming completion. |
| hidden | Managed but not admitted; excluded from new selection and fallback. |
| deprecated | Excluded from new selection and fallback. Preserve existing calls outside the task; follow documented migration guidance within it. |
| unmanaged | No component/layout index entry or pattern section. Product build may inspect code/tests/consumers as a fallback after managed discovery finds no fit; report limited verification. This does not adopt it. |

Malformed entries, missing contracts and contradictory guidance are system defects,
not unmanaged escape routes. Unknown status is excluded. Discovery lists only eligible
candidates; an explicit request for an excluded entity gets a separate availability
explanation. Quoting the word "toggle" in a rejection is not selecting an unmanaged Toggle.

[Automatic migration in modes 1 and 3](setup.md#admission-without-repairs) and
[migration without verification](#migration-verification) admit documented
existing entities with recorded defects or verification limits. `discoverable`
permits comparison; it does not certify runtime promises. Read linked limitations
when selecting and verify the promises required by the consuming interface.

## Token scope

The design-system token source and index describe tokens available to consumers.
Private component details remain with the component and are outside the token index
and discovery. Components may use shared design tokens internally; that use does not
expose an override unless their contract permits one.

## Authority and task scope

Contracts state intended valid use; implementation and tests establish actual behaviour.
A mismatch is a defect, not permission to weaken the contract. A design reference
cannot silently override a required contract rule. Use a documented exception when
its conditions hold; otherwise ask the user to resolve the conflict.

The [use workflow](use.md) owns product interfaces and required surrounding
relationships through public APIs. The [craft workflow](craft.md) owns reusable
component implementation, contracts, indexes, design rules and tokens, using the
project's development process. A system gap is a handoff between these responsibilities,
not permission for use to change the system. When both workflows are authorised in
one task, complete the needed craft work and its checks before resuming use.
Preserve independent legacy violations and unrelated gaps; report them separately,
subject to the [contrast scope](verify.md#contrast-scope) exception.
Honour explicit scope and decisions already given in the current task.

## Migration verification

For automatic migration, gradual contract adoption and contract moves during setup,
settle verification before the first check, including connection/link validation.
Inspect sources and configured commands first. Explain the applicable structural/link,
contract/selection, test/build, behavioural/browser and visual checks, including
required independent gates and unavailable capabilities. Offer to run or skip
verification, recommend running it, and wait for the user's choice. Batch this with
other missing startup decisions using [the question format](#questions-to-the-user).
Surveying sources and saving the work list can proceed meanwhile.

Reuse an explicit choice or the saved choice for this migration without asking again.
Save it in `design-system/adoption.md` with the migration progress; an explicit new
choice replaces it. Automation or delegation of mode/batch size alone does not decide
verification. A saved refusal also applies on resume and after a mode change.

An explicit request to skip testing or verification takes precedence over check
requirements throughout setup, adoption, craft, use and their supporting procedures,
in every migration mode. With that choice, read sources, tests and consumers to
understand and perform the work, but skip all verification: tests, builds, structural
and link validators, contract/selection audits, browser/visual checks and independent
gates. Do not run checks under another name or require them for completion.

Keep the selected scope, including authorised implementation and consumer repairs,
escape hatches, contracts, indexes, supporting documents, links and progress. A refusal
does not change the selected mode's repair, scope or exception authority.
Make newly documented implemented entities `discoverable` immediately;
preserve existing `deprecated` status and keep unimplemented drafts hidden. This
exception overrides evidence-gated admission and structural-validation prerequisites.

Record skipped checks as `unverified — skipped by user choice` in progress and reports,
and link limitations from the affected contracts. Preserve earlier evidence with its
scope; changed promises are not covered by stale results. Work may finish with
verification explicitly unverified; skipped checks alone are not blockers. Keep real
unresolved decisions and unfinished repairs explicit, and leave gaps requiring proof
open. Report that the user accepted the risk of nonworking code by choosing migration
without verification; `discoverable` and completed work do not certify correctness.

## Questions to the user

Across all ai-design procedures, use the host's available question/ask-user tool
when permitted in the current mode. Use its native fields for the question, options,
consequences and recommendation. Use the user's language without emoji.
If no permitted question tool can present all required options, ask in a separate conversation message
using this format, including for a single question:

```markdown
**Q1 — Short title:** Question and necessary context.

- **A. Option** — consequences.
- **B. Option** — consequences.

**Recommendation:** A — brief rationale.
```

Offer at least two meaningful options and recommend one explicitly. Allow a custom
answer. For an unknown fact, explain the decision it affects and offer ways forward
(such as supplying the fact or delegating a proposed decision), not invented facts.
Delegation can authorise a new decision; it does not establish an unknown fact.
Investigate facts available from sources before asking.

Batch all currently independent questions together within the tool's limits; in
text, separate them with `---`. Continue question numbering across rounds in the
discussion. Wait for prerequisite answers
before asking dependent questions; continue independent authorised work meanwhile.
This format creates no requirement for an interview or repeated confirmation when
the task is clear and authorised. Silence is not an answer or delegation.

## Reports

Report decisions, material assumptions and evidence clearly. Labels shown by the
workflow procedures are convenient examples; equivalent prose or tables are valid
for reports. User questions follow the format above.
Do not manufacture fields, alternatives or explanations just to fill a template.
Free-form reports do not change the fixed contract format within each entity group,
the project's public APIs, or its required composition rules.
