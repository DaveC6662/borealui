import { Meta, StoryObj } from "@storybook/react";
import { FaRocket, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import Timeline from "@/components/Timeline/core/Timeline";
import type { TimelineProps } from "@/components/Timeline/Timeline.types";

const meta: Meta<TimelineProps> = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  args: {
    orientation: "vertical",
    theme: "primary",
  },
};

export default meta;
type Story = StoryObj<TimelineProps>;

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

export const Themed: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2rem" }}>
      <Timeline {...args} theme="primary" items={sampleEvents} />
      <Timeline {...args} theme="success" items={sampleEvents} />
      <Timeline {...args} theme="warning" items={sampleEvents} />
      <Timeline {...args} theme="error" items={sampleEvents} />
    </div>
  ),
};

export const WithoutIcons: Story = {
  args: {
    items: sampleEvents.map(({ icon, ...rest }) => rest), // Strip icons
  },
};
