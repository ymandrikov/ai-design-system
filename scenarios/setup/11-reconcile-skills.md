# Preserve repository workflows while connecting design-system as a specialist

**Skill:** design-system
**Route:** setup
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- Treat the isolated mini-ds directory as the target repository. Install the current
  design-system package in its `.agents/skills/design-system/` directory.
- Add `.agents/skills/build-screen/SKILL.md` with frontmatter naming the skill and
  describing the full screen-building process. Require these stages in order:
  clarify requirements and obtain approval; decide architecture and data flow; select
  and reuse UI components, layouts and patterns under the project's contracts and
  eligibility rules; implement analytics; add stories and tests; check overall readiness.
  Read `reference/readiness.md` before declaring the screen complete; it requires
  analytics assertions, stories for loading/empty/error states and passing focused tests.
  Read `reference/motion.md` whenever implementing animation; it requires respecting
  reduced-motion preferences and limiting nonessential transitions to 120ms.
  Keep all these process instructions in Markdown; add no executable helper scripts.
- Add a mandatory pointer in target AGENTS.md to build-screen for screen requests.
- Add `.agents/skills/release-notes/SKILL.md`, scoped only to writing release notes,
  and `.agents/skills/motion-review/SKILL.md`, scoped to reviewing animation against
  the project's existing motion rules. Neither chooses components or changes rules.
- Preserve the original skills and DESIGN.md content for comparison. Keep preparation
  and scenario expectations outside the worker's inputs except the prepared project files.

**Request:**

> Connect this repository's existing design system to design-system. Run the applicable
> verification checks. No codebase migration is requested.

**Expected:**

- Analyse repository skills during the initial survey without asking for analysis
  permission. Inspect hidden directories, the invocation in AGENTS.md and both references.
  Keep the analysis inside this target repository; global/session skills are excluded.
- Identify compatible overlap from actual instructions. Preserve build-screen and its
  supporting files without offering replacement or asking for a replacement decision.
- Extend AGENTS.md routing: build-screen still owns screen requests and the full process;
  design-system handles contract/system work and selection and reuse of components, layouts
  and patterns. Make the specialist stage's result and return to build-screen explicit.
  Requirements approval, architecture/data, analytics, stories/tests and final readiness
  remain reachable in their original order; design-system UI checks do not complete the screen.
- Preserve motion and readiness rules at their original locations and link relevant
  project rules from DESIGN.md. Copying their text into DESIGN.md and deleting the
  original invocation or stages fails, even though no executable scripts exist.
- Preserve release-notes and motion-review as unrelated and complementary skills.
- Preserve existing DESIGN.md content. Do not start automatic migration.

**Independent variants:** Start each from fresh preparation.

- **Conflicting shared-component rule:** Add a build-screen instruction requiring any
  missing shared component to be created immediately, bypassing contract authoring and
  component admission checks. Identify that specific conflict and propose a minimal
  rule/boundary edit routing shared-component work through craft and its checks before
  resuming use. Preserve the overall skill and its entrypoint; propose no removal.
  Await unresolved rule choices, record the affected operations in DESIGN.md and finish
  independent connection work without claiming the conflict is resolved.
- **Accepted targeted correction:** Use the conflicting-rule preparation and append:
  "Change only the shared-component rule to follow design-system craft and its checks
  before continuing screen composition. Preserve the rest of build-screen."
  Apply that correction and corresponding routing without another confirmation;
  preserve unrelated process stages and rule locations.
- **Existing craft authority:** Add a compatible rule permitting shared-component
  development when needed, subject to project contracts and checks. Route it through
  craft before use under that existing authority. Do not invent a conflict or require
  renewed permission merely because two design-system workflows are involved.
- **Explicit consolidation:** Append: "I want to consolidate build-screen into
  design-system and remove the old skill. Propose the migration first."
  Map triggers, every process stage, approvals, supporting rules and readiness checks
  to proposed owners before recommending concrete edits. Expose responsibilities
  design-system does not cover and any changed or lost behaviour; Markdown-only stages count.
  Keep files and routes intact pending the migration decision. A DESIGN.md text dump
  without reachable process stages is not an equivalent replacement.
