import { act } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Stack } from "./stack";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
});

function render(children: ReactNode) {
  const root = createRoot(container);
  act(() => root.render(children));
  return root;
}

describe("Stack", () => {
  it("renders a div carrying data-ds stack", () => {
    render(<Stack />);
    expect(container.querySelector("div[data-ds='stack']")).not.toBeNull();
  });

  it("defaults to space md", () => {
    render(<Stack />);
    expect(container.querySelector("[data-ds='stack']")?.getAttribute("data-space")).toBe("md");
  });

  it.each(["sm", "lg"] as const)("accepts space %s", (space) => {
    render(<Stack space={space} />);
    expect(container.querySelector("[data-ds='stack']")?.getAttribute("data-space")).toBe(space);
  });

  it("renders children in source order", () => {
    render(
      <Stack>
        <p>First</p>
        <p>Second</p>
      </Stack>,
    );
    const texts = Array.from(container.querySelectorAll("[data-ds='stack'] > p")).map((p) => p.textContent);
    expect(texts).toEqual(["First", "Second"]);
  });

  it("adds no role and no semantics", () => {
    render(<Stack />);
    expect(container.querySelector("[data-ds='stack']")?.hasAttribute("role")).toBe(false);
  });

  it("accepts native div attributes", () => {
    render(<Stack id="settings" />);
    expect(container.querySelector("[data-ds='stack']")?.id).toBe("settings");
  });
});
