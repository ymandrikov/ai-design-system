import { act } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Toggle } from "./toggle";

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

function input() {
  return container.querySelector("input[role='switch']") as HTMLInputElement;
}

describe("Toggle", () => {
  it("renders a switch checkbox associated with the label", () => {
    render(<Toggle label="Enable notifications" />);
    expect(input().type).toBe("checkbox");
    const label = container.querySelector("label") as HTMLLabelElement;
    expect(label.textContent).toBe("Enable notifications");
    expect(label.getAttribute("for")).toBe(input().id);
  });

  it("supports an uncontrolled defaultChecked state", () => {
    render(<Toggle label="Enable notifications" defaultChecked />);
    expect(input().checked).toBe(true);
  });

  it("supports a controlled checked state with onChange", () => {
    const onChange = vi.fn();
    render(<Toggle label="Enable notifications" checked={false} onChange={onChange} />);
    act(() => {
      input().click();
    });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("applies disabled natively", () => {
    render(<Toggle label="Enable notifications" disabled />);
    expect(input().disabled).toBe(true);
  });
});
