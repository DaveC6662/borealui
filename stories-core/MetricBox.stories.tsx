import { Meta, StoryObj } from "@storybook/react";
import { MetricBox } from "@/index.core";
import type { MetricBoxProps } from "@/components/MetricBox/MetricBox.types";
import { FaChartLine, FaCheckCircle } from "react-icons/fa";

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

export const AlignmentVariants: Story = {
  render: () => {
    const alignments = ["left", "center", "right"] as const;
    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {alignments.map((align) => (
          <MetricBox
            key={align}
            title={`${align.charAt(0).toUpperCase() + align.slice(1)} Aligned`}
            value="91%"
            align={align}
          />
        ))}
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: () => {
    const sizes = ["xs", "small", "medium", "large", "xl"] as const;
    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {sizes.map((size) => (
          <MetricBox
            key={size}
            title={`${size.charAt(0).toUpperCase() + size.slice(1)} Size`}
            value="1,000"
            size={size}
          />
        ))}
      </div>
    );
  },
};

export const ThemeVariants: Story = {
  render: () => {
    const themes = [
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "clear",
    ] as const;
    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {themes.map((theme) => (
          <MetricBox
            key={theme}
            title={theme.charAt(0).toUpperCase() + theme.slice(1)}
            value="3,210"
            theme={theme}
            icon={FaChartLine}
          />
        ))}
      </div>
    );
  },
};

export const OutlineVariants: Story = {
  render: () => {
    const themes = [
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "clear",
    ] as const;

    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {themes.map((theme) => (
          <MetricBox
            key={`outline-${theme}`}
            title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Outline`}
            value="999"
            outline
            theme={theme}
            icon={FaChartLine}
          />
        ))}
      </div>
    );
  },
};
