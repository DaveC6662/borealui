"use client";

import React from "react";
import { IconButton } from "@/index";
import styles from "./Stepper.module.scss";
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
interface StepperProps {
  /** An array of steps, each with a label and optional icon. */
  steps: Step[];
  /** The index of the currently active step. */
  activeStep: number;
  /** Optional callback when a step is clicked. */
  onStepClick?: (stepIndex: number) => void;
  /** Orientation of the stepper, either horizontal or vertical. */
  orientation?: OrientationType;
  /** The theme of the stepper. */
  theme?: ThemeType;
  /** The size of the stepper icons. */
  size?: SizeType;
  /** Optional test ID for testing purposes. */
  "data-testid"?: string;
}

/**
 * Stepper component displays a series of steps, each with an optional icon and label.
 * The active step is highlighted, and steps can be clicked to navigate.
 * The Stepper can be displayed either horizontally or vertically.
 * 
 * @param {StepperProps} props - The props for the Stepper component.
 * @returns {JSX.Element} The Stepper component.
 */
const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  onStepClick,
  orientation = "horizontal",
  theme = "primary",
  size = "medium",
  "data-testid": testId = "stepper",
}) => {
  return (
    <div
      className={`${styles.stepper} ${styles[orientation]} ${styles[theme]} ${styles[size]}`}
      role="list"
      data-testid={testId}
    >
      {steps.map((step, index) => {
        // Default to showing step index if no icon is provided
        const IconComponent = step.icon || (() => <span>{index + 1}</span>);
        const isActive = index === activeStep;
        const stepId = `${testId}-step-${index}`;

        return (
          <div
            key={index}
            className={`${styles.step} ${isActive ? styles.active : ""} ${
              onStepClick ? styles.clickable : ""
            }`}
            role="listitem"
            tabIndex={onStepClick ? 0 : -1}
            onClick={() => onStepClick?.(index)}
            onKeyDown={(e) => {
              // Allow keyboard interaction (Enter/Space) for clickable steps
              if ((e.key === "Enter" || e.key === " ") && onStepClick) {
                e.preventDefault();
                onStepClick(index);
              }
            }}
            data-testid={stepId}
          >
            {/* IconButton represents the step icon */}
            <IconButton
              icon={IconComponent}
              theme={theme}
              size={size}
              disabled={index > activeStep} // Disable past steps
              outline={!isActive} // Outline the active step
              ariaLabel={step.label}
              aria-current={isActive ? "step" : undefined}
              data-testid={`${stepId}-icon`}
            />
            <span className={styles.stepLabel} data-testid={`${stepId}-label`}>
              {step.label}
            </span>

            {/* Connector between steps */}
            {index < steps.length - 1 && (
              <div
                className={styles.connector}
                aria-hidden="true"
                data-testid={`${stepId}-connector`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
