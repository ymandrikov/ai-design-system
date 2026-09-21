# Recover derivable context and respect explicit limits

**Skill:** design-system
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
- Honour the explicit instruction to leave affected work alone. Do not create a framework registry,
  setup-completion marker or migration plan to compensate for the missing sources.
- Preserve readable evidence and avoid claiming selection or verification that the
  missing context prevents.

**Independent variant — analyze without DESIGN.md:** Restore all three indexes but
leave DESIGN.md absent, change Route to analyze and ask for reusable UI candidates.
Run analyze from the indexes and contracts; do not report setup as a prerequisite.

**Independent variant — analyze without an index:** Keep DESIGN.md absent and remove
one required index, change Route to analyze and make the same request. Return that
specific missing index and stop affected analysis when the request retains the explicit
instruction to leave affected work alone.


**Independent variant — recover a generated index:** Retain DESIGN.md and all contract
directories, remove one generated UI index, and request a settings page without the
instruction to leave affected work alone. Regenerate indexes from the existing contracts
using the packaged generator, preserve contract contents and statuses, and continue
use once required context is available. Do not start initial connection or migration.

**Independent variant — analyze with recoverable index:** Retain all contract directories,
remove DESIGN.md and one index, change Route to analyze and request reusable UI
candidates without a no-restoration restriction. Regenerate indexes and continue
analysis; do not fabricate DESIGN.md or require it for this procedure.

**Independent variant — insufficient sources:** Remove a required index and its contract
directory, and request recovery and analysis. Do not generate an empty index as if the
missing contracts were an empty group. Ask for the missing sources or decision and
pause dependent analysis, preserving available evidence.
