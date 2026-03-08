"use client";

import React from "react";
import BaseNavBar from "../NavBarBase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.scss";
import { NavBarProps, NavItem } from "../NavBar.types";

const normalizePath = (p: string) =>
  p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p;

const NavBar: React.FC<NavBarProps & { mockPath?: string }> = ({
  mockPath,
  ...props
}) => {
  const pathname = usePathname();
  const resolvedPath = mockPath ?? pathname ?? "/";

  const isItemActive = (item: NavItem) =>
    normalizePath(item.path) === normalizePath(resolvedPath);

  return (
    <BaseNavBar
      {...props}
      isItemActive={isItemActive}
      LinkWrapper={({
        href,
        children,
        className,
        isActive,
        "data-testid": testId,
      }) => (
        <Link
          href={href}
          className={className}
          aria-current={isActive ? "page" : undefined}
          data-testid={testId}
        >
          {children}
        </Link>
      )}
      classMap={styles}
    />
  );
};

NavBar.displayName = "NavBar";
export default NavBar;
