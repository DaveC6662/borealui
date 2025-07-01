import { Meta, StoryObj } from "@storybook/nextjs";
import { FaRocket, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { Timeline } from "../src/index.core";
import type { TimelineProps } from "../src/components/Timeline/Timeline.types";
import { withVariants } from "../.storybook-core/helpers/withVariants";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const sampleEvents = [
  {
    title: "Project Kickoff",
    description: "Initial planning and stakeholder alignment.",
    date: "2025-01-01",
    icon: FaRocket,
  },
  {
    title: "Requirements Finalized",
    description: "All business and technical requirements approved.",
    date: "2025-02-15",
    icon: FaCalendarAlt,
  },
  {
    title: "Development Phase",
    description: "Coding, testing, and QA in progress.",
    date: "2025-04-01",
  },
  {
    title: "Launch",
    description: "Product released to market.",
    date: "2025-06-30",
    icon: FaCheckCircle,
  },
];

const meta: Meta<TimelineProps> = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  args: {
    orientation: "vertical",
    theme: "primary",
    items: sampleEvents,
  },
};

export default meta;
type Story = StoryObj<TimelineProps>;

export const Vertical: Story = {
  args: {
    items: sampleEvents,
    orientation: "vertical",
  },
};

export const Horizontal: Story = {
  args: {
    items: sampleEvents,
    orientation: "horizontal",
  },
};

export const WithoutIcons: Story = {
  args: {
    items: sampleEvents.map(({ icon, ...rest }) => rest),
  },
};

export const ThemeVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "2rem" }}>
        {themeOptions.map((theme) => (
          <Timeline key={theme} {...args} theme={theme} items={sampleEvents} />
        ))}
      </div>
    );
  },
};

export const RoundingVariants = (args) =>
  withVariants(Timeline, { ...args }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = (args) =>
  withVariants(Timeline, { ...args }, [
    { propName: "shadow", values: shadowOptions },
  ]);
