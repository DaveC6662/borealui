import React, { useMemo, useState, KeyboardEvent } from "react";
import { AccordionProps } from "./Accordion.types";
import { combineClassNames } from "../../utils/classNames";

export interface AccordionBaseProps extends AccordionProps {
  getUniqueId: () => string;
  styles: Record<string, string>;
}

export const AccordionBase: React.FC<AccordionBaseProps> = ({
  title,
  id,
  children,
  lazyLoad = false,
  iconPosition = "right",
  isToggleable = true,
  description,
  size = "medium",
  theme = "primary",
  outline = false,
  clear = false,
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

  const contentId = `${id || internalId}-content`;
  const buttonId = `${id || internalId}-button`;
  const descId = description ? `${id || internalId}-desc` : undefined;

  const toggleAccordion = () => {
    if (disabled) return;
    if (!isToggleable && isExpanded) return;
    isControlled ? onToggle?.(!expanded) : setInternalExpanded((prev) => !prev);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleAccordion();
    }
  };

  const renderedIcon = isExpanded
    ? (customExpandedIcon ?? "−")
    : (customCollapsedIcon ?? "+");

  const wrapperClassName = combineClassNames(
    styles.accordion,
    styles[size],
    disabled && styles.accordion_disabled,
    isExpanded && styles.accordion_expanded,
    className
  );

  const themeClass =
    styles[`accordionHeader_${theme}${outline ? "_outline" : ""}`];

  const headerClassName = combineClassNames(
    styles.accordionHeader,
    themeClass,
    clear && styles.accordionHeader_clear,
    isExpanded && styles.accordionHeader_expanded
  );

  const contentClassName = combineClassNames(
    styles.accordionContent,
    isExpanded && styles.accordionContent_expanded,
    clear && styles.accordionContent_clear
  );

  const iconClassName = combineClassNames(
    styles.accordionIcon,
    isExpanded && styles.accordionIcon_expanded
  );

  return (
    <div {...rest} className={wrapperClassName}>
      <button
        id={buttonId}
        className={headerClassName}
        onClick={toggleAccordion}
        onKeyDown={handleKeyDown}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        aria-disabled={disabled}
        aria-describedby={descId}
        tabIndex={disabled ? -1 : 0}
        disabled={disabled}
        data-testid="accordion-toggle"
      >
        {iconPosition === "left" && (
          <span className={iconClassName} aria-hidden="true">
            {renderedIcon}
          </span>
        )}
        <span className={styles.accordionTitle}>{title}</span>
        {iconPosition === "right" && (
          <span className={iconClassName} aria-hidden="true">
            {renderedIcon}
          </span>
        )}
      </button>

      {description && (
        <span id={descId} className="sr_only">
          {description}
        </span>
      )}

      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={contentClassName}
        data-state={isExpanded ? "open" : "collapsed"}
        data-testid="accordion-content"
      >
        {(!lazyLoad || isExpanded) && children}
      </div>
    </div>
  );
};

AccordionBase.displayName = "AccordionBase";
