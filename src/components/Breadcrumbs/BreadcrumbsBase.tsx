import React, { useMemo, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbsProps,
  ELLIPSIS_LABEL,
} from "./Breadcrumbs.types";
import { combineClassNames } from "../../utils/classNames";
import { ArrowRightIcon } from "../../Icons/index";
import { capitalize } from "../../utils/capitalize";
import {
  defaultRounding,
  defaultShadow,
  defaultSize,
  defaultTheme,
} from "../../config/boreal-style-config";

export interface BreadcrumbsBaseProps extends BreadcrumbsProps {
  classMap: Record<string, string>;
  LinkComponent?: React.ElementType;
  ButtonComponent: React.ElementType;
}

export const BreadcrumbsBase: React.FC<BreadcrumbsBaseProps> = ({
  items,
  theme = defaultTheme,
  rounding = defaultRounding,
  shadow = defaultShadow,
  state = "",
  separator,
  classMap,
  disabled = false,
  size = defaultSize,
  outline = false,
  className = "",
  maxVisible,
  LinkComponent = "a",
  ButtonComponent,
  "data-testid": testId,
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
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        disabled && classMap.disabled,
        outline && classMap.outline,
        className
      ),
    [theme, size, outline, className]
  );

  return (
    <nav
      aria-label="Breadcrumb"
      data-testid={testId ? `${testId}-nav-container` : undefined}
      className={breadcrumbsClass}
      itemScope
      role="navigation"
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol
        className={classMap.list}
        data-testid={testId ? `${testId}-nav-list` : undefined}
      >
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
              data-testid={testId ? `${testId}-nav-item` : undefined}
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
                  data-testid={testId ? `${testId}-ellipsis` : undefined}
                >
                  {item.label}
                </ButtonComponent>
              ) : item.href && !isLast ? (
                <LinkComponent
                  href={item.href}
                  itemProp="item"
                  className={classMap.link}
                  title={item.label}
                  data-testid={testId ? `${testId}-nav-item-label` : undefined}
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
                  data-testid={
                    testId ? `${testId}-nav-item-current` : undefined
                  }
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className={classMap.separator} aria-hidden="true">
                  {separator ?? <ArrowRightIcon />}
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
