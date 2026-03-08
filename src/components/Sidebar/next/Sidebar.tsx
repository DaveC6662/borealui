"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarBase from "../SidebarBase";
import styles from "./Sidebar.module.scss";
import { SidebarLink, SidebarProps } from "../Sidebar.types";

const normalizePath = (p: string) =>
  p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p;

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

const Sidebar: React.FC<SidebarProps> = ({
  links,
  isLinkActive: consumerIsLinkActive,
  hasActiveChild: consumerHasActiveChild,
  ...rest
}) => {
  const pathname = usePathname() || "/";

  const defaultIsLinkActive = (link: SidebarLink): boolean => {
    if (!link.href) return false;

    if (link.children?.length) {
      return isDescendantPath(link.href, pathname);
    }

    return normalizePath(link.href) === normalizePath(pathname);
  };

  const resolvedIsLinkActive = consumerIsLinkActive ?? defaultIsLinkActive;

  const defaultHasActiveChild = (link: SidebarLink): boolean =>
    !!link.children?.some((child) =>
      isActiveRecursive(child, resolvedIsLinkActive),
    );

  const resolvedHasActiveChild =
    consumerHasActiveChild ?? defaultHasActiveChild;

  return (
    <SidebarBase
      links={links}
      classMap={styles}
      LinkComponent={Link}
      isLinkActive={resolvedIsLinkActive}
      hasActiveChild={resolvedHasActiveChild}
      {...rest}
    />
  );
};

Sidebar.displayName = "Sidebar";
export default Sidebar;
