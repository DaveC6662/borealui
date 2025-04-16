"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.scss";
import { NavBarProps } from "../NavBar.types";

/**
 * NavBar renders the main navigation of the site as a horizontal navigation bar.
 *
 * It automatically highlights the active navigation item based on the current URL path,
 * and it uses Next.js Link for client-side navigation. The component includes basic
 * accessibility attributes, such as `aria-label` on the navigation container and
 * `aria-current` on the active item.
 *
 * @returns {JSX.Element} The rendered navigation bar.
 */
const NavBar: React.FC<NavBarProps> = ({ items }: NavBarProps): JSX.Element => {
  // Retrieve the current pathname from Next.js router using usePathname hook.
  const pathname = usePathname();

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={styles.navContainer}
      data-testid="nav-bar"
    >
      {items?.map((item, index) => {
        // Determine if the item is the currently active route.
        const isActive = pathname === item.path;
        return (
          <Link
            key={index}
            href={item.path}
            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            aria-current={isActive ? "page" : undefined}
            data-testid={`nav-item-${item.label.toLowerCase()}`}
          >
            <div className={styles.iconContainer} aria-hidden="true">
              {item.icon}
            </div>
            <span className={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar;
