import React, {
  useId,
  useState,
  KeyboardEvent,
  useMemo,
  useEffect,
} from "react";
import { TagInputProps } from "./Taginput.types";
import { CloseIcon } from "../../Icons";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const TagInputBase: React.FC<
  TagInputProps & {
    classMap: Record<string, string>;
    IconButton: React.FC<any>;
    TextInput: React.FC<any>;
  }
> = ({
  tags = [],
  onChange,
  fetchSuggestions,
  debounceMs = 300,
  placeholder = "Add a tag...",
  theme = getDefaultTheme(),
  state = "",
  size = getDefaultSize(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
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

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    if (!fetchSuggestions || !inputValue.trim()) {
      setSuggestions([]);
      return;
    }

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(async () => {
      try {
        const result = await fetchSuggestions(inputValue);
        setSuggestions(result);
      } catch (error) {
        console.error("Failed to fetch tag suggestions:", error);
      }
    }, debounceMs);

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [inputValue, fetchSuggestions, debounceMs]);

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

  const tagClass = useMemo(
    () =>
      combineClassNames(
        classMap.tag,
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`]
      ),
    [classMap]
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
            className={tagClass}
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
      </ul>

      <div className={classMap.inputWrapper}>
        <TextInput
          id={inputId}
          type="text"
          theme={theme}
          state={state}
          rounding={rounding}
          shadow={shadow}
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
      </div>
      {suggestions.length > 0 && (
        <ul
          className={classMap.suggestionList}
          role="listbox"
          id={`${inputId}-listbox`}
          title="suggestions"
          data-testid={`${testId}-suggestions`}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={classMap.suggestionItem}
              onClick={() => {
                if (!tagList.includes(suggestion)) {
                  const updated = [...tagList, suggestion];
                  setTagList(updated);
                  onChange?.(updated);
                  setLastAction(`Added tag ${suggestion}`);
                }
                setInputValue("");
                setSuggestions([]);
              }}
              role="option"
              data-testid={`${testId}-suggestion-${index}`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <div aria-live="polite" className="sr_only">
        {lastAction}
      </div>
    </div>
  );
};

export default TagInputBase;
