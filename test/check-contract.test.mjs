import { afterEach, describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { checkContract, checkContractFile } from "../skills/design-system/scripts/check-contract.mjs";

const HEADINGS = [
  "When to use",
  "When not to use",
  "Public API",
  "Behaviour and states",
  "Accessibility",
];

const COMPOSITION = "### Required\n\nPreserve source order.\n\n### Recommendations\n\nGroup related content.\n\n### Exceptions\n\nNone.";

const PURPOSE_SENTENCE = "X lets the user do one job with one call.";

function contract(overrides = {}) {
  const sections = {
    "When to use": "Use it when all of these hold:\n\n- One.\n- Two.",
    "When not to use": "- Do not use it for the other job.",
    "Public API": "### React\n\n`<X />`",
    "Behaviour and states": "It has no behaviour.",
    Accessibility:
      "### Provided by the component\n\n- Native.\n\n### Required of consumers\n\n- A label.",
    ...overrides,
  };
  return (
    `---\nid: x\ndescription: ${JSON.stringify(overrides.description ?? PURPOSE_SENTENCE)}\nstatus: discoverable\nsources:\n  - src/X.tsx\nsourcesHash: 73cf4109454c8080c7bb25cf1bd17907605cd48aa18b4eec622efcaf579b91b1\n---\n\n# X\n\n` +
    HEADINGS.filter((h) => sections[h] !== null)
      .map((h) => `## ${h}\n\n${sections[h]}`)
      .join("\n\n") +
    "\n"
  );
}

describe("checkContract", () => {
  it("accepts a well-formed contract", () => {
    expect(checkContract(contract())).toEqual([]);
  });

  it("requires identity, lifecycle and source paths in frontmatter", () => {
    expect(checkContract(contract().replace(/^---[\s\S]*?---\n/, ""))).toContain("missing frontmatter");
    expect(checkContract(contract().replace("status: discoverable", "status: ready"))).toContain("invalid status: ready");
    expect(checkContract(contract().replace("sources:\n  - src/X.tsx\n", ""))).toContain("sources must be a list of paths");
  });

  it.each(["/tmp/X.tsx", "../X.tsx", "src/*.tsx", "https://example.com/X.tsx"])("rejects non-project file path %s", (path) => {
    expect(checkContract(contract().replace("src/X.tsx", path)).some((p) => p.includes("invalid sources path"))).toBe(true);
  });

  it("accepts quoted paths, optional lists and empty sources for unimplemented drafts", () => {
    expect(checkContract(contract().replace("src/X.tsx", '\"src/Action Button.tsx\"')
      .replace("---\n\n#", "tests:\n  - 'test/X.test.tsx'\nexamples: []\n---\n\n#"))).toEqual([]);
    expect(checkContract(contract().replace("status: discoverable", "status: hidden")
      .replace("sources:\n  - src/X.tsx", "sources: []"))).toEqual([]);
    expect(checkContract(contract().replace("id: x", "id: x\nid: y")).some((p) => p.includes("duplicate"))).toBe(true);
  });

  it("preserves plain numeric ids while rejecting non-string descriptions", () => {
    expect(checkContract(contract().replace("id: x", "id: 123"))).toEqual([]);
    for (const value of ["42", "true", "false", "null", "[]"]) {
      expect(checkContract(contract().replace(/^description:.*$/m, `description: ${value}`)))
        .toContain("description must be a nonempty string");
      expect(checkContract(contract({ description: value }))).toEqual([]);
    }
  });

  it("accepts reordered, omitted and additional sections", () => {
    const swapped = contract().replace("## When to use", "## TMP").replace("## When not to use", "## When to use").replace("## TMP", "## When not to use");
    expect(checkContract(swapped)).toEqual([]);
    expect(checkContract(contract({ Accessibility: null }))).toEqual([]);
    const extended = contract() + "\n## Rationale\n\nSee [rules](./rules.md).\n";
    expect(checkContract(extended)).toEqual([]);
    expect(checkContract(extended, { resolveLink: () => false }))
      .toContain("relative link does not resolve: ./rules.md");
  });

  it("rejects an empty section", () => {
    expect(checkContract(contract({ "Public API": "" }))).toContain("section is empty: Public API");
  });

  it("accepts nonempty description without prescribing paragraph count", () => {
    expect(checkContract(contract({ description: PURPOSE_SENTENCE }))).toEqual([]);
    expect(checkContract(contract({ description: `${PURPOSE_SENTENCE}\n\nRole.\n\nExtra.` }))).toEqual([]);
  });

  it("accepts a task statement without a prescribed English opener", () => {
    expect(checkContract(contract({ description: "Does one job.\n\nRole." }))).toEqual([]);
  });

  it("requires a nonempty description for every status", () => {
    for (const status of ["discoverable", "hidden", "deprecated"]) {
      const text = contract().replace("status: discoverable", `status: ${status}`);
      for (const value of ["", '""', "[]", "null"]) {
        expect(checkContract(text.replace(/^description:.*$/m, `description: ${value}`)))
          .toContain("description must be a nonempty string");
      }
      expect(checkContract(text.replace(/^description:.*\n/m, "")))
        .toContain("description must be a nonempty string");
    }
  });

  it("accepts multiline descriptions and checks their links", () => {
    const text = contract().replace(/^description:.*$/m,
      "description: >-\n  One task\n  with one call.\n\n  See [rules](./rules.md).");
    expect(checkContract(text)).toEqual([]);
    expect(checkContract(text.replaceAll("\n", "\r\n"))).toEqual([]);
    expect(checkContract(text, { resolveLink: () => false }))
      .toContain("relative link does not resolve: ./rules.md");
  });

  it("accepts selection logic expressed without all/any keywords", () => {
    expect(checkContract(contract({ "When to use": "Use for an immediate action or for navigation." }))).toEqual([]);
  });

  it("checks actual links without inferring sibling contracts from component names", () => {
    const markdown = contract({ "When not to use": "Do not use Button here; use [NativeSelect](../select/contract.md)." });
    expect(checkContract(markdown, { resolveLink: () => true })).toEqual([]);
    expect(checkContract(markdown, { resolveLink: () => false })).toContain(
      "relative link does not resolve: ../select/contract.md",
    );
  });

  it("accepts layout and pattern templates, rejecting unknown kinds", () => {
    const layout = contract({ "Behaviour and states": COMPOSITION }).replace("## Behaviour and states", "## Composition");
    const pattern = layout.replace("## Public API", "## Structure").replace("## Accessibility", "## Verification");
    expect(checkContract(layout, { kind: "layout" })).toEqual([]);
    expect(checkContract(pattern, { kind: "pattern" })).toEqual([]);
    expect(checkContract(pattern.replace(/^---[\s\S]*?---\n/, ""), { kind: "pattern" })).toContain("missing frontmatter");
    expect(checkContract(contract(), { kind: "unknown" })).toContain("unknown contract kind: unknown");
  });

  it("accepts other Composition subsections for layouts and patterns", () => {
    const layout = contract({ "Behaviour and states": COMPOSITION }).replace("## Behaviour and states", "## Composition");
    for (const [kind, markdown] of [
      ["layout", layout],
      ["pattern", layout.replace("## Public API", "## Structure").replace("## Accessibility", "## Verification")],
    ]) {
      expect(checkContract(markdown, { kind })).toEqual([]);
      for (const heading of ["Required", "Recommendations", "Exceptions"]) {
        expect(checkContract(markdown.replace(`### ${heading}`, "### Other"), { kind })).toEqual([]);
      }
    }
  });

  it("accepts accessibility ownership in prose", () => {
    expect(checkContract(contract({ Accessibility: "The component provides native semantics; consumers supply a label." }))).toEqual([]);
  });

  it("reports a relative link that does not resolve", () => {
    const withLink = contract({ "Public API": "See [Button](./button.md)." });
    expect(checkContract(withLink, { resolveLink: () => false })).toContain(
      "relative link does not resolve: ./button.md",
    );
  });

  it("ignores absolute links", () => {
    const withLink = contract({ "Public API": "See [spec](https://example.com)." });
    expect(checkContract(withLink, { resolveLink: () => false })).toEqual([]);
  });
});

const roots = [];
afterEach(() => roots.splice(0).forEach((root) => rmSync(root, { recursive: true, force: true })));

function project() {
  const root = mkdtempSync(join(tmpdir(), "contract-check-"));
  roots.push(root);
  const write = (path, text) => {
    const full = join(root, path);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, text);
    return full;
  };
  write("DESIGN.md", "# Test design");
  write("src/X.tsx", "export const X = null;");
  const path = write("design-system/components/Action Button.md", contract());
  const inventoryPath = write("design-system/COMPONENTS.md", entry("components/Action%20Button.md"));
  write("design-system/LAYOUTS.md", "# Layouts\n");
  write("design-system/PATTERNS.md", "# Patterns\n");
  return { root, path, inventoryPath, write };
}

