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
export interface Tab {
  /** The label of the tab. */
  label: string;
  /** An optional icon for the tab. */
  icon?: React.ComponentType;
  /** Whether the tab is disabled. */
  disabled?: boolean;
}

/**
 * Props for the Tabs component.
 */
export interface TabsProps {
  /** Array of tabs to display. */
  tabs: Tab[];
  /** Controlled value */
  value?: number;
  /** Custom class names to apply to the tabs container. */
  className?: string;
  /** Uncontrolled initial index */
  defaultIndex?: number;
  /** Accessible name for the tablist */
  ariaLabel?: string;
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
  /**
   * Optional stable base used to create ids:
   * `${idBase}-tab-${i}` and `${idBase}-panel-${i}`
   */
  idBase?: string;
  /** Test ID for testing purposes. */
  "data-testid"?: string;
}

export type BaseTabsProps = TabsProps & {
  /* Orientation of the tabs. */
  orientation?: "horizontal" | "vertical";
  /* Activation mode of the tabs. */
  activationMode?: "auto" | "manual";
  /* Class names for the tab container. */
  classMap: Record<string, string>;
};
