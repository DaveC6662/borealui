import React from "react";
import CommandPaletteBase from "../CommandPaletteBase";
import "./CommandPalette.scss";
import TextInput from "../../TextInput/core/TextInput";
import { CommandPaletteProps } from "../CommandPalette.types";

const classMap = {
  overlay: "overlay",
  palette: "palette",
  input: "input",
  list: "list",
  item: "item",
  icon: "icon",
  active: "active",
  empty: "empty",
  primary: "primary",
  secondary: "secondary",
};

const CommandPalette: React.FC<CommandPaletteProps> = (props) => (
  <CommandPaletteBase
    {...props}
    classMap={classMap}
    TextInputComponent={TextInput}
  />
);

export default CommandPalette;
