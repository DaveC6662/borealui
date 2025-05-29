// src/stories/ColorPicker.stories.tsx

import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import ColorPicker from "@/components/ColorPicker/next/ColorPicker";
import type { ColorPickerProps } from "@/components/ColorPicker/ColorPicker.types";

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

export const RoundShapeLarge: Story = {
  render: (args) => {
    const [selected, setSelected] = useState("#457b9d");
    return (
      <ColorPicker
        {...args}
        shape="round"
        size="large"
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};

export const SquareSmall: Story = {
  render: (args) => {
    const [selected, setSelected] = useState("#f4a261");
    return (
      <ColorPicker
        {...args}
        shape="square"
        size="small"
        selected={selected}
        onChange={setSelected}
      />
    );
  },
};

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
