import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Toggle from "@/components/Toggle/next/Toggle";
import type { ToggleProps } from "@/components/Toggle/Toggle.types";

const meta: Meta<ToggleProps> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: {
    checked: false,
    label: "Enable setting",
    theme: "primary",
    size: "medium",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<ToggleProps>;

const ToggleWrapper = (args: ToggleProps) => {
  const [value, setValue] = useState(args.checked ?? false);
  return <Toggle {...args} checked={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <ToggleWrapper {...args} />,
};

export const WithCustomLabel: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    label: "Dark Mode",
  },
};

export const Disabled: Story = {
  render: (args) => <ToggleWrapper {...args} />,
  args: {
    disabled: true,
    checked: true,
    label: "Notifications",
  },
};

export const Themed: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <ToggleWrapper {...args} theme="primary" label="Primary" />
      <ToggleWrapper {...args} theme="success" label="Success" />
      <ToggleWrapper {...args} theme="warning" label="Warning" />
      <ToggleWrapper {...args} theme="error" label="Error" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <ToggleWrapper {...args} size="small" label="Small" />
      <ToggleWrapper {...args} size="medium" label="Medium" />
      <ToggleWrapper {...args} size="large" label="Large" />
    </div>
  ),
};
