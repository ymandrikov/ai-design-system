# Follow the project's verification procedure

## Obtain evidence

Follow the established project testing and preview procedures linked from DESIGN.md,
using the actual changed component or composition. Assess affected contract promises,
visual sources, supported contexts and any defined tolerances. Record commands or
observations and their results; use the project's methods rather than prescribing
new tests, browser measurement techniques or a screenshot workflow.

When a required procedure or environment is unavailable, record the missing evidence
and continue independent checks. Static markup does not establish runtime behaviour
or rendered geometry. Honour the migration's saved verification choice.

## Reconcile

For each affected reference element or contracted region, check presence, selected
entity, required composition, measured values and states. Report a match count when
there is a reference and one row per deviation:

| Element | Expected | Actual | Cause | Evidence / gap |
| --- | --- | --- | --- | --- |

Causes distinguish product defects/decisions, selection assumptions, contract drift,
system limitations and unavailable tooling. Missing evidence is unverified; it is not
a matching element. With no reference, name the documented promises checked and leave
undefined visual comparisons unverified. Do not fabricate a reference match count.

Report static, behavioural and visual outcomes independently. Fully verified UI has
no failed applicable checks or unverified affected runtime properties. A documentation
change can have behavioural/visual checks not applicable, with that reason recorded.
