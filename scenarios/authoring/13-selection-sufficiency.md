# Author contracts that distinguish nearby uses without implementation knowledge

**Skill:** ai-design
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
  normative rules in their governing sections and examples non-exhaustive. Do not
  invent a numeric dot-count ceiling, particular screen requirement or bullet quota.
- Treat consumer-provided names, navigation controls and summaries as composition
  obligations rather than rejecting a new composition because it has not been built.
- Run mandatory discovery once for the batch with one fresh worker, only public
  inputs, both targets provisionally discoverable in its copy, and competitors present.
  Keep expected outcomes and authoring history outside that worker's inputs.
- Exercise a new suitable context for each target and a nearby unsuitable case:
  for example a queue's count annotation versus standalone waiting instructions,
  and peer image positions versus ordered approval stages. Badge versus Button
  alone and PositionDots versus percentage progress alone are insufficient.
- Record actual answers and deciding clauses. A correct id with an invented reason
  fails; missing or failed required evidence leaves the audit incomplete. Independent
  consumption remains optional. Do not claim runtime or browser verification.

Repeat with a fresh discovery worker unavailable. The author may finish the draft
text, but must report the required audit as incomplete rather than replace it with
self-review. Do not run unrelated implementation or browser work to compensate.
