import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Accordion from "@/components/Accordion/core/Accordion";

// Options for controls
const themeOptions = [
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "clear",
] as const;
const sizeOptions = ["small", "medium", "large"] as const;

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: "select",
      options: themeOptions,
    },
    size: {
      control: "select",
      options: sizeOptions,
    },
    initiallyExpanded: { control: "boolean" },
    outline: { control: "boolean" },
    disabled: { control: "boolean" },
    customExpandedIcon: { control: "text" },
    customCollapsedIcon: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const defaultArgs = {
  title: "Sample Accordion",
  children: <p>This is the content revealed when expanded.</p>,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
    initiallyExpanded: false,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <Accordion
        {...args}
        expanded={open}
        onToggle={(val: boolean | ((prev: boolean) => boolean)) =>
          setOpen(typeof val === "function" ? val(open) : val)
        }
        customCollapsedIcon="⏵"
        customExpandedIcon="⏷"
      />
    );
  },
  args: {
    ...defaultArgs,
    title: "Controlled Accordion",
    children: <p>This accordion is fully controlled via external state.</p>,
  },
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    title: "Disabled Accordion",
    disabled: true,
  },
};

export const Outlined: Story = {
  args: {
    ...defaultArgs,
    title: "Outlined Accordion",
    outline: true,
  },
};
