import React, { useMemo } from "react";
import "./Badge.scss";
import { combineClassNames } from "@/utils/classNames";
import { BadgeProps } from "../Badge.types";

/**
 * A reusable Badge component with support for theming, icons,
 * outlines, accessibility, and flexible content.
 *
 * @example
 * ```tsx
 * <Badge text="Active" theme="success" icon={FaCheck} />
 * ```
 */
const Badge: React.FC<BadgeProps> = ({
  text,
  children,
  theme = "primary",
  title,
  size = "medium",
  outline = false,
  testId = "badge",
  icon: Icon,
  className = "",
}) => {
  const combinedClassName = useMemo(
    () =>
      combineClassNames(
        "badge",
        theme,
        size,
        outline && "outline",
        className
      ),
    [theme, size, outline, className]
  );

  if (!text && !children) return null;

  return (
    <span
      className={combinedClassName}
      aria-label={text}
      title={title || text}
      data-testid={testId}
      role="note"
    >
      {Icon && (
        <Icon
          className={"icon"}
          aria-hidden="true"
          focusable="false"
        />
      )}
      {children ?? text}
    </span>
  );
};

export default Badge;
