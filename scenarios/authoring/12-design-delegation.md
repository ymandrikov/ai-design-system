# Complete an intended contract with delegated design decisions

**Skill:** ai-design
**Route:** craft
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> Define a Badge contract for a short, non-interactive status marker beside an
> item. It supports neutral and error meanings for React and native markup.
> I don't know whether it needs size variants. Choose the remaining design
> decisions for this new Badge and finish its intended contract and regenerate indexes;
> I delegate those choices to you. Keep implementation for a separate task, keep
> existing components and shared rules unchanged, and use ordinary quality mode.

**Expected:**

- Inspect existing rules and components, then exercise the delegated authority
  without asking the user to choose sizes or approve every decision again.
- Define a coherent public boundary and explain the basis for exposed choices or
  a single standard. Either can be valid; a list of sizes alone is insufficient.
- Save rules and concise material rationale in the intended contract, without a
  duplicate questionnaire or unresolved design placeholders.
- Create a hidden Badge contract with sources: [] and keep it out of the component index until admission.
  Keep implementation, other components and shared rules unchanged.
- Run structural validation; assess suitable, unsuitable and edge uses, including
  mandatory independent discovery and a new use beyond copying the contract example.
  Ordinary quality mode does not waive discovery. Runtime and visual behaviour
  remain unverified; delegated design decisions are not implementation evidence.
