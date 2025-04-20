import React from "react";
import { EmptyStateProps } from "./EmptyState.types";
import { combineClassNames } from "@/utils/classNames";

export interface BaseEmptyStateProps extends EmptyStateProps {
  Button: React.ComponentType<any>;
  classNames: {
    wrapper: string;
    title: string;
    message: string;
    icon: string;
    themeMap: Record<string, string>;
    sizeMap: Record<string, string>;
    outline: string;
  };
}

const BaseEmptyState: React.FC<BaseEmptyStateProps> = ({
  icon: Icon,
  title = "Nothing Here Yet",
  message = "There’s no content to display.",
  theme = "primary",
  size = "medium",
  outline = false,
  actionLabel,
  onActionClick,
  className = "",
  "data-testid": testId,
  Button,
  classNames,
}) => {
  return (
    <section
      className={combineClassNames(
        classNames.wrapper,
        classNames.themeMap[theme],
        classNames.sizeMap[size],
        outline && classNames.outline,
        className
      )}
      role="region"
      aria-label="Empty state"
      data-testid={testId}
    >
      {Icon && (
        <div
          className={classNames.icon}
          data-testid={testId ? `${testId}-icon` : undefined}
        >
          <Icon aria-hidden="true" />
        </div>
      )}

      <h2
        className={classNames.title}
        data-testid={testId ? `${testId}-title` : undefined}
      >
        {title}
      </h2>

      <p
        className={classNames.message}
        data-testid={testId ? `${testId}-message` : undefined}
      >
        {message}
      </p>

      {actionLabel && onActionClick && (
        <Button
          theme="clear"
          outline={outline}
          onClick={onActionClick}
          data-testid={testId ? `${testId}-action` : undefined}
        >
          {actionLabel}
        </Button>
      )}
    </section>
  );
};

export default BaseEmptyState;
