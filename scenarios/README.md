# Validate design-system with other agents

Scenarios test decisions and resulting UI, not the wording of an agent's response.
These repository validation procedures do not prescribe a consuming project's
engineering test methodology.
A worker performs the Request in an isolated copy. One independent evaluator reviews
the selected results using [the semantic rubric](evaluate.md). `grade.mjs` collects
those assessments; it does not parse the worker's prose or decide correctness by regex.

## Run independence

Start every run from scratch. The controller, workers and evaluator must completely
ignore previous runs, including their prompts, responses, artifacts, logs, grades,
conclusions and remembered context. Do not inspect or reuse `scenarios/runs/` or other
prior-run storage when preparing, executing or evaluating a run. Use only the current
source snapshot, selected scenarios and results from this run; repeat every
required step even if an earlier run already completed it. Prior user materials stay
outside the current run's inputs; this procedure requires no execution archive.

## Scenario format and coverage

Each scenario names the design-system Skill, Design, Request and human-readable Expected
criteria. Route optionally selects craft, use or a standalone procedure such as
setup or migrate; omit it to
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
| Composition advice, nested layouts, permitted-class recipes and proposed local spacing | discovery/24–26 |
| Adoption, intended contracts, compatibility, lifecycle and gaps | authoring/01–08; gap-record/01–02 |
| Root DESIGN.md connection without page adoption | setup/01 |
| Repeat connection, missing-context recovery and standalone migration resume | setup/repeat-connection-route, setup/missing-context-return, setup/standalone-migration-resume |
| Completion cleanup, lasting project materials and independent unfinished work | setup/14 |
| Setup/migration delegation, file ownership, failure recovery and independent final review | setup/12 |
| Repository workflow preservation, minimal pointers, existing symlinks and scoped conflicts | setup/11 |
| Automatic contracts-only setup handoff, saved decisions, gradual continuation and separate API analysis | setup/03–05 |
| Migration modes, admission without repairs, design-only repairs, preserved logic and bounded escape hatches | setup/06–09 |
| Verification refusal across migration modes, setup moves, gradual adoption and resume | setup/10 |
| Automatic use routing and system-gap handoff | build/03 |
| Read-only missing-basis discovery followed by caller-authorised gap recording | gap-record/missing-basis-handoff |
| Component implementation and admission authority in craft | authoring/09 |
| Local external additions, immediate availability, duplicate decisions and verification limits | authoring/15 |
| Explicit migration and default decisions for component API extensions | authoring/10 |
| Coherent component proposals and scoped delegation without repeated questions | authoring/11–12 |
| Sufficient selection rules, ordinary authoring checks and explicitly requested whole-set discovery | authoring/13; setup/07 |
| Selection reasoning from six existing components, coherent legacy promises and independent product cases | setup/13 (external source snapshot) |
| Copied and paraphrased criteria cannot establish discovery coverage | authoring/14 |
| Contract-only selection with missing rules and misleading implementation evidence | discovery/27 |
| Automatic craft routing with no pre-existing system | setup/02 |
| Semantic token roles and theme alias values | discovery/23 |
| Gap triage, archive cleanup, priorities, decisions and next steps | triage/01–04 |
| Reusable UI analysis, artifact prerequisites, full coverage and preserved decisions on rerun | analyze/01–02 |
| Read-only improvement survey, whole-result document/implement choice, preserved logic and saved decisions | improve/01–02 |

These are scenario coverage, not a claim that every model has passed. Production setup, unmanaged product fallback and deprecated migration still need model runs.
Fixture tests alone do not establish agent selection or browser correctness.

## 1. Prepare isolated copies

Use the actual source, including uncommitted files, consistently throughout the run.
Exclude scenario expectations/history and grader tests from workers. From repo root,
with existing dependencies installed:

```sh
run=$(mktemp -d /tmp/ads-run.XXXXXX)
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
  mkdir -p "$run/$id"
  rsync -a "$run/_source/" "$run/$id/"
done
```

The copies share only installed dependencies. Check that ignored build outputs and
unrelated agent history were not included; verify symlinks such as CONTEXT.md survived.
Apply controller preparation before dispatch and keep it distinct from worker changes
when evaluating. Select a representative set or all scenarios; give each worker fresh
context without this conversation or prior results.

## 2. Dispatch workers

Extract only the scenario's Request and its skill/route/design/reference; controller
Preparation and Expected criteria stay outside the worker's prompt and accessible copy.
Use this prompt:

For a Reference scenario, replace the first instruction with
`Read <copy>/skills/design-system/SKILL.md for context, then follow <copy>/<reference> for this request only.`
This tests the procedure without requiring an unrelated full UI build.
For a Route scenario, include `Use design-system <route> for this request.` after reading
the entrypoint. With no Route or Reference, let the entrypoint choose from the Request.

