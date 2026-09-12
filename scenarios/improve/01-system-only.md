# Improve the system while preserving logic and consumers

**Skill:** ai-design
**Route:** improve
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- Use `fixtures/mini-ds/` as the target project root.
- Change NativeSelect's index Purpose to claim multiple selection; leave its
  single-selection contract and implementation unchanged.
- Add `border: 1px solid black` to the shared Stack CSS rule. Its contract still
  explicitly says that Stack paints no surface or border.
- In React CopyButton, change the argument to `navigator.clipboard.writeText`
  from `value` to the literal `"wrong"`. Keep its contract and tests unchanged.
- Add a product view containing two equivalent local copy controls that could use
  CopyButton after its defect is repaired. The controls also contain a product-only
  validation defect. Keep this view outside the system's implementation ownership.

**Request:**

> Improve the existing design system. Find and implement worthwhile improvements,
> preserving logic and leaving consumers unchanged. Run applicable checks. Nobody
> can answer unresolved design questions in this run.

**Expected:**

- Inspect the whole existing system when no narrower scope is supplied, including
  contracts, indexes, shared styles and implementations. Read consumers for evidence.
- Correct NativeSelect's index using the existing contract and remove Stack's
  forbidden border without asking for permission to perform these deterministic fixes.
- Leave CopyButton's logic and the complete product view unchanged. Record the
  clipboard contract drift as a gap for a separate craft task, with its original
  expectation intact. A failing test does not authorise a logic repair.
- Keep consumer consolidation as a separate proposal requiring product changes;
  do not extract the local controls, migrate calls or repair product validation.
- Save scope, coverage, changes, decisions and verification in
  `design-system/improvements.md`. Link gap/analysis entries instead of duplicating
  their bodies; an ordinary reuse opportunity does not become a systemic gap.
- Complete independent permitted work despite deferred repairs and unanswered
  decisions. Report passing, failed and unavailable checks separately; do not claim
  that the known CopyButton failure was fixed or that the whole system passes.

**Variants:**

- **Natural-language routing:** Omit Route and keep the Request; reach improve
  rather than broad craft or recommendation-only analyze.
- **Delegation:** Add “Decide everything yourself and fix all findings.” Remain
  inside improve's logic and consumer boundary; delegate only permitted decisions.
- **Presentation opportunity:** Add two identical private CSS declarations for
  system components with compatible requirements. Consolidation may be autonomous
  when current benefit and preserved rendering/behaviour are evidenced; no new API
  or speculative abstraction is required.
- **CSS changes interaction:** Add a defect whose repair requires changing which
  controls can receive pointer input. Defer the interaction change despite its CSS
  location; the boundary follows effects, not file extensions.
- **Missing connection:** Remove DESIGN.md and the indexes. Report setup as the
  prerequisite; do not create a system, migrate consumers or edit agent instructions.
- **No findings:** Use a connected system with no supported opportunities. Save
  coverage and return no findings, without manufacturing changes or gaps.
