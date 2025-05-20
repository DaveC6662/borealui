import React from "react";
import ColorPickerBase from "../ColorPickerBase";
import "./ColorPicker.scss";
import { ColorPickerProps } from "../ColorPicker.types";

const classes = {
  color_picker: "color_picker",
  legend: "color_picker_legend",
  grid: "color_picker_grid",
  swatch: "color_picker_swatch",
  preview: "color_picker_preview",
  radio_input: "color_picker_radio_input",
  custom_input: "color_picker_custom_input",
  selected: "color_picker_selected",
  xs: "color_picker_xs",
  small: "color_picker_small",
  medium: "color_picker_medium",
  large: "color_picker_large",
  xl: "color_picker_xl",
  square: "color_picker_square",
  round: "color_picker_round",
  pill: "color_picker_pill",
};

const ColorPicker: React.FC<ColorPickerProps> = (props) => (
  <ColorPickerBase {...props} classMap={classes} />
);

export default ColorPicker;
