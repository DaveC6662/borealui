import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { Rating } from "../src/index.core";
import type { RatingProps } from "../src/components/Rating/Rating.types";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

const meta: Meta<RatingProps> = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
  args: {
    max: 5,
    theme: "primary",
    size: "medium",
  },
  argTypes: {
    value: {
      control: { type: "number" },
      description: "The current rating value (number of filled stars).",
      table: { category: "Main", defaultValue: { summary: "0" } },
      type: { name: "number", required: false },
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the user selects a new rating.",
      table: { category: "Events" },
      type: { name: "function" },
    },
    max: {
      control: { type: "number", min: 1, max: 10, step: 1 },
      description: "Total number of rating icons to display.",
      table: { category: "Main", defaultValue: { summary: "5" } },
      type: { name: "number", required: false },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "small", "medium", "large", "xl"],
      description: "Icon size for rating (e.g. small, medium, large).",
      table: { category: "Appearance", defaultValue: { summary: "medium" } },
      type: { name: "string", required: false },
    },
    interactive: {
      control: "boolean",
      description:
        "If false, disables interaction and makes the rating read-only.",
      table: { category: "Main", defaultValue: { summary: "true" } },
      type: { name: "boolean", required: false },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Color theme for the filled rating icons.",
      table: { category: "Appearance", defaultValue: { summary: "primary" } },
      type: { name: "string", required: false },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "error", "warning"],
      description:
        "Visual state indicator for rating (success, error, warning).",
      table: { category: "Appearance" },
      type: { name: "string", required: false },
    },
    label: {
      control: "text",
      description: "Label for screen readers describing the rating input.",
      table: { category: "Accessibility" },
      type: { name: "string", required: false },
    },
    className: {
      control: "text",
      description: "Custom class name for the rating wrapper.",
      table: { category: "Advanced" },
      type: { name: "string", required: false },
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

type Story = StoryObj<RatingProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(3);
    return <Rating {...args} value={value} onChange={setValue} />;
  },
};

export const NonInteractive: Story = {
  args: {
    value: 4,
    interactive: false,
  },
};

export const SizeVariants: Story = {
  render: () => {
    const sizes = ["xs", "small", "medium", "large", "xl"] as const;
    const [value, setValue] = useState(3);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {sizes.map((size) => (
          <Rating
            key={size}
            size={size}
            value={value}
            onChange={setValue}
            label={`Size: ${size}`}
          />
        ))}
      </div>
    );
  },
};

export const ThemedVariants: Story = {
  render: () => {
    const [value, setValue] = useState(3);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {themeOptions.map((theme) => (
          <Rating
            key={theme}
            theme={theme}
            value={value}
            onChange={setValue}
            label={`Theme: ${theme}`}
          />
        ))}
      </div>
    );
  },
};

export const StateVariants: Story = {
  render: () => {
    const [value, setValue] = useState(3);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {stateOptions.map((theme) => (
          <Rating
            key={theme}
            theme={theme}
            value={value}
            onChange={setValue}
            label={`Theme: ${theme}`}
          />
        ))}
      </div>
    );
  },
};

export const TenStars: Story = {
  render: () => {
    const [value, setValue] = useState(7);
    return <Rating max={10} value={value} onChange={setValue} />;
  },
};
