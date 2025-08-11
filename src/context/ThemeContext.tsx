"use client";

/**
 * ---------------------------------------------------------------------
 * ThemeProvider.tsx
 * ---------------------------------------------------------------------
 * Provides a React context for managing and applying color schemes
 * dynamically across the Boreal UI system.
 *
 * Responsibilities:
 * - Registers any custom color schemes at runtime
 * - Sets the active color scheme based on `localStorage` or fallback default
 * - Dynamically updates CSS custom properties (`--*`) on the `:root`
 *   to reflect the selected theme's color values
 * - Ensures text color contrast by calculating luminance and WCAG ratios
 *
 * Includes:
 * - Lightness adjustment utilities for generating `*-light` and `*-hover` variants
 * - Contrast checking and accessible text color fallbacks
 * - `ThemeContext` with `selectedScheme` index and setter
 *
 * Hooks:
 * - `useEffect` to register schemes and sync saved theme index
 * - `useEffect` to apply all computed color variables to `document.documentElement`
 *
 * Usage:
 * ```tsx
 * <ThemeProvider customSchemes={[customTheme]}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * Access via context:
 * ```ts
 * const { selectedScheme, setSelectedScheme } = useContext(ThemeContext);
 * ```
 */

import React, {
  createContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  getAllColorSchemes,
  registerColorScheme,
} from "../styles/colorSchemeRegistry";
import { getDefaultColorSchemeName } from "../config/boreal-style-config";
import { colorSchemes } from "../styles/Themes";
import { ThemeContextType, ThemeProviderProps } from "./ThemeContext.types";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const fallbackIndex = colorSchemes.findIndex(
  (scheme) => scheme.name === getDefaultColorSchemeName()
);
const defaultIndex = fallbackIndex !== -1 ? fallbackIndex : 0;

const STORAGE_KEY = "boreal:selectedScheme";

const ThemeProvider: React.FC<
  ThemeProviderProps & { initialScheme?: number }
> = ({ children, customSchemes = [], initialScheme }) => {
  if (fallbackIndex === -1 && process.env.NODE_ENV === "development") {
    console.warn(
      `Default color scheme "${getDefaultColorSchemeName()}" not found. Falling back to index 0.`
    );
  }

  const [selectedScheme, setSelectedScheme] = useState<number>(() => {
    if (typeof initialScheme === "number") return initialScheme;

    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved != null) return parseInt(saved, 10);
      } catch {
        console.error("Failed to load saved theme index");
      }
    }
    return defaultIndex;
  });

  useEffect(() => {
    registerColorScheme(customSchemes);
  }, [customSchemes]);

  useLayoutEffect(() => {
    const allSchemes = getAllColorSchemes();
    const scheme = allSchemes[selectedScheme] ?? allSchemes[defaultIndex];

    const {
      primaryColor,
      secondaryColor,
      tertiaryColor,
      quaternaryColor,
      backgroundColor,
      forceTextColor,
    } = scheme;

    const hexToHSL = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      let h = 0,
        s = 0;
      const l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
      };
    };

    const hslToHex = (h: number, s: number, l: number): string => {
      s /= 100;
      l /= 100;
      const k = (n: number) => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n: number) =>
        Math.round(
          255 *
            (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
        );
      return `#${[f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
    };

    const adjustLightness = (hex: string, percent: number): string => {
      const { h, s, l } = hexToHSL(hex);
      return hslToHex(h, s, Math.min(100, Math.max(0, l + percent)));
    };

    const relativeLuminance = (hex: string): number => {
      const rgb = [1, 3, 5].map((i) => {
        const c = parseInt(hex.slice(i, i + 2), 16) / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    };

    const contrastRatio = (a: string, b: string): number => {
      const lum1 = relativeLuminance(a);
      const lum2 = relativeLuminance(b);
      const lighter = Math.max(lum1, lum2);
      const darker = Math.min(lum1, lum2);
      return (lighter + 0.05) / (darker + 0.05);
    };

    const getAccessibleTextColor = (bg: string): string =>
      contrastRatio(bg, "#000000") >= 4.5 ? "#000000" : "#FFFFFF";

    const vars = {
      "--primary-color": primaryColor,
      "--primary-color-light": adjustLightness(primaryColor, 10),
      "--primary-color-hover": adjustLightness(primaryColor, -10),
      "--text-color-primary":
        forceTextColor ?? getAccessibleTextColor(primaryColor),

      "--secondary-color": secondaryColor,
      "--secondary-color-light": adjustLightness(secondaryColor, 10),
      "--secondary-color-hover": adjustLightness(secondaryColor, -10),
      "--text-color-secondary": getAccessibleTextColor(secondaryColor),

      "--tertiary-color": tertiaryColor,
      "--tertiary-color-light": adjustLightness(tertiaryColor, 10),
      "--tertiary-color-hover": adjustLightness(tertiaryColor, -10),
      "--text-color-tertiary": getAccessibleTextColor(tertiaryColor),

      "--quaternary-color": quaternaryColor,
      "--quaternary-color-light": adjustLightness(quaternaryColor, 10),
      "--quaternary-color-hover": adjustLightness(quaternaryColor, -10),
      "--text-color-quaternary": getAccessibleTextColor(quaternaryColor),

      "--background-color": backgroundColor,
      "--background-color-dark": adjustLightness(backgroundColor, -10),
      "--background-color-darker": adjustLightness(backgroundColor, -25),
      "--background-color-light": adjustLightness(backgroundColor, 10),
      "--background-color-lighter": adjustLightness(backgroundColor, 20),

      "--link-color": getAccessibleTextColor(backgroundColor),
      "--link-color-hover": adjustLightness(
        getAccessibleTextColor(backgroundColor),
        -20
      ),
      "--link-hover-color-primary": adjustLightness(primaryColor, -10),
      "--link-hover-color-secondary": adjustLightness(secondaryColor, -10),
    } as const;

    const rootStyle = document.documentElement.style;
    for (const [k, v] of Object.entries(vars)) rootStyle.setProperty(k, v);

    try {
      localStorage.setItem(STORAGE_KEY, String(selectedScheme));
    } catch {
      console.error("Failed to save theme index");
    }
  }, [selectedScheme]);

  return (
    <ThemeContext.Provider value={{ selectedScheme, setSelectedScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
