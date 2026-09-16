# Connect without mandatory page adoption

**Skill:** design-system
**Route:** setup
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> Connect mini-ds to the framework using its existing sources. You may inspect
> pages you find automatically. No adoption or independent demonstration is
> requested; no page has been selected. Complete the ordinary connection.
> Run the applicable verification checks.

**Expected:**

- Use plain language matching the user's language in questions, explanations and
  reports; briefly explain new technical terms at first mention.
- At the first mention of an escape hatch, explain a controlled local exception with
  a required reason and explicit limits, preserving behaviour and accessibility.
  Explain how these boundaries help prevent exceptions from becoming general rules.
- Determine agent mode before changes. The fixture's AGENTS.md selects multiple
  agents; use it as canonical and create a relative CLAUDE.md symlink to it.
  Use root DESIGN.md. Migrate existing component/layout/pattern contracts to
  design-system/components/, design-system/layouts/ and design-system/patterns/,
  one entity per file, with uppercase COMPONENTS.md, LAYOUTS.md and PATTERNS.md indexes.
- Move id/status into contract frontmatter and list actual root-relative source files.
  Update affected references while preserving public promises, code and token values.
- Inspect useful existing pages without asking the user to choose one. Connection
  does not require adoption, admission or analogous-page generation.
- Record missing token catalogue/browser capabilities honestly; no invented commands.
- Analyse repository skills during the survey without an analysis opt-in. When no
  other repository skills are present, continue without a replacement question.
- Connect both the open journal and archive through DESIGN.md. Preserve existing
  records; initialise a missing archive with a title and no historical recovery.
- Ask "What next?" with four explicit selectable options in order: A — automatic
  migration (recommended), B — gradual adoption, C — API and consumer analysis,
  D — stop here. Merely mentioning automatic migration below the question fails.
- Explain that A completes the selected scope across all batches with saved progress;
  B adds contracts, checks and admission with pauses after batches; C saves
  recommendations without implementation; D ends with the completed connection.
- If the available question tool cannot show all four options, use the separate
  text question format rather than omitting an option.
- Finish connection without starting a follow-up or requiring an answer for connection
  completion. Reconcile connection documents before the offer. Defer migration-mode
  and batch-size questions until a step is chosen; a later next-step failure cannot
  reopen or invalidate the completed connection.
