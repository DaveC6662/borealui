import React, { useMemo, useState, KeyboardEvent } from "react";
import { AccordionProps } from "./Accordion.types";
import { combineClassNames } from "../../utils/classNames";

export interface AccordionBaseProps extends AccordionProps {
  getUniqueId: () => string;
  classMap: Record<string, string>;
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
  state = "",
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
  classMap,
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

  const wrapperClassName = useMemo(
    () =>
      combineClassNames(
        classMap.accordion,
        classMap[size],
        classMap[state],
        disabled && classMap.disabled,
        isExpanded && classMap.expanded,
        className
      ),
    [classMap, size, disabled, isExpanded, className]
  );

  const headerClassName = useMemo(
    () =>
      combineClassNames(
        classMap.header,
        classMap[theme],
        classMap[state],
        outline && classMap.outline,
        disabled && classMap.disabled,
        isExpanded && classMap.expanded
      ),
    [classMap, isExpanded]
  );

  const contentClassName = useMemo(
    () => combineClassNames(classMap.content, isExpanded && classMap.expanded),
    [classMap, isExpanded]
  );

  const iconClassName = useMemo(
    () => combineClassNames(classMap.icon, isExpanded && classMap.expanded),
    [classMap, isExpanded]
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
        <span className={classMap.accordionTitle}>{title}</span>
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
