import React, { JSX } from "react";
import styles from "./ColorPicker.module.scss";
import { combineClassNames } from "@/utils/classNames";
import { ColorPickerProps } from "./ColorPicker.types";


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
      className={combineClassNames(styles.colorPicker, className)}
      disabled={disabled}
      data-testid={testId}
    >
      <legend className={styles.legend}>{label}</legend>

      <div className={styles.colorGrid}>
        {colors.map((color, i) => (
          <label
            key={color.value}
            className={combineClassNames(
              styles.colorSwatch,
              styles[size],
              styles[shape],
              selected === color.value && styles.selected
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
              className={styles.radioInput}
              aria-label={color.label}
            />
            <span
              className={combineClassNames(styles.colorPreview, styles[shape])}
              style={{ backgroundColor: color.value }}
              aria-hidden="true"
            />
          </label>
        ))}
      </div>

      {allowCustom && (
        <input
          type="color"
          className={styles.customColorInput}
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
