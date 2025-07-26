import { useCallback, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { Select } from "../src/index.next";
import type { SelectProps } from "../src/components/Select/Select.types";
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
  argTypes: {
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color for the select.",
      table: { category: "Appearance", defaultValue: { summary: "primary" } },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "warning", "error"],
      description: "Visual state for feedback.",
      table: { category: "Appearance" },
    },
    outline: {
      control: "boolean",
      description: "Use outlined style.",
      table: { category: "Appearance" },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Corner rounding.",
      table: { category: "Appearance" },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Box shadow style.",
      table: { category: "Appearance" },
    },
    options: {
      control: false,
      description: "Array of selectable options.",
      table: { category: "Content" },
    },
    value: {
      control: "text",
      description: "Selected value.",
      table: { category: "Behavior" },
    },
    onChange: {
      action: "changed",
      description: "Change event handler.",
      table: { category: "Events" },
    },
    placeholder: {
      control: "text",
      description: "Placeholder when no value is selected.",
      table: { category: "Content" },
    },
    ariaLabel: {
      control: "text",
      description: "ARIA label for accessibility.",
      table: { category: "Accessibility" },
    },
    ariaDescription: {
      control: "text",
      description: "ARIA description for accessibility.",
      table: { category: "Accessibility" },
    },
    disabled: {
      control: "boolean",
      description: "Disable the select input.",
      table: { category: "Behavior" },
    },
    asyncOptions: {
      control: false,
      description: "Async function for loading options.",
      table: { category: "Advanced" },
    },
    pollInterval: {
      control: { type: "number", min: 0, step: 100 },
      description: "Interval (ms) for polling async options.",
      table: { category: "Advanced", defaultValue: { summary: "0" } },
    },
    className: {
      control: "text",
      description: "Custom class names for outer wrapper.",
      table: { category: "Advanced" },
    },
    "data-testid": {
      control: "text",
      description: "Test id for querying the component in tests.",
      type: { name: "string" },
      table: { category: "Testing" },
    },
  },
};

const defaultArgs = {
  placeholder: "Choose an option",
  theme: "primary",
  options: [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ],
  value: "a",
  onChange: () => {},
  rounding: "medium",
  shadow: "light",
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
    const options = [
      { label: "Alpha", value: "alpha" },
      { label: "Beta", value: "beta" },
      { label: "Gamma", value: "gamma" },
    ];

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themeOptions.map((theme) => (
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

export const StateVariants: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const options = [
      { label: "Alpha", value: "alpha" },
      { label: "Beta", value: "beta" },
      { label: "Gamma", value: "gamma" },
    ];

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {stateOptions.map((state) => (
          <Select
            key={state}
            {...args}
            state={state}
            value={value}
            onChange={setValue}
            options={options}
            ariaLabel={`Select with ${state} state`}
          />
        ))}
      </div>
    );
  },
};

export const OutlineVariants: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const options = [
      { label: "Outlined A", value: "a" },
      { label: "Outlined B", value: "b" },
      { label: "Outlined C", value: "c" },
    ];

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {themeOptions.map((theme) => (
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
        {stateOptions.map((theme) => (
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

export const RoundingVariants = () =>
  withVariants(Select, { ...defaultArgs }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = () =>
  withVariants(Select, { ...defaultArgs }, [
    { propName: "shadow", values: shadowOptions },
  ]);

export const WithPollingAsyncOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const counterRef = useRef(1);

    const asyncOptions = useCallback(async () => {
      const timestamp = new Date().toLocaleTimeString();
      const newOptions = Array.from({ length: 3 }, (_, i) => ({
        label: `Polled ${counterRef.current + i} (${timestamp})`,
        value: `${counterRef.current + i}`,
      }));
      counterRef.current += 1;
      return newOptions;
    }, []);

    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
        asyncOptions={asyncOptions}
        pollInterval={10000}
        placeholder="Polling from server..."
        ariaLabel="Polling select"
      />
    );
  },
};
