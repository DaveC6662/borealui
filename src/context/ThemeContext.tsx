"use client";

import React, { createContext, useState, useEffect } from "react";
import {
  getAllColorSchemes,
  registerColorScheme,
} from "../styles/colorSchemeRegistry";
import { defaultColorSchemeName } from "../config/boreal-style-config";
import { colorSchemes } from "../styles/Themes";
import { ThemeContextType, ThemeProviderProps } from "./ThemeContext.types";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const fallbackIndex = colorSchemes.findIndex(
  (scheme) => scheme.name === defaultColorSchemeName
);
const defaultIndex = fallbackIndex !== -1 ? fallbackIndex : 0;

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  customSchemes = [],
}) => {
  const [selectedScheme, setSelectedScheme] = useState<number>(defaultIndex);

  if (fallbackIndex === -1 && process.env.NODE_ENV === "development") {
    console.warn(
      `Default color scheme "${defaultColorSchemeName}" not found. Falling back to index 0.`
    );
  }

  useEffect(() => {
    registerColorScheme(customSchemes);
  }, [customSchemes]);

  useEffect(() => {
    const savedScheme = localStorage.getItem("selectedScheme");
    if (savedScheme) {
      setSelectedScheme(parseInt(savedScheme, 10));
    } else {
      setSelectedScheme(defaultIndex);
    }
  }, []);

  useEffect(() => {
    const allSchemes = getAllColorSchemes();
    const {
      primaryColor,
      secondaryColor,
      tertiaryColor,
      quaternaryColor,
      backgroundColor,
    } = allSchemes[selectedScheme];

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

    const contrastRatio = (hex1: string, hex2: string): number => {
      const lum1 = relativeLuminance(hex1);
      const lum2 = relativeLuminance(hex2);
      const lighter = Math.max(lum1, lum2);
      const darker = Math.min(lum1, lum2);
      return (lighter + 0.05) / (darker + 0.05);
    };

    const getAccessibleTextColor = (bgColor: string): string => {
      return contrastRatio(bgColor, "#000000") >= 4.5 ? "#000000" : "#FFFFFF";
    };

    // Compute variants
    const variants = {
      "--primary-color": primaryColor,
      "--primary-color-light": adjustLightness(primaryColor, 10),
      "--primary-color-hover": adjustLightness(primaryColor, -10),
      "--text-color-primary": getAccessibleTextColor(primaryColor),

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
    };

    const root = document.documentElement.style;
    for (const [key, value] of Object.entries(variants)) {
      root.setProperty(key, value);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedScheme", selectedScheme.toString());
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`Theme "${allSchemes[selectedScheme].name}" loaded`);
      console.log("Contrast Ratios:");
      console.log(
        "  Primary:",
        contrastRatio(primaryColor, variants["--text-color-primary"]).toFixed(2)
      );
      console.log(
        "  Secondary:",
        contrastRatio(
          secondaryColor,
          variants["--text-color-secondary"]
        ).toFixed(2)
      );
      console.log(
        "  Tertiary:",
        contrastRatio(tertiaryColor, variants["--text-color-tertiary"]).toFixed(
          2
        )
      );
      console.log(
        "  Quaternary:",
        contrastRatio(
          quaternaryColor,
          variants["--text-color-quaternary"]
        ).toFixed(2)
      );
    }
  }, [selectedScheme]);

  return (
    <ThemeContext.Provider value={{ selectedScheme, setSelectedScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
