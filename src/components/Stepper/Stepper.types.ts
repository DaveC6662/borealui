import { OrientationType, SizeType, ThemeType } from "@/types/types";

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
  /** disable backwards navigation. */
  disableBackNavigation?: boolean;
  /** Orientation of the stepper, either horizontal or vertical. */
  orientation?: OrientationType;
  /** The theme of the stepper. */
  theme?: ThemeType;
  /** The size of the stepper icons. */
  size?: SizeType;
  /** Optional test ID for testing purposes. */
  "data-testid"?: string;
}
