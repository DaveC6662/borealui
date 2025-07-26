import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { Slider } from "../src/index.next";
import type { SliderProps } from "../src/components/Slider/Slider.types";
import { withVariants } from "../.storybook-core/helpers/withVariants";

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

const meta: Meta<SliderProps> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: {
    min: 0,
    max: 100,
    step: 1,
    theme: "primary",
    size: "medium",
    label: "Volume",
    showValue: true,
  },
  argTypes: {
    value: {
      control: "number",
      description: "The current value of the slider.",
      table: { category: "State" },
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the slider value changes.",
      table: { category: "Events" },
    },
    min: {
      control: "number",
      description: "Minimum value for the slider.",
      table: { category: "Range", defaultValue: { summary: "0" } },
    },
    max: {
      control: "number",
      description: "Maximum value for the slider.",
      table: { category: "Range", defaultValue: { summary: "100" } },
    },
    step: {
      control: "number",
      description: "Step increment for the slider value.",
      table: { category: "Range", defaultValue: { summary: "1" } },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color for the slider.",
      table: { category: "Appearance" },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "error", "warning"],
      description: "Visual state style for the slider.",
      table: { category: "Appearance" },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "small", "medium", "large", "xl"],
      description: "Size of the slider control.",
      table: { category: "Appearance" },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Border radius for the slider.",
      table: { category: "Appearance" },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Box shadow for the slider.",
      table: { category: "Appearance" },
    },
    label: {
      control: "text",
      description: "Label for the slider (for accessibility).",
      table: { category: "Accessibility" },
    },
    showValue: {
      control: "boolean",
      description: "Show the numeric value next to the slider.",
      table: { category: "Appearance" },
    },
    className: {
      control: "text",
      description: "Additional CSS class names.",
      table: { category: "Advanced" },
    },
    "aria-label": {
      control: "text",
      description: "ARIA label for screen readers.",
      table: { category: "Accessibility" },
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

type Story = StoryObj<SliderProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(50);
    return (
      <Slider
        {...args}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    );
  },
};

export const CustomRange: Story = {
  render: (args) => {
    const [value, setValue] = useState(25);
    return (
      <Slider
        {...args}
        min={10}
        max={50}
        step={5}
        value={value}
        label="Speed"
        onChange={(e) => setValue(Number(e.target.value))}
      />
    );
  },
};

export const HiddenValue: Story = {
  render: (args) => {
    const [value, setValue] = useState(40);
    return (
      <Slider
        {...args}
        value={value}
        showValue={false}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    );
  },
};

export const SizeVariants: Story = {
  render: (args) => {
    const sizes = ["xs", "small", "medium", "large", "xl"] as const;
    const [value, setValue] = useState(30);

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {sizes.map((size) => (
          <Slider
            key={size}
            {...args}
            size={size}
            label={`Size: ${size}`}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        ))}
      </div>
    );
  },
};

export const ThemeVariants: Story = {
  render: (args) => {
    const [value, setValue] = useState(75);

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themeOptions.map((theme) => (
          <Slider
            key={theme}
            {...args}
            theme={theme}
            label={`Theme: ${theme}`}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        ))}
      </div>
    );
  },
};

export const StateVariants: Story = {
  render: (args) => {
    const [value, setValue] = useState(75);

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {stateOptions.map((state) => (
          <Slider
            key={state}
            {...args}
            theme={state}
            label={`State: ${state}`}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        ))}
      </div>
    );
  },
};

export const RoundingVariants = (args) =>
  withVariants(Slider, { ...args }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = (args) =>
  withVariants(Slider, { ...args }, [
    { propName: "shadow", values: shadowOptions },
  ]);
