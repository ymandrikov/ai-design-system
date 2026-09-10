import { useId } from "react";
import type { SelectHTMLAttributes } from "react";

export interface NativeSelectOption {
  value: string;
  label: string;
}

export interface NativeSelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "multiple" | "children" | "name"> {
  name: string;
  label: string;
  options: NativeSelectOption[];
}

export function NativeSelect({ name, label, options, id, ...rest }: NativeSelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <>
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} name={name} {...rest} data-ds="native-select">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
