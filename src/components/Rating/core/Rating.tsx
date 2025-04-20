import React from "react";
import BaseRating from "../RatingBase";
import "./Rating.scss";
import { RatingProps } from "../Rating.types";

const Rating: React.FC<RatingProps> = (props) => {
  return (
    <BaseRating
      {...props}
      classNames={{
        wrapper: "rating",
        star: "star",
        active: "active",
        themeMap: {
          primary: "primary",
          secondary: "secondary",
          success: "success",
          error: "error",
          warning: "warning",
        },
        sizeMap: {
          small: "small",
          medium: "medium",
          large: "large",
        },
        interactive: "interactive",
      }}
    />
  );
};

export default Rating;
