import React from "react";
import ColorPickerBase from "../ColorPickerBase";
import "./ColorPicker.scss";
import { ColorPickerProps } from "../ColorPicker.types";

const classMap = {
  colorPicker: "colorPicker",
  legend: "legend",
  colorGrid: "colorGrid",
  colorSwatch: "colorSwatch",
  colorPreview: "colorPreview",
  radioInput: "radioInput",
  customColorInput: "customColorInput",
  selected: "selected",
  small: "small",
  medium: "medium",
  large: "large",
  square: "square",
  round: "round",
  pill: "pill",
};

const ColorPicker: React.FC<ColorPickerProps> = (props) => (
  <ColorPickerBase {...props} classMap={classMap} />
);

export default ColorPicker;
