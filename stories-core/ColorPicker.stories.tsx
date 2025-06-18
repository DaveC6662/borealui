// src/stories/ColorPicker.stories.tsx

import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import { ColorPicker } from "../src/index.core";
import type { ColorPickerProps } from "../src/components/ColorPicker/ColorPicker.types";
import { StoryGrid } from "../.storybook-core/helpers/StoryGrid";
import { ShadowType, ShapeType, SizeType } from "../src/types/types";

const sizeOptions: SizeType[] = ["xs", "small", "medium", "large", "xl"];
const shapeOptions: ShapeType[] = ["circle", "rounded", "square"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

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
};

export default meta;

type Story = StoryObj<ColorPickerProps>;

const defaultArgs = {
  label: "Pick a theme color",
  name: "theme",
  shape: "circle" as ShapeType,
  colors: [
    { label: "Red", value: "#e63946" },
    { label: "Green", value: "#2a9d8f" },
    { label: "Blue", value: "#457b9d" },
    { label: "Yellow", value: "#f4a261" },
  ],
  size: "medium" as SizeType,
  selected: "#e63946",
  shadow: "none" as ShadowType,
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
      <ColorPicker key={size} {...defaultArgs} size={size as SizeType} />
    ))}
  </StoryGrid>
);

export const ShapeVariants = () => (
  <StoryGrid title="Shape Variants">
    {shapeOptions.map((shape) => (
      <ColorPicker key={shape} {...defaultArgs} shape={shape as ShapeType} />
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
