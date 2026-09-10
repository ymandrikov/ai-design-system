# Narrow a contract's Purpose

**Skill:** ai-design
**Route:** craft
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> Narrow CopyButton so it is only for secrets and tokens, not arbitrary
> strings. Update its contract and directly affected routing accordingly.
> As the decision owner, I approve this breaking scope; assess current
> consumers and report migration needs before completing it.

**Expected:**

- Narrow CopyButton to secrets/tokens and align the index and Button’s directly affected routing. Recognise that rejecting previously valid arbitrary-string calls is breaking; the owner has already authorised it.

- Inspect structural validation and ordinary public-use and selection audits for both edited contracts. Runtime implementations remain unchanged.
- Assess existing React and markup demo consumers and report migration needs. Do not migrate them or change unrelated contracts.
