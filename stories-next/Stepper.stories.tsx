import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { FaCheckCircle, FaClipboardList, FaFileAlt } from "react-icons/fa";
import { Stepper } from "@/index.next";
import type { StepperProps } from "@/components/Stepper/Stepper.types";

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
    const themes = [
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "clear",
    ] as const;

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themes.map((theme) => {
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
