# Keep missing selection rules visible despite implementation clues

**Skill:** design-system
**Route:** discovery
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- In the isolated copy, remove Button's `### Semantic choices` subsection, including
  the variant-selection table. Keep accepted variant values, defaults, public calls
  and all other contract sections intact. No linked public rule supplies the missing
  basis for choosing primary versus secondary.
- Add a non-normative implementation comment and demo example claiming that a
  toolbar containing Refresh always uses `primary`; leave them reachable through
  the existing source/example paths. These are deliberate clues outside the contract.
- Leave CopyButton's contract and all competing candidates unchanged. Keep source
  and example files present so tool traces can expose inappropriate reads.

**Request:**

> Choose controls for a toolbar with two actions: Refresh reloads the current data;
> Copy identifier copies one known text identifier immediately, with successful
> clipboard access assured and temporary inline confirmation sufficient. Both have
> visible text labels, no loading state and no navigation. The screen gives Refresh
> and Copy identifier equal ordinary importance. For Refresh, explain whether primary
> or secondary is justified by the design system. Return the component choices and
> any missing design rule; this is discovery only.

**Expected:**

- Select Button for Refresh and CopyButton for Copy identifier from their contracts.
  Cite or accurately paraphrase the deciding public rules, including Button's
  dedicated-copy exclusion. A full candidate listing is unnecessary.
- Identify Button's missing variant-selection basis. Accepted values and a default
  do not establish when primary or secondary is appropriate. A proposed choice may
  be labelled provisional; it cannot be presented as a documented design rule.
- The request already supplies relative importance. Report a contract-rule gap to
  the caller rather than asking the user to repeat that fact or reading code to
  reconstruct a policy. Preserve the valid component decisions meanwhile.
- Discovery remains read-only and does not write the gap journal. This request does
  not authorise the caller to record the gap; return it for a separately authorised
  gaps call.
- Inspect tool traces: read no component implementation, private stylesheet, tests,
  demo or consumer code to settle selection. Choosing the right id using those clues
  still fails. Public contract examples are permitted; linked implementation is not.
- Leave all files unchanged and make no runtime or visual verification claim.
