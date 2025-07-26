import type { Meta, StoryObj } from "@storybook/nextjs";
import { Breadcrumbs } from "../src/index.next";
import { FaArrowRight } from "react-icons/fa";
import { withVariants } from "../.storybook-core/helpers/withVariants";
import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "../src/types/types";

const themeOptions: ThemeType[] = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "clear",
];

const stateOptions: StateType[] = ["success", "error", "warning"];

const sizeOptions: SizeType[] = ["xs", "small", "medium", "large", "xl"];

const roundingOptions: RoundingType[] = ["none", "small", "medium", "large"];

const shadowOptions: ShadowType[] = [
  "none",
  "light",
  "medium",
  "strong",
  "intense",
];

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  argTypes: {
    items: {
      description:
        "Array of breadcrumb items, each with label and path. Example: [{ label: 'Home', href: '/' }]",
      control: false,
      table: { category: "Content" },
    },
    theme: {
      description: "Theme color of the breadcrumbs.",
      control: { type: "select" },
      options: themeOptions,
      table: { category: "Appearance" },
    },
    rounding: {
      description: "Rounding of the breadcrumb container/capsules.",
      control: { type: "select" },
      options: roundingOptions,
      table: { category: "Appearance" },
    },
    shadow: {
      description: "Box shadow intensity for the breadcrumbs.",
      control: { type: "select" },
      options: shadowOptions,
      table: { category: "Appearance" },
    },
    state: {
      description:
        "Visual state for the breadcrumb (success, error, warning, etc).",
      control: { type: "select" },
      options: ["", ...stateOptions],
      table: { category: "Appearance" },
    },
    separator: {
      description:
        "Custom separator element between breadcrumbs. Usually an icon or character.",
      control: false,
      table: { category: "Content" },
    },
    disabled: {
      description: "If true, disables all breadcrumb links.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    size: {
      description: "Size of the breadcrumb (xs, small, medium, large, xl).",
      control: { type: "select" },
      options: sizeOptions,
      table: { category: "Appearance" },
    },
    outline: {
      description: "Display breadcrumbs with outline style.",
      control: "boolean",
      table: { category: "Appearance" },
    },
    className: {
      description: "Custom CSS class for the breadcrumb container.",
      control: "text",
      table: { category: "Appearance" },
    },
    maxVisible: {
      description:
        "Maximum number of breadcrumbs to display before collapsing/ellipsis.",
      control: "number",
      table: { category: "Behavior" },
    },
    "data-testid": {
      description: "Test ID for test automation.",
      control: "text",
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

const baseItems = [
  { label: "Home", href: "/" },
  { label: "Library", href: "/library" },
  { label: "Data", href: "/library/data" },
];

const defaultArgs = {
  items: baseItems,
  size: "medium" as SizeType,
  theme: "primary" as ThemeType,
  state: "" as StateType,
  rounding: "medium" as RoundingType,
  shadow: "medium" as ShadowType,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

export const RoundingVariants = () =>
  withVariants(Breadcrumbs, { ...defaultArgs }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = () =>
  withVariants(Breadcrumbs, { ...defaultArgs }, [
    { propName: "shadow", values: shadowOptions },
  ]);

export const ThemeVariants = () =>
  withVariants(Breadcrumbs, { ...defaultArgs }, [
    { propName: "theme", values: [...themeOptions] },
  ]);

export const StateVariants = () =>
  withVariants(Breadcrumbs, { ...defaultArgs }, [
    { propName: "state", values: stateOptions },
  ]);

export const SizeVariants = () =>
  withVariants(Breadcrumbs, { ...defaultArgs }, [
    { propName: "size", values: sizeOptions },
  ]);

export const OutlineVariants = () =>
  withVariants(
    Breadcrumbs,
    {
      ...defaultArgs,
      outline: true,
    },
    [{ propName: "theme", values: [...themeOptions, ...stateOptions] }]
  );

export const Truncated: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Category", href: "/category" },
      { label: "Subcategory", href: "/category/sub" },
      { label: "Details", href: "/category/sub/details" },
      { label: "Final Page" },
    ],
    maxVisible: 3,
  },
};

export const Disabled: Story = {
  args: {
    items: baseItems,
    disabled: true,
  },
};

export const CustomSeparator: Story = {
  args: {
    items: baseItems,
    separator: <FaArrowRight />,
  },
};

export const WithClassName: Story = {
  args: {
    ...defaultArgs,
    className: "storybook-breadcrumbs-custom",
  },
};
