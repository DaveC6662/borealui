import { Meta, StoryObj } from "@storybook/nextjs";
import Divider from "@/components/Divider/next/Divider";
import type { DividerProps } from "@/components/Divider/Divider.types";

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
      <Divider theme="success" />
      <Divider theme="warning" />
      <Divider theme="error" />
    </div>
  ),
};
