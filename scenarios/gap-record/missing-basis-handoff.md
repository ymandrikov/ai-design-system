# Record a missing choice basis after read-only discovery returns

**Skill:** design-system
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- In an isolated mini-ds copy, remove Button's variant-selection rules while keeping
  its accepted values, defaults, contract, index and implementation present. No other
  authoritative source explains when primary or secondary is appropriate.
- Keep `design-system/gaps.md` connected through DESIGN.md and record its original
  content for comparison.

**Request:**

> Discover the control for an ordinary Refresh action and determine whether its
> primary or secondary variant is justified. Discovery must remain read-only. After
> discovery returns, record any missing design-system rule as a gap; do not repair it.

**Expected:**

- The caller runs discovery with public selection inputs. Discovery selects Button,
  returns the missing variant-choice basis and leaves every file unchanged; accepted
  values, a default and implementation use do not supply the missing rule.
- The request explicitly authorises the caller to run gaps after discovery returns.
  That separate call adds one open entry with the actual request, missing Expected
  result, source evidence and resolvability assessment, then returns to the caller.
- Preserve the distinction between a rule read, a procedure call with a return and a
  handoff. Do not make discovery writable, rerun it through gaps or treat its result
  as authority to invent the rule, alter Button or start craft.
- Report the exact saved gap heading and verified journal line. Preserve unrelated
  entries and leave the missing rule unresolved.
