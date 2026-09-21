// Copy beside the generated contact-settings.tsx in a controller-owned verification copy.
import { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it, vi } from "vitest";
import { ContactSettings } from "./contact-settings";
import { SettingsPages } from "./settings-pages";
import { checkSettingsComposition } from "./check-composition";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

it("renders the requested contact page and rejects displaced field groups", () => {
  const container = document.createElement("div");
  container.innerHTML = renderToStaticMarkup(<ContactSettings />);
  const page = container.querySelector('[data-settings-page]');
  expect(page).not.toBeNull();
  expect(page!.querySelector("h1, h2, h3, h4, h5, h6")?.textContent?.trim()).toBeTruthy();
  const email = page!.querySelector<HTMLInputElement>('input[type="email"]')!;
  expect(email).not.toBeNull();
  expect(email.required).toBe(true);
  expect(Array.from(page!.querySelectorAll("label")).some(label => label.htmlFor === email.id && label.textContent === "Contact email")).toBe(true);
  expect(email.closest("fieldset")?.querySelector("legend")?.textContent).toBe("Contact");
  expect(page!.querySelector('button[type="submit"]')?.textContent).toBe("Save contact preferences");
  expect(page!.querySelector("[data-settings-danger]")).toBeNull();
  expect(checkSettingsComposition(container)).toEqual([]);
  const combined = document.createElement("div");
  combined.innerHTML = renderToStaticMarkup(<><SettingsPages /><ContactSettings /></>);
  expect(checkSettingsComposition(combined)).toEqual([]);
  page!.querySelector("form")!.append(page!.querySelector("fieldset")!);
  expect(checkSettingsComposition(container).some(error => error.includes("Field groups"))).toBe(true);
});

it("submits the actual email to local feedback without requests", () => {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const fetchSpy = vi.spyOn(globalThis, "fetch");
  const xhrSpy = vi.spyOn(XMLHttpRequest.prototype, "send");
  try {
    act(() => root.render(<ContactSettings />));
    const form = container.querySelector("form[data-settings-form]")!;
    const email = form.querySelector<HTMLInputElement>('input[type="email"]')!;
    email.value = "controller@example.com";
    act(() => email.dispatchEvent(new Event("input", { bubbles: true })));
    const submit = new Event("submit", { bubbles: true, cancelable: true });
    act(() => form.dispatchEvent(submit));
    expect(submit.defaultPrevented).toBe(true);
    expect(form.querySelector("output")?.textContent).toContain("controller@example.com");
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(xhrSpy).not.toHaveBeenCalled();
    expect(checkSettingsComposition(container)).toEqual([]);
  } finally {
    act(() => root.unmount());
    container.remove();
    fetchSpy.mockRestore();
    xhrSpy.mockRestore();
  }
});
