import React from "react";
import "./Badge.scss";
import { BadgeBase } from "../BadgeBase";
import { BadgeProps } from "../Badge.types";

const classes = {
  badge: "badge",
  primary: "badge_primary",
  secondary: "badge_secondary",
  tertiary: "badge_tertiary",
  quaternary: "badge_quaternary",
  success: "badge_success",
  error: "badge_error",
  warning: "badge_warning",
  clear: "badge_clear",
  outline: "badge_outline",
  disabled: "badge_disabled",
  xs: "badge_xs",
  small: "badge_small",
  medium: "badge_medium",
  large: "badge_large",
  xl: "badge_xl",
  icon: "badge_icon",
  clickable: "badge_clickable",
};

const Badge: React.FC<BadgeProps> = (props) => {
  return <BadgeBase {...props} classMap={classes} />;
};

export default Badge;
