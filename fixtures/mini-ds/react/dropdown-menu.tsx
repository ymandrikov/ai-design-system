import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";

const DropdownMenuContext = createContext<{ close: () => void } | null>(null);

function enabledItems(menu: HTMLElement | null) {
  return Array.from(menu?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []).filter(
    (item) => item.getAttribute("aria-disabled") !== "true",
  );
}

export interface DropdownMenuProps {
  label: string;
  children: ReactNode;
}

export function DropdownMenu({ label, children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;

    enabledItems(menuRef.current)[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      const items = enabledItems(menuRef.current);
      if (items.length === 0) return;
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        items[(currentIndex + 1) % items.length].focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        items[(currentIndex - 1 + items.length) % items.length].focus();
      } else if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      const inMenu = menuRef.current?.contains(target) ?? false;
      const inTrigger = triggerRef.current?.contains(target) ?? false;
      if (!inMenu && !inTrigger) setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <div>
      <button
        type="button"
        ref={triggerRef}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
      </button>
      <div ref={menuRef} id={menuId} role="menu" hidden={!open}>
        <DropdownMenuContext.Provider value={{ close }}>{children}</DropdownMenuContext.Provider>
      </div>
    </div>
  );
}

export interface MenuItemProps {
  onSelect?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export function MenuItem({ onSelect, disabled = false, children }: MenuItemProps) {
  const context = useContext(DropdownMenuContext);

  return (
    <button
      type="button"
      role="menuitem"
      aria-disabled={disabled || undefined}
      onClick={() => {
        if (disabled) return;
        onSelect?.();
        context?.close();
      }}
    >
      {children}
    </button>
  );
}

export interface MenuLinkProps {
  href: string;
  children: ReactNode;
}

export function MenuLink({ href, children }: MenuLinkProps) {
  const context = useContext(DropdownMenuContext);

  return (
    <a role="menuitem" href={href} onClick={() => context?.close()}>
      {children}
    </a>
  );
}
