import { Meta, StoryObj } from "@storybook/nextjs";
import { Divider } from "../src/index.next";
import type { DividerProps } from "../src/components/Divider/Divider.types";

const meta: Meta<DividerProps> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  args: {
    orientation: "horizontal",
    length: "100%",
    thickness: "1px",
    dashed: false,
    theme: "primary",
  },
  argTypes: {
    orientation: {
      description: "Orientation of the divider: horizontal or vertical.",
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      table: { category: "Appearance" },
    },
    theme: {
      description: "Color theme of the divider.",
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "tertiary",
        "quaternary",
        "clear",
        "success",
        "error",
        "warning",
      ],
      table: { category: "Appearance" },
    },
    state: {
      description: "Visual state style (success, error, warning).",
      control: { type: "select" },
      options: ["", "success", "error", "warning"],
      table: { category: "Appearance" },
    },
    length: {
      description: "Length of the divider (CSS value: px, %, rem, etc.).",
      control: "text",
      table: { category: "Appearance" },
    },
    thickness: {
      description: "Thickness of the divider line (CSS value: px, em, etc.).",
      control: "text",
      table: { category: "Appearance" },
    },
    dashed: {
      description: "Display a dashed line instead of solid.",
      control: "boolean",
      table: { category: "Appearance" },
    },
    as: {
      description:
        "Render as a specific HTML element (e.g., 'hr', 'div', 'span').",
      control: "text",
      table: { category: "Advanced" },
    },
    className: {
      description: "Custom CSS class for the divider.",
      control: "text",
      table: { category: "Appearance" },
    },
    "data-testid": {
      description: "Test id for the divider element.",
      control: "text",
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<DividerProps>;

export const Horizontal: Story = {
  render: (args) => (
    <div style={{ padding: "1rem" }}>
      <p>Above</p>
      <Divider {...args} />
      <p>Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        height: "100px",
      }}
    >
      <span>Left</span>
      <Divider {...args} orientation="vertical" length="100%" thickness="2px" />
      <span>Right</span>
    </div>
  ),
};

export const Dashed: Story = {
  args: {
    dashed: true,
    thickness: "2px",
  },
  render: (args) => (
    <div style={{ padding: "1rem" }}>
      <p>Dashed Divider</p>
      <Divider {...args} />
    </div>
  ),
};

export const CustomLengthAndThickness: Story = {
  args: {
    length: "200px",
    thickness: "5px",
  },
  render: (args) => (
    <div style={{ padding: "1rem" }}>
      <p>Custom Size</p>
      <Divider {...args} />
    </div>
  ),
};

export const Themed: Story = {
  render: () => (
    <div style={{ padding: "1rem", display: "grid", gap: "1rem" }}>
      <Divider theme="primary" />
      <Divider theme="secondary" />
      <Divider theme="tertiary" />
      <Divider theme="quaternary" />
      <Divider theme="clear" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ padding: "1rem", display: "grid", gap: "1rem" }}>
      <Divider theme="success" />
      <Divider theme="error" />
      <Divider theme="warning" />
    </div>
  ),
};
