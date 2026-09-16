# Deprecate a component

**Skill:** design-system
**Route:** craft
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> I authorise deprecating NativeSelect in mini-ds:
> mark it deprecated in the inventory and stop routing new uses to it from
> other contracts. Preserve their valid-use boundaries. Assess existing
> demo consumers and report migration needs; do not migrate them here.

**Expected:**

- Mark NativeSelect deprecated and remove directly affected routing to new uses, including required pattern dependencies. Preserve the valid-use boundaries of other contracts: Select must still exclude short lists rather than becoming a replacement by deletion of its disqualifier.

- Inspect actual changes, structural checks and ordinary audits for affected contracts. Explain retained demo consumers and migration needs without migrating them.
- Honour existing authorisation. Do not infer completion merely from a status word in the report.
