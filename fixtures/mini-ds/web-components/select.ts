const TAG = "ds-select";

interface OptionData {
  value: string;
  label: string;
}

let uidCounter = 0;

class DsSelect extends HTMLElement {
  #options: OptionData[] = [];
  #filtered: OptionData[] = [];
  #input!: HTMLInputElement;
  #hiddenInput!: HTMLInputElement;
  #list!: HTMLUListElement;
  #value = "";
  #activeIndex = -1;
  #isOpen = false;
  #uid = `ds-select-${++uidCounter}`;

  connectedCallback() {
    this.#options = Array.from(this.querySelectorAll("option")).map(
      (option) => ({
        value: option.getAttribute("value") ?? "",
        label: option.textContent ?? "",
      }),
    );
    this.#filtered = this.#options;
    this.textContent = "";

    const label = document.createElement("label");
    label.setAttribute("for", `${this.#uid}-input`);
    label.textContent = this.getAttribute("label") ?? "";

    const input = document.createElement("input");
    input.type = "text";
    input.id = `${this.#uid}-input`;
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-controls", `${this.#uid}-listbox`);
    input.setAttribute("aria-autocomplete", "list");
    input.autocomplete = "off";
    const placeholder = this.getAttribute("placeholder");
    if (placeholder) input.placeholder = placeholder;
    if (this.hasAttribute("disabled")) input.disabled = true;
    if (this.hasAttribute("required")) input.required = true;

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = this.getAttribute("name") ?? "";

    const list = document.createElement("ul");
    list.id = `${this.#uid}-listbox`;
    list.setAttribute("role", "listbox");
    list.hidden = true;

    this.append(label, input, hiddenInput, list);
    this.#input = input;
    this.#hiddenInput = hiddenInput;
    this.#list = list;

    input.addEventListener("input", this.#handleInput);
    input.addEventListener("keydown", this.#handleKeydown);

    const initialValue = this.getAttribute("value");
    if (initialValue) this.#applyValue(initialValue);
  }

  get value(): string {
    return this.#value;
  }

  set value(next: string) {
    this.#applyValue(next);
  }

  #applyValue(value: string) {
    const option = this.#options.find((o) => o.value === value);
    this.#value = option ? value : "";
    this.#hiddenInput.value = this.#value;
    this.#input.value = option ? option.label : "";
  }

  #openList() {
    this.#isOpen = true;
    this.#list.hidden = false;
    this.#input.setAttribute("aria-expanded", "true");
  }

  #closeList() {
    this.#isOpen = false;
    this.#list.hidden = true;
    this.#input.setAttribute("aria-expanded", "false");
    this.#setActiveIndex(-1);
  }

  #renderList() {
    this.#list.textContent = "";

    if (this.#filtered.length === 0) {
      const empty = document.createElement("li");
      empty.textContent = "No matches";
      empty.setAttribute("aria-disabled", "true");
      this.#list.append(empty);
      return;
    }

    this.#filtered.forEach((option, index) => {
      const item = document.createElement("li");
      item.id = `${this.#uid}-option-${index}`;
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", String(option.value === this.#value));
      item.textContent = option.label;
      item.addEventListener("click", () => this.#choose(option));
      this.#list.append(item);
    });

    this.#setActiveIndex(this.#activeIndex);
  }

  #setActiveIndex(index: number) {
    this.#activeIndex = index;
    if (index < 0 || index >= this.#filtered.length) {
      this.#input.removeAttribute("aria-activedescendant");
      return;
    }
    this.#input.setAttribute(
      "aria-activedescendant",
      `${this.#uid}-option-${index}`,
    );
  }

  #choose(option: OptionData) {
    this.#value = option.value;
    this.#hiddenInput.value = option.value;
    this.#input.value = option.label;
    this.#closeList();
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: option.value },
        bubbles: true,
      }),
    );
  }

  #handleInput = () => {
    const query = this.#input.value.toLowerCase();
    this.#filtered = this.#options.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
    this.#openList();
    this.#renderList();
  };

  #handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      if (!this.#isOpen) return;
      event.preventDefault();
      this.#setActiveIndex(Math.min(this.#activeIndex + 1, this.#filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      if (!this.#isOpen) return;
      event.preventDefault();
      this.#setActiveIndex(Math.max(this.#activeIndex - 1, 0));
    } else if (event.key === "Enter") {
      if (!this.#isOpen) return;
      const option = this.#filtered[this.#activeIndex];
      if (!option) return;
      event.preventDefault();
      this.#choose(option);
    } else if (event.key === "Escape") {
      if (!this.#isOpen) return;
      event.preventDefault();
      const selected = this.#options.find((o) => o.value === this.#value);
      this.#input.value = selected ? selected.label : "";
      this.#closeList();
    }
  };
}

if (!customElements.get(TAG)) {
  customElements.define(TAG, DsSelect);
}

export {};
