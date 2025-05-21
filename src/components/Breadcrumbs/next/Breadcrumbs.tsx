"use client";

import React from "react";
import Link from "next/link";
import styles from "./Breadcrumbs.module.scss";
import { BreadcrumbsBase } from "../BreadcrumbsBase";
import { BreadcrumbsProps } from "../Breadcrumbs.types";
import { Button } from "../../../index.next";

const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
  return (
    <BreadcrumbsBase
      {...props}
      classMap={styles}
      LinkComponent={Link}
      ButtonComponent={Button}
    />
  );
};

export default Breadcrumbs;
