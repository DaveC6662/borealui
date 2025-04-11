"use client";

import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import styles from "./Dropdown.module.scss";
import { IconButton } from "@/index";
import { ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Defines a single item in the dropdown menu.
 */
interface DropdownItem {
  /** Display text for the menu item. */
  label: string;
  /** Optional click handler (ignored if `href` is provided). */
  onClick?: () => void;
  /** Optional icon shown beside the label. */
  icon?: React.ReactNode;
  /** Optional href to make the item behave as a link. */
  href?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * Props for the Dropdown component.
 */
interface DropdownProps {
  /** Icon component used for the trigger button. */
  triggerIcon: React.ComponentType;
  /** Array of items to render in the dropdown menu. */
  items: DropdownItem[];
  /** Menu alignment relative to the trigger ("left" or "right"). */
  align?: "left" | "right";
  /** Custom class name for the dropdown wrapper. */
  className?: string;
  /** Custom class name for the dropdown menu. */
  menuClassName?: string;
  /** ARIA label for accessibility. */
  ariaLabel?: string;
  /** Optional theme for styling. */
  theme?: ThemeType;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

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
}) => {
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
