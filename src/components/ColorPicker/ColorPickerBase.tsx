import React from "react";
import { combineClassNames } from "@/utils/classNames";
import type { ColorPickerProps } from "./ColorPicker.types";

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
  size = "medium",
  shape = "round",
  allowCustom = false,
  className = "",
  classMap,
  "data-testid": testId = "color-picker",
}) => {
  const legendId = `${testId}-legend`;

  return (
    <fieldset
      className={combineClassNames(classMap.colorPicker, className)}
      disabled={disabled}
      aria-disabled={disabled}
      aria-labelledby={legendId}
      role="radiogroup"
      data-testid={testId}
    >
      <legend id={legendId} className={classMap.legend}>
        {label}
      </legend>

      <div className={classMap.colorGrid}>
        {colors.map((color, i) => (
          <label
            key={color.value}
            className={combineClassNames(
              classMap.colorSwatch,
              classMap[size],
              classMap[shape],
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
              className={classMap.radioInput}
            />
            <span
              className={combineClassNames(
                classMap.colorPreview,
                classMap[shape]
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
          className={classMap.customColorInput}
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
