import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Checkbox from "@/components/CheckBox/core/Checkbox";
import type { CheckboxProps } from "@/components/CheckBox/Checkbox.types";

const meta: Meta<CheckboxProps> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "Accept Terms",
    theme: "primary",
    labelPosition: "right",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<CheckboxProps>;

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};

export const Indeterminate: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(true);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Checkbox
          {...args}
          checked={checked}
          indeterminate={indeterminate}
          onChange={(val: boolean | ((prevState: boolean) => boolean)) => {
            setChecked(val);
            setIndeterminate(false);
          }}
          label="Partially selected"
        />
        <button onClick={() => setIndeterminate(!indeterminate)}>
          Toggle Indeterminate
        </button>
      </div>
    );
  },
};

export const LabelLeft: Story = {
  args: {
    labelPosition: "left",
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const ThemeVariants: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        <Checkbox theme="primary" checked={checked} onChange={setChecked} label="Primary" />
        <Checkbox theme="secondary" checked={checked} onChange={setChecked} label="Secondary" />
        <Checkbox theme="success" checked={checked} onChange={setChecked} label="Success" />
        <Checkbox theme="warning" checked={checked} onChange={setChecked} label="Warning" />
        <Checkbox theme="error" checked={checked} onChange={setChecked} label="Error" />
      </div>
    );
  },
};
