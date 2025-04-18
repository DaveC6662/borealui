import React, { useMemo, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import {
  Breadcrumb,
  BreadcrumbsProps,
  ELLIPSIS_LABEL,
} from "./Breadcrumbs.types";
import { combineClassNames } from "@/utils/classNames";

export interface BreadcrumbsBaseProps extends BreadcrumbsProps {
  classMap: Record<string, string>;
  LinkComponent?: React.ElementType;
  ButtonComponent: React.ElementType;
}

export const BreadcrumbsBase: React.FC<BreadcrumbsBaseProps> = ({
  items,
  theme = "primary",
  separator,
  classMap,
  size = "medium",
  outline = false,
  className = "",
  maxVisible,
  LinkComponent = "a", // fallback to native <a> for core
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

  const combinedClassName = combineClassNames(
    classMap.breadcrumbs,
    classMap[theme],
    size && classMap[size],
    outline ? classMap.outline : undefined,
    className
  );

  return (
    <nav
      aria-label="breadcrumb"
      className={combinedClassName}
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
            isExpanded && item.label !== ELLIPSIS_LABEL && classMap.itemAnimate,
            isLast && classMap.active
          );

          return (
            <li
              key={`${item.label}-${item.href ?? index}`}
              className={itemClassName}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isEllipsis ? (
                <ButtonComponent
                  theme="clear"
                  size="small"
                  className={classMap.ellipsis}
                  aria-label="Expand breadcrumbs"
                  onClick={handleExpand}
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
                  <span itemProp="name" className={classMap.linkLabel}>
                    {item.label}
                  </span>
                </LinkComponent>
              ) : (
                <span className={classMap.current} aria-current="page">
                  <span itemProp="name">{item.label}</span>
                </span>
              )}
              {!isLast && (
                <span className={classMap.separator}>
                  {separator ?? (
                    <FaChevronRight className={classMap.separatorIcon} />
                  )}
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
