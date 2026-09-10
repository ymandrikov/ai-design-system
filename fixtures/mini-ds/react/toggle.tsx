import { useId } from "react";
import type { ChangeEvent } from "react";

export interface ToggleProps {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ label, checked, defaultChecked, onChange, disabled }: ToggleProps) {
  const id = useId();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.checked);
  }

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        disabled={disabled}
      />
    </>
  );
}
