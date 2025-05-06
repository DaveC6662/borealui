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
      className={combineClassNames(classMap.color_picker, className)}
      disabled={disabled}
      aria-disabled={disabled}
      aria-labelledby={legendId}
      role="radiogroup"
      data-testid={testId}
    >
      <legend id={legendId} className={classMap.color_picker_legend}>
        {label}
      </legend>

      <div className={classMap.color_picker_grid}>
        {colors.map((color, i) => (
          <label
            key={color.value}
            className={combineClassNames(
              classMap.color_picker_swatch,
              classMap[`color_picker_${size}`],
              classMap[`color_picker_${shape}`],
              selected === color.value && classMap.color_picker_selected
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
              className={classMap.color_picker_radio_input}
            />
            <span
              className={combineClassNames(
                classMap.color_picker_preview,
                classMap[`color_picker_${shape}`]
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
          className={classMap.color_picker_custom_input}
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
