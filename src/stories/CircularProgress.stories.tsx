import { Meta, StoryObj } from "@storybook/react";
import CircularProgress from "@/components/CircularProgress/core/CircularProgress";
import type { CircularProgressProps } from "@/components/CircularProgress/CircularProgress.types";

const meta: Meta<CircularProgressProps> = {
  title: "Components/CircularProgress",
  component: CircularProgress,
  tags: ["autodocs"],
  args: {
    rating: 85,
    label: "Course Progress",
  },
};

export default meta;

type Story = StoryObj<CircularProgressProps>;

export const Default: Story = {};

export const ShowRawScore: Story = {
  args: {
    showRaw: true,
  },
};

export const LowScore: Story = {
  args: {
    rating: 32,
    label: "Low Score",
  },
};

export const WarningZone: Story = {
  args: {
    rating: 58,
    label: "Warning Score",
  },
};

export const HighScore: Story = {
  args: {
    rating: 95,
    label: "Excellent Score",
  },
};

export const CustomRange: Story = {
  args: {
    rating: 7,
    min: 0,
    max: 10,
    showRaw: true,
    label: "Custom Scale (0–10)",
  },
};

export const SmallSize: Story = {
  args: {
    size: "small",
    rating: 72,
    label: "Small Size",
  },
};

export const LargeSize: Story = {
  args: {
    size: "large",
    rating: 90,
    label: "Large Size",
  },
};
