import React from "react";
import SidebarBase from "../SidebarBase";
import "./Sidebar.scss";
import { SidebarProps } from "../Sidebar.types";

const classes = {
  wrapper: "sidebar",
  nav: "sidebar_nav",
  list: "sidebar_list",
  childList: "sidebar_child-list",
  item: "sidebar_item",
  link: "sidebar_link",
  childLink: "sidebar_child-link",
  active: "sidebar_active",

  footer: "sidebar_footer",
  footerLink: "sidebar_footer-link",
  footerVersion: "sidebar_footer-version",

  chevron: "sidebar_chevron",
  chevronOpen: "sidebar_chevron_open",

  submenu: "sidebar_submenu",
  submenuOpen: "sidebar_submenu_open",

  outline: "sidebar_outline",

  primary: "sidebar_primary",
  secondary: "sidebar_secondary",
  tertiary: "sidebar_tertiary",
  quaternary: "sidebar_quaternary",

  success: "sidebar_success",
  error: "sidebar_error",
  warning: "sidebar_warning",

  clear: "sidebar_clear",

  shadowNone: "sidebar_shadow-None",
  shadowLight: "sidebar_shadow-Light",
  shadowMedium: "sidebar_shadow-Medium",
  shadowStrong: "sidebar_shadow-Strong",
  shadowIntense: "sidebar_shadow-Intense",

  roundNone: "sidebar_round-None",
  roundSmall: "sidebar_round-Small",
  roundMedium: "sidebar_round-Medium",
  roundLarge: "sidebar_round-Large",
};

const Sidebar: React.FC<SidebarProps> = ({ currentPath, ...props }) => (
  <SidebarBase {...props} currentPath={currentPath} classMap={classes} />
);

export default Sidebar;
