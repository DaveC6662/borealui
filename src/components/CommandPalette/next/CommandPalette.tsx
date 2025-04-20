"use client";

import React from "react";
import CommandPaletteBase from "../CommandPaletteBase";
import styles from "./CommandPalette.module.scss";
import { TextInput } from "@/index.next";
import { CommandPaletteProps } from "../CommandPalette.types";

const classMap = {
  overlay: styles.overlay,
  palette: styles.palette,
  input: styles.input,
  list: styles.list,
  item: styles.item,
  icon: styles.icon,
  active: styles.active,
  empty: styles.empty,
  primary: styles.primary,
  secondary: styles.secondary,
};

const CommandPalette: React.FC<CommandPaletteProps> = (props) => (
  <CommandPaletteBase
    {...props}
    classMap={classMap}
    TextInputComponent={TextInput}
  />
);

export default CommandPalette;
