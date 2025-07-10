export type BorealStyleConfig = {
  defaultTheme: string;
  defaultRounding: string;
  defaultShadow: string;
  defaultSize: string;
};

const fallback: BorealStyleConfig = {
  defaultTheme: "primary",
  defaultRounding: "medium",
  defaultShadow: "light",
  defaultSize: "medium",
};

let userConfig: Partial<BorealStyleConfig> = {};

if (typeof window !== "undefined" && (window as any).__BOREAL_UI_CONFIG__) {
  userConfig = (window as any).__BOREAL_UI_CONFIG__;
}

export const defaultTheme = userConfig.defaultTheme ?? fallback.defaultTheme;
export const defaultRounding =
  userConfig.defaultRounding ?? fallback.defaultRounding;
export const defaultShadow = userConfig.defaultShadow ?? fallback.defaultShadow;
export const defaultSize = userConfig.defaultSize ?? fallback.defaultSize;
export const defaultColorSchemeName = "Forest Dusk";
