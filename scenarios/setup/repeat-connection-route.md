# Do not rerun a completed initial connection

**Skill:** ai-design
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- Use a connected isolated mini-ds copy whose DESIGN.md, indexes, agent instructions
  and links already satisfy setup. Keep no setup registry or completion marker.
- Record hashes of connection-owned files before dispatch.

**Request:**

> Use ai-design setup to connect this project again. If it is already connected,
> leave it as it is and report the existing result.

**Expected:**

- The entrypoint routes the explicit connection request to setup, whose entry guard
  recognises completion and reports it without rerunning connection work. Preserve
  every recorded file hash; do not repeat source survey,
  skill reconciliation, instruction consolidation, verification or cleanup.
- Do not create a registry, setup marker, new progress file or duplicate instructions
  to prove completion. If available evidence were insufficient, report that uncertainty
  rather than treating it as permission to rerun setup.
- Do not offer the four initial next steps again or start migration/adoption work.

**Independent variant — resume interrupted initial connection:** Start from a partial
first connection, with its saved source decisions and explicit verification choice,
and state that this initial operation has not completed. Request continuation of
that operation. Enter setup, reuse the saved decisions, finish its remaining work
and report connection separately from any migration. Existing partial files do not
prove completion, and no marker or second bootstrap is needed.
