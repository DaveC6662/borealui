"use client";

import React, { useState, useId, useMemo } from "react";
import { combineClassNames } from "@/utils/classNames";
import styles from "./Accordion.module.scss";
import { SizeType, ThemeType } from "@/types/types";

/**
 * Props for the Accordion component.
 */
export interface AccordionProps {
  /**
   * The title text displayed in the accordion header.
   */
  title?: string;

  /**
   * Optional custom ID for the accordion content section.
   * If not provided, a unique ID will be generated.
   */
  id?: string;

  /**
   * The content to display when the accordion is expanded.
   */
  children?: React.ReactNode;

  /**
   * The theme color of the accordion (e.g., 'primary', 'secondary').
   */
  theme?: ThemeType;

  /**
   * The size of the accordion (e.g., 'small', 'medium', 'large').
   */
  size?: SizeType;

  /**
   * If true, the accordion is initially expanded (uncontrolled mode).
   */
  initiallyExpanded?: boolean;

  /**
   * If true, applies an outline style to the accordion.
   */
  outline?: boolean;

  /**
   * If true, disables user interaction and styles the accordion as disabled.
   */
  disabled?: boolean;

  /**
   * Additional custom class names for the wrapper element.
   */
  className?: string;

  /**
   * If set, enables controlled mode. Determines whether the accordion is expanded.
   */
  expanded?: boolean;

  /**
   * Callback triggered when the accordion header is toggled (in controlled mode).
   * Receives the new `expanded` state as an argument.
   */
  onToggle?: (expanded: boolean) => void;

  /**
   * Custom icon to display when the accordion is expanded.
   * Can be a string or React node.
   */
  customExpandedIcon?: React.ReactNode;

  /**
   * Custom icon to display when the accordion is collapsed.
   * Can be a string or React node.
   */
  customCollapsedIcon?: React.ReactNode;
}

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
