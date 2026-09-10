#!/usr/bin/env node
// Collect independent semantic assessments; never grade worker prose.
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export function scenarioFiles(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "runs")
    .flatMap((d) => readdirSync(join(dir, d.name)).filter((f) => f.endsWith(".md")).map((f) => join(dir, d.name, f)))
    .sort();
}

export function grade(outDir, scenariosDir) {
  const file = (name) => existsSync(join(outDir, name)) && statSync(join(outDir, name)).isFile();
  return scenarioFiles(scenariosDir).map((path) => {
    const id = basename(path, ".md");
    const row = (verdict, reason) => ({ id, verdict, lines: [reason] });
    if (!file(`${id}.result.md`)) return row("not run", "No worker result");
    if (!file(`${id}.changes`)) return row("unverified", "Missing changes evidence");
    if (!file(`${id}.assessment.json`)) return row("unverified", "No independent assessment");
    let assessment;
    try { assessment = JSON.parse(readFileSync(join(outDir, `${id}.assessment.json`), "utf8")); }
    catch { return row("unverified", "Unreadable assessment record"); }
    if (!assessment || !["pass", "fail", "unverified"].includes(assessment.verdict)
      || typeof assessment.reason !== "string" || !assessment.reason.trim()
      || !Array.isArray(assessment.evidence) || !assessment.evidence.length
      || assessment.evidence.some((name) => typeof name !== "string" || !name.trim() || !file(name))) {
      return row("unverified", "Incomplete assessment or missing cited evidence");
    }
    return row(assessment.verdict, assessment.reason);
  });
}

if (process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  const [outDir, scenariosDir = dirname(fileURLToPath(import.meta.url))] = process.argv.slice(2);
  if (!outDir) {
    console.error("usage: grade <run-output-dir> [scenarios-dir]");
    process.exit(2);
  }
  const rows = grade(outDir, scenariosDir);
  const cell = (text) => text.replaceAll("|", "\\|").replace(/\r?\n/g, " ");
  console.log("| Scenario | Verdict | Assessment |\n|---|---|---|");
  for (const r of rows) console.log(`| ${r.id} | ${r.verdict} | ${cell(r.lines.join(" "))} |`);
  console.log("\nTotals: " + ["pass", "fail", "unverified", "not run"]
    .map((v) => `${rows.filter((r) => r.verdict === v).length} ${v}`).join(", "));
  console.log("Rubric and evidence limits: scenarios/evaluate.md");
}
