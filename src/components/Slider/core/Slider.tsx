import React from "react";
import "./Slider.scss"; // Non-module SCSS
import { SliderProps } from "../Slider.types";
import SliderBase from "../SliderBase";
import { combineClassNames } from "../../../utils/classNames";

const coreStyles = {
  container: "slider_container",
  label: "slider_label",
  wrapper: "slider_wrapper",
  slider: "slider",
  value: "slider_value",
  xs: "slider_xs",
  small: "slider_small",
  medium: "slider_medium",
  large: "slider_large",
  xl: "slider_xl",
  primary: "slider_primary",
  secondary: "slider_secondary",
  success: "slider_success",
  error: "slider_error",
  warning: "slider_warning",
  clear: "slider_clear",
};

const Slider: React.FC<SliderProps> = (props) => {
  return (
    <SliderBase
      {...props}
      className={combineClassNames(props.className)}
      classMap={coreStyles}
    />
  );
};

export default Slider;
