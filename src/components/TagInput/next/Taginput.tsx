"use client";

import React from "react";
import styles from "./Taginput.module.scss";
import { IconButton, TextInput } from "@/index.next";
import { combineClassNames } from "@/utils/classNames";
import TagInputBase from "../TagInputBase";
import { TagInputProps } from "../Taginput.types";

const TagInput: React.FC<TagInputProps> = (props) => {
  return (
    <TagInputBase
      {...props}
      classMap={styles}
      IconButton={IconButton}
      TextInput={TextInput}
      combineClassNames={combineClassNames}
    />
  );
};

export default TagInput;
