# Identify next steps and decisions without mandatory classification

**Skill:** design-system
**Design:** fixtures/mini-ds/DESIGN.md

**Preparation:** In the isolated copy, retain the existing journal entries unchanged
and append the following entries with Source, Need, Actual result, Expected result
and Evidence from this table. Give Routing summary a stale Assessment of C.
In COMPONENTS.md, replace NativeSelect's description with a claim that it supports
multiple values. Its contract remains authoritative and unchanged.
Add two dated notes linked from DESIGN.md: both report that an existing density
decision was made, but one says compact and the other regular; neither supersedes
the other. The original decision is held by the system owner and is unavailable
in the repository. The density entry asks only to recover that existing decision.

| Entry | Need / Actual result | Expected result / Evidence |
| --- | --- | --- |
| Routing summary | Single-value selection is misrepresented in the index | Index accurately describes NativeSelect's single-value capability; contract supplies the rule and discovery can verify the correction |
| Existing density decision | Consumers cannot recover the already-approved density from conflicting notes | Notes accurately state the existing decision; the two linked notes are the only available evidence |
| New token role | Consumers need a public token for error text; no public token catalogue exists | A discoverable error-text token with a documented role; DESIGN.md confirms no public catalogue |
| New density policy | A new consumer context needs a shared density rule that has never been decided | An authorised rule for that context; current examples provide no authority, although one owner answer could establish the rule |
| Unspecified recipe | A future page reportedly needs a pattern, but its task and composition are unknown | The original requested recipe is discoverable; no request details or authoritative specification are available |

**Request:**

> Triage only Routing summary, Existing density decision, New token role,
> New density policy and Unspecified recipe. Update their evidence and
> recommend next actions. New token role blocks the current error-message task;
> Routing summary is currently only an inconvenience. Nobody can answer questions
> in this run. Do not implement repairs.

**Expected:**

- For Routing summary, recommend correcting the index from the deciding contract
  and give a reproducible discovery verification path. Leave the incorrect index
  unchanged during triage.
- For Existing density decision, state one concrete question that recovers the
  existing decision without selecting a new policy.
- For New token role and New density policy, describe the required shared changes
  and the decisions needed before implementation.
- For Unspecified recipe, request the missing task and composition facts rather
  than assuming a new pattern is needed. Preserve the original expectation and
  retain the entry.
- Prioritise the blocked token task over the inconvenient routing correction based
  on consequences, independently of the stale Assessment label.
- Produce actionable next steps without assigning or refreshing A/B/C labels.
  Preserve unrelated entries. Do not repair, create rules/tokens, archive unresolved
  entries or weaken expectations.
