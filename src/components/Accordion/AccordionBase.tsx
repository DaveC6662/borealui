// AccordionBase.tsx
import React, { useMemo, useState, KeyboardEvent } from "react";
import { AccordionProps } from "./Accordion.types";
import { combineClassNames } from "@/utils/classNames";

export interface AccordionBaseProps extends AccordionProps {
  getUniqueId: () => string;
  styles: Record<string, string>;
}

export const AccordionBase: React.FC<AccordionBaseProps> = ({
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
  getUniqueId,
  styles,
  ...rest
}) => {
  const isControlled = expanded !== undefined;
  const internalId = useMemo(getUniqueId, []);
  const [internalExpanded, setInternalExpanded] = useState(initiallyExpanded);
  const isExpanded = isControlled ? expanded : internalExpanded;

  const toggleAccordion = () => {
    if (disabled) return;
    isControlled ? onToggle?.(!expanded) : setInternalExpanded((prev) => !prev);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleAccordion();
    }
  };

  const accordionId = useMemo(() => id || internalId, [id, internalId]);
  const renderedIcon = isExpanded
    ? (customExpandedIcon ?? "-")
    : (customCollapsedIcon ?? "+");

  const wrapperClassName = combineClassNames(
    styles.accordion,
    styles[theme],
    outline && styles.outline,
    styles[size],
    disabled && styles.disabled,
    className
  );

  return (
    <div {...rest} className={wrapperClassName}>
      <button
        className={combineClassNames(styles.accordionHeader, styles[theme])}
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
        <span
          className={combineClassNames(
            styles.accordionIcon,
            isExpanded && styles.expanded
          )}
          aria-hidden="true"
        >
          {renderedIcon}
        </span>
      </button>
      <div
        id={accordionId}
        className={combineClassNames(
          styles.accordionContent,
          isExpanded && styles.expanded
        )}
        role="region"
        data-state={isExpanded ? "open" : "collapsed"}
        data-testid="accordion-content"
      >
        {children}
      </div>
    </div>
  );
};
