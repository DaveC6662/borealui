import React, {
    useEffect,
    useState,
    useRef,
    KeyboardEvent,
  } from "react";
  import ReactDOM from "react-dom";
  import "./CommandPalette.scss";
  import TextInput from "../../TextInput/core/TextInput";
  import { combineClassNames } from "../../../utils/classNames";
  import { CommandPaletteProps } from "../CommandPalette.types";
  
  /**
   * CommandPalette provides a floating command dialog with keyboard navigation,
   * fuzzy filtering, and portal rendering. It's useful for global action menus.
   *
   * @param {CommandPaletteProps} props - Props for configuring the palette.
   * @returns {JSX.Element | null} A command palette rendered via portal.
   */
  const CommandPalette: React.FC<CommandPaletteProps> = ({
    commands,
    placeholder = "Search...",
    theme = "primary",
    isOpen,
    onClose,
    "data-testid": testId = "command-palette",
  }) => {
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const [mounted, setMounted] = useState(false);
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  
    /** Filter commands by query (case-insensitive match). */
    const filtered = commands.filter((cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase())
    );
  
    /** Mount the portal and manage scroll behavior. */
    useEffect(() => {
      if (!isOpen) return;
  
      setMounted(true);
  
      const existingPortal = document.getElementById("widget-portal");
      const portal =
        existingPortal ??
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
        setActiveIndex(0);
        setMounted(false);
      };
    }, [isOpen]);
  
    /** Auto-focus the input when the palette is opened. */
    useEffect(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isOpen]);
  
    /** Keyboard interactions: up/down, enter to select, escape to close. */
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter" && filtered[activeIndex]) {
        filtered[activeIndex].action();
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
  
    // Don’t render anything if not open or portal not ready
    if (!isOpen || !mounted || !portalElement) return null;
  
    return ReactDOM.createPortal(
      <div
        className={"overlay"}
        onClick={onClose}
        data-testid={`${testId}-overlay`}
      >
        <div
          className={combineClassNames("palette", theme)}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          data-testid={testId}
        >
          <TextInput
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            theme={"clear"}
            className={"input"}
            data-testid={`${testId}-input`}
            aria-activedescendant={
              filtered.length > 0 ? `cmd-${activeIndex}` : undefined
            }
            aria-controls="command-list"
            role="combobox"
            aria-expanded="true"
          />
  
          <ul
            className={"list"}
            id="command-list"
            role="listbox"
            aria-label="Command suggestions"
          >
            {filtered.length > 0 ? (
              filtered.map((cmd, index) => (
                <li
                  key={cmd.label}
                  id={`cmd-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={combineClassNames(
                   "item",
                    index === activeIndex && "active"
                  )}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                >
                  {cmd.icon && <span className={"icon"}>{cmd.icon}</span>}
                  {cmd.label}
                </li>
              ))
            ) : (
              <li
                role="option"
                aria-selected="false"
                aria-disabled="true"
                className={combineClassNames("item", "empty")}
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
  
  export default CommandPalette;
  