import type { ComponentPropsWithoutRef } from "react";

export type ButtonVariant = "secondary" | "primary" | "danger";
export type LinkButtonVariant = "secondary" | "primary";

export interface ButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "type"> {
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
}

export interface LinkButtonProps extends Omit<ComponentPropsWithoutRef<"a">, "href" | "type"> {
  href: string;
  variant?: LinkButtonVariant;
}

export function Button({ variant = "secondary", type = "button", ...rest }: ButtonProps) {
  return <button type={type} data-variant={variant} {...rest} data-ds="button" />;
}

export function LinkButton({ variant = "secondary", href, ...rest }: LinkButtonProps) {
  return <a href={href} data-variant={variant} {...rest} data-ds="button" />;
}
