"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarBase from "../SidebarBase";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "../Sidebar.types";

const Sidebar: React.FC<SidebarProps> = ({ links, ...rest }) => {
  const currentPath = usePathname();

  const { classMap, currentPath: _ignored, ...safeRest } = rest;

  return (
    <SidebarBase
      links={links}
      classMap={styles}
      currentPath={currentPath}
      LinkComponent={Link}
      key={currentPath}
      {...safeRest}
    />
  );
};

export default Sidebar;
