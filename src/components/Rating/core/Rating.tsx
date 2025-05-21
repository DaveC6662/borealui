import React from "react";
import BaseRating from "../RatingBase";
import "./Rating.scss";
import { RatingProps } from "../Rating.types";

const classes = {
  container: "rating_container",
  wrapper: "rating",
  label: "rating_label",
  star: "rating_star",
  active: "rating_active",
  primary: "rating_primary",
  secondary: "rating_secondary",
  success: "rating_success",
  error: "rating_error",
  warning: "rating_warning",
  clear: "rating_clear",
  xs: "rating_xs",
  small: "rating_small",
  medium: "rating_medium",
  large: "rating_large",
  xl: "rating_xl",
  interactive: "rating_interactive",
};

const Rating: React.FC<RatingProps> = (props) => {
  return <BaseRating {...props} classMap={classes} />;
};

export default Rating;
