"use client";

import React from "react";
import ColorPickerBase from "../ColorPickerBase";
import styles from "./ColorPicker.module.scss";
import { ColorPickerProps } from "../ColorPicker.types";

const ColorPicker: React.FC<ColorPickerProps> = (props) => (
  <ColorPickerBase {...props} classMap={styles} />
);

export default ColorPicker;
