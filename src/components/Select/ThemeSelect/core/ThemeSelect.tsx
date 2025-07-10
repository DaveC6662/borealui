import React, { useContext } from "react";
import Select from "../../core/Select";
import { ThemeContext } from "../../../../context/ThemeContext";
import { ThemeType } from "@/types/types";
import { useColorSchemes } from "@/hooks/useColorSchemes";

interface ThemeSelectProps {
  theme?: ThemeType;
}
const UserThemeSettings: React.FC<ThemeSelectProps> = ({
  theme = "primary",
}) => {
  const colorSchemes = useColorSchemes();
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      "ThemeContext is undefined. Make sure to wrap this component with ThemeProvider."
    );
  }

  const { selectedScheme, setSelectedScheme } = themeContext;

  const options = colorSchemes.map((scheme, index) => ({
    value: index.toString(),
    label: scheme.name,
  }));

  return (
    <div className="control-container">
      <Select
        theme={theme}
        options={options}
        value={selectedScheme.toString()}
        onChange={(value: string | number) =>
          setSelectedScheme(parseInt(value as string, 10))
        }
        ariaLabel="Select Theme"
        data-testid="theme-select"
      />
    </div>
  );
};

export default UserThemeSettings;
