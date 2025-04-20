"use client";

import React from "react";
import ColorPickerBase from "../ColorPickerBase";
import styles from "./ColorPicker.module.scss";
import { ColorPickerProps } from "../ColorPicker.types";

const classMap = {
  colorPicker: styles.colorPicker,
  legend: styles.legend,
  colorGrid: styles.colorGrid,
  colorSwatch: styles.colorSwatch,
  colorPreview: styles.colorPreview,
  radioInput: styles.radioInput,
  customColorInput: styles.customColorInput,
  selected: styles.selected,
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
  square: styles.square,
  round: styles.round,
  pill: styles.pill,
};

const ColorPicker: React.FC<ColorPickerProps> = (props) => (
  <ColorPickerBase {...props} classMap={classMap} />
);

export default ColorPicker;
