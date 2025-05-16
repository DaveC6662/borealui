import { Meta, StoryObj } from "@storybook/react";
import SkeletonLoader from "@/components/Skeleton/core/Skeleton"; // Adjust path
import type { SkeletonProps } from "@/components/Skeleton/Skeleton.types";

const meta: Meta<SkeletonProps> = {
  title: "Components/SkeletonLoader",
  component: SkeletonLoader,
  tags: ["autodocs"],
  args: {
    width: "100%",
    height: "20px",
  },
};

export default meta;

type Story = StoryObj<SkeletonProps>;

export const Default: Story = {
  args: {
    width: "100%",
    height: "20px",
  },
};

export const FixedSize: Story = {
  args: {
    width: "200px",
    height: "40px",
  },
};

export const InlineSkeletons: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <SkeletonLoader {...args} width="80px" height="20px" />
      <SkeletonLoader {...args} width="120px" height="20px" />
      <SkeletonLoader {...args} width="100px" height="20px" />
    </div>
  ),
};

export const BlockPlaceholder: Story = {
  args: {
    width: "100%",
    height: "150px",
    className: "rounded",
  },
};

export const MultipleLines: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      <SkeletonLoader {...args} width="100%" height="20px" />
      <SkeletonLoader {...args} width="95%" height="20px" />
      <SkeletonLoader {...args} width="90%" height="20px" />
      <SkeletonLoader {...args} width="85%" height="20px" />
    </div>
  ),
};
