"use client";

import React from "react";
import CommandPaletteBase from "../CommandPaletteBase";
import styles from "./CommandPalette.module.scss";
import { TextInput } from "@/index.next";
import { CommandPaletteProps } from "../CommandPalette.types";

const CommandPalette: React.FC<CommandPaletteProps> = (props) => (
  <CommandPaletteBase
    {...props}
    classMap={styles}
    TextInputComponent={TextInput}
  />
);

export default CommandPalette;
