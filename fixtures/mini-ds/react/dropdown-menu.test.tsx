import { act } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DropdownMenu, MenuItem, MenuLink } from "./dropdown-menu";

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

function trigger() {
  return container.querySelector("button[aria-haspopup='menu']") as HTMLButtonElement;
}

function menu() {
  return container.querySelector("[role='menu']") as HTMLElement;
}

function menuItems() {
  return Array.from(container.querySelectorAll("[role='menuitem']")) as HTMLElement[];
}

function open() {
  act(() => trigger().click());
}

function pressKey(key: string) {
  act(() => {
    document.activeElement?.dispatchEvent(
      new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }),
    );
  });
}

function example(extra: { onSelect?: () => void; disabled?: boolean } = {}) {
  return (
    <DropdownMenu label="Actions">
      <MenuItem onSelect={extra.onSelect} disabled={extra.disabled}>
        Rename
      </MenuItem>
      <MenuLink href="/builds/1">Open</MenuLink>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("renders a trigger with aria-haspopup menu and the given label", () => {
    render(example());
    expect(trigger().getAttribute("aria-haspopup")).toBe("menu");
    expect(trigger().textContent).toBe("Actions");
  });

  it("is closed by default", () => {
    render(example());
    expect(trigger().getAttribute("aria-expanded")).toBe("false");
    expect(menu().hidden).toBe(true);
  });

  it("activating the trigger opens the menu and moves focus to the first enabled item", () => {
    render(example());
    open();
    expect(trigger().getAttribute("aria-expanded")).toBe("true");
    expect(menu().hidden).toBe(false);
    expect(document.activeElement).toBe(menuItems()[0]);
  });

  it("ArrowDown moves focus to the next enabled item and wraps", () => {
    render(example());
    open();
    pressKey("ArrowDown");
    expect(document.activeElement).toBe(menuItems()[1]);
    pressKey("ArrowDown");
    expect(document.activeElement).toBe(menuItems()[0]);
  });

  it("ArrowUp moves focus to the previous enabled item and wraps", () => {
    render(example());
    open();
    pressKey("ArrowUp");
    expect(document.activeElement).toBe(menuItems()[1]);
  });

  it("Escape closes the menu and returns focus to the trigger", () => {
    render(example());
    open();
    pressKey("Escape");
    expect(trigger().getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger());
  });

  it("activating a MenuItem calls onSelect and closes the menu", () => {
    const onSelect = vi.fn();
    render(example({ onSelect }));
    open();
    act(() => menuItems()[0].click());
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(trigger().getAttribute("aria-expanded")).toBe("false");
  });

  it("renders MenuLink as a native anchor with role menuitem and the given href", () => {
    render(example());
    open();
    const link = menuItems()[1];
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("/builds/1");
    expect(link.textContent).toBe("Open");
  });

  it("activating a MenuLink closes the menu", () => {
    render(example());
    open();
    act(() => menuItems()[1].click());
    expect(trigger().getAttribute("aria-expanded")).toBe("false");
  });

  it("shows a disabled MenuItem but skips it during keyboard navigation and activation", () => {
    const onSelect = vi.fn();
    render(example({ onSelect, disabled: true }));
    open();
    expect(menuItems()[0].getAttribute("aria-disabled")).toBe("true");
    expect(document.activeElement).toBe(menuItems()[1]);
    act(() => menuItems()[0].click());
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("a pointer press outside the menu closes it", () => {
    render(example());
    open();
    act(() => {
      document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    });
    expect(trigger().getAttribute("aria-expanded")).toBe("false");
  });
});
