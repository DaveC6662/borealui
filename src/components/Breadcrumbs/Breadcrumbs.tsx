"use client";

import React, { useMemo, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import styles from "./Breadcrumbs.module.scss";
import { SizeType, ThemeType } from "@/types/types";
import { Button } from "../../index";
import { combineClassNames } from "@/utils/classNames";

/**
 * A breadcrumb item used to define a single step in the navigation path.
 */
interface Breadcrumb {
  /** The display label for the breadcrumb. */
  label: string;
  /** Optional URL the breadcrumb should link to. If not provided, it is rendered as plain text. */
  href?: string;
}

/**
 * Props for the Breadcrumbs component.
 */
export interface BreadcrumbsProps {
  /** An array of breadcrumb items. */
  items: Breadcrumb[];
  /** Optional custom separator node between breadcrumb items. Defaults to a right chevron icon. */
  separator?: React.ReactNode;
  /** Theme style to apply to the breadcrumbs. */
  theme?: ThemeType;
  /** Size of the breadcrumbs. */
  size?: SizeType;
  /** Additional class name for custom styling. */
  className?: string;
  /** Whether to use the outline style. */
  outline?: boolean;
  /** Maximum number of visible items before collapsing into an ellipsis. */
  maxVisible?: number;
}

/** Label used to represent collapsed breadcrumb items. */
const ELLIPSIS_LABEL = "…";

/**
 * Breadcrumbs component renders a navigation trail with optional truncation and expandability.
 *
 * @param {BreadcrumbsProps} props - Component props.
 * @returns {JSX.Element} Rendered breadcrumbs navigation.
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = <FaChevronRight className={styles.separatorIcon} />,
  theme = "primary",
  className = "",
  size = "medium",
  outline = false,
  maxVisible,
}) => {
  /** State to determine whether all breadcrumb items should be shown. */
  const [isExpanded, setIsExpanded] = useState(false);

  /** Expands the breadcrumbs to show all items. */
  const handleExpand = () => setIsExpanded(true);

  /**
   * Memoized list of visible items.
   * Truncates the breadcrumb trail if `maxVisible` is set and not expanded.
   */
  const visibleItems = useMemo(() => {
    if (isExpanded || !maxVisible || items.length <= maxVisible) return items;
    const first = items[0];
    const lastItems = items.slice(items.length - (maxVisible - 2));
    return [first, { label: ELLIPSIS_LABEL }, ...lastItems];
  }, [items, isExpanded, maxVisible]);

  /** Combines base, theme, and state-specific class names for the breadcrumbs container. */
  const combinedClassName = combineClassNames(
    styles.breadcrumbs,
    styles[theme],
    size && styles[size],
    outline && styles.outline,
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
      <ol className={styles.list}>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isEllipsis = item.label === ELLIPSIS_LABEL;

          const itemClassName = combineClassNames(
            styles.item,
            isExpanded && item.label !== "…" && styles.itemAnimate,
            isLast && styles.active
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
                  ariaLabel="..."
                  className={styles.ellipsis}
                  aria-label="Expand breadcrumbs"
                  onClick={handleExpand}
                >
                  {item.label}
                </Button>
              ) : item.href && !isLast ? (
                <Link
                  href={item.href}
                  itemProp="item"
                  className={styles.link}
                  title={item.label}
                  aria-current={isLast ? "page" : undefined}
                >
                  <span itemProp="name" className={styles.linkLabel}>
                    {item.label}
                  </span>
                </Link>
              ) : (
                <span className={styles.current} aria-current="page">
                  <span itemProp="name">{item.label}</span>
                </span>
              )}
              {!isLast && <span className={styles.separator}>{separator}</span>}
              <meta itemProp="position" content={`${index + 1}`} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
