import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import RadioButton from "@/components/RadioButton/next/RadioButton";
import type { RadioButtonProps } from "@/components/RadioButton/RadioButton.types";

const meta: Meta<RadioButtonProps> = {
  title: "Components/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  args: {
    label: "Option A",
    value: "a",
    checked: false,
    theme: "primary",
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
        onChange={(value: React.SetStateAction<string>) => setSelected(value)}
      />
    );
  },
};

export const Grouped: Story = {
  render: () => {
    const [selected, setSelected] = useState("b");

    return (
      <div style={{ display: "flex", gap: "1rem" }}>
        <RadioButton
          label="Option A"
          value="a"
          checked={selected === "a"}
          onChange={setSelected}
        />
        <RadioButton
          label="Option B"
          value="b"
          checked={selected === "b"}
          onChange={setSelected}
        />
        <RadioButton
          label="Option C"
          value="c"
          checked={selected === "c"}
          onChange={setSelected}
        />
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
    const [selected, setSelected] = useState("a");

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        <RadioButton
          label="Primary"
          value="a"
          theme="primary"
          checked={selected === "a"}
          onChange={setSelected}
        />
        <RadioButton
          label="Secondary"
          value="b"
          theme="secondary"
          checked={selected === "b"}
          onChange={setSelected}
        />
        <RadioButton
          label="Success"
          value="c"
          theme="success"
          checked={selected === "c"}
          onChange={setSelected}
        />
        <RadioButton
          label="Warning"
          value="d"
          theme="warning"
          checked={selected === "d"}
          onChange={setSelected}
        />
        <RadioButton
          label="Error"
          value="e"
          theme="error"
          checked={selected === "e"}
          onChange={setSelected}
        />
      </div>
    );
  },
};
