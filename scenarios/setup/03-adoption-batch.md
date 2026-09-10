# Enumerate the full scope and stop after the default batch

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

- Complete the ordinary connection, then start migration without asking again.
  Offer API analysis separately without running it.
- Save and link `design-system/adoption.md` with the complete owned scope, including
  the 12 wrappers, unmanaged Toggle and Stack. Group bindings of the same entity;
  exclude product pages, private helpers and the third-party dependency itself.
- Process Button before dependent wrappers. Preserve existing eligibility during
  connection and avoid redundant migration of already complete entities.
- Attempt up to 10 migration items, counting blocked attempts, then save progress
  and stop with remaining work. The word "all" sets scope, not unlimited batches.
- Newly adopted items become discoverable only after applicable craft checks pass;
  unavailable evidence leaves them hidden and unfinished with a reason. Capture
  evidence and remaining work instead of treating written contracts as completion.
