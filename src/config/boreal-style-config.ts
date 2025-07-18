import { RoundingType, ShadowType, SizeType, ThemeType } from "../types/types";

export type BorealStyleConfig = {
  defaultTheme: ThemeType;
  defaultRounding: RoundingType;
  defaultShadow: ShadowType;
  defaultSize: SizeType;
  defaultColorSchemeName: string;
};

const fallback: BorealStyleConfig = {
  defaultTheme: "primary",
  defaultRounding: "medium",
  defaultShadow: "light",
  defaultSize: "medium",
  defaultColorSchemeName: "Forest Dusk",
};

let userConfig: Partial<BorealStyleConfig> = {};

export const setBorealStyleConfig = (config: Partial<BorealStyleConfig>) => {
  userConfig = config;
};

export const getDefaultTheme = (): ThemeType =>
  userConfig.defaultTheme ?? fallback.defaultTheme;

export const getDefaultRounding = (): RoundingType =>
  userConfig.defaultRounding ?? fallback.defaultRounding;

export const getDefaultShadow = (): ShadowType =>
  userConfig.defaultShadow ?? fallback.defaultShadow;

export const getDefaultSize = (): SizeType =>
  userConfig.defaultSize ?? fallback.defaultSize;

export const getDefaultColorSchemeName = (): string =>
  userConfig.defaultColorSchemeName ?? fallback.defaultColorSchemeName;
