# Ask for migration boundaries without asking for batch size

**Skill:** ai-design
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> Fully automatically migrate this whole codebase to ai-design-system.

**Expected:**

- Route to setup’s automatic migration stage, inspect real sources and save the
  discovered scope.
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
- In that same round explain applicable verification, including setup structure/link
  checks, offer run or skip, and recommend running it. Wait before any verification;
  source inspection and the saved work list can proceed.
- The word automatically authorises continuation, not delegation of mode choice.
  It also does not decide verification. Wait for missing decisions before dependent edits.
- Do not ask for batch size or permission to survey. Preserve runtime files,
  existing contract promises and lifecycle statuses while awaiting answers.
- Do not replace the request with standalone escape-hatch analysis or claim completion.

**Independent variant — choose the setup offer:** Start from a connected fixture
and save verification enabled in `design-system/adoption.md`. Replace the Request with:

> Connection is complete. For "What next?" you offered A — automatic migration
> (recommended), B — gradual adoption, C — API and consumer analysis, D — stop here.
> I choose A.

Treat A as explicit automatic-migration opt-in. Ask only for the missing migration
mode, offering all three and recommending mode 1. Reuse saved verification; do not
repeat the next-step question, ask permission to start, ask for batch size, or choose
mode 1 on the user's behalf. Source inspection and the work list may proceed while
dependent edits wait for the mode answer. Once the mode is supplied, automatic
migration owns all batches without renewed continuation permission.
