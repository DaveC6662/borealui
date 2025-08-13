import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  KeyboardEvent,
} from "react";
import ReactDOM from "react-dom";
import { combineClassNames } from "../../utils/classNames";
import type { CommandPaletteProps } from "./CommandPalette.types";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";

export interface CommandPaletteBaseProps extends CommandPaletteProps {
  classMap: Record<string, string>;
  TextInputComponent: React.ElementType;
}

const CommandPaletteBase: React.FC<CommandPaletteBaseProps> = ({
  commands,
  placeholder = "Search...",
  isOpen,
  onClose,
  asyncSearch,
  debounceMs = 300,
  theme = getDefaultTheme(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  state = "",
  classMap,
  TextInputComponent,
  "data-testid": testId = "command-palette",
  className,
}) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [asyncResults, setAsyncResults] = useState<typeof commands>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  const filtered = asyncSearch
    ? asyncResults
    : commands.filter((cmd) =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    if (filtered.length === 0) {
      setActiveIndex(-1);
    } else if (activeIndex < 0 || activeIndex >= filtered.length) {
      setActiveIndex(0);
    }
  }, [filtered, activeIndex]);

  useEffect(() => {
    if (!asyncSearch) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    const q = query.trim();
    if (!q) {
      setAsyncResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(() => {
      asyncSearch(q)
        .then((results) => {
          setAsyncResults(results);
          setIsLoading(false);
        })
        .catch(() => {
          setAsyncResults([]);
          setIsLoading(false);
        });
    }, debounceMs);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, asyncSearch, debounceMs]);

  useEffect(() => {
    if (!isOpen) return;

    setMounted(true);
    prevFocusRef.current = (document.activeElement as HTMLElement) ?? null;

    const portal =
      document.getElementById("widget-portal") ||
      (() => {
        const el = document.createElement("div");
        el.id = "widget-portal";
        document.body.appendChild(el);
        return el;
      })();

    setPortalElement(portal);
    document.body.classList.add("noScroll");

    return () => {
      document.body.classList.remove("noScroll");
      setQuery("");
      setActiveIndex(-1);
      setMounted(false);
      prevFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        if (filtered.length === 0) return;
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        if (filtered.length === 0) return;
        e.preventDefault();
        setActiveIndex(
          (prev) => (prev - 1 + filtered.length) % filtered.length
        );
      } else if (e.key === "Enter") {
        if (activeIndex >= 0 && filtered[activeIndex]) {
          filtered[activeIndex].action();
          onClose();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [filtered, activeIndex, onClose]
  );

  const handleContainerKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  if (!isOpen || !mounted || !portalElement) return null;

  const listId = `${testId}-list`;

  return ReactDOM.createPortal(
    <div
      className={classMap.overlay}
      onClick={onClose}
      data-testid={`${testId}-overlay`}
    >
      <div
        className={combineClassNames(
          classMap.command_palette,
          classMap[theme],
          classMap[state],
          shadow && classMap[`shadow${capitalize(shadow)}`],
          rounding && classMap[`round${capitalize(rounding)}`],
          className
        )}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleContainerKeyDown}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        data-testid={testId}
      >
        <TextInputComponent
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          theme={theme}
          state={state}
          shadow={"none"}
          rounding={rounding}
          className={classMap.input}
          data-testid={`${testId}-input`}
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded={filtered.length > 0}
          aria-controls={listId}
          aria-activedescendant={
            activeIndex >= 0 ? `cmd-${activeIndex}` : undefined
          }
        />

        <ul
          id={listId}
          className={classMap.list}
          role="listbox"
          aria-label="Command suggestions"
          aria-busy={isLoading || undefined}
        >
          {isLoading ? (
            <li
              className={combineClassNames(classMap.item, classMap.empty)}
              role="option"
              aria-disabled="true"
              aria-selected="false"
            >
              Searching…
            </li>
          ) : filtered.length > 0 ? (
            filtered.map((cmd, index) => (
              <li
                key={`${cmd.label}-${index}`}
                id={`cmd-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                className={combineClassNames(
                  classMap.item,
                  classMap[theme],
                  index === activeIndex && classMap.active
                )}
                onClick={() => {
                  cmd.action();
                  onClose();
                }}
              >
                {cmd.icon && (
                  <span className={classMap.icon} aria-hidden="true">
                    {cmd.icon}
                  </span>
                )}
                {cmd.label}
              </li>
            ))
          ) : (
            <li
              role="option"
              aria-selected="false"
              aria-disabled="true"
              className={combineClassNames(classMap.item, classMap.empty)}
            >
              No matching results
            </li>
          )}
        </ul>
      </div>
    </div>,
    portalElement
  );
};
CommandPaletteBase.displayName = "CommandPaletteBase";
export default CommandPaletteBase;
