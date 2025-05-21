import React from "react";
import type { AccordionProps } from "./Accordion.types";

export interface AccordionBaseProps extends AccordionProps {
  isExpanded: boolean;
  toggle: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  classNames: {
    wrapper: string;
    header: string;
    content: string;
    icon: string;
    title: string;
  };
}

export const AccordionBase: React.FC<AccordionBaseProps> = ({
  id,
  title,
  children,
  classNames,
  isExpanded,
  toggle,
  handleKeyDown,
  customExpandedIcon,
  customCollapsedIcon,
}) => {
  return (
    <div id={id} className={classNames.wrapper}>
      <button
        type="button"
        className={classNames.header}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`${id}-content`}
      >
        <span className={classNames.icon}>
          {isExpanded ? customExpandedIcon : customCollapsedIcon}
        </span>
        <span className={classNames.title}>{title}</span>
      </button>

      <div
        id={`${id}-content`}
        className={classNames.content}
        role="region"
        aria-labelledby={id}
        hidden={!isExpanded}
      >
        {children}
      </div>
    </div>
  );
};
