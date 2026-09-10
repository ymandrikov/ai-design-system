# Connect the project

Read [the shared model](model.md). Use its standard contract directories and uppercase
index/pattern filenames for new and existing projects. Preserve implementation paths;
DESIGN.md stays at the repository root.
Setup connects sources and records missing capabilities. For a new system, the
[craft workflow](craft.md) owns the requested design decisions and implementation;
connect its established sources as they become available. Missing sources may be
recorded as absent, and empty indexes are valid.

## Survey the existing sources

Read repository instructions, existing DESIGN.md or legacy profile, UI libraries,
token definitions, themes, design rules, public usage and verification commands.
Find pages from the code when useful; a user-selected page is not required. Inspect
representative consumers to distinguish actual evidence from naming or popularity.
Report conflicting sources and unresolved normative choices without choosing new
system rules on the owner's behalf. Complete when the available sources and gaps in
project context are known; surveying pages does not authorise their adoption.

## Connect the project

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
Adopt entities through [craft](craft.md) only for the requested scope. Adoption
and admission are separate; connection requires neither. For an analogous-page
demonstration requested by the task or project policy, follow
[optional independent quality](blind-gates.md).
Its absence does not make ordinary setup incomplete.
