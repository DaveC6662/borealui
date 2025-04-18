import { Meta, StoryObj } from "@storybook/react";
import MetricBox from "@/components/MetricBox/next/MetricBox";
import type { MetricBoxProps } from "@/components/MetricBox/MetricBox.types";
import {
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const meta: Meta<MetricBoxProps> = {
  title: "Components/MetricBox",
  component: MetricBox,
  tags: ["autodocs"],
  args: {
    title: "Users Online",
    value: "1,234",
    theme: "primary",
    align: "center",
    size: "medium",
  },
};

export default meta;

type Story = StoryObj<MetricBoxProps>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: FaChartLine,
  },
};

export const WithSubtext: Story = {
  args: {
    icon: FaCheckCircle,
    subtext: "Up 12% since last week",
  },
};

export const WarningState: Story = {
  args: {
    title: "System Alerts",
    value: "5",
    icon: FaExclamationTriangle,
    subtext: "Check server logs",
    theme: "warning",
  },
};

export const AlignmentVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <MetricBox title="Left Aligned" value="87%" align="left" />
      <MetricBox title="Center Aligned" value="91%" align="center" />
      <MetricBox title="Right Aligned" value="76%" align="right" />
    </div>
  ),
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <MetricBox title="Small" value="320" size="small" />
      <MetricBox title="Medium" value="1,240" size="medium" />
      <MetricBox title="Large" value="8,920" size="large" />
    </div>
  ),
};
