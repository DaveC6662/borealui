import { Meta, StoryObj } from "@storybook/react";
import Tooltip from "@/components/Tooltip/core/Tooltip";
import Button from "@/components/Buttons/Button/core/Button";
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
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const Default: Story = {
  args: {
    children: <Button>Hover me</Button>,
  },
};

export const Positions: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2rem", placeItems: "center", height: "300px" }}>
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

export const Themed: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
      <Tooltip {...args} theme="primary" content="Primary">
        <Button>Primary</Button>
      </Tooltip>
      <Tooltip {...args} theme="warning" content="Warning">
        <Button>Warning</Button>
      </Tooltip>
      <Tooltip {...args} theme="success" content="Success">
        <Button>Success</Button>
      </Tooltip>
      <Tooltip {...args} theme="error" content="Error">
        <Button>Error</Button>
      </Tooltip>
    </div>
  ),
};
