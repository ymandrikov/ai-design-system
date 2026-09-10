# Craft the design system

Read [the shared model](model.md) and existing root `DESIGN.md`. Craft owns reusable
components and their implementation, layouts, patterns, contracts, indexes, design
rules and token organisation/values. Use the project's development conventions,
bindings and tools. Product interfaces belong to the separate [use workflow](use.md).

For an existing system with missing connections, follow [setup](setup.md). To create
a system from scratch, inspect the project and the requested scope first. Establish
design intent and needed rules from the brief, authoritative sources and owner
decisions; resolve material missing choices before implementing dependent work.
Use setup to connect those decisions and sources through DESIGN.md and indexes,
then create the requested capabilities here. Empty indexes are valid while building;
absence of a pre-existing system does not prevent craft. Setup supplies connections,
not invented design rules or an unrelated component catalogue.

## Identify the change

For adding contracts across existing components/layouts or a separate escape-hatch analysis,
follow [gradual adoption](adoption.md) for the list, batch limits and completion rules.
Return here for each migration item's contract, audit and admission; an analysis-only
request ends with saved recommendations.

Find authoritative definitions and affected references through DESIGN.md and indexes.
For a UI entity, distinguish creation, adoption, implementation repair, contract
change, clarification and lifecycle change. For tokens/rules, identify the role,
scope and affected consumers.
Classify compatibility: rejecting previously valid use or changing an observable
promise is breaking. State undecidable consequences as an owner decision.

Map affected implementations, contracts, indexes, rules, tokens and public consumers.
Search incoming links and usages before editing shared promises or values. An existing
consumer needs impact assessment; a dependent contract directs future use and may
need correction. Complete when the change's scope and compatibility are understood.

For component creation or public changes, follow the
[maintainer discussion](maintainer-discussion.md) to prepare a coherent proposal and
resolve material choices. For adoption or clarification, use it for uncovered
decisions. Reuse complete briefs and existing delegation without a mandatory interview.

For every extension of a component's public API, including backward-compatible
optional inputs, present the concrete proposal and impact on existing uses. Before
implementing dependent changes, settle whether and which existing uses to migrate,
and what behaviour applies when the new input is omitted. Reuse explicit answers or
resolve choices within delegated authority; otherwise ask for the missing decisions
in one batch. A required input with no default is valid. Recommend preserving existing
behaviour where possible and explain the consequences for current uses. Proceed once
both decisions are settled. Migration concerns uses of the changed component only;
extending other components requires its own scope.

## Edit and audit

Before turning observed variants into contract or design rules, check their basis
using [choice gaps](gaps.md#check-the-basis-for-choices).
Record unsupported choices or rule replacements instead of normalising them.

For UI contracts, follow [contract authoring](contract.md) and the standard structure
in [the model](model.md). Component/layout metadata belongs in contract frontmatter;
pattern metadata belongs in its PATTERNS.md section. New/adopted entities start hidden. Update directly invalidated contract references and index
summaries within scope. Preserve a disqualifier when only its suggested alternative
has retired; report an uncovered need if no replacement fits.

For token organisation, values or shared design rules, follow
[design rules and tokens](tokens.md).

### Design public APIs and escape hatches

When creating or changing a public API, prefer inputs that express consumer intent
and supported system options. Encapsulate established design rules in the component;
use project linters for rules that cannot reasonably be enforced through its API.
For example, if this system defines confirmation button styles and order by intent,
let the dialog own those decisions instead of accepting arbitrary action buttons:

```jsx
<ConfirmationDialog intent="destructive" confirmLabel="Delete organization" />
```

Where local deviations are needed, prefer a clearly named escape hatch with a
mandatory, non-empty reason over unrestricted styling or composition overrides.
Reuse the codebase's exception mechanism; its shape depends on the project's binding
and conventions, not a required prop on every component. This JSX is illustrative:

```jsx
<Badge
  designSystemException={{
    reason: "HTTP method badges must fit 24px inspector rows; the smallest Badge is 28px.",
    attributes: { className: "min-h-0 px-1 py-0 text-xs leading-4" },
  }}
>
  GET
</Badge>
```

Define the permitted deviations and approval conditions in the contract. Restrict
the mechanism to that scope and validate the reason; a generic attributes object
must not silently bypass unrelated behaviour or accessibility guarantees. Treat the
result as a local exception, not a variant to copy into other consumers. Each use,
including a design-lint suppression, follows [exception recording](gaps.md#record-exceptions).
A reason or suppressed warning does not replace required authorisation.

### Audit the implementation

For component creation or repair, implement the promised public boundary using the
project's existing code, styles and development process. Check affected callers
before changing shared behaviour. Verify public use, relevant states, accessibility
and composition with focused project checks; use [verification](verify.md) for
affected browser promises. Keep documentation-only requests documentation-only.
Document-only patterns need no implementation. Complete the implementation audit
when affected promises have evidence or an explicit failed/unverified result.

Use the ordinary audits in those references. If the task or DESIGN.md explicitly
requires independent quality checks, also load [independent gates](blind-gates.md)
for the applicable UI contract changes. That mode supplements ordinary evidence;
it is not a default prerequisite for authoring, admission or setup.

Repair implementation drift within the authorised craft scope; otherwise record
the remaining defect. A contract is not weakened to hide a defect. Craft owns the
agreement between implementation and public promises, including their evidence.

## Apply authorised decisions

Present the concrete changes, affected consumers, migration needs and audit evidence
before asking about unresolved normative rules, admission, breaking changes or
retirement. Existing explicit authority counts. Independent migrations stay outside
scope. A request to add a component to the design system includes admission after
successful checks, unless the request or project policy limits that authority.
Draft creation and documenting an existing component alone do not imply admission.
Admit only when public promises are evidenced, selection/composition checks
pass and the decision is authorised; required optional-mode gates must also pass.
An intended contract with missing implementation remains hidden and its support
unverified. Documentation can be complete without claiming runtime readiness.

## Resolve gaps and report

Only resolve gaps within the task's stated scope. Rerun the original request and
verify every Expected result, including discoverability, behaviour and composition
when required. Hidden adoption or matching Purpose alone cannot close a discovery
gap. After proof, [archive the full entry](gaps.md#archive-an-entry) as Resolved and
report the evidence. Otherwise leave it open with the remaining limitation.
For new systemic gaps, use [gap recording](gaps.md).

Report changed artifacts, compatibility, public-use evidence, affected consumers,
gaps and unresolved decisions. Separate static, behavioural and visual results;
a missing check is unverified, not pass.
