import React, { useEffect, useState } from "react";
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
 * It highlights the active item based on the current URL pathname.
 * Compatible with React apps using React Router or static routing.
 *
 * @returns {JSX.Element} The rendered navigation bar.
 */
const NavBar: React.FC = () => {
  const [pathname, setPathname] = useState<string>("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

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
        const isActive = pathname === item.path;
        return (
          <a
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
          </a>
        );
      })}
    </nav>
  );
};

export default NavBar;
