import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { RadioButton } from "../src/index.core";
import type { RadioButtonProps } from "../src/components/RadioButton/RadioButton.types";

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

const meta: Meta<RadioButtonProps> = {
  title: "Components/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  args: {
    label: "Option A",
    value: "a",
    checked: false,
    theme: "secondary",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label displayed next to the radio button.",
      table: { category: "Main", defaultValue: { summary: "Option A" } },
      type: { name: "string", required: false },
    },
    value: {
      control: "text",
      description: "The value for the radio input.",
      table: { category: "Main", defaultValue: { summary: "" } },
      type: { name: "string", required: false },
    },
    checked: {
      control: "boolean",
      description: "Whether the radio button is selected.",
      table: { category: "Main", defaultValue: { summary: "false" } },
      type: { name: "boolean", required: false },
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the checked state changes.",
      table: { category: "Events" },
      type: { name: "function" },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme variant for styling.",
      table: { category: "Appearance", defaultValue: { summary: "secondary" } },
      type: { name: "string", required: false },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Border radius for the radio button.",
      table: { category: "Appearance" },
      type: { name: "string", required: false },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow depth of the radio button.",
      table: { category: "Appearance" },
      type: { name: "string", required: false },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "error", "warning"],
      description: "Visual state style for success, error, or warning.",
      table: { category: "Appearance" },
      type: { name: "string", required: false },
    },
    disabled: {
      control: "boolean",
      description: "Disables the radio button.",
      table: { category: "Main", defaultValue: { summary: "false" } },
      type: { name: "boolean", required: false },
    },
    className: {
      control: "text",
      description: "Custom class name for the wrapper.",
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

type Story = StoryObj<RadioButtonProps>;

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState("a");

    return (
      <RadioButton
        {...args}
        checked={selected === args.value}
        onChange={setSelected}
      />
    );
  },
};

export const Grouped: Story = {
  render: () => {
    const [selected, setSelected] = useState("b");
    const options = ["a", "b", "c"];

    return (
      <div style={{ display: "flex", gap: "1rem" }}>
        {options.map((opt) => (
          <RadioButton
            key={opt}
            theme="secondary"
            label={`Option ${opt.toUpperCase()}`}
            value={opt}
            checked={selected === opt}
            onChange={setSelected}
          />
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Option",
    value: "x",
    checked: false,
    disabled: true,
  },
};

export const ThemeVariants: Story = {
  render: () => {
    const [selected, setSelected] = useState("primary");

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themeOptions.map((theme) => (
          <RadioButton
            key={theme}
            label={theme.charAt(0).toUpperCase() + theme.slice(1)}
            value={theme}
            theme={theme}
            checked={selected === theme}
            onChange={setSelected}
          />
        ))}
      </div>
    );
  },
};

export const StateVariants: Story = {
  render: () => {
    const [selected, setSelected] = useState("primary");

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {stateOptions.map((theme) => (
          <RadioButton
            key={theme}
            label={theme.charAt(0).toUpperCase() + theme.slice(1)}
            value={theme}
            theme={theme}
            checked={selected === theme}
            onChange={setSelected}
          />
        ))}
      </div>
    );
  },
};

export const RoundingVariants: Story = {
  render: () => {
    const [selected, setSelected] = useState("primary");

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {roundingOptions.map((rounding) => (
          <RadioButton
            key={rounding}
            label={rounding.charAt(0).toUpperCase() + rounding.slice(1)}
            value={rounding}
            rounding={rounding}
            checked={selected === rounding}
            onChange={setSelected}
          />
        ))}
      </div>
    );
  },
};

export const ShadowVariants: Story = {
  render: () => {
    const [selected, setSelected] = useState("primary");

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {shadowOptions.map((shadow) => (
          <RadioButton
            key={shadow}
            label={shadow.charAt(0).toUpperCase() + shadow.slice(1)}
            value={shadow}
            shadow={shadow}
            checked={selected === shadow}
            onChange={setSelected}
          />
        ))}
      </div>
    );
  },
};
