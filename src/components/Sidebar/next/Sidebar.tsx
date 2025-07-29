"use client";
import React from "react";
import SidebarBase from "../SidebarBase";
import styles from "./Sidebar.module.scss";

const Sidebar: React.FC = (props) => (
  <SidebarBase {...props} classMap={styles}/>
);

export default Sidebar;
