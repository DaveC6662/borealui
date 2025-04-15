import React, { JSX } from "react";
import { IconButton } from "@/index.next";
import styles from "./Stepper.module.scss";
import { StepperProps } from "../Stepper.types";

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
}: StepperProps): JSX.Element => {
  return (
    <div
      className={`${styles.stepper} ${styles[orientation]} ${styles[theme]} ${styles[size]}`}
      role="list"
      data-testid={testId}
    >
      {steps.map((step, index) => {
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
              if ((e.key === "Enter" || e.key === " ") && onStepClick) {
                e.preventDefault();
                onStepClick(index);
              }
            }}
            data-testid={stepId}
          >
            <IconButton
              icon={IconComponent}
              theme={theme}
              size={size}
              disabled={index > activeStep}
              outline={!isActive}
              ariaLabel={step.label}
              aria-current={isActive ? "step" : undefined}
              data-testid={`${stepId}-icon`}
            />
            <span className={styles.stepLabel} data-testid={`${stepId}-label`}>
              {step.label}
            </span>

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
