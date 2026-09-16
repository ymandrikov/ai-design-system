# Author a specialised contract without narrowing its competitor

**Skill:** design-system
**Route:** craft
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> Define an IconButton contract for native icon-only buttons with an accessible
> name, for toolbars where a text label does not fit. Intended public use supports
> React and native markup. Component development is a separate task. I approve
> this intended boundary; preserve Button's existing text-only contract.

**Expected:**

- Create an intended IconButton contract under design-system/ and a hidden entry.
- Preserve Button, implementations and previews. No new runtime implementation route.
- Check structural and suitable/unsuitable/edge uses against Button as a competitor.
  Do not run independent discovery without an explicit request or project requirement. Identify missing runtime evidence and leave the entity unadmitted.
