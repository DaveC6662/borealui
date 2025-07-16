import { Meta, StoryObj } from "@storybook/nextjs";
import { EmptyState } from "../src/index.core";
import type { EmptyStateProps } from "../src/components/EmptyState/EmptyState.types";
import { FaInbox, FaBug, FaFolderOpen } from "react-icons/fa";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];
const sizeOptions = ["xs", "small", "medium", "large", "xl"];
const stateOptions = ["success", "error", "warning"];
const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

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
  argTypes: {
    icon: {
      description: "Optional icon to display above the empty state message.",
      control: false,
      table: { category: "Visuals" },
    },
    title: {
      description: "Main heading text for the empty state.",
      control: "text",
      table: { category: "Content" },
    },
    message: {
      description: "Secondary message describing the empty state.",
      control: "text",
      table: { category: "Content" },
    },
    actionLabel: {
      description: "Label for the primary action button (optional).",
      control: "text",
      table: { category: "Actions" },
    },
    onActionClick: {
      description: "Callback when the action button is clicked.",
      action: "action",
      table: { category: "Actions" },
    },
    theme: {
      description: "Visual theme for the empty state card.",
      control: { type: "select" },
      options: themeOptions,
      table: { category: "Appearance" },
    },
    state: {
      description:
        "State variant for feedback (e.g., success, error, warning).",
      control: { type: "select" },
      options: stateOptions,
      table: { category: "Appearance" },
    },
    size: {
      description: "Size of the card and text.",
      control: { type: "select" },
      options: sizeOptions,
      table: { category: "Appearance" },
    },
    outline: {
      description: "If true, renders with an outline.",
      control: "boolean",
      table: { category: "Appearance" },
    },
    rounding: {
      description: "Border radius style.",
      control: { type: "select" },
      options: roundingOptions,
      table: { category: "Appearance" },
    },
    shadow: {
      description: "Shadow style for the card.",
      control: { type: "select" },
      options: shadowOptions,
      table: { category: "Appearance" },
    },
    className: {
      description: "Custom CSS class for the container.",
      control: "text",
      table: { category: "Appearance" },
    },
    "data-testid": {
      description: "Custom test ID for end-to-end or unit testing.",
      control: "text",
      table: { category: "Advanced" },
    },
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

export const ThemeVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {themeOptions.map((theme) => (
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

export const StateVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {stateOptions.map((state) => (
        <EmptyState
          key={state}
          state={state}
          title={`${state.charAt(0).toUpperCase() + state.slice(1)} state`}
          message={`This is a standard ${state} variant.`}
        />
      ))}
    </div>
  ),
};

export const OutlineVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {themeOptions.map((theme) => (
        <EmptyState
          key={`outline-${theme}`}
          theme={theme}
          outline
          title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Outline`}
          message={`This is an outlined ${theme} variant.`}
        />
      ))}
      {stateOptions.map((theme) => (
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
      {sizeOptions.map((size) => (
        <EmptyState
          key={`size-${size}`}
          size={size}
          title={`${size.charAt(0).toUpperCase() + size.slice(1)} Size`}
          message={`This is a ${size} variant.`}
        />
      ))}
    </div>
  ),
};

export const RoundingVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {roundingOptions.map((rounding) => (
        <EmptyState
          key={`rounding-${rounding}`}
          rounding={rounding}
          title={`${rounding.charAt(0).toUpperCase() + rounding.slice(1)} Rounding`}
          message={`Rounding ${rounding}.`}
        />
      ))}
    </div>
  ),
};

export const ShadowVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {shadowOptions.map((shadow) => (
        <EmptyState
          key={`shadow-${shadow}`}
          shadow={shadow}
          title={`${shadow.charAt(0).toUpperCase() + shadow.slice(1)} Shadow`}
          message={`Shadow ${shadow}.`}
        />
      ))}
    </div>
  ),
};
