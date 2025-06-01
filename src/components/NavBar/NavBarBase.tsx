import React, { JSX } from "react";
import { NavBarProps } from "./NavBar.types";
import { combineClassNames } from "@/utils/classNames";

export interface BaseNavBarProps extends NavBarProps {
  currentPath: string;
  LinkWrapper: (props: {
    href: string;
    children: React.ReactNode;
    className: string;
    isActive: boolean;
    testId: string;
    "aria-current"?: "page";
  }) => JSX.Element;
  classMap: Record<string, string>;
}

const BaseNavBar: React.FC<BaseNavBarProps> = ({
  items,
  currentPath,
  LinkWrapper,
  classMap,
  theme = "primary",
}) => {
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={combineClassNames(classMap.container, classMap[theme])}
      data-testid="nav-bar"
    >
      {items.map((item, index) => {
        const isActive = currentPath === item.path;

        console.log(
          "Nav item className:",
          combineClassNames(classMap.item, isActive && classMap.active)
        );

        return (
          <LinkWrapper
            key={`${item.label}-${index}`}
            href={item.path}
            isActive={isActive}
            className={combineClassNames(
              classMap.item,
              isActive && classMap["item--active"]
            )}
            testId={`nav-item-${item.label.toLowerCase()}`}
            aria-current={isActive ? "page" : undefined}
          >
            <div
              className={classMap.icon}
              aria-hidden="true"
              data-testid={`nav-icon-${item.label.toLowerCase()}`}
            >
              {item.icon}
            </div>
            <span className={classMap.label}>{item.label}</span>
          </LinkWrapper>
        );
      })}
    </nav>
  );
};

export default BaseNavBar;
