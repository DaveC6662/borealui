import { IconType } from "react-icons";
import {
  ThemeType,
  SizeType,
  StateType,
  RoundingType,
  ShadowType,
} from "@/types/types";

/**
 * Props for the EmptyState component.
 */
export interface EmptyStateProps {
  /** Optional icon component (e.g., from react-icons). */
  icon?: IconType;

  /** Title text displayed prominently. */
  title?: string;

  /** Optional supporting message below the title. */
  message?: string;

  /**
   * Theming option for styling
   * ('primary' | 'secondary' | 'tertiary' | 'quaternary' | 'clear').
   */
  theme?: ThemeType;

  /**
   * The EmptyState state
   * ('success' | 'error' | 'warning' | 'disabled' | '').
   */
  state?: StateType;

  /**
   * Size modifier
   * ('xs' | 'small' | 'medium' | 'large' | 'xl').
   */
  size?: SizeType;

  /**
   * Controls the rounding of the component
   * ('none' | 'small' | 'medium' | 'large' | 'full').
   */
  rounding?: RoundingType;

  /**
   * Controls the shadow of the component
   * ('none' | 'light' | 'medium' | 'strong' | 'intense').
   */
  shadow?: ShadowType;

  /** Whether the component uses outline styles. */
  outline?: boolean;

  /** Optional label for an action button. */
  actionLabel?: string;

  /** Optional click handler for the action button. */
  onActionClick?: () => void;

  /** Additional class name for the container. */
  className?: string;

  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

export interface BaseEmptyStateProps extends EmptyStateProps {
  Button: React.ComponentType<any>;
  classMap: Record<string, string>;
}
