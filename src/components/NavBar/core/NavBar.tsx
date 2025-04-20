import React, { useEffect, useState } from "react";
import BaseNavBar from "../NavBarBase";
import "./NavBar.scss";
import { NavBarProps } from "../NavBar.types";

const NavBar: React.FC<NavBarProps> = (props) => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <BaseNavBar
      {...props}
      currentPath={pathname}
      LinkWrapper={({ href, children, className, isActive, testId }) => (
        <a
          href={href}
          className={className}
          aria-current={isActive ? "page" : undefined}
          data-testid={testId}
        >
          {children}
        </a>
      )}
      classNames={{
        container: "navContainer",
        item: "navItem",
        active: "active",
        icon: "iconContainer",
        label: "label",
      }}
    />
  );
};

export default NavBar;
