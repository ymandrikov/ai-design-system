import { act } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CopyButton } from "./copy-button";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  vi.useFakeTimers();
});

afterEach(() => {
  container.remove();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function render(children: ReactNode) {
  const root = createRoot(container);
  act(() => root.render(children));
  return root;
}

function button() {
  return container.querySelector("button") as HTMLButtonElement;
}

describe("CopyButton", () => {
  it("renders a native button with the label", () => {
    render(<CopyButton value="bkua_1234">Copy token</CopyButton>);
    expect(button().tagName).toBe("BUTTON");
    expect(button().textContent).toBe("Copy token");
  });

  it("writes the value to the clipboard when activated", async () => {
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    render(<CopyButton value="bkua_1234">Copy token</CopyButton>);
    await act(async () => {
      button().click();
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(writeText).toHaveBeenCalledWith("bkua_1234");
  });

  it("shows the confirmation label after a successful copy", async () => {
    vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    render(<CopyButton value="bkua_1234">Copy token</CopyButton>);
    await act(async () => {
      button().click();
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(button().textContent).toBe("Copied");
  });

  it("shows a custom confirmation label when provided", async () => {
    vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    render(
      <CopyButton value="bkua_1234" confirmation="Done">
        Copy token
      </CopyButton>,
    );
    await act(async () => {
      button().click();
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(button().textContent).toBe("Done");
  });

  it("reverts to the label two seconds after a successful copy", async () => {
    vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    render(<CopyButton value="bkua_1234">Copy token</CopyButton>);
    await act(async () => {
      button().click();
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(button().textContent).toBe("Copied");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(button().textContent).toBe("Copy token");
  });

  it("calls onCopy with the copied value after a successful copy", async () => {
    vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    const onCopy = vi.fn();
    render(
      <CopyButton value="bkua_1234" onCopy={onCopy}>
        Copy token
      </CopyButton>,
    );
    await act(async () => {
      button().click();
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(onCopy).toHaveBeenCalledWith("bkua_1234");
  });

  it("stays enabled and focusable throughout", async () => {
    vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    render(<CopyButton value="bkua_1234">Copy token</CopyButton>);
    expect(button().disabled).toBe(false);
    await act(async () => {
      button().click();
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(button().disabled).toBe(false);
  });

  it("does not change the label and does not call onCopy when the copy fails", async () => {
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("denied"));
    const onCopy = vi.fn();
    render(
      <CopyButton value="bkua_1234" onCopy={onCopy}>
        Copy token
      </CopyButton>,
    );
    await act(async () => {
      button().click();
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(button().textContent).toBe("Copy token");
    expect(onCopy).not.toHaveBeenCalled();
  });

  it("announces the confirmation through a polite live region", () => {
    render(<CopyButton value="bkua_1234">Copy token</CopyButton>);
    expect(button().getAttribute("aria-live")).toBe("polite");
  });
});
