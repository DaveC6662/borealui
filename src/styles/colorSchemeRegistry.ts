"use client";

import { ColorScheme } from "@/types/types";
import { colorSchemes } from "./Themes";

export const registerColorScheme = (customSchemes: ColorScheme[]) => {
  for (const scheme of customSchemes) {
    const exists = colorSchemes.some((s) => s.name === scheme.name);
    if (!exists) {
      colorSchemes.push(scheme);
    } else if (process.env.NODE_ENV === "development") {
      console.warn(`Color scheme "${scheme.name}" already exists. Skipping.`);
    }
  }
};

export function getAllColorSchemes(): ColorScheme[] {
  return [...colorSchemes];
}
