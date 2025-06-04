import { Meta, StoryObj } from "@storybook/nextjs";
import { Spinner } from "../src/index.core";
import type { SpinnerProps } from "../src/components/Spinner/Spinner.types";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

const meta: Meta<SpinnerProps> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  args: {
    size: 50,
    theme: "primary",
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
