"use client";

import React from "react";
import styles from "./ColorPicker.module.scss";
import { combineClassNames } from "@/utils/classNames";
import { SizeType } from "@/types/types";

/**
 * Represents a color option available for selection.
 */
export interface ColorOption {
  /** Label to display as a tooltip or for screen readers. */
  label: string;
  /** Color value (e.g., `#ff0000`, `rgb(255,0,0)`, `red`). */
  value: string;
}

type ShapeType = "square" | "round" | "pill";

/**
 * Props for the ColorPicker component.
 */
export interface ColorPickerProps {
  /** Optional label above the color group. */
  label?: string;
  /** Array of color options to choose from. */
  colors: ColorOption[];
  /** Currently selected color value. */
  selected: string;
  /** Callback triggered when a color is selected. */
  onChange: (color: string) => void;
  /** Optional name attribute for the radio group. */
  name?: string;
  /** Whether the picker is disabled. */
  disabled?: boolean;
  /** Size of the swatches ("small", "medium", "large"). */
  size?: SizeType;
  /** Shape of the swatches ("square", "round", "pill"). */
  shape?: ShapeType;
  /** If true, allows picking a custom color via a color input. */
  allowCustom?: boolean;
  /** Custom class name for the component container. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

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
}) => {
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
