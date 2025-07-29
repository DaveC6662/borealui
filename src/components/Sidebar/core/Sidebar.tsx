import React from "react";
import SidebarBase from "../SidebarBase";
import "./Sidebar.scss";

const classes = {
  root: "sidebar",
};

const Sidebar: React.FC = (props) => (
  <SidebarBase {...props} classMap={classes} />
);

export default Sidebar;
