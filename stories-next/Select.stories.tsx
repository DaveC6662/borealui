import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Select } from "@/index.next";
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
        onChange={setValue}
        ariaLabel="Default select"
      />
    );
  },
};

export const WithNumericOptions: Story = {
  args: {
    placeholder: "Choose a number",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
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
    const themes = [
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "clear",
    ] as const;
    const options = [
      { label: "Alpha", value: "alpha" },
      { label: "Beta", value: "beta" },
      { label: "Gamma", value: "gamma" },
    ];

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themes.map((theme) => (
          <Select
            key={theme}
            {...args}
            theme={theme}
            value={value}
            onChange={setValue}
            options={options}
            ariaLabel={`Select with ${theme} theme`}
          />
        ))}
      </div>
    );
  },
};

export const OutlineVariants: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const themes = [
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "clear",
    ] as const;
    const options = [
      { label: "Outlined A", value: "a" },
      { label: "Outlined B", value: "b" },
      { label: "Outlined C", value: "c" },
    ];

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themes.map((theme) => (
          <Select
            key={theme}
            {...args}
            theme={theme}
            outline
            value={value}
            onChange={setValue}
            options={options}
            ariaLabel={`Outlined ${theme} select`}
          />
        ))}
      </div>
    );
  },
};
