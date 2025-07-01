import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { FaUser } from "react-icons/fa";
import { TextInput } from "../src/index.core";
import type { TextInputProps } from "../src/components/TextInput/TextInput.types";
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

const meta: Meta<TextInputProps> = {
  title: "Components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter text...",
    theme: "primary",
    disabled: false,
    readOnly: false,
    password: false,
    autocomplete: false,
  },
};

export default meta;

type Story = StoryObj<TextInputProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const WithIcon: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextInput
        {...args}
        icon={FaUser}
        placeholder="Username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const PasswordInput: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextInput
        {...args}
        placeholder="Enter password"
        password
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const ThemedVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themeOptions.map((theme) => {
          const [value, setValue] = useState("");
          return (
            <TextInput
              key={theme}
              {...args}
              theme={theme}
              placeholder={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
          const [value, setValue] = useState("");
          return (
            <TextInput
              key={state}
              {...args}
              state={state}
              placeholder={`${state.charAt(0).toUpperCase() + state.slice(1)} state`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          );
        })}
      </div>
    );
  },
};

export const OutlineVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themeOptions.map((theme) => {
          const [value, setValue] = useState("");
          return (
            <TextInput
              key={`outline-${theme}`}
              {...args}
              outline
              theme={theme}
              placeholder={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Outline`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          );
        })}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        <TextInput
          {...args}
          disabled
          theme={"primary"}
          placeholder={`Disabled`}
          value=""
          onChange={() => {}}
        />
      </div>
    );
  },
};

export const WithAriaDescription: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextInput
        {...args}
        placeholder="Type a short bio..."
        ariaDescription="This field is used to describe yourself in 100 characters or less."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const RoundingVariants = (args) =>
  withVariants(TextInput, { ...args }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = (args) =>
  withVariants(TextInput, { ...args }, [
    { propName: "shadow", values: shadowOptions },
  ]);
