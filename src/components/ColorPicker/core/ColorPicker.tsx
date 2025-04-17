import React, { JSX } from "react";
import "./ColorPicker.scss";
import { combineClassNames } from "../../../utils/classNames";
import { ColorPickerProps } from "../ColorPicker.types";


/**
 * A customizable color picker component that renders a group of color swatches
 * with optional support for custom color input and different shape/size variants.
 *
 * @param {ColorPickerProps} props - Props for the color picker component.
 * @returns {JSX.Element} The rendered color picker UI.
 */
const ColorPicker: React.FC<ColorPickerProps> = ({
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
  "data-testid": testId = "color-picker",
}: ColorPickerProps): JSX.Element => {
  return (
    <fieldset
      className={combineClassNames("colorPicker", className)}
      disabled={disabled}
      data-testid={testId}
    >
      <legend className={"legend"}>{label}</legend>

      <div className={"colorGrid"}>
        {colors.map((color, i) => (
          <label
            key={color.value}
            className={combineClassNames(
              "colorSwatch",
              size,
              shape,
              selected === color.value && "selected"
            )}
            htmlFor={`${testId}-color-${i}`}
            title={color.label}
            data-testid={`${testId}-option-${color.value}`}
          >
            <input
              type="radio"
              name={name}
              id={`${testId}-color-${i}`}
              value={color.value}
              checked={selected === color.value}
              onChange={() => onChange(color.value)}
              className={"radioInput"}
              aria-label={color.label}
            />
            <span
              className={combineClassNames("colorPreview", shape)}
              style={{ backgroundColor: color.value }}
              aria-hidden="true"
            />
          </label>
        ))}
      </div>

      {allowCustom && (
        <input
          type="color"
          className={"customColorInput"}
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Custom color picker"
          data-testid={`${testId}-custom-input`}
        />
      )}
    </fieldset>
  );
};

export default ColorPicker;
