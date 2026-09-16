import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { expect, it } from "vitest";
import { scenarioFiles } from "../scenarios/grade.mjs";

function withoutFencedCode(markdown) {
  let fence;
  return markdown.split("\n").filter((line) => {
    const marker = line.match(/^\s*(`{3,}|~{3,})/)?.[1];
    if (!fence && marker) { fence = marker; return false; }
    if (fence && marker?.[0] === fence[0] && marker.length >= fence.length) { fence = undefined; return false; }
    return !fence;
  }).join("\n");
}

function headingAnchors(markdown) {
  const anchors = new Set();
  for (const [, title] of markdown.matchAll(/^#{1,6} (.+)$/gm)) {
    const base = title.toLowerCase().replace(/[^\p{L}\p{N}_ -]/gu, "").replaceAll(" ", "-");
    let slug = base;
    for (let suffix = 1; anchors.has(slug); suffix += 1) slug = `${base}-${suffix}`;
    anchors.add(slug);
  }
  return anchors;
}

it("ships one self-contained skill with reachable procedures and scenario routes", () => {
  const root = resolve("skills/design-system");
  const files = readdirSync("skills", { recursive: true });
  expect(files.filter((file) => file.endsWith("SKILL.md"))).toEqual(["design-system/SKILL.md"]);

  const instructions = ["SKILL.md", ...readdirSync(join(root, "reference"))
    .filter((file) => file.endsWith(".md")).map((file) => `reference/${file}`)];
  for (const file of instructions) {
    const source = join(root, file);
    const markdown = withoutFencedCode(readFileSync(source, "utf8"));
    if (file.startsWith("reference/") && file !== "reference/setup.md") {
      expect(markdown, `${file}: connection instructions belong in setup.md`)
        .not.toMatch(/\bsetup\b|\binitial[- ]connection\b|\bbootstrap\b/i);
    }
    for (const [, link] of markdown.matchAll(/\]\(([^)\s]+)(?:\s+[^)]*)?\)/g)) {
      if (/^[a-z]+:/i.test(link)) continue;
      const [path, fragment] = link.split("#");
      const target = path ? resolve(dirname(source), decodeURIComponent(path)) : source;
      expect(target.startsWith(root + sep), `${file}: ${link} escapes the package`).toBe(true);
      expect(existsSync(target), `${file}: ${link} is missing`).toBe(true);
      expect(statSync(target).isFile(), `${file}: ${link} is not a file`).toBe(true);
      if (fragment) {
        const anchors = headingAnchors(withoutFencedCode(readFileSync(target, "utf8")));
        expect(anchors.has(decodeURIComponent(fragment)), `${file}: ${link} has no matching heading`).toBe(true);
      }
      if (file.startsWith("reference/") && file !== "reference/setup.md") {
        expect(target, `${file}: setup.md may only be entered from SKILL.md`).not.toBe(join(root, "reference/setup.md"));
      }
    }
  }
  expect(realpathSync("CONTEXT.md")).toBe(join(root, "reference/CONTEXT.md"));

  for (const file of scenarioFiles("scenarios")) {
    const source = readFileSync(file, "utf8");
    const skill = source.match(/\*\*Skill:\*\* (.+)/)?.[1];
    expect(skill, file).toBe("design-system");
    const route = source.match(/\*\*Route:\*\* (.+)/)?.[1];
    if (route) expect(existsSync(join(root, "reference", `${route}.md`)), file).toBe(true);
    const reference = source.match(/\*\*Reference:\*\* (.+)/)?.[1];
    if (reference) expect(existsSync(reference), file).toBe(true);
  }
});
