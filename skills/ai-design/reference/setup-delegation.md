# Delegate setup work

Use available, permitted subagents automatically for substantial independent work
during connection and automatic or gradual setup migration. Keep small or inseparable
work with the main agent. Respect runtime permissions, user restrictions and capacity;
without execution subagents, continue sequentially. Repository
[agent mode](setup.md#determine-the-agent-mode) selects instruction-file conventions,
not subagent availability. Delegation preserves setup scope, migration mode, batch
limits, continuation rules and the saved verification choice.

## Assign independent work

The main agent owns scope decisions, user questions, integration and shared documents:
DESIGN.md, agent instructions, indexes and progress/gap journals. Subagents return
proposed shared-document updates to it. Delegate source surveys by independent area
and migration tasks by disjoint file ownership, using the existing
[migration plan](migration-planning.md) and work list rather than a second task system.

Before dispatch, give each worker:

- Its concrete result, source paths, applicable skill procedures and authoritative rules.
- The selected scope, mode, restrictions, verification choice and unresolved decisions.
- Exact files it may change, prerequisites already completed and acceptance criteria.
- Required evidence and a request to return changed paths, outcomes and blockers.

Assign each writable file to one active owner; the main agent also respects that
ownership. Read-only surveys may share sources. Complete shared API, token or contract
dependencies before dispatching their consumers. Serialize overlapping changes; if a
worker discovers an unassigned dependency, it reports it for reassignment instead of
expanding its scope. Workers return questions to the main agent for consolidation.
Dispatch only within the current batch for gradual migration, preserving its pause.

## Accept results and recover

Before accepting a worker result, read actual changed files and compare the changes
with the assignment, authoritative sources and related system/consumer contracts.
Integrate shared-document updates and perform applicable enabled checks against the
combined result; repeat evidence invalidated by subsequent edits. A worker's success
report alone is insufficient. With verification skipped, limit acceptance to source,
scope and progress reconciliation and mandatory
[final document reconciliation](setup.md#reconcile-final-documents); retain the saved
unverified status without running skipped audits under another name.

On failure or interruption, continue independent work and pause dependent tasks.
Before retrying, reassigning or finishing the task yourself, ensure the previous
worker has stopped writing, inspect partial changes and reconcile saved progress
with disk. Preserve valid work, record unfinished outcomes and repair or reassign
only the remainder. Mark work complete only after acceptance; preserve blockers and
the next action in existing progress. On resume, revalidate dependencies and ownership
against current files before dispatch.

## Review the final result

When verification is enabled, use a fresh subagent that did not author the work for
one final read-only consistency review after integration and document reconciliation.
For connection followed by an authorised migration, review the resulting migration;
for gradual migration, review before reporting completion of its selected scope.
Give it the settled scope and decisions, source rules, resulting files and actual
check evidence. Have it identify missing results, contradictory documents, scope
violations and unsupported completion claims, with paths and evidence.
Include the [ordinary contract audit](contract.md#ordinary-audit) and the actual
[discovery scenario quality](blind-gates.md#scenario-quality): passing answers to
restated criteria do not establish sufficient contracts or coverage.

The main agent assesses findings against sources, fixes actionable in-scope omissions,
reconciles changed documents and reruns invalidated enabled checks. Have a fresh
review context check affected findings against the corrected final files. Unresolved
findings remain explicit blockers. If an independent reviewer is unavailable, finish
independent work and report verification and setup completion pending; sequential
execution does not substitute for independent evidence.

This review is separate from [independent discovery](setup.md#discovery-during-setup-migration):
preserve its fresh context, public-only inputs and whole-set timing. A reviewer with
implementation access cannot supply that evidence. An explicit verification refusal
skips both independent checks under [migration verification](model.md#migration-verification),
while mandatory final document reconciliation still runs.
