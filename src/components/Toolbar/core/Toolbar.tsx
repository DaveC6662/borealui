import React from "react";
import "./Toolbar.scss";
import Avatar from "../../Avatar/core/Avatar";
import { ToolbarBase } from "../ToolbarBase";
import { ToolbarProps } from "../Toolbar.types";

const classes = {
  toolbar: "toolbar",
  section: "toolbar_section",
  title: "toolbar_title",
  avatarWrapper: "toolbar_avatarWrapper",
  primary: "toolbar_primary",
  secondary: "toolbar_secondary",
  success: "toolbar_success",
  error: "toolbar_error",
  warning: "toolbar_warning",
  clear: "toolbar_clear",
};

const Toolbar: React.FC<ToolbarProps> = (props) => (
  <ToolbarBase {...props} AvatarComponent={Avatar} classMap={classes} />
);

export default Toolbar;
