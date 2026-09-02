import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names, resolving conflicts. Used by every
 * shadcn/ui primitive and throughout the site.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
