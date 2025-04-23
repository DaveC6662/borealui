import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  useId,
  JSX,
  ComponentType,
} from "react";
import { DropdownProps } from "./Dropdown.types";
import { combineClassNames } from "@/utils/classNames";

export interface BaseDropdownProps extends DropdownProps {
  IconButton: ComponentType<any>;
  classNames: Record<string, string>;
}

const BaseDropdown: React.FC<BaseDropdownProps> = ({
  triggerIcon,
  items,
  align = "right",
  className = "",
  menuClassName = "",
  ariaLabel = "Dropdown menu",
  theme = "primary",
  "data-testid": testId = "dropdown",
  IconButton,
  classNames,
}: BaseDropdownProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const Icon = triggerIcon;

  const toggleDropdown = () => setOpen((prev) => !prev);
  const closeDropdown = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeDropdown();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === "Enter" || e.key === " ") {
      const item = items[activeIndex];
      if (item) {
        item.onClick?.();
        closeDropdown();
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const menuItems =
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    if (open && menuItems && activeIndex >= 0) {
      menuItems[activeIndex]?.focus();
    }
  }, [activeIndex, open]);

  return (
    <div
      ref={dropdownRef}
      className={combineClassNames(classNames.wrapper, className)}
      onKeyDown={handleKeyDown}
      data-testid={testId}
    >
      <IconButton
        icon={Icon}
        ariaLabel={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        theme={theme}
        onClick={toggleDropdown}
        data-testid={`${testId}-trigger`}
      />

      {open && (
        <div
          id={menuId}
          ref={menuRef}
          role="menu"
          aria-label={ariaLabel}
          className={combineClassNames(
            classNames.menu,
            align === "right" ? classNames.alignRight : classNames.alignLeft,
            menuClassName
          )}
          data-testid={`${testId}-menu`}
        >
          {items.map((item, index) =>
            item.href ? (
              <a
                key={index}
                href={item.href}
                className={classNames.item}
                role="menuitem"
                tabIndex={-1}
                data-testid={item["data-testid"]}
              >
                {item.icon && (
                  <span className={classNames.icon}>{item.icon}</span>
                )}
                {item.label}
              </a>
            ) : (
              <button
                key={index}
                type="button"
                role="menuitem"
                tabIndex={-1}
                className={classNames.item}
                onClick={() => {
                  item.onClick?.();
                  closeDropdown();
                }}
                data-testid={item["data-testid"]}
              >
                {item.icon && (
                  <span className={classNames.icon}>{item.icon}</span>
                )}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default BaseDropdown;
