import React, { useMemo, useState } from "react";
import "./Accordion.scss";
import { combineClassNames } from "@/utils/classNames";
import { AccordionProps } from "../Accordion.types";

/**
 * Generates a simple unique ID for use in environments without `useId`.
 */
const generateUniqueId = (() => {
  let counter = 0;
  return () => `accordion-core-${counter++}`;
})();

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
const accordion: React.FC<AccordionProps> = ({
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
  const internalId = useMemo(generateUniqueId, []);
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

  const accordionId = useMemo(() => id || internalId, [id, internalId]);

  const renderedIcon = useMemo(() => {
    return isExpanded
      ? customExpandedIcon ?? "-"
      : customCollapsedIcon ?? "+";
  }, [isExpanded, customExpandedIcon, customCollapsedIcon]);

  const wrapperClassName = combineClassNames(
    "accordion",
    theme,
    outline && "outline",
    size,
    disabled && "disabled",
    className
  );

  const headerClassName = combineClassNames(
    "accordionHeader",
    theme
  );

  const contentClassName = combineClassNames(
    "accordionContent",
    isExpanded && "expanded"
  );

  const iconClassName = combineClassNames(
    "accordionIcon",
    isExpanded && "expanded"
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
        <span className={"accordionTitle"}>{title}</span>
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

export default accordion;
