import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { Checkbox } from "../src/index.core";
import { withVariants } from "../.storybook-core/helpers/withVariants";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

const meta: Meta<typeof Checkbox> = {
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

type Story = StoryObj<typeof Checkbox>;

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
          label="Partially selected"
          checked={checked}
          indeterminate={indeterminate}
          onChange={(val) => {
            setChecked(val);
            setIndeterminate(false);
          }}
        />
        <button onClick={() => setIndeterminate(!indeterminate)}>
          Toggle Indeterminate
        </button>
      </div>
    );
  },
};

export const LabelLeft: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        labelPosition="left"
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const ThemeVariants = () =>
  withVariants(
    Checkbox,
    {
      label: "Themed",
      checked: true,
      onChange: () => {},
      theme: "primary",
    },
    [
      {
        propName: "theme",
        values: themeOptions,
      },
    ]
  );

export const StateVariants = () =>
  withVariants(
    Checkbox,
    {
      label: "With State",
      checked: true,
      onChange: () => {},
      theme: "primary",
      state: "success",
    },
    [
      {
        propName: "state",
        values: stateOptions,
      },
    ]
  );
