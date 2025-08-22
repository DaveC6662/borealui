import React, {
  useId,
  useState,
  KeyboardEvent,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { TagInputBaseProps } from "./Taginput.types";
import { CloseIcon } from "../../Icons";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const TagInputBase: React.FC<TagInputBaseProps> = ({
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
  ariaDescription = "Type a tag and press Enter or comma to add. Use arrow keys to navigate suggestions; Enter to select; Escape to close. Backspace removes the last tag when the field is empty.",
  classMap,
  IconButton,
  TextInput,
}) => {
  const uid = useId();
  const inputId = `${testId}-input-${uid}`;
  const descId = `${testId}-desc-${uid}`;
  const labelId = `${testId}-label-${uid}`;
  const listboxId = `${testId}-listbox-${uid}`;
  const statusId = `${testId}-status-${uid}`;

  const [inputValue, setInputValue] = useState("");
  const [tagList, setTagList] = useState<string[]>(tags);
  const [lastAction, setLastAction] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasTag = (val: string) =>
    tagList.some((t) => t.toLowerCase() === val.toLowerCase());

  useEffect(() => {
    if (!fetchSuggestions) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const query = inputValue.trim();
    if (!query) {
      setSuggestions([]);
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const result = await fetchSuggestions(query);
        setSuggestions(result || []);
        setOpen((result?.length ?? 0) > 0);
        setActiveIndex((result?.length ?? 0) > 0 ? 0 : -1);
      } catch {
        setSuggestions([]);
        setOpen(false);
        setActiveIndex(-1);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputValue, fetchSuggestions, debounceMs]);

  const addTag = (raw: string) => {
    const newTag = raw.trim();
    if (!newTag || hasTag(newTag)) return false;
    const updated = [...tagList, newTag];
    setTagList(updated);
    onChange?.(updated);
    setLastAction(`Added tag ${newTag}.`);
    return true;
  };

  const removeTag = (tag: string) => {
    const updated = tagList.filter((t) => t !== tag);
    setTagList(updated);
    onChange?.(updated);
    setLastAction(`Removed tag ${tag}.`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (open && suggestions.length > 0) {
      if (key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((i) => (i + 1) % suggestions.length);
        return;
      }
      if (key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex(
          (i) => (i - 1 + suggestions.length) % suggestions.length
        );
        return;
      }
      if (key === "Enter") {
        event.preventDefault();
        const choice = suggestions[activeIndex];
        if (choice && addTag(choice)) {
          setInputValue("");
        }
        setSuggestions([]);
        setOpen(false);
        setActiveIndex(-1);
        return;
      }
      if (key === "Escape") {
        event.preventDefault();
        setSuggestions([]);
        setOpen(false);
        setActiveIndex(-1);
        return;
      }
    }

    if (key === "Enter" || key === ",") {
      event.preventDefault();
      if (addTag(inputValue)) setInputValue("");
      setSuggestions([]);
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (key === "Backspace" && inputValue === "" && tagList.length > 0) {
      const last = tagList[tagList.length - 1];
      removeTag(last);
    }
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
    [classMap, shadow, rounding]
  );

  const handleSuggestionClick = (suggestion: string) => {
    if (addTag(suggestion)) setInputValue("");
    setSuggestions([]);
    setOpen(false);
    setActiveIndex(-1);
  };

  const activeOptionId =
    open && activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined;

  return (
    <div
      className={wrapperClass}
      role="group"
      aria-labelledby={labelId}
      aria-describedby={`${descId} ${statusId}`}
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

      <ul className={classMap.tagContainer} data-testid={`${testId}-list`}>
        {tagList.map((tag, index) => (
          <li
            key={`${tag}-${index}`}
            className={tagClass}
            role="listitem"
            data-testid={`${testId}-tag-${index}`}
          >
            <span className={classMap.tagLabel}>{tag}</span>
            <IconButton
              type="button"
              aria-label={`Remove tag ${tag}`}
              className={classMap.removeButton}
              onClick={() => removeTag(tag)}
              data-testid={`${testId}-remove-${index}`}
              icon={CloseIcon}
              size="small"
              theme="clear"
              shadow="none"
              iconClassName={classMap.removeButtonIcon}
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
          onKeyDown={handleKeyDown}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={activeOptionId}
          aria-label="Add new tag"
          aria-describedby={`${descId} ${statusId}`}
          data-testid={`${testId}-input`}
        />
      </div>

      {open && suggestions.length > 0 && (
        <ul
          className={classMap.suggestionList}
          role="listbox"
          id={listboxId}
          aria-label="Tag suggestions"
          data-testid={`${testId}-suggestions`}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion}-${index}`}
              id={`${listboxId}-opt-${index}`}
              className={combineClassNames(
                classMap.suggestionItem,
                index === activeIndex && (classMap.active || "")
              )}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSuggestionClick(suggestion)}
              data-testid={`${testId}-suggestion-${index}`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <div id={statusId} aria-live="polite" className="sr_only">
        {open && suggestions.length > 0
          ? `${suggestions.length} suggestion${suggestions.length === 1 ? "" : "s"} available.`
          : ""}
        {lastAction}
      </div>
    </div>
  );
};

TagInputBase.displayName = "TagInputBase";
export default TagInputBase;
