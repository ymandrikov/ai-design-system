import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const REVERT_DELAY_MS = 2000;

export interface CopyButtonProps {
  value: string;
  confirmation?: string;
  onCopy?: (value: string) => void;
  children: ReactNode;
}

export function CopyButton({ value, confirmation = "Copied", onCopy, children }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  function handleClick() {
    navigator.clipboard.writeText(value).then(
      () => {
        setCopied(true);
        onCopy?.(value);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), REVERT_DELAY_MS);
      },
      () => {},
    );
  }

  return (
    <button type="button" onClick={handleClick} aria-live="polite">
      {copied ? confirmation : children}
    </button>
  );
}
