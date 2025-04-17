import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import DateTimePicker from "@/components/DateTimePicker/core/DateTimePicker";
import type { DateTimePickerProps } from "@/components/DateTimePicker/DateTimePicker.types";

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
    return (
      <DateTimePicker
        {...args}
        value={value}
        onChange={setValue}
      />
    );
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

export const OutlineVariant: Story = {
  render: (args) => {
    const [value, setValue] = useState("2025-04-15T16:00");
    return (
      <DateTimePicker
        {...args}
        outline
        value={value}
        onChange={setValue}
      />
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
        <DateTimePicker
          {...args}
          required
          value={value}
          onChange={setValue}
        />
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
        <DateTimePicker {...args} size="xs" value={value} theme="secondary" onChange={setValue} label="xs" />
        <DateTimePicker {...args} size="small" value={value} theme="secondary" onChange={setValue} label="Small" />
        <DateTimePicker {...args} size="medium" value={value} theme="secondary" onChange={setValue} label="Medium" />
        <DateTimePicker {...args} size="large" value={value} theme="secondary" onChange={setValue} label="Large" />
        <DateTimePicker {...args} size="xl" value={value} theme="secondary" onChange={setValue} label="xl" />
      </div>
    );
  },
};
