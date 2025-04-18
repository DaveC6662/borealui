import { Meta, StoryObj } from "@storybook/react";
import Popover from "@/components/PopOver/next/PopOver";
import type { PopoverProps } from "@/components/PopOver/PopOver.types";
import Button from "@/components/Buttons/Button/next/Button";

const meta: Meta<PopoverProps> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  args: {
    placement: "bottom",
    theme: "primary",
  },
};

export default meta;

type Story = StoryObj<PopoverProps>;

export const Default: Story = {
  args: {
    trigger: <Button size="small">Toggle Popover</Button>,
    content: (
      <div style={{ padding: "1rem", maxWidth: "200px" }}>
        This is some helpful info shown in a popover.
      </div>
    ),
  },
};

export const ThemedVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Popover
        trigger={<Button theme="primary">Primary</Button>}
        content={<div style={{ padding: "0.5rem" }}>Primary theme</div>}
        theme="primary"
      />
      <Popover
        trigger={<Button theme="secondary">Secondary</Button>}
        content={<div style={{ padding: "0.5rem" }}>Secondary theme</div>}
        theme="secondary"
      />
      <Popover
        trigger={<Button theme="warning">Warning</Button>}
        content={<div style={{ padding: "0.5rem" }}>Warning theme</div>}
        theme="warning"
      />
      <Popover
        trigger={<Button theme="error">Error</Button>}
        content={<div style={{ padding: "0.5rem" }}>Error theme</div>}
        theme="error"
      />
    </div>
  ),
};

export const PlacementVariants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(2, auto)",
      }}
    >
      <Popover
        trigger={<Button>Top</Button>}
        content={<div style={{ padding: "0.5rem" }}>Top popover</div>}
        placement="top"
      />
      <Popover
        trigger={<Button>Right</Button>}
        content={<div style={{ padding: "0.5rem" }}>Right popover</div>}
        placement="right"
      />
      <Popover
        trigger={<Button>Bottom</Button>}
        content={<div style={{ padding: "0.5rem" }}>Bottom popover</div>}
        placement="bottom"
      />
      <Popover
        trigger={<Button>Left</Button>}
        content={<div style={{ padding: "0.5rem" }}>Left popover</div>}
        placement="left"
      />
    </div>
  ),
};

export const KeyboardAccessible: Story = {
  args: {
    trigger: (
      <div
        style={{
          padding: "0.5rem 1rem",
          border: "1px solid gray",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Press Enter to toggle
      </div>
    ),
    content: (
      <div style={{ padding: "0.5rem" }}>
        This opens on Enter and closes on Escape.
      </div>
    ),
  },
};
