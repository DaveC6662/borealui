import React, {
    useState,
    useRef,
    useEffect,
    KeyboardEvent,
    JSX,
  } from "react";
  import "./Dropdown.scss";
  import IconButton from "../../Buttons/IconButton/core/IconButton";
  import { combineClassNames } from "../../../utils/classNames";
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
  
    const toggleDropdown = () => setOpen((prev) => !prev);
    const closeDropdown = () => setOpen(false);
  
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        closeDropdown();
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
  
    const Icon = triggerIcon;
  
    return (
      <div
        ref={dropdownRef}
        className={combineClassNames("dropdownWrapper", className)}
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
              "dropdownMenu",
              align,
              menuClassName
            )}
            data-testid={testId ? `${testId}-menu` : undefined}
          >
            {items.map((item, index) =>
              item.href ? (
                <a
                  key={index}
                  href={item.href}
                  className={"dropdownItem"}
                  role="menuitem"
                  data-testid={item["data-testid"]}
                >
                  {item.icon && (
                    <span className={"icon"}>{item.icon}</span>
                  )}
                  {item.label}
                </a>
              ) : (
                <button
                  key={index}
                  type="button"
                  role="menuitem"
                  className={"dropdownItem"}
                  onClick={() => {
                    item.onClick?.();
                    closeDropdown();
                  }}
                  data-testid={item["data-testid"]}
                >
                  {item.icon && (
                    <span className={"icon"}>{item.icon}</span>
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
  
  export default Dropdown;
  