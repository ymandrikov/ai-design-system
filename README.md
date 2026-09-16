# ai-design-system

An embeddable framework for organising and maintaining consistent design systems
consumed by coding agents. Agents describe, choose and compose components, layouts
and page patterns through contracts, with checks that prevent drift over time.
The project keeps its code, bindings, styles and tools; root DESIGN.md connects them.

Read [CONTEXT.md](CONTEXT.md) when discussing or changing domain terms. It is the
canonical glossary, exposed at the repository root by a symlink to the copy packaged
with `design-system`. [Project boundary rules](skills/design-system/reference/model.md)
describe how those terms map to project artifacts and workflows.

The framework governs design-system contracts, selection, reuse, checks, lifecycle,
setup and migration procedures. It can change CSS, markup and public design settings,
including related consumer presentation within scope. Component internals, business
logic, application architecture and source-file organisation remain project-owned.
Engineering checks follow the project's established procedures; the framework defines
the design-system outcomes they must establish. See the
[responsibilities and design-only boundary](skills/design-system/reference/model.md#responsibilities).

## Installation

You need Node.js with npm, Git, and a coding agent that supports skills.
From the root of the project where you want to use the skill, run:

```sh
npx skills add ymandrikov/ai-design-system --skill design-system
```

Select your coding agent in the installer. Installation is project-local by default;
add `--global` to make the skill available across your projects. See the
[skills CLI](https://github.com/vercel-labs/skills) for supported agents and options.

Then ask your agent to connect an existing design system:

```text
Use design-system setup to connect this project's design system.
```

If the project does not have a design system yet, ask `design-system craft` to create
one. See [Connect a project](#connect-a-project) for the resulting structure.

## Workflows

The single [design-system skill](skills/design-system/SKILL.md) routes to two workflows:

- `design-system use` discovers an appropriate composition, implements product
  UI through public APIs and verifies the affected relationships and behaviour.
- `design-system craft` develops and maintains reusable components, layouts, patterns,
  contracts, rules and tokens, and verifies readiness for new selection. It follows
  the project's implementation conventions and can create a system from scratch.

Craft's [proposal discussion](skills/design-system/reference/component-proposal.md)
turns a need and optional mockup into a component, layout or pattern proposal. Users can accept,
amend or delegate choices; questions focus on material decisions still needing input.

Choose `craft` or `use` explicitly, or describe the result and let the entrypoint
route it. A page request permits product work and suitable local fallbacks. A system
gap is handed off to craft; it does not authorise shared component or rule changes.
When both workflows are authorised, complete the needed craft work and checks before
resuming use, then check the resulting composition: **craft → checks → use → checks**.
Explicit migration exceptions remain visible in the evidence. A gap record alone
does not permit another independent shared variant; choose an extension, a justified
new entity or a bounded exception. Local composition within existing contracts is valid.

`design-system improve`, `analyze`, `setup`, `migrate`, `discovery`, `verify`, `gaps`
and `triage` reach internal procedures for bounded system improvement, codebase
analysis, initial connection, migration,
selection, review, gap recording and journal triage. Equivalent natural language requests
also work. Standalone discovery stays read-only; selection and review end at their
own result. All procedures are Markdown references loaded when needed, with one
`SKILL.md`, shared templates and the existing contract checker:

```text
skills/design-system/
  SKILL.md
  reference/
    craft.md
    use.md
    improve.md
    analyze.md
    discovery.md
    setup.md
    migrate.md
    adoption.md
    admission.md
    completion.md
    delegation.md
    blind-gates.md
    formats.md
    verify.md
    gaps.md
    triage.md
    ... shared model, contract and token procedures
  assets/
  scripts/
```

These links have three distinct meanings. A rule link means the current procedure
reads shared instructions. A call means it runs another procedure now and returns to
the caller. A handoff stops the current procedure and reports work for a separately
authorised workflow. Routes use direct Markdown links; there is no procedure registry
or runtime marker.

## Add external components

When an agent adds external component sources locally, for example through shadcn,
it also creates their contracts and updates indexes in the same task. After a manual
addition, ask the agent to add those components to the design system. This covers
local sources and project-owned wrappers, not direct library imports.

[External-component adoption](skills/design-system/reference/craft.md#adopt-locally-added-external-components)
includes public supporting entities, groups compound parts in their parent's contract,
and updates contracts for changed sources. Components become discoverable immediately;
checks follow and record defects without hiding them. An indistinguishable duplicate
stays hidden until the primary component is chosen. Missing design rules are discussed;
contract generation does not authorise runtime repairs or consumer migration.

## Improve an existing design system

Ask `design-system improve` to survey the existing system without changing files
and present findings in the conversation. An unspecified scope covers the whole
system; name a component, package or area to narrow it. The
[improve procedure](skills/design-system/reference/improve.md) then offers one choice
for the whole result: save it in `design-system/improvements.md` or implement the
improvements. It waits for that choice before writing files or fixing issues.

Implementation covers system presentation, composition and documentation, including
related consumer CSS, markup and public design settings within scope. It preserves
component internals and business logic, including when defective. Changes requiring
excluded logic or out-of-scope consumers remain proposals. New rules, public
capabilities, contract-semantic changes and breaking changes require design decisions
before dependent edits; the implementation choice does not lift these boundaries.

After implementation, run applicable checks and return results in the conversation.
Update system documentation required by the changes; save a separate improvements
report only on explicit request. Existing reports inform later surveys, with saved
progress checked against current sources and decisions preserved. Each run covers
one survey pass without restarting after fixes. Zero findings is valid; incomplete
coverage, deferred work and verification limits remain explicit.

## Analyze reusable UI candidates

Ask `design-system analyze` to find component, layout and pattern candidates across the
project’s UI, or name an area to limit the analysis. It checks the artifacts and
indexes under `design-system/`. Missing indexes stop affected analysis and are
returned to the caller for restoration outside the framework; they do not invoke
setup. Missing DESIGN.md alone does not block analysis. Empty index groups are valid.

The [analysis procedure](skills/design-system/reference/analyze.md) compares repeated
fragments and local entities with existing capabilities, recommending reuse, extension,
adoption, extraction or keeping code local. Candidates need an evidenced shared or
independent responsibility; patterns additionally need a shared end-user task and
composition rules. Similar appearance alone is insufficient.

Results and progress live in `design-system/analysis.md`, with prioritized proposals,
source and consumer evidence, boundaries, differences, benefits, risks and coverage.
Analysis continues through the selected area without batch pauses, checking shared
alternatives and relevant consumers outside it. Runtime checks are used when needed
to substantiate a conclusion; unavailable evidence stays explicit. A partial survey
is reported as partial, and finding no candidates is valid.

Repeat runs update the same report, preserve decisions, mark implemented proposals
with evidence and reconsider rejections only when their basis changes. Findings outside
a scoped rerun remain marked as not rechecked. Analysis does not implement proposals
or change contracts and indexes; only evidenced systemic shortfalls enter the gap
journal. Selected proposals can proceed through craft and product reuse through use.

## Connect a project

Ask `design-system setup` explicitly for the project's initial connection. Setup is a
one-time bootstrap: it can resume an unfinished connection, but completed setup is
never invoked or read by craft, use, migrate or another work procedure. It can
discover and inspect pages automatically; no selected page, adoption or demonstration
is required. Setup-specific instructions live entirely in `setup.md`; the entrypoint
only routes explicit connection requests there. Its entry guard returns an existing
result on a repeat request. Shared rules and procedures contain no setup instructions.
Before changes, setup identifies Claude-only repositories; evidence of other agents
or an unknown mode selects the shared AGENTS.md convention. Shared setup merges
project-owned CLAUDE.md files into sibling AGENTS.md files and leaves relative
CLAUDE.md symlinks, including in nested packages. A clean repository gets a root pair.
Conflicting instructions require a decision before replacing the affected file.
Claude-only projects retain their Claude-specific structure. Setup uses skills already
installed in the repository or globally, without installing or moving them.
See [agent mode and consolidation](skills/design-system/reference/setup.md#determine-the-agent-mode).
During setup it also analyses skills inside the repository for overlapping functions
and conflicts with design-system. Existing skills keep their entrypoints and overall
processes; AGENTS.md or CLAUDE.md routes contract and design-system work, including
component/layout/pattern selection and reuse, through design-system. Compatible overlap
requires no replacement decision. Concrete conflicts lead to minimal rule or boundary
edits; unresolved conflicts block only dependent actions. Replacement or consolidation
requires an explicit request and a prior mapping of responsibilities, workflow and
losses. Apart from agent instruction consolidation, existing project rules stay at
their sources, linked from DESIGN.md, unless their reorganisation is separately
agreed. See [skill reconciliation](skills/design-system/reference/setup.md#reconcile-repository-skills).

Setup completes and reconciles the connection before it asks "What next?" with four
explicit options in order:

- **A. Automatic migration (recommended)** — complete the selected scope across all
  batches with saved progress and no repeated confirmation.
- **B. Gradual adoption** — add contracts, run checks and admit existing entities,
  pausing after each batch for continuation.
- **C. API and consumer analysis** — save escape-hatch recommendations without
  implementing them.
- **D. Stop here** — keep the completed connection.

Choosing A leads to the migration-mode choice below, recommending mode 1; it does
not select a mode automatically. It hands off to the standalone `migrate` procedure
after connection; later migration failure or interruption never reopens setup. Already
supplied mode and verification decisions are reused, and the agent chooses an
unspecified batch size itself.
For B, setup saves admission after ordinary audits and structural checks. Independent
discovery is required only by an explicit request or project policy, after the whole
selected scope is ready; these conditions persist on resume
without an origin label. For B and C, the shared work list in `design-system/adoption.md` saves independent
progress and batch sizes. After listing the scope, the agent asks for a batch size
unless already supplied, saved or delegated: 5 or 10 (recommended), or another positive integer.
Ask to continue for the next batch, change the batch size, or explicitly request
completion of every batch. See [gradual adoption](skills/design-system/reference/adoption.md).

## Migrate a connected project

`design-system migrate` owns automatic migration for a connected project, including a
later request and resuming saved work. It uses concrete saved scope, admission and
verification decisions without connection history. Select an area or the whole codebase:

| Mode | Result |
| --- | --- |
| 1 — Contracts and escape hatches (recommended) | Document existing entities and connect bounded local exceptions while preserving appearance and observable behaviour; no standalone repairs. |
| 2 — Contracts, escape hatches and design repairs | Also repair CSS, markup and public design settings in components and related consumers. Preserve component internals and business logic. |
| 3 — Contracts only | Contracts for components, layouts and existing patterns, indexes and DESIGN.md; runtime code stays unchanged. |

The agent asks for the missing mode, recommending **mode 1**. The mode settles
design-repair scope; all modes preserve internal component and business logic. Explicit delegation permits the
recommended choice without questions. Already supplied decisions are reused. For example:

```text
Use design-system migrate to automatically migrate the whole codebase in mode 1.
```

Before any migration checks, including connection link validation when migration
immediately follows initial setup, the agent explains
the applicable checks and waits for a run-or-skip choice alongside other startup
decisions. An explicit or saved choice is reused across batches and resumptions.
Skipping testing or verification applies in every mode, including gradual adoption:
checks and evidence-gated admission are skipped except mandatory
[document reconciliation](skills/design-system/reference/completion.md#reconcile-final-documents),
while authorised code repairs and documentation continue. Before reporting connection
or migration results,
the agent rereads all created or changed documents, DESIGN.md, AGENTS.md and existing
CLAUDE.md files in the affected area and reconciles them with the actual project and
migration or connection results. Factual mismatches are corrected; unresolved rule
conflicts are reported.
Documented implemented entities become `discoverable`, retaining existing `deprecated`
status. Results are explicitly unverified, and the user accepts the risk of nonworking
code. See [migration verification](skills/design-system/reference/admission.md#migration-verification).

The agent chooses an unspecified batch size, saves progress in `design-system/adoption.md`
and continues through all batches without repeated confirmation. Blocked items remain
explicit while independent work proceeds. New design rules need authoritative sources
or delegated decision authority. Modes 1 and 2 can reuse or create a bounded escape
hatch for a concrete need, preserving project exception-approval conditions.
See [automatic migration](skills/design-system/reference/migrate.md) for scope and completion.

After the selected connection or migration scope and its final checks are complete, the
agent [removes execution-only artifacts](skills/design-system/reference/completion.md#clean-up-completed-work)
before reporting: completed plans, temporary copies, one-off scripts and fully
superseded files. Lasting rules, decisions, limitations and existing project references remain
reachable; unfinished work retains its continuation state. No separate setup-history
archive is created, and paused or blocked work keeps its execution materials.

Automatic migration in modes 1 and 3 makes documented existing entities `discoverable`, retaining
`deprecated` status where already set. Known defects and unverified promises are linked
from contracts and considered during selection. Documentation completion and runtime
verification are separate results; availability does not certify correctness.
Defects outside those modes' repair authority do not block documentation completion.
Mode 1 still requires completing its exception changes; mode 2 remains partially
complete while required repairs or enabled verification are blocked.

[Admission and check timing](skills/design-system/reference/admission.md#select-the-applicable-policy)
is shared by craft, adoption and migrate. Ordinary craft and gradual adoption without
saved whole-set conditions run strict checks for each batch before admission. Every
automatic migration, and gradual adoption whose authorised plan records whole-set
conditions, first admits complete existing contracts after ordinary audits and
structural checks. Independent discovery runs after the selected set is ready only
when explicitly requested or required by project policy.
These concrete conditions persist on resume. Modes 1 and 3 may document runtime
limits, while mode 2 must complete its authorised repairs.

Missing project context does not call setup. Context restoration belongs outside the
framework: the affected procedure stops and returns the exact missing facts to its
caller. Analyze remains available without root DESIGN.md when the required indexes
are present. Crafting a new system from scratch can establish design intent from
authoritative sources and explicit decisions; it cannot call setup. An initial
connection still requires an explicit setup request.

[The DESIGN.md template](skills/design-system/assets/DESIGN.md) connects
visual intent, shared rules, tokens, indexes, public usage and verification:

```text
<repo_root>/
  design-system/
    components/
      button.md
    layouts/
      stack.md
    patterns/
      settings-page.md
    COMPONENTS.md
    LAYOUTS.md
    PATTERNS.md
    gaps.md
    gaps-archive.md
  AGENTS.md
  CLAUDE.md -> AGENTS.md
  DESIGN.md
```

Component, layout and pattern contracts each live in their respective design-system
directories, one entity per file. COMPONENTS.md, LAYOUTS.md and PATTERNS.md are indexes.
This structure also applies when connecting an existing project: move contracts
and update references. Split mixed legacy documents: move their contract content into
`design-system/`, leaving only non-contract information and instructions at the old
path, with their meaning and references preserved. Implementation and token-source
paths stay unchanged.
The tree shows the shared agent convention; Claude-only projects use CLAUDE.md instead
of the pair. The instruction file points to root DESIGN.md, which connects the sources
and verification tools. The installed skill stays at its existing local or global path.

Contract frontmatter owns the stable id, description, status and root-relative source, test and example paths:

```yaml
---
id: button
description: >-
  Invoke one immediate action or navigate to one destination
  through a native button or link.
status: discoverable
sources:
  - src/components/Button.tsx
  - src/components/Button.css
tests:
  - src/components/Button.test.tsx
examples:
  - src/components/Button.stories.tsx
---
```

`id`, `description`, `status` and `sources` are required; tests/examples are
optional lists of concrete files. The
[format reference](skills/design-system/reference/formats.md) defines the supported flat
YAML syntax, multiline descriptions and unimplemented drafts. The entire former
Purpose section lives in `description`; contracts have five H2 sections. The three
generated indexes contain only discoverable contracts: H1 names, full descriptions
and Contract links, sorted by id. Identity/status are read from contracts.
IDs remain unique across all three groups. Empty groups are valid.
Document-only patterns may have `sources: []` and be discoverable after selection
and composition checks; they need no implementation of their own.

Markdown links resolve from their containing file; frontmatter paths and operational
paths in DESIGN.md resolve from the project root. Token catalogues retain their existing
format and roles, without inheriting UI metadata or contract sections.

Setup records unavailable tools explicitly. An independent analogous-page demonstration
is optional quality work; missing browser access does not prevent ordinary connection.

## Selection and composition

Ask how to organise components for composition advice through discovery. It recommends
meaningful groups, nesting, responsibility for spacing and adaptation, and permitted
substitutions using the project's layout APIs or recipes with permitted classes.
Use presents that recommendation before implementation; material unresolved choices
need decisions, while settled work continues. A proposed local choice does not establish
a shared rule; new reusable capabilities belong to craft.

For a page, discovery starts with patterns, then layouts and components. It reads and
compares all shortlisted contracts before choosing and revisits the outer selection
when its parts cannot fulfil the request. Local changes start at the affected level
while retaining surrounding obligations. Discovery also selects tokens by role, type,
scope and theme for consumer-controlled properties and public settings. Equal values
do not make token roles interchangeable; private component details stay outside discovery.

A missing fact is unknown. Preference-only assumptions are reported; facts determining
validity, required composition or material behaviour require an answer before building.
Required rules, recommendations and documented exceptions are distinct. Contracts name
who owns spacing, grouping, adaptation and accessibility; linked specifications,
tokens or implementation supply visual values without duplicating them.

A contract in its standard group directory makes an entity managed, even when
hidden or deprecated and absent from the generated indexes. Only `discoverable`
entities enter managed selection. `hidden` and `deprecated` cannot
enter new use through fallback. Unmanaged code may be investigated and reused when no
managed candidate fits, with limited verification explicitly reported. Reuse alone
does not adopt it into the design system.

See [the glossary](CONTEXT.md) and
[authority rules](skills/design-system/reference/model.md).

## Contracts and verification

[Fixed formats](skills/design-system/reference/formats.md) define one
section order per group. Components describe API and behaviour; layouts describe API
and composition; patterns describe structure, composition and verification.

Regenerate indexes after changing contracts, including status changes:

```sh
node skills/design-system/scripts/generate-indexes.mjs <project-root>
node skills/design-system/scripts/generate-indexes.mjs --check <project-root>
```

Generation replaces all three standard indexes; edit contracts instead. `--check`
reports missing or stale indexes without writing. Invalid metadata or duplicate ids
in any status stop generation before writing. Discovery remains read-only.

Check actual links, group format and index membership using all three indexes:

```sh
node skills/design-system/scripts/check-contract.mjs --kind layout \
  --inventory fixtures/mini-ds/design-system/COMPONENTS.md \
  --inventory fixtures/mini-ds/design-system/LAYOUTS.md \
  --inventory fixtures/mini-ds/design-system/PATTERNS.md \
  fixtures/mini-ds/design-system/layouts/stack.md
```

Use `--kind pattern` with an individual `design-system/patterns/<name>.md` contract.
The checker verifies metadata, listed files, links, group placement, cross-group identity
and source freshness; it does not prove semantics. Contracts serve agents choosing and composing
UI without studying implementation. They explain each instance's meaning, relevant
request facts and distinctions from nearby alternatives; length is not a quality target.
Criteria may include explanations and examples beside the condition they clarify.
Contracts integrate legacy promises into one public boundary, with specific limitations
kept visible and migration history in linked records. Discovery checks use independent
product situations; copying or paraphrasing criteria does not establish sufficient coverage.
Ordinary authoring audits public promises, new suitable contexts, nearby unsuitable
uses and edge cases. [Independent discovery](skills/design-system/reference/blind-gates.md)
and final independent review run only when explicitly requested or required by project
policy. Ordinary verification does not enable them, and unavailable reviewers do not
block ordinary completion. Requested discovery uses fresh public-only contexts per
ordinary authoring batch, or after the complete selected migration set is ready.
[Automatic migrations and gradual adoption with saved conditions](skills/design-system/reference/admission.md#whole-set-migration-discovery)
admit documented existing entities after ordinary audits and structural checks.
A failed explicitly required independent check leaves migration incomplete without
reversing admission. Existing focused tests/examples can establish runtime behaviour;
missing support remains unverified. Report check outcomes briefly in the response;
no separate evidence files, logs, screenshots, transcripts or archives are required.
Ordinary admission requires proven promises and authority;
[automatic migration in modes 1 and 3 and migration without verification](skills/design-system/reference/admission.md#migration-verification)
explicitly admit documented existing entities with recorded verification limits.
Independent consumption/composition supplements
that audit when requested by the task or DESIGN.md policy. Craft includes component
design changes using the project's process. Report static, behavioural and visual evidence
separately. A request to add a component includes admission after successful checks,
unless project policy or the request limits it. Unimplemented drafts remain hidden;
ordinary documentation alone does not authorise admission outside these migration exceptions.

Contracts are promises; implementation drift is a defect. Product work does not weaken
a contract to hide a mismatch. A reusable gap closes only after its original expected
result is demonstrated, including discoverability when requested. Independent legacy
violations and unrelated gaps do not expand a local change into a migration. The gap
journal holds only open entries without mandatory categories. Closed entries move
in full to the archive linked from DESIGN.md, by default `design-system/gaps-archive.md`,
with a closure date, disposition and basis. Resolved entries retain the resolution
and verification evidence; dismissed entries retain the reason; merged duplicates
link to the retained entry. See [archiving](skills/design-system/reference/gaps.md#archive-an-entry).

`design-system triage` checks the open journal against related system sources, merges
duplicates without losing expectations, and archives erroneous or already-resolved
entries with evidence. It recommends a work order and next steps, separating work
ready for craft from pending facts or decisions. Triage updates the journal and archive;
repairs and a system-wide search for new gaps require separate scope.
New gaps and entries reviewed during triage or repair receive an
[A/B/C resolvability assessment](skills/design-system/reference/gaps.md#assess-resolvability),
separate from priority and repair authority. Existing journals need no bulk update.
Archive cleanup runs on explicit request or at 500 lines, checked at triage entry
and after archiving. It removes all entries whose current version is saved in Git,
retains uncommitted records and replaces incoming links with verified commit permalinks.
See [archive cleanup](skills/design-system/reference/archive-cleanup.md) for retention
when history or link replacement is unavailable. Cleanup creates no commits.

### Source freshness

Contracts with nonempty `sources` require a `sourcesHash` frontmatter field. It records
the explicitly listed paths and file contents at the last review. Missing or different
hashes fail the check with exit code 1 and require another source-to-contract review.
Comments, formatting and shared styles count as changes; source-list ordering does not.
Tests, previews and unlisted dependencies are excluded. `sources: []` skips the hash
check and does not establish implementation readiness.

After reviewing the contract against its sources and resolving or recording findings,
the reviewing agent normally updates the hash explicitly:

```sh
node skills/design-system/scripts/check-contract.mjs --update-sources-hash \
  --kind layout fixtures/mini-ds/design-system/layouts/stack.md
```

The command preserves the contract text and refuses updates when validation fails.
If the promises remain correct, only the hash needs to change. A matching hash means
the listed sources are unchanged; it does not certify the promises. Ordinary checks
and CI never update hashes. See the [hash format](skills/design-system/reference/formats.md#contract-frontmatter).

### Pre-commit hook example

For a consumer project with `DESIGN.md` and `design-system/` at its Git root, create
`.githooks/pre-commit` with the following contents. Adjust `checker` to the installed
skill's script path. Node.js must be available on `PATH`.

```sh
#!/bin/sh
set -eu
cd "$(git rev-parse --show-toplevel)"
checker="$PWD/skills/design-system/scripts/check-contract.mjs"
contract_snapshot=$(mktemp -d)
trap 'rm -rf "$contract_snapshot"' EXIT
# ponytail: export the full index; narrow the snapshot if repository size makes this slow.
git checkout-index --all --prefix="$contract_snapshot/"
cd "$contract_snapshot"
for kind in component layout pattern; do
  for contract in design-system/"${kind}s"/*.md; do
    [ -e "$contract" ] || continue
    node "$checker" --kind "$kind" \
      --inventory design-system/COMPONENTS.md \
      --inventory design-system/LAYOUTS.md \
      --inventory design-system/PATTERNS.md "$contract"
  done
done
```

Enable it locally (integrate with an existing hook instead of replacing its setup):

```sh
chmod +x .githooks/pre-commit
git config --local core.hooksPath .githooks
```

The hook checks all contracts in a temporary copy of the Git index, including contracts
whose shared sources changed. Unstaged edits cannot hide a stale staged hash. It leaves
the index and working files untouched and never refreshes hashes. After review, stage
the updated contract together with its sources and retry the commit.
This uses Git's native [hooks](https://git-scm.com/docs/githooks) and
[index export](https://git-scm.com/docs/git-checkout-index#_examples).

## Fixtures and scenarios

- `fixtures/mini-ds/`: components in React and Web Components, a shared Stack layout,
  contracts under design-system/ and a settings-page pattern with two working compositions.
  Product checks reject broken labels/errors, form ownership and action/group order.
- `fixtures/tie-ds/`: overlapping document-only contracts for ranking, conditional
  choices, token roles/themes and lifecycle exclusions. Their missing runtime is deliberate.
- `scenarios/`: isolated skill requests evaluated by one independent agent against
  contracts and actual artifacts. [The runner procedure](scenarios/README.md) separates
  worker inputs from evaluation criteria. Reports have no required grading format;
  build checks assert target existence, composition and behaviour. The script collects
  assessments without matching worker wording. Historical grades remain unchanged.

```sh
npm test
npm run demo
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `/fixtures/mini-ds/demo/settings.html` on that server. The two pages simulate
submission locally; no data is persisted. Shared CSS owns component appearance and
Stack spacing. Tests establish DOM/composition behaviour; browser measurements and
interaction checks establish rendered/runtime evidence separately.

## Commit messages

This repository follows Conventional Commits: `type(scope): description`, with an
optional scope. For example: `feat: add a component` or `docs: clarify setup`.

## Project boundary

Framework-specific bindings, CSS, lifecycle machinery and tools stay project-owned.
This repository carries selection, composition, system development, contract authoring
and verification protocols. See the [project boundary rules](skills/design-system/reference/model.md).
