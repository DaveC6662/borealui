import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { FaCheckCircle, FaClipboardList, FaFileAlt } from "react-icons/fa";
import Stepper from "@/components/Stepper/core/Stepper";
import type { StepperProps } from "@/components/Stepper/Stepper.types";

const meta: Meta<StepperProps> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  args: {
    orientation: "horizontal",
    theme: "primary",
    size: "medium",
    steps: [
      { label: "Start", icon: FaClipboardList },
      { label: "Review", icon: FaFileAlt },
      { label: "Submit", icon: FaCheckCircle },
    ],
  },
};

export default meta;

type Story = StoryObj<StepperProps>;

export const Default: Story = {
  render: (args) => {
    const [activeStep, setActiveStep] = useState(0);
    return (
      <Stepper
        {...args}
        activeStep={activeStep}
        onStepClick={(step) => setActiveStep(step)}
      />
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
        onStepClick={(step) => setActiveStep(step)}
      />
    );
  },
};

export const ThemedVariants: Story = {
  render: (args) => {
    const [activeStep, setActiveStep] = useState(1);
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        <Stepper {...args} theme="primary" activeStep={activeStep} onStepClick={setActiveStep} />
        <Stepper {...args} theme="success" activeStep={activeStep} onStepClick={setActiveStep} />
        <Stepper {...args} theme="warning" activeStep={activeStep} onStepClick={setActiveStep} />
        <Stepper {...args} theme="error" activeStep={activeStep} onStepClick={setActiveStep} />
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: (args) => {
    const [activeStep, setActiveStep] = useState(1);
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        <Stepper {...args} size="small" activeStep={activeStep} onStepClick={setActiveStep} />
        <Stepper {...args} size="medium" activeStep={activeStep} onStepClick={setActiveStep} />
        <Stepper {...args} size="large" activeStep={activeStep} onStepClick={setActiveStep} />
      </div>
    );
  },
};
