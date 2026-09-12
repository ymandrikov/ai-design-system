---
name: ai-design
description: Organise and maintain a consistent design system through contracts, discovery, reuse and verification. Handles design-only component and consumer changes, setup, adoption and migration, analysis, gaps and triage; component internals and business logic remain project-owned.
---

# AI design

One entrypoint, two workflows with separate responsibilities. The framework governs
design-system work and its checks; implementation and engineering test methods follow
the project's procedures. Read
[the shared model](reference/model.md) once, then the procedure for the request.
Load supporting references only when their stated condition applies.
Within a project workflow, act as its design-system specialist under the
[shared responsibility boundary](reference/model.md#authority-and-task-scope).

## Choose the workflow

Accept explicit `ai-design craft <request>` and `ai-design use <request>`, or infer
the workflow from the requested result. An explicit mode sets the scope; a missing
capability does not expand it.

| Requested result | Read and follow |
| --- | --- |
| Survey and improve design-system consistency, including related consumer presentation while preserving logic | [improve](reference/improve.md); bounded system improvement through craft |
| Create or maintain components' design, layouts, patterns, contracts, tokens, rules or availability; fix a design-system gap | [craft](reference/craft.md) |
| Build or change a product interface by selecting and composing the system's public capabilities | [use](reference/use.md) |

`craft` delivers reusable system capabilities and evidence for their promises.
`use` delivers a product interface and evidence for its composition and behaviour.
A page request authorises product work and suitable local fallbacks; shared component
development and system rule changes require craft scope. Record a reusable shortfall
as a gap and hand it off to craft. Recording it does not authorise the repair.

When both workflows are authorised, identify their separate stages and results.
Follow **craft → checks → use → checks**: verify the shared capability before using
it, then verify its actual composition, subject to explicit migration exceptions.
Existing authorisation counts; crossing the boundary is not an automatic response to
failed discovery. Keep unrelated system work outside the task.

## Standalone procedures

Explicit `ai-design improve`, `analyze`, `setup`, `discovery`, `verify`, `gaps` or `triage`, and equivalent natural
language requests, reach the matching procedure directly. These are internal Markdown
instructions, not additional skills. End at that procedure's result; standalone
selection or review does not start implementation. Improve performs its bounded
system changes; its stricter scope remains in force when calling craft.

| Request or workflow condition | Read and follow |
| --- | --- |
| Improve the existing system, or resume saved improvements, preserving logic and allowing scoped consumer design changes | [improve](reference/improve.md); one survey pass, permitted edits and verification with saved progress |
| Analyze the codebase for component, layout or pattern extraction, consolidation or reuse candidates | [analyze](reference/analyze.md); saved recommendations, with readiness determined by design-system artifacts and indexes |
| Select components, layouts, patterns or tokens; advise how to organise or adapt a composition; assess system coverage | [discovery](reference/discovery.md), read/search only; return the recommendation without writing files |
| Connect existing sources, complete missing project context or explicitly migrate a codebase automatically | [setup](reference/setup.md); automatic migration is an opt-in stage that coordinates craft and use; creation of a missing system belongs to craft |
| Check an interface or component against its contracts and design sources | [verify](reference/verify.md) |
| Record a systemic shortfall or inspect the basis for a design choice | [gaps](reference/gaps.md); resolving a system gap belongs to craft |
| Review open gaps, clean the journal or archive and recommend next work | [triage](reference/triage.md); journal/archive maintenance and recommendations |

Procedures call each other through their file links. Follow the selected procedure's
scope even when the host exposes broader tools; read-only discovery never inherits
the caller's permission to write.
