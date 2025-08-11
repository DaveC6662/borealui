import React, { useContext, useMemo } from "react";
import Select from "../../core/Select";
import { ThemeContext } from "../../../../context/ThemeContext";
import { RoundingType, ShadowType, StateType, ThemeType } from "@/types/types";
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
    <div className="control-container">
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
