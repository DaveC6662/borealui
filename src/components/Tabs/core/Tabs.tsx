import React from "react";
import "./Tabs.scss";
import TabsBase from "../TabsBase";
import { TabsProps } from "../Tabs.types";

const Tabs: React.FC<TabsProps> = (props) => {
  const styles = {
    tabsContainer: "tabsContainer",
    tabs: "tabs",
    tab: "tab",
    active: "active",
    content: "content",
    icon: "icon",
    primary: "primary",
    secondary: "secondary",
    small: "small",
    medium: "medium",
    large: "large",
  };

  return <TabsBase {...props} styles={styles} />;
};

export default Tabs;
