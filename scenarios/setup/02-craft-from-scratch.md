# Craft establishes a new system before explicit connection

**Skill:** ai-design
**Design:** fixtures/seed-system/DESIGN.md (does not exist yet)
**Request:**

> Create a design system from scratch under fixtures/seed-system, treating that
> directory as its project root. For this first step, create only a CSS spacing
> token --space-related-fields with value 0.5rem. Its role is the vertical gap
> between related fields when the consumer owns the container; it has one theme.
> No components or product screens are requested. Connect the system so a later
> agent can discover and use that token. Use existing repository tools.

**Expected:**

- Infer the craft stage despite missing DESIGN.md and establish the requested token's
  value, role and design intent as explicit decisions. Return the missing bootstrap
  prerequisites before writing connected artifacts; craft must not create them or
  invoke setup.
- Treat “Connect the system” as an explicit initial-connection request after craft
  returns its prerequisites and handoff. Run setup as a separate entrypoint stage,
  classify the empty project as multiple-agent by default, and create root DESIGN.md,
  AGENTS.md, a relative CLAUDE.md symlink to AGENTS.md, empty UI indexes and the
  open-gap journal. Use the
  available skill without installing or copying it into the new project.
- Link the real CSS definition and its role/constraints without inventing a
  duplicate token schema, visual direction, additional tokens or components.
- Discovery can return the token, value and applicable role through the new
  project context. Check actual links and the definition; browser/layout checks
  are not applicable because no interface or rendered layout was requested.
- Existing fixture projects remain unchanged. The entrypoint keeps the authorised
  craft and explicit connection stages separate, then resumes craft from the caller
  after setup returns. Craft never calls setup and the procedures do not recursively
  restart one another.
