# Triage a mixed journal without repairing the system

**Skill:** ai-design
**Route:** triage
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:** In the isolated copy, keep the existing Toggle gap and append
the following entries to `fixtures/mini-ds/design-system/gaps.md`. Treat their
Source and Need as supplied request facts; leave the system artifacts unchanged.

| Title | Source / Need | Actual result | Expected result | Evidence |
| --- | --- | --- | --- | --- |
| Expired-token warning | API settings: users need to understand why credentials stopped working | No shared inline warning fits | A discoverable inline warning describing the expired token | No warning entry in the component index or PATTERNS.md |
| Credential warning in integrations | Integrations settings: the same expired-token warning also needs a renewal action | No shared inline warning fits | The warning supports an accessible renewal action as well as the explanation | Same missing capability as the API settings report |
| Experimental separator | One experimental screen needs unique decorative artwork, with no shared requirement | No managed component matches the artwork | The screen can show its one-off decoration | Product-specific request; no applicable shared promise is violated |
| Immediate-action discovery | Find a component for one ordinary action with a visible text label | Previously nothing fit | Discovery can select a discoverable component for this request; runtime and visual verification are outside this entry's expectation | Current inventory and linked contracts |
| Clipboard runtime | Copy one known string in a secure browser context | Browser behaviour has not been demonstrated | Discoverable copy action and successful clipboard writing in a real browser | CopyButton exists; DOM tests alone do not demonstrate browser clipboard access |
| Missing visual evidence | A reporter says a shared control violates its visual specification | The screenshot and specification cited by the reporter are unavailable | The control matches the authoritative specification in the reported state | Only this report is available; neither the control nor the state is identified |

**Request:**

> Run ai-design triage on the open gap journal. Update the journal and recommend
> next steps. Browser access is unavailable in this run.

**Expected:**

- Read the journal and verify entries against relevant system sources; confine
  project changes to the journal and archive and perform no repairs or admission.
- Merge the two warning entries by their shared cause, retaining both sources,
  the explanation, discoverability and accessible renewal-action expectations.
  Archive the removed duplicate's full original record as Merged with the shared
  cause and a working link to the retained open entry.
- Archive the experimental separator as Dismissed with evidence explaining why it
  is an erroneous system-gap record; distinguish this from a demonstrated repair.
- Archive Immediate-action discovery as Resolved after actual contract-based selection of Button;
  its original expectation is selection only, so runtime evidence is unnecessary.
- Every archived entry preserves its source, original expectation and evidence and
  adds a Closed date and disposition basis. Resolved includes Resolution and Verified by.
  Remove archived entries from the open journal; preserve existing archive records.
- Retain Toggle: its implementation is unmanaged, so it does not satisfy the
  original discoverability expectation. Do not add it to the index.
- Retain Clipboard runtime with the browser verification limit. Retain Missing
  visual evidence with concrete missing facts; absence of evidence is not dismissal.
- Report evidence for every removal, retained limitations and actionable next
  steps. Recommend an explained work order without inventing impact or reach.
