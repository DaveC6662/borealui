/**
 * ---------------------------------------------------------------------
 * colorSchemes.ts
 * ---------------------------------------------------------------------
 * A curated list of predefined color schemes used for theming
 * in the Boreal UI system. Each scheme follows the `ColorScheme`
 * interface and defines a unique aesthetic by setting:
 *
 * - primaryColor: Main accent color for buttons, links, highlights
 * - secondaryColor: Complementary accent
 * - tertiaryColor: Alternative accent
 * - quaternaryColor: Another alternative accent
 * - backgroundColor: Default background for surfaces
 *
 * These schemes are typically used in theme switchers,
 * brand customization, or design system previews.
 *
 * New schemes can be registered dynamically at runtime using
 * `registerColorScheme()` from the color scheme registry.
 *
 * Example usage:
 *   const currentTheme = colorSchemes.find(t => t.name === "Ocean Breeze");
 */

import { ColorScheme } from "@/types/types";

export const colorSchemes: ColorScheme[] = [
  {
    name: "Ocean Breeze",
    primaryColor: "#02a899",
    secondaryColor: "#de6559",
    tertiaryColor: "#729E9A",
    quaternaryColor: "#ffa17f",
    backgroundColor: "#d9dbd9",
  },
  {
    name: "Rose Quartz",
    primaryColor: "#d98768",
    secondaryColor: "#a37981",
    tertiaryColor: "#806868",
    quaternaryColor: "#f1b8a0",
    backgroundColor: "#f7f4f2",
  },
  {
    name: "Berry Burst",
    primaryColor: "#b57077",
    secondaryColor: "#9183a3",
    tertiaryColor: "#78666D",
    quaternaryColor: "#e4b9c0",
    backgroundColor: "#EDEDED",
  },
  {
    name: "Autumn Glow",
    primaryColor: "#dea9a9",
    secondaryColor: "#CC8430",
    tertiaryColor: "#B7926A",
    quaternaryColor: "#ffe2b0",
    backgroundColor: "#F5F5F5",
  },
  {
    name: "Tropical Sunrise",
    primaryColor: "#DAA200",
    secondaryColor: "#d9a76c",
    tertiaryColor: "#AD8A59",
    quaternaryColor: "#ffe4b3",
    backgroundColor: "#fcfbf7",
  },
  {
    name: "Golden Hour",
    primaryColor: "#B58800",
    secondaryColor: "#9574cc",
    tertiaryColor: "#B5A163",
    quaternaryColor: "#c5a8ff",
    backgroundColor: "#dbdbd9",
  },
  {
    name: "Sunset",
    primaryColor: "#492578",
    secondaryColor: "#7d533b",
    tertiaryColor: "#b372d2",
    quaternaryColor: "#C68559",
    backgroundColor: "#2b2b2b",
  },
  {
    name: "Forest Dusk",
    primaryColor: "#1c4d3a",
    secondaryColor: "#6e502e",
    tertiaryColor: "#2c7160",
    quaternaryColor: "#dab57b",
    backgroundColor: "#222e2e",
  },
  {
    name: "Eclipse Night",
    primaryColor: "#4c4f5e",
    secondaryColor: "#444447",
    tertiaryColor: "#989bad",
    quaternaryColor: "#a58aff",
    backgroundColor: "#2b2b2b",
  },
];
