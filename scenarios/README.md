# Validate ai-design with other agents

Scenarios test decisions and resulting UI, not the wording of an agent's response.
A worker performs the Request in an isolated copy. One independent evaluator reviews
the selected results using [the semantic rubric](evaluate.md). `grade.mjs` collects
those assessments; it does not parse the worker's prose or decide correctness by regex.

## Run independence

Start every run from scratch. The controller, workers and evaluator must completely
ignore previous runs, including their prompts, responses, artifacts, logs, grades,
conclusions and remembered context. Do not inspect or reuse `scenarios/runs/` or other
prior-run storage when preparing, executing or evaluating a run. Use only the current
source snapshot, selected scenarios and evidence produced in this run; repeat every
required step even if an earlier run already completed it. Keep previous runs intact
as archives, outside the current run's inputs.

## Scenario format and coverage

Each scenario names the ai-design Skill, Design, Request and human-readable Expected
criteria. Route optionally selects craft, use or a standalone procedure; omit it to
test automatic routing from the request.
A Reference optionally narrows the scenario to one supporting procedure of that skill.
Apply any controller-only Preparation in a scenario before dispatch.
Workers see only the Request and its skill/route/DESIGN.md/reference. The evaluator sees the criteria
and the same contracts alongside actual results and artifacts. Full candidate lists
are required only when a request explicitly asks for comparison. Required contract
formats and APIs remain fixed; free-form evaluation applies to agent reports.

| Behaviour | Scenarios |
| --- | --- |
| Task and API determine selection or rejection | discovery/01–04, 06, 08, 11, 15 |
| Hidden/unmanaged entries do not become managed choices | discovery/08, 14 |
| Missing facts require a validity decision | discovery/07, 12, 21; build/01 |
| Permitted preferences allow progress | discovery/13, 18 |
| Layout, surfaces and controls have distinct responsibilities | discovery/09, 16, 17 |
| Ranking follows task, context and fewer assumptions | discovery/18–20 |
| Page patterns and prescribed dependencies guide composition | discovery/22; build/02 |
| Adoption, intended contracts, compatibility, lifecycle and gaps | authoring/01–08; gap-record/01–02 |
| Root DESIGN.md connection without page adoption | setup/01 |
| Automatic use routing and system-gap handoff | build/03 |
| Component implementation and admission authority in craft | authoring/09 |
| Explicit migration and default decisions for component API extensions | authoring/10 |
| Coherent maintainer proposals and scoped delegation without repeated questions | authoring/11–12 |
| Automatic craft routing with no pre-existing system | setup/02 |
| Semantic token roles and theme alias values | discovery/23 |
| Gap triage, evidence-based cleanup, priorities and owner decisions | triage/01–02 |

These are scenario coverage, not a claim that every model has passed. Production setup, unmanaged product fallback and deprecated migration still need model runs.
Fixture tests alone do not establish agent selection or browser correctness.

## 1. Prepare isolated copies

Record commit, working-tree changes and the controller/worker/evaluator runtime versions,
requested and resolved model ids, effort and effective tool/permission settings. Record
unavailable fields explicitly. Freeze the actual source, including uncommitted files, once;
exclude scenario expectations/history and grader tests from workers. From repo root,
with existing dependencies installed:

```sh
run=$(mktemp -d /tmp/ads-run.XXXXXX)
mkdir -p "$run/execution" "$run/preparation"
copy() {
  mkdir -p "$1"
  rsync -a --filter=':- .gitignore' --exclude=/.git --exclude=/scenarios \
    --exclude=/node_modules --exclude=/test/grade.test.mjs --exclude=.DS_Store \
    ./ "$1/"
  ln -s "$PWD/node_modules" "$1/node_modules"
}
copy "$run/_source"
for s in scenarios/*/*.md; do
  id=$(basename "$s" .md)
  mkdir -p "$run/$id" "$run/evidence/$id"
  rsync -a "$run/_source/" "$run/$id/"
done
```

