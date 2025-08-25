import { RoundingType, ShadowType, SizeType, ThemeType } from "@/types/types";
import React, { MouseEvent } from "react";
import { AvatarProps } from "../Avatar/Avatar.types";

/**
 * Props for the ToolbarBase component (unstyled, internal implementation).
 * Extends ToolbarProps with internal utility/customization props.
 */
export interface ToolbarBaseProps extends ToolbarProps {
  /**
   * The Avatar component to use for rendering the toolbar avatar (should accept props for avatar display).
   * Accepts a React functional component.
   */
  AvatarComponent: React.FC<AvatarProps>;

  /**
   * A mapping of BEM-style class names for the toolbar component parts.
   * Example: { root: "toolbar__root", left: "toolbar__left", ... }
   */
  classMap: Record<string, string>;

  /**
   * Optional accessible label for the entire toolbar container.
   */
  ariaLabel?: string;

  /**
   * Optional heading level for the toolbar title.
   * Determines the HTML heading tag rendered (e.g., <h1>, <h2>, ...).
   * Must be an integer from 1 to 6.
   * Valid values: 1 | 2 | 3 | 4 | 5 | 6
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Props for the `Toolbar` component.
 */
export interface ToolbarProps {
  /**
   * Optional title displayed in the center section.
   */
  title?: string;

  /**
   * Content to render in the left section of the toolbar.
   */
  left?: React.ReactNode;

  /**
   * Content to render in the center section, below the title if present.
   */
  center?: React.ReactNode;

  /**
   * Content to render in the right section of the toolbar, before the avatar.
   */
  right?: React.ReactNode;

  /**
   * Optional avatar settings displayed at the far right.
   */
  avatar?: {
    /**
     * The name or initials to display when no image is provided.
     */
    name?: string;
    /**
     * The image source URL for the avatar.
     */
    src?: string;
    /**
     * Size of the avatar.
     * "xs" | "small" | "medium" | "large" | "xl"
     */
    size?: SizeType;
    /**
     * Shape of the avatar.
     * "circle" | "square" | "rounded"
     */
    shape?: "circle" | "square" | "rounded";
    /**
     * The theme color of the avatar.
     * "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
     */
    theme?: ThemeType;
    /**
     * Whether the avatar has an outline.
     */
    outline?: boolean;
    /**
     * Optional click handler for the avatar.
     */
    onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  };

  /**
   * The visual theme of the toolbar.
   * "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;

  /**
   * Shadow of the component.
   * "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;

  /**
   * Rounding of the component.
   * "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;

  /**
   * Optional additional class names for styling.
   */
  className?: string;

  /**
   * Data test ID for testing frameworks.
   */
  "data-testid"?: string;
}
