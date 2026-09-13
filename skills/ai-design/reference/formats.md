# Fixed contract formats

Component, layout and pattern contracts use YAML frontmatter, an H1 name, then exactly the
six H2 headings below in order, with nonempty sections. H3 headings may organise
sections. Group follows the standard directory and its index linked from DESIGN.md.
COMPONENTS.md, LAYOUTS.md and PATTERNS.md use the shared [index template](../assets/inventory.md).

## Detail for agent decisions

Write for an agent that knows the request and public design rules but has not seen
the entity's implementation, styles, tests or previews. The contract and its linked
public rules must supply the basis for selecting, configuring and composing it.
Use enough detail to make those decisions correctly; length is not a quality target.
Add distinctions from alternatives, boundary cases, reasons for non-obvious limits
and worked scenarios when they resolve ambiguity. A contract that already supports
these decisions needs no expansion.

Keep explanations and short scenarios beside the condition they clarify, using
subsections where useful. A selection item may state one condition, explain why it
matters and illustrate a nearby case; distinguish that explanation from a new condition.
Explicitly distinguish requirements, recommendations and illustrative examples.
Worked scenarios connect request facts to an applicable rule and then a decision.
Examples illustrate the rules without adding restrictions or exhausting valid uses;
state any normative condition in the section that governs it.

## Contract frontmatter

```yaml
---
id: button
status: discoverable
sources:
  - src/components/Button.tsx
  - src/components/Button.css
tests:
  - src/components/Button.test.tsx
examples:
  - src/components/Button.stories.tsx
---
```

`id`, `status` and `sources` are required; `tests` and `examples` are optional.
IDs use letters, digits, underscores and hyphens, start with a letter or digit, and
cannot be `none`. Status is `hidden`, `discoverable` or `deprecated`. Keep these
metadata values only here; indexes refer to the contract instead of copying them.
`sources` lists implementation files for every supported binding and the styles
that define the entity. Native/CSS-only entities may list just their stylesheet.
For an intended contract awaiting implementation, use `sources: []`, keep it hidden
and report implementation as unverified. A document-only pattern can use `sources: []`
and become discoverable after its selection and composition obligations are checked;
it needs no implementation of its own. Empty sources never establish runtime readiness.

All path fields are lists of concrete files relative to the project root containing
DESIGN.md, using forward slashes. Paths stay inside the project, including through
symlinks; absolute paths, URLs, globs, fragments and `.`/`..` segments are invalid.
Tests and examples point to existing evidence files, not commands or proof of passing.
Check listed files exist. Ordinary Markdown links remain relative to their document.

The standalone checker accepts flat YAML: plain or quoted strings, two-space block
lists as above, and `[]` for an empty list. Use those forms; nested objects, aliases,
multiline values and populated inline lists are outside this format. Quote strings
containing YAML punctuation; double quotes use JSON escapes. Add new metadata fields
with an explicit schema/checker change when a concrete check needs them.

## Section order

| Group | Section headings in order (H2 for all groups) |
| --- | --- |
| component | Purpose; When to use; When not to use; Public API; Behaviour and states; Accessibility |
| layout | Purpose; When to use; When not to use; Public API; Composition; Accessibility |
| pattern | Purpose; When to use; When not to use; Structure; Composition; Verification |

## Shared selection sections

Write **When to use** and **When not to use** as bullet lists, with one independently
checkable criterion per item and its explanation alongside it. Split independently
applicable conditions into separate items; keep an alternative's link with the
criterion it addresses. Supporting paragraphs and examples are allowed in these sections.
Each criterion must identify an observable request fact and yield one interpretation.
Define decision-changing bounds and terms from authoritative evidence or an explicit
design decision. "Short", "compact" or "fits the screen" alone cannot decide a case;
an evidenced option-count range can. Report an unsettled boundary rather than inventing
a numeric limit to make the wording precise.

Explain what each instance represents, the end-user outcome, its relationship to
surrounding content, and the task, data or interaction facts that distinguish it from
the nearest plausible alternatives. Cover only distinctions that affect selection;
there is no required bullet count. For example, "non-interactive inline tag" leaves
Badge indistinguishable from ordinary text. A marker that annotates another item
with its status, role or count supplies a meaningful boundary; standalone instructions
and messages with a body test that boundary more closely than an action button does.
These examples illustrate authoring quality, not rules for every project's Badge.

Write the deciding distinction, not a request for an already chosen presentation:
"needs dots", "needs a badge" or "needs a separator" leaves selection to the reader.
For each plausible competing use found during authoring, explain which task, content
relationship or interaction changes the choice and why. Put selection-changing facts
here even when Public API also explains how to express the resulting composition;
a precise link may supply the shared rule without duplicating it.

**Purpose** describes the task/outcome and means, and the entity's role and guarantees
in the system. Paragraph count is unrestricted. Use words a request can contain. No prescribed
English opener or id-to-name spelling rule. Index Purpose descriptions support candidate
discovery: cover the supported tasks, means and material distinctions from related
components/layouts in words a request can contain. Derive them from the contract and
check that none of its supported tasks would be missed through an omitted purpose.
There is no fixed length; include the detail needed for discovery. Keep exact
applicability conditions in the contract rather than duplicating selection rules.

