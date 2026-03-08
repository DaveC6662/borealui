import React, { useState } from "react";
import SidebarBase from "../SidebarBase";
import "./Sidebar.scss";
import { SidebarLink, SidebarProps } from "../Sidebar.types";

const classes = {
  wrapper: "sidebar",
  nav: "sidebar_nav",
  list: "sidebar_list",
  childList: "sidebar_child_list",
  item: "sidebar_item",
  link: "sidebar_link",
  childLink: "sidebar_child_link",
  active: "sidebar_active",
  icon: "sidebar_icon",

  footer: "sidebar_footer",
  footerLink: "sidebar_footer_link",
  footerVersion: "sidebar_footer_version",

  chevron: "sidebar_chevron",
  chevronOpen: "sidebar_chevron_open",

  submenu: "sidebar_submenu",
  submenuOpen: "sidebar_submenu_open",

  outline: "sidebar_outline",

  primary: "sidebar_primary",
  secondary: "sidebar_secondary",
  tertiary: "sidebar_tertiary",
  quaternary: "sidebar_quaternary",

  success: "sidebar_success",
  error: "sidebar_error",
  warning: "sidebar_warning",

  clear: "sidebar_clear",

  shadowNone: "sidebar_shadow-None",
  shadowLight: "sidebar_shadow-Light",
  shadowMedium: "sidebar_shadow-Medium",
  shadowStrong: "sidebar_shadow-Strong",
  shadowIntense: "sidebar_shadow-Intense",

  roundNone: "sidebar_round-None",
  roundSmall: "sidebar_round-Small",
  roundMedium: "sidebar_round-Medium",
  roundLarge: "sidebar_round-Large",
};

const normalizePath = (p: string) =>
  p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p;

const getInitialPath = () =>
  typeof window !== "undefined" ? window.location.pathname || "/" : "/";

const isDescendantPath = (parentPath: string, currentPath: string): boolean => {
  const parent = normalizePath(parentPath);
  const current = normalizePath(currentPath);

  if (parent === "/") return current === "/";
  return current === parent || current.startsWith(`${parent}/`);
};

const isActiveRecursive = (
  link: SidebarLink,
  matcher: (link: SidebarLink) => boolean,
): boolean => {
  if (matcher(link)) return true;
  return !!link.children?.some((child) => isActiveRecursive(child, matcher));
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  const [pathname] = useState(getInitialPath);

  const isLinkActive = (link: SidebarLink): boolean => {
    if (!link.href) return false;

    if (link.children?.length) {
      return isDescendantPath(link.href, pathname);
    }

    return normalizePath(link.href) === normalizePath(pathname);
  };

  const hasActiveChild = (link: SidebarLink): boolean =>
    !!link.children?.some((child) => isActiveRecursive(child, isLinkActive));

  return (
    <SidebarBase
      {...props}
      classMap={classes}
      isLinkActive={isLinkActive}
      hasActiveChild={hasActiveChild}
    />
  );
};

Sidebar.displayName = "Sidebar";
export default Sidebar;
