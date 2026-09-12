# Fixed contract formats

Component and layout contracts use YAML frontmatter, an H1 name, then exactly the
six H2 headings below in order, with nonempty sections. H3 headings may organise
sections. Group follows the standard directory and its index linked from DESIGN.md.
PATTERNS.md uses an H1 document title, a contents list and an H2 per pattern; its six
sections use H3 and their subsections use H4.

## Detail for agent decisions

Contracts primarily serve agents selecting, configuring and composing entities.
Use enough detail to make those decisions correctly; length is not a quality target.
Add distinctions from alternatives, boundary cases, reasons for non-obvious limits
and worked scenarios when they resolve ambiguity. A contract that already supports
these decisions needs no expansion.

Keep explanations in the relevant existing section, using subsections where useful;
place selection scenarios in Purpose so the selection lists remain checkable criteria.
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
For an intended contract without code, use `sources: []`, keep it hidden and report
implementation as unverified. Empty sources never establish runtime readiness.

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

| Group | Section headings in order (H2 for components/layouts, H3 for patterns) |
| --- | --- |
| component | Purpose; When to use; When not to use; Public API; Behaviour and states; Accessibility |
| layout | Purpose; When to use; When not to use; Public API; Composition; Accessibility |
| pattern | Purpose; When to use; When not to use; Structure; Composition; Verification |

## Shared selection sections

Write **When to use** and **When not to use** as bullet lists, with exactly one
independently checkable criterion per item. Split independently applicable conditions
into separate items; keep an alternative's link with the criterion it addresses.
Each criterion must identify an observable request fact and yield one interpretation.
Define bounds and terms locally when needed: use an explicit option-count range
instead of "a short list", for example.

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

**When not to use** states explicit disqualifiers. Link a known alternative's actual
contract instead of deriving a filename. A missing request fact is not a disqualifier.
Contract exclusions describe the entity's boundary, not every missing system capability.
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

Use [the pattern document template](../assets/patterns.md). Each pattern has a
stable explicit anchor immediately before its H2 name, followed by `ID: <id>` and
`Status: <status>` lines. The anchor equals the id; keep it stable when renaming the
heading. The contents list links to every pattern anchor. ID/status follow the same
rules as component metadata, but live in the pattern section because the file holds
multiple patterns. Patterns need no source-file frontmatter. Link any executable
examples and checks in their Structure or Verification sections.

**Structure** names required/optional regions, their user purpose and order, linked
layout/component contracts, and which choices remain with the consumer. Include one
minimal composition example per supported binding, or a binding-neutral region recipe
when no code is involved. Do not invent an API for a document-only recipe.

**Composition** has H4 Required, Recommendations and Exceptions inside PATTERNS.md. Describe information
grouping, permissible substitutions, nesting, actions and adaptation. Include consumer
accessibility obligations and required behaviour. A pattern cannot relax a dependency's
contract; incompatible dependencies require a decision. Linked public composition
rules are part of the recipe and must be read.

**Verification** names observable checks for a valid composition and an intentional
violation that must be rejected, plus executable check commands/examples where code
exists. Separate static relationships from browser behaviour and visual measurements.

## Visual sources and unresolved decisions

Name the linked visual specification/token/implementation source in Public API,
Composition or Verification where the consumer needs it. Document who owns spacing,
not duplicate pixel values. A consumer-controlled value names the supported input
or token and its meaning. Visual state and applicable contrast requirements remain
verifiable promises; apply the [contrast scope](verify.md#contrast-scope) during audit.

Use native elements, attributes and anatomy where needed for invocation, forms,
composition, events or accessibility. Keep internal DOM dumps out of contracts.
Report unresolved normative choices to [craft](craft.md) rather than filling a contract with
placeholders. Draft work with unresolved choices is incomplete and not admitted.
