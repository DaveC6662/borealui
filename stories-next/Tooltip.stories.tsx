import { Meta, StoryObj } from "@storybook/nextjs";
import { Tooltip, Button } from "@/index.next";
import type { TooltipProps } from "@/components/Tooltip/Tooltip.types";

const meta: Meta<TooltipProps> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    content: "Tooltip message",
    position: "top",
    theme: "primary",
  },
  argTypes: {
    content: {
      description: "The message to be displayed inside the tooltip.",
      control: { type: "text" },
    },
    position: {
      description: "Tooltip position relative to the trigger element.",
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    theme: {
      description: "Visual theme of the tooltip.",
      control: { type: "select" },
      options: ["primary", "secondary", "success", "error", "warning", "clear"],
    },
    children: {
      description: "The trigger element (e.g., a button or icon).",
      control: false,
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The `Tooltip` component displays helpful information when users hover or focus on an element. This version uses global SCSS classes for styling.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<TooltipProps>;

// Default example
export const Default: Story = {
  name: "Default Tooltip",
  args: {
    children: <Button>Hover me</Button>,
  },
};

// Position variants
export const Positions: Story = {
  name: "Tooltip Positions",
  render: (args) => (
    <div
      style={{
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(2, auto)",
        placeItems: "center",
        height: "300px",
      }}
    >
      <Tooltip {...args} position="top" content="Top tooltip">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip {...args} position="bottom" content="Bottom tooltip">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip {...args} position="left" content="Left tooltip">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip {...args} position="right" content="Right tooltip">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

// Theme variants
export const Themed: Story = {
  name: "Tooltip Themes",
  render: (args) => (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Tooltip {...args} theme="primary" content="Primary tooltip">
        <Button>Primary</Button>
      </Tooltip>
      <Tooltip {...args} theme="secondary" content="Secondary tooltip">
        <Button>Secondary</Button>
      </Tooltip>
      <Tooltip {...args} theme="success" content="Success tooltip">
        <Button>Success</Button>
      </Tooltip>
      <Tooltip {...args} theme="warning" content="Warning tooltip">
        <Button>Warning</Button>
      </Tooltip>
      <Tooltip {...args} theme="error" content="Error tooltip">
        <Button>Error</Button>
      </Tooltip>
      <Tooltip {...args} theme="clear" content="Clear tooltip">
        <Button>Clear</Button>
      </Tooltip>
    </div>
  ),
};