The copies share only installed dependencies. Check that ignored build outputs and
unrelated agent history were not included; verify symlinks such as CONTEXT.md survived.
Save each scenario's exact controller preparation as a patch against `_source` in
`<run>/preparation/<id>.patch` before dispatch. This distinguishes worker changes from
prepared gaps, including when removing a prepared gap produces an empty final diff.
Select a small representative set or all
scenarios; give each worker fresh context without this conversation or prior results.

## 2. Dispatch workers

Extract only the scenario's Request and its skill/route/design/reference; controller
Preparation and Expected criteria stay outside the worker's prompt and accessible copy.
Fill this prompt and save the exact dispatched prompt:

For a Reference scenario, replace the first instruction with
`Read <copy>/skills/ai-design/SKILL.md for context, then follow <copy>/<reference> for this request only.`
This tests the procedure without requiring an unrelated full UI build.
For a Route scenario, include `Use ai-design <route> for this request.` after reading
the entrypoint. With no Route or Reference, let the entrypoint choose from the Request.

```text
Read and follow <copy>/skills/ai-design/SKILL.md.
Design: <copy>/<design>.
Work inside <copy>. You may also write gate prompts, complete answers,
scratch artifacts and executable logs to <run>/evidence/<id>, and your
complete final response to <run>/<id>.result.md. Keep gate evidence outside
project files. Do not read scenario expectations or earlier evaluations.

Request:
<Request verbatim>

If a required human answer is missing, report the question and any valid
provisional choice, then stop; nobody will answer in this run.
Before finishing, save your complete final response verbatim to the result file.
```

For discovery, use this separate prompt:

```text
Read <copy>/skills/ai-design/SKILL.md and follow ai-design discovery.
Design: <copy>/<design>.
This task is the discovery stage: return a selection/composition decision in the
conversation. The Request describes the intended UI; implementation belongs to the
caller. The caller also saves your answer, records gaps and handles pending questions.
Use only reading and searching inside <copy>. Leave all files unchanged, including
gap journals, tests, reports and temporary files. Return after the decision.
Do not read scenario expectations or earlier evaluations.

Request:
<Request verbatim>

If a required human answer is missing, report the question and any valid
provisional choice, then stop; nobody will answer in this run.
```

Enforce the discovery boundary in the launcher: expose only read/search tools, with no shell,
code execution, writes, delegation, hooks or external-tool routes. Entry-point and
procedure instructions are not runtime enforcement. For Claude Code, use the native restricted
mode and an explicit built-in tool set. Save this command as the worker's `launch.sh`
with concrete absolute paths, model id and effort; execute it from the isolated copy:

```sh
claude --print --restricted --tools 'Read,Glob,Grep' \
  --allowedTools 'Read,Glob,Grep' --permission-mode dontAsk \
  --strict-mcp-config --mcp-config '{"mcpServers":{}}' \
  --settings '{"disableAllHooks":true}' --disable-slash-commands --no-chrome \
  --no-session-persistence --model '<worker-model-id>' --effort '<worker-effort>' \
  --output-format stream-json --verbose \
  < '<run>/execution/<id>/prompt.txt' \
  > '<run>/execution/<id>/trace.jsonl' \
  2> '<run>/execution/<id>/stderr.log'
worker_exit=$?
printf '%s\n' "$worker_exit" > '<run>/execution/<id>/exit-code.txt'
exit "$worker_exit"
```

Run the launcher without shell `errexit` so a failed process still records its exit.
Verify the installed CLI supports these flags before dispatch; another host must offer
equivalent enforced capabilities. If it cannot, report this run configuration as
unavailable instead of silently granting broader tools. Check the runtime init event's
tool set and permission mode, and retain denied tool calls in the trace. An unexpected
capability invalidates the restricted-run claim; an attempted forbidden action still
needs evaluator review even when the runtime blocks it.

The controller saves the complete final answer verbatim from the successful terminal
result event to `<run>/<id>.result.md`; keep the original trace as well. A missing/error
result is an execution failure, not an empty successful answer. Compare tool traces
and the project diff: an empty diff alone cannot establish read-only execution.

For every controller, worker and evaluator invocation, preserve the exact prompt,
launcher/arguments, working directory, non-secret effective settings and available
system/developer instructions under `<run>/execution/<role-or-id>/`. Include raw tool
calls/results, permission denials, stderr, exit status and runtime identity/settings;
state which instructions or events the host cannot export. Archive referenced config
files alongside the launcher; never substitute remembered settings or a final-response
summary for execution evidence. Keep credentials out of these records.

