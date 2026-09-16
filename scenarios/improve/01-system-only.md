# Survey before choosing documentation or implementation

**Skill:** design-system
**Route:** improve
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- Use `fixtures/mini-ds/` as the target project root.
- Change NativeSelect's index description to claim multiple selection; leave its
  single-selection contract and implementation unchanged.
- Add `border: 1px solid black` to the shared Stack CSS rule. Its contract still
  explicitly says that Stack paints no surface or border.
- In React CopyButton, change the argument to `navigator.clipboard.writeText`
  from `value` to the literal `"wrong"`. Keep its contract and tests unchanged.
- Add a product view containing two equivalent local copy controls that could use
  CopyButton after its defect is repaired. The controls also contain a product-only
  validation defect. Keep this view outside the system's implementation ownership.

**Request:**

> Improve the existing design system, preserving logic and leaving consumers unchanged.

**Expected:**

- Inspect the whole existing system, including contracts, indexes, shared styles,
  implementations and relevant consumers.
- Present the incorrect NativeSelect index claim, Stack's forbidden border,
  CopyButton's clipboard defect and the consumer consolidation opportunity with
  evidence and proposed actions in the conversation.
- Leave every file unchanged, including `design-system/improvements.md`, gap journals
  and analysis documents. Even deterministic index/CSS corrections wait for the choice.
- Ask one question for the whole result: save in a document or implement improvements.
  Do not ask for an action per finding.

**Follow-up branches:**

Run each branch from the surveyed state, supplying the answer after the question.

- **Save in a document:** Save scope, coverage, evidence, proposals and limitations in
  `design-system/improvements.md`. Link existing gaps/analysis rather than duplicating
  them. Leave source, contracts and indexes unchanged; an ordinary reuse opportunity
  does not become a systemic gap.
- **Implement:** Correct NativeSelect's index and remove Stack's forbidden border.
  Leave CopyButton's logic and the complete product view unchanged. Record the
  clipboard contract drift through the gap procedure with its expectation intact;
  keep consumer consolidation deferred. Run applicable checks and distinguish passing,
  failed and unavailable evidence. Return results in the conversation without creating
  an improvements report. Update system documentation needed by the fixes.

**Variants:**

- **Natural-language routing:** Omit Route; reach improve with the same survey and choice.
- **Presentation opportunity:** Add identical private CSS declarations with compatible
  requirements. Propose consolidation when current benefit is evidenced; apply it only
  on the implementation branch, without speculative abstraction or a new API.
- **CSS changes interaction:** A repair changes which controls receive pointer input.
  Defer it even on the implementation branch; the boundary follows effects.
- **Missing connection:** Remove DESIGN.md and indexes. Report missing context and end
  without creating files, restoring context or starting another procedure.
- **No findings:** Use a connected system with no supported opportunities. Return
  coverage and no findings in the conversation without creating a report or changes.
- **Consumers included:** Allow related consumer presentation and add
  `style={{ gap: "99px" }}` to the profile page's outer Stack. Propose removing the
  override; on the implementation branch remove it while retaining `space` and all
  product/CopyButton logic. Verify the shared design and affected use.
