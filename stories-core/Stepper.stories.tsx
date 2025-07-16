import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { FaCheckCircle, FaClipboardList, FaFileAlt } from "react-icons/fa";
import { Stepper } from "../src/index.core";
import type { StepperProps } from "../src/components/Stepper/Stepper.types";
import { withVariants } from "../.storybook-core/helpers/withVariants";

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const steps = [
  { label: "Start", icon: FaClipboardList },
  { label: "Review", icon: FaFileAlt },
  { label: "Submit", icon: FaCheckCircle },
];

const meta: Meta<StepperProps> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  args: {
    orientation: "horizontal",
    theme: "primary",
    size: "medium",
    steps,
  },
  argTypes: {
    steps: {
      control: { type: "object" },
      description:
        "Array of step objects to display. Each step typically contains a label, optional icon, and completed state.",
      table: {
        category: "Data",
        type: { summary: "Step[]" },
        defaultValue: { summary: "[]" },
      },
    },
    activeStep: {
      control: { type: "number", min: 0 },
      description: "Index of the currently active step (0-based).",
      table: {
        category: "State",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    onStepClick: {
      action: "step-click",
      description:
        "Callback fired when a step is clicked. Receives the step index.",
      table: { category: "Events" },
    },
    disableBackNavigation: {
      control: { type: "boolean" },
      description: "Disables navigation to previous steps.",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "Layout orientation for steps.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "horizontal" },
      },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color variant.",
      table: { category: "Appearance", defaultValue: { summary: "primary" } },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "error", "warning"],
      description: "Visual state variant for the component.",
      table: { category: "Appearance" },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "small", "medium", "large", "xl"],
      description: "Size of the stepper and step buttons.",
      table: { category: "Appearance", defaultValue: { summary: "medium" } },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow intensity for the stepper container.",
      table: { category: "Appearance" },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Border radius for stepper and steps.",
      table: { category: "Appearance" },
    },
    className: {
      control: "text",
      description: "Additional CSS class names to apply to the stepper root.",
      table: { category: "Appearance" },
    },
    "data-testid": {
      control: "text",
      description: "Custom test ID for the root element.",
      table: { category: "Testing" },
    },
  },
};

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

export default meta;

type Story = StoryObj<StepperProps>;

export const Default: Story = {
  render: (args) => {
    const [activeStep, setActiveStep] = useState(0);
    return (
      <Stepper {...args} activeStep={activeStep} onStepClick={setActiveStep} />
    );
  },
};

export const Vertical: Story = {
  render: (args) => {
    const [activeStep, setActiveStep] = useState(1);
    return (
      <Stepper
        {...args}
        orientation="vertical"
        activeStep={activeStep}
        onStepClick={setActiveStep}
      />
    );
  },
};

export const ThemedVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themeOptions.map((theme) => {
          const [activeStep, setActiveStep] = useState(1);
          return (
            <Stepper
              key={theme}
              {...args}
              theme={theme}
              activeStep={activeStep}
              onStepClick={setActiveStep}
            />
          );
        })}
      </div>
    );
  },
};

export const StateVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {stateOptions.map((state) => {
          const [activeStep, setActiveStep] = useState(1);
          return (
            <Stepper
              key={state}
              {...args}
              state={state}
              activeStep={activeStep}
              onStepClick={setActiveStep}
            />
          );
        })}
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: (args) => {
    const sizes = ["xs", "small", "medium", "large", "xl"] as const;

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {sizes.map((size) => {
          const [activeStep, setActiveStep] = useState(1);
          return (
            <Stepper
              key={size}
              {...args}
              size={size}
              activeStep={activeStep}
              onStepClick={setActiveStep}
            />
          );
        })}
      </div>
    );
  },
};

export const NoBackwardsNavigation: Story = {
  args: {
    activeStep: 0,
  },

  render: (args) => {
    const [activeStep, setActiveStep] = useState(1);
    return (
      <Stepper
        {...args}
        disableBackNavigation
        activeStep={activeStep}
        onStepClick={(step) => {
          if (step > activeStep) setActiveStep(step);
        }}
      />
    );
  },
};

export const RoundingVariants = (args) =>
  withVariants(Stepper, { ...args }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = (args) =>
  withVariants(Stepper, { ...args }, [
    { propName: "shadow", values: shadowOptions },
  ]);
