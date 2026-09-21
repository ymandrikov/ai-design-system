# Recommend nested groups using existing layouts

**Skill:** design-system
**Route:** discovery
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> Advise how to organise a local introductory region containing a heading,
> an explanatory paragraph and a help button. The heading and paragraph belong
> together with small spacing; use large spacing between that group and the
> button. This is neither a form nor a semantic list. The existing host owns
> width and inset. Explain the arrangement and what I can adapt.

**Expected:**

- Recommend an inner Stack with small spacing for heading/paragraph and an outer
  Stack with large spacing between that group and the Button. Explain the grouping
  and use supported public settings; the request supplies their selection basis.
- Preserve host ownership of width/inset and consumer ownership of heading level,
  content and button behaviour. Identify those choices without inventing a surface.
- Reuse existing layouts without proposing a new reusable entity or calling this
  local composition a managed pattern. No mandatory clarification of settled choices.
- Return concise advice and leave all files unchanged.
