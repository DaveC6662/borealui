"use client";

import React from "react";
import styles from "./Tabs.module.scss";
import TabsBase from "../TabsBase";
import { TabsProps } from "../Tabs.types";

const Tabs: React.FC<TabsProps> = (props) => {
  return <TabsBase {...props} styles={styles} />;
};

export default Tabs;
