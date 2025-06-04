import React from "react";
import "./Tabs.scss";
import TabsBase from "../TabsBase";
import { TabsProps } from "../Tabs.types";

const classes = {
  tabsContainer: "tabs_container",
  tabs: "tabs",
  tab: "tabs_tab",
  active: "tabs_active",
  content: "tabs_content",
  icon: "tabs_icon",
  primary: "tabs_primary",
  secondary: "tabs_secondary",
  tertiary: "tabs_tertiary",
  quaternary: "tabs_quaternary",
  success: "tabs_success",
  error: "tabs_error",
  warning: "tabs_warning",
  clear: "tabs_clear",
  xs: "tabs_xs",
  xl: "tabs_xl",
  small: "tabs_small",
  medium: "tabs_medium",
  large: "tabs_large",
};

const Tabs: React.FC<TabsProps> = (props) => {
  return <TabsBase {...props} classMap={classes} />;
};

export default Tabs;
