import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { FaCommentDots } from "react-icons/fa";
import { TextArea } from "../src/index.core";
import type { TextAreaProps } from "../src/components/TextArea/TextArea.types";
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

const meta: Meta<TextAreaProps> = {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter your message...",
    theme: "primary",
    disabled: false,
    readOnly: false,
    autoComplete: "off",
  },
  argTypes: {
    value: {
      control: "text",
      description: "The current value of the textarea (for controlled usage).",
      table: { category: "Data", type: { summary: "string" } },
    },
    defaultValue: {
      control: "text",
      description: "Default value for the textarea (for uncontrolled usage).",
      table: { category: "Data", type: { summary: "string" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when the textarea is empty.",
      table: { category: "Appearance", type: { summary: "string" } },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Visual theme for the textarea.",
      table: { category: "Appearance" },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "error", "warning"],
      description: "Validation state coloring.",
      table: { category: "Appearance" },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Border radius of the textarea.",
      table: { category: "Appearance" },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow style for the textarea container.",
      table: { category: "Appearance" },
    },
    outline: {
      control: "boolean",
      description: "If true, renders the textarea with an outlined style.",
      table: { category: "Appearance" },
    },
    icon: {
      control: false,
      description: "Optional icon component displayed inside the textarea.",
      table: { category: "Appearance", type: { summary: "React.ElementType" } },
    },
    disabled: {
      control: "boolean",
      description: "Disables the textarea.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    readOnly: {
      control: "boolean",
      description: "Renders the textarea as read-only.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    autoComplete: {
      control: "text",
      description: "Sets the browser autocomplete attribute.",
      table: { category: "Behavior", defaultValue: { summary: "off" } },
    },
    height: {
      control: "text",
      description:
        "Explicit CSS height for the textarea (e.g. '100px', '10rem').",
      table: { category: "Appearance" },
    },
    resizable: {
      control: "boolean",
      description: "If false, the textarea is not resizable.",
      table: { category: "Behavior" },
    },
    ariaLabel: {
      control: "text",
      description: "Custom ARIA label for accessibility.",
      table: { category: "Accessibility" },
    },
    ariaDescription: {
      control: "text",
      description: "ARIA description for screen readers.",
      table: { category: "Accessibility" },
    },
    onChange: {
      action: "changed",
      description: "Fired when the value changes. Receives event.",
      table: { category: "Events" },
    },
    onBlur: {
      action: "blurred",
      description: "Fired when the textarea loses focus.",
      table: { category: "Events" },
    },
    onFocus: {
      action: "focused",
      description: "Fired when the textarea receives focus.",
      table: { category: "Events" },
    },
    className: {
      control: "text",
      description: "Custom class name for the root element.",
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
type Story = StoryObj<TextAreaProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextArea
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
      <TextArea
        {...args}
        icon={FaCommentDots}
        placeholder="Leave a comment..."
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
            <TextArea
              key={theme}
              {...args}
              theme={theme}
              placeholder={`${theme} theme`}
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
            <TextArea
              key={state}
              {...args}
              state={state}
              placeholder={`${state} state`}
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
            <TextArea
              key={theme}
              {...args}
              outline
              theme={theme}
              placeholder={`${theme} outline`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          );
        })}
      </div>
    );
  },
};

export const CustomHeight: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextArea
        {...args}
        height="150px"
        placeholder="Tall textarea for longer input..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Unresizable: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextArea
        {...args}
        resizable={false}
        placeholder="Cannot be resized"
        value={value}
        rows={1}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  name: "Unresizable",
  args: {
    resizable: false,
  },
};

export const WithAriaDescription: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <TextArea
        {...args}
        placeholder="Describe your experience..."
        ariaDescription="Use this field to describe your experience with our product."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <TextArea
      {...args}
      disabled
      value="This field is disabled."
      onChange={() => {}}
    />
  ),
};

export const RoundingVariants = (args) =>
  withVariants(TextArea, { ...args }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = (args) =>
  withVariants(TextArea, { ...args }, [
    { propName: "shadow", values: shadowOptions },
  ]);
