import React from "react";
import { StepperProps } from "./Stepper.types";

export interface StepperBaseProps extends StepperProps {
  styles: Record<string, string>;
  IconButtonComponent: React.FC<any>;
}

const StepperBase: React.FC<StepperBaseProps> = ({
  steps,
  activeStep,
  onStepClick,
  orientation = "horizontal",
  theme = "primary",
  size = "medium",
  "data-testid": testId = "stepper",
  styles,
  IconButtonComponent,
}) => {
  const stepCount = steps.length;
  const groupLabelId = `${testId}-label`;

  return (
    <div
      className={`${styles.stepper} ${styles[orientation]} ${styles[theme]} ${styles[size]}`}
      role="list"
      aria-labelledby={groupLabelId}
      data-testid={testId}
    >
      <span id={groupLabelId} className="sr-only">
        Progress Stepper
      </span>

      {steps.map((step, index) => {
        const Icon = step.icon || (() => <span>{index + 1}</span>);
        const isActive = index === activeStep;
        const isDisabled = index > activeStep;
        const stepId = `${testId}-step-${index}`;
        const label = `Step ${index + 1} of ${stepCount}: ${step.label}`;
        const canFocus = !!onStepClick && !isDisabled;

        return (
          <div
            key={index}
            role="listitem"
            className={`${styles.step} ${isActive ? styles.active : ""} ${
              onStepClick ? styles.clickable : ""
            }`}
            data-testid={stepId}
          >
            <IconButtonComponent
              icon={Icon}
              theme={theme}
              size={size}
              disabled={isDisabled}
              outline={!isActive}
              aria-label={label}
              aria-current={isActive ? "step" : undefined}
              aria-disabled={isDisabled}
              data-testid={`${stepId}-icon`}
              tabIndex={canFocus ? 0 : -1}
              onClick={() => onStepClick?.(index)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if ((e.key === "Enter" || e.key === " ") && !isDisabled) {
                  e.preventDefault();
                  onStepClick?.(index);
                }
              }}
            />

            <span
              className={styles.stepLabel}
              data-testid={`${stepId}-label`}
              aria-hidden="true"
            >
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

export default StepperBase;
