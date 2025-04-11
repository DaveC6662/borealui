"use client";

import React from "react";
import styles from "./EmptyState.module.scss";
import { Button } from "@/index";
import { IconType } from "react-icons";
import { ThemeType, SizeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Props for the EmptyState component.
 */
interface EmptyStateProps {
  /** Optional icon component (e.g., from react-icons). */
  icon?: IconType;
  /** Title text displayed prominently. */
  title?: string;
  /** Optional supporting message below the title. */
  message?: string;
  /** Theming option for styling (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** Size modifier (e.g., "small", "medium", "large"). */
  size?: SizeType;
  /** Whether the component uses outline styles. */
  outline?: boolean;
  /** Optional label for an action button. */
  actionLabel?: string;
  /** Optional click handler for the action button. */
  onActionClick?: () => void;
  /** Additional class name for the container. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * EmptyState provides a reusable placeholder UI for empty content areas.
 * It supports an icon, title, message, and optional action button.
 *
 * @param {EmptyStateProps} props - Props to configure the empty state component.
 * @returns {JSX.Element} A styled placeholder layout.
 */
const EmptyState: React.FC<EmptyStateProps> = ({
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
}) => {
  return (
    <section
      className={combineClassNames(
        styles.emptyState,
        styles[theme],
        styles[size],
        outline && styles.outline,
        className
      )}
      role="region"
      aria-label="Empty state"
      data-testid={testId}
    >
      {Icon && (
        <div className={styles.icon} data-testid={testId ? `${testId}-icon` : undefined}>
          <Icon aria-hidden="true" />
        </div>
      )}
      <h2 className={styles.title} data-testid={testId ? `${testId}-title` : undefined}>
        {title}
      </h2>
      <p className={styles.message} data-testid={testId ? `${testId}-message` : undefined}>
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

export default EmptyState;
