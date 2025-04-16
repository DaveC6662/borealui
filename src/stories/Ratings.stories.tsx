import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Rating from "@/components/Rating/core/Rating";
import type { RatingProps } from "@/components/Rating/Rating.types";

const meta: Meta<RatingProps> = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
  args: {
    max: 5,
    theme: "primary",
    size: "medium",
  },
};

export default meta;

type Story = StoryObj<RatingProps>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(3);
    return <Rating {...args} value={value} onChange={setValue} />;
  },
};

export const NonInteractive: Story = {
  args: {
    value: 4,
    interactive: false,
  },
};

export const SmallSize: Story = {
  render: () => {
    const [value, setValue] = useState(2);
    return <Rating value={value} onChange={setValue} size="small" />;
  },
};

export const LargeSize: Story = {
  render: () => {
    const [value, setValue] = useState(5);
    return <Rating value={value} onChange={setValue} size="large" />;
  },
};

export const ThemedVariants: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Rating value={value} onChange={setValue} theme="primary" />
        <Rating value={value} onChange={setValue} theme="success" />
        <Rating value={value} onChange={setValue} theme="warning" />
        <Rating value={value} onChange={setValue} theme="error" />
      </div>
    );
  },
};

export const TenStars: Story = {
  render: () => {
    const [value, setValue] = useState(7);
    return <Rating value={value} onChange={setValue} max={10} />;
  },
};
