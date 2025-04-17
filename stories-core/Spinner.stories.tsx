import { Meta, StoryObj } from "@storybook/react";
import Spinner from "@/components/Spinner/core/Spinner";
import type { SpinnerProps } from "@/components/Spinner/Spinner.types";

const meta: Meta<SpinnerProps> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  args: {
    size: 50,
    theme: "primary",
    label: "Loading",
  },
};

export default meta;

type Story = StoryObj<SpinnerProps>;

export const Default: Story = {};

export const SizeVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Spinner {...args} size={20} />
      <Spinner {...args} size={40} />
      <Spinner {...args} size={60} />
      <Spinner {...args} size={80} />
    </div>
  ),
};

export const ThemeVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <Spinner {...args} theme="primary" />
      <Spinner {...args} theme="secondary" />
      <Spinner {...args} theme="success" />
      <Spinner {...args} theme="warning" />
      <Spinner {...args} theme="error" />
    </div>
  ),
};

export const WithCustomLabel: Story = {
  args: {
    label: "Fetching data...",
  },
};
