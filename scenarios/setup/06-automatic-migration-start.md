# Ask for migration boundaries without asking for batch size

**Skill:** design-system
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> Fully automatically migrate this whole codebase to ai-design-system.

**Expected:**

- The fixture is already connected, so route directly to standalone migrate, inspect
  real sources and save the discovered scope. Do not invoke or read setup.
- Use an available question tool permitted in the current mode; otherwise use the
  separate numbered text format with options and a recommendation.
- Ask for the missing mode in the startup round, offering in order:
  mode 1 — contracts and escape hatches preserving existing appearance and behaviour
  (recommended); mode 2 — contracts, escape hatches and design repairs preserving correct
  behaviour; mode 3 — contracts only, with runtime unchanged.
- Explain that mode 2 can correct evidenced design defects against authoritative
  requirements. Every mode preserves component internals and business logic.
- Explain each mode by what it permits changing, using plain language matching the
  user and briefly defining new terms at first mention. Before the mode choice,
  explain an escape hatch as a controlled local exception with a required reason
  and explicit limits, preserving behaviour and accessibility. Explain how those
  boundaries help keep local exceptions from silently becoming general rules.
- In that same round explain applicable verification, including structure/link
  checks, offer run or skip, and recommend running it. Wait before any verification;
  source inspection and the saved work list can proceed.
- The word automatically authorises continuation, not delegation of mode choice.
  It also does not decide verification. Wait for missing decisions before dependent edits.
- Do not ask for batch size or permission to survey. Preserve runtime files,
  existing contract promises and lifecycle statuses while awaiting answers.
- Do not replace the request with standalone escape-hatch analysis or claim completion.

**Independent variant — choose the setup offer:** Start after prepared connection
with its offer of full automatic contracts-only migration and saved verification.
Replace the Request with:

> Yes, complete the full contracts-only migration you offered. Run verification.

Use the handoff's mode 3, whole-project scope and verification. Do not ask for mode,
permission to start or batch size. Save progress and complete automatic batches while
preserving runtime code and appearance. Standalone migration's missing-mode question
still applies to the base scenario.
