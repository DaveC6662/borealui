import React from "react";
import ColorPickerBase from "../ColorPickerBase";
import "./ColorPicker.scss";
import { ColorPickerProps } from "../ColorPicker.types";

const classMap = {
  color_picker: "color_picker",
  color_picker_legend: "color_picker_legend",
  color_picker_grid: "color_picker_grid",
  color_picker_swatch: "color_picker_swatch",
  color_picker_preview: "color_picker_preview",
  color_picker_radio_input: "color_picker_radio_input",
  color_picker_custom_input: "color_picker_custom_input",
  color_picker_selected: "color_picker_selected",
  color_picker_xs: "color_picker_xs",
  color_picker_small: "color_picker_small",
  color_picker_medium: "color_picker_medium",
  color_picker_large: "color_picker_large",
  color_picker_xl: "color_picker_xl",
  color_picker_square: "color_picker_square",
  color_picker_round: "color_picker_round",
  color_picker_pill: "color_picker_pill",
};

const ColorPicker: React.FC<ColorPickerProps> = (props) => (
  <ColorPickerBase {...props} classMap={classMap} />
);

export default ColorPicker;
