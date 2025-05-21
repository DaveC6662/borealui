import { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "@/index.next";
import type { EmptyStateProps } from "@/components/EmptyState/EmptyState.types";
import { FaInbox, FaBug, FaFolderOpen } from "react-icons/fa";

const meta: Meta<EmptyStateProps> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    title: "Nothing to Show",
    message: "This section doesn't have any content yet.",
    theme: "primary",
    size: "medium",
  },
};

export default meta;

type Story = StoryObj<EmptyStateProps>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: FaInbox,
  },
};

export const CustomMessageAndTitle: Story = {
  args: {
    title: "No Results Found",
    message: "Try adjusting your filters or search term.",
    icon: FaFolderOpen,
  },
};

export const WithActionButton: Story = {
  args: {
    icon: FaBug,
    title: "Oops, something went wrong!",
    message: "Please try again or contact support.",
    actionLabel: "Retry",
    onActionClick: () => alert("Retry clicked"),
  },
};

const themes = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "clear",
] as const;

export const ThemeVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {themes.map((theme) => (
        <EmptyState
          key={theme}
          theme={theme}
          title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`}
          message={`This is a standard ${theme} variant.`}
        />
      ))}
    </div>
  ),
};

export const OutlineVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {themes.map((theme) => (
        <EmptyState
          key={`outline-${theme}`}
          theme={theme}
          outline
          title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Outline`}
          message={`This is an outlined ${theme} variant.`}
        />
      ))}
    </div>
  ),
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <EmptyState size="xs" title="Xs Empty" message="Mini mode" />
      <EmptyState size="small" title="Small Empty" message="Compact mode" />
      <EmptyState size="medium" title="Medium Empty" message="Default size" />
      <EmptyState size="large" title="Large Empty" message="Expanded layout" />
      <EmptyState size="xl" title="Xl Empty" message="Extra Expanded layout" />
    </div>
  ),
};
