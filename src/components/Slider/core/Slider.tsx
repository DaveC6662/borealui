import React from "react";
import "./Slider.scss"; // Non-module SCSS
import { SliderProps } from "../Slider.types";
import SliderBase from "../SliderBase";
import { combineClassNames } from "../../../utils/classNames";

const coreStyles = {
  sliderContainer: "sliderContainer",
  sliderLabel: "sliderLabel",
  sliderWrapper: "sliderWrapper",
  slider: "slider",
  sliderValue: "sliderValue",
  small: "small",
  medium: "medium",
  large: "large",
  primary: "primary",
  secondary: "secondary",
  success: "success",
  error: "error",
  warning: "warning",
};

const Slider: React.FC<SliderProps> = (props) => {
  return (
    <SliderBase
      {...props}
      className={combineClassNames(props.className)}
      styles={coreStyles}
    />
  );
};

export default Slider;
