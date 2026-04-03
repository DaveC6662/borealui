"use client";

//TODO: Fix: Slider horizontal alignments is off

import React from "react";
import styles from "./Slider.module.scss";
import { SliderProps } from "../Slider.types";
import SliderBase from "../SliderBase";

const Slider: React.FC<SliderProps> = (props) => {
  return <SliderBase {...props} classMap={styles} />;
};
Slider.displayName = "Slider";
export default Slider;
