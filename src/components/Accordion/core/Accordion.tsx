import React, { useMemo, useState } from "react";
import "./Accordion.scss";
import { AccordionProps } from "../Accordion.types";
import { AccordionBase } from "../Accordion.base";
import { combineClassNames } from "../../../utils/classNames";

const generateUniqueId = (() => {
  let counter = 0;
  return () => `accordion-core-${counter++}`;
})();

const Accordion: React.FC<AccordionProps> = (props) => {
  const {
    id,
    theme = "primary",
    outline = false,
    size = "medium",
    disabled,
    expanded,
    onToggle,
    initiallyExpanded = false,
    className = "",
  } = props;

  const isControlled = expanded !== undefined;
  const internalId = useMemo(generateUniqueId, []);
  const [internalExpanded, setInternalExpanded] = useState(initiallyExpanded);
  const isExpanded = isControlled ? expanded : internalExpanded;

  const accordionId = useMemo(() => id || internalId, [id, internalId]);

  const toggle = () => {
    if (disabled) return;
    isControlled ? onToggle?.(!expanded) : setInternalExpanded((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const classNames = {
    wrapper: combineClassNames(
      "accordion",
      theme,
      outline && "outline",
      size,
      disabled && "disabled",
      className
    ),
    header: combineClassNames("accordionHeader", theme),
    content: combineClassNames("accordionContent", isExpanded && "expanded"),
    icon: combineClassNames("accordionIcon", isExpanded && "expanded"),
    title: "accordionTitle",
  };

  return (
    <AccordionBase
      {...props}
      id={accordionId}
      isExpanded={isExpanded}
      toggle={toggle}
      handleKeyDown={handleKeyDown}
      classNames={classNames}
    />
  );
};

export default Accordion;
