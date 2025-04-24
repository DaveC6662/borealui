import React from "react";
import "./Accordion.scss";
import { AccordionBase } from "../AccordionBase";
import type { AccordionProps } from "../Accordion.types";

const styles = {
  accordion: "accordion",
  accordionHeader: "accordionHeader",
  accordionContent: "accordionContent",
  accordionIcon: "accordionIcon",
  accordionTitle: "accordionTitle",

  // Modifiers
  accordionHeader_clear: "accordionHeader_clear",
  accordionHeader_expanded: "accordionHeader_expanded",
  accordionContent_expanded: "accordionContent_expanded",
  accordionContent_clear: "accordionContent_clear",
  accordionIcon_expanded: "accordionIcon_expanded",
  accordion_disabled: "accordion_disabled",
  accordion_expanded: "accordion_expanded",

  // Theme variants
  accordionHeader_primary: "accordionHeader_primary",
  accordionHeader_primary_outline: "accordionHeader_primary_outline",
  accordionHeader_secondary: "accordionHeader_secondary",
  accordionHeader_secondary_outline: "accordionHeader_secondary_outline",
  accordionHeader_success: "accordionHeader_success",
  accordionHeader_success_outline: "accordionHeader_success_outline",
  accordionHeader_error: "accordionHeader_error",
  accordionHeader_error_outline: "accordionHeader_error_outline",
  accordionHeader_warning: "accordionHeader_warning",
  accordionHeader_warning_outline: "accordionHeader_warning_outline",
  accordionHeader_clear_outline: "accordionHeader_clear_outline",

  // Size variants
  xs: "xs",
  small: "small",
  medium: "medium",
  large: "large",
  xl: "xl",
};

const generateUniqueId = (() => {
  let counter = 0;
  return () => `accordion-core-${counter++}`;
})();

/**
 * Core Accordion wrapper. Passes all props to AccordionBase.
 */
const Accordion: React.FC<AccordionProps> = (props) => (
  <AccordionBase {...props} getUniqueId={generateUniqueId} styles={styles} />
);

export default Accordion;