```text
Read and follow <copy>/skills/design-system/SKILL.md.
Design: <copy>/<design>.
Work inside <copy>. Return results and check outcomes in the conversation.
Do not create separate evidence files or archives.
Do not read scenario expectations or earlier evaluations.

Request:
<Request verbatim>

If a required human answer is missing, report the question and any valid
provisional choice, then stop; nobody will answer in this run.
```

For discovery, use this separate prompt:

```text
Read <copy>/skills/design-system/SKILL.md and follow design-system discovery.
Design: <copy>/<design>.
This task is the discovery stage: return a selection/composition decision in the
conversation. The Request describes the intended UI; implementation belongs to the
caller. The caller receives your answer, records gaps and handles pending questions.
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
mode and an explicit built-in tool set. For example, after verifying installed CLI support:

```sh
claude --print --restricted --tools 'Read,Glob,Grep' \
  --allowedTools 'Read,Glob,Grep' --permission-mode dontAsk \
  --strict-mcp-config --mcp-config '{"mcpServers":{}}' \
  --settings '{"disableAllHooks":true}' --disable-slash-commands --no-chrome \
  --no-session-persistence --model '<worker-model-id>' --effort '<worker-effort>'
```

Pass the request on stdin and inspect the response and process result directly.
Another host must offer equivalent enforced capabilities. If it cannot, report this
run configuration as unavailable instead of silently granting broader tools. Use
available runtime events to inspect denied or unexpected tool use; an empty project
diff alone cannot establish read-only execution. No trace export or archive is required.
A missing/error result is an execution failure, not an empty successful answer.

The controller does not modify a copy while its worker runs. Explicitly requested or project-required gate
workers get fresh contexts and only their specified inputs. Keep prepared expected
gate outcomes separate from those inputs. Return outcomes in the conversation.

## 3. Inspect results and execute checks

Inspect final worker copies and changes against the prepared starting state. Pass the
worker responses and check results directly to the evaluator; separate result files,
diffs, evidence directories, logs and archives are not required. Keep temporary copies
until evaluation finishes, then clean them up. Leave prior user materials intact.
Create a new output directory for assessment JSON records without overwriting old ones:

```sh
out=$(mktemp -d /tmp/ads-assessments.XXXXXX)
```

Run relevant contract checks and focused tests against final worker files. Inspect
command results directly and report outcomes briefly. For builds, add the
smallest controller-owned assertions for target existence, mandatory composition and
requested behaviour. Include one deliberate invalid composition. Put controller tests
in a separate copy of the final worker state, so they cannot appear as worker changes.
For build/02, copy [check-settings.test.tsx](check-settings.test.tsx) beside the
generated contact-settings.tsx in that verification copy and run its focused Vitest
command. It checks the target, local submission and a displaced-fieldset mutation.

Let the evaluator inspect any controller-created checks in that verification copy.
For contract validation, use the correct group and pass all three UI indexes together
so duplicate ids/targets across indexes are checked. Treat an alternate component
index as a separate configuration, not an additional simultaneous index.
Inspect checker output as well as exit status; an empty CLI result does not prove that
any contract was checked.

Do not substitute test-count or log-word checks for working assertions. Browser checks
remain necessary for the affected browser properties unless explicitly unavailable;
record that limit rather than claiming a rendered result from DOM tests.

## 4. Independent semantic evaluation

Give one fresh evaluator the rubric, selected scenarios, source and final artifacts,
worker responses and check results in the conversation. Do not give it old grades or controller findings
as the desired conclusion. It may assess the selected batch; no second voting agent
is needed. No prompt or execution archive is required.

```text
Follow <snapshot>/evaluate.md to evaluate <selected scenario paths>.
Source snapshot: <source>. Final copies: <paths>.
Worker responses and check results: <conversation context>.
Assessment output directory: <out>.
Write <id>.assessment.json for each selected scenario into <out>.
Read the supplied requests, criteria and relevant contracts. Assess actual
choices, stated reasons and artifacts; ignore response formatting. Do not
modify worker artifacts, expectations or raw results. If a required result
is unavailable or a criterion conflicts with the sources, identify it explicitly.
```

## 5. Collect and compare

```sh
node scenarios/grade.mjs "$out"
```

The table contains `pass`, `fail`, `unverified` or `not run`, with the evaluator's
reason. Missing assessments are `not run`; invalid records are `unverified`.
Only verdict and nonempty reason are required; extra fields are ignored.
The JSON record has a small transport format; worker responses have no grading schema.

Compare models on the same source and criteria using independently produced results.
Each retry is a fresh run under the run-independence rule above. Do not overwrite
existing user results. Report disputed judgments for separate review.
