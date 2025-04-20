"use client";

import React from "react";
import BaseRating from "../RatingBase";
import styles from "./Rating.module.scss";
import { RatingProps } from "../Rating.types";

const Rating: React.FC<RatingProps> = (props) => {
  return (
    <BaseRating
      {...props}
      classNames={{
        wrapper: styles.rating,
        star: styles.star,
        active: styles.active,
        themeMap: {
          primary: styles.primary,
          secondary: styles.secondary,
          success: styles.success,
          error: styles.error,
          warning: styles.warning,
        },
        sizeMap: {
          small: styles.small,
          medium: styles.medium,
          large: styles.large,
        },
        interactive: styles.interactive,
      }}
    />
  );
};

export default Rating;
