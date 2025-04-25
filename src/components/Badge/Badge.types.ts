import { IconType } from "react-icons";
import { SizeType, ThemeType } from "../../types/types";

/**
 * Props for the Badge component.
 */
export interface BadgeProps {
  /**
   * Badge content text (used when no children are provided).
   */
  text: string;

  /**
   * Optional custom content to override `text` (e.g., JSX with formatting).
   */
  children?: React.ReactNode;

  /**
   * Theme color for the badge (e.g., 'primary', 'success', 'error').
   */
  theme?: ThemeType;

  /**
   * Optional tooltip shown on hover (defaults to `text`).
   */
  title?: string;

  /**
   * Badge size (e.g., 'small', 'medium', 'large').
   */
  size?: SizeType;

  /**
   * Custom test ID for unit tests.
   */
  testId?: string;

  /**
   * Whether to use the outline style.
   */
  outline?: boolean;

  /**
   * Optional icon to render inside the badge (e.g., from `react-icons`).
   */
  icon?: IconType;

  /**
   * Additional custom class names.
   */
  className?: string;
}
