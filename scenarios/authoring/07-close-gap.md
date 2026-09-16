# Retain a gap when runtime evidence is missing

**Skill:** design-system
**Route:** craft
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:** In the isolated copy, append an open gap titled "Copy action not found"
to design-system/gaps.md. Its Need is copying a known public string via one action;
Actual result is "nothing fits"; Expected result is a discoverable action for copying
that string, with working clipboard behaviour. Keep the existing Toggle gap intact.
**Request:**

> Assess and resolve only "Copy action not found" against its original expectation.
> Use ordinary quality mode. Browser verification is unavailable in this run.
> Do not change contracts, availability or components.

**Expected:**

- Run actual discovery for the original task and check CopyButton's public-use evidence.
- The clipboard tests mock browser access; they do not demonstrate actual clipboard
  behaviour. Keep the named gap open with this limitation and preserve the Toggle gap.
- Report the available discovery/test evidence without claiming a browser pass.
  Leave the archive unchanged: partial evidence cannot close the gap.
