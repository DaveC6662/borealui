"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { colorSchemes } from "../styles/Themes";

interface ThemeContextType {
  selectedScheme: number;
  setSelectedScheme: React.Dispatch<React.SetStateAction<number>>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [selectedScheme, setSelectedScheme] = useState<number>(4); // default

  useEffect(() => {
    const savedScheme = localStorage.getItem("selectedScheme");
    if (savedScheme) {
      setSelectedScheme(parseInt(savedScheme, 10));
    }
  }, []);

  useEffect(() => {
    const { primaryColor, secondaryColor, backgroundColor } = colorSchemes[selectedScheme];

    // --- Color Utilities ---
    const hexToHSL = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
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
        Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));

      return `#${[f(0), f(8), f(4)].map(x => x.toString(16).padStart(2, "0")).join("")}`;
    };

    const adjustLightness = (hex: string, percent: number): string => {
      const { h, s, l } = hexToHSL(hex);
      return hslToHex(h, s, Math.min(100, Math.max(0, l + percent)));
    };

    const relativeLuminance = (hex: string): number => {
      const rgb = [1, 3, 5].map(i => {
        const c = parseInt(hex.slice(i, i + 2), 16) / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow(((c + 0.055) / 1.055), 2.4);
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

    // --- Derive Color Variants ---
    const primaryLight = adjustLightness(primaryColor, 10);
    const primaryHover = adjustLightness(primaryColor, -10);
    const secondaryLight = adjustLightness(secondaryColor, 10);
    const secondaryHover = adjustLightness(secondaryColor, -10);
    const backgroundDark = adjustLightness(backgroundColor, -10);
    const backgroundDarker = adjustLightness(backgroundColor, -25);
    const backgroundLight = adjustLightness(backgroundColor, 10);
    const backgroundLighter = adjustLightness(backgroundColor, 20);

    const primaryContrastText = getAccessibleTextColor(backgroundColor);
    const secondaryContrastText = getAccessibleTextColor(secondaryColor);
    const linkColor = getAccessibleTextColor(backgroundColor);
    const linkHover = adjustLightness(linkColor, -20);
    const linkHoverPrimary = adjustLightness(primaryColor, -10);
    const linkHoverSecondary = adjustLightness(secondaryColor, -10);

    // --- Set CSS Variables in a batch ---
    const root = document.documentElement.style;
    const set = (name: string, value: string) => root.setProperty(name, value);

    set("--primary-color", primaryColor);
    set("--primary-color-light", primaryLight);
    set("--primary-color-hover", primaryHover);
    set("--text-color-primary", primaryContrastText);
    set("--secondary-color", secondaryColor);
    set("--secondary-color-light", secondaryLight);
    set("--secondary-color-hover", secondaryHover);
    set("--text-color-secondary", secondaryContrastText);
    set("--background-color", backgroundColor);
    set("--background-color-dark", backgroundDark);
    set("--background-color-darker", backgroundDarker);
    set("--background-color-light", backgroundLight);
    set("--background-color-lighter", backgroundLighter);
    set("--link-color", linkColor);
    set("--link-color-hover", linkHover);
    set("--link-hover-color-primary", linkHoverPrimary);
    set("--link-hover-color-secondary", linkHoverSecondary);

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedScheme", selectedScheme.toString());
    }

    if (process.env.NODE_ENV === "development") {
      console.log("Primary contrast ratio:", contrastRatio(primaryColor, primaryContrastText).toFixed(2));
      console.log("Secondary contrast ratio:", contrastRatio(secondaryColor, secondaryContrastText).toFixed(2));
    }
  }, [selectedScheme]);

  return (
    <ThemeContext.Provider value={{ selectedScheme, setSelectedScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
