import React, { useState, useMemo, useRef, useEffect } from "react";
import { combineClassNames } from "@/utils/classNames";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "@/config/boreal-style-config";
import { capitalize } from "@/utils/capitalize";
import { ChevronDownIcon } from "@/Icons";
import { BaseSidebarProps, SidebarLink } from "./Sidebar.types";

const SidebarBase: React.FC<BaseSidebarProps> = ({
  links,
  classMap,
  LinkComponent = "a",
  isLinkActive,
  hasActiveChild,
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

  const idsRef = useRef<Record<string, string>>({});
  const seqRef = useRef(0);

  const idFor = (label: string) => {
    if (!idsRef.current[label]) {
      const slug = label
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9_-]/g, "");
      idsRef.current[label] = `${testId}-section-${slug}-${seqRef.current++}`;
    }
    return idsRef.current[label];
  };

  useEffect(() => {
    const next: Record<string, boolean> = {};

    const walk = (nodes: SidebarLink[]): boolean => {
      for (const node of nodes) {
        if (node.children?.length) {
          const childIsActive =
            hasActiveChild?.(node) ??
            node.children.some(
              (child) =>
                (isLinkActive?.(child) ?? false) ||
                (!!child.children?.length && walk(child.children)),
            );

          if (childIsActive) {
            next[node.label] = true;
          }
        }
      }

      return nodes.some(
        (node) =>
          (isLinkActive?.(node) ?? false) ||
          (!!node.children?.length && walk(node.children)),
      );
    };

    walk(links);
    setOpenItems((prev) => ({ ...prev, ...next }));
  }, [links, isLinkActive, hasActiveChild]);

  const toggleItem = (key: string) =>
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));

  const containerClasses = useMemo(
    () =>
      combineClassNames(
        classMap.wrapper,
        className,
        classMap[theme],
        classMap[state],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        outline && classMap.outline,
      ),
    [classMap, className, theme, state, outline, rounding, shadow],
  );

  const renderLinks = (items: SidebarLink[], isChild = false) => (
    <ul
      className={combineClassNames(
        classMap.list,
        isChild && classMap.childList,
      )}
      data-testid={`${testId}-list`}
    >
      {items.map(({ label, href, children, icon }, idx) => {
        const key = `${label}-${idx}`;
        const link: SidebarLink = { label, href, children, icon };

        const isActive = isLinkActive?.(link) ?? false;
        const containsActiveChild =
          hasActiveChild?.(link) ??
          !!children?.some(
            (child) =>
              (isLinkActive?.(child) ?? false) ||
              (child.children?.length && (hasActiveChild?.(child) ?? false)),
          );

        const isOpen = !!openItems[label];
        const sectionId = idFor(label);
        const buttonId = `${sectionId}-button`;
        const panelId = `${sectionId}-panel`;

        return (
          <li
            key={key}
            className={classMap.item}
            data-testid={`${testId}-listItem`}
          >
            {children && children.length > 0 ? (
              <>
                <button
                  type="button"
                  id={buttonId}
                  className={combineClassNames(
                    classMap.link,
                    (isOpen || containsActiveChild) && classMap.active,
                  )}
                  onClick={() => toggleItem(label)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  data-testid={`${testId}-expandItemButton`}
                >
                  {icon && <span className={classMap.icon}>{icon}</span>}
                  <span data-testid={`${testId}-expandItemLabel`}>{label}</span>
                  <ChevronDownIcon
                    className={combineClassNames(
                      classMap.chevron,
                      isOpen && classMap.chevronOpen,
                    )}
                    aria-hidden="true"
                    focusable={false}
                    data-testid={`${testId}-expandIcon`}
                  />
                </button>

                <div
                  id={panelId}
                  className={combineClassNames(
                    classMap.submenu,
                    isOpen && classMap.submenuOpen,
                  )}
                  role="group"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
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
                  isChild && classMap.childLink,
                  isActive && classMap.active,
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
                  isChild && classMap.childLink,
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
      data-testid={testId}
      {...rest}
    >
      <div className={classMap.nav}>{renderLinks(links)}</div>

      {showFooter && (
        <footer className={classMap.footer} data-testid={`${testId}-footer`}>
          {footerLinks?.map(({ label, href }, i) => (
            <LinkComponent
              key={`${label}-${i}`}
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
