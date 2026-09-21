import { afterEach, describe, expect, it } from "vitest";
import "./dropdown-menu";

function mount(items = `
    <button type="button" role="menuitem">Rename</button>
    <a role="menuitem" href="/builds/1">Open</a>
  `) {
  const template = document.createElement("template");
  template.innerHTML = `
    <ds-dropdown-menu>
      <button type="button" data-slot="trigger">Actions</button>
      <div role="menu" hidden>${items}</div>
    </ds-dropdown-menu>
  `;
  const host = template.content.firstElementChild as HTMLElement;
  document.body.appendChild(host);
  const trigger = host.querySelector('[data-slot="trigger"]') as HTMLButtonElement;
  const menu = host.querySelector('[role="menu"]') as HTMLElement;
  return { host, trigger, menu };
}

describe("ds-dropdown-menu", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("keeps the menu hidden by default", () => {
    const { menu } = mount();
    expect(menu.hidden).toBe(true);
  });

  it("gives the trigger aria-haspopup menu and keeps aria-expanded current", () => {
    const { trigger, menu } = mount();
    expect(trigger.getAttribute("aria-haspopup")).toBe("menu");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    trigger.click();
    expect(menu.hidden).toBe(false);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
  });

  it("activating the trigger opens the menu and moves focus to the first enabled item", () => {
    const { trigger, menu } = mount();
    trigger.click();
    const first = menu.querySelector('[role="menuitem"]');
    expect(document.activeElement).toBe(first);
  });

  it("skips an item with aria-disabled true when moving focus between items", () => {
    const { trigger, menu } = mount(`
      <button type="button" role="menuitem" aria-disabled="true">Rename</button>
      <a role="menuitem" href="/builds/1">Open</a>
    `);
    trigger.click();
    const open = menu.querySelector('a[role="menuitem"]');
    expect(document.activeElement).toBe(open);
  });

  it("moves focus between enabled items with Arrow Down and Arrow Up, wrapping", () => {
    const { trigger, menu } = mount();
    trigger.click();
    const [rename, open] = Array.from(menu.querySelectorAll('[role="menuitem"]'));
    expect(document.activeElement).toBe(rename);
    menu.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(open);
    menu.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(rename);
    menu.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(open);
  });

  it("closes the menu and returns focus to the trigger on Escape", () => {
    const { trigger, menu } = mount();
    trigger.click();
    menu.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }));
    expect(menu.hidden).toBe(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger);
  });

  it("closes the menu when an item is activated", () => {
    const { trigger, menu } = mount();
    trigger.click();
    const rename = menu.querySelector('[role="menuitem"]') as HTMLButtonElement;
    rename.click();
    expect(menu.hidden).toBe(true);
  });

  it("closes the menu on a pointer press outside it", () => {
    const { trigger, menu } = mount();
    trigger.click();
    document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    expect(menu.hidden).toBe(true);
  });

  it("lets a consumer's own click handler on an item run undisturbed", () => {
    const { trigger, menu } = mount();
    trigger.click();
    const rename = menu.querySelector('[role="menuitem"]') as HTMLButtonElement;
    let ran = false;
    rename.addEventListener("click", () => {
      ran = true;
    });
    rename.click();
    expect(ran).toBe(true);
  });
});
