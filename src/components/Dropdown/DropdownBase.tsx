import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
  useId,
  JSX,
  ComponentType,
  useMemo,
} from "react";
import { BaseDropdownProps, DropdownProps } from "./Dropdown.types";
import { combineClassNames } from "../../utils/classNames";
import MenuIcon from "../../Icons/MenuIcon";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const BaseDropdown: React.FC<BaseDropdownProps> = ({
  triggerIcon,
  items,
  align = "right",
  className = "",
  menuClassName = "",
  ariaLabel = "Dropdown menu",
  theme = getDefaultTheme(),
  toggleRounding = getDefaultRounding(),
  menuRounding = getDefaultRounding(),
  toggleShadow = getDefaultShadow(),
  menuShadow = getDefaultShadow(),
  toggleOutline = false,
  state = "",
  "data-testid": testId = "dropdown",
  IconButton,
  classMap,
}: BaseDropdownProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const menuId = useId();

  const Icon = triggerIcon ?? MenuIcon;

  const toggleDropdown = () => setOpen((prev) => !prev);
  const closeDropdown = () => {
    setOpen(false);
    setActiveIndex(-1);
    triggerRef.current?.focus?.();
  };

  useEffect(() => {
    if (!open) return;
    const menuItems =
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    if (menuItems && menuItems.length > 0) {
      setActiveIndex(0);
    } else {
      setActiveIndex(-1);
    }
  }, [open]);

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const menuItems =
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    menuItems?.[activeIndex]?.focus();
  }, [activeIndex, open]);

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

    if (open && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const right = rect.right > window.innerWidth;
      const left = rect.left < 0;
      if (right) {
        menuRef.current.setAttribute("data-overflow-right", "true");
        menuRef.current.removeAttribute("data-overflow-left");
      } else if (left) {
        menuRef.current.setAttribute("data-overflow-left", "true");
        menuRef.current.removeAttribute("data-overflow-right");
      } else {
        menuRef.current.removeAttribute("data-overflow-right");
        menuRef.current.removeAttribute("data-overflow-left");
      }
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!open) return;

      const len = items.length;
      const hasItems = len > 0;

      if (e.key === "Escape") {
        e.preventDefault();
        closeDropdown();
        return;
      }
      if (e.key === "Tab") {
        closeDropdown();
        return;
      }

      if (!hasItems) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev < 0 ? 0 : (prev + 1) % len));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev < 0 ? len - 1 : (prev - 1 + len) % len));
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveIndex(len - 1);
      } else if ((e.key === "Enter" || e.key === " ") && activeIndex >= 0) {
        const item = items[activeIndex];
        if (item) {
          item.onClick?.();
          closeDropdown();
        }
      }
    },
    [open, items, activeIndex]
  );

  const menuClassNames = useMemo(
    () =>
      combineClassNames(
        classMap.menu,
        align === "right" ? classMap.alignRight : classMap.alignLeft,
        menuShadow && classMap[`shadow${capitalize(menuShadow)}`],
        menuRounding && classMap[`round${capitalize(menuRounding)}`],
        menuClassName
      ),
    [classMap, align, menuShadow, menuRounding, menuClassName]
  );

  return (
    <div
      ref={dropdownRef}
      className={combineClassNames(classMap.wrapper, className)}
      onKeyDown={handleKeyDown}
      data-testid={testId}
    >
      <IconButton
        ref={triggerRef as any}
        icon={Icon}
        ariaLabel={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        rounding={toggleRounding}
        shadow={toggleShadow}
        outline={toggleOutline}
        theme={theme}
        state={state}
        onClick={toggleDropdown}
        data-testid={`${testId}-trigger`}
      />

      {open && (
        <div
          id={menuId}
          ref={menuRef}
          role="menu"
          aria-label={ariaLabel}
          aria-orientation="vertical"
          className={menuClassNames}
          data-testid={`${testId}-menu`}
        >
          {items.map((item, index) =>
            item.href ? (
              <a
                key={index}
                href={item.href}
                className={classMap.item}
                role="menuitem"
                tabIndex={-1}
                onClick={() => {
                  item.onClick?.();
                  closeDropdown();
                }}
                data-testid={item["data-testid"]}
              >
                {item.icon && (
                  <span className={classMap.icon} aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </a>
            ) : (
              <button
                key={index}
                type="button"
                role="menuitem"
                tabIndex={-1}
                className={classMap.item}
                onClick={() => {
                  item.onClick?.();
                  closeDropdown();
                }}
                data-testid={item["data-testid"]}
              >
                {item.icon && (
                  <span className={classMap.icon} aria-hidden="true">
                    {item.icon}
                  </span>
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
BaseDropdown.displayName = "BaseDropdown";
export default BaseDropdown;
