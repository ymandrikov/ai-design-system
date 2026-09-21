import { readFileSync } from "node:fs";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { checkSettingsComposition } from "./check-composition";
import { SettingsPages } from "./settings-pages";
import { Stack } from "../react/stack";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function pages() {
  const container = document.createElement("div");
  container.innerHTML = renderToStaticMarkup(<SettingsPages />);
  return container;
}

it("accepts both settings compositions and uses native labels and fieldsets", () => {
  const container = pages();
  expect(container.querySelectorAll("[data-settings-page]")).toHaveLength(2);
  expect(checkSettingsComposition(container)).toEqual([]);
});

it.each([
  ["submitted name", (page: Element) => page.querySelector("input")!.removeAttribute("name")],
  ["field group after form Stack", (page: Element) => page.querySelector("form")!.append(page.querySelector("fieldset")!)],
  ["form membership", (page: Element) => page.insertBefore(page.querySelector("fieldset")!, page.querySelector("form"))],
  ["form association", (page: Element) => page.querySelector("input")!.setAttribute("form", "missing-form")],
  ["label", (page: Element) => page.querySelector("label")!.setAttribute("for", "missing")],
  ["error reference", (page: Element) => page.querySelector("[aria-describedby]")!.setAttribute("aria-describedby", "missing")],
  ["unreferenced error", (page: Element) => page.insertAdjacentHTML("beforeend", '<p id="orphan-error" data-field-error>Invalid email</p>')],
  ["group legend", (page: Element) => page.querySelector("legend")!.remove()],
  ["destructive group order", (page: Element) => page.prepend(page.querySelector("[data-settings-danger]")!)],
  ["misplaced actions", (page: Element) => page.querySelector("fieldset")!.append(page.querySelector("[data-settings-actions]")!)],
  ["actions before fields", (page: Element) => page.querySelector("form > [data-ds='stack']")!.prepend(page.querySelector("[data-settings-actions]")!)],
] as const)("rejects broken %s", (_, mutate) => {
  const container = pages();
  mutate(container.querySelector("[data-settings-page]")!);
  expect(checkSettingsComposition(container).length).toBeGreaterThan(0);
});

it("submits named native controls locally and reports the submitted values", () => {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  act(() => root.render(<SettingsPages />));
  const form = container.querySelector("form")!;
  const input = form.querySelector("input")!;
  input.value = "Ada";
  const event = new Event("submit", { bubbles: true, cancelable: true });
  act(() => form.dispatchEvent(event));
  expect(event.defaultPrevented).toBe(true);
  expect(form.querySelector("output")!.textContent).toContain("Ada");
  expect(form.querySelector("output")!.textContent).toContain("Local preview");
  act(() => root.unmount());
  container.remove();
});

it("connects native validation errors to their controls and clears them on input", () => {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  act(() => root.render(<SettingsPages />));
  const email = container.querySelector<HTMLInputElement>("#profile-email")!;
  email.value = "invalid";
  act(() => { email.checkValidity(); });
  expect(email.getAttribute("aria-invalid")).toBe("true");
  expect(container.querySelector("[data-field-error]")?.textContent).toBeTruthy();
  expect(checkSettingsComposition(container)).toEqual([]);
  act(() => email.dispatchEvent(new Event("input", { bubbles: true })));
  expect(email.hasAttribute("aria-invalid")).toBe(false);
  expect(container.querySelector("[data-field-error]")).toBeNull();
  act(() => root.unmount());
  container.remove();
});

it("provides actual shared CSS gaps for plain HTML and React stacks", () => {
  const style = document.createElement("style");
  style.textContent = readFileSync("fixtures/mini-ds/styles.css", "utf8");
  document.head.append(style);
  const container = document.createElement("div");
  container.innerHTML = '<div data-ds="stack"><p>One</p><p>Two</p></div>';
  document.body.append(container);
  const stack = container.firstElementChild! as HTMLElement;
  expect(getComputedStyle(stack).display).toBe("flex");
  expect(getComputedStyle(stack).flexDirection).toBe("column");
  expect(getComputedStyle(stack).gap).toBe("1rem");
  stack.setAttribute("data-space", "sm");
  expect(getComputedStyle(stack).gap).toBe("0.5rem");
  stack.setAttribute("data-space", "lg");
  expect(getComputedStyle(stack).gap).toBe("1.5rem");
  container.innerHTML = renderToStaticMarkup(<Stack space="lg"><p>One</p><p>Two</p></Stack>);
  expect(getComputedStyle(container.firstElementChild!).display).toBe("flex");
  expect(getComputedStyle(container.firstElementChild!).gap).toBe("1.5rem");
  container.remove();
  style.remove();
});
