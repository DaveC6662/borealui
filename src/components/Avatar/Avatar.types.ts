import { MouseEvent } from "react";
import {
  RoundingType,
  ShadowType,
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
  /**
   * Optional image URL for avatar display.
   */
  src?: string;

  /**
   * Alternative text for accessibility (used in <img> and ARIA).
   */
  alt?: string;

  /**
   * Full name used to generate initials when no image is available.
   */
  name?: string;

  /**
   * Custom label used for ARIA and title attributes.
   */
  label?: string;

  /**
   * Size of the avatar ('xs' | 'small' | 'medium' | 'large' | 'xl').
   */
  size?: SizeType;

  /**
   * Shape of the avatar border ('circle' | 'square' | 'rounded').
   */
  shape?: ShapeType;

  /**
   * Shadow of the avatar ('none' | 'light' | 'medium' | 'strong' | 'intense').
   */
  shadow?: ShadowType;

  /**
   * Visual theme of the avatar ('primary', 'secondary', 'tertiary', 'quaternary', 'clear').
   */
  theme?: ThemeType;

  /**
   * State of the avatar ('success' | 'error' | 'warning').
   */
  state?: StateType;

  /**
   * Disables interaction and styles as disabled.
   */
  disabled?: boolean;

  /**
   * Optional status indicator for user availability and activity ('online'
  | 'idle'
  | 'offline'
  | 'busy'
  | 'in-a-meeting'
  | 'on-vacation'
  | 'streaming'
  | 'recording'
  | 'typing'
  | 'speaking'
  | 'viewing'
  | 'custom' ).
   * Useful for chat apps, collaboration tools, or profile displays.
   */
  status?: StatusType;

  /**
   * Custom icon to replace the default status dot.
   */
  statusIcon?: React.ReactNode;

  /**
   * Position of the status indicator dot/icon ('topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight').
   */
  statusPosition?: StatusPositionType;

  /**
   * Custom class names for the avatar container.
   */
  className?: string;

  /**
   * Custom fallback content (overrides initials).
   */
  fallback?: React.ReactNode;

  /**
   * Custom child elements (replaces avatar content entirely).
   */
  children?: React.ReactNode;

  /**
   * Whether to apply an outline style.
   */
  outline?: boolean;

  /**
   * If provided, avatar becomes a link (internal or external).
   */
  href?: string;

  /**
   * If true, the image loads with higher priority (useful for above-the-fold).
   */
  priority?: boolean;

  /**
   * Click handler (used only when not a link).
   */
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;

  /**
   * Optional test ID for testing frameworks.
   */
  "data-testid"?: string;
}