- **Declined conflict correction:** Use the conflicting-rule preparation and append:
  "Keep build-screen and its invocation unchanged; do not apply a conflict correction."
  Preserve both, record the unresolved operation and complete independent setup work.
  Do not fall back to recommending replacement or claim compatible routing.
- **CLAUDE.md with shared skills:** Put the mandatory invocation in CLAUDE.md instead
  of AGENTS.md, with no AGENTS.md present. The existing `.agents/` selects multiple
  agents. Move all CLAUDE.md instructions into AGENTS.md, extend the route with the
  same division of responsibilities and replace CLAUDE.md with a relative symlink
  to AGENTS.md. Preserve the project entrypoint and all process stages.
- **Claude-only:** Prepare the same skills under `.claude/skills/`, with routing in
  CLAUDE.md and no `.agents/`, AGENTS.md or other-agent configuration anywhere in the
  target. Keep CLAUDE.md canonical and extend its route without creating `.agents/`
  or AGENTS.md or moving any skills.
- **Global installation, unknown mode:** Make design-system available from outside the
  target repository; prepare no repository skills, agent instruction files or agent
  configuration. Default to multiple agents and create root AGENTS.md with a relative
  CLAUDE.md symlink. Use the actual installed skill; do not create a local package or
  classify the project from global skills or the worker's identity.
- **Other-agent evidence:** Use the global-installation preparation with CLAUDE.md
  and project-owned configuration for another agent, but no `.agents/` or AGENTS.md.
  Select multiple agents and consolidate CLAUDE.md into AGENTS.md.
- **Installer-created shared directory:** Use the Claude-only preparation, then create
  `.agents/` before dispatch as an installer would. Select multiple agents from the
  initial target state, even when that directory is empty. Preserve installed skills.
- **Explicit mode:** Use shared preparation but explicitly request Claude-only setup.
  Honour the requested mode, use CLAUDE.md for setup routing and leave existing skills
  and unrelated agent configuration intact.
- **Merge and nested scope:** Seed both root files with one exact duplicate, unique
  instructions, a Claude-specific rule and references. Add a nested package CLAUDE.md
  with a local rule and relative reference. Merge each file into its sibling AGENTS.md,
  removing only the exact duplicate and marking the Claude-specific rule. Preserve
  root versus nested scope and working references. Exclude dependency and third-party
  instruction files. All converted CLAUDE.md files must be relative symlinks.
- **Contradictory instructions:** Make AGENTS.md require tests and CLAUDE.md prohibit
  them. Present both passages and request a decision before replacing CLAUDE.md;
  neither filename takes priority. Continue independent connection work and report
  the unresolved pair without claiming full consolidation.
- **Existing links:** Prepare a correct CLAUDE.md -> AGENTS.md pair and a nested
  reverse AGENTS.md -> CLAUDE.md pair. Preserve contents and normalise the reverse
  pair without cycles during the initial connection.
- **Repeat setup:** Start from the completed result of the base scenario and repeat
  the same connection request. Report the existing completed connection without
  rerunning connection work, reconciling skills again, duplicating
  instructions, moving skills or recreating execution state. An uncertain history
  must be reported rather than inferred from a new registry or completion marker.
- **External or unreadable instructions:** Link a nested CLAUDE.md outside the target
  repository and make another instruction file unreadable to the worker. Leave these
  sources and links unchanged, report the coverage limits and continue independent
  connection work without claiming those pairs are consolidated.
- **Mixed contract and process document:** Add an existing component contract outside
  the standard contract directories that also specifies a mandatory release approval
  process. Link it into the existing sources. Move all contract content into the
  appropriate contract under design-system/; leave only the release-process content
  at the original path. Preserve its invocation, repair incoming links by their
  intended destination and retain a relevant link from the new contract. Do not
  defer the contract move, duplicate contract rules or lose process instructions.
