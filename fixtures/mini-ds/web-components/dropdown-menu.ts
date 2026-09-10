const TAG = "ds-dropdown-menu";

class DsDropdownMenu extends HTMLElement {
  #trigger: HTMLButtonElement | null = null;
  #menu: HTMLElement | null = null;

  connectedCallback() {
    const trigger = this.querySelector('[data-slot="trigger"]');
    const menu = this.querySelector('[role="menu"]');
    if (!(trigger instanceof HTMLButtonElement) || !(menu instanceof HTMLElement)) return;

    this.#trigger = trigger;
    this.#menu = menu;

    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-expanded", "false");
    menu.hidden = true;

    trigger.addEventListener("click", this.#handleTriggerClick);
    menu.addEventListener("keydown", this.#handleMenuKeydown);
    menu.addEventListener("click", this.#handleMenuClick);
    document.addEventListener("pointerdown", this.#handleOutsidePointer);
  }

  disconnectedCallback() {
    document.removeEventListener("pointerdown", this.#handleOutsidePointer);
  }

  #items(): HTMLElement[] {
    if (!this.#menu) return [];
    return Array.from(this.#menu.querySelectorAll('[role="menuitem"]')).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && el.getAttribute("aria-disabled") !== "true",
    );
  }

  #open() {
    if (!this.#trigger || !this.#menu) return;
    this.#menu.hidden = false;
    this.#trigger.setAttribute("aria-expanded", "true");
    this.#items()[0]?.focus();
  }

  #close(returnFocus: boolean) {
    if (!this.#trigger || !this.#menu) return;
    this.#menu.hidden = true;
    this.#trigger.setAttribute("aria-expanded", "false");
    if (returnFocus) this.#trigger.focus();
  }

  #handleTriggerClick = () => {
    if (!this.#menu) return;
    if (this.#menu.hidden) this.#open();
    else this.#close(false);
  };

  #handleMenuKeydown = (event: KeyboardEvent) => {
    const items = this.#items();
    if (items.length === 0) return;
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
      items[next]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev =
        currentIndex === -1 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length;
      items[prev]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      this.#close(true);
    }
  };

  #handleMenuClick = (event: MouseEvent) => {
    const target = event.target instanceof Element ? event.target.closest('[role="menuitem"]') : null;
    if (!target || target.getAttribute("aria-disabled") === "true") return;
    this.#close(false);
  };

  #handleOutsidePointer = (event: PointerEvent) => {
    if (!this.#menu || this.#menu.hidden) return;
    if (event.target instanceof Node && this.contains(event.target)) return;
    this.#close(false);
  };
}

if (!customElements.get(TAG)) {
  customElements.define(TAG, DsDropdownMenu);
}

export {};
