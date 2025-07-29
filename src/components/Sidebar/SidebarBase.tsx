import React from "react";
import {SidebarProps} from "./Sidebar.types";

const SidebarBase: React.FC<SidebarProps> = (({children, classMap, ...rest}) => {
  return <div className={classMap.root}>{/* Base logic here */}</div>;
});

SidebarBase.displayName = "SidebarBase";

export default SidebarBase;
