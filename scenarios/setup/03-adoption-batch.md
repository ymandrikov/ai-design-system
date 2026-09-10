# Enumerate the full scope and ask for the batch size

**Skill:** ai-design
**Route:** setup
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- In the isolated copy, add 12 project-owned React wrappers around Button under
  `react/actions/`: Save, Cancel, Retry, Refresh, Download, Upload, Print, Share,
  Copy, Edit, Archive and Delete action buttons. Each accepts only an onClick
  callback and renders its fixed text through Button; Delete uses danger, the
  others secondary. Export them from that directory's public entrypoint and add
  a product usage file exercising all 12. Give them no contracts or index entries.
- Link an authoritative source in DESIGN.md defining those labels, variants and
  immediate-action purposes. Keep existing contracts, statuses and tests intact.
- Include a private rendering helper inside one wrapper and an unwrapped React
  import in the usage file to exercise the scope boundary.

**Request:**

> Set up this project and add contracts for all our reusable components and layouts.

**Expected:**

- Complete the ordinary connection, then prepare migration without renewed permission.
  Offer API analysis separately without running it.
- Save and link `design-system/adoption.md` with the complete owned scope, including
  the 12 wrappers, unmanaged Toggle and Stack. Group bindings of the same entity;
  exclude product pages, private helpers and the third-party dependency itself.
- Order Button before dependent wrappers. Preserve existing eligibility during
  connection and avoid redundant migration of already complete entities.
- Show the scope and remaining count, then ask for the size in an ordinary numbered
  question with 5 and 10 as options, recommend 10, and allow another positive integer.
- Wait for the answer before processing migration items; neither silence nor the
  word "all" supplies a size or authorises unlimited batches. Leave API-analysis
  size unset and do not claim migration checks or admission before processing.
