import { Meta, StoryObj } from "@storybook/nextjs";
import { Spinner } from "../src/index.core";
import type { SpinnerProps } from "../src/components/Spinner/Spinner.types";
import { withVariants } from "../.storybook-core/helpers/withVariants";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<SpinnerProps> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  args: {
    size: 50,
    theme: "primary",
  },
  argTypes: {
    size: {
      control: { type: "number", min: 8, max: 256, step: 1 },
      description: "Diameter of the spinner in pixels.",
      table: { category: "Appearance", defaultValue: { summary: "50" } },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color for the spinner.",
      table: { category: "Appearance" },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "error", "warning"],
      description: "Visual state style for the spinner.",
      table: { category: "Appearance" },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Box shadow applied to the spinner.",
      table: { category: "Appearance" },
    },
    label: {
      control: "text",
      description:
        "Visually hidden label for accessibility (announced by screen readers).",
      table: { category: "Accessibility" },
    },
    className: {
      control: "text",
      description: "Additional CSS class names to apply.",
      table: { category: "Advanced" },
    },
    "data-testid": {
      control: "text",
      description: "Custom test ID for the root element.",
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<SpinnerProps>;

export const Default: Story = {};

export const SizeVariants: Story = {
  render: (args) => {
    const sizes = [20, 40, 60, 80];

    return (
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {sizes.map((size) => (
          <div key={size} style={{ textAlign: "center" }}>
            <Spinner {...args} size={size} label={`Size: ${size}px`} />
          </div>
        ))}
      </div>
    );
  },
};

export const ThemeVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {themeOptions.map((theme) => (
          <div key={theme} style={{ textAlign: "center" }}>
            <Spinner {...args} theme={theme} label={`Theme: ${theme}`} />
          </div>
        ))}
      </div>
    );
  },
};

export const StateVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {stateOptions.map((state) => (
          <div key={state} style={{ textAlign: "center" }}>
            <Spinner {...args} state={state} label={`state: ${state}`} />
          </div>
        ))}
      </div>
    );
  },
};

export const WithCustomLabel: Story = {
  args: {
    label: "Fetching data...",
  },
};

export const ShadowVariants = (args) =>
  withVariants(Spinner, { ...args }, [
    { propName: "shadow", values: shadowOptions },
  ]);
