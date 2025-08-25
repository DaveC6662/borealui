"use client";

import React, { useContext, useMemo } from "react";
import { Select } from "@/index.next";
import { ThemeContext } from "../../../../context/ThemeContext";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "@/config/boreal-style-config";
import { ThemeSelectProps } from "../../Select.types";

const UserThemeSettings: React.FC<ThemeSelectProps> = ({
  theme = getDefaultTheme(),
  shadow = getDefaultShadow(),
  rounding = getDefaultRounding(),
  state = "",
  "data-testid": testId = "theme-select",
}) => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("ThemeContext is undefined. Wrap with ThemeProvider.");

  const { selectedScheme, setSelectedScheme, schemes } = ctx;

  const options = useMemo(
    () =>
      schemes.map((scheme, index) => ({
        value: String(index),
        label: scheme.name,
      })),
    [schemes]
  );

  return (
    <div className={`control-container`}>
      <Select
        theme={theme}
        state={state}
        shadow={shadow}
        rounding={rounding}
        options={options}
        data-testid={testId}
        value={String(selectedScheme)}
        ariaLabel="Select Theme"
        onChange={(value: string | number) =>
          setSelectedScheme(parseInt(String(value), 10))
        }
      />
    </div>
  );
};

export default UserThemeSettings;
