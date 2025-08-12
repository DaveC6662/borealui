/**
 * Represents a named color scheme used for theming components.
 */
export interface ColorScheme {
  /** The unique name of the color scheme. */
  name: string;
  /** The primary brand or accent color. */
  primaryColor: string;
  /** The secondary brand or accent color. */
  secondaryColor: string;
  /** A tertiary accent color. */
  tertiaryColor: string;
  /** A quaternary accent or background support color. */
  quaternaryColor: string;
  /** The base background color for surfaces using this scheme. */
  backgroundColor: string;
  /** Optional override for text color to ensure contrast (e.g., force white text on dark themes). */
  forceTextColor?: string;
}

/**
 * Visual theme options used to style components.
 */
export type ThemeType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "clear";

/**
 * UI state indicators typically used for validation or status feedback.
 */
export type StateType = "success" | "error" | "warning" | "disabled" | "";

/**
 * Types of notifications that determine visual appearance or icon.
 */
export type NotificationType =
  | "general"
  | "success"
  | "error"
  | "warning"
  | "info";

/**
 * Predefined sizing scale for components.
 */
export type SizeType = "xs" | "small" | "medium" | "large" | "xl";

/**
 * Orientation of components or layout elements.
 */
export type OrientationType = "horizontal" | "vertical";

/**
 * Shadow depth for component elevation and emphasis.
 */
export type ShadowType = "none" | "light" | "medium" | "strong" | "intense";

/**
 * Border radius values used for rounding component corners.
 */
export type RoundingType = "none" | "small" | "medium" | "large" | "full";

/**
 * Anchor position typically used for tooltips, badges, or floating elements.
 */
export type PositionType =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

/**
 * Shape type used for avatars, buttons, badges, etc.
 */
export type ShapeType = "circle" | "rounded" | "square";

/**
 * Status type used to represent presence or activity.
 */
export type StatusType =
  | "online"
  | "idle"
  | "offline"
  | "busy"
  | "in-a-meeting"
  | "on-vacation"
  | "streaming"
  | "recording"
  | "typing"
  | "speaking"
  | "viewing"
  | "custom";

/**
 * Position of the status indicator relative to the parent element (e.g., avatar).
 */
export type StatusPositionType =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

/**
 * How a component should attach to the viewport or page layout.
 */
export type AttachmentType = "static" | "fixed" | "sticky";

/**
 * Props for interactive components that require user input or actions.
 */
export type InteractiveProps = {
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onKeyUp?: React.KeyboardEventHandler;
  tabIndex?: number;
  role?: string;
};
