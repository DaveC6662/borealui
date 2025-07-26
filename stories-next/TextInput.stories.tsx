import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { FaUser } from "react-icons/fa";
import { TextInput } from "../src/index.next";
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
  argTypes: {
    value: {
      control: "text",
      description: "The current value of the input (for controlled usage).",
      table: { category: "Data", type: { summary: "string" } },
    },
    defaultValue: {
      control: "text",
      description: "Default value of the input (for uncontrolled usage).",
      table: { category: "Data", type: { summary: "string" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when input is empty.",
      table: { category: "Appearance", type: { summary: "string" } },
    },
    password: {
      control: "boolean",
      description: "If true, renders an input of type 'password' with toggle.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    readOnly: {
      control: "boolean",
      description: "If true, the input is read-only.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "If true, the input is disabled.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    autocomplete: {
      control: "boolean",
      description: "Enables browser autocomplete if true.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    outline: {
      control: "boolean",
      description: "Renders an outlined input variant.",
      table: { category: "Appearance" },
    },
    icon: {
      control: false,
      description: "Optional icon component rendered in the input.",
      table: { category: "Appearance", type: { summary: "React.ElementType" } },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme for input appearance.",
      table: { category: "Appearance" },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Border radius for the input.",
      table: { category: "Appearance" },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Box shadow style for the input.",
      table: { category: "Appearance" },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "error", "warning"],
      description: "Validation state appearance.",
      table: { category: "Appearance" },
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility.",
      table: { category: "Accessibility" },
    },
    ariaDescription: {
      control: "text",
      description: "ARIA description for screen readers.",
      table: { category: "Accessibility" },
    },
    onChange: {
      action: "changed",
      description: "Called when the input value changes. Receives event.",
      table: { category: "Events" },
    },
    onBlur: {
      action: "blurred",
      description: "Called when the input loses focus.",
      table: { category: "Events" },
    },
    onFocus: {
      action: "focused",
      description: "Called when the input receives focus.",
      table: { category: "Events" },
    },
    className: {
      control: "text",
      description: "Custom class name for the input.",
      table: { category: "Advanced" },
    },
    "data-testid": {
      control: "text",
      description: "Test ID for the root element (testing utilities).",
      table: { category: "Testing" },
    },
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
