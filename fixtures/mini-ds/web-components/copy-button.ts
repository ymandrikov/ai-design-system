const TAG = "ds-copy-button";
const REVERT_DELAY_MS = 2000;

class DsCopyButton extends HTMLElement {
  #button: HTMLButtonElement | null = null;
  #liveRegion: HTMLElement | null = null;
  #originalLabel = "";
  #revertTimer: ReturnType<typeof setTimeout> | null = null;

  connectedCallback() {
    const button = this.querySelector("button");
    if (!(button instanceof HTMLButtonElement)) return;

    this.#button = button;
    this.#originalLabel = button.textContent ?? "";

    const liveRegion = document.createElement("span");
    liveRegion.setAttribute("role", "status");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.style.position = "absolute";
    liveRegion.style.width = "1px";
    liveRegion.style.height = "1px";
    liveRegion.style.overflow = "hidden";
    liveRegion.style.clip = "rect(0, 0, 0, 0)";
    this.append(liveRegion);
    this.#liveRegion = liveRegion;

    button.addEventListener("click", this.#handleClick);
  }

  disconnectedCallback() {
    this.#button?.removeEventListener("click", this.#handleClick);
    if (this.#revertTimer) clearTimeout(this.#revertTimer);
  }

  #handleClick = async () => {
    const value = this.getAttribute("value");
    const button = this.#button;
    if (value === null || !button) return;

    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }

    const confirmation = this.getAttribute("confirmation") ?? "Copied";
    button.textContent = confirmation;
    if (this.#liveRegion) this.#liveRegion.textContent = confirmation;

    if (this.#revertTimer) clearTimeout(this.#revertTimer);
    this.#revertTimer = setTimeout(() => {
      button.textContent = this.#originalLabel;
      this.#revertTimer = null;
    }, REVERT_DELAY_MS);

    this.dispatchEvent(
      new CustomEvent("ds-copy", { detail: { value }, bubbles: true }),
    );
  };
}

if (!customElements.get(TAG)) {
  customElements.define(TAG, DsCopyButton);
}

export {};
