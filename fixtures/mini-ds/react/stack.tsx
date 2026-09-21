import type { ComponentPropsWithoutRef } from "react";

export type StackSpace = "sm" | "md" | "lg";

export interface StackProps extends ComponentPropsWithoutRef<"div"> {
  space?: StackSpace;
}

export function Stack({ space = "md", ...rest }: StackProps) {
  return <div data-ds="stack" data-space={space} {...rest} />;
}
