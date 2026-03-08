import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../src/index.core";
import { FaCheck, FaExclamation, FaInfoCircle } from "react-icons/fa";
import { withVariants } from "../.storybook-core/helpers/withVariants";
import type {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "../src/types/types";

const themeOptions = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions = ["success", "error", "warning"];
const sizeOptions = ["xs", "small", "medium", "large", "xl"];
const shadowOptions = ["none", "light", "medium", "strong", "intense"];
const roundingOptions = ["none", "small", "medium", "large", "full"];

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "Badge content.",
      control: "text",
      table: { category: "Content" },
    },
    ariaLabel: {
      description: "Accessible label for non-text badge content.",
      control: "text",
      table: { category: "Accessibility" },
    },
    theme: {
      description: "Theme color of the badge (primary, secondary, etc).",
      control: { type: "select" },
      options: themeOptions,
      table: { category: "Appearance" },
    },
    state: {
      description: "Semantic state style (success, error, warning).",
      control: { type: "select" },
      options: [...stateOptions, ""],
      table: { category: "Appearance" },
    },
    size: {
      description: "Badge size (xs, small, medium, large, xl).",
      control: { type: "select" },
      options: sizeOptions,
      table: { category: "Appearance" },
    },
    rounding: {
      description: "Corner rounding of the badge.",
      control: { type: "select" },
      options: roundingOptions,
      table: { category: "Appearance" },
    },
    shadow: {
      description: "Shadow depth of the badge.",
      control: { type: "select" },
      options: shadowOptions,
      table: { category: "Appearance" },
    },
    outline: {
      description:
        "If true, displays badge with outline instead of solid background.",
      control: "boolean",
      table: { category: "Appearance" },
    },
    icon: {
      description: "Optional icon displayed at the start of the badge.",
      control: false,
      table: { category: "Content" },
    },
    disabled: {
      description: "Disables interaction and applies disabled styling.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    onClick: {
      description: "Callback fired when badge is clicked (if interactive).",
      action: "clicked",
      table: { category: "Events" },
    },
    className: {
      description: "Additional CSS class name(s) for custom styling.",
      control: "text",
      table: { category: "Appearance" },
    },
    "data-testid": {
      description: "Test ID for test automation.",
      control: "text",
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

const defaultArgs = {
  children: "Badge",
  theme: "primary" as ThemeType,
  state: "" as StateType,
  size: "medium" as SizeType,
  shadow: "none" as ShadowType,
  rounding: "small" as RoundingType,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Badge icon={FaCheck} state="success">
        Check
      </Badge>
      <Badge icon={FaExclamation} state="warning">
        Warning
      </Badge>
      <Badge icon={FaInfoCircle} theme="primary">
        Info
      </Badge>
    </div>
  ),
};

export const WithOnClick: Story = {
  args: {
    ...defaultArgs,
    children: "Clickable Badge",
    onClick: () => alert("Badge clicked!"),
    state: "success" as StateType,
  },
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    children: "Disabled Badge",
    disabled: true,
  },
};

export const ThemeVariants = () =>
  withVariants(Badge, { ...defaultArgs }, [
    { propName: "theme", values: themeOptions },
  ]);

export const StateVariants = () =>
  withVariants(Badge, { ...defaultArgs }, [
    { propName: "state", values: stateOptions },
  ]);

export const SizeVariants = () =>
  withVariants(Badge, { ...defaultArgs }, [
    { propName: "size", values: sizeOptions },
  ]);

export const RoundingVariants = () =>
  withVariants(Badge, { ...defaultArgs }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = () =>
  withVariants(Badge, { ...defaultArgs }, [
    { propName: "shadow", values: shadowOptions },
  ]);

export const OutlineVariants = () =>
  withVariants(
    Badge,
    {
      ...defaultArgs,
      outline: true,
    },
    [{ propName: "theme", values: themeOptions }],
  );

export const WithChildren: Story = {
  render: () => (
    <Badge ariaLabel="With children star badge">
      <span>With Children</span>
      <span aria-hidden="true"> ⭐</span>
    </Badge>
  ),
};

export const IconOnly: Story = {
  args: {
    icon: FaInfoCircle,
    ariaLabel: "Information badge",
  },
  render: (args) => <Badge {...args} />,
};
