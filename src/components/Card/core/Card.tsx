import React from "react";
import CardBase from "../CardBase";
import "./Card.scss";
import Button from "../../Buttons/Button/core/Button";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import Skeleton from "../../Skeleton/core/Skeleton";
import { CardProps } from "../Card.types";

const classMap = {
  card: "card",
  card_left: "card_left",
  card_right: "card_right",
  card_center: "card_center",
  card_primary: "card_primary",
  card_primary_outline: "card_primary_outline",
  card_secondary: "card_secondary",
  card_secondary_outline: "card_secondary_outline",
  card_success: "card_success",
  card_success_outline: "card_success_outline",
  card_warning: "card_warning",
  card_warning_outline: "card_warning_outline",
  card_error: "card_error",
  card_error_outline: "card_error_outline",
  card_clear: "card_clear",
  card_clear_outline: "card_clear_outline",
  card_loading: "card_loading",
  card_content: "card_content",
  card_xs: "card_xs",
  card_small: "card_small",
  card_medium: "card_medium",
  card_large: "card_large",
  card_xl: "card_xl",
  card_vertical: "card_vertical",
  card_horizontal: "card_horizontal",
  card_image: "card_image",
  card_header: "card_header",
  card_title: "card_title",
  card_icon: "card_icon",
  card_body: "card_body",
  card_description: "card_description",
  card_children: "card_children",
  card_footer: "card_footer",
  card_actions: "card_actions",
  "card_action-button": "card_action-button",
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
      classMap={classMap}
      SkeletonComponent={Skeleton}
    />
  );
};

export default Card;
