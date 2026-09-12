# Propose local spacing when the selection rule is missing

**Skill:** ai-design
**Route:** discovery
**Design:** fixtures/mini-ds/DESIGN.md

**Preparation (controller only):**

- In Stack's contract remove the recommendation to use default spacing for ordinary
  peer blocks. Keep the existing supported values, API default, nesting rules and
  implementation unchanged. Do not add a replacement spacing-selection rule.

**Request:**

> Help organise a local help region with a heading, a related explanatory paragraph
> and a help button. The host owns width and inset. Suggest suitable grouping and
> spacing; I have not decided the spacing yet. This is not a form or a semantic list.

**Expected:**

- Recommend a concrete arrangement with existing Stack/Button capabilities and
  explain meaningful grouping and responsibility for spacing.
- Recognise that the accepted spacing values and API default do not establish
  selection rules. Offer concrete supported values with a grouping rationale as
  proposed decisions, not existing system standards or verified usability facts.
- Return the missing basis and required decision to the caller; no independent
  journal writes. Make the proposal easy to accept or amend, without inventing a
  general rule for every screen or requiring a new layout for this local region.
- Leave all files unchanged.
