"use client";

import React, { useState, useId } from "react";
import { FaTimes } from "react-icons/fa";
import { IconButton, TextInput } from "@/index";
import styles from "./Taginput.module.scss";
import { SizeType, ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Props for the TagInput component.
 * @typedef {Object} TagInputProps
 * @property {string[]} [tags] - Initial list of tags.
 * @property {(tags: string[]) => void} [onChange] - Callback triggered when the tag list changes.
 * @property {string} [placeholder] - Placeholder text for the input field.
 * @property {ThemeType} [theme] - Theme style applied to the component.
 * @property {SizeType} [size] - Size variant of the component (e.g., small, medium, large).
 * @property {string} [data-testid] - Optional test ID for testing utilities.
 */
interface TagInputProps {
  tags?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  theme?: ThemeType;
  size?: SizeType;
  "data-testid"?: string;
}

/**
 * TagInput component allows users to input and manage a dynamic list of tags.
 *
 * @component
 * @example
 * ```tsx
 * <TagInput
 *   tags={["react", "typescript"]}
 *   onChange={(updatedTags) => console.log(updatedTags)}
 *   placeholder="Add tags..."
 *   theme="primary"
 *   size="medium"
 * />
 * ```
 */
const TagInput: React.FC<TagInputProps> = ({
  tags = [],
  onChange,
  placeholder = "Add a tag...",
  theme = "primary",
  size = "medium",
  "data-testid": testId = "tag-input",
}) => {
  const inputId = useId();
  const [inputValue, setInputValue] = useState("");
  const [tagList, setTagList] = useState<string[]>(tags);

  /**
   * Handles adding a tag when the user presses Enter or comma.
   * @param {React.KeyboardEvent<HTMLInputElement>} event - The keyboard event.
   */
  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === "Enter" || event.key === ",") && inputValue.trim() !== "") {
      event.preventDefault();
      const newTag = inputValue.trim();
      if (!tagList.includes(newTag)) {
        const updated = [...tagList, newTag];
        setTagList(updated);
        onChange?.(updated);
      }
      setInputValue("");
    }
  };

  /**
   * Handles removing a tag from the list.
   * @param {string} tag - The tag to be removed.
   */
  const handleRemoveTag = (tag: string) => {
    const updated = tagList.filter((t) => t !== tag);
    setTagList(updated);
    onChange?.(updated);
  };

  return (
    <div
      className={combineClassNames(styles.tagInput, styles[theme], styles[size])}
      role="group"
      aria-labelledby={`${inputId}-label`}
      data-testid={testId}
    >
      <label id={`${inputId}-label`} className="sr-only">
        Tag Input
      </label>

      <ul className={styles.tagContainer} aria-live="polite" data-testid={`${testId}-list`}>
        {tagList.map((tag, index) => (
          <li
            key={tag}
            className={styles.tag}
            role="listitem"
            data-testid={`${testId}-tag-${index}`}
          >
            <span className={styles.tagLabel}>{tag}</span>
            <IconButton
              type="button"
              aria-label={`Remove tag ${tag}`}
              className={styles.removeButton}
              onClick={() => handleRemoveTag(tag)}
              data-testid={`${testId}-remove-${index}`}
              title="remove"
              icon={FaTimes}
              size="small"
              theme="clear"
            />
          </li>
        ))}

        <li className={styles.inputWrapper}>
          <TextInput
            id={inputId}
            type="text"
            theme={theme}
            className={styles.input}
            value={inputValue}
            placeholder={tagList.length === 0 ? placeholder : ""}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddTag}
            aria-label="Add new tag"
            data-testid={`${testId}-input`}
          />
        </li>
      </ul>
    </div>
  );
};

export default TagInput;
