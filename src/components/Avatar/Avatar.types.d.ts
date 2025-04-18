import { MouseEvent } from "react";
import { SizeType, ThemeType } from "@/types/types";

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
  shape?: "circle" | "rounded" | "square";
  /** Visual theme of the avatar (for background or border) */
  theme?: ThemeType;
  /** Optional status indicator: online, idle, or offline */
  status?: "online" | "idle" | "offline";
  /** Custom icon to replace the default status dot */
  statusIcon?: React.ReactNode;
  /** Position of the status indicator dot/icon */
  statusPosition?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
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