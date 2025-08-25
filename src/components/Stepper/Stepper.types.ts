import {
  OrientationType,
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";
import { IconButtonProps } from "../IconButton/IconButton.types";

/**
 * Represents a step in the Stepper.
 */
interface Step {
  /** The label for the step. */
  label: string;
  /** An optional icon component for the step. */
  icon?: React.ComponentType;
}

/**
 * Props for the Stepper component.
 */
export interface StepperProps {
  /** An array of steps, each with a label and optional icon. */
  steps: Step[];
  /** The index of the currently active step. */
  activeStep: number;
  /** Optional callback when a step is clicked. */
  onStepClick?: (stepIndex: number) => void;
  /** If true, disables backward navigation (users cannot go to previous steps). */
  disableBackNavigation?: boolean;
  /**
   * Orientation of the stepper.
   * "horizontal" | "vertical"
   */
  orientation?: OrientationType;
  /**
   * Theme style for the stepper.
   * "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;
  /**
   * State of the stepper.
   * "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;
  /**
   * Shadow style for the stepper buttons.
   * "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;
  /**
   * Rounding of the stepper buttons.
   * "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;
  /**
   * Size of the stepper icons.
   * "xs" | "small" | "medium" | "large" | "xl"
   */
  size?: SizeType;
  /** Optional test ID for testing purposes. */
  "data-testid"?: string;
  /**
   * Additional class names for styling customization.
   */
  className?: string;
}

export interface StepperBaseProps extends StepperProps {
  classMap: Record<string, string>;
  IconButtonComponent: React.FC<IconButtonProps>;
}
