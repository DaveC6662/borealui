"use client";

import React from "react";
import BaseNavBar from "../NavBarBase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.scss";
import { NavBarProps } from "../NavBar.types";

const NavBar: React.FC<NavBarProps> = (props) => {
  const pathname = usePathname();

  return (
    <BaseNavBar
      {...props}
      currentPath={pathname}
      LinkWrapper={({ href, children, className, isActive, testId }) => (
        <Link
          href={href}
          className={className}
          aria-current={isActive ? "page" : undefined}
          data-testid={testId}
        >
          {children}
        </Link>
      )}
      classNames={{
        container: styles.navContainer,
        item: styles.navItem,
        active: styles.active,
        icon: styles.iconContainer,
        label: styles.label,
      }}
    />
  );
};

export default NavBar;
