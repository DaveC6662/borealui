import type { Meta, StoryObj } from "@storybook/nextjs";
import { IconButton } from "../src/index.core";
import type { IconButtonProps } from "../src/components/IconButton/IconButton.types";
import { FaPlus, FaExternalLinkAlt } from "react-icons/fa";
import { withVariants } from "../.storybook-core/helpers/withVariants";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "warning", "error"];

const sizeOptions = ["xs", "small", "medium", "large", "xl"];

const roundingOptions = ["none", "small", "medium", "large"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    icon: FaPlus,
    theme: "primary",
    size: "medium",
    rounding: "large",
    ariaLabel: "Add",
  },
  argTypes: {
    icon: {
      control: false,
      description:
        "The icon element to display inside the button (e.g., FaPlus). Required.",
      table: { category: "Content", type: { summary: "IconType" } },
    },
    theme: {
      control: "select",
      options: themeOptions,
      description: "Theme color for the button.",
      table: { category: "Appearance", defaultValue: { summary: "primary" } },
    },
    state: {
      control: "select",
      options: stateOptions,
      description: "State variant (success, warning, error).",
      table: { category: "State" },
    },
    size: {
      control: "select",
      options: sizeOptions,
      description: "Size of the button.",
      table: { category: "Appearance", defaultValue: { summary: "medium" } },
    },
    rounding: {
      control: "select",
      options: roundingOptions,
      description: "Border radius/rounding of the button.",
      table: { category: "Appearance", defaultValue: { summary: "large" } },
    },
    shadow: {
      control: "select",
      options: shadowOptions,
      description: "Shadow effect for the button.",
      table: { category: "Appearance", defaultValue: { summary: "none" } },
    },
    outline: {
      control: "boolean",
      description: "Show button as outlined style.",
      table: { category: "Appearance", defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      description: "Displays a spinner instead of the icon when true.",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "Disables the button and makes it non-interactive.",
      table: { category: "State", defaultValue: { summary: "false" } },
    },
    href: {
      control: "text",
      description: "If set, renders as a link (<a> or custom LinkComponent).",
      table: { category: "Links", type: { summary: "string" } },
    },
    isExternal: {
      control: "boolean",
      description: "If true, opens the link in a new tab (for external links).",
      table: { category: "Links", defaultValue: { summary: "false" } },
    },
    ariaLabel: {
      control: "text",
      description:
        "Accessible label for screen readers (required if only icon).",
      table: { category: "Accessibility" },
    },
    title: {
      control: "text",
      description: "Native title tooltip (optional, falls back to ariaLabel).",
      table: { category: "Accessibility" },
    },
    tabIndex: {
      control: "number",
      description: "Tab order for keyboard navigation.",
      table: { category: "Accessibility" },
    },
    onClick: {
      action: "clicked",
      description: "Callback fired on button click.",
      table: { category: "Events", type: { summary: "(event) => void" } },
    },
    onKeyDown: {
      action: "keydown",
      description: "Callback fired on keydown events.",
      table: { category: "Events", type: { summary: "(event) => void" } },
    },
    className: {
      control: "text",
      description: "Additional CSS class(es) to apply.",
      table: { category: "Appearance" },
    },
    "data-testid": {
      control: "text",
      description: "Custom data-testid for testing.",
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const ThemeVariants = () =>
  withVariants(
    IconButton,
    {
      icon: FaPlus,
      size: "medium",
      ariaLabel: "Theme",
      theme: "primary",
    },
    [{ propName: "theme", values: themeOptions }]
  );

export const StateVariants = () =>
  withVariants(
    IconButton,
    {
      icon: FaPlus,
      size: "medium",
      ariaLabel: "Theme",
      state: "",
    },
    [{ propName: "state", values: stateOptions }]
  );

export const OutlineAndDisabledVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {themeOptions.map((theme) => (
        <IconButton
          key={theme}
          {...args}
          theme={theme}
          outline
          ariaLabel={`Theme: ${theme}`}
        />
      ))}
      {stateOptions.map((theme) => (
        <IconButton
          key={theme}
          {...args}
          theme={theme}
          outline
          ariaLabel={`Theme: ${theme}`}
        />
      ))}
      <IconButton {...args} disabled ariaLabel="Disabled" />
    </div>
  ),
};

export const SizeVariants = () =>
  withVariants(
    IconButton,
    {
      icon: FaPlus,
      theme: "primary",
      ariaLabel: "Size",
      size: "medium",
    },
    [{ propName: "size", values: sizeOptions }]
  );

export const LoadingState: Story = {
  args: {
    loading: true,
  },
};

export const LinkVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <IconButton
        {...args}
        href="https://example.com"
        icon={FaExternalLinkAlt}
        isExternal
        ariaLabel="External Link"
      />
      <IconButton
        {...args}
        href="/internal-route"
        icon={FaPlus}
        ariaLabel="Internal Link"
      />
    </div>
  ),
};

export const RoundingVariants = () =>
  withVariants(
    IconButton,
    {
      icon: FaPlus,
      theme: "primary",
      ariaLabel: "Size",
      rounding: "large",
      size: "medium",
    },
    [{ propName: "rounding", values: roundingOptions }]
  );

export const ShadowVariants = () =>
  withVariants(
    IconButton,
    {
      icon: FaPlus,
      theme: "primary",
      ariaLabel: "Size",
      shadow: "none",
      size: "medium",
    },
    [{ propName: "shadow", values: shadowOptions }]
  );
