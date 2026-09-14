# Return missing context without starting setup

**Skill:** ai-design
**Route:** use
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- Use an isolated mini-ds copy. Remove root DESIGN.md and one required UI index while
  retaining product sources, the other indexes and contracts. Record the removed paths.

**Request:**

> Add another settings page using the connected design system. If required project
> context is unavailable, tell me exactly what is missing and leave affected work alone.

**Expected:**

- Stop the affected use work and return the exact missing DESIGN.md and index facts
  to the caller. Do not invoke or read setup, create replacement context, infer that
  initial connection is authorised or modify product/system files.
- Describe restoration as external project work. Do not create a framework registry,
  setup-completion marker or migration plan to compensate for the missing sources.
- Preserve readable evidence and avoid claiming selection or verification that the
  missing context prevents.

**Independent variant — analyze without DESIGN.md:** Restore all three indexes but
leave DESIGN.md absent, change Route to analyze and ask for reusable UI candidates.
Run analyze from the indexes and contracts; do not report setup as a prerequisite.

**Independent variant — analyze without an index:** Keep DESIGN.md absent and remove
one required index, change Route to analyze and make the same request. Return that
specific missing index and stop affected analysis without invoking setup.
