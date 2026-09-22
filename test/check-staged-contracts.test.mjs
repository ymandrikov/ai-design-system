import { afterEach, beforeEach, expect, it } from "vitest";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { checkContractFile } from "../skills/design-system/scripts/check-contract.mjs";

const script = resolve("skills/design-system/scripts/check-staged-contracts.mjs");
const contract = "design-system/components/action button.md";
const source = "src/action button.js";
let root;
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" });
function write(path, text) {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), text);
}
const run = (cwd = root) => spawnSync(process.execPath, [script], { cwd, encoding: "utf8" });

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "staged-contracts-"));
  git("init", "--quiet");
  git("config", "user.email", "test@example.com");
  git("config", "user.name", "Test");
  git("config", "commit.gpgsign", "false");
  git("config", "core.hooksPath", join(root, "no-hooks"));
  write("DESIGN.md", "# Design\n");
  write(source, "export const action = 1;\n");
  write("test/action.js", "test\n");
  write("example/action.js", "example\n");
  write("guide.md", "guide\n");
  write(contract, `---\nid: action\ndescription: Invoke an action.\nstatus: discoverable\nsources:\n  - ${source}\ntests:\n  - test/action.js\nexamples:\n  - example/action.js\n---\n\n# Action\n\n[Guide](../../guide.md)\n`);
  expect(checkContractFile(join(root, contract), { updateSourcesHash: true })).toEqual([]);
  git("add", ".");
});

afterEach(() => rmSync(root, { recursive: true, force: true }));

it("checks new contracts before the first commit without requiring indexes", () => {
  const result = run();
  expect(result.status).toBe(0);
  expect(result.stdout).toContain(`ok  ${contract}`);
});

it("uses staged source contents and leaves unstaged repairs and the index untouched", () => {
  git("commit", "--quiet", "-m", "initial");
  write(source, "export const action = 2;\n");
  git("add", source);
  checkContractFile(join(root, contract), { updateSourcesHash: true });
  const repaired = readFileSync(join(root, contract), "utf8");
  const index = git("write-tree");
  const result = run(join(root, "src"));
  expect(result.status).toBe(1);
  expect(result.stdout).toContain("sourcesHash");
  expect(readFileSync(join(root, contract), "utf8")).toBe(repaired);
  expect(git("write-tree")).toBe(index);
});

it("ignores unstaged source edits when checking a staged contract", () => {
  git("commit", "--quiet", "-m", "initial");
  write(contract, readFileSync(join(root, contract), "utf8") + "\nExtra documentation.\n");
  git("add", contract);
  write(source, "unstaged change\n");
  expect(run().status).toBe(0);
});

it("rejects a malformed changed contract", () => {
  git("commit", "--quiet", "-m", "initial");
  write(contract, "# Missing metadata\n");
  git("add", contract);
  const result = run();
  expect(result.status).toBe(1);
  expect(result.stdout).toContain("missing frontmatter");
});

it("checks affected contracts without validating unrelated contracts or indexes", () => {
  write("design-system/components/broken.md", "# Existing broken contract\n");
  write("design-system/COMPONENTS.md", "- **Missing**\n  - Contract: [Missing](components/missing.md)\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "initial");
  write(source, "export const action = 2;\n");
  checkContractFile(join(root, contract), { updateSourcesHash: true });
  git("add", source, contract);
  const result = run();
  expect(result.status).toBe(0);
  expect(result.stdout).toContain(`ok  ${contract}`);
  expect(result.stdout).not.toContain("broken.md");
});

it.each(["layouts", "patterns"])("checks contracts in %s", (group) => {
  mkdirSync(join(root, "design-system", group));
  const destination = `design-system/${group}/action.md`;
  git("mv", contract, destination);
  const result = run();
  expect(result.status).toBe(0);
  expect(result.stdout).toContain(`ok  ${destination}`);
});

it.each(["delete", "rename"])("checks references to the old source path on %s", (operation) => {
  git("commit", "--quiet", "-m", "initial");
  if (operation === "delete") git("rm", source);
  else git("mv", source, "src/renamed.js");
  const result = run();
  expect(result.status).toBe(1);
  expect(result.stdout).toContain(`sources file does not resolve: ${source}`);
});

it("skips unrelated edits, indexes, DESIGN.md, tests, examples and Markdown links", () => {
  write("design-system/components/broken.md", "# Existing broken contract\n");
  git("add", ".");
  git("commit", "--quiet", "-m", "initial");
  for (const path of ["DESIGN.md", "design-system/COMPONENTS.md", "test/action.js", "example/action.js", "guide.md", "unrelated.js"]) {
    write(path, "changed\n");
  }
  git("add", ".");
  const result = run();
  expect(result.status).toBe(0);
  expect(result.stdout).not.toContain("ok  ");
  expect(result.stdout).not.toContain("FAIL");
});

it("skips deleted contracts and an empty staged diff", () => {
  git("commit", "--quiet", "-m", "initial");
  expect(run().status).toBe(0);
  git("rm", contract);
  expect(run().status).toBe(0);
});
