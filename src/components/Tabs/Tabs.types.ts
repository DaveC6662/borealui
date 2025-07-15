import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";

/**
 * Represents a single tab with a label, optional icon, and content.
 */
interface Tab {
  /** The label of the tab. */
  label: string;
  /** An optional icon for the tab. */
  icon?: React.ComponentType;
  /** The content to display when the tab is active. */
  content: React.ReactNode;
}

/**
 * Props for the Tabs component.
 */
export interface TabsProps {
  /** Array of tabs to display. */
  tabs: Tab[];
  /** Custom class names to apply to the tabs container. */
  className?: string;
  /** The default active tab index. */
  defaultIndex?: number;
  /** Callback when the active tab changes. */
  onChange?: (index: number) => void;
  /**
   * Theme for styling the tabs.
   * "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;
  /**
   * State of the tabs.
   * "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;
  /**
   * Rounding of the tabs.
   * "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;
  /**
   * Shadow style of the tabs.
   * "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;
  /**
   * Size of the tabs.
   * "xs" | "small" | "medium" | "large" | "xl"
   */
  size?: SizeType;
  /** Test ID for testing purposes. */
  "data-testid"?: string;
}
