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
  argTypes: {
    progress: {
      control: { type: "number", min: 0, max: 100, step: 1 },
      description: "Current progress value as a percentage (0–100).",
      table: { category: "Value", defaultValue: { summary: "0" } },
      type: { name: "number" },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color variant.",
      table: { category: "Appearance", defaultValue: { summary: "primary" } },
      type: { name: "string" },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "error", "warning"],
      description: "Optional state variant for emphasis.",
      table: { category: "Appearance" },
      type: { name: "string" },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "small", "medium", "large", "xl"],
      description: "Height and thickness of the progress bar.",
      table: { category: "Appearance", defaultValue: { summary: "medium" } },
      type: { name: "string" },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Border radius for the progress bar.",
      table: { category: "Appearance", defaultValue: { summary: "none" } },
      type: { name: "string" },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Box shadow for the progress bar.",
      table: { category: "Appearance", defaultValue: { summary: "none" } },
      type: { name: "string" },
    },
    animated: {
      control: "boolean",
      description: "If true, progress changes are smoothly animated.",
      table: { category: "Behavior", defaultValue: { summary: "true" } },
      type: { name: "boolean" },
    },
    indeterminate: {
      control: "boolean",
      description: "If true, shows an indeterminate loading animation.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
      type: { name: "boolean" },
    },
    ariaLabel: {
      control: "text",
      description: "Accessible label for screen readers.",
      table: {
        category: "Accessibility",
        defaultValue: { summary: "Progress" },
      },
      type: { name: "string" },
    },
    className: {
      control: "text",
      description: "Custom class name for the progress bar container.",
      table: { category: "Advanced" },
      type: { name: "string" },
    },
    "data-testid": {
      control: "text",
      description: "Test id for querying the component in tests.",
      type: { name: "string" },
      table: { category: "Testing" },
    },
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
