import { useState, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { Progressbar } from "../src/index.core";
import type { ProgressBarProps } from "../src/components/ProgressBar/ProgressBar.types";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

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
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themeOptions.map((theme) => (
          <div key={theme}>
            <label style={{ marginBottom: "0.25rem", display: "block" }}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </label>
            <Progressbar
              {...args}
              progress={20 + themeOptions.indexOf(theme) * 15}
              theme={theme}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const StateVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {stateOptions.map((theme) => (
          <div key={theme}>
            <label style={{ marginBottom: "0.25rem", display: "block" }}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </label>
            <Progressbar
              {...args}
              progress={20 + stateOptions.indexOf(theme) * 15}
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

export const RoundingVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {roundingOptions.map((rounding) => (
          <div key={rounding}>
            <label style={{ marginBottom: "0.25rem", display: "block" }}>
              {rounding.charAt(0).toUpperCase() + rounding.slice(1)}
            </label>
            <Progressbar
              {...args}
              progress={20 + stateOptions.indexOf(rounding) * 15}
              rounding={rounding}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const ShadowVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {shadowOptions.map((shadow) => (
          <div key={shadow}>
            <label style={{ marginBottom: "0.25rem", display: "block" }}>
              {shadow.charAt(0).toUpperCase() + shadow.slice(1)}
            </label>
            <Progressbar
              {...args}
              progress={20 + stateOptions.indexOf(shadow) * 15}
              shadow={shadow}
            />
          </div>
        ))}
      </div>
    );
  },
};
