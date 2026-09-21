import { act } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Select } from "./select";

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

const options = [
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
  { value: "ca", label: "Canada" },
];

function input() {
  return container.querySelector("input[role='combobox']") as HTMLInputElement;
}

function listItems() {
  return Array.from(container.querySelectorAll("[role='option']"));
}

function typeInto(target: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set!;
  act(() => {
    setter.call(target, value);
    target.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function pressKey(target: HTMLInputElement, key: string) {
  act(() => {
    target.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
  });
}

describe("Select", () => {
  it("renders a combobox input associated with the label", () => {
    render(<Select name="country" label="Country" options={options} />);
    expect(input().getAttribute("role")).toBe("combobox");
    const label = container.querySelector("label") as HTMLLabelElement;
    expect(label.textContent).toBe("Country");
    expect(label.getAttribute("for")).toBe(input().id);
  });

  it("filters options by case-insensitive substring of the label and opens the list on typing", () => {
    render(<Select name="country" label="Country" options={options} />);
    typeInto(input(), "zil");
    expect(input().getAttribute("aria-expanded")).toBe("true");
    expect(listItems().map((item) => item.textContent)).toEqual(["Brazil"]);
  });

  it("moves the highlighted option down with ArrowDown and up with ArrowUp", () => {
    render(<Select name="country" label="Country" options={options} />);
    pressKey(input(), "ArrowDown");
    pressKey(input(), "ArrowDown");
    expect(listItems()[1].getAttribute("data-highlighted")).toBe("");
    pressKey(input(), "ArrowUp");
    expect(listItems()[0].getAttribute("data-highlighted")).toBe("");
  });

  it("selects the highlighted option, sets the value and closes the list on Enter", () => {
    const onChange = vi.fn();
    render(<Select name="country" label="Country" options={options} onChange={onChange} />);
    pressKey(input(), "ArrowDown");
    pressKey(input(), "ArrowDown");
    pressKey(input(), "Enter");
    expect(onChange).toHaveBeenCalledWith("br");
    expect(input().value).toBe("Brazil");
    expect(input().getAttribute("aria-expanded")).toBe("false");
  });

  it("closes the list and restores the input to the selected option's label on Escape", () => {
    render(<Select name="country" label="Country" options={options} value="au" />);
    typeInto(input(), "xyz");
    expect(input().getAttribute("aria-expanded")).toBe("true");
    pressKey(input(), "Escape");
    expect(input().getAttribute("aria-expanded")).toBe("false");
    expect(input().value).toBe("Australia");
  });

  it("sets the value, shows the label and closes the list when an option is chosen with the pointer", () => {
    const onChange = vi.fn();
    render(<Select name="country" label="Country" options={options} onChange={onChange} />);
    typeInto(input(), "ca");
    const option = listItems()[0];
    act(() => {
      option.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true }));
    });
    expect(onChange).toHaveBeenCalledWith("ca");
    expect(input().value).toBe("Canada");
    expect(input().getAttribute("aria-expanded")).toBe("false");
  });

  it("shows a single non-selectable No matches row when nothing matches", () => {
    render(<Select name="country" label="Country" options={options} />);
    typeInto(input(), "zzz");
    expect(listItems()).toHaveLength(0);
    const list = container.querySelector("[role='listbox']") as HTMLElement;
    expect(list.textContent).toBe("No matches");
  });

  it("keeps aria-controls and aria-activedescendant current with the highlighted option", () => {
    render(<Select name="country" label="Country" options={options} />);
    const listboxId = input().getAttribute("aria-controls");
    expect(listboxId).toBe(container.querySelector("[role='listbox']")?.id);
    pressKey(input(), "ArrowDown");
    expect(input().getAttribute("aria-activedescendant")).toBe(listItems()[0].id);
  });

  it("applies placeholder, disabled and required to the input", () => {
    render(
      <Select
        name="country"
        label="Country"
        options={options}
        placeholder="Choose a country"
        disabled
        required
      />,
    );
    expect(input().placeholder).toBe("Choose a country");
    expect(input().disabled).toBe(true);
    expect(input().required).toBe(true);
  });

  it("carries the value in a hidden input under the given name for form submission", () => {
    render(<Select name="country" label="Country" options={options} value="br" />);
    const hidden = container.querySelector("input[type='hidden']") as HTMLInputElement;
    expect(hidden.name).toBe("country");
    expect(hidden.value).toBe("br");
  });
});
