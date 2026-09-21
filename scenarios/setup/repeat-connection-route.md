# Complete or restore an existing connection

**Skill:** design-system
**Route:** setup
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- Use a connected isolated mini-ds copy with saved design decisions and verification
  choice. Remove an index and the DESIGN.md pointer in AGENTS.md. Preserve contracts.
- Keep no setup registry or completion marker.

**Request:**

> Use design-system setup to complete this project's connection again.

**Expected:**

- Inspect current sources and restore the missing index and instruction pointer.
  Prior connection completion does not stop the requested work.
- Preserve accepted decisions, existing contracts, other instructions and symlinks.
  Reuse applicable verification; ask only about genuinely unresolved decisions.
- Avoid duplicate instructions, new completion markers and invented design rules.
- Report connection separately from uncovered UI. Start migration only with explicit
  permission; preserve any saved migration decisions and remaining work.

**Independent variants:**

- **Already correct:** Keep all artifacts intact. Inspect and preserve them without
  artificial edits or duplicate pointers; report the existing connection.
- **Explicit leave-unchanged request:** Ask to leave an already connected project as
  it is. Preserve file hashes and report the result without additional work.
- **Interrupted first connection:** Start from partial connection with saved source
  decisions and verification. Finish the remaining work using those decisions.
- **Unknown rule:** Remove a required rule with no authoritative source to recover
  it. Ask about that decision while restoring independently derivable artifacts.
