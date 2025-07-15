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
   * Theme color for the badge
   * ('primary' | 'secondary' | 'tertiary' | 'quaternary' | 'clear').
   */
  theme?: ThemeType;

  /**
   * The badge state
   * ('success' | 'error' | 'warning' | 'disabled' | '').
   */
  state?: StateType;

  /**
   * Optional tooltip shown on hover (defaults to `text`).
   */
  title?: string;

  /**
   * Badge size
   * ('xs' | 'small' | 'medium' | 'large' | 'xl').
   */
  size?: SizeType;

  /**
   * Rounding of the badge
   * ('none' | 'small' | 'medium' | 'large' | 'full').
   */
  rounding?: RoundingType;

  /**
   * Shadow of the badge
   * ('none' | 'light' | 'medium' | 'strong' | 'intense').
   */
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

  /**
   * Click handler for the badge.
   */
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}
