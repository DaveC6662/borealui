import React, { useState, useMemo, useRef } from "react";
import { SidebarProps } from "./Sidebar.types";
import { combineClassNames } from "@/utils/classNames";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "@/config/boreal-style-config";
import { capitalize } from "@/utils/capitalize";
import { ChevronDownIcon } from "@/Icons";

export interface BaseSidebarProps extends SidebarProps {
  classMap: Record<string, string>;
  LinkComponent?: React.ElementType;
}

const SidebarBase: React.FC<BaseSidebarProps> = ({
  links,
  classMap,
  currentPath,
  LinkComponent = "a",
  theme = getDefaultTheme(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  state = "",
  showFooter = false,
  footerLinks,
  footerVersion,
  outline = false,
  className = "",
  "data-testid": testId = "sidebar",
  ariaLabel = "Sidebar navigation",
  ...rest
}) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const submenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const setSubmenuRef = (key: string, el: HTMLDivElement | null) => {
    submenuRefs.current[key] = el;
  };

  const getSubmenuHeight = (key: string) => {
    const el = submenuRefs.current[key];
    return el ? `${el.scrollHeight}px` : "0px";
  };

  const containerClasses = useMemo(
    () =>
      combineClassNames(
        classMap.wrapper,
        className,
        classMap[theme],
        classMap[state],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        outline ? classMap.outline : ""
      ),
    [className, theme, state, outline, rounding, shadow]
  );

  const renderLinks = (items: typeof links, isChild = false) => (
    <ul
      className={combineClassNames(
        classMap.list,
        isChild ? classMap.childList : ""
      )}
      data-testid={`${testId}-list`}
    >
      {items.map(({ label, href, children, icon }) => {
        const isActive = href && currentPath === href;
        const isOpen = openItems[label] || false;

        return (
          <li
            key={label}
            className={classMap.item}
            data-testid={`${testId}-listItems`}
          >
            {children && children.length > 0 ? (
              <>
                <button
                  type="button"
                  className={combineClassNames(
                    classMap.link,
                    isOpen ? classMap.active : ""
                  )}
                  onClick={() => toggleItem(label)}
                  aria-expanded={isOpen}
                  data-testid={`${testId}-exapndItemButton`}
                >
                  {icon && <span className={classMap.icon}>{icon}</span>}
                  <span data-testid={`${testId}-exapndItemLabel`}>{label}</span>
                  <ChevronDownIcon
                    className={combineClassNames(
                      classMap.chevron,
                      isOpen ? classMap.chevronOpen : ""
                    )}
                    data-testid={`${testId}-exapndIcon`}
                  />
                </button>
                <div
                  ref={(el) => setSubmenuRef(label, el)}
                  className={combineClassNames(
                    classMap.submenu,
                    isOpen ? classMap.submenuOpen : ""
                  )}
                  style={{
                    maxHeight: isOpen ? getSubmenuHeight(label) : "0px",
                  }}
                  data-testid={`${testId}-subMenu`}
                >
                  {renderLinks(children, true)}
                </div>
              </>
            ) : href ? (
              <LinkComponent
                href={href}
                className={combineClassNames(
                  classMap.link,
                  isChild ? classMap.childLink : "",
                  isActive ? classMap.active : ""
                )}
                aria-current={isActive ? "page" : undefined}
                data-testid={`${testId}-sidebarLink`}
              >
                {icon && <span className={classMap.icon}>{icon}</span>}
                {label}
              </LinkComponent>
            ) : (
              <span
                className={combineClassNames(
                  classMap.link,
                  isChild ? classMap.childLink : ""
                )}
                data-testid={`${testId}-sidebarLabel`}
              >
                {icon && <span className={classMap.icon}>{icon}</span>}
                {label}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav
      className={containerClasses}
      aria-label={ariaLabel}
      {...rest}
      data-testid={testId}
    >
      <nav className={classMap.nav}>{renderLinks(links)}</nav>
      {showFooter && (
        <footer className={classMap.footer} data-testid={`${testId}-footer`}>
          {footerLinks?.map(({ label, href }) => (
            <LinkComponent
              key={label}
              href={href}
              className={classMap.footerLink}
              data-testid={`${testId}-footerLink`}
            >
              {label}
            </LinkComponent>
          ))}

          {footerVersion && (
            <span
              className={classMap.footerVersion}
              data-testid={`${testId}-footerVersion`}
            >
              {footerVersion}
            </span>
          )}
        </footer>
      )}
    </nav>
  );
};

SidebarBase.displayName = "SidebarBase";

export default SidebarBase;
