"use client";

import React from "react";
import styles from "./Slider.module.scss";
import { SliderProps } from "../Slider.types";
import SliderBase from "../SliderBase";

const Slider: React.FC<SliderProps> = (props) => {
  return <SliderBase {...props} styles={styles} />;
};

export default Slider;
