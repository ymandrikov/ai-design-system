#!/usr/bin/env node
import { existsSync, readFileSync, realpathSync, statSync } from "node:fs";
import { basename, dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const HEADINGS = [
  "Purpose",
  "When to use",
  "When not to use",
  "Public API",
  "Behaviour and states",
  "Accessibility",
];

export const FORMATS = {
  component: HEADINGS,
  layout: ["Purpose", "When to use", "When not to use", "Public API", "Composition", "Accessibility"],
  pattern: ["Purpose", "When to use", "When not to use", "Structure", "Composition", "Verification"],
};

export function checkContract(markdown, { resolveLink = () => true, kind = "component" } = {}) {
  if (!Object.hasOwn(FORMATS, kind)) return [`unknown contract kind: ${kind}`];
  markdown = markdown.replaceAll("\r\n", "\n");
  const parsed = kind === "pattern" ? { body: markdown, problems: [] } : frontmatter(markdown);
  const problems = [...parsed.problems];
  markdown = withoutCode(parsed.body);

  const sections = splitSections(markdown);
  const headings = FORMATS[kind];
  if (sections.map((s) => s.heading).join("\n") !== headings.join("\n")) {
    problems.push(`H2 headings must be exactly, in order: ${headings.join(", ")}`);
  }
  for (const { heading, body } of sections) {
    if (body.trim() === "") problems.push(`section is empty: ${heading}`);
  }

  const whenToUse = sections.find((s) => s.heading === "When to use");
  if (whenToUse && !/\b(all|any)\b/i.test(whenToUse.body)) {
    problems.push("When to use must state whether all or any of its conditions must hold");
  }

  const composition = sections.find((s) => s.heading === "Composition");
  if (composition && !["Required", "Recommendations", "Exceptions"].every(
    (heading) => new RegExp(`^### ${heading}$`, "m").test(composition.body),
  )) {
    problems.push("Composition must contain the H3 subsections Required, Recommendations and Exceptions");
  }

  const accessibility = sections.find((s) => s.heading === "Accessibility");
  if (
    accessibility &&
    !(/^### Provided by the component$/m.test(accessibility.body) && /^### Required of consumers$/m.test(accessibility.body))
  ) {
    problems.push("Accessibility must contain the H3 subsections Provided by the component and Required of consumers");
  }

  for (const target of localLinks(markdown)) {
    if (!resolveLink(target)) problems.push(`relative link does not resolve: ${target}`);
  }
  return problems;
}

function splitSections(markdown) {
  const sections = [];
  let current = null;
  for (const line of markdown.split("\n")) {
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      current = { heading: h2[1].trim(), body: "" };
      sections.push(current);
    } else if (current) {
      current.body += line + "\n";
    }
  }
  return sections;
}

function localLinks(markdown) {
  const targets = [];
  for (const match of markdown.matchAll(/\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+"[^"]*")?\s*\)/g)) {
    const target = match[1] ?? match[2];
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target)) continue;
    targets.push(target);
  }
  return targets;
}

function withoutCode(markdown) {
  let fence;
  return markdown.split("\n").map((line) => {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (!fence && marker) { fence = marker[1]; return ""; }
    if (fence) {
      if (new RegExp(`^\\s*${fence[0]}{${fence.length},}\\s*$`).test(line)) fence = undefined;
      return "";
    }
    return line;
  }).join("\n");
}

