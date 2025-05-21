import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Rating } from "@/index.core";
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

export const SizeVariants: Story = {
  render: () => {
    const sizes = ["xs", "small", "medium", "large", "xl"] as const;
    const [value, setValue] = useState(3);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {sizes.map((size) => (
          <Rating
            key={size}
            size={size}
            value={value}
            onChange={setValue}
            label={`Size: ${size}`}
          />
        ))}
      </div>
    );
  },
};

export const ThemedVariants: Story = {
  render: () => {
    const themes = [
      "primary",
      "success",
      "warning",
      "error",
      "secondary",
      "clear",
    ] as const;
    const [value, setValue] = useState(3);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {themes.map((theme) => (
          <Rating
            key={theme}
            theme={theme}
            value={value}
            onChange={setValue}
            label={`Theme: ${theme}`}
          />
        ))}
      </div>
    );
  },
};

export const TenStars: Story = {
  render: () => {
    const [value, setValue] = useState(7);
    return <Rating max={10} value={value} onChange={setValue} />;
  },
};
