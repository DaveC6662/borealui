import { MouseEvent } from "react";
import {
  ShapeType,
  SizeType,
  StateType,
  StatusPositionType,
  StatusType,
  ThemeType,
} from "../../types/types";

/**
 * Props for the Avatar component.
 */
export interface AvatarProps {
  /** Optional image URL for avatar display */
  src?: string;
  /** Alternative text for accessibility (used in <img> and ARIA) */
  alt?: string;
  /** Full name used to generate initials when no image is available */
  name?: string;
  /** Custom label used for ARIA and title attributes */
  label?: string;
  /** Size of the avatar */
  size?: SizeType;
  /** Shape of the avatar border */
  shape?: ShapeType;
  /** Visual theme of the avatar (for background or border) */
  theme?: ThemeType;
  /** State of the avatar (e.g., success, error) */
  state?: StateType;
  /**
   * Optional status indicator for user availability and activity.
   * Useful for chat apps, collaboration tools, or profile displays.
   */
  status?: StatusType;
  /** Custom icon to replace the default status dot */
  statusIcon?: React.ReactNode;
  /** Position of the status indicator dot/icon */
  statusPosition?: StatusPositionType;
  /** Custom class names for the avatar container */
  className?: string;
  /** Custom fallback content (overrides initials) */
  fallback?: React.ReactNode;
  /** Custom child elements (replaces avatar content entirely) */
  children?: React.ReactNode;
  /** Whether to apply an outline style */
  outline?: boolean;
  /** If provided, avatar becomes a link (internal or external) */
  href?: string;
  /** If true, the image loads with higher priority (useful for above-the-fold) */
  priority?: boolean;
  /** Click handler (used only when not a link) */
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}
