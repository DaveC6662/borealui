import React from "react";
import "./Avatar.scss";
import { AvatarProps } from "../Avatar.types";
import { AvatarBase } from "../AvatarBase";

const classMap = {
  avatar: "avatar",
  avatar_primary: "avatar_primary",
  avatar_primary_outline: "avatar_primary_outline",
  avatar_secondary: "avatar_secondary",
  avatar_secondary_outline: "avatar_secondary_outline",
  avatar_success: "avatar_success",
  avatar_success_outline: "avatar_success_outline",
  avatar_warning: "avatar_warning",
  avatar_warning_outline: "avatar_warning_outline",
  avatar_error: "avatar_error",
  avatar_error_outline: "avatar_error_outline",
  avatar_clear: "avatar_clear",
  avatar_clear_outline: "avatar_clear_outline",

  avatar_circle: "avatar_circle",
  avatar_square: "avatar_square",
  avatar_rounded: "avatar_rounded",

  avatar_xs: "avatar_xs",
  avatar_small: "avatar_small",
  avatar_medium: "avatar_medium",
  avatar_large: "avatar_large",
  avatar_xl: "avatar_xl",

  avatar_image: "avatar_image",
  avatar_initials: "avatar_initials",
  avatar_fallback_icon: "avatar_fallback_icon",
  avatar_status: "avatar_status",
  avatar_status_online: "avatar_status_online",
  avatar_status_offline: "avatar_status_offline",
  avatar_status_away: "avatar_status_away",
  avatar_status_busy: "avatar_status_busy",
  avatar_status_topRight: "avatar_status_topRight",
  avatar_status_bottomRight: "avatar_status_bottomRight",
  avatar_status_bottomLeft: "avatar_status_bottomLeft",
  avatar_status_topLeft: "avatar_status_topLeft",

  avatar_dot: "avatar_dot",
};

const Avatar: React.FC<AvatarProps> = (props) => (
  <AvatarBase {...props} classMap={classMap} />
);

export default Avatar;