const PATH_FIELDS = ["sources", "tests", "examples"];
const validId = (id) => typeof id === "string" && /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(id) && id !== "none";
const validPath = (path) => typeof path === "string" && path.length > 0
  && !/^(?:\/|[a-z][a-z0-9+.-]*:)/i.test(path)
  && !/[\\*?\[\]{}#\r\n]/.test(path)
  && path.split("/").every((part) => part && part !== "." && part !== "..");

function identityProblems({ id, status }) {
  return [
    ...(!validId(id) ? [`invalid contract id: ${id ?? "missing"}`] : []),
    ...(!["discoverable", "hidden", "deprecated"].includes(status) ? [`invalid status: ${status ?? "missing"}`] : []),
  ];
}

function frontmatter(markdown) {
  const match = markdown.replaceAll("\r\n", "\n").match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) return { metadata: {}, body: markdown, problems: ["missing frontmatter"] };
  const metadata = {};
  const problems = [];
  let field;
  // ponytail: flat YAML strings and block lists only; use a YAML library if nested metadata is needed.
  const scalar = (value) => {
    if (value.startsWith('"')) return JSON.parse(value);
    if (value.startsWith("'")) {
      if (!/^'(?:[^']|'')*'$/.test(value)) throw new Error("invalid quoted string");
      return value.slice(1, -1).replaceAll("''", "'");
    }
    if (/^[!&*>{[|@`]|: | #/.test(value)) throw new Error("unsupported YAML scalar");
    return value;
  };
  for (const line of match[1].split("\n")) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    try {
      const item = line.match(/^  - (.+)$/);
      if (item && PATH_FIELDS.includes(field) && Array.isArray(metadata[field])) {
        metadata[field].push(scalar(item[1].trim()));
        continue;
      }
      const property = line.match(/^(id|status|sources|tests|examples):(?:\s+(.*))?$/);
      if (!property) throw new Error("expected a supported field or two-space block list item");
      field = property[1];
      if (Object.hasOwn(metadata, field)) throw new Error(`duplicate frontmatter field: ${field}`);
      const value = property[2]?.trim() ?? "";
      metadata[field] = PATH_FIELDS.includes(field) && (value === "" || value === "[]") ? [] : scalar(value);
    } catch (error) { problems.push(`frontmatter: ${error.message}`); field = undefined; }
  }
  problems.push(...identityProblems(metadata));
  for (const key of PATH_FIELDS) {
    if (key !== "sources" && !Object.hasOwn(metadata, key)) continue;
    if (!Array.isArray(metadata[key])) problems.push(`${key} must be a list of paths`);
    else for (const path of metadata[key]) {
      if (!validPath(path)) problems.push(`invalid ${key} path: ${path}`);
    }
  }
  return { metadata, body: markdown.slice(match[0].length), problems };
}

function linkPath(dir, target) {
  return resolve(dir, decodeURIComponent(target.split("#")[0]));
}

function resolvesLink(file, target) {
  const [path, fragment] = target.split("#");
  const full = path ? linkPath(dirname(file), path) : file;
  if (!existsSync(full) || !statSync(full).isFile()) return false;
  if (!fragment) return true;
  const markdown = withoutCode(readFileSync(full, "utf8"));
  const anchors = [...markdown.matchAll(/<a id="([^"]+)"><\/a>/g)].map((m) => m[1]);
  for (const [, title] of markdown.matchAll(/^#{1,6} (.+)$/gm)) {
    anchors.push(title.toLowerCase().replace(/[^\p{L}\p{N}_ -]/gu, "").replaceAll(" ", "-"));
  }
  return anchors.includes(decodeURIComponent(fragment));
}

function patterns(markdown, resolveLink = () => true) {
  const source = withoutCode(markdown.replaceAll("\r\n", "\n"));
  const headings = [...source.matchAll(/^## (.+)$/gm)];
  const entries = [];
  const problems = [];
  const preamble = source.slice(0, headings[0]?.index ?? source.length);
  for (let i = 0; i < headings.length; i++) {
    const start = headings[i];
    const block = source.slice(start.index, headings[i + 1]?.index ?? source.length);
    const id = block.match(/^ID: (.+)$/m)?.[1];
    const status = block.match(/^Status: (.+)$/m)?.[1];
    entries.push({ id, status });
    problems.push(...identityProblems({ id, status }).map((p) => `${start[1]}: ${p}`));
    const before = source.slice(0, start.index).trimEnd();
    if (!before.endsWith(`<a id="${id}"></a>`)) problems.push(`${id}: missing stable anchor before pattern heading`);
    if (!localLinks(preamble).includes(`#${id}`)) problems.push(`${id}: missing table-of-contents anchor link`);
    const body = block.replace(/^#{2,} /gm, (h) => h.slice(1));
    problems.push(...checkContract(body, { kind: "pattern", resolveLink }).map((p) => `${id}: ${p}`));
  }
  const ids = entries.map((entry) => entry.id);
  if (new Set(ids).size !== ids.length) problems.push("duplicate pattern id");
  for (const target of localLinks(preamble)) {
    if (target.startsWith("#") ? !ids.includes(target.slice(1)) : !resolveLink(target)) problems.push(`pattern anchor/link does not resolve: ${target}`);
  }
  return { entries, problems };
}

function projectRoot(file) {
  let dir = dirname(file);
  while (!existsSync(resolve(dir, "DESIGN.md"))) {
    if (dirname(dir) === dir) return undefined;
    dir = dirname(dir);
  }
  return dir;
}

function inventoryEntries(markdown) {
  const entries = [];
  let current;
  let field;
  for (const line of markdown.split("\n")) {
    const id = line.match(/^- \*\*(.*)\*\*\s*$/);
    if (id) {
      current = { name: id[1] };
      entries.push(current);
      field = undefined;
    } else if (/^\S/.test(line)) {
      current = undefined;
    } else if (current) {
      const property = line.match(/^\s+- (ID|Status|Purpose|Contract):\s*(.*)$/);
      if (property) {
        field = property[1];
        current[field] = property[2];
      } else if (/^\s+- /.test(line)) {
        field = undefined;
      } else if (field && line.trim()) {
        current[field] += ` ${line.trim()}`;
      }
    }
  }
  return entries;
}

export function checkContractFile(path, { inventoryPath, inventoryPaths = [], kind = "component" } = {}) {
  const file = resolve(path);
  const markdown = readFileSync(file, "utf8");
  const resolveLink = (target) => resolvesLink(file, target);
  const problems = kind === "pattern" ? patterns(markdown, resolveLink).problems : checkContract(markdown, { kind, resolveLink });
  const root = projectRoot(file);
  if (!root) problems.push("cannot locate project root: missing DESIGN.md");
  else {
    const location = relative(root, file).split(sep).join("/");
    const expected = kind === "pattern" ? "design-system/PATTERNS.md" : `design-system/${kind === "layout" ? "layouts" : "components"}/`;
    if (kind === "pattern" ? location !== expected : !location.startsWith(expected)) problems.push(`contract must be located in ${expected}`);
    if (kind !== "pattern") {
      const { metadata } = frontmatter(markdown);
      for (const field of PATH_FIELDS) for (const target of Array.isArray(metadata[field]) ? metadata[field] : []) {
        if (!validPath(target)) continue;
        const full = resolve(root, target);
        if (!existsSync(full) || !statSync(full).isFile() || !realpathSync(full).startsWith(realpathSync(root) + sep)) {
          problems.push(`${field} file does not resolve: ${target}`);
        }
      }
    }
  }
  const indexes = [...new Set([...inventoryPaths, ...(inventoryPath ? [inventoryPath] : [])].map((p) => resolve(p)))];
  const ids = new Set();
  const paths = new Set();
  const addId = (id) => {
    if (ids.has(id)) problems.push(`duplicate inventory id: ${id}`);
    ids.add(id);
  };
  for (const index of indexes) {
    const text = readFileSync(index, "utf8");
    if (basename(index) === "PATTERNS.md") {
      const result = patterns(text, (target) => resolvesLink(index, target));
      if (index !== file) problems.push(...result.problems.map((p) => `${index}: ${p}`));
      result.entries.forEach(({ id }) => addId(id));
      paths.add(index);
      continue;
    }
    for (const entry of inventoryEntries(withoutCode(text))) {
      const context = `${index}: ${entry.name}`;
      for (const key of ["ID", "Status"]) if (entry[key] !== undefined) problems.push(`${context}: ${key} belongs in contract frontmatter`);
      if (!entry.Purpose?.trim()) problems.push(`${context}: missing Purpose`);
      const links = localLinks(entry.Contract ?? "");
      if (links.length !== 1) { problems.push(`${context}: Contract must contain one local Markdown link`); continue; }
      const target = linkPath(dirname(index), links[0]);
      if (!resolvesLink(index, links[0])) problems.push(`${context}: contract link does not resolve: ${links[0]}`);
      else {
        const result = frontmatter(readFileSync(target, "utf8"));
        problems.push(...result.problems.map((p) => `${context}: ${p}`));
        addId(result.metadata.id);
        const group = basename(index) === "LAYOUTS.md" ? "layouts" : "components";
        const targetRoot = projectRoot(target);
        if (targetRoot && !relative(targetRoot, target).split(sep).join("/").startsWith(`design-system/${group}/`)) {
          problems.push(`${context}: indexed contract must be in design-system/${group}/`);
        }
      }
      if (paths.has(target)) problems.push(`duplicate inventory contract: ${target}`);
      paths.add(target);
    }
  }
  if (indexes.length && !paths.has(file)) problems.push("inventory has no entry for this contract");
  return problems;
}

if (process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  const args = process.argv.slice(2);
  const inventoryPaths = [];
  const files = [];
  let kind = "component";
  try {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg === "--inventory" || arg === "--kind") {
        const value = args[++i];
        if (!value || value.startsWith("--")) throw new Error(`${arg} requires a value`);
        if (arg === "--inventory") inventoryPaths.push(value);
        else kind = value;
      } else if (arg.startsWith("--")) {
        throw new Error(`unknown option: ${arg}`);
      } else files.push(arg);
    }
    if (!Object.hasOwn(FORMATS, kind)) throw new Error(`unknown contract kind: ${kind}`);
    if (!files.length) throw new Error("no contract files supplied");
  } catch (error) {
    console.error(error.message);
    console.error("usage: check-contract [--inventory <index.md>]... [--kind component|layout|pattern] <contract.md> [...]");
    process.exit(2);
  }
  let failed = false;
  for (const file of files) {
    let problems;
    try {
      problems = checkContractFile(file, { inventoryPaths, kind });
    } catch (error) {
      problems = [error.message];
    }
    if (problems.length === 0) console.log(`ok  ${file}`);
    else {
      failed = true;
      console.log(`FAIL ${file}`);
      for (const problem of problems) console.log(`  - ${problem}`);
    }
  }
  process.exit(failed ? 1 : 0);
}
