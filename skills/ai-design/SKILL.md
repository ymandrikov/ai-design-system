---
name: ai-design
description: Create and maintain a design system and its components, or build and verify product interfaces using that system. Also handles explicitly requested automatic codebase migration, project setup, component and token discovery, gap recording and triage.
---

# AI design

One entrypoint, two workflows with separate responsibilities. Read
[the shared model](reference/model.md) once, then the procedure for the request.
Load supporting references only when their stated condition applies.

## Choose the workflow

Accept explicit `ai-design craft <request>` and `ai-design use <request>`, or infer
the workflow from the requested result. An explicit mode sets the scope; a missing
capability does not expand it.

| Requested result | Read and follow |
| --- | --- |
| Create or maintain the design system: components and their implementation, layouts, patterns, contracts, tokens, rules or availability | [craft](reference/craft.md) |
| Build or change a product interface by selecting and composing the system's public capabilities | [use](reference/use.md) |

`craft` delivers reusable system capabilities and evidence for their promises.
`use` delivers a product interface and evidence for its composition and behaviour.
A page request authorises product work and suitable local fallbacks; shared component
development and system rule changes require craft scope. Record a reusable shortfall
as a gap and hand it off to craft. Recording it does not authorise the repair.

When both workflows are authorised, identify their separate stages and results.
Complete and verify the needed craft work before resuming use of that capability.
Existing authorisation counts; crossing the boundary is not an automatic response to
failed discovery. Keep unrelated system work outside the task.

## Standalone procedures

Explicit `ai-design setup`, `discovery`, `verify`, `gaps` or `triage`, and equivalent natural
language requests, reach the matching procedure directly. These are internal Markdown
instructions, not additional skills. End at that procedure's result; standalone
selection or review does not start implementation.

| Request or workflow condition | Read and follow |
| --- | --- |
| Select components, layouts, patterns or tokens; assess system coverage | [discovery](reference/discovery.md), read/search only; return the decision without writing files |
| Connect existing sources, complete missing project context or explicitly migrate a codebase automatically | [setup](reference/setup.md); automatic migration is an opt-in stage that coordinates craft and use; creation of a missing system belongs to craft |
| Check an interface or component against its contracts and design sources | [verify](reference/verify.md) |
| Record a systemic shortfall or inspect the basis for a design choice | [gaps](reference/gaps.md); resolving a system gap belongs to craft |
| Review open gaps, clean the journal and recommend next work | [triage](reference/triage.md); journal updates and recommendations only |

Procedures call each other through their file links. Follow the selected procedure's
scope even when the host exposes broader tools; read-only discovery never inherits
the caller's permission to write.
