// Accordion.tsx (Core)
import React from "react";
import "./Accordion.scss";
import { AccordionBase } from "../AccordionBase";
import type { AccordionProps } from "../Accordion.types";

// Global styles mapped manually
const styles = {
  accordion: "accordion",
  accordionHeader: "accordionHeader",
  accordionContent: "accordionContent",
  accordionIcon: "accordionIcon",
  accordionTitle: "accordionTitle",
  primary: "primary",
  secondary: "secondary",
  outline: "outline",
  disabled: "disabled",
  small: "small",
  medium: "medium",
  large: "large",
  expanded: "expanded",
};

const generateUniqueId = (() => {
  let counter = 0;
  return () => `accordion-core-${counter++}`;
})();

const Accordion: React.FC<AccordionProps> = (props) => (
  <AccordionBase {...props} getUniqueId={generateUniqueId} styles={styles} />
);

export default Accordion;
