import { SizeType, StateType, ThemeType } from "../../types/types";

/**
 * Props for the Accordion component.
 */
export interface AccordionProps {
  /**
   * The title text displayed in the accordion header.
   */
  title?: string;

  /**
   * Optional custom ID for the accordion content section.
   * If not provided, a unique ID will be generated.
   */
  id?: string;

  /**
   * The content to display when the accordion is expanded.
   */
  children?: React.ReactNode;

  /**
   * The theme color of the accordion (e.g., 'primary', 'secondary').
   */
  theme?: ThemeType;

  /**
   * The state of the accordion (e.g., 'success', 'error').
   */
  state?: StateType;

  /**
   * The size of the accordion (e.g., 'small', 'medium', 'large').
   */
  size?: SizeType;

  /**
   * If true, the accordion is initially expanded (uncontrolled mode).
   */
  initiallyExpanded?: boolean;

  /**
   * If true, applies an outline style to the accordion.
   */
  outline?: boolean;

  clear?: boolean;

  /**
   * If true, disables user interaction and styles the accordion as disabled.
   */
  disabled?: boolean;

  /**
   * Additional custom class names for the wrapper element.
   */
  className?: string;

  /**
   * If set, enables controlled mode. Determines whether the accordion is expanded.
   */
  expanded?: boolean;

  /**
   * Callback triggered when the accordion header is toggled (in controlled mode).
   * Receives the new `expanded` state as an argument.
   */
  onToggle?: (expanded: boolean) => void;

  /**
   * If true, the accordion can be toggled open or closed.
   * If false, the accordion is always expanded.
   */
  isToggleable?: boolean;

  /**
   * Custom icon to display when the accordion is expanded.
   * Can be a string or React node.
   */
  customExpandedIcon?: React.ReactNode;

  /** Position of accordion toggle icon */
  iconPosition?: "left" | "right";

  /**
   * Custom icon to display when the accordion is collapsed.
   * Can be a string or React node.
   */
  customCollapsedIcon?: React.ReactNode;

  /**
   * Accessible description.
   */
  description?: string;

  /**
   * If true, the accordion content will be loaded lazily.
   */
  lazyLoad?: boolean;
}
