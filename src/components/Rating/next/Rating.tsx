"use client";

import React from "react";
import BaseRating from "../RatingBase";
import styles from "./Rating.module.scss";
import { RatingProps } from "../Rating.types";

const Rating: React.FC<RatingProps> = (props) => {
  return <BaseRating {...props} classMap={styles} />;
};

export default Rating;
