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
  circle: "circle",
  square: "square",
  small: "small",
  medium: "medium",
  large: "large",
  outline: "outline",
  bottomRight: "bottomRight",
  bottomLeft: "bottomLeft",
  topRight: "topRight",
  topLeft: "topLeft",
  "status-online": "status-online",
  "status-offline": "status-offline",
  "status-away": "status-away",
};

const Avatar: React.FC<AvatarProps> = (props) => (
  <AvatarBase {...props} classMap={classMap} />
);

export default Avatar;
