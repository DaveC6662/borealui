import React, { useId, useState, KeyboardEvent, useMemo } from "react";
import { TagInputProps } from "./Taginput.types";
import { CloseIcon } from "@/Icons";
import { combineClassNames } from "@/utils/classNames";

const TagInputBase: React.FC<
  TagInputProps & {
    classMap: Record<string, string>;
    IconButton: React.FC<any>;
    TextInput: React.FC<any>;
  }
> = ({
  tags = [],
  onChange,
  placeholder = "Add a tag...",
  theme = "primary",
  state = "",
  size = "medium",
  "data-testid": testId = "tag-input",
  ariaDescription = "Type a tag and press Enter or comma to add. Existing tags can be removed using the remove button next to each tag.",
  classMap,
  IconButton,
  TextInput,
}) => {
  const inputId = useId();
  const descId = `${inputId}-desc`;
  const labelId = `${inputId}-label`;

  const [inputValue, setInputValue] = useState("");
  const [tagList, setTagList] = useState<string[]>(tags);
  const [lastAction, setLastAction] = useState<string>("");

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
        setLastAction(`Added tag ${newTag}`);
      }
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    const updated = tagList.filter((t) => t !== tag);
    setTagList(updated);
    onChange?.(updated);
    setLastAction(`Removed tag ${tag}`);
  };

  const wrapperClass = useMemo(
    () =>
      combineClassNames(
        classMap.tagInput,
        classMap[theme],
        classMap[state],
        classMap[size]
      ),
    [classMap, theme, state, size]
  );

  return (
    <div
      className={wrapperClass}
      role="group"
      aria-labelledby={labelId}
      aria-describedby={descId}
      data-testid={testId}
    >
      <label id={labelId} className="sr_only">
        Tag Input
      </label>
      <div
        id={descId}
        className="sr_only"
        data-testid={`${testId}-description`}
      >
        {ariaDescription}
      </div>

      <ul
        className={classMap.tagContainer}
        aria-live="polite"
        aria-relevant="additions removals"
        data-testid={`${testId}-list`}
      >
        {tagList.map((tag, index) => (
          <li
            key={tag}
            className={classMap.tag}
            role="listitem"
            data-testid={`${testId}-tag-${index}`}
          >
            <span className={classMap.tagLabel}>{tag}</span>
            <IconButton
              type="button"
              aria-label={`Remove tag ${tag}`}
              className={classMap.removeButton}
              onClick={() => handleRemoveTag(tag)}
              data-testid={`${testId}-remove-${index}`}
              icon={CloseIcon}
              size="small"
              theme="clear"
            />
          </li>
        ))}

        <li className={classMap.inputWrapper}>
          <TextInput
            id={inputId}
            type="text"
            theme={theme}
            state={state}
            className={classMap.input}
            value={inputValue}
            placeholder={tagList.length === 0 ? placeholder : ""}
            onChange={(e: { target: { value: string } }) =>
              setInputValue(e.target.value)
            }
            onKeyDown={handleAddTag}
            aria-label="Add new tag"
            aria-describedby={descId}
            data-testid={`${testId}-input`}
          />
        </li>
      </ul>

      <div aria-live="polite" className="sr_only">
        {lastAction}
      </div>
    </div>
  );
};

export default TagInputBase;
