import { useState, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Progressbar } from "@/index.core";
import type { ProgressBarProps } from "@/components/ProgressBar/ProgressBar.types";

const meta: Meta<ProgressBarProps> = {
  title: "Components/ProgressBar",
  component: Progressbar,
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
  render: (args) => {
    const sizes = ["xs", "small", "medium", "large", "xl"] as const;

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {sizes.map((size) => (
          <div key={size}>
            <label style={{ marginBottom: "0.25rem", display: "block" }}>
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </label>
            <Progressbar
              {...args}
              progress={40 + sizes.indexOf(size) * 20}
              size={size}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const ThemedVariants: Story = {
  render: (args) => {
    const themes = [
      "primary",
      "success",
      "warning",
      "error",
      "secondary",
      "clear",
    ] as const;

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themes.map((theme) => (
          <div key={theme}>
            <label style={{ marginBottom: "0.25rem", display: "block" }}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </label>
            <Progressbar
              {...args}
              progress={20 + themes.indexOf(theme) * 15}
              theme={theme}
            />
          </div>
        ))}
      </div>
    );
  },
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

    return (
      <div style={{ maxWidth: "500px" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Live Updating Progress: {progress}%
        </label>
        <Progressbar {...args} progress={progress} />
      </div>
    );
  },
};
