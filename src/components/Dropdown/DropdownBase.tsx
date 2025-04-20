import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
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
  "data-testid": testId,
  IconButton,
  classNames,
}: BaseDropdownProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = `${testId || "dropdown"}-menu`;
  const Icon = triggerIcon;

  const toggleDropdown = () => setOpen((prev) => !prev);
  const closeDropdown = () => setOpen(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") closeDropdown();
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
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        theme={theme}
        onClick={toggleDropdown}
        data-testid={testId ? `${testId}-trigger` : undefined}
      />

      {open && (
        <div
          id={menuId}
          role="menu"
          className={combineClassNames(
            classNames.menu,
            align === "right" ? classNames.alignRight : classNames.alignLeft,
            menuClassName
          )}
          data-testid={testId ? `${testId}-menu` : undefined}
        >
          {items.map((item, index) =>
            item.href ? (
              <a
                key={index}
                href={item.href}
                className={classNames.item}
                role="menuitem"
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
