import React, { useMemo } from "react";
import { BadgeProps } from "./Badge.types";
import { combineClassNames } from "@/utils/classNames";

export interface BadgeBaseProps extends BadgeProps {
  classMap: Record<string, string>;
}

export const BadgeBase: React.FC<BadgeBaseProps> = ({
  text,
  children,
  theme = "primary",
  title,
  size = "medium",
  outline = false,
  testId = "badge",
  icon: Icon,
  className = "",
  classMap,
}) => {
  const combinedClassName = useMemo(
    () =>
      combineClassNames(
        classMap.badge,
        classMap[theme],
        classMap[size],
        outline && classMap.outline,
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
        <Icon className={classMap.icon} aria-hidden="true" focusable="false" />
      )}
      {children ?? text}
    </span>
  );
};
