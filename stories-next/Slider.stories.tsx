import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Slider from "@/components/Slider/next/Slider";
import type { SliderProps } from "@/components/Slider/Slider.types";

const meta: Meta<SliderProps> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: {
    min: 0,
    max: 100,
    step: 1,
    theme: "primary",
    size: "medium",
    label: "Volume",
    showValue: true,
  },
};

export default meta;

type Story = StoryObj<SliderProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(50);
    return (
      <Slider
        {...args}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    );
  },
};

export const CustomRange: Story = {
  render: (args) => {
    const [value, setValue] = useState(25);
    return (
      <Slider
        {...args}
        min={10}
        max={50}
        step={5}
        value={value}
        label="Speed"
        onChange={(e) => setValue(Number(e.target.value))}
      />
    );
  },
};

export const HiddenValue: Story = {
  render: (args) => {
    const [value, setValue] = useState(40);
    return (
      <Slider
        {...args}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        showValue={false}
      />
    );
  },
};

export const SizeVariants: Story = {
  render: (args) => {
    const [value, setValue] = useState(30);
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        <Slider
          {...args}
          value={value}
          size="small"
          label="Small"
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <Slider
          {...args}
          value={value}
          size="medium"
          label="Medium"
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <Slider
          {...args}
          value={value}
          size="large"
          label="Large"
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
    );
  },
};

export const ThemeVariants: Story = {
  render: (args) => {
    const [value, setValue] = useState(75);
    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        <Slider
          {...args}
          value={value}
          theme="primary"
          label="Primary"
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <Slider
          {...args}
          value={value}
          theme="secondary"
          label="Secondary"
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <Slider
          {...args}
          value={value}
          theme="success"
          label="Success"
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <Slider
          {...args}
          value={value}
          theme="warning"
          label="Warning"
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <Slider
          {...args}
          value={value}
          theme="error"
          label="Error"
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
    );
  },
};
