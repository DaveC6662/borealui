import { SizeType, ThemeType } from "@/types/types";
import React, { MouseEvent } from "react";

/**
 * Props for the `Toolbar` component.
 */
export interface ToolbarProps {
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