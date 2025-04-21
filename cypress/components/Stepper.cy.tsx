import StepperBase from "@/components/Stepper/StepperBase";

const mockStyles = {
  stepper: "stepper",
  horizontal: "horizontal",
  primary: "primary",
  medium: "medium",
  step: "step",
  active: "active",
  clickable: "clickable",
  stepLabel: "stepLabel",
  connector: "connector",
};

const DummyIcon = () => <span>•</span>;

const steps = [
  { label: "Step One", icon: DummyIcon },
  { label: "Step Two", icon: DummyIcon },
  { label: "Step Three", icon: DummyIcon },
];

describe("StepperBase Component", () => {
  it("renders all steps and highlights the active one", () => {
    cy.mount(
      <StepperBase
        steps={steps}
        activeStep={1}
        styles={mockStyles}
        data-testid="stepper"
      />
    );

    cy.findByTestId("stepper").should("exist");
    cy.findByLabelText("Step 2 of 3: Step Two")
      .should("have.attr", "aria-current", "step")
      .and("be.visible");
  });

  it("handles click interaction", () => {
    const onStepClick = cy.stub().as("stepClick");

    cy.mount(
      <StepperBase
        steps={steps}
        activeStep={0}
        onStepClick={onStepClick}
        styles={mockStyles}
      />
    );

    cy.findByLabelText("Step 3 of 3: Step Three").click();
    cy.get("@stepClick").should("have.been.calledWith", 2);
  });

  it("supports keyboard navigation", () => {
    const onStepClick = cy.stub().as("stepClick");

    cy.mount(
      <StepperBase
        steps={steps}
        activeStep={0}
        onStepClick={onStepClick}
        styles={mockStyles}
      />
    );

    cy.findByLabelText("Step 2 of 3: Step Two")
      .focus()
      .trigger("keydown", { key: "Enter" });
    cy.get("@stepClick").should("have.been.calledWith", 1);
  });

  it("renders on mobile screen", () => {
    cy.viewport("iphone-6");
    cy.mount(<StepperBase steps={steps} activeStep={0} styles={mockStyles} />);
    cy.findByTestId("stepper").should("be.visible");
  });
});
