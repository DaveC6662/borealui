"use client";

import React, { useState, useId, useMemo } from "react";
import { combineClassNames } from "@/utils/classNames";
import { AccordionProps } from "./Accordion.types";
import styles from "./Accordion.module.scss";

/**
 * A reusable and accessible Accordion component that can be used in both controlled
 * and uncontrolled modes. Supports theming, size variations, disabled state,
 * custom icons, and keyboard accessibility.
 *
 * @example
 * ```tsx
 * <Accordion
 *   title="Details"
 *   initiallyExpanded
 *   theme="primary"
 *   size="large"
 * >
 *   <p>This is the hidden content revealed when expanded.</p>
 * </Accordion>
 * ```
 *
 * @param props AccordionProps
 * @returns JSX.Element
 */
const Accordion: React.FC<AccordionProps> = ({
  title,
  id,
  children,
  size = "medium",
  theme = "primary",
  outline = false,
  expanded,
  disabled,
  customCollapsedIcon,
  customExpandedIcon,
  onToggle,
  initiallyExpanded = false,
  className = "",
  ...rest
}) => {
  const isControlled = expanded !== undefined;
  const internalId = useId();
  const [internalExpanded, setInternalExpanded] = useState(initiallyExpanded);
  const isExpanded = isControlled ? expanded : internalExpanded;

  /**
   * Toggles the accordion open/closed state, depending on controlled mode.
   */
  const toggleAccordion = () => {
    if (disabled) return;

    if (isControlled) {
      onToggle?.(!expanded);
    } else {
      setInternalExpanded(prev => !prev);
    }
  };

  /**
   * Handles keyboard interactions for accessibility (Enter and Space).
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleAccordion();
    }
  };

  const accordionId = useMemo(() => id || `accordion-${internalId}`, [id, internalId]);

  const renderedIcon = useMemo(() => {
    if (isExpanded) return customExpandedIcon || "-";
    return customCollapsedIcon || "+";
  }, [isExpanded, customExpandedIcon, customCollapsedIcon]);

  const wrapperClassName = combineClassNames(
    styles.accordion,
    styles[theme],
    outline && styles.outline,
    styles[size],
    disabled && styles.disabled,
    className
  );

  const headerClassName = combineClassNames(
    styles.accordionHeader,
    styles[theme]
  );

  const contentClassName = combineClassNames(
    styles.accordionContent,
    isExpanded && styles.expanded
  );

  const iconClassName = combineClassNames(
    styles.accordionIcon,
    isExpanded && styles.expanded
  );

  return (
    <div {...rest} className={wrapperClassName}>
      <button
        className={headerClassName}
        onClick={toggleAccordion}
        onKeyDown={handleKeyDown}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={accordionId}
        disabled={disabled}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        data-testid="accordion-toggle"
      >
        <span className={styles.accordionTitle}>{title}</span>
        <span className={iconClassName} aria-hidden="true">
          {renderedIcon}
        </span>
      </button>
      <div
        id={accordionId}
        className={contentClassName}
        role="region"
        data-state={isExpanded ? "open" : "collapsed"}
        data-testid="accordion-content"
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
