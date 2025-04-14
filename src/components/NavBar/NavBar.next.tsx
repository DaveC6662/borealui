"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaCompactDisc,
  FaImage,
  FaCode,
  FaCommentAlt,
  FaPaintBrush,
} from "react-icons/fa";
import styles from "./NavBar.module.scss";
import { NavItem } from "./NavBar.types";

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
const NavBar: React.FC = () => {
  // Retrieve the current pathname from Next.js router using usePathname hook.
  const pathname = usePathname();

  // Define a list of navigation items with associated icons, labels, and paths.
  const navItems: NavItem[] = [
    { icon: <FaHome />, label: "Home", path: "/" },
    { icon: <FaCompactDisc />, label: "Music", path: "/Music" },
    { icon: <FaImage />, label: "Images", path: "/Photography" },
    { icon: <FaCode />, label: "Code", path: "/Code" },
    { icon: <FaCommentAlt />, label: "Blog", path: "/Blog" },
    { icon: <FaPaintBrush />, label: "Design", path: "/Design" },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={styles.navContainer}
      data-testid="nav-bar"
    >
      {navItems.map((item, index) => {
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
