import React, { useMemo, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import "./Breadcrumbs.scss";
import { BreadcrumbsProps, ELLIPSIS_LABEL } from "../Breadcrumbs.types";
import  Button  from "../../Buttons/Button/core/Button";
import { combineClassNames } from "@/utils/classNames";

/**
 * Breadcrumbs component renders a navigation trail with optional truncation and expandability.
 *
 * Supports accessibility, semantic structure, custom styling, and optional truncation
 * of long breadcrumb paths with an ellipsis button to expand.
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "Library", href: "/library" },
 *     { label: "Data" },
 *   ]}
 *   theme="secondary"
 * />
 * ```
 *
 * @param props BreadcrumbsProps
 * @returns JSX.Element
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = <FaChevronRight className={"separatorIcon"} />,
  theme = "primary",
  className = "",
  size = "medium",
  outline = false,
  maxVisible,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  /** Expands the breadcrumbs to show all items. */
  const handleExpand = () => setIsExpanded(true);

  /** Determines which breadcrumb items are visible when truncation is applied. */
  const visibleItems = useMemo(() => {
    if (isExpanded || !maxVisible || items.length <= maxVisible) return items;
    const first = items[0];
    const lastItems = items.slice(items.length - (maxVisible - 2));
    return [first, { label: ELLIPSIS_LABEL }, ...lastItems];
  }, [items, isExpanded, maxVisible]);

  const combinedClassName = combineClassNames(
    "breadcrumbs",
    theme,
    size && size,
    outline && "outline",
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
      <ol className={"list"}>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isEllipsis = item.label === ELLIPSIS_LABEL;

          const itemClassName = combineClassNames(
            "item",
            isExpanded && item.label !== "…" && "itemAnimate",
            isLast && "active"
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
                <Button
                  theme="clear"
                  size="small"
                  className={"ellipsis"}
                  aria-label="Expand breadcrumbs"
                  onClick={handleExpand}
                >
                  {item.label}
                </Button>
              ) : item.href && !isLast ? (
                <a
                  href={item.href}
                  itemProp="item"
                  className={"link"}
                  title={item.label}
                >
                  <span itemProp="name" className={"linkLabel"}>
                    {item.label}
                  </span>
                </a>
              ) : (
                <span className={"current"} aria-current="page">
                  <span itemProp="name">{item.label}</span>
                </span>
              )}
              {!isLast && <span className={"separator"}>{separator}</span>}
              <meta itemProp="position" content={`${index + 1}`} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
