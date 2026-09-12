# ai-design-system

An embeddable framework for design systems consumed by coding agents. Agents choose
and compose a project's existing components, layouts and page patterns from contracts.
The project keeps its code, bindings, styles and tools; root DESIGN.md connects them.

Read [CONTEXT.md](CONTEXT.md) when discussing or changing domain terms. It is the
canonical glossary, exposed at the repository root by a symlink to the copy packaged
with `ai-design`. [Project boundary rules](skills/ai-design/reference/model.md)
describe how those terms map to project artifacts and workflows.

The framework covers developing and maintaining design systems, including component
implementation, and building product interfaces that consume them. These are separate
responsibilities described in the workflows below.

## Installation

You need Node.js with npm, Git, and a coding agent that supports skills.
From the root of the project where you want to use the skill, run:

```sh
npx skills add ymandrikov/ai-design-system --skill ai-design
```

Select your coding agent in the installer. Installation is project-local by default;
add `--global` to make the skill available across your projects. See the
[skills CLI](https://github.com/vercel-labs/skills) for supported agents and options.

Then ask your agent to connect an existing design system:

```text
Use ai-design setup to connect this project's design system.
```

If the project does not have a design system yet, ask `ai-design craft` to create
one. See [Connect a project](#connect-a-project) for the resulting structure.

## Workflows

The single [ai-design skill](skills/ai-design/SKILL.md) routes to two workflows:

- `ai-design use` discovers an appropriate composition, implements product
  UI through public APIs and verifies the affected relationships and behaviour.
- `ai-design craft` develops and maintains reusable components, layouts, patterns,
  contracts, rules and tokens, and verifies readiness for new selection. It follows
  the project's implementation conventions and can create a system from scratch.

Craft's [component proposal discussion](skills/ai-design/reference/component-proposal.md)
turns a need and optional mockup into a component proposal. Users can accept,
amend or delegate choices; questions focus on material decisions still needing input.

Choose `craft` or `use` explicitly, or describe the result and let the entrypoint
route it. A page request permits product work and suitable local fallbacks. A system
gap is handed off to craft; it does not authorise shared component or rule changes.
When both workflows are authorised, complete the needed craft work and checks before
resuming use, with separate results for system and product work.

`ai-design setup`, `discovery`, `verify`, `gaps` and `triage` reach internal procedures for
connection and opt-in automatic migration, selection, review, gap recording and journal triage. Equivalent natural language requests
also work. Standalone discovery stays read-only; selection and review end at their
own result. All procedures are Markdown references loaded when needed, with one
`SKILL.md`, shared templates and the existing contract checker:

```text
skills/ai-design/
  SKILL.md
  reference/
    craft.md
    use.md
    discovery.md
    setup.md
    verify.md
    gaps.md
    triage.md
    ... shared model, contract and token procedures
  assets/
  scripts/
```

## Connect a project

Ask `ai-design setup` to connect the project. It can discover and inspect
pages automatically; no selected page, adoption or demonstration is required.
During setup it also analyses skills inside the repository for overlapping functions
and conflicts with ai-design. Existing skills keep their entrypoints and overall
processes; AGENTS.md or CLAUDE.md routes contract and design-system work, including
component/layout/pattern selection and reuse, through ai-design. Compatible overlap
requires no replacement decision. Concrete conflicts lead to minimal rule or boundary
edits; unresolved conflicts block only dependent actions. Replacement or consolidation
requires an explicit request and a prior mapping of responsibilities, workflow and
losses. Existing project rules stay at their sources, linked from DESIGN.md, unless
their reorganisation is separately agreed. See [skill reconciliation](skills/ai-design/reference/setup.md#reconcile-repository-skills).

After connection, setup asks "What next?" with four explicit options in order:

- **A. Automatic migration (recommended)** — complete the selected scope across all
  batches with saved progress and no repeated confirmation.
- **B. Gradual adoption** — add contracts, run checks and admit existing entities,
  pausing after each batch for continuation.
- **C. API and consumer analysis** — save escape-hatch recommendations without
  implementing them.
- **D. Stop here** — keep the completed connection.

Choosing A leads to the migration-mode choice below, recommending mode 1; it does
not select a mode automatically. Already supplied mode and verification decisions
are reused, and the agent chooses an unspecified batch size itself.
For B and C, the shared work list in `design-system/adoption.md` saves independent
progress and batch sizes. After listing the scope, the agent asks for a batch size
unless already supplied, saved or delegated: 5 or 10 (recommended), or another positive integer.
Ask to continue for the next batch, change the batch size, or explicitly request
completion of every batch. See [gradual adoption](skills/ai-design/reference/adoption.md).

Automatic migration is an opt-in stage of `ai-design setup`. Choose A after connection,
explicitly ask setup to migrate automatically, or use equivalent natural language.
Select an area or the whole codebase:

| Mode | Result |
| --- | --- |
| 1 — Contracts and escape hatches (recommended) | Document existing entities and connect bounded local exceptions while preserving appearance and observable behaviour; no standalone repairs. |
| 2 — Contracts, escape hatches and repairs | Also repair implementations and affected consumers, including business logic, against authoritative requirements. Preserve correct behaviour; fix evidenced defects. |
| 3 — Contracts only | Contracts for components, layouts and existing patterns, indexes and DESIGN.md; runtime code stays unchanged. |

The agent asks for the missing mode, recommending **mode 1**. The mode settles
business-logic authority without a separate question. Explicit delegation permits the
recommended choice without questions. Already supplied decisions are reused. For example:

```text
Use ai-design setup to automatically migrate the whole codebase in mode 1.
```

Before any migration checks, including setup link validation, the agent explains
the applicable checks and waits for a run-or-skip choice alongside other startup
decisions. An explicit or saved choice is reused across batches and resumptions.
Skipping testing or verification applies in every mode, including gradual adoption:
checks are skipped except mandatory [final document reconciliation](skills/ai-design/reference/setup.md#reconcile-final-documents),
while authorised code repairs and documentation continue. Before reporting setup results,
the agent rereads all created or changed documents, DESIGN.md, AGENTS.md and existing
CLAUDE.md files in the affected area and reconciles them with the actual project and
setup results. Factual mismatches are corrected; unresolved rule conflicts are reported.
Documented implemented entities become `discoverable`, retaining existing `deprecated`
status. Results are explicitly unverified, and the user accepts the risk of nonworking
code. See [migration verification](skills/ai-design/reference/model.md#migration-verification).

The agent chooses an unspecified batch size, saves progress in `design-system/adoption.md`
and continues through all batches without repeated confirmation. Blocked items remain
explicit while independent work proceeds. New design rules need authoritative sources
or delegated decision authority. Modes 1 and 2 can reuse or create a bounded escape
hatch for a concrete need, preserving project exception-approval conditions.
See [automatic migration](skills/ai-design/reference/setup.md#automatic-migration) for scope and completion.

Automatic migration in modes 1 and 3 makes documented existing entities `discoverable`, retaining
`deprecated` status where already set. Known defects and unverified promises are linked
from contracts and considered during selection. Documentation completion and runtime
verification are separate results; availability does not certify correctness.
Defects outside those modes' repair authority do not block documentation completion.
Mode 1 still requires completing its exception changes; mode 2 remains partially
complete while required repairs or enabled verification are blocked.

[The DESIGN.md template](skills/ai-design/assets/DESIGN.md) connects
visual intent, shared rules, tokens, indexes, public usage and verification:

```text
<repo_root>/
  .agents/skills/ai-design/
  design-system/
    components/
      button.md
    layouts/
      stack.md
    COMPONENTS.md
    LAYOUTS.md
    PATTERNS.md
    gaps.md
    gaps-archive.md
  AGENTS.md
  DESIGN.md
```

Component and layout contracts live in their respective design-system directories;
PATTERNS.md holds the contents and full descriptions of every pattern. This structure
also applies when connecting an existing project: move contracts, merge pattern
documents and update references. Implementation and token-source paths stay unchanged.
AGENTS.md points to root DESIGN.md, which connects the sources and verification tools.

Contract frontmatter owns the stable id, status and root-relative source/evidence paths:

```yaml
---
id: button
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

`sources` is required; tests/examples are optional lists of concrete files. The
[format reference](skills/ai-design/reference/formats.md) defines the supported flat
YAML syntax and unimplemented drafts. COMPONENTS.md and LAYOUTS.md contain display
names, Purpose descriptions covering supported tasks, means and material distinctions
for candidate discovery, and Contract links; identity/status are read from
contracts. Each pattern section has its own id/status and stable anchor. IDs remain
unique across all three groups. Empty groups are valid.

Markdown links resolve from their containing file; frontmatter paths and operational
paths in DESIGN.md resolve from the project root. Token catalogues retain their existing
format and roles, without inheriting UI metadata or contract sections.

Setup records unavailable tools explicitly. An independent analogous-page demonstration
is optional quality work; missing browser access does not prevent ordinary connection.

## Selection and composition

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

Only `discoverable` entities enter managed selection. `hidden` and `deprecated` cannot
enter new use through fallback. Unmanaged code may be investigated and reused when no
managed candidate fits, with limited verification explicitly reported. Reuse alone
does not adopt it into the design system.

See [the glossary](CONTEXT.md) and
[authority rules](skills/ai-design/reference/model.md).

## Contracts and evidence

[Fixed formats](skills/ai-design/reference/formats.md) define one
section order per group. Components describe API and behaviour; layouts describe API
and composition; patterns describe structure, composition and verification.

Check actual links, group format and index membership using both indexes and PATTERNS.md:

```sh
node skills/ai-design/scripts/check-contract.mjs --kind layout \
  --inventory fixtures/mini-ds/design-system/COMPONENTS.md \
  --inventory fixtures/mini-ds/design-system/LAYOUTS.md \
  --inventory fixtures/mini-ds/design-system/PATTERNS.md \
  fixtures/mini-ds/design-system/layouts/stack.md
```

Use `--kind pattern` with the full `design-system/PATTERNS.md` to validate its sections
and anchors. The structural checker verifies metadata, listed files, links, group
placement and cross-group identity; it does not prove semantics. Ordinary authoring audits evidence
for public promises, suitable/unsuitable use and edge cases, with actual discovery for
admission or changed selection rules. Existing focused tests/examples can supply evidence;
missing support remains unverified. Ordinary admission requires proven promises and authority;
[automatic migration in modes 1 and 3](skills/ai-design/reference/setup.md#admission-without-repairs) and
[migration without verification](skills/ai-design/reference/model.md#migration-verification)
explicitly admit documented existing entities with recorded verification limits.
[Independent gates](skills/ai-design/reference/blind-gates.md) supplement
that audit only when requested by the task or DESIGN.md policy. Craft includes component
development using the project's process. Report static, behavioural and visual evidence
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
link to the retained entry. See [archiving](skills/ai-design/reference/gaps.md#archive-an-entry).

`ai-design triage` checks the open journal against related system sources, merges
duplicates without losing expectations, and archives erroneous or already-resolved
entries with evidence. It recommends a work order and next steps, separating work
ready for craft from pending facts or decisions. Triage updates the journal and archive;
repairs and a system-wide search for new gaps require separate scope.
New gaps and entries reviewed during triage or repair receive an
[A/B/C resolvability assessment](skills/ai-design/reference/gaps.md#assess-resolvability),
separate from priority and repair authority. Existing journals need no bulk update.
Archive cleanup runs on explicit request or at 500 lines, checked at triage entry
and after archiving. It removes all entries whose current version is saved in Git,
retains uncommitted records and replaces incoming links with verified commit permalinks.
See [archive cleanup](skills/ai-design/reference/archive-cleanup.md) for retention
when history or link replacement is unavailable. Cleanup creates no commits.

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
and verification protocols. See the [project boundary rules](skills/ai-design/reference/model.md).
