"use client";

import React, { MouseEvent } from "react";
import styles from "./Toolbar.module.scss";
import Avatar from "../Avatar/Avatar";
import { SizeType, ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Props for the `Toolbar` component.
 */
interface ToolbarProps {
  /** Optional title displayed in the center section. */
  title?: string;
  /** Content to render in the left section of the toolbar. */
  left?: React.ReactNode;
  /** Content to render in the center section, below the title if present. */
  center?: React.ReactNode;
  /** Content to render in the right section of the toolbar, before the avatar. */
  right?: React.ReactNode;
  /** Optional avatar settings displayed at the far right. */
  avatar?: {
    /** The name or initials to display when no image is provided. */
    name?: string;
    /** The image source URL for the avatar. */
    src?: string;
    /** Size of the avatar. Defaults to `"medium"`. */
    size?: SizeType;
    /** Shape of the avatar. Defaults to `"circle"`. */
    shape?: "circle" | "square" | "rounded";
    /** The theme color of the avatar. */
    theme?: ThemeType;
    /** Whether the avatar has an outline. */
    outline?: boolean;
    /** Optional click handler for the avatar. */
    onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  };
  /** The visual theme of the toolbar. Defaults to `"primary"`. */
  theme?: ThemeType;
  /** Optional additional class names for styling. */
  className?: string;
  /** Data test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * `Toolbar` is a flexible horizontal layout component commonly used at the top of pages or sections.
 * It supports left, center, and right-aligned sections, an optional title, and a customizable avatar.
 *
 * @example
 * ```tsx
 * <Toolbar
 *   title="Dashboard"
 *   left={<BackButton />}
 *   right={<NotificationIcon />}
 *   avatar={{ name: "JD", onClick: () => console.log("Profile clicked") }}
 * />
 * ```
 *
 * @param {ToolbarProps} props - Props to configure the toolbar layout.
 * @returns {JSX.Element} The rendered Toolbar component.
 */
const Toolbar: React.FC<ToolbarProps> = ({
  title,
  left,
  center,
  right,
  avatar,
  theme = "primary",
  className = "",
  "data-testid": testId = "toolbar",
}) => {
  return (
    <header
      className={combineClassNames(styles.toolbar, styles[theme], className)}
      role="banner"
      aria-label="Toolbar"
      data-testid={testId}
    >
      <div className={styles.section} data-testid={`${testId}-left`}>
        {left}
      </div>

      <div className={styles.section} data-testid={`${testId}-center`}>
        {title && (
          <h1 className={styles.title} data-testid={`${testId}-title`}>
            {title}
          </h1>
        )}
        {center}
      </div>

      <div className={styles.section} data-testid={`${testId}-right`}>
        {right}
        {avatar && (
          <div className={styles.avatarWrapper} data-testid={`${testId}-avatar`}>
            <Avatar
              name={avatar.name}
              src={avatar.src}
              size={avatar.size || "medium"}
              shape={avatar.shape || "circle"}
              theme={avatar.theme}
              outline={avatar.outline}
              {...(avatar.onClick ? { onClick: avatar.onClick } : {})}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Toolbar;
