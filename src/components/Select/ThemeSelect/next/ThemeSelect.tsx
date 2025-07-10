"use client";

import React, { useContext } from "react";
import { getAllColorSchemes } from "../../../../styles/colorSchemeRegistry";
import { Select } from "@/index.next";
import { ThemeContext } from "../../../../context/ThemeContext";
import { ThemeType } from "@/types/types";

interface ThemeSelectProps {
  theme?: ThemeType;
}

const UserThemeSettings: React.FC<ThemeSelectProps> = ({
  theme = "primary",
}) => {
  // Retrieve the current theme context.
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      "ThemeContext is undefined. Make sure to wrap this component with ThemeProvider."
    );
  }

  // Destructure the selectedScheme and the setter function from the context.
  const { selectedScheme, setSelectedScheme } = themeContext;
  const allSchemes = getAllColorSchemes();

  // Map available color schemes to options for the Select component.
  const options = allSchemes.map((scheme, index) => ({
    value: index.toString(),
    label: scheme.name,
  }));

  return (
    <div className={`control-container`}>
      <Select
        theme={theme}
        options={options}
        // Value is kept as a string since Select expects a string or number.
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
