import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { DateTimePicker } from "../src/index.next";
import type { DateTimePickerProps } from "../src/components/DateTimePicker/DateTimePicker.types";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

const meta: Meta<DateTimePickerProps> = {
  title: "Components/DateTimePicker",
  component: DateTimePicker,
  tags: ["autodocs"],
  args: {
    label: "Select date and time",
    theme: "primary",
    size: "medium",
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
