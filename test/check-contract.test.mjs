import { afterEach, describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { checkContract, checkContractFile } from "../skills/ai-design/scripts/check-contract.mjs";

const HEADINGS = [
  "Purpose",
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
    Purpose: `${PURPOSE_SENTENCE}\n\nThe system owns X so that the job is done the same way everywhere.`,
    "When to use": "Use it when all of these hold:\n\n- One.\n- Two.",
    "When not to use": "- Do not use it for the other job.",
    "Public API": "### React\n\n`<X />`",
    "Behaviour and states": "It has no behaviour.",
    Accessibility:
      "### Provided by the component\n\n- Native.\n\n### Required of consumers\n\n- A label.",
    ...overrides,
  };
  return (
    "---\nid: x\nstatus: discoverable\nsources:\n  - src/X.tsx\n---\n\n# X\n\n" +
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

  it("requires the six H2 headings in order", () => {
    const swapped = contract().replace("## When to use", "## TMP").replace("## When not to use", "## When to use").replace("## TMP", "## When not to use");
    expect(checkContract(swapped)).toContain(
      "H2 headings must be exactly, in order: Purpose, When to use, When not to use, Public API, Behaviour and states, Accessibility",
    );
  });

  it("rejects a missing heading", () => {
    expect(checkContract(contract({ Accessibility: null }))).toContain(
      "H2 headings must be exactly, in order: Purpose, When to use, When not to use, Public API, Behaviour and states, Accessibility",
    );
  });

  it("rejects an empty section", () => {
    expect(checkContract(contract({ Purpose: "" }))).toContain("section is empty: Purpose");
  });

  it("accepts nonempty Purpose without prescribing paragraph count", () => {
    expect(checkContract(contract({ Purpose: PURPOSE_SENTENCE }))).toEqual([]);
    expect(checkContract(contract({ Purpose: `${PURPOSE_SENTENCE}\n\nRole.\n\nExtra.` }))).toEqual([]);
  });

  it("accepts a task statement without a prescribed English opener", () => {
    expect(checkContract(contract({ Purpose: "Does one job.\n\nRole." }))).toEqual([]);
  });

  it("requires explicit all/any selection logic in When to use", () => {
    expect(checkContract(contract({ "When to use": "- One.\n- Two." }))).toContain(
      "When to use must state whether all or any of its conditions must hold",
    );
  });

  it("checks actual links without inferring sibling contracts from component names", () => {
    const markdown = contract({ "When not to use": "Do not use Button here; use [NativeSelect](../select/contract.md)." });
    expect(checkContract(markdown, { resolveLink: () => true })).toEqual([]);
    expect(checkContract(markdown, { resolveLink: () => false })).toContain(
      "relative link does not resolve: ../select/contract.md",
    );
  });

  it("supports fixed layout and pattern formats, rejecting the wrong group", () => {
    const layout = contract({ "Behaviour and states": COMPOSITION }).replace("## Behaviour and states", "## Composition");
    const pattern = layout.replace("## Public API", "## Structure").replace("## Accessibility", "## Verification");
    expect(checkContract(layout, { kind: "layout" })).toEqual([]);
    expect(checkContract(pattern.replace(/^---[\s\S]*?---\n/, ""), { kind: "pattern" })).toEqual([]);
    expect(checkContract(pattern)).not.toEqual([]);
    expect(checkContract(contract(), { kind: "unknown" })).toContain("unknown contract kind: unknown");
  });

  it("requires fixed Composition subsections for layouts and patterns", () => {
    const layout = contract({ "Behaviour and states": COMPOSITION }).replace("## Behaviour and states", "## Composition");
    for (const [kind, markdown] of [
      ["layout", layout],
      ["pattern", layout.replace(/^---[\s\S]*?---\n/, "").replace("## Public API", "## Structure").replace("## Accessibility", "## Verification")],
    ]) {
      expect(checkContract(markdown, { kind })).toEqual([]);
      for (const heading of ["Required", "Recommendations", "Exceptions"]) {
        expect(checkContract(markdown.replace(`### ${heading}`, "### Other"), { kind }).some((p) => p.includes("Composition"))).toBe(true);
      }
    }
  });

  it("requires both accessibility subsections", () => {
    expect(checkContract(contract({ Accessibility: "### Provided by the component\n\n- Native." }))).toContain(
      "Accessibility must contain the H3 subsections Provided by the component and Required of consumers",
    );
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
  return `- **Action Button**\n  - Purpose: A short routing summary.\n  - Contract: [contract](${path})\n`;
}

function pattern(id = "settings") {
  const body = contract({ "Behaviour and states": COMPOSITION })
    .replace(/^---[\s\S]*?---\n\n# X\n/, "")
    .replace("## Public API", "## Structure")
    .replace("## Behaviour and states", "## Composition")
    .replace("## Accessibility", "## Verification")
    .replace(/^(#{2,}) /gm, "$1# ");
  return `<a id="${id}"></a>\n## Settings\n\nID: ${id}\nStatus: discoverable\n${body}`;
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
    expect(problems.some((p) => p.includes("incomplete") && p.includes("Purpose"))).toBe(true);
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

  it("validates several full patterns, stable anchors and cross-group identities", () => {
    const { path, inventoryPath, write } = project();
    const patterns = write("design-system/PATTERNS.md", `# Patterns\n\n- [Settings](#settings)\n- [Other](#other)\n\n${pattern()}\n${pattern("other")}`);
    expect(checkContractFile(patterns, { kind: "pattern", inventoryPaths: [inventoryPath, patterns] })).toEqual([]);
    write("design-system/PATTERNS.md", `# Patterns\n\n- [Settings](#x)\n\n${pattern("x")}`);
    expect(checkContractFile(path, { inventoryPaths: [inventoryPath, patterns] })).toContain("duplicate inventory id: x");
    write("design-system/PATTERNS.md", `# Patterns\n\n- [Settings](#wrong)\n\n${pattern().replace("### Structure", "### Wrong")}`);
    const problems = checkContractFile(patterns, { kind: "pattern" });
    expect(problems.some((p) => p.includes("H2 headings must be exactly"))).toBe(true);
    expect(problems.some((p) => p.includes("anchor"))).toBe(true);
  });

  it("resolves links to specific patterns and rejects absent anchors", () => {
    const { path, write } = project();
    write("design-system/PATTERNS.md", `# Patterns\n\n- [Settings](#settings)\n\n${pattern()}`);
    write("design-system/components/Action Button.md", contract({ "Public API": "See [Settings](../PATTERNS.md#settings)." }));
    expect(checkContractFile(path)).toEqual([]);
    write("design-system/components/Action Button.md", contract({ "Public API": "See [Settings](../PATTERNS.md#missing)." }));
    expect(checkContractFile(path).some((p) => p.includes("does not resolve"))).toBe(true);
  });
});

const checker = resolve("skills/ai-design/scripts/check-contract.mjs");
const cli = (args) => spawnSync(process.execPath, [checker, ...args], { encoding: "utf8" });

describe("check-contract CLI", () => {
  it("validates contracts and rejects invalid arguments through a symlinked directory", () => {
    const { root, path, write } = project();
    symlinkSync(dirname(checker), join(root, "scripts"), "dir");
    const invoke = (args) => spawnSync(process.execPath, [join(root, "scripts/check-contract.mjs"), ...args], { encoding: "utf8" });
    const valid = invoke([path]);
    expect(valid.status).toBe(0);
    expect(valid.stdout).toContain(`ok  ${path}`);
    const invalid = invoke([write("invalid.md", "# Incomplete contract\n")]);
    expect(invalid.status).toBe(1);
    expect(invalid.stdout).toContain("H2 headings must be exactly");
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


it("validates migrated fixture contracts and the combined pattern document", () => {
  for (const ds of ["mini-ds", "tie-ds"]) {
    const base = `fixtures/${ds}/design-system`;
    const indexes = [`${base}/COMPONENTS.md`, `${base}/LAYOUTS.md`, `${base}/PATTERNS.md`];
    for (const file of readdirSync(`${base}/components`)) {
      const inventoryPaths = file === "country-picker.md"
        ? ["fixtures/tie-ds/ranking-inventory.md", ...indexes.slice(1)] : indexes;
      expect(checkContractFile(`${base}/components/${file}`, { inventoryPaths }), file).toEqual([]);
    }
    expect(checkContractFile(`${base}/PATTERNS.md`, { kind: "pattern", inventoryPaths: indexes })).toEqual([]);
  }
  const base = "fixtures/mini-ds/design-system";
  expect(checkContractFile(`${base}/layouts/stack.md`, {
    kind: "layout", inventoryPaths: ["COMPONENTS.md", "LAYOUTS.md", "PATTERNS.md"].map((f) => `${base}/${f}`),
  })).toEqual([]);
});
