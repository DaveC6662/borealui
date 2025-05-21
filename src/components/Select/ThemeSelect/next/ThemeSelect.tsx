"use client";

import React, { useContext } from "react";
import { colorSchemes } from "../../../../styles/Themes";
import { Select } from "@/index.next";
import { ThemeContext } from "../../../../context/ThemeContext";

/**
 * UserThemeSettings component allows users to select a color scheme/theme
 * from a list of available themes. It retrieves the current theme settings
 * from the ThemeContext and updates the selection through a dropdown (Select component).
 *
 * @component
 * @example
 * // Wrap your application with ThemeProvider to use UserThemeSettings:
 * // <ThemeProvider>
 * //   <UserThemeSettings />
 * // </ThemeProvider>
 *
 * @returns {JSX.Element} The rendered component for selecting a theme.
 */
const UserThemeSettings: React.FC = () => {
  // Retrieve the current theme context.
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      "ThemeContext is undefined. Make sure to wrap this component with ThemeProvider."
    );
  }

  // Destructure the selectedScheme and the setter function from the context.
  const { selectedScheme, setSelectedScheme } = themeContext;

  // Map available color schemes to options for the Select component.
  const options = colorSchemes.map((scheme, index) => ({
    value: index.toString(),
    label: scheme.name,
  }));

  return (
    <div className={`control-container`}>
      <Select
        theme="primary"
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
