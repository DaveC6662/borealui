import React from "react";
import CommandPaletteBase from "../CommandPaletteBase";
import "./CommandPalette.scss";
import TextInput from "../../TextInput/core/TextInput";
import { CommandPaletteProps } from "../CommandPalette.types";

const classes = {
  overlay: "command_palette_overlay",
  command_palette: "command_palette",
  input: "command_palette_input",
  list: "command_palette_list",
  item: "command_palette_item",
  icon: "command_palette_icon",
  active: "command_palette_active",
  empty: "command_palette_empty",
  primary: "command_palette_primary",
  secondary: "command_palette_secondary",
  success: "command_palette_success",
  error: "command_palette_error",
  warning: "command_palette_warning",
  clear: "command_palette_clear",
};

const CommandPalette: React.FC<CommandPaletteProps> = (props) => (
  <CommandPaletteBase
    {...props}
    classMap={classes}
    TextInputComponent={TextInput}
  />
);

export default CommandPalette;
