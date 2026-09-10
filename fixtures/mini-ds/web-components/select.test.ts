import { afterEach, describe, expect, it, vi } from "vitest";
import "./select";

function mount(attrs: string, options = '<option value="au">Australia</option><option value="br">Brazil</option>') {
  const template = document.createElement("template");
  template.innerHTML = `<ds-select ${attrs}>${options}</ds-select>`;
  const host = template.content.firstElementChild as HTMLElement & { value: string };
  document.body.appendChild(host);
  const input = host.querySelector("input[type=text]") as HTMLInputElement;
  const hiddenInput = host.querySelector("input[type=hidden]") as HTMLInputElement;
  const list = host.querySelector('[role="listbox"]') as HTMLUListElement;
  const label = host.querySelector("label") as HTMLLabelElement;
  return { host, input, hiddenInput, list, label };
}

function type(input: HTMLInputElement, value: string) {
  input.value = value;
  input.dispatchEvent(new Event("input"));
}

function keydown(input: HTMLInputElement, key: string) {
  input.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
}

describe("ds-select", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("names the hidden input's form field from the name attribute", () => {
    const { hiddenInput } = mount('name="country" label="Country"');
    expect(hiddenInput.name).toBe("country");
  });

  it("shows the label attribute as visible text associated with the input", () => {
    const { label, input } = mount('name="country" label="Country"');
    expect(label.textContent).toBe("Country");
    expect(label.getAttribute("for")).toBe(input.id);
  });

  it("defaults value to empty and reflects a provided value as a property", () => {
    const empty = mount('name="country" label="Country"');
    expect(empty.host.value).toBe("");
    expect(empty.hiddenInput.value).toBe("");

    const { host, hiddenInput, input } = mount('name="country" label="Country" value="br"');
    expect(host.value).toBe("br");
    expect(hiddenInput.value).toBe("br");
    expect(input.value).toBe("Brazil");
  });

  it("shows the placeholder text in the empty input", () => {
    const { input } = mount('name="country" label="Country" placeholder="Choose a country"');
    expect(input.placeholder).toBe("Choose a country");
  });

  it("applies disabled and required to the input", () => {
    const { input } = mount('name="country" label="Country" disabled required');
    expect(input.disabled).toBe(true);
    expect(input.required).toBe(true);
  });

  it("dispatches change on the host after choosing an option by click, bubbling with the new value", () => {
    const { host, input, list } = mount('name="country" label="Country"');
    const listener = vi.fn();
    document.addEventListener("change", listener);
    type(input, "au");
    const option = list.querySelector('[role="option"]') as HTMLLIElement;
    option.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(listener).toHaveBeenCalledTimes(1);
    const event = listener.mock.calls[0][0] as CustomEvent<{ value: string }>;
    expect(event.detail.value).toBe("au");
    expect(event.target).toBe(host);
    document.removeEventListener("change", listener);
  });

  it("filters options by case-insensitive substring of the label and opens the list when typing", () => {
    const { input, list } = mount('name="country" label="Country"');
    type(input, "zil");
    expect(list.hidden).toBe(false);
    const labels = Array.from(list.querySelectorAll('[role="option"]')).map((el) => el.textContent);
    expect(labels).toEqual(["Brazil"]);
  });

  it("moves the highlighted option on Arrow Down and Arrow Up", () => {
    const { input } = mount('name="country" label="Country"');
    type(input, "");
    keydown(input, "ArrowDown");
    expect(input.getAttribute("aria-activedescendant")).toMatch(/-option-0$/);
    keydown(input, "ArrowDown");
    expect(input.getAttribute("aria-activedescendant")).toMatch(/-option-1$/);
    keydown(input, "ArrowUp");
    expect(input.getAttribute("aria-activedescendant")).toMatch(/-option-0$/);
  });

  it("selects the highlighted option on Enter", () => {
    const { input, host } = mount('name="country" label="Country"');
    type(input, "");
    keydown(input, "ArrowDown");
    keydown(input, "Enter");
    expect(host.value).toBe("au");
    expect(input.value).toBe("Australia");
  });

  it("closes the list and restores the input to the selected option's label on Escape", () => {
    const { input, list } = mount('name="country" label="Country" value="br"');
    type(input, "au");
    expect(list.hidden).toBe(false);
    keydown(input, "Escape");
    expect(list.hidden).toBe(true);
    expect(input.value).toBe("Brazil");
  });

  it("choosing an option sets the value, shows its label in the input and closes the list", () => {
    const { host, input, list } = mount('name="country" label="Country"');
    type(input, "au");
    const option = list.querySelector('[role="option"]') as HTMLLIElement;
    option.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(host.value).toBe("au");
    expect(input.value).toBe("Australia");
    expect(list.hidden).toBe(true);
  });

  it("shows one non-selectable No matches row when nothing matches", () => {
    const { input, list } = mount('name="country" label="Country"');
    type(input, "zzz");
    const items = list.querySelectorAll("li");
    expect(items).toHaveLength(1);
    expect(items[0].textContent).toBe("No matches");
    expect(items[0].getAttribute("role")).not.toBe("option");
  });

  it("gives the input role combobox with aria-expanded, aria-controls and aria-activedescendant kept current", () => {
    const { input, list } = mount('name="country" label="Country"');
    expect(input.getAttribute("role")).toBe("combobox");
    expect(input.getAttribute("aria-expanded")).toBe("false");
    expect(input.getAttribute("aria-controls")).toBe(list.id);
    type(input, "au");
    expect(input.getAttribute("aria-expanded")).toBe("true");
    keydown(input, "ArrowDown");
    expect(input.getAttribute("aria-activedescendant")).toBe(list.querySelector('[role="option"]')?.id);
  });

  it("gives the list role listbox and each option role option with aria-selected", () => {
    const { input, list } = mount('name="country" label="Country" value="au"');
    type(input, "a");
    expect(list.getAttribute("role")).toBe("listbox");
    const options = Array.from(list.querySelectorAll('[role="option"]'));
    const australia = options.find((el) => el.textContent === "Australia");
    expect(australia?.getAttribute("aria-selected")).toBe("true");
  });
});
