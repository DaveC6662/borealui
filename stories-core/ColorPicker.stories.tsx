// src/stories/ColorPicker.stories.tsx

import { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { ColorPicker } from "../src/index.core";
import type { ColorPickerProps } from "../src/components/ColorPicker/ColorPicker.types";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";
import { ShadowType, SizeType } from "../src/types/types";
import { ShapeType } from "../src/components/ColorPicker/ColorPicker.types";

const sizeOptions: SizeType[] = ["xs", "small", "medium", "large", "xl"];
const shapeOptions: ShapeType[] = ["square", "round", "pill"];
const shadowOptions: ShadowType[] = [
  "none",
  "light",
  "medium",
  "strong",
  "intense",
];

const meta: Meta<ColorPickerProps> = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  args: {
    label: "Pick a theme color",
    name: "theme",
    colors: [
      { label: "Red", value: "#e63946" },
      { label: "Green", value: "#2a9d8f" },
      { label: "Blue", value: "#457b9d" },
      { label: "Yellow", value: "#f4a261" },
    ],
  },
  argTypes: {
    label: {
      description: "Accessible label for the color picker.",
      control: "text",
      table: { category: "Content" },
    },
    colors: {
      description:
        "Array of color options. Each item should have `{ label, value }`.",
      control: false,
      table: { category: "Main" },
    },
    selected: {
      description: "Currently selected color value.",
      control: "text",
      table: { category: "Main" },
    },
    onChange: {
      description: "Callback fired when the color changes.",
      action: "changed",
      table: { category: "Events" },
    },
    name: {
      description: "Name attribute for form integrations.",
      control: "text",
      table: { category: "Advanced" },
    },
    disabled: {
      description: "Disable the color picker input.",
      control: "boolean",
      table: { category: "State" },
    },
    size: {
      description: "Size of the color swatches and controls.",
      control: { type: "select" },
      options: sizeOptions,
      table: { category: "Appearance" },
    },
    shape: {
      description: "Shape of the color swatches (e.g., circle, square).",
      control: { type: "select" },
      options: shapeOptions,
      table: { category: "Appearance" },
    },
    shadow: {
      description: "Visual shadow effect for the picker.",
      control: { type: "select" },
      options: shadowOptions,
      table: { category: "Appearance" },
    },
    allowCustom: {
      description: "Allow the user to enter a custom color.",
      control: "boolean",
      table: { category: "Advanced" },
    },
    className: {
      description: "Additional CSS classes for the color picker container.",
      control: "text",
      table: { category: "Appearance" },
    },
    "data-testid": {
      description: "Test ID for targeting the component in tests.",
      control: "text",
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<ColorPickerProps>;

const defaultArgs: ColorPickerProps = {
  label: "Pick a theme color",
  name: "theme",
  shape: "round",
  colors: [
    { label: "Red", value: "#e63946" },
    { label: "Green", value: "#2a9d8f" },
    { label: "Blue", value: "#457b9d" },
    { label: "Yellow", value: "#f4a261" },
  ],
  size: "medium",
  selected: "#e63946",
  shadow: "none",
  onChange: () => {},
};

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState("#2a9d8f");
    return <ColorPicker {...args} selected={selected} onChange={setSelected} />;
  },
};

export const WithCustomColorInput: Story = {
  render: (args) => {
    const [selected, setSelected] = useState("#e63946");
    return (
      <ColorPicker
        {...args}
        allowCustom
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};

export const SizeVariants = () => (
  <StoryGrid title="Size Variants">
    {sizeOptions.map((size) => (
      <ColorPicker key={size} {...defaultArgs} size={size} />
    ))}
  </StoryGrid>
);

export const ShapeVariants = () => (
  <StoryGrid title="Shape Variants">
    {shapeOptions.map((shape) => (
      <ColorPicker key={shape} {...defaultArgs} shape={shape} />
    ))}
  </StoryGrid>
);

export const ShadowVariants = () => (
  <StoryGrid title="Shadow Variants">
    {shadowOptions.map((shadow) => (
      <ColorPicker
        key={shadow}
        {...defaultArgs}
        shadow={shadow as ShadowType}
      />
    ))}
  </StoryGrid>
);

export const Disabled: Story = {
  render: (args) => {
    const [selected, setSelected] = useState("#2a9d8f");
    return (
      <ColorPicker
        {...args}
        disabled
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};

export const WithClassName: Story = {
  render: (args) => {
    const [selected, setSelected] = useState("#457b9d");
    return (
      <ColorPicker
        {...args}
        selected={selected}
        onChange={setSelected}
        className="storybook-colorpicker-custom"
      />
    );
  },
};

export const WithDataTestid: Story = {
  render: (args) => {
    const [selected, setSelected] = useState("#f4a261");
    return (
      <ColorPicker
        {...args}
        selected={selected}
        onChange={setSelected}
        data-testid="colorpicker-storybook"
      />
    );
  },
};
