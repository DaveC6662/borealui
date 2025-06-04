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

  shadowNone: "accordion_shadow-None",
  shadowLight: "accordion_shadow-Light",
  shadowMedium: "accordion_shadow-Medium",
  shadowStrong: "accordion_shadow-Strong",
  shadowIntense: "accordion_shadow-Intense",

  roundNone: "accordion_round-None",
  roundXs: "accordion_round-Xs",
  roundSm: "accordion_round-Sm",
  roundMd: "accordion_round-Md",
  roundLg: "accordion_round-Lg",
  roundXl: "accordion_round-Xl",

  disabled: "accordion_disabled",
  expanded: "accordion_expanded",

  primary: "accordion_primary",
  secondary: "accordion_secondary",

  tertiary: "accordion_tertiary",
  quaternary: "accordion_quaternary",

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
