import type { Meta, StoryObj } from "@storybook/nextjs";
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
const roundingOptions = ["none", "small", "medium", "large"];

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    text: {
      description: "Text or label displayed inside the badge.",
      control: "text",
      table: { category: "Content" },
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
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

const defaultArgs = {
  text: "Badge",
  theme: "primary" as ThemeType,
  state: "" as StateType,
  size: "medium" as SizeType,
  shadow: "none" as ShadowType,
  rounding: "sm" as RoundingType,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Badge text="Check" icon={FaCheck} state="success" />
      <Badge text="Warning" icon={FaExclamation} state="warning" />
      <Badge text="Info" icon={FaInfoCircle} theme="primary" />
    </div>
  ),
};

export const WithOnClick: Story = {
  args: {
    ...defaultArgs,
    text: "Clickable Badge",
    onClick: () => alert("Badge clicked!"),
    theme: "success" as ThemeType,
  },
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    title: "Disabled Badge",
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
    [{ propName: "theme", values: [...themeOptions, ...stateOptions] }]
  );

export const WithChildren: Story = {
  render: () => (
    <Badge text="With Children">
      <span role="img" aria-label="star">
        ⭐
      </span>
    </Badge>
  ),
};
