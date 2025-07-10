import React, { useMemo } from "react";
import { combineClassNames } from "../../utils/classNames";
import type { ColorPickerProps } from "./ColorPicker.types";
import { capitalize } from "../../utils/capitalize";
import { defaultShadow, defaultSize } from "../../config/boreal-style-config";

export interface ColorPickerBaseProps extends ColorPickerProps {
  classMap: Record<string, string>;
}

const ColorPickerBase: React.FC<ColorPickerBaseProps> = ({
  label = "Choose a color",
  colors,
  selected,
  onChange,
  name = "color-picker",
  disabled = false,
  size = defaultSize,
  shadow = defaultShadow,
  shape = "circle",
  allowCustom = false,
  className = "",
  classMap,
  "data-testid": testId = "color-picker",
}) => {
  const legendId = `${testId}-legend`;

  const labelClass = useMemo(
    () => combineClassNames(classMap.swatch, classMap[size], classMap[shape]),
    [classMap, size, shape]
  );

  return (
    <fieldset
      className={combineClassNames(classMap.color_picker, className)}
      disabled={disabled}
      aria-disabled={disabled}
      aria-labelledby={legendId}
      role="radiogroup"
      data-testid={testId}
    >
      <legend id={legendId} className={classMap.legend}>
        {label}
      </legend>

      <div className={classMap.color_picker_grid}>
        {colors.map((color, i) => (
          <label
            key={color.value}
            className={combineClassNames(
              labelClass,
              selected === color.value && classMap.selected
            )}
            htmlFor={`${testId}-color-${i}`}
            title={color.label}
            data-testid={`${testId}-option-${color.value}`}
          >
            <input
              title={color.label}
              type="radio"
              name={name}
              id={`${testId}-color-${i}`}
              value={color.value}
              checked={selected === color.value}
              onChange={() => onChange(color.value)}
              className={classMap.radio_input}
            />
            <span
              className={combineClassNames(
                classMap.preview,
                classMap[shape],
                shadow && classMap[`shadow${capitalize(shadow)}`]
              )}
              style={{ backgroundColor: color.value }}
              aria-hidden="true"
            />
          </label>
        ))}
      </div>

      {allowCustom && (
        <input
          type="color"
          className={classMap.custom_input}
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Custom color picker"
          data-testid={`${testId}-custom-input`}
        />
      )}
    </fieldset>
  );
};

export default ColorPickerBase;
