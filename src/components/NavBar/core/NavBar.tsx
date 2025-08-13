import React, { useEffect, useState } from "react";
import BaseNavBar from "../NavBarBase";
import "./NavBar.scss";
import { NavBarProps } from "../NavBar.types";

const classes = {
  container: "nav",
  item: "nav_item",
  list: "nav_list",
  "item--active": "nav_active",
  icon: "nav_icon_container",
  label: "nav_label",
  linkContent: "nav_link_container",

  primary: "nav_primary",
  secondary: "nav_secondary",
  tertiary: "nav_tertiary",
  quaternary: "nav_quaternary",
  clear: "nav_clear",

  shadowNone: "nav_shadow-None",
  shadowLight: "nav_shadow-Light",
  shadowMedium: "nav_shadow-Medium",
  shadowStrong: "nav_shadow-Strong",
  shadowIntense: "nav_shadow-Intense",

  roundNone: "nav_round-None",
  roundSmall: "nav_round-Small",
  roundMedium: "nav_round-Medium",
  roundLarge: "nav_round-Large",
  roundFull: "nav_round-Full",
};

const NavBar: React.FC<NavBarProps> = (props) => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <BaseNavBar
      {...props}
      currentPath={pathname}
      LinkWrapper={({
        href,
        children,
        className,
        isActive,
        "data-testid": testId,
      }) => (
        <a
          href={href}
          className={className}
          aria-current={isActive ? "page" : undefined}
          data-testid={testId}
        >
          {children}
        </a>
      )}
      classMap={classes}
    />
  );
};

export default NavBar;
