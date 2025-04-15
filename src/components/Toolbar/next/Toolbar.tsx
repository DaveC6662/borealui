"use client";

import React, { JSX } from "react";
import styles from "./Toolbar.module.scss";
import Avatar from "../Avatar/Avatar";
import { combineClassNames } from "@/utils/classNames";
import { ToolbarProps } from "../Toolbar.types";

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
}: ToolbarProps): JSX.Element => {
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
