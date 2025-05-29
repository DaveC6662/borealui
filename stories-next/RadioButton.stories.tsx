import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { RadioButton } from "@/index.next";
import type { RadioButtonProps } from "@/components/RadioButton/RadioButton.types";

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
        {themes.map((theme) => (
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
