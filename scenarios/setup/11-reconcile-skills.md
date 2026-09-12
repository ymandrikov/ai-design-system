# Preserve repository workflows while connecting ai-design as a specialist

**Skill:** ai-design
**Route:** setup
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- Treat the isolated mini-ds directory as the target repository. Install the current
  ai-design package in its `.agents/skills/ai-design/` directory.
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

> Connect this repository's existing design system to ai-design. Run the applicable
> verification checks. No codebase migration is requested.

**Expected:**

- Analyse repository skills during the initial survey without asking for analysis
  permission. Inspect hidden directories, the invocation in AGENTS.md and both references.
  Keep the analysis inside this target repository; global/session skills are excluded.
- Identify compatible overlap from actual instructions. Preserve build-screen and its
  supporting files without offering replacement or asking for a replacement decision.
- Extend AGENTS.md routing: build-screen still owns screen requests and the full process;
  ai-design handles contract/system work and selection and reuse of components, layouts
  and patterns. Make the specialist stage's result and return to build-screen explicit.
  Requirements approval, architecture/data, analytics, stories/tests and final readiness
  remain reachable in their original order; ai-design UI checks do not complete the screen.
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
  "Change only the shared-component rule to follow ai-design craft and its checks
  before continuing screen composition. Preserve the rest of build-screen."
  Apply that correction and corresponding routing without another confirmation;
  preserve unrelated process stages and rule locations.
- **Existing craft authority:** Add a compatible rule permitting shared-component
  development when needed, subject to project contracts and checks. Route it through
  craft before use under that existing authority. Do not invent a conflict or require
  renewed permission merely because two ai-design workflows are involved.
- **Explicit consolidation:** Append: "I want to consolidate build-screen into
  ai-design and remove the old skill. Propose the migration first."
  Map triggers, every process stage, approvals, supporting rules and readiness checks
  to proposed owners before recommending concrete edits. Expose responsibilities
  ai-design does not cover and any changed or lost behaviour; Markdown-only stages count.
  Keep files and routes intact pending the migration decision. A DESIGN.md text dump
  without reachable process stages is not an equivalent replacement.
- **Declined conflict correction:** Use the conflicting-rule preparation and append:
  "Keep build-screen and its invocation unchanged; do not apply a conflict correction."
  Preserve both, record the unresolved operation and complete independent setup work.
  Do not fall back to recommending replacement or claim compatible routing.
- **CLAUDE.md routing:** Put the mandatory invocation in CLAUDE.md instead of AGENTS.md,
  with no AGENTS.md present. Extend that route with the same division of responsibilities;
  preserve the project entrypoint and avoid creating a competing AGENTS.md route.
- **Mixed contract and process document:** Add an existing component contract outside
  the standard contract directories that also specifies a mandatory release approval
  process. Link it into the existing sources. Keep the document at its original path
  and link it from DESIGN.md; report deferred reorganisation without silently moving,
  splitting or dropping its process. Ordinary standalone contracts still move under
  setup's standard structure. Independent connection can finish with that deferral.
