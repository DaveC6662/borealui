import React from "react";
import "./Taginput.scss";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import TextInput from "../../TextInput/core/TextInput";
import { combineClassNames } from "../../../utils/classNames";
import TagInputBase from "../TagInputBase";
import { TagInputProps } from "../Taginput.types";

const TagInput: React.FC<TagInputProps> = (props) => {
  return (
    <TagInputBase
      {...props}
      styles={{
        tagInput: "tagInput",
        tagContainer: "tagContainer",
        tag: "tag",
        tagLabel: "tagLabel",
        removeButton: "removeButton",
        inputWrapper: "inputWrapper",
        input: "input",
      }}
      IconButton={IconButton}
      TextInput={TextInput}
      combineClassNames={combineClassNames}
    />
  );
};

export default TagInput;
