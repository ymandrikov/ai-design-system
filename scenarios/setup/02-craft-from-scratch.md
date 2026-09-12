# Craft establishes a new system and setup connects it

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

- Infer craft despite missing DESIGN.md. Establish the requested token from the
  explicit decision; classify the empty project as multiple-agent by default and use
  setup to create root DESIGN.md, AGENTS.md, a relative CLAUDE.md symlink to AGENTS.md,
  empty UI indexes and the open-gap journal. Use the available skill without installing
  or copying it into the new project.
- Link the real CSS definition and its role/constraints without inventing a
  duplicate token schema, visual direction, additional tokens or components.
- Discovery can return the token, value and applicable role through the new
  project context. Check actual links and the definition; browser/layout checks
  are not applicable because no interface or rendered layout was requested.
- Existing fixture projects remain unchanged. Missing pre-existing sources do not
  cause setup/craft to refer back to each other indefinitely or block creation.
