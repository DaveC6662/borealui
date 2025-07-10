export type ColorScheme = {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  quaternaryColor: string;
  backgroundColor: string;
};

import { colorSchemes as defaultColorSchemes } from "./Themes";

let userColorSchemes: ColorScheme[] = [];

export function registerUserColorSchemes(schemes: ColorScheme[]) {
  userColorSchemes = schemes;
}

export function getAllColorSchemes(): ColorScheme[] {
  return [...defaultColorSchemes, ...userColorSchemes];
}
