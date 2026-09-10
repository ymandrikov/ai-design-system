# Prefer the viable candidate without an unknown size limit

**Skill:** ai-design
**Route:** discovery
**Design:** fixtures/tie-ds/DESIGN.md
**Request:**

> Use `ranking-inventory.md` as the component index for this request.

> In the team settings form (React), add a field to choose one team by
> typing to filter a fixed list of plain text team names, all available
> when the view renders. The number of teams is not specified. Compare
> Autocomplete and Select using their contracts.

**Expected:**

- Compare the two requested contracts: Autocomplete has no list-length limit; Select requires its 13–500 range. Choose Autocomplete under the fewer-assumptions rule, without blocking on list size. Select is conditional, not disqualified just because size is unknown.

- Discovery leaves project files unchanged.
