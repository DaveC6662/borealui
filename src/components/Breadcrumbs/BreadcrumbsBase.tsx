import React, { useMemo, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbsBaseProps,
  ELLIPSIS_LABEL,
} from "./Breadcrumbs.types";
import { combineClassNames } from "../../utils/classNames";
import { ArrowRightIcon } from "../../Icons/index";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

export const BreadcrumbsBase: React.FC<BreadcrumbsBaseProps> = ({
  items,
  theme = getDefaultTheme(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  state = "",
  separator,
  classMap,
  disabled = false,
  size = getDefaultSize(),
  outline = false,
  className = "",
  maxVisible,
  LinkComponent = "a",
  ButtonComponent = "button",
  "data-testid": testId = "breadcrumbs",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => setIsExpanded(true);

  if (!items || items.length === 0) return null;

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
    [
      theme,
      state,
      size,
      shadow,
      rounding,
      disabled,
      outline,
      className,
      classMap,
    ]
  );

  return (
    <nav
      aria-label="Breadcrumb"
      data-testid={testId ? `${testId}-nav-container` : undefined}
      className={breadcrumbsClass}
    >
      <ol
        className={classMap.list}
        data-testid={testId ? `${testId}-nav-list` : undefined}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
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
            >
              {isEllipsis ? (
                <ButtonComponent
                  theme="clear"
                  size="xs"
                  className={classMap.ellipsis}
                  aria-label="Show all breadcrumbs"
                  aria-expanded={isExpanded}
                  onClick={disabled ? undefined : handleExpand}
                  disabled={disabled}
                  tabIndex={disabled ? -1 : 0}
                  data-testid={testId ? `${testId}-ellipsis` : undefined}
                >
                  {item.label}
                </ButtonComponent>
              ) : item.href && !isLast ? (
                disabled ? (
                  // Disabled: render non-interactive label for links
                  <span
                    className={classMap.link_disabled}
                    title={item.label}
                    itemProp="name"
                    data-testid={
                      testId ? `${testId}-nav-item-label` : undefined
                    }
                  >
                    {item.label}
                  </span>
                ) : (
                  <LinkComponent
                    href={item.href}
                    className={classMap.link}
                    title={item.label}
                    itemProp="item"
                    data-testid={
                      testId ? `${testId}-nav-item-label` : undefined
                    }
                  >
                    <span itemProp="name" className={classMap.link_label}>
                      {item.label}
                    </span>
                  </LinkComponent>
                )
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
