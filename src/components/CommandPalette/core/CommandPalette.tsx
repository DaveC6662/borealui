import React from "react";
import CommandPaletteBase from "../CommandPaletteBase";
import "./CommandPalette.scss";
import TextInput from "../../TextInput/core/TextInput";
import { CommandPaletteProps } from "../CommandPalette.types";

const classMap = {
  command_palette_overlay: "command_palette_overlay",
  command_palette: "command_palette",
  command_palette_input: "command_palette_input",
  command_palette_list: "command_palette_list",
  command_palette_item: "command_palette_item",
  command_palette_icon: "command_palette_icon",
  command_palette_active: "command_palette_active",
  command_palette_empty: "command_palette_empty",
  command_palette_primary: "command_palette_primary",
  command_palette_secondary: "command_palette_secondary",
  command_palette_success: "command_palette_success",
  command_palette_error: "command_palette_error",
  command_palette_warning: "command_palette_warning",
  command_palette_clear: "command_palette_clear",
};

const CommandPalette: React.FC<CommandPaletteProps> = (props) => (
  <CommandPaletteBase
    {...props}
    classMap={classMap}
    TextInputComponent={TextInput}
  />
);

export default CommandPalette;
