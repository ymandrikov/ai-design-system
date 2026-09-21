# ai-design-system

A coding-agent skill that documents when and how to use your UI components, so
agents can reuse your design system when building pages. It adds Markdown contracts
to your existing codebase and checks them against the source files. Your components,
styles and tools stay in the project.

- **Selection rules.** Contracts explain which component fits a task, how to compose
  it and when to choose an alternative.
- **Existing code.** Connect a system you already have, document locally added
  external components, or ask the agent to create reusable UI.
- **Drift checks.** Included Node.js scripts check contract structure, links,
  generated indexes and whether listed sources have changed since review.
- **Bounded changes.** System work can change CSS, markup and public design settings.
  Component internals and business logic remain project-owned.

After installation and setup, ask your agent:

```text
Use design-system use to build an account settings page.
Select existing patterns, layouts and components.
Follow their composition rules and check the finished page.
```

The agent reads the relevant contracts, chooses a composition and builds the page
through public APIs. If the system lacks a required capability, it reports the gap.
Adding a shared component requires system-development scope.

[Get started](#get-started) · [Workflows](#workflows) ·
[Project structure](#project-structure) · [Migration](#migration) ·
[Contract checks](#contract-checks) · [Development](#development)

## Get started

You need [Node.js](https://nodejs.org/), [pnpm](https://pnpm.io/installation), Git
and a coding agent that supports skills.

From the root of the project where you want to use the skill, run:

```sh
pnpm dlx skills add ymandrikov/ai-design-system --skill design-system
```

Select your coding agent in the installer. Installation is project-local by default.
Add `--global` to install across projects. See the
[skills CLI](https://github.com/vercel-labs/skills) for supported agents and options.

Open your agent in that project and ask:

```text
Use design-system setup to connect this project's design system.
```

Setup creates or completes root `DESIGN.md`, links your existing design sources,
organises existing contracts and generates indexes. It adds a pointer in `AGENTS.md`
and preserves existing project instructions.

If reusable UI still needs documentation, the agent offers to document it without
changing runtime code, or finish with connection only. It also asks whether to run
verification. Existing decisions are reused.

For an empty project, setup creates the document and empty indexes. Then ask the
agent to create the UI you need:

```text
Use design-system craft to create the components for an account settings form.
```

See [setup details](skills/design-system/reference/setup.md) for existing contracts,
instruction files and unfinished connections.

## Workflows

The [design-system skill](skills/design-system/SKILL.md) has two main workflows.
You can name one or describe the result and let the agent choose.

| Workflow | Use it to |
| --- | --- |
| [`use`](skills/design-system/reference/use.md) | Build or change a product interface with existing public APIs and composition rules. |
| [`craft`](skills/design-system/reference/craft.md) | Create or maintain reusable UI, contracts, tokens and design rules. |

A page request permits product work and suitable local fallbacks. It does not permit
shared component or rule changes. When you request both, the agent completes and
checks the shared capability before using it, then checks the resulting page.

Other requests reach focused procedures:

| Request | Result |
| --- | --- |
| [`design-system discovery`](skills/design-system/reference/discovery.md) | Read-only recommendations for components, layouts, patterns or tokens. |
| [`design-system improve`](skills/design-system/reference/improve.md) | A survey of system consistency, followed by a choice to save findings or implement improvements. |
| [`design-system analyze`](skills/design-system/reference/analyze.md) | Reuse and extraction proposals saved in `design-system/analysis.md`; no implementation. |
| [`design-system verify`](skills/design-system/reference/verify.md) | Checks against contracts and project design sources. |
| [`design-system gaps`](skills/design-system/reference/gaps.md) | A record or assessment of a missing system capability. |
| [`design-system triage`](skills/design-system/reference/triage.md) | Review of open gaps, journal cleanup and recommended next work. |

When an agent adds external component sources locally, such as through shadcn,
contract and index updates belong to the same task. After a manual addition, ask
it to document those components. This covers local sources and project-owned
wrappers. See [external-component adoption](skills/design-system/reference/craft.md#adopt-locally-added-external-components).

## Project structure

`DESIGN.md` connects design intent, rules, token sources, contract indexes and
verification commands. Each reusable component, layout or page pattern has its
own contract. A connected project with documented UI might contain:

```text
AGENTS.md                         # Points to DESIGN.md and the installed skill
DESIGN.md                         # Connects design sources and project rules
design-system/
  COMPONENTS.md                   # Generated index
  LAYOUTS.md                      # Generated index
  PATTERNS.md                     # Generated index
  components/button.md
  layouts/stack.md
  patterns/settings-page.md
```

Implementation and token files keep their existing paths. Contracts describe
public APIs, intended uses, composition and verification. Indexes include only
`discoverable` entities; `hidden` and `deprecated` entities cannot enter new use.
Discoverability alone does not certify runtime correctness.

Start with the [DESIGN.md template](skills/design-system/assets/DESIGN.md) and
[contract formats](skills/design-system/reference/formats.md). The
[glossary](CONTEXT.md) defines project terms, and the
[shared model](skills/design-system/reference/model.md) defines responsibilities
and selection rules.

## Migration

For a connected project, ask the agent to document existing reusable UI across a
selected area or the whole codebase:

```text
Use design-system migrate to migrate the whole codebase in mode 3.
```

| Mode | Changes |
| --- | --- |
| 1, recommended | Contracts and bounded local exceptions, preserving appearance and observable behaviour. No standalone repairs. |
| 2 | Mode 1 plus design repairs to CSS, markup and public settings, including related consumers within scope. |
| 3 | Contracts, indexes and supporting documentation. Runtime code stays unchanged. |

Every mode preserves component internals and business logic. The agent asks for
missing mode and verification choices, saves progress in `design-system/adoption.md`
and continues through batches without repeated approval. Later requests resume
from saved decisions and current sources.

Setup offers mode 3 when connecting an existing project. Standalone migration
recommends mode 1. See [migration](skills/design-system/reference/migrate.md) for
scope and completion rules, or [gradual adoption](skills/design-system/reference/adoption.md)
for a separately requested staged approach.

## Contract checks

The skill includes two Node.js scripts. The commands below run from a checkout of
this repository; replace `<project-root>` with the connected project's path.
For an installed copy, use the scripts in that skill's installation directory.

Regenerate indexes after editing contracts or changing their status:

```sh
node skills/design-system/scripts/generate-indexes.mjs <project-root>
node skills/design-system/scripts/generate-indexes.mjs --check <project-root>
```

Generation replaces the three indexes. Edit contracts, not generated files.
`--check` reports missing or stale indexes without writing.

Check a contract with all three indexes:

```sh
node skills/design-system/scripts/check-contract.mjs --kind component \
  --inventory <project-root>/design-system/COMPONENTS.md \
  --inventory <project-root>/design-system/LAYOUTS.md \
  --inventory <project-root>/design-system/PATTERNS.md \
  <project-root>/design-system/components/button.md
```

Use `--kind layout` or `--kind pattern` for those contract groups. The checker
validates metadata, format, listed paths, links, index membership and source
freshness. It does not prove that a component behaves as promised; use the
project's behavioural and visual checks for that.

Contracts with source files record a `sourcesHash`. A missing or changed hash
requires a source-to-contract review. After that review, add `--update-sources-hash`
to the checker command to update the hash. Ordinary checks never refresh it.
See [source hash rules](skills/design-system/reference/formats.md#contract-frontmatter)
and [verification](skills/design-system/reference/verify.md) for details.

## Development

Clone this repository and install dependencies with the pnpm version pinned in
[package.json](package.json):

```sh
git clone https://github.com/ymandrikov/ai-design-system.git
cd ai-design-system
pnpm install --frozen-lockfile
```

Commit dependency changes with `pnpm-lock.yaml`.

Run fixtures and scenarios only when explicitly chosen. `pnpm test` includes
fixture checks. To run tests or build the local demo:

```sh
pnpm test
pnpm run demo
python3 -m http.server 4173 --bind 127.0.0.1
```

Open the [settings demo](http://127.0.0.1:4173/fixtures/mini-ds/demo/settings.html).
It contains React and Web Component compositions and simulates submission locally
without persisting data.

[mini-ds](fixtures/mini-ds/) contains the working UI example.
[tie-ds](fixtures/tie-ds/) contains document-only contracts for selection cases.
The [scenario guide](scenarios/README.md) explains how to evaluate agent decisions
and resulting artifacts in isolated copies. Fixture tests alone do not establish
agent selection or browser correctness.

### Commit messages

This repository follows Conventional Commits: `type(scope): description`, with an
optional scope. For example: `feat: add a component` or `docs: clarify setup`.

## License

[MIT](LICENSE).
