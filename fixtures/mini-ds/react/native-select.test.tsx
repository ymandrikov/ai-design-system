import { act } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NativeSelect } from "./native-select";

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
  { value: "production", label: "Production" },
  { value: "staging", label: "Staging" },
];

function select() {
  return container.querySelector("select") as HTMLSelectElement;
}

describe("NativeSelect", () => {
  it("renders a native select with the given name", () => {
    render(<NativeSelect name="environment" label="Environment" options={options} />);
    expect(select().tagName).toBe("SELECT");
    expect(select().name).toBe("environment");
  });

  it("renders an option for each entry in options", () => {
    render(<NativeSelect name="environment" label="Environment" options={options} />);
    const rendered = Array.from(select().options).map((option) => [option.value, option.textContent]);
    expect(rendered).toEqual([
      ["production", "Production"],
      ["staging", "Staging"],
    ]);
  });

  it("associates the visible label with the control", () => {
    render(<NativeSelect name="environment" label="Environment" options={options} />);
    const label = container.querySelector("label") as HTMLLabelElement;
    expect(label.textContent).toBe("Environment");
    expect(label.getAttribute("for")).toBe(select().id);
  });

  it("supports an uncontrolled default value", () => {
    render(
      <NativeSelect name="environment" label="Environment" options={options} defaultValue="staging" />,
    );
    expect(select().value).toBe("staging");
  });

  it("supports controlled value and onChange with native change events", () => {
    let seenValue: string | undefined;
    const onChange = vi.fn((event: { target: { value: string } }) => {
      seenValue = event.target.value;
    });
    render(
      <NativeSelect
        name="environment"
        label="Environment"
        options={options}
        value="production"
        onChange={onChange}
      />,
    );
    act(() => {
      select().value = "staging";
      select().dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(seenValue).toBe("staging");
  });

  it("applies required and disabled natively", () => {
    render(<NativeSelect name="environment" label="Environment" options={options} required disabled />);
    expect(select().required).toBe(true);
    expect(select().disabled).toBe(true);
  });
});

it("keeps the shared styling identity on its native control", () => {
  render(<NativeSelect name="environment" label="Environment" options={options} data-ds="consumer" />);
  expect(select().getAttribute("data-ds")).toBe("native-select");
});
