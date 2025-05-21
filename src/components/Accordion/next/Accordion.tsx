"use client";

import React, { useId } from "react";
import { AccordionBase } from "../AccordionBase";
import type { AccordionProps } from "../Accordion.types";
import styles from "./Accordion.module.scss";

const Accordion: React.FC<AccordionProps> = (props) => {
  const id = useId();
  const getUniqueId = () => `accordion-${id}`;

  return (
    <AccordionBase {...props} getUniqueId={getUniqueId} classMap={styles} />
  );
};

export default Accordion;
