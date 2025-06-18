import { IconType } from "react-icons";
import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "../../types/types";
import { MouseEvent } from "react";

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
   * Theme color for the badge (e.g., 'primary', 'secondary').
   */
  theme?: ThemeType;

  /**
   * The badge state (e.g., 'success', 'error', 'warning').
   */
  state?: StateType;

  /**
   * Optional tooltip shown on hover (defaults to `text`).
   */
  title?: string;

  /**
   * Badge size (e.g., 'small', 'medium', 'large').
   */
  size?: SizeType;

  /** Rounding of the badge */
  rounding?: RoundingType;

  /** Shadow of the badge */
  shadow?: ShadowType;

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

  /**
   * If true, disables user interaction and styles as disabled.
   */
  disabled?: boolean;

  /** Click handler*/
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}
