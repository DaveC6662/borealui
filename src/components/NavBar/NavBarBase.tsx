import React, { useMemo } from "react";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";
import { BaseNavBarProps } from "./NavBar.types";

const normalizePath = (p: string) =>
  p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p;
const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9]/g, "");

const BaseNavBar: React.FC<BaseNavBarProps> = ({
  items,
  currentPath,
  LinkWrapper,
  classMap,
  theme = getDefaultTheme(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  className = "",
  "data-testid": testId = "nav-bar",
}) => {
  const wrapperClass = useMemo(
    () => combineClassNames(classMap.container, classMap[theme], className),
    [classMap, theme, className]
  );

  const itemClass = useMemo(
    () =>
      combineClassNames(
        classMap.item,
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`]
      ),
    [classMap, shadow, rounding]
  );

  const current = normalizePath(currentPath ?? "/");

  return (
    <nav
      aria-label="Main navigation"
      className={wrapperClass}
      data-testid={`${testId}-nav-bar`}
    >
      <ul className={classMap.list}>
        {items.map((item) => {
          const isActive = normalizePath(item.path) === current;
          const slug = slugify(item.label || item.path);

          return (
            <li key={`${item.path}-${slug}`} className={classMap.listItem}>
              <LinkWrapper
                href={item.path}
                isActive={isActive}
                className={combineClassNames(
                  itemClass,
                  isActive && classMap.active
                )}
                data-testid={`${testId}-nav-item-${slug}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={classMap.linkContent}>
                  {item.icon && (
                    <span
                      className={classMap.icon}
                      aria-hidden="true"
                      data-testid={`${testId}-nav-icon-${slug}`}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className={classMap.label}>{item.label}</span>
                </span>
              </LinkWrapper>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

BaseNavBar.displayName = "BaseNavBar";
export default BaseNavBar;
