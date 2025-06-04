import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { Toggle } from "../src/index.core";
import type { ToggleProps } from "../src/components/Toggle/Toggle.types";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

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
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themeOptions.map((theme) => {
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

export const StateVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {stateOptions.map((state) => {
          const [checked, setChecked] = useState(false);
          return (
            <Toggle
              key={state}
              {...args}
              state={state}
              label={`${state.charAt(0).toUpperCase() + state.slice(1)} state`}
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
