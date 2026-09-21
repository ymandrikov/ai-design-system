import { afterEach, describe, expect, it, vi } from "vitest";
import "./toggle";

function mount() {
  const template = document.createElement("template");
  template.innerHTML = `
    <ds-toggle>
      <label for="notifications">Notifications</label>
      <input type="checkbox" id="notifications" />
    </ds-toggle>
  `;
  const host = template.content.firstElementChild as HTMLElement;
  document.body.appendChild(host);
  const input = host.querySelector("input") as HTMLInputElement;
  return { host, input };
}

describe("ds-toggle", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("sets role switch on the wrapped checkbox at upgrade", () => {
    const { input } = mount();
    expect(input.getAttribute("role")).toBe("switch");
  });

  it("lets the native change event bubble up through the host", () => {
    const { host, input } = mount();
    const listener = vi.fn();
    host.addEventListener("change", listener);
    input.checked = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
