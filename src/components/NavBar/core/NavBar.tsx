import React, { JSX, useEffect, useState } from "react";
import "./NavBar.scss";
import { combineClassNames } from "../../../utils/classNames";
import { NavBarProps } from "../NavBar.types";



/**
 * NavBar renders a horizontal navigation bar using provided nav items.
 * It highlights the active item based on the current URL pathname.
 *
 * @param {NavBarProps} props - Props including nav items.
 * @returns {JSX.Element} The rendered navigation bar.
 */
const NavBar: React.FC<NavBarProps> = ({ items }: NavBarProps): JSX.Element => {
  const [pathname, setPathname] = useState<string>("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="navContainer"
      data-testid="nav-bar"
    >
      {items.map((item, index) => {
        const isActive = pathname === item.path;
        return (
          <a
            key={index}
            href={item.path}
            className={combineClassNames("navItem", isActive && "active")}
            aria-current={isActive ? "page" : undefined}
            data-testid={`nav-item-${item.label.toLowerCase()}`}
          >
            <div className="iconContainer" aria-hidden="true">
              {item.icon}
            </div>
            <span className="label">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
};

export default NavBar;
