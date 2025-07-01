import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { FaCheckCircle, FaClipboardList, FaFileAlt } from "react-icons/fa";
import { Stepper } from "../src/index.next";
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
