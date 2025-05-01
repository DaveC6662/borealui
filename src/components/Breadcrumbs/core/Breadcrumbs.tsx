import React from "react";
import "./Breadcrumbs.scss";
import { BreadcrumbsBase } from "../BreadcrumbsBase";
import { BreadcrumbsProps } from "../Breadcrumbs.types";
import { Button } from "../../../index.core";

const classMap = {
  breadcrumbs: "breadcrumbs",
  breadcrumbs_primary: "breadcrumbs_primary",
  breadcrumbs_primary_outline: "breadcrumbs_primary_outline",
  breadcrumbs_secondary: "breadcrumbs_secondary",
  breadcrumbs_secondary_outline: "breadcrumbs_secondary_outline",
  breadcrumbs_success: "breadcrumbs_success",
  breadcrumbs_success_outline: "breadcrumbs_success_outline",
  breadcrumbs_warning: "breadcrumbs_warning",
  breadcrumbs_warning_outline: "breadcrumbs_warning_outline",
  breadcrumbs_error: "breadcrumbs_error",
  breadcrumbs_error_outline: "breadcrumbs_error_outline",
  breadcrumbs_clear: "breadcrumbs_clear",
  breadcrumbs_clear_outline: "breadcrumbs_clear_outline",
  breadcrumbs_xs: "breadcrumbs_xs",
  breadcrumbs_small: "breadcrumbs_small",
  breadcrumbs_medium: "breadcrumbs_medium",
  breadcrumbs_large: "breadcrumbs_large",
  breadcrumbs_xl: "breadcrumbs_xl",
  breadcrumbs_list: "breadcrumbs_list",
  breadcrumbs_item: "breadcrumbs_item",
  breadcrumbs_item_animate: "breadcrumbs_item_animate",
  breadcrumbs_item_active: "breadcrumbs_item_active",
  breadcrumbs_ellipsis: "breadcrumbs_ellipsis",
  breadcrumbs_link: "breadcrumbs_link",
  "breadcrumbs_link-label": "breadcrumbs_link-label",
  breadcrumbs_current: "breadcrumbs_current",
  breadcrumbs_separator: "breadcrumbs_separator",
  "breadcrumbs_separator-icon": "breadcrumbs_separator-icon",
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
  return (
    <BreadcrumbsBase {...props} classMap={classMap} ButtonComponent={Button} />
  );
};

export default Breadcrumbs;
