import React from "react";
import "./Toolbar.scss";
import Avatar from "../../Avatar/core/Avatar";
import { ToolbarBase } from "../ToolbarBase";
import { ToolbarProps } from "../Toolbar.types";

/**
 * Core React version of Toolbar component with global SCSS.
 */
const Toolbar: React.FC<ToolbarProps> = (props) => (
  <ToolbarBase
    {...props}
    AvatarComponent={Avatar}
    styles={{
      toolbar: "toolbar",
      section: "section",
      title: "title",
      avatarWrapper: "avatarWrapper",
      primary: "primary",
      secondary: "secondary",
      success: "success",
      error: "error",
      warning: "warning",
      clear: "clear",
    }}
  />
);

export default Toolbar;
