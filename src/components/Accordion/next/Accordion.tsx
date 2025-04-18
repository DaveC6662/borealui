"use client";
import React, { useId, useState, useMemo } from "react";
import { AccordionProps } from "../Accordion.types";
import { AccordionBase } from "../Accordion.base";
import styles from "./Accordion.module.scss";
import { combineClassNames } from "@/utils/classNames";

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
  const internalId = useId();
  const [internalExpanded, setInternalExpanded] = useState(initiallyExpanded);
  const isExpanded = isControlled ? expanded : internalExpanded;

  const accordionId = useMemo(
    () => id || `accordion-${internalId}`,
    [id, internalId]
  );

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
      styles.accordion,
      styles[theme],
      outline && styles.outline,
      styles[size],
      disabled && styles.disabled,
      className
    ),
    header: combineClassNames(styles.accordionHeader, styles[theme]),
    content: combineClassNames(
      styles.accordionContent,
      isExpanded && styles.expanded
    ),
    icon: combineClassNames(
      styles.accordionIcon,
      isExpanded && styles.expanded
    ),
    title: styles.accordionTitle,
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
