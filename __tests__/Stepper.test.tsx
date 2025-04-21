// __tests__/Stepper.test.tsx
import React, { JSX } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import StepperBase, {
  StepperBaseProps,
} from "@/components/Stepper/StepperBase";

const mockSteps = [
  { label: "Start", icon: () => <span>1</span> },
  { label: "Details", icon: () => <span>2</span> },
  { label: "Confirm", icon: () => <span>3</span> },
];

const styles = {
  stepper: "stepper",
  horizontal: "horizontal",
  vertical: "vertical",
  primary: "primary",
  medium: "medium",
  step: "step",
  active: "active",
  clickable: "clickable",
  stepLabel: "stepLabel",
  connector: "connector",
};

const MockIconButton: React.FC<
  JSX.IntrinsicElements["button"] & { icon: React.FC; outline?: boolean }
> = ({ icon: Icon, outline, className, ...props }) => (
  <button className={outline ? `${className} outline` : className} {...props}>
    <Icon />
  </button>
);

describe("StepperBase", () => {
  const defaultProps: StepperBaseProps = {
    steps: mockSteps,
    activeStep: 1,
    styles,
    IconButtonComponent: MockIconButton,
    "data-testid": "stepper",
  };

  it("renders all steps and highlights the active step", () => {
    render(<StepperBase {...defaultProps} />);

    expect(screen.getByTestId("stepper-step-1-icon")).toHaveAttribute(
      "aria-current",
      "step"
    );
    expect(screen.getByTestId("stepper-step-0-label")).toBeInTheDocument();
    expect(screen.getByTestId("stepper-step-1-label")).toBeInTheDocument();
    expect(screen.getByTestId("stepper-step-2-label")).toBeInTheDocument();
  });

  it("fires onStepClick on click and keydown", () => {
    const handleClick = jest.fn();

    render(
      <StepperBase
        steps={[{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }]}
        activeStep={1}
        onStepClick={handleClick}
        IconButtonComponent={({ icon: Icon, ...props }) => (
          <button {...props}>
            <Icon />
          </button>
        )}
        styles={styles}
        data-testid="stepper"
      />
    );

    const button = screen.getByTestId("stepper-step-1-icon");

    fireEvent.click(button);
    fireEvent.keyDown(button, { key: "Enter" });

    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("is accessible according to jest-axe", async () => {
    const { container } = render(<StepperBase {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
