import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "@/index.core";
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
      <div style={{ display: "grid", gap: "1rem" }}>
        {themes.map((theme) => {
          const [checked, setChecked] = useState(false);
          return (
            <Toggle
              key={theme}
              {...args}
              theme={theme}
              label={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`}
              checked={checked}
              onChange={setChecked}
            />
          );
        })}
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: (args) => {
    const sizes = ["xs", "small", "medium", "large", "xl"] as const;
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {sizes.map((size) => {
          const [checked, setChecked] = useState(false);
          return (
            <Toggle
              key={size}
              {...args}
              size={size}
              label={`${size.charAt(0).toUpperCase() + size.slice(1)} Size`}
              checked={checked}
              onChange={setChecked}
            />
          );
        })}
      </div>
    );
  },
};
