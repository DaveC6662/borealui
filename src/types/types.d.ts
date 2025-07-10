export interface ColorScheme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  quaternaryColor: string;
  backgroundColor: string;
}

export type ThemeType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "clear";

export type StateType = "success" | "error" | "warning" | "disabled" | "";

export type NotificationType =
  | "general"
  | "success"
  | "error"
  | "warning"
  | "info";

export type SizeType = "xs" | "small" | "medium" | "large" | "xl";
export type OrientationType = "horizontal" | "vertical";

export type ShadowType = "none" | "light" | "medium" | "strong" | "intense";
export type RoundingType = "none" | "small" | "medium" | "large" | "full";

export type PositionType =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

export type ShapeType = "circle" | "rounded" | "square";
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
export type StatusPositionType =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";
