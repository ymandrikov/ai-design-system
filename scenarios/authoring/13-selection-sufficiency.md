# Author contracts that distinguish nearby uses without implementation knowledge

**Skill:** design-system
**Route:** craft
**Design:** fixtures/tie-ds/DESIGN.md
**Request:**

> Define two intended React contracts in one batch. The rough descriptions are
> Badge: "a non-interactive inline tag", and PositionDots: "dots for a short set".
> These approved rules explain their intended meaning:
>
> Badge annotates a nearby object with a brief textual status, role or count. It
> is not standalone prose, a message with a body or an interactive control. Its
> text supplies its meaning. Use the same presentation for all meanings; the
> consumer supplies the text and places it beside the object it describes.
>
> PositionDots shows the current position in a finite ordered set of peer pages,
> one dot per page. Every page is freely selectable; clicking a dot requests that
> position. The owning composition provides labelled previous/next controls and
> a readable current/total summary. These dots are not a completion meter or a
> sequence of required workflow steps. The consumer owns count, zero-based current
> position and navigation; there is no established maximum count policy.
>
> Finish the contracts and index entries. Choose remaining intended API and
> accessibility details consistently with these rules; I delegate those decisions.
> Keep both hidden and implementation for a separate task. Use ordinary quality.

**Expected:**

- Create two structurally valid hidden contracts with sources: [] and index links;
  preserve existing entities and the fixture's lack of runtime implementation.
- Explain each instance's meaning and relationship to surrounding content through
  observable request facts. Badge distinguishes annotation from loose text or a
  message; PositionDots distinguishes location among peers from progress or required
  steps. Neither rough description is sufficient on its own.
- Explain non-obvious boundaries or illustrate them with brief scenarios. Keep
  explanations/examples beside the conditions they clarify and examples non-exhaustive. Do not
  invent a numeric dot-count ceiling, particular screen requirement or bullet quota.
- Treat consumer-provided names, navigation controls and summaries as composition
  obligations rather than rejecting a new composition because it has not been built.
- Use ordinary author checks; do not require independent discovery merely because
  contracts are new. Compare both intended boundaries against existing competitors.
- Exercise a new suitable context for each target and a nearby unsuitable case:
  for example a queue's count annotation versus standalone waiting instructions,
  and peer image positions versus ordered approval stages. Badge versus Button
  alone and PositionDots versus percentage progress alone are insufficient.
- Report decisions and deciding clauses. A correct id with an invented reason
  fails. Independent discovery and consumption require an explicit task or project
  requirement. Do not claim runtime or browser verification.
- Reject copied or paraphrased selection criteria as gate requests, even if answers
  match. Requests must describe independent product situations with a deciding fact.

Repeat with a fresh discovery worker unavailable: ordinary author checks still permit
completion of the intended contracts. Repeat with independent discovery explicitly
requested: use a fresh public-only context for the batch; if unavailable, report that
requested check as pending. Do not run unrelated checks to compensate.