The controller does not modify a copy while its worker runs. Skill-required gate
workers get fresh contexts and only their specified inputs. Keep prepared expected
gate outcomes separate from those inputs. Save full prompts, replies and artifacts.

## 3. Capture artifacts and execute checks

After workers finish, create a new output directory; never overwrite a previous run.
For each selected id capture the raw result, a complete diff (including new files),
and its evidence directory:

```sh
out=scenarios/runs/<timestamp>-<model>
mkdir -p "$out"
cp "$run/$id.result.md" "$out/"
diff -ruN -x node_modules -x dist "$run/_source" "$run/$id" > "$out/$id.changes"
cp -R "$run/evidence/$id" "$out/$id.evidence"
```

`diff` exit 1 means changes were found, not execution failure. Keep empty .changes
files for read-only results. After all invocations, including evaluation, archive their
execution records and preparation patches. Freeze scenarios/rubric/collector before
dispatch and retain that snapshot, rather than copying potentially changed files later.
Archive `_source` excluding node_modules. These artifacts must allow reconstruction
without the original /tmp directory:

```sh
cp -R "$run/execution" "$run/preparation" "$out/"
tar -czf "$out/_source.tar.gz" --exclude=node_modules -C "$run" _source
```

Record the source commit and dirty changes in run metadata. Before evaluation, make
worker execution evidence available to the evaluator; after it finishes, add its own
execution records to the archive too.

Run relevant contract checks and focused tests against final worker artifacts. Save
commands, working directories, exit codes and full stdout/stderr. For builds, add the
smallest controller-owned assertions for target existence, mandatory composition and
requested behaviour. Include one deliberate invalid composition. Put controller tests
in a separate copy made after capture, so they cannot appear as worker changes.
For build/02, copy [check-settings.test.tsx](check-settings.test.tsx) beside the
generated contact-settings.tsx in that verification copy and run its focused Vitest
command. It checks the target, local submission and a displaced-fieldset mutation.

Keep the exact source of every controller-created helper and test in
`<out>/checks/scripts/`, including its invocation and how it is placed in the verification
copy. A log naming a helper left only in /tmp is insufficient. For contract validation,
use the correct group and pass the component/layout indexes and PATTERNS.md together on
each invocation so duplicate ids/targets across indexes are checked. Treat an alternate
component index as a separate configuration, not an additional simultaneous index.
Inspect checker output as well as exit status; an empty CLI result does not prove that
any contract was checked.

Do not substitute test-count or log-word checks for working assertions. Browser checks
remain necessary for the affected browser properties unless explicitly unavailable;
record that limit rather than claiming a rendered result from DOM tests.

## 4. Independent semantic evaluation

Give one fresh evaluator the rubric, selected scenarios, source and final artifacts,
raw results and executable evidence. Do not give it old grades or controller findings
as the desired conclusion. It may assess the selected batch; no second voting agent
is needed. Save its prompt and exact identity/settings.

```text
Follow <snapshot>/evaluate.md to evaluate <selected scenario paths>.
Source snapshot: <source>. Final copies: <paths>.
Raw responses, complete changes and executable evidence: <out>.
Write <id>.assessment.json for each selected scenario into <out>.
Read the supplied requests, criteria and relevant contracts. Assess actual
choices, stated reasons and artifacts; ignore response formatting. Do not
modify worker artifacts, expectations or raw results. If required evidence
is missing or a criterion conflicts with the sources, identify it explicitly.
```

## 5. Collect and compare

```sh
node scenarios/grade.mjs "$out" > "$out/grade.md"
```

The table contains `pass`, `fail`, `unverified` or `not run`, with the evaluator's
reason. Missing assessments/evidence remain unverified; they are not model failures.
The JSON record has a small transport format; worker responses have no grading schema.

Compare models on the same source and criteria using independently produced results.
Preserve every failure and retry. Each retry is a fresh run under the run-independence
rule above. Never overwrite an old grade with this collector's output. Save disputed
judgments for separate review.
