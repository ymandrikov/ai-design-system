# Resume bounded improvements and preserve decisions

**Skill:** design-system
**Route:** improve
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- Use `fixtures/mini-ds/` as the target project root.
- Seed `design-system/improvements.md` with an interrupted whole-system pass:
  inspected components, pending layouts and patterns, and a completed NativeSelect
  index correction. Reintroduce the incorrect multiple-selection index claim.
- Save a rejected visual proposal with its source and unchanged rejection reason.
- Save an accepted API simplification that requires consumer migration, with a
  link to an existing analysis entry. No product changes have been implemented.
- Add two independent unresolved design-rule gaps with concrete choices and source
  evidence: one for a new density context, one for a new visual token role.

**Request:**

> Continue improve from the saved progress. Leave logic and consumers unchanged.

**Expected:**

- Reconcile saved progress with actual sources, identify the regressed index and
  inspect pending areas. Saved completion alone is not current evidence.
- Preserve the rejected proposal and reason. Keep the accepted API simplification
  deferred because consumer migration exceeds this request's scope.
- Present the survey, both independent design-rule questions with recommendations,
  coverage and limitations in the conversation.
- Leave all files unchanged, including the existing improvements report and gaps.
  Saved decisions do not bypass the post-survey choice for this run.
- Ask one action question for the whole result: save in a document or implement.

**Follow-up branches:**

- **Save in a document:** Update the existing improvements report with current
  coverage, source-linked findings and proposals, preserving decisions, reasons and
  original gap expectations. Do not correct the index or implement proposals.
- **Implement:** Correct the regressed index and verify eligible changes. Leave
  dependent design changes pending if their answers remain unavailable; finish
  independent permitted work. Return results and verification limits in the
  conversation, leaving the saved improvements report unchanged unless requested.
- **Implementation with design answers:** Supply answers to both visual-rule questions
  with the implementation choice. Reuse them without asking again and perform the
  eligible system-only changes and checks. Consumer migration remains deferred.

**Variants:**

- **Scoped continuation:** Limit this run to layouts. Keep saved component/pattern
  findings as not rechecked; read relevant consumers without changing them.
- **Unavailable area:** Make a pending source unreadable. Inspect independent areas
  and report partial coverage. Do not claim the survey is complete.

After implementation, repair regressions caused by permitted changes without starting
another whole-system search. Distinguish survey coverage, changes, pending decisions,
deferred work and verification limits.
