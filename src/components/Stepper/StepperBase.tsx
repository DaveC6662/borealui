import React from "react";
import { StepperProps } from "./Stepper.types";
import { combineClassNames } from "@/utils/classNames";

export interface StepperBaseProps extends StepperProps {
  classMap: Record<string, string>;
  IconButtonComponent: React.FC<any>;
}

const StepperBase: React.FC<StepperBaseProps> = ({
  steps,
  activeStep,
  onStepClick,
  disableBackNavigation = false,
  orientation = "horizontal",
  theme = "primary",
  state = "",
  size = "medium",
  shadow = "none",
  rounding = "full",
  "data-testid": testId = "stepper",
  classMap,
  IconButtonComponent,
}) => {
  const stepCount = steps.length;
  const groupLabelId = `${testId}-label`;

  return (
    <div
      className={combineClassNames(
        classMap.stepper,
        classMap[orientation],
        classMap[theme],
        classMap[state],
        classMap[size]
      )}
      role="list"
      aria-labelledby={groupLabelId}
      data-testid={testId}
    >
      <span id={groupLabelId} className="sr_only">
        Progress Stepper
      </span>

      {steps.map((step, index) => {
        const Icon = step.icon || (() => <span>{index + 1}</span>);
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;
        const isBefore = index < activeStep;
        const isDisabled = disableBackNavigation && isBefore;
        const canFocus = !!onStepClick && !isDisabled;
        const stepId = `${testId}-step-${index}`;
        const label = `Step ${index + 1} of ${stepCount}: ${step.label}`;

        return (
          <div
            key={index}
            role="listitem"
            className={combineClassNames(
              classMap.step,
              isActive ? classMap.active : "",
              isCompleted ? classMap.completed : "",
              onStepClick ? classMap.clickable : ""
            )}
            data-testid={stepId}
          >
            <IconButtonComponent
              icon={Icon}
              theme={theme}
              state={state}
              className={combineClassNames(
                classMap.stepButton,
                isActive ? classMap.active : "",
                isCompleted ? classMap.completed : ""
              )}
              size={size}
              shadow={shadow}
              rounding={rounding}
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
              className={classMap.stepLabel}
              data-testid={`${stepId}-label`}
              aria-hidden="true"
            >
              {step.label}
            </span>

            {index < steps.length - 1 && (
              <div
                className={classMap.connector}
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
