"use client";

import React, { useState, useRef, useEffect, KeyboardEvent, JSX } from "react";
import styles from "./Dropdown.module.scss";
import { IconButton } from "@/index.next";
import { combineClassNames } from "@/utils/classNames";
import { DropdownProps } from "../Dropdown.types";

/**
 * A dropdown component with accessible keyboard support,
 * customizable trigger icon, theming, and optional links.
 *
 * @param {DropdownProps} props - Props to configure the dropdown.
 * @returns {JSX.Element} A triggerable dropdown menu.
 */
const Dropdown: React.FC<DropdownProps> = ({
  triggerIcon,
  items,
  align = "right",
  className = "",
  menuClassName = "",
  ariaLabel = "Dropdown menu",
  theme = "primary",
  "data-testid": testId,
}: DropdownProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = `${testId || "dropdown"}-menu`;

  /**
   * Toggles the dropdown open/closed state.
   */
  const toggleDropdown = () => setOpen((prev) => !prev);

  /**
   * Closes the dropdown menu.
   */
  const closeDropdown = () => setOpen(false);

  /**
   * Handles keyboard events for accessibility (e.g., Escape key).
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      closeDropdown();
    }
  };

  /**
   * Closes the menu if user clicks outside the dropdown container.
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const Icon = triggerIcon;

  return (
    <div
      ref={dropdownRef}
      className={combineClassNames(styles.dropdownWrapper, className)}
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
          className={combineClassNames(styles.dropdownMenu, styles[align], menuClassName)}
          data-testid={testId ? `${testId}-menu` : undefined}
        >
          {items.map((item, index) =>
            item.href ? (
              <a
                key={index}
                href={item.href}
                className={styles.dropdownItem}
                role="menuitem"
                data-testid={item["data-testid"]}
              >
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
                {item.label}
              </a>
            ) : (
              <button
                key={index}
                type="button"
                role="menuitem"
                className={styles.dropdownItem}
                onClick={() => {
                  item.onClick?.();
                  closeDropdown();
                }}
                data-testid={item["data-testid"]}
              >
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
