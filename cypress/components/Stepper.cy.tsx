import React from "react";
import StepperBase from "@/components/Stepper/StepperBase";

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

const MockIconButton: React.FC<any> = ({ icon: Icon, ...props }) => (
  <button {...props}>
    <Icon />
  </button>
);

const steps = [
  { label: "Start", icon: () => <span>1</span> },
  { label: "Middle", icon: () => <span>2</span> },
  { label: "Finish", icon: () => <span>3</span> },
];

describe("StepperBase Component", () => {
  it("renders steps and highlights active one", () => {
    cy.mount(
      <StepperBase
        steps={steps}
        activeStep={1}
        styles={styles}
        IconButtonComponent={MockIconButton}
        data-testid="stepper"
      />
    );

    cy.findByTestId("stepper").should("exist");
    cy.findByTestId("stepper-step-1-icon").should(
      "have.attr",
      "aria-current",
      "step"
    );
    cy.findByTestId("stepper-step-0-label").should("contain.text", "Start");
    cy.findByTestId("stepper-step-2-label").should("contain.text", "Finish");
  });

  it("handles click and keyboard events", () => {
    const onClick = cy.stub().as("onClick");

    cy.mount(
      <StepperBase
        steps={steps}
        activeStep={1}
        onStepClick={onClick}
        styles={styles}
        IconButtonComponent={MockIconButton}
        data-testid="stepper"
      />
    );

    cy.findByTestId("stepper-step-0-icon").click();
    cy.get("@onClick").should("have.been.calledWith", 0);

    cy.findByTestId("stepper-step-0-icon")
      .focus()
      .trigger("keydown", { key: "Enter" });
    cy.get("@onClick").should("have.been.calledWith", 0);
  });
});
