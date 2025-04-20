import React from "react";
import { StepperProps } from "./Stepper.types";
import { IconButton } from "@/index.core";

/**
 * StepperBase handles layout and accessibility without style-specific concerns.
 */
const StepperBase: React.FC<
  StepperProps & { styles: Record<string, string> }
> = ({
  steps,
  activeStep,
  onStepClick,
  orientation = "horizontal",
  theme = "primary",
  size = "medium",
  "data-testid": testId = "stepper",
  styles,
}) => {
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

export default StepperBase;
