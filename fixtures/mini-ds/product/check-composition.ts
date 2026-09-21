// Product-specific checks for the settings pattern; browser review covers layout and interaction.
export function checkSettingsComposition(root: ParentNode): string[] {
  const errors: string[] = [];
  const pages = Array.from(root.querySelectorAll("[data-settings-page]"));
  if (!pages.length) errors.push("No settings page found");
  for (const page of pages) {
    const report = (message: string) => errors.push(`${page.getAttribute("data-settings-page")}: ${message}`);
    const form = page.querySelector("form[data-settings-form]");
    const controls = Array.from(page.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input:not([type='hidden']), select, textarea"));
    const labels = Array.from(page.querySelectorAll("label"));
    for (const control of controls) {
      if (!control.name.trim()) report("Submitted control needs a name");
      if (!control.closest("form[data-settings-form]") || (control.hasAttribute("form") && (!form?.id || control.getAttribute("form") !== form.id))) report("Control must belong to the settings form");
      if (!control.id || !labels.some((label) => label.htmlFor === control.id && label.textContent?.trim())) report("Control needs an explicit visible label");
      if (!control.closest("fieldset")) report("Control needs a semantic field group");
      const descriptions = (control.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean);
      for (const id of descriptions) {
        if (!Array.from(page.querySelectorAll("[id]")).some((element) => element.id === id && element.textContent?.trim())) report("Description or error reference is missing");
      }
      if (control.getAttribute("aria-invalid") === "true" && !Array.from(page.querySelectorAll("[data-field-error]")).some((error) => descriptions.includes(error.id))) report("Invalid control needs an associated error");
    }
    for (const error of page.querySelectorAll("[data-field-error]")) {
      if (!error.id || !controls.some((control) => (control.getAttribute("aria-describedby") ?? "").split(/\s+/).includes(error.id))) report("Error must be associated with its control");
    }
    const stack = form && Array.from(form.children).find((child) => child.getAttribute("data-ds") === "stack");
    const actions = page.querySelector("[data-settings-actions]");
    for (const group of page.querySelectorAll("fieldset")) {
      if (!Array.from(group.children).find((child) => child.tagName === "LEGEND")?.textContent?.trim()) report("Field group needs a legend");
      if (!stack?.contains(group) || actions?.contains(group)) report("Field groups must belong to the form Stack before its save actions");
    }
    if (!form || !stack || !actions || actions.parentElement !== stack || stack.lastElementChild !== actions) report("Save actions must follow all field groups in the settings form");
    if (!actions?.querySelector("button[type='submit']")) report("Save actions need a native submit button");
    for (const button of page.querySelectorAll("button[type='submit']")) {
      if (!actions?.contains(button)) report("Submit action is outside the save action group");
    }
    const danger = page.querySelector("[data-settings-danger]");
    if (danger && (page.lastElementChild !== danger || danger.closest("form"))) report("Destructive group must be last and outside the settings form");
  }
  const ids = Array.from(root.querySelectorAll("[id]"), (element) => element.id);
  if (new Set(ids).size !== ids.length) errors.push("IDs must be unique across the composed pages");
  return errors;
}
