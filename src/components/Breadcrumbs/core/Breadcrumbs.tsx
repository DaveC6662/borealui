import React from "react";
import "./Breadcrumbs.scss";
import { BreadcrumbsBase } from "../BreadcrumbsBase";
import { BreadcrumbsProps } from "../Breadcrumbs.types";
import Button from "../../Buttons/Button/core/Button";

const classMap = {
  breadcrumbs: "breadcrumbs",
  list: "list",
  item: "item",
  itemAnimate: "itemAnimate",
  active: "active",
  ellipsis: "ellipsis",
  link: "link",
  linkLabel: "linkLabel",
  current: "current",
  separator: "separator",
  separatorIcon: "separatorIcon",
  outline: "outline",
  primary: "primary",
  secondary: "secondary",
  small: "small",
  medium: "medium",
  large: "large",
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
  return (
    <BreadcrumbsBase {...props} classMap={classMap} ButtonComponent={Button} />
  );
};

export default Breadcrumbs;
