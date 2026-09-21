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

- Read the applicable AGENTS.md and invoked project instructions. Preserve build-screen
  as the overall entrypoint and its stages, approvals, supporting rules and files.
- Add the DESIGN.md/design-system pointer to AGENTS.md for contract/system work and
  UI selection/reuse, preserving the caller's other responsibilities.
- Link relevant project rules at their authoritative locations. Preserve DESIGN.md
  content and all skills. Do not audit release-notes, motion-review or the general
  skill catalogue for compatibility, offer replacement or consolidate instructions.
- Reuse the verification choice, report connection and remaining uncovered UI;
  do not begin codebase migration without confirmation.

**Independent variants:** Start each from fresh preparation.

- **Conflict in applicable instructions:** Add a mandatory rule that bypasses project
  contracts when creating shared components. Report the conflicting operation and
  ask for the unresolved rule decision while completing independent connection work.
  A discovered conflict does not authorise skill replacement or a general audit.
- **Explicit targeted correction:** Also request correction of that specific rule to
  use craft before screen composition. Apply it without renewed permission and
  preserve other process stages.
- **CLAUDE.md only:** Keep routing in CLAUDE.md, with no AGENTS.md. Create a minimal
  AGENTS.md with the main pointer and add a short pointer in CLAUDE.md as needed.
  Preserve its original content and the installed skills, regardless of `.agents/`
  or `.claude/` directories. Create no symlink.
- **Global installation, no instructions:** Use the actual global package, create
  minimal AGENTS.md and no CLAUDE.md or local skill copy.
- **Nested scope:** Seed root AGENTS.md and CLAUDE.md with unique instructions and
  a nested CLAUDE.md with a scoped rule and relative reference. Respect nested scope;
  preserve file contents except required pointers and affected link repairs.
  Do not merge instructions, deduplicate rules or create sibling files en masse.
- **Existing links:** Test both CLAUDE.md -> AGENTS.md and AGENTS.md -> CLAUDE.md.
  Preserve each link direction and edit its common source once, without duplicate
  pointers, link normalisation or cycles.
- **External or unreadable instructions:** Keep those files and targets unchanged,
  report the specific limitation and continue independent work.
- **Mixed contract and process document:** Move existing contract content into the
  standard contract directory while keeping process instructions at the original
  path. Preserve content and status, repair incoming links by intended destination,
  and keep the process reachable. This move does not require full migration.
