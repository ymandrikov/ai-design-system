import { useEffect, useId, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export function Select({
  name,
  label,
  options,
  value,
  onChange,
  placeholder,
  disabled,
  required,
}: SelectProps) {
  const inputId = useId();
  const listboxId = useId();

  const selectedOption = options.find((option) => option.value === value);
  const [query, setQuery] = useState(selectedOption?.label ?? "");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    setQuery(selectedOption?.label ?? "");
  }, [value]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return options;
    return options.filter((option) => option.label.toLowerCase().includes(needle));
  }, [options, query]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query, open]);

  function restoreToSelection() {
    setOpen(false);
    setQuery(selectedOption?.label ?? "");
  }

  function commit(option: SelectOption) {
    onChange?.(option.value);
    setQuery(option.label);
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setHighlightedIndex((index) => Math.min(index + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setHighlightedIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      if (open && filtered[highlightedIndex]) {
        event.preventDefault();
        commit(filtered[highlightedIndex]);
      }
    } else if (event.key === "Escape") {
      restoreToSelection();
    }
  }

  const activeOption = open ? filtered[highlightedIndex] : undefined;
  const activeId = activeOption ? `${listboxId}-${activeOption.value}` : undefined;

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={activeId}
        autoComplete="off"
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={restoreToSelection}
        onKeyDown={handleKeyDown}
      />
      <ul id={listboxId} role="listbox" hidden={!open}>
        {filtered.length === 0 ? (
          <li>No matches</li>
        ) : (
          filtered.map((option, index) => (
            <li
              key={option.value}
              id={`${listboxId}-${option.value}`}
              role="option"
              aria-selected={option.value === value}
              data-highlighted={index === highlightedIndex ? "" : undefined}
              onMouseDown={(event) => {
                event.preventDefault();
                commit(option);
              }}
            >
              {option.label}
            </li>
          ))
        )}
      </ul>
      <input type="hidden" name={name} value={value ?? ""} readOnly />
    </div>
  );
}
