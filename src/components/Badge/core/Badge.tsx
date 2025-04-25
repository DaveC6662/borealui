import React from "react";
import "./Badge.scss";
import { BadgeBase } from "../BadgeBase";
import { BadgeProps } from "../Badge.types";

const classMap = {
  badge: "badge",
  badge_primary: "badge_primary",
  badge_primary_outline: "badge_primary_outline",
  badge_secondary: "badge_secondary",
  badge_secondary_outline: "badge_secondary_outline",
  badge_success: "badge_success",
  badge_success_outline: "badge_success_outline",
  badge_error: "badge_error",
  badge_error_outline: "badge_error_outline",
  badge_warning: "badge_warning",
  badge_warning_outline: "badge_warning_outline",
  badge_clear: "badge_clear",
  badge_clear_outline: "badge_clear_outline",
  badge_xs: "badge_xs",
  badge_small: "badge_small",
  badge_medium: "badge_medium",
  badge_large: "badge_large",
  badge_xl: "badge_xl",
  badge_icon: "badge_icon",
};

const Badge: React.FC<BadgeProps> = (props) => {
  return <BadgeBase {...props} classMap={classMap} />;
};

export default Badge;
