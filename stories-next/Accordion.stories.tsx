import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Accordion from "@/components/Accordion/next/Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "clear"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    initiallyExpanded: {
      control: "boolean",
    },
    outline: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    customExpandedIcon: {
      control: "text",
    },
    customCollapsedIcon: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: "Uncontrolled Accordion",
    children: <p>This is the content revealed when expanded.</p>,
    initiallyExpanded: false,
  },
};

export const Controlled: Story = {
  render: (args: any) => {
    const [open, setOpen] = React.useState(true);
    return (
      <Accordion
        {...args}
        expanded={open}
        onToggle={(val: boolean | ((prevState: boolean) => boolean)) =>
          setOpen(val)
        }
        customCollapsedIcon="⏵"
        customExpandedIcon="⏷"
      />
    );
  },
  args: {
    title: "Controlled Accordion",
    children: <p>This accordion is fully controlled via external state.</p>,
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled Accordion",
    children: <p>This accordion is not interactive.</p>,
    disabled: true,
  },
};

export const Outlined: Story = {
  args: {
    title: "Outlined Accordion",
    children: <p>This accordion has an outline style applied.</p>,
    outline: true,
  },
};
