import React, { JSX } from "react";
import { combineClassNames } from "../../utils/classNames";
import { ToolbarProps } from "./Toolbar.types";

/**
 * Base layout component for a customizable toolbar with optional title, sections, and avatar.
 * Designed for accessibility and theme-aware styling.
 *
 * @component
 * @template ToolbarProps
 *
 * @param {string} [title] - Optional title shown in the center section.
 * @param {React.ReactNode} [left] - Left-aligned content (e.g. back button).
 * @param {React.ReactNode} [center] - Additional content below or beside the title.
 * @param {React.ReactNode} [right] - Right-aligned content (e.g. icons).
 * @param {Object} [avatar] - Avatar configuration.
 * @param {string} avatar.name - Name or initials used as fallback or accessible label.
 * @param {string} avatar.src - Image source URL.
 * @param {"small"|"medium"|"large"} [avatar.size="medium"] - Avatar size.
 * @param {"circle"|"square"|"rounded"} [avatar.shape="circle"] - Avatar shape.
 * @param {string} [avatar.theme] - Visual theme for the avatar.
 * @param {boolean} [avatar.outline] - Whether to render an outline around the avatar.
 * @param {Function} [avatar.onClick] - Optional avatar click handler (wrapped in button for accessibility).
 * @param {"primary"|"secondary"|...} [theme="primary"] - Visual theme for the toolbar.
 * @param {string} [className] - Optional custom class name(s).
 * @param {string} [ariaLabel="Toolbar"] - Accessible ARIA label for the toolbar region.
 * @param {number} [headingLevel=1] - Optional heading level for the title (1–6).
 * @param {React.FC<any>} AvatarComponent - The avatar component injected from framework-specific layer.
 * @param {Record<string, string>} styles - A CSS class map injected by the wrapper component.
 * @param {string} ["data-testid"] - Test identifier.
 *
 * @returns {JSX.Element} The rendered, accessible toolbar.
 */
export const ToolbarBase: React.FC<
  ToolbarProps & {
    AvatarComponent: React.FC<any>;
    styles: Record<string, string>;
    ariaLabel?: string;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  }
> = ({
  title,
  left,
  center,
  right,
  avatar,
  theme = "primary",
  className = "",
  "data-testid": testId = "toolbar",
  AvatarComponent,
  styles,
  ariaLabel = "Toolbar",
  headingLevel = 1,
}): JSX.Element => {
  const TitleTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  return (
    <header
      className={combineClassNames(styles.toolbar, styles[theme], className)}
      role="banner"
      aria-label={ariaLabel}
      data-testid={testId}
    >
      <div
        className={styles.section}
        role="navigation"
        aria-label="Toolbar left section"
        data-testid={`${testId}-left`}
      >
        {left}
      </div>

      <div
        className={styles.section}
        role="navigation"
        aria-label="Toolbar center section"
        data-testid={`${testId}-center`}
      >
        {title && (
          <TitleTag className={styles.title} data-testid={`${testId}-title`}>
            {title}
          </TitleTag>
        )}
        {center}
      </div>

      <div
        className={styles.section}
        role="navigation"
        aria-label="Toolbar right section"
        data-testid={`${testId}-right`}
      >
        {right}
        {avatar && (
          <div
            className={styles.avatarWrapper}
            data-testid={`${testId}-avatar`}
          >
            <AvatarComponent
              name={avatar.name}
              src={avatar.src}
              size={avatar.size || "medium"}
              shape={avatar.shape || "circle"}
              theme={avatar.theme}
              outline={avatar.outline}
              onClick={avatar.onClick}
              aria-hidden={!avatar.name}
            />
          </div>
        )}
      </div>
    </header>
  );
};
