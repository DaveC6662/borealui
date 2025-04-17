import { Meta, StoryObj } from "@storybook/react";
import EmptyState from "@/components/EmptyState/core/EmptyState";
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

export const OutlinedThemeVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <EmptyState
        title="Primary"
        message="This is a primary outline."
        outline
        theme="primary"
      />
      <EmptyState
        title="Secondary"
        message="This is a secondary outline."
        outline
        theme="secondary"
      />
      <EmptyState
        title="Success"
        message="You're all set!"
        outline
        theme="success"
      />
      <EmptyState
        title="Warning"
        message="This needs your attention."
        outline
        theme="warning"
      />
      <EmptyState
        title="Error"
        message="Something broke."
        outline
        theme="error"
      />
    </div>
  ),
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <EmptyState size="xs" title="Xs Empty" message="Mini mode" />
      <EmptyState size="small" title="Small Empty" message="Compact mode" />
      <EmptyState size="medium" title="Medium Empty" message="Default size" />
      <EmptyState size="large" title="Large Empty" message="Expanded layout" />
      <EmptyState size="xl" title="Xl Empty" message="Extra Expanded layout" />
    </div>
  ),
};
