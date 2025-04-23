import React from "react";
import "./Avatar.scss";
import { AvatarProps } from "../Avatar.types";
import { AvatarBase } from "../AvatarBase";

const classMap = {
  avatar: "avatar",
  image: "image",
  initials: "initials",
  status: "status",
  dot: "dot",
  primary: "primary",
  secondary: "secondary",
  success: "success",
  error: "error",
  warning: "warning",
  clear: "clear",
  rounded: "rounded",
  circle: "circle",
  square: "square",
  xs: "xs",
  small: "small",
  medium: "medium",
  large: "large",
  xl: "xl",
  outline: "outline",
  bottomRight: "bottomRight",
  bottomLeft: "bottomLeft",
  topRight: "topRight",
  topLeft: "topLeft",
  "status-online": "status-online",
  "status-offline": "status-offline",
  "status-idle": "status-idle",
  "status-busy": "status-busy",
  "icon-only": "icon-only",
};

const Avatar: React.FC<AvatarProps> = (props) => (
  <AvatarBase {...props} classMap={classMap} />
);

export default Avatar;
