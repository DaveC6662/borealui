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
  classNames: Record<string, string>;
}

const BaseNavBar: React.FC<BaseNavBarProps> = ({
  items,
  currentPath,
  LinkWrapper,
  classNames,
}) => {
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={classNames.container}
      data-testid="nav-bar"
    >
      {items.map((item, index) => {
        const isActive = currentPath === item.path;

        return (
          <LinkWrapper
            key={`${item.label}-${index}`}
            href={item.path}
            isActive={isActive}
            className={combineClassNames(
              classNames.item,
              isActive && classNames.active
            )}
            testId={`nav-item-${item.label.toLowerCase()}`}
            aria-current={isActive ? "page" : undefined}
          >
            <div
              className={classNames.icon}
              aria-hidden="true"
              data-testid={`nav-icon-${item.label.toLowerCase()}`}
            >
              {item.icon}
            </div>
            <span className={classNames.label}>{item.label}</span>
          </LinkWrapper>
        );
      })}
    </nav>
  );
};

export default BaseNavBar;
