import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { DateTimePicker } from "../src/index.next";
import type { DateTimePickerProps } from "../src/components/DateTimePicker/DateTimePicker.types";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";

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

const meta: Meta<DateTimePickerProps> = {
  title: "Components/DateTimePicker",
  component: DateTimePicker,
  tags: ["autodocs"],
  args: {
    label: "Select date and time",
    theme: "primary",
    size: "medium",
  },
  argTypes: {
    value: {
      description:
        "The current value of the picker (ISO string, Date object, or formatted).",
      control: "text",
      table: { category: "Main" },
    },
    onChange: {
      description: "Callback fired when the value changes.",
      action: "changed",
      table: { category: "Events" },
    },
    theme: {
      description: "Theme variant for the picker.",
      control: { type: "select" },
      options: themeOptions,
      table: { category: "Appearance" },
    },
    state: {
      description: "Visual state for the picker (success, error, warning).",
      control: { type: "select" },
      options: ["", ...stateOptions],
      table: { category: "Appearance" },
    },
    rounding: {
      description: "Corner rounding style.",
      control: { type: "select" },
      options: roundingOptions,
      table: { category: "Appearance" },
    },
    shadow: {
      description: "Box shadow style.",
      control: { type: "select" },
      options: shadowOptions,
      table: { category: "Appearance" },
    },
    size: {
      description: "Size of the input and popover (xs-xl).",
      control: { type: "select" },
      options: ["xs", "small", "medium", "large", "xl"],
      table: { category: "Appearance" },
    },
    outline: {
      description: "Display with outline style.",
      control: "boolean",
      table: { category: "Appearance" },
    },
    required: {
      description: "Whether selection is required.",
      control: "boolean",
      table: { category: "Input" },
    },
    disabled: {
      description: "Disable the input.",
      control: "boolean",
      table: { category: "Input" },
    },
    label: {
      description: "Label displayed above or beside the input.",
      control: "text",
      table: { category: "Input" },
    },
    min: {
      description: "Minimum selectable date/time (ISO string or Date).",
      control: "text",
      table: { category: "Input" },
    },
    max: {
      description: "Maximum selectable date/time (ISO string or Date).",
      control: "text",
      table: { category: "Input" },
    },
    className: {
      description: "Custom CSS class for the picker.",
      control: "text",
      table: { category: "Appearance" },
    },
    "data-testid": {
      description: "Test id for the component container.",
      control: "text",
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<DateTimePickerProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("2025-04-15T10:30");
    return <DateTimePicker {...args} value={value} onChange={setValue} />;
  },
};

export const WithMinMax: Story = {
  render: (args) => {
    const [value, setValue] = useState("2025-04-15T12:00");
    return (
      <DateTimePicker
        {...args}
        value={value}
        onChange={setValue}
        min="2025-04-15T08:00"
        max="2025-04-15T18:00"
        theme="secondary"
      />
    );
  },
};

export const OutlineVariants: Story = {
  render: (args) => {
    const [value, setValue] = useState("2025-04-15T11:00");

    return (
      <div style={{ display: "grid", gap: "1rem", padding: "1rem" }}>
        {themeOptions.map((theme) => (
          <DateTimePicker
            key={theme}
            {...args}
            theme={theme}
            outline
            value={value}
            onChange={setValue}
            label={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Outline`}
          />
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "2025-04-15T14:00",
    onChange: () => {},
  },
};

export const Required: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Submitted: ${value}`);
        }}
      >
        <DateTimePicker {...args} required value={value} onChange={setValue} />
        <button type="submit" style={{ marginTop: "1rem" }}>
          Submit
        </button>
      </form>
    );
  },
};

export const Sizes: Story = {
  render: (args) => {
    const [value, setValue] = useState("2025-04-15T09:00");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <DateTimePicker
          {...args}
          size="xs"
          value={value}
          theme="secondary"
          onChange={setValue}
          label="xs"
        />
        <DateTimePicker
          {...args}
          size="small"
          value={value}
          theme="secondary"
          onChange={setValue}
          label="Small"
        />
        <DateTimePicker
          {...args}
          size="medium"
          value={value}
          theme="secondary"
          onChange={setValue}
          label="Medium"
        />
        <DateTimePicker
          {...args}
          size="large"
          value={value}
          theme="secondary"
          onChange={setValue}
          label="Large"
        />
        <DateTimePicker
          {...args}
          size="xl"
          value={value}
          theme="secondary"
          onChange={setValue}
          label="xl"
        />
      </div>
    );
  },
};

export const ThemeVariants: Story = {
  render: (args) => {
    const [value, setValue] = useState("2025-04-15T11:00");

    return (
      <div style={{ display: "grid", gap: "1rem", padding: "1rem" }}>
        {themeOptions.map((theme) => (
          <DateTimePicker
            key={theme}
            {...args}
            theme={theme}
            value={value}
            onChange={setValue}
            label={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`}
          />
        ))}
      </div>
    );
  },
};

export const StateVariants: Story = {
  render: (args) => {
    const [value, setValue] = useState("2025-04-15T11:00");

    return (
      <div style={{ display: "grid", gap: "1rem", padding: "1rem" }}>
        {stateOptions.map((state) => (
          <DateTimePicker
            key={state}
            {...args}
            state={state}
            value={value}
            onChange={setValue}
            label={`${state.charAt(0).toUpperCase() + state.slice(1)} State`}
          />
        ))}
      </div>
    );
  },
};

export const RoundingVariants = () => (
  <StoryGrid title="Rounding Variants">
    {roundingOptions.map((rounding) => (
      <DateTimePicker key={rounding} rounding={rounding} />
    ))}
  </StoryGrid>
);

export const ShadowVariants = () => (
  <StoryGrid title="Shadow Variants">
    {shadowOptions.map((shadow) => (
      <DateTimePicker key={shadow} shadow={shadow} />
    ))}
  </StoryGrid>
);

export const WithClassName: Story = {
  args: {
    className: "storybook-datetime-custom",
    value: "2025-04-15T15:30",
    onChange: () => {},
  },
};

export const WithDataTestid: Story = {
  args: {
    "data-testid": "datetimepicker-storybook",
    value: "2025-04-15T15:30",
    onChange: () => {},
  },
};
