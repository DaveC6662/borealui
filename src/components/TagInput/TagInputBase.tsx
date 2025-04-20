import React, { useId, useState, KeyboardEvent } from "react";
import { TagInputProps } from "./Taginput.types";

/**
 * Base TagInput component with shared logic and structure.
 */
const TagInputBase: React.FC<
  TagInputProps & {
    styles: Record<string, string>;
    IconButton: React.FC<any>;
    TextInput: React.FC<any>;
    combineClassNames: (...classes: any[]) => string;
  }
> = ({
  tags = [],
  onChange,
  placeholder = "Add a tag...",
  theme = "primary",
  size = "medium",
  "data-testid": testId = "tag-input",
  styles,
  IconButton,
  TextInput,
  combineClassNames,
}) => {
  const inputId = useId();
  const [inputValue, setInputValue] = useState("");
  const [tagList, setTagList] = useState<string[]>(tags);

  const handleAddTag = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      (event.key === "Enter" || event.key === ",") &&
      inputValue.trim() !== ""
    ) {
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

  const handleRemoveTag = (tag: string) => {
    const updated = tagList.filter((t) => t !== tag);
    setTagList(updated);
    onChange?.(updated);
  };

  return (
    <div
      className={combineClassNames(
        styles.tagInput,
        styles[theme],
        styles[size]
      )}
      role="group"
      aria-labelledby={`${inputId}-label`}
      data-testid={testId}
    >
      <label id={`${inputId}-label`} className="sr-only">
        Tag Input
      </label>

      <ul
        className={styles.tagContainer}
        aria-live="polite"
        data-testid={`${testId}-list`}
      >
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
              icon="FaTimes"
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
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setInputValue(e.target.value)}
            onKeyDown={handleAddTag}
            aria-label="Add new tag"
            data-testid={`${testId}-input`}
          />
        </li>
      </ul>
    </div>
  );
};

export default TagInputBase;
