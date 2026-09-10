// @vitest-environment node
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { afterEach, expect, it } from "vitest";
import { grade } from "../scenarios/grade.mjs";

const roots = [];
afterEach(() => { for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true }); });

function run(files) {
  const root = mkdtempSync(join(tmpdir(), "assessment-"));
  roots.push(root);
  mkdirSync(join(root, "discovery"));
  mkdirSync(join(root, "runs"));
  writeFileSync(join(root, "discovery/s.md"), "**Expected:**\nChoose a component that supports one selection.\n");
  for (const [name, content] of Object.entries(files)) writeFileSync(join(root, "runs", `s.${name}`), content);
  return grade(join(root, "runs"), root)[0];
}

const artifacts = { "result.md": "Use **Select** for one country. Alternative: none.\n", changes: "" };
const assessment = (verdict = "pass") => JSON.stringify({ verdict, reason: "The contract supports this selection.", evidence: ["s.result.md", "s.changes"] });

it("collects grades and reports missing arguments through a symlinked entry point", () => {
  run({ ...artifacts, "assessment.json": assessment() });
  const root = roots.at(-1);
  const script = join(root, "grade.mjs");
  symlinkSync(resolve("scenarios/grade.mjs"), script);
  const result = spawnSync(process.execPath, [script, join(root, "runs"), root], { encoding: "utf8" });
  expect(result.status).toBe(0);
  expect(result.stdout).toContain("Totals: 1 pass, 0 fail, 0 unverified, 0 not run");
  const usage = spawnSync(process.execPath, [script], { encoding: "utf8" });
  expect(usage.status).toBe(2);
  expect(usage.stderr).toContain("usage: grade");
});

it("collects the independent assessment without parsing the worker's wording", () => {
  expect(run({ ...artifacts, "assessment.json": assessment() }).verdict).toBe("pass");
  expect(run({ ...artifacts, "result.md": "Выбираю Select.\n", "assessment.json": assessment() }).verdict).toBe("pass");
});

it("does not infer a verdict from a worker's success claim or old keyword evidence", () => {
  expect(run({ ...artifacts, "tests.txt": "150 passed", "check.txt": "pass" }).verdict).toBe("unverified");
});

it("preserves a semantic rejection and an evaluator's uncertainty", () => {
  expect(run({ ...artifacts, "assessment.json": assessment("fail") }).verdict).toBe("fail");
  expect(run({ ...artifacts, "assessment.json": assessment("unverified") }).verdict).toBe("unverified");
});

it("requires actual run artifacts and the evaluator's cited evidence", () => {
  expect(run({ "assessment.json": assessment() }).verdict).toBe("not run");
  expect(run({ "result.md": "Use Select", "assessment.json": assessment() }).verdict).toBe("unverified");
  const missing = JSON.stringify({ verdict: "pass", reason: "Tests passed", evidence: ["missing.tests.txt"] });
  expect(run({ ...artifacts, "assessment.json": missing }).verdict).toBe("unverified");
});

it("reports incomplete assessment records without crashing or inventing a verdict", () => {
  for (const record of ["{", "null", "{}", '{"verdict":"pass"}', assessment("maybe")]) {
    expect(run({ ...artifacts, "assessment.json": record }).verdict).toBe("unverified");
  }
});
