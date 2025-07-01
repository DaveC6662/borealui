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

  shadowNone: "tabs_shadow-None",
  shadowLight: "tabs_shadow-Light",
  shadowMedium: "tabs_shadow-Medium",
  shadowStrong: "tabs_shadow-Strong",
  shadowIntense: "tabs_shadow-Intense",

  roundNone: "tabs_round-None",
  roundSmall: "tabs_round-Small",
  roundMedium: "tabs_round-Medium",
  roundLarge: "tabs_round-Large",
};

const Tabs: React.FC<TabsProps> = (props) => {
  return <TabsBase {...props} classMap={classes} />;
};

export default Tabs;
