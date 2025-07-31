"use client";

import React from "react";
import BaseNavBar from "../NavBarBase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.scss";
import { NavBarProps } from "../NavBar.types";

const NavBar: React.FC<NavBarProps & { mockPath?: string }> = ({
  mockPath,
  ...props
}) => {
  const pathname = usePathname();
  const resolvedPath = mockPath ?? pathname;

  return (
    <BaseNavBar
      {...props}
      currentPath={resolvedPath || "/"}
      LinkWrapper={({ href, children, className, isActive, testId }) => (
        <Link
          href={href}
          className={className}
          aria-current={isActive ? "page" : undefined}
          data-testid={testId}
          legacyBehavior>
          {children}
        </Link>
      )}
      classMap={styles}
    />
  );
};

export default NavBar;
