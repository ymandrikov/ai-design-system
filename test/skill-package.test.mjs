import { existsSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { expect, it } from "vitest";
import { scenarioFiles } from "../scenarios/grade.mjs";

it("ships one self-contained skill with reachable procedures and scenario routes", () => {
  const root = resolve("skills/ai-design");
  const files = readdirSync("skills", { recursive: true });
  expect(files.filter((file) => file.endsWith("SKILL.md"))).toEqual(["ai-design/SKILL.md"]);

  const instructions = ["SKILL.md", ...readdirSync(join(root, "reference"))
    .filter((file) => file.endsWith(".md")).map((file) => `reference/${file}`)];
  for (const file of instructions) {
    const source = join(root, file);
    for (const [, link] of readFileSync(source, "utf8").matchAll(/\]\(([^)]+)\)/g)) {
      if (/^[a-z]+:/i.test(link) || link.startsWith("#")) continue;
      const target = resolve(dirname(source), link.split("#")[0]);
      expect(target.startsWith(root + sep), `${file}: ${link} escapes the package`).toBe(true);
      expect(existsSync(target), `${file}: ${link} is missing`).toBe(true);
    }
  }
  expect(realpathSync("CONTEXT.md")).toBe(join(root, "reference/CONTEXT.md"));

  for (const file of scenarioFiles("scenarios")) {
    const source = readFileSync(file, "utf8");
    const skill = source.match(/\*\*Skill:\*\* (.+)/)?.[1];
    expect(skill, file).toBe("ai-design");
    const route = source.match(/\*\*Route:\*\* (.+)/)?.[1];
    if (route) expect(existsSync(join(root, "reference", `${route}.md`)), file).toBe(true);
    const reference = source.match(/\*\*Reference:\*\* (.+)/)?.[1];
    if (reference) expect(existsSync(reference), file).toBe(true);
  }
});
