import React from "react";
import CircularProgressBase from "../CircularProgressBase";
import "./CircularProgress.scss";
import { CircularProgressProps } from "../CircularProgress.types";

const classMap = {
  circular_progress: "circular_progress",
  circular_progress_circle_border: "circular_progress_circle_border",
  circular_progress_inner_circle: "circular_progress_inner_circle",
  circular_progress_rating_text: "circular_progress_rating_text",
  circular_progress_primary: "circular_progress_primary",
  circular_progress_secondary: "circular_progress_secondary",
  circular_progress_success: "circular_progress_success",
  circular_progress_error: "circular_progress_error",
  circular_progress_warning: "circular_progress_warning",
  circular_progress_clear: "circular_progress_clear",
  circular_progress_xs: "circular_progress_xs",
  circular_progress_small: "circular_progress_small",
  circular_progress_medium: "circular_progress_medium",
  circular_progress_large: "circular_progress_large",
  circular_progress_xl: "circular_progress_xl",
};

const CircularProgress: React.FC<CircularProgressProps> = (props) => (
  <CircularProgressBase {...props} classMap={classMap} />
);

export default CircularProgress;
