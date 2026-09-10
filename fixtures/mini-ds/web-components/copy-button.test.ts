import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import "./copy-button";

function mockClipboard() {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
  return writeText;
}

function mount(attrs = 'value="bkua_1234"', label = "Copy token") {
  const template = document.createElement("template");
  template.innerHTML = `<ds-copy-button ${attrs}><button type="button">${label}</button></ds-copy-button>`;
  const el = template.content.firstElementChild as HTMLElement;
  document.body.appendChild(el);
  const button = el.querySelector("button") as HTMLButtonElement;
  return { el, button };
}

describe("ds-copy-button", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    vi.useRealTimers();
  });

  it("writes the value attribute to the clipboard on activation", async () => {
    const writeText = mockClipboard();
    const { button } = mount('value="bkua_1234"');
    button.click();
    await Promise.resolve();
    await Promise.resolve();
    expect(writeText).toHaveBeenCalledWith("bkua_1234");
  });

  it("shows the default confirmation label after a successful write", async () => {
    mockClipboard();
    const { button } = mount('value="bkua_1234"');
    button.click();
    await Promise.resolve();
    await Promise.resolve();
    expect(button.textContent).toBe("Copied");
  });

  it("shows a custom confirmation label after a successful write", async () => {
    mockClipboard();
    const { button } = mount('value="bkua_1234" confirmation="Token copied"');
    button.click();
    await Promise.resolve();
    await Promise.resolve();
    expect(button.textContent).toBe("Token copied");
  });

  it("dispatches ds-copy on the host with the copied value, bubbling", async () => {
    mockClipboard();
    const { el, button } = mount('value="bkua_1234"');
    const listener = vi.fn();
    document.addEventListener("ds-copy", listener);
    button.click();
    await Promise.resolve();
    await Promise.resolve();
    expect(listener).toHaveBeenCalledTimes(1);
    const event = listener.mock.calls[0][0] as CustomEvent<{ value: string }>;
    expect(event.detail.value).toBe("bkua_1234");
    expect(event.target).toBe(el);
    document.removeEventListener("ds-copy", listener);
  });

  it("reverts the label to its original text two seconds after success, staying enabled throughout", async () => {
    vi.useFakeTimers();
    mockClipboard();
    const { button } = mount('value="bkua_1234"', "Copy token");
    button.click();
    await vi.advanceTimersByTimeAsync(0);
    expect(button.textContent).toBe("Copied");
    expect(button.disabled).toBe(false);
    await vi.advanceTimersByTimeAsync(1999);
    expect(button.textContent).toBe("Copied");
    await vi.advanceTimersByTimeAsync(1);
    expect(button.textContent).toBe("Copy token");
    expect(button.disabled).toBe(false);
  });

  it("leaves the label unchanged and fires no event on a failed write", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    const { button } = mount('value="bkua_1234"', "Copy token");
    const listener = vi.fn();
    document.addEventListener("ds-copy", listener);
    button.click();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(button.textContent).toBe("Copy token");
    expect(listener).not.toHaveBeenCalled();
    document.removeEventListener("ds-copy", listener);
  });

  it("announces the confirmation through a polite live region", async () => {
    mockClipboard();
    const { el, button } = mount('value="bkua_1234"');
    button.click();
    await Promise.resolve();
    await Promise.resolve();
    const liveRegion = el.querySelector('[aria-live="polite"]');
    expect(liveRegion).not.toBeNull();
    expect(liveRegion?.getAttribute("role")).toBe("status");
    expect(liveRegion?.textContent).toBe("Copied");
  });
});
