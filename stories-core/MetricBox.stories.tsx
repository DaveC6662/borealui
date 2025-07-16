import { Meta, StoryObj } from "@storybook/nextjs";
import { MetricBox } from "../src/index.core";
import type { MetricBoxProps } from "../src/components/MetricBox/MetricBox.types";
import { FaChartLine, FaCheckCircle } from "react-icons/fa";
import { withVariants } from "../.storybook-core/helpers/withVariants";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

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
  argTypes: {
    title: {
      control: "text",
      description: "Title of the metric or label displayed at the top.",
      type: { name: "string", required: true },
      table: { category: "Content", type: { summary: "string" } },
    },
    value: {
      control: "text",
      description: "Main value or statistic to display prominently.",
      type: { name: "string", required: true },
      table: { category: "Content", type: { summary: "string | number" } },
    },
    icon: {
      control: false,
      description: "Optional icon to display at the top of the metric box.",
      type: { name: "React.ElementType" },
      table: { category: "Content", type: { summary: "React.ElementType" } },
    },
    subtext: {
      control: "text",
      description: "Small helper or context text shown below the value.",
      type: { name: "string" },
      table: { category: "Content", type: { summary: "string" } },
    },
    theme: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color variant.",
      type: { name: "string" },
      table: { category: "Style", defaultValue: { summary: "primary" } },
    },
    state: {
      control: "select",
      options: ["", "success", "error", "warning"],
      description: "State color for additional meaning.",
      type: { name: "string" },
      table: { category: "Style", defaultValue: { summary: "" } },
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Text alignment of the metric box content.",
      type: { name: "string" },
      table: { category: "Style", defaultValue: { summary: "center" } },
    },
    size: {
      control: "select",
      options: ["xs", "small", "medium", "large", "xl"],
      description: "Size of the metric box.",
      type: { name: "string" },
      table: { category: "Style", defaultValue: { summary: "medium" } },
    },
    outline: {
      control: "boolean",
      description: "If true, renders an outlined variant.",
      type: { name: "boolean" },
      table: { category: "Style", defaultValue: { summary: false } },
    },
    rounding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
      description: "Border radius for the card.",
      type: { name: "string" },
      table: { category: "Style", defaultValue: { summary: "none" } },
    },
    shadow: {
      control: "select",
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow depth for the card.",
      type: { name: "string" },
      table: { category: "Style", defaultValue: { summary: "none" } },
    },
    className: {
      control: "text",
      description: "Custom CSS class for the metric box.",
      type: { name: "string" },
      table: { category: "Style" },
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

type Story = StoryObj<MetricBoxProps>;

export const Default: Story = {};

const defaultArgs: MetricBoxProps = {
  title: "Users Online",
  value: "1,234",
  theme: "primary",
  align: "center",
  size: "medium",
};

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
    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {themeOptions.map((theme) => (
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

export const StateVariants: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {stateOptions.map((state) => (
          <MetricBox
            key={state}
            title={state.charAt(0).toUpperCase() + state.slice(1)}
            value="3,210"
            state={state}
            icon={FaChartLine}
          />
        ))}
      </div>
    );
  },
};

export const OutlineVariants: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {themeOptions.map((theme) => (
          <MetricBox
            key={`outline-${theme}`}
            title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Outline`}
            value="999"
            outline
            theme={theme}
            icon={FaChartLine}
          />
        ))}
        {stateOptions.map((theme) => (
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

export const RoundingVariants = () =>
  withVariants(MetricBox, { ...defaultArgs }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = () =>
  withVariants(MetricBox, { ...defaultArgs }, [
    { propName: "shadow", values: shadowOptions },
  ]);
