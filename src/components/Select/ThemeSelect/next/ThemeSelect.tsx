"use client";

import React, { useContext } from "react";
import { getAllColorSchemes } from "../../../../styles/colorSchemeRegistry";
import { Select } from "@/index.next";
import { ThemeContext } from "../../../../context/ThemeContext";
import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "@/config/boreal-style-config";

interface ThemeSelectProps {
  theme?: ThemeType;
  shadow?: ShadowType;
  rounding?: RoundingType;
  "data-testid"?: string;
  state?: StateType;
}

const UserThemeSettings: React.FC<ThemeSelectProps> = ({
  theme = getDefaultTheme(),
  shadow = getDefaultShadow(),
  rounding = getDefaultRounding(),
  state = "",
  "data-testid": testId = "theme-select",
}) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      "ThemeContext is undefined. Make sure to wrap this component with ThemeProvider."
    );
  }

  const { selectedScheme, setSelectedScheme } = themeContext;
  const allSchemes = getAllColorSchemes();

  const options = allSchemes.map((scheme, index) => ({
    value: index.toString(),
    label: scheme.name,
  }));

  return (
    <div className={`control-container`}>
      <Select
        theme={theme}
        state={state}
        shadow={shadow}
        rounding={rounding}
        options={options}
        data-testid={`${testId}-select`}
        value={selectedScheme.toString()}
        onChange={(value: string | number) =>
          setSelectedScheme(parseInt(value as string, 10))
        }
        ariaLabel="Select Theme"
      />
    </div>
  );
};

export default UserThemeSettings;
