import React from "react";
import "./Badge.scss";
import { BadgeBase } from "../BadgeBase";
import { BadgeProps } from "../Badge.types";

const classMap = {
  badge: "badge",
  icon: "icon",
  primary: "primary",
  secondary: "secondary",
  success: "success",
  warning: "warning",
  error: "error",
  small: "small",
  medium: "medium",
  large: "large",
  outline: "outline",
};

const Badge: React.FC<BadgeProps> = (props) => {
  return <BadgeBase {...props} classMap={classMap} />;
};

export default Badge;
