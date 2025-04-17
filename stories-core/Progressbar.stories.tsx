import { useState, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";
import ProgressBar from "@/components/ProgressBar/core/ProgressBar";
import type { ProgressBarProps } from "@/components/ProgressBar/ProgressBar.types";

const meta: Meta<ProgressBarProps> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  args: {
    theme: "primary",
    size: "medium",
    animated: true,
  },
};

export default meta;

type Story = StoryObj<ProgressBarProps>;

export const Default: Story = {
  args: {
    progress: 65,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const StaticBar: Story = {
  args: {
    progress: 45,
    animated: false,
  },
};

export const SizeVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <ProgressBar {...args} progress={30} size="small" />
      <ProgressBar {...args} progress={50} size="medium" />
      <ProgressBar {...args} progress={75} size="large" />
    </div>
  ),
};

export const ThemedVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <ProgressBar {...args} progress={25} theme="primary" />
      <ProgressBar {...args} progress={50} theme="success" />
      <ProgressBar {...args} progress={75} theme="warning" />
      <ProgressBar {...args} progress={90} theme="error" />
    </div>
  ),
};

export const LiveProgress: Story = {
  render: (args) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
      }, 300);
      return () => clearInterval(interval);
    }, []);

    return <ProgressBar {...args} progress={progress} />;
  },
};
