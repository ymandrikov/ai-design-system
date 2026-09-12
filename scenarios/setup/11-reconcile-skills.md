# Replace overlapping repository skills while preserving differing instructions

**Skill:** ai-design
**Route:** setup
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- Treat the isolated mini-ds directory as the target repository. Install the current
  ai-design package in its `.agents/skills/ai-design/` directory.
- Add `.agents/skills/ui-composition/SKILL.md` with frontmatter naming the skill and
  describing product interface composition. Its instructions require choosing
  existing components for product UI, always selecting directly from implementation
  files instead of consulting component contracts, and reading `reference/motion.md`
  whenever implementing animation. That reference requires respecting reduced-motion
  preferences and limiting nonessential transitions to 120ms.
- Add a mandatory pointer in target AGENTS.md to ui-composition for product UI.
- Add `.agents/skills/release-notes/SKILL.md`, scoped only to writing release notes,
  and `.agents/skills/motion-review/SKILL.md`, scoped to reviewing animation against
  the project's existing motion rules. Neither chooses components or changes rules.
- Preserve the original DESIGN.md content for comparison. Keep all preparation and
  scenario expectations outside the worker's inputs except the prepared project files.

**Request:**

> Connect this repository's existing design system to ai-design. Run the applicable
> verification checks. No codebase migration is requested.

**Expected:**

- Analyse repository skills during the initial survey without asking for analysis
  permission. Inspect hidden directories, the invocation in AGENTS.md and motion.md.
  Keep the analysis inside this target repository; global/session skills are excluded.
- Identify the overlapping composition responsibility and the concrete conflict
  between direct implementation selection and ai-design's contract-based discovery.
  Explain these from the actual instructions rather than a skill-name ranking.
- Offer removal of ui-composition and replacement of its composition responsibility
  with ai-design use. Show the differing reduced-motion and 120ms instructions proposed
  for DESIGN.md, the files/references affected and any lost capabilities.
- Preserve release-notes and motion-review as unrelated and complementary skills.
- Await the replacement choice before removing the skill, transferring its instructions
  or changing its mandatory invocation. Continue independent connection work and
  report any pending choice separately; do not claim all conflicts are resolved.
- Preserve existing DESIGN.md content. Do not start automatic migration.

**Independent variants:** Start each from fresh preparation.

- **Accepted replacement:** Append to the Request: "Replace ui-composition with
  ai-design use. Transfer its reduced-motion and 120ms transition instructions into
  DESIGN.md, remove the replaced skill, and update its repository references."
  Apply that authority without another confirmation. Both differing rules survive
  in DESIGN.md with their original meaning; the obsolete skill and invocation are
  removed, references remain usable, and unrelated/complementary skills are intact.
- **Declined replacement:** Append: "Keep ui-composition unchanged; I decline its
  replacement. Propose a division of responsibilities if needed."
  Preserve it and offer a concrete AGENTS.md change that resolves the conflicting
  invocation. Until that choice is settled, record the conflict and affected product
  selection actions in DESIGN.md. Finish independent connection work without claiming
  compatibility or blocking all setup merely because replacement was declined.
- **Overlap without conflict:** Replace ui-composition's direct-selection instruction
  with following the project's component contracts and eligibility rules. Still
  offer replacement based on overlapping functionality; do not invent a conflict.
