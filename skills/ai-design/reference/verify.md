# Verify the affected UI or component

Read [the shared model](model.md), the
root DESIGN.md and [verification procedure](verification-procedure.md).
Missing DESIGN.md context is missing evidence: report it and route [setup](setup.md).
Verification checks the actual changed composition or component preview and its
required surrounding relationships. The caller owns repairs. A standalone review
reports findings and records applicable gaps without starting implementation.

## Static verification

Read the selected pattern, layout and component contracts. Check actual imports,
helpers, inputs, slots, events, region order, grouping and every consumer obligation,
including labels, error associations and form ownership. Check required rules and
conditions of any exception; distinguish recommendations from mandatory constraints.

Check selected token definitions and shared design rules: role, type, theme/alias
resolution and constraints. For consumer choices, verify that the consumer controls
the property or uses a supported contract setting. Equal values alone do not justify
substituting roles. Craft also checks implementation-owned values against the
component's promised appearance and applicable system rules.

Check the [basis for affected API values and visual variants](gaps.md#check-the-basis-for-choices),
including differences between comparable uses. Missing guidance reaches the gap gate
even when the values are accepted by the API and technical checks pass.

Confirm new managed product uses are discoverable. Craft may check draft component
previews to establish evidence without admitting them or permitting product use.
Preserve existing deprecated uses outside
scope and report affected migration guidance. Inspect unmanaged fallbacks against
their code, tests and consumers; report the limits without inventing a contract.

Run the relevant test/composition commands from DESIGN.md, recording each command,
working directory, exit result and evidence path or output. For each affected entity
report `Contract check: <id> — valid|invalid` with a reason for invalid use. For a
pattern/layout include its required composition rules, not just component API calls.

Complete when all affected calls and relationships have a result. Return failures to
the caller for repair within its authorised workflow, or report the remaining defect;
a failed check is never a pass.

## Behavioural and visual verification

Render the changed screen with the application or preview instructions in DESIGN.md.
Exercise the changed behaviour, native submission/validation, keyboard/focus and
required states. Measure layout, spacing, sizing and typography against the linked
visual source using the procedure. Inspect relevant supported themes/viewports.
Browser absence does not prevent static work, but leaves these properties unverified.
Unit DOM output alone is not rendered layout or interactive-browser evidence.

Complete when each affected observable promise has passing evidence or an explicit
failed/unverified result. With no visual reference, verify documented layout and
behaviour; mark undefined visual comparisons unverified rather than invent values.

## Report and gap gate

Report static, behavioural and visual outcomes separately, with evidence and limits.
The following labels are illustrative; equivalent prose or a table is sufficient:

```text
Static: pass|fail|unverified|not applicable — <evidence>
Behavioural: pass|fail|unverified|not applicable — <evidence>
Visual: pass|fail|unverified|not applicable — <evidence>
```

Use `not applicable` only when the task changes no property of that kind; a missing
tool is `unverified`. Include the reconciliation match count when a reference exists
and one row per deviation. Existing independent violations are incidental findings.

For a reusable system limitation, contract drift, contradictory guidance or design
conflict read and follow [gap recording](gaps.md),
then report `Gap gate: recorded — <title>`
or `Gap gate: none`. Complete means no failed applicable checks; fully verified UI
also requires no unverified affected visual or behavioural property. Documentation
work can finish with runtime checks not applicable. Contracts and shared code stay
unchanged here; return defects to the workflow that owns them.