function entry(path) {
  return `- **Action Button**\n  - Description: A short routing summary.\n  - Contract: [contract](${path})\n`;
}

function pattern(id = "settings") {
  return contract({ "Behaviour and states": COMPOSITION })
    .replace("id: x", `id: ${id}`)
    .replace("sources:\n  - src/X.tsx", "sources: []")
    .replace("# X\n", "# Settings\n")
    .replace("## Public API", "## Structure")
    .replace("## Behaviour and states", "## Composition")
    .replace("## Accessibility", "## Verification");
}

describe("checkContractFile", () => {
  it("resolves source paths from the project root and contract links from their file", () => {
    const { path, inventoryPath, root } = project();
    expect(checkContractFile(path, { inventoryPath })).toEqual([]);
    rmSync(join(root, "src/X.tsx"));
    expect(checkContractFile(path).some((p) => p.includes("sources file does not resolve: src/X.tsx"))).toBe(true);
  });

  it("requires standard contract placement", () => {
    const { write } = project();
    expect(checkContractFile(write("src/X.md", contract())).some((p) => p.includes("design-system/components/"))).toBe(true);
  });

  it("requires membership by target path", () => {
    const { path, write } = project();
    const other = write("design-system/components/other.md", contract().replace("id: x", "id: other"));
    const inventoryPath = write("design-system/COMPONENTS.md", entry("components/other.md"));
    expect(checkContractFile(path, { inventoryPath })).toContain("inventory has no entry for this contract");
    expect(checkContractFile(other, { inventoryPath })).toEqual([]);
  });

  it("keeps hidden and deprecated managed without index entries and rejects their inclusion", () => {
    const { path, inventoryPath, write } = project();
    for (const status of ["hidden", "deprecated"]) {
      writeFileSync(path, contract().replace("status: discoverable", `status: ${status}`));
      write("design-system/COMPONENTS.md", "# Components\n");
      expect(checkContractFile(path, { inventoryPath })).toEqual([]);
      write("design-system/COMPONENTS.md", entry("components/Action%20Button.md"));
      expect(checkContractFile(path, { inventoryPath }).some((p) => p.includes("only discoverable"))).toBe(true);
    }
  });

  it("reads metadata from contracts and detects duplicate ids and targets", () => {
    const { path, inventoryPath, write } = project();
    write("design-system/components/other.md", contract().replace("status: discoverable", "status: ready"));
    write("design-system/COMPONENTS.md", entry("components/Action%20Button.md") + entry("components/other.md") + entry("components/other.md"));
    const problems = checkContractFile(path, { inventoryPath });
    expect(problems.some((p) => p.includes("invalid status: ready"))).toBe(true);
    expect(problems.some((p) => p.includes("duplicate inventory id: x"))).toBe(true);
    expect(problems.some((p) => p.includes("duplicate inventory contract:"))).toBe(true);
  });

  it.each(["", "has space", "comma,id", "none"])("rejects ambiguous or reserved contract id %s", (id) => {
    expect(checkContract(contract().replace("id: x", `id: ${id}`)).some((p) => p.includes("invalid contract id"))).toBe(true);
  });

  it("checks index references, fields and obsolete metadata", () => {
    const { path, write } = project();
    const inventoryPath = write("design-system/COMPONENTS.md", entry("missing.md") + "  - Status: hidden\n- **incomplete**\n");
    const problems = checkContractFile(path, { inventoryPath });
    expect(problems.some((p) => p.includes("does not resolve: missing.md"))).toBe(true);
    expect(problems.some((p) => p.includes("incomplete") && p.includes("Description"))).toBe(true);
    expect(problems.some((p) => p.includes("incomplete") && p.includes("Contract"))).toBe(true);
    expect(problems.some((p) => p.includes("Status belongs in contract frontmatter"))).toBe(true);
  });

  it("checks optional files and rejects directories and symlinks outside the project", () => {
    const { path, root, write } = project();
    write("design-system/components/Action Button.md", contract().replace("src/X.tsx", "src"));
    expect(checkContractFile(path).some((p) => p.includes("sources file does not resolve"))).toBe(true);
    symlinkSync(tmpdir(), join(root, "outside"), "dir");
    write("design-system/components/Action Button.md", contract().replace("src/X.tsx", "outside"));
    expect(checkContractFile(path).some((p) => p.includes("sources file does not resolve"))).toBe(true);
    write("design-system/components/Action Button.md", contract().replace("---\n\n#", "tests:\n  - test/missing.tsx\n---\n\n#"));
    expect(checkContractFile(path).some((p) => p.includes("tests file does not resolve"))).toBe(true);
  });

  it("validates individual document-only patterns through their index and cross-group identities", () => {
    const { path, inventoryPath, write } = project();
    const settings = write("design-system/patterns/settings.md", pattern());
    const other = write("design-system/patterns/other.md", pattern("other"));
    const patterns = write("design-system/PATTERNS.md", entry("patterns/settings.md") + entry("patterns/other.md"));
    for (const file of [settings, other]) {
      expect(checkContractFile(file, { kind: "pattern", inventoryPaths: [inventoryPath, patterns] })).toEqual([]);
    }
    write("design-system/patterns/settings.md", pattern("x"));
    expect(checkContractFile(path, { inventoryPaths: [inventoryPath, patterns] })).toContain("duplicate inventory id: x");
    write("design-system/PATTERNS.md", entry("components/Action%20Button.md"));
    expect(checkContractFile(path, { inventoryPaths: [patterns] }).some((p) => p.includes("indexed contract must be in design-system/patterns/"))).toBe(true);
  });

  it("checks pattern evidence paths and rejects a combined pattern document", () => {
    const { write } = project();
    const path = write("design-system/patterns/settings.md", pattern().replace("sources: []", "sources: []\nexamples:\n  - missing.tsx"));
    expect(checkContractFile(path, { kind: "pattern" })).toContain("examples file does not resolve: missing.tsx");
    const combined = write("design-system/PATTERNS.md", "# Patterns\n\n- [Settings](#settings)\n\n<a id=\"settings\"></a>\n## Settings\n\nID: settings\nStatus: discoverable\n" + pattern().slice(pattern().indexOf("## When to use")).replace(/^(#{2,}) /gm, "$1# "));
    const problems = checkContractFile(combined, { kind: "pattern" });
    expect(problems).toContain("missing frontmatter");
    expect(problems).toContain("contract must be located in design-system/patterns/");
  });

  it("resolves links to specific patterns and rejects absent anchors", () => {
    const { path, write } = project();
    write("design-system/patterns/settings.md", pattern());
    write("design-system/components/Action Button.md", contract({ "Public API": "See [Settings](../patterns/settings.md#composition)." }));
    expect(checkContractFile(path)).toEqual([]);
    write("design-system/components/Action Button.md", contract({ "Public API": "See [Settings](../patterns/settings.md#missing)." }));
    expect(checkContractFile(path).some((p) => p.includes("does not resolve"))).toBe(true);
  });
});

const checker = resolve("skills/design-system/scripts/check-contract.mjs");
const cli = (args) => spawnSync(process.execPath, [checker, ...args], { encoding: "utf8" });

describe("check-contract CLI", () => {
  it("requires review of source changes and updates only on explicit request", () => {
    const { path, write } = project();
    const original = contract().replace(/^sourcesHash:.*\n/m, "")
      .replace("---\n\n#", "tests:\n  - test.ts\nexamples:\n  - preview.ts\n---\n\n#");
    write("test.ts", "test");
    write("preview.ts", "preview");
    writeFileSync(path, original);
    expect(cli([path]).status).toBe(1);
    expect(cli([path]).stdout).toContain("contract review required");
    expect(readFileSync(path, "utf8")).toBe(original);
    expect(cli(["--update-sources-hash", path]).status).toBe(0);
    const reviewed = readFileSync(path, "utf8");
    expect(reviewed.replace(/^sourcesHash:.*\n/m, "")).toBe(original);
    expect(cli([path]).status).toBe(0);
    write("test.ts", "changed test");
    write("preview.ts", "changed preview");
    write("unlisted.ts", "unlisted source");
    expect(cli([path]).status).toBe(0);
    write("src/X.tsx", "export const X = null; // comment change\n");
    expect(cli([path]).status).toBe(1);
    expect(readFileSync(path, "utf8")).toBe(reviewed);
    expect(cli(["--update-sources-hash", path]).status).toBe(0);
    expect(cli([path]).status).toBe(0);
    expect(readFileSync(path, "utf8")).not.toBe(reviewed);
  });

  it("tracks non-style source membership and paths independently of list order", () => {
    const { path, write } = project();
    write("helper.ts", "export const value = 1;");
    const added = contract().replace("  - src/X.tsx", "  - src/X.tsx\n  - helper.ts");
    writeFileSync(path, added);
    expect(cli([path]).status).toBe(1);
    expect(cli(["--update-sources-hash", path]).status).toBe(0);
    const reviewed = readFileSync(path, "utf8");
    writeFileSync(path, reviewed.replace("  - src/X.tsx\n  - helper.ts", "  - helper.ts\n  - src/X.tsx"));
    expect(cli([path]).status).toBe(0);
    write("helper.ts", "export const value = 2;");
    expect(cli([path]).status).toBe(1);
    write("helper.ts", "export const value = 1;");
    writeFileSync(path, reviewed.replace("  - helper.ts\n", ""));
    expect(cli([path]).status).toBe(1);
    write("src/Renamed.tsx", "export const X = null;");
    writeFileSync(path, reviewed.replace("src/X.tsx", "src/Renamed.tsx"));
    expect(cli([path]).status).toBe(1);
  });

  it("excludes standalone styles but still validates their paths and hashes inline styles", () => {
    const { path, root, write } = project();
    for (const extension of ["css", "module.css", "scss", "sass", "less", "styl", "stylus", "CSS"]) {
      const style = `src/X.${extension}`;
      write(style, "button { color: red; }");
      writeFileSync(path, contract().replace("  - src/X.tsx", `  - src/X.tsx\n  - ${style}`));
      expect(cli([path]).status).toBe(0);
      const reviewed = readFileSync(path, "utf8");
      write(style, "button { color: blue; }");
      expect(cli(["--update-sources-hash", path]).status).toBe(0);
      expect(readFileSync(path, "utf8")).toBe(reviewed);
      rmSync(join(root, style));
      expect(cli([path]).stdout).toContain(`sources file does not resolve: ${style}`);
      expect(cli(["--update-sources-hash", path]).status).toBe(1);
      expect(readFileSync(path, "utf8")).toBe(reviewed);
    }
    writeFileSync(path, contract());
    expect(cli([path]).status).toBe(0);
    write("src/X.tsx", 'export const X = <div style={{ color: "red" }} />;');
    expect(cli(["--update-sources-hash", path]).status).toBe(0);
    write("src/X.tsx", 'export const X = <div style={{ color: "blue" }} />;');
    expect(cli([path]).status).toBe(1);
  });

  it("requires a stable hash for style-only sources", () => {
    const { path, write } = project();
    write("styles.css", "button { color: red; }");
    writeFileSync(path, contract().replace("src/X.tsx", "styles.css").replace(/^sourcesHash:.*\n/m, ""));
    expect(cli([path]).status).toBe(1);
    expect(cli(["--update-sources-hash", path]).status).toBe(0);
    const reviewed = readFileSync(path, "utf8");
    write("styles.css", "button { color: blue; }");
    expect(cli([path]).status).toBe(0);
    expect(cli(["--update-sources-hash", path]).status).toBe(0);
    expect(readFileSync(path, "utf8")).toBe(reviewed);
  });

  it("preserves CRLF and body text when replacing a hash, and skips empty sources", () => {
    const { path } = project();
    const original = (contract() + "\nsourcesHash: this is body text\n").replaceAll("\n", "\r\n");
    writeFileSync(path, original);
    expect(cli(["--update-sources-hash", path]).status).toBe(0);
    expect(readFileSync(path, "utf8")).toBe(original);
    const empty = contract().replace("sources:\n  - src/X.tsx", "sources: []").replace(/^sourcesHash:.*\n/m, "");
    writeFileSync(path, empty);
    expect(cli([path]).status).toBe(0);
    expect(cli(["--update-sources-hash", path]).status).toBe(0);
    expect(readFileSync(path, "utf8")).toBe(empty);
  });

  it("refuses to update hashes for invalid contracts or unresolved sources", () => {
    const { path, root } = project();
    const outside = project();
    symlinkSync(join(outside.root, "src/X.tsx"), join(root, "outside.ts"));
    for (const invalid of [
      contract().replace("src/X.tsx", "missing.ts"),
      contract().replace("src/X.tsx", "../outside.ts"),
      contract().replace("src/X.tsx", "outside.ts"),
      contract().replace("status: discoverable", "status: invalid"),
      contract().replace(/^sourcesHash:.*/m, "sourcesHash: invalid"),
    ]) {
      writeFileSync(path, invalid);
      expect(cli(["--update-sources-hash", path]).status).toBe(1);
      expect(readFileSync(path, "utf8")).toBe(invalid);
    }
    rmSync(path);
    symlinkSync(outside.path, path);
    expect(cli(["--update-sources-hash", path]).status).toBe(1);
    expect(readFileSync(outside.path, "utf8")).toBe(contract());
  });

  it("validates contracts and rejects invalid arguments through a symlinked directory", () => {
    const { root, path, write } = project();
    symlinkSync(dirname(checker), join(root, "scripts"), "dir");
    const invoke = (args) => spawnSync(process.execPath, [join(root, "scripts/check-contract.mjs"), ...args], { encoding: "utf8" });
    const valid = invoke([path]);
    expect(valid.status).toBe(0);
    expect(valid.stdout).toContain(`ok  ${path}`);
    const invalid = invoke([write("invalid.md", "# Incomplete contract\n")]);
    expect(invalid.status).toBe(1);
    expect(invalid.stdout).toContain("missing frontmatter");
    expect(invoke(["--nope"]).status).toBe(2);
  });

  it("accepts repeated indexes and an explicit group", () => {
    const { write } = project();
    const path = write("design-system/layouts/stack.md", contract({ "Behaviour and states": COMPOSITION }).replace("## Behaviour and states", "## Composition"));
    const components = write("design-system/COMPONENTS.md", "# Components\n");
    const layouts = write("design-system/LAYOUTS.md", entry("layouts/stack.md"));
    const result = cli(["--inventory", components, "--kind", "layout", "--inventory", layouts, path]);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain(`ok  ${path}`);
  });

  it.each([["--kind"], ["--inventory"], ["--kind", "unknown"], ["--inventory", "--kind", "pattern"], ["--nope"]])(
    "rejects invalid arguments %j with a usage error", (...args) => {
      const result = cli(args);
      expect(result.status).toBe(2);
      expect(result.stderr).toContain("usage:");
    },
  );
});

it("runs the README pre-commit hook against staged sources and contracts", () => {
  const { path, root, write } = project();
  const hook = readFileSync("README.md", "utf8")
    .match(/### Pre-commit hook example[\s\S]*?```sh\n([\s\S]*?)\n```/)[1];
  write("skills/design-system/scripts/check-contract.mjs", readFileSync(checker, "utf8"));
  const hookPath = write(".githooks/pre-commit", hook);
  const git = (args) => {
    const result = spawnSync("git", args, { cwd: root, encoding: "utf8" });
    expect(result.status, result.stderr).toBe(0);
    return result.stdout;
  };
  const runHook = () => spawnSync("sh", [hookPath], { cwd: root, encoding: "utf8" });
  git(["init", "--quiet"]);
  git(["add", "."]);
  expect(runHook().status).toBe(0);
  write("src/X.tsx", "export const X = 1;");
  expect(runHook().status).toBe(0); // Unstaged sources are not being committed.
  git(["add", "src/X.tsx"]);
  const stale = runHook();
  expect(stale.status).toBe(1);
  expect(stale.stdout).toContain("contract review required");
  expect(cli(["--update-sources-hash", path]).status).toBe(0);
  expect(runHook().status).toBe(1); // An unstaged hash must not clear the failure.
  git(["add", "design-system"]);
  const staged = git(["ls-files", "--stage"]);
  const reviewed = readFileSync(path, "utf8");
  expect(runHook().status).toBe(0);
  expect(git(["ls-files", "--stage"])).toBe(staged);
  expect(readFileSync(path, "utf8")).toBe(reviewed);
  git(["rm", "--cached", "src/X.tsx"]);
  expect(runHook().status).toBe(1);
});


it("validates fixture contracts through all three indexes", () => {
  for (const ds of ["mini-ds", "tie-ds"]) {
    const base = `fixtures/${ds}/design-system`;
    const indexes = [`${base}/COMPONENTS.md`, `${base}/LAYOUTS.md`, `${base}/PATTERNS.md`];
    for (const file of readdirSync(`${base}/components`)) {
      const inventoryPaths = indexes;
      expect(checkContractFile(`${base}/components/${file}`, { inventoryPaths }), file).toEqual([]);
    }
  }
  const base = "fixtures/mini-ds/design-system";
  expect(checkContractFile(`${base}/patterns/settings-page.md`, {
    kind: "pattern", inventoryPaths: ["COMPONENTS.md", "LAYOUTS.md", "PATTERNS.md"].map((f) => `${base}/${f}`),
  })).toEqual([]);
  expect(checkContractFile(`${base}/layouts/stack.md`, {
    kind: "layout", inventoryPaths: ["COMPONENTS.md", "LAYOUTS.md", "PATTERNS.md"].map((f) => `${base}/${f}`),
  })).toEqual([]);
});

const generator = resolve("skills/design-system/scripts/generate-indexes.mjs");
const generate = (root, ...args) => spawnSync(process.execPath, [generator, ...args, root], { encoding: "utf8" });

describe("generate-indexes CLI", () => {
  it("generates sorted discoverable indexes, preserves descriptions and detects drift without writing", () => {
    const { root, path, write, inventoryPath } = project();
    write("design-system/components/nested/first.md", contract().replace("id: x", "id: a")
      .replace("# X", "# First").replace(/^description:.*$/m,
        "description: >-\n  First line\n  continues.\n\n  Second paragraph."));
    write("design-system/components/hidden.md", contract().replace("id: x", "id: h").replace("status: discoverable", "status: hidden"));
    write("design-system/components/old.md", contract().replace("id: x", "id: old").replace("status: discoverable", "status: deprecated"));
    write("design-system/patterns/settings.md", pattern());
    writeFileSync(path, contract().replace(/^description:.*$/m, 'description: |-\n  Full **purpose**.\n\n  - Status: explanation, not metadata.\n\n  See [First](nested/first.md#when-to-use).'));
    expect(generate(root).status).toBe(0);
    const index = readFileSync(inventoryPath, "utf8");
    expect(index.indexOf("**First**")).toBeLessThan(index.indexOf("**X**"));
    expect(index).toContain("Description: First line continues.\n    Second paragraph.");
    expect(index).toContain("Description: Full **purpose**.\n\n    - Status: explanation, not metadata.\n\n    See [First](components/nested/first.md#when-to-use).");
    expect(index).toContain("(components/Action%20Button.md)");
    expect(checkContractFile(path, { inventoryPath })).toEqual([]);
    expect(index).not.toMatch(/hidden\.md|old\.md/);
    expect(readFileSync(join(root, "design-system/PATTERNS.md"), "utf8")).toContain("**Settings**");
    expect(generate(root, "--check").status).toBe(0);
    writeFileSync(path, readFileSync(path, "utf8").replace("status: discoverable", "status: hidden"));
    expect(generate(root, "--check").status).toBe(1);
    expect(readFileSync(inventoryPath, "utf8")).toBe(index);
    expect(generate(root).status).toBe(0);
    expect(readFileSync(inventoryPath, "utf8")).not.toContain("**X**");
  });

  it("creates empty indexes and checks missing indexes without writing", () => {
    const { root } = project();
    rmSync(join(root, "design-system"), { recursive: true });
    expect(generate(root, "--check").status).toBe(1);
    expect(() => readFileSync(join(root, "design-system/COMPONENTS.md"))).toThrow();
    expect(generate(root).status).toBe(0);
    expect(generate(root, "--check").status).toBe(0);
  });

  it("rejects symlinked output files without overwriting their targets", () => {
    const { root, path, inventoryPath } = project();
    const original = readFileSync(path, "utf8");
    rmSync(inventoryPath);
    symlinkSync(path, inventoryPath);
    expect(generate(root).status).toBe(1);
    expect(readFileSync(path, "utf8")).toBe(original);
  });

  it("rejects invalid metadata and duplicate hidden ids before overwriting any index", () => {
    const { root, write, inventoryPath } = project();
    const before = readFileSync(inventoryPath, "utf8");
    const invalid = write("design-system/patterns/invalid.md", pattern().replace("status: discoverable", "status: typo"));
    expect(generate(root).status).toBe(1);
    expect(readFileSync(inventoryPath, "utf8")).toBe(before);
    writeFileSync(invalid, pattern("x").replace("status: discoverable", "status: hidden"));
    expect(generate(root).stderr).toContain("duplicate contract id: x");
    expect(readFileSync(inventoryPath, "utf8")).toBe(before);
  });
});
