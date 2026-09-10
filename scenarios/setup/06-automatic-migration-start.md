# Ask for migration boundaries without asking for batch size

**Skill:** ai-design
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> Fully automatically migrate this whole codebase to ai-design-system.

**Expected:**

- Route to setup’s automatic migration stage, inspect real sources and save the
  discovered scope.
- Ask for the missing mode and separately for business-logic authority in one
  numbered conversational round. Offer all three modes, recommend mode 3 and
  recommend leaving business logic unchanged.
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
