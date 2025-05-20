import React from "react";
import CardBase from "../CardBase";
import "./Card.scss";
import { Button, IconButton, Skeleton } from "../../../index.core";
import { CardProps } from "../Card.types";

const classes = {
  card: "card",
  left: "card_left",
  right: "card_right",
  center: "card_center",
  primary: "card_primary",
  secondary: "card_secondary",
  success: "card_success",
  warning: "card_warning",
  error: "card_error",
  clear: "card_clear",
  outline: "card_outline",
  loading: "card_loading",
  content: "card_content",
  xs: "card_xs",
  small: "card_small",
  medium: "card_medium",
  large: "card_large",
  xl: "card_xl",
  vertical: "card_vertical",
  horizontal: "card_horizontal",
  image: "card_image",
  header: "card_header",
  title: "card_title",
  icon: "card_icon",
  body: "card_body",
  description: "card_description",
  children: "card_children",
  footer: "card_footer",
  actions: "card_actions",
  action_button: "card_action_button",
};

const Card: React.FC<CardProps> = (props) => {
  const wrappedButtons = (props.actionButtons ?? []).map((b) => ({
    ...b,
    buttonComponent: Button,
    iconButtonComponent: IconButton,
  }));

  return (
    <CardBase
      {...props}
      actionButtons={wrappedButtons}
      classMap={classes}
      SkeletonComponent={Skeleton}
    />
  );
};

export default Card;
