const TAG = "ds-toggle";

class DsToggle extends HTMLElement {
  connectedCallback() {
    const input = this.querySelector('input[type="checkbox"]');
    if (input instanceof HTMLInputElement) {
      input.setAttribute("role", "switch");
    }
  }
}

if (!customElements.get(TAG)) {
  customElements.define(TAG, DsToggle);
}

export {};
