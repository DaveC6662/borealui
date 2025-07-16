import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { Toggle } from "../src/index.core";
import type { ToggleProps } from "../src/components/Toggle/Toggle.types";
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
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the toggle is checked/on.",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the toggle is switched.",
      table: {
        category: "Events",
        type: { summary: "(checked: boolean) => void" },
      },
    },
    label: {
      control: "text",
      description: "Text label displayed next to the toggle.",
      table: { category: "Content" },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Visual theme of the toggle.",
      table: { category: "Appearance" },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "small", "medium", "large", "xl"],
      description: "Size of the toggle.",
      table: { category: "Appearance" },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Border radius of the toggle.",
      table: { category: "Appearance" },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow style for the toggle.",
      table: { category: "Appearance" },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "warning", "error"],
      description: "State color (for status or feedback).",
      table: { category: "Appearance" },
    },
    disabled: {
      control: "boolean",
      description: "If true, the toggle is disabled and cannot be changed.",
      table: { category: "State" },
    },
    className: {
      control: "text",
      description: "Custom class name for the toggle root element.",
      table: { category: "Appearance" },
    },
    "data-testid": {
      control: "text",
      description: "Test id for the toggle element.",
      table: { category: "Testing" },
    },
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

export const RoundingVariants = (args) =>
  withVariants(Toggle, { ...args }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = (args) =>
  withVariants(Toggle, { ...args }, [
    { propName: "shadow", values: shadowOptions },
  ]);
