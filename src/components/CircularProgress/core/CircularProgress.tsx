import React from "react";
import CircularProgressBase from "../CircularProgressBase";
import "./CircularProgress.scss";
import { CircularProgressProps } from "../CircularProgress.types";

const classes = {
  circular_progress: "circular_progress",
  circle_border: "circular_progress_circle_border",
  inner_circle: "circular_progress_inner_circle",
  rating_text: "circular_progress_rating_text",
  primary: "circular_progress_primary",
  secondary: "circular_progress_secondary",
  success: "circular_progress_success",
  error: "circular_progress_error",
  warning: "circular_progress_warning",
  clear: "circular_progress_clear",
  xs: "circular_progress_xs",
  small: "circular_progress_small",
  medium: "circular_progress_medium",
  large: "circular_progress_large",
  xl: "circular_progress_xl",
};

const CircularProgress: React.FC<CircularProgressProps> = (props) => (
  <CircularProgressBase {...props} classMap={classes} />
);

export default CircularProgress;
