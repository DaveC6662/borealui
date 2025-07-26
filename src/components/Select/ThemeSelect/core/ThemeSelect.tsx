import React, { useContext } from "react";
import Select from "../../core/Select";
import { ThemeContext } from "../../../../context/ThemeContext";
import { RoundingType, ShadowType, StateType, ThemeType } from "@/types/types";
import { getAllColorSchemes } from "../../../../styles/colorSchemeRegistry";
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
  "data-testid": testId = "theme-select",
  state = "",
}) => {
  const allSchemes = getAllColorSchemes();
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      "ThemeContext is undefined. Make sure to wrap this component with ThemeProvider."
    );
  }

  const { selectedScheme, setSelectedScheme } = themeContext;

  const options = allSchemes.map((scheme, index) => ({
    value: index.toString(),
    label: scheme.name,
  }));

  return (
    <div className="control-container">
      <Select
        theme={theme}
        shadow={shadow}
        rounding={rounding}
        state={state}
        data-testid={`${testId}-select`}
        options={options}
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
