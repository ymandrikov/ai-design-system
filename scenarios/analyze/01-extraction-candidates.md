# Find reusable UI candidates without starting implementation

**Skill:** design-system
**Route:** analyze
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- Use `fixtures/mini-ds/` as the target project root. Remove its DESIGN.md, retaining
  the design-system indexes, contracts and implementations.
- Add two product views with inline, equivalent copy-to-clipboard controls that
  the existing CopyButton contract can express.
- Add two views for editing notification preferences, each with channel selection,
  dependent delivery settings and a save action. Vary their markup while preserving
  the task and relationships. Neither view has a pattern contract.
- Add an unrelated read-only activity summary with visually similar rows and gaps.

**Request:**

> Analyse the UI codebase for candidates to extract into components, layouts and
> patterns. Save recommendations for later implementation.

**Expected:**

- Reach analyze and inspect the existing indexes and contracts. Missing DESIGN.md
  alone does not trigger setup, connection changes or a blocking question.
- Survey all product UI and shared implementations, rather than just indexed entities
  or a sample of pages. Complete the scope without batch-size or continuation questions.
- Recommend existing CopyButton reuse where its actual API and promises fit. Do not
  propose a competing new copy control just because the code is repeated.
- Evaluate the notification task as a pattern candidate with concrete regions and
  relationships, first comparing the existing settings-page pattern. Recommend an
  extension or new recipe only when the evidence supports the distinction.
- Compare arrangement with Stack before proposing a layout. Visual similarity of
  activity rows alone does not establish the notification task pattern.
- Save `design-system/analysis.md` with coverage, prioritized findings, source and
  consumer evidence, boundaries, differences, benefits, risks and reasons to keep
  considered code local. Record checks actually run and unavailable evidence.
- Preserve implementation, consumers, contracts and indexes. Only evidenced systemic
  shortfalls go to gaps; potential extractions are not automatically defects.

**Variants:**

- **Natural-language routing:** Omit Route and use the same Request; reach analyze.
- **Missing indexes:** Remove `design-system/` too. Report the exact missing
  prerequisites to the caller and stop affected analysis. Context restoration is
  outside the framework; do not invoke or read setup, invent a system or write an
  analysis report.
- **Empty indexes:** Use present but empty COMPONENTS.md, LAYOUTS.md and PATTERNS.md
  with no contracts. Analyze product sources without requiring catalogue population.
- **Single use:** Add one local composite owning focus restoration, keyboard handling
  and accessible announcements. A single consumer does not automatically disqualify
  it; require an evidenced independent responsibility and assess extraction costs.
- **Incomplete evidence:** Make one UI area unreadable to the worker. Continue the
  others, mark that area unavailable and the report partial, without claiming full coverage.
- **No candidates:** Use a tiny connected project whose only page composes existing
  entities with no evidenced shared shortfall. Save coverage and a no-candidates
  result rather than inventing new abstractions or gaps.
