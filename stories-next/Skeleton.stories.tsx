import { Meta, StoryObj } from "@storybook/nextjs";
import { Skeleton } from "../src/index.next";
import type { SkeletonProps } from "../src/components/Skeleton/Skeleton.types";
import { withVariants } from "../.storybook-core/helpers/withVariants";

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<SkeletonProps> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  args: {
    width: "100%",
    height: "20px",
  },
  argTypes: {
    width: {
      control: "text",
      description: "Width of the skeleton placeholder (e.g., '100%', '150px').",
      table: { category: "Appearance", defaultValue: { summary: "100%" } },
    },
    height: {
      control: "text",
      description: "Height of the skeleton placeholder (e.g., '20px', '2rem').",
      table: { category: "Appearance", defaultValue: { summary: "20px" } },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Border radius for the skeleton.",
      table: { category: "Appearance" },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow style for the skeleton.",
      table: { category: "Appearance" },
    },
    label: {
      control: "text",
      description: "ARIA label for screen readers.",
      table: {
        category: "Accessibility",
        defaultValue: { summary: "Loading content..." },
      },
    },
    className: {
      control: "text",
      description: "Additional custom class names.",
      table: { category: "Advanced" },
    },
    "data-testid": {
      control: "text",
      description: "Test id for querying the component in tests.",
      type: { name: "string" },
      table: { category: "Testing" },
    },
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
      <Skeleton {...args} width="80px" height="20px" />
      <Skeleton {...args} width="120px" height="20px" />
      <Skeleton {...args} width="100px" height="20px" />
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
      <Skeleton {...args} width="100%" height="20px" />
      <Skeleton {...args} width="95%" height="20px" />
      <Skeleton {...args} width="90%" height="20px" />
      <Skeleton {...args} width="85%" height="20px" />
    </div>
  ),
};

export const RoundingVariants = (args) =>
  withVariants(Skeleton, { ...args }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = (args) =>
  withVariants(Skeleton, { ...args }, [
    { propName: "shadow", values: shadowOptions },
  ]);
