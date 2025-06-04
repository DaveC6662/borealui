import React, { useMemo, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbsProps,
  ELLIPSIS_LABEL,
} from "./Breadcrumbs.types";
import { combineClassNames } from "../../utils/classNames";
import { SeparatorIcon } from "../../Icons/index";

export interface BreadcrumbsBaseProps extends BreadcrumbsProps {
  classMap: Record<string, string>;
  LinkComponent?: React.ElementType;
  ButtonComponent: React.ElementType;
}

export const BreadcrumbsBase: React.FC<BreadcrumbsBaseProps> = ({
  items,
  theme = "primary",
  state = "",
  separator,
  classMap,
  disabled = false,
  size = "medium",
  outline = false,
  className = "",
  maxVisible,
  LinkComponent = "a",
  ButtonComponent,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => setIsExpanded(true);

  const visibleItems: Breadcrumb[] = useMemo(() => {
    if (isExpanded || !maxVisible || items.length <= maxVisible) return items;
    const first = items[0];
    const lastItems = items.slice(items.length - (maxVisible - 2));
    return [first, { label: ELLIPSIS_LABEL }, ...lastItems];
  }, [items, isExpanded, maxVisible]);

  const breadcrumbsClass = useMemo(
    () =>
      combineClassNames(
        classMap.breadcrumbs,
        classMap[theme],
        classMap[state],
        classMap[size],
        disabled && classMap.disabled,
        outline && classMap.outline,
        className
      ),
    [theme, size, outline, className]
  );

  return (
    <nav
      aria-label="Breadcrumb"
      className={breadcrumbsClass}
      itemScope
      role="navigation"
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className={classMap.list}>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isEllipsis = item.label === ELLIPSIS_LABEL;

          const itemClassName = combineClassNames(
            classMap.item,
            isExpanded && !isEllipsis && classMap.item_animate,
            isLast && classMap.item_active
          );

          return (
            <li
              key={`${item.label}-${item.href ?? index}`}
              className={itemClassName}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              aria-current={isLast ? "page" : undefined}
            >
              {isEllipsis ? (
                <ButtonComponent
                  theme="clear"
                  size="small"
                  className={classMap.ellipsis}
                  aria-label="Show more breadcrumbs"
                  onClick={handleExpand}
                  tabIndex={0}
                >
                  {item.label}
                </ButtonComponent>
              ) : item.href && !isLast ? (
                <LinkComponent
                  href={item.href}
                  itemProp="item"
                  className={classMap.link}
                  title={item.label}
                >
                  <span itemProp="name" className={classMap.link_label}>
                    {item.label}
                  </span>
                </LinkComponent>
              ) : (
                <span
                  className={classMap.current}
                  itemProp="name"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className={classMap.separator} aria-hidden="true">
                  {separator ?? <SeparatorIcon />}
                </span>
              )}
              <meta itemProp="position" content={`${index + 1}`} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

BreadcrumbsBase.displayName = "BreadcrumbsBase";
