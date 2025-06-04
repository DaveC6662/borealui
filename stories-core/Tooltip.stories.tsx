import { Meta, StoryObj } from "@storybook/nextjs";
import { Tooltip, Button } from "../src/index.core";
import type { TooltipProps } from "../src/components/Tooltip/Tooltip.types";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

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

export const Default: Story = {
  name: "Default Tooltip",
  args: {
    children: <Button>Hover me</Button>,
  },
};

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

export const Themed: Story = {
  name: "Tooltip Themes",
  render: (args) => (
    <div style={{ display: "grid", gap: "5rem" }}>
      {themeOptions.map((theme) => (
        <Tooltip
          key={theme}
          {...args}
          theme={theme}
          title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`}
        >
          <Button>{theme.charAt(0).toUpperCase() + theme.slice(1)}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const States: Story = {
  name: "Tooltip State",
  render: (args) => (
    <div style={{ display: "grid", gap: "5rem" }}>
      {stateOptions.map((state) => (
        <Tooltip
          key={state}
          {...args}
          state={state}
          title={`${state.charAt(0).toUpperCase() + state.slice(1)} state`}
        >
          <Button>{state.charAt(0).toUpperCase() + state.slice(1)}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
