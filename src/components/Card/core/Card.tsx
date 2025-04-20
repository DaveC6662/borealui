import React from "react";
import CardBase from "../CardBase";
import "./Card.scss";
import Button from "../../Buttons/Button/core/Button";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import Skeleton from "../../Skeleton/core/Skeleton";
import { CardProps } from "../Card.types";

const classMap = {
  card: "card",
  solid: "solid",
  cardLoading: "cardLoading",
  cardContent: "cardContent",
  fadeIn: "fadeIn",
  cardImage: "cardImage",
  cardHeader: "cardHeader",
  cardTitle: "cardTitle",
  cardIcon: "cardIcon",
  cardBody: "cardBody",
  cardDescription: "cardDescription",
  cardChildren: "cardChildren",
  cardFooter: "cardFooter",
  cardActions: "cardActions",
  actionButton: "actionButton",
  primary: "primary",
  secondary: "secondary",
  vertical: "vertical",
  horizontal: "horizontal",
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
