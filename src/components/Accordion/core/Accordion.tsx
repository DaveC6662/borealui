import React from "react";
import "./Accordion.scss";
import { AccordionBase } from "../AccordionBase";
import type { AccordionProps } from "../Accordion.types";

const classes = {
  accordion: "accordion",
  header: "accordion_header",
  content: "accordion_content",
  icon: "accordion_icon",
  title: "accordion_title",

  disabled: "accordion_disabled",
  expanded: "accordion_expanded",

  primary: "accordion_primary",
  secondary: "accordion_secondary",
  success: "accordion_success",
  error: "accordion_error",
  warning: "accordion_warning",
  clear: "accordion_clear",
  outline: "accordion_outline",

  xs: "accordion_xs",
  small: "accordion_small",
  medium: "accordion_medium",
  large: "accordion_large",
  xl: "accordion_xl",
};

const generateUniqueId = (() => {
  let counter = 0;
  return () => `accordion-core-${counter++}`;
})();

const Accordion: React.FC<AccordionProps> = (props) => (
  <AccordionBase {...props} getUniqueId={generateUniqueId} classMap={classes} />
);

export default Accordion;
