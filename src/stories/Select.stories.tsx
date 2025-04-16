import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Select from "@/components/Select/core/Select";
import type { SelectProps } from "@/components/Select/Select.types";

const meta: Meta<SelectProps> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    placeholder: "Choose an option",
    theme: "primary",
    options: [
      { label: "Option A", value: "a" },
      { label: "Option B", value: "b" },
      { label: "Option C", value: "c" },
    ],
  },
};

export default meta;

type Story = StoryObj<SelectProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <Select
        {...args}
        value={value}
        onChange={(v: React.SetStateAction<string>) => setValue(v)}
        ariaLabel="Default select"
      />
    );
  },
};

export const WithNumericOptions: Story = {
  args: {
    placeholder: "Choose a number",
    options: [
      { label: "One", value: `1` },
      { label: "Two", value: `2` },
      { label: "Three", value: `3` },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState<string>("");

    return (
      <Select
        {...args}
        value={value}
        onChange={(v: React.SetStateAction<string>) => setValue(v)}
        ariaLabel="Numeric select"
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "",
  },
};

export const ThemeVariants: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    const options = [
      { label: "Alpha", value: "alpha" },
      { label: "Beta", value: "beta" },
      { label: "Gamma", value: "gamma" },
    ];

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        <Select {...args} theme="primary" options={options} value={value} onChange={setValue} />
        <Select {...args} theme="secondary" options={options} value={value} onChange={setValue} />
        <Select {...args} theme="warning" options={options} value={value} onChange={setValue} />
        <Select {...args} theme="error" options={options} value={value} onChange={setValue} />
      </div>
    );
  },
};
