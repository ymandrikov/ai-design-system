import { act } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Button, LinkButton } from "./button";

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

describe("Button", () => {
  it("renders a native button element", () => {
    render(<Button>Save</Button>);
    expect(container.querySelector("button")).not.toBeNull();
  });

  it("defaults to variant secondary", () => {
    render(<Button>Save</Button>);
    expect(container.querySelector("button")?.getAttribute("data-variant")).toBe("secondary");
  });

  it("accepts variant primary", () => {
    render(<Button variant="primary">Save</Button>);
    expect(container.querySelector("button")?.getAttribute("data-variant")).toBe("primary");
  });

  it("accepts variant danger", () => {
    render(<Button variant="danger">Delete</Button>);
    expect(container.querySelector("button")?.getAttribute("data-variant")).toBe("danger");
  });

  it("defaults to type button", () => {
    render(<Button>Save</Button>);
    expect(container.querySelector("button")?.getAttribute("type")).toBe("button");
  });

  it("accepts type submit", () => {
    render(<Button type="submit">Save</Button>);
    expect(container.querySelector("button")?.getAttribute("type")).toBe("submit");
  });

  it("forwards native button attributes such as disabled and onClick", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    const button = container.querySelector("button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    act(() => button.click());
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders children as the button's label text", () => {
    render(<Button>Save changes</Button>);
    expect(container.querySelector("button")?.textContent).toBe("Save changes");
  });
});

describe("LinkButton", () => {
  it("renders a native anchor element with the given href", () => {
    render(<LinkButton href="/builds">View builds</LinkButton>);
    const link = container.querySelector("a");
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe("/builds");
  });

  it("defaults to variant secondary", () => {
    render(<LinkButton href="/builds">View builds</LinkButton>);
    expect(container.querySelector("a")?.getAttribute("data-variant")).toBe("secondary");
  });

  it("accepts variant primary", () => {
    render(
      <LinkButton href="/builds" variant="primary">
        View builds
      </LinkButton>,
    );
    expect(container.querySelector("a")?.getAttribute("data-variant")).toBe("primary");
  });

  it("renders children as the link's label text", () => {
    render(<LinkButton href="/builds">View builds</LinkButton>);
    expect(container.querySelector("a")?.textContent).toBe("View builds");
  });
});

it("keeps shared styling identity on buttons and links", () => {
  render(<><Button data-ds="consumer">Save</Button><LinkButton href="/" data-ds="consumer">Home</LinkButton></>);
  expect(Array.from(container.querySelectorAll("button, a"), element => element.getAttribute("data-ds"))).toEqual(["button", "button"]);
});
