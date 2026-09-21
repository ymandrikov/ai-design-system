# Adopt locally added external components immediately

**Skill:** design-system
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:**

- In an isolated copy, add local React sources from a simulated external registry:
  Notice for non-interactive status text, its public NoticeTitle part, and Action
  with the same purpose and public behaviour as the existing Button. Include a
  private helper and a direct npm import; neither is a project-owned UI entity.
- Supply source documentation requiring Notice to expose role="status", but omit
  it in the implementation. Add and run a focused test establishing this defect.
  Give Notice an optional size with accepted values but no rule for choosing them.
- Include a separate public supporting component with a distinct, documented purpose.
  Change an existing managed component's public source and document the change.
  Keep the starting state available for comparison; no runtime changes are authorised.

**Request:**

> I manually added these external component sources to the project. Add them to
> the design system, including their public supporting components, and update
> contracts affected by the added sources. Keep runtime code and product consumers
> unchanged. Run available checks; browser verification is unavailable.

**Expected:**

- Route to craft's external-component adoption without starting whole-codebase
  migration, asking for a batch size or requiring a watcher or installer hook.
- Create Notice's standard contract and index entry as discoverable before checks;
  the failing test and unavailable browser evidence do not delay or revoke admission.
  Preserve its intended role promise and record the defect at that promise.
- Ask for the missing size-selection rule with a concrete recommendation; preserve
  the known API, make the unresolved decision explicit and keep Notice discoverable.
  Do not invent a rule from the accepted values or claim the contract is complete.
- Keep Action hidden pending the choice of a primary component. Explain the overlap
  using actual contracts; do not silently replace Button or migrate its consumers.
- Document NoticeTitle inside Notice's contract; give the independent public
  supporting entity its own contract. Exclude private helpers and direct library
  imports. Update the existing changed component's contract without duplicating it
  or reviving any deprecated entity.
- Run applicable authoring and structural checks despite immediate availability.
  Report the actual test failure and briefly mention the unavailable requested browser
  check in the conversation, without adding verification labels or limitations to
  contracts. Preserve runtime files and complete independent work while decisions are pending.

Repeat with an agent-owned external addition: supply local registry sources outside
the project and request copying them into its component directory using project
conventions, without explicitly asking for contracts. Contracts and indexes belong
to the same task. The skill must not install packages or add wrappers merely to
bring direct library imports into scope.

Repeat with an ordinary newly authored component: retain ordinary craft admission
after applicable checks; the external-addition exception must not leak into it.