**When to use** introduces its list by stating whether all or any criteria must hold.
Conditions describe request facts: user task, data or surrounding context. Consumer-supplied labels,
slots and attributes are composition obligations, not reasons to reject an otherwise
suitable candidate before implementation. Prefer explicit positive conditions.
Translate observed call sites into their supported task and context: use on one named
screen does not by itself restrict the entity to that screen. "Needs the prescribed
separator" must link the rule that determines that need or state its deciding facts.

**When not to use** states explicit disqualifiers. Link a known alternative's actual
contract instead of deriving a filename. A missing request fact is not a disqualifier.
Contract exclusions describe the entity's boundary, not every missing system capability.
Address plausible confusions, including ordinary native content or a different
composition when no managed alternative exists. Explain non-obvious limits and why
the alternative fits; distinguish an entity owning a responsibility from participating
in a composition whose parent owns it.
Any listed disqualifier excludes the entity. If there are none, use a single item
stating that there are no disqualifiers.

The two lists must agree: no request satisfying the stated When-to-use logic may
also satisfy a When-not-to-use criterion. Qualify an overbroad positive criterion or
correct an unsupported exclusion from authoritative evidence; do not resolve a
contradiction by giving one section precedence over the other.

## Component

**Public API** has an H3 per supported binding, with a minimal valid example,
inputs/defaults/constraints, children or slots, events and methods (say none when
absent). Explain native-attribute forwarding and component-owned attributes. Include
consumer composition obligations, allowed contexts, semantic choices and reviewed
public overrides. Document valid calls, not incidental implementation permissiveness.
Bindings share promised outcomes; document intentional differences in public use.

For every public parameter, explain its meaning and how the consumer determines its
value. For variants such as size or density, give selection criteria or explicitly
permit free choice within a defined scope. For data and state inputs, identify the
source or derivation; for text and callbacks, state consumer responsibilities and
constraints. Enumerating every possible data value is unnecessary.

Explain when the default is suitable, combination constraints and precedence between
inputs that affect the same result. A general rule can cover combinations without a
full matrix. An accepted-value list or an omission default alone does not explain
selection. Criteria must be unambiguous and consistent with the selection sections.

A precise link to a shared rule may supply this explanation: identify the parameters
it governs and any local exceptions. A generic DESIGN.md, implementation or Storybook
link alone is insufficient. Apply this to forwarded inputs through their applicable
public rules, documenting local restrictions rather than copying platform manuals.

**Behaviour and states** describes observable transitions, edge cases, unavailable
states and native behaviour. Static UI states what it owns without inventing a JS class.

**Accessibility** uses H3 Provided by the component and Required of consumers, naming
owners of semantics, labels, error relationships, keyboard/focus and form state.

## Layout

**Public API** follows the component rules for its actual bindings/regions.
**Composition** has H3 Required, Recommendations and Exceptions. Required names who
owns spacing, size, order, adaptation, grouping and any observable/native behaviour.
Name allowable children and linked component contracts. Recommendations include when
an alternative is reasonable; Exceptions name exact conditions or say none. Distinguish
a suggested example from an invariant. **Accessibility** follows component ownership.

## Pattern

Use [the pattern contract template](../assets/patterns.md) for one file in
`design-system/patterns/`. Keep identity, status and source/evidence paths in
[frontmatter](#contract-frontmatter). PATTERNS.md links to each contract using the
shared index format. Link executable examples and checks from Structure or Verification
and list their files in the corresponding frontmatter fields when available.

**Structure** names required/optional regions, their user purpose and order, linked
layout/component contracts, and which choices remain with the consumer. Include one
minimal composition example per supported binding, or a binding-neutral region recipe
when no code is involved. Do not invent an API for a document-only recipe.

**Composition** has H3 Required, Recommendations and Exceptions. Describe information
grouping, permissible substitutions, nesting, actions and adaptation. Include consumer
accessibility obligations and required behaviour. A pattern cannot relax a dependency's
contract; incompatible dependencies require a decision. Linked public composition
rules are part of the recipe and must be read.

**Verification** names observable checks for a valid composition and an intentional
violation that must be rejected, plus executable check commands/examples where code
exists. Separate static relationships from browser behaviour and visual measurements.

## Visual sources and unresolved decisions

Present one coherent public promise across the contract's sections. Merge relevant
legacy guidance into its governing section, preserving requirements, recommendations
and examples at their original force. Preserve meaning and authority, not duplicate
"preserved guide" blocks for the consumer to reconcile. Move migration history and
general verification caveats to the linked journal or shared rules. Keep concrete
limitations, affected uses and unresolved conflicts visible at the relevant promise;
moving history does not resolve a conflict or waive a requirement.

Make consumer obligations specific and expressible through the documented API or
surrounding composition. For example, a static separator's consumer preserves meaningful
grouping; a navigation control's consumer supplies its destination and accessible name.
A generic accessibility or styling checklist repeated for every entity cannot replace
these obligations. If the API cannot meet a required obligation, name the dependency
instead of instructing the consumer to supply an unsupported prop.

Name the linked visual specification/token/implementation source in Public API,
Composition or Verification where the consumer needs it. Document who owns spacing,
not duplicate pixel values. A consumer-controlled value names the supported input
or token and its meaning. Visual state and applicable contrast requirements remain
verifiable promises; apply the [contrast scope](verify.md#contrast-scope) during audit.

Use native elements, attributes and anatomy where needed for invocation, forms,
composition, events or accessibility. Keep internal DOM dumps out of contracts.
Report unresolved normative choices to [craft](craft.md) rather than filling a contract with
placeholders. Draft work with unresolved choices is incomplete and not admitted.
