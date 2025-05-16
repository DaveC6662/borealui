import { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@/index.next";
import type { SpinnerProps } from "@/components/Spinner/Spinner.types";

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
    const themes = [
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "clear",
    ] as const;

    return (
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {themes.map((theme) => (
          <div key={theme} style={{ textAlign: "center" }}>
            <Spinner {...args} theme={theme} label={`Theme: ${theme}`} />
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
