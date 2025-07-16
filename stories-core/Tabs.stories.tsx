import { Meta, StoryObj } from "@storybook/nextjs";
import { FaCode, FaImage, FaMusic } from "react-icons/fa";
import { Tabs } from "../src/index.core";
import type { TabsProps } from "../src/components/Tabs/Tabs.types";
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

const tabsWithIcons: TabsProps["tabs"] = [
  { label: "Code", icon: FaCode, content: <div>Code content goes here.</div> },
  {
    label: "Music",
    icon: FaMusic,
    content: <div>Music player or list here.</div>,
  },
  {
    label: "Images",
    icon: FaImage,
    content: <div>Gallery or image preview here.</div>,
  },
];

const tabsWithoutIcons: TabsProps["tabs"] = [
  { label: "Overview", content: <p>Overview content.</p> },
  { label: "Details", content: <p>Details content.</p> },
  { label: "Settings", content: <p>Settings content.</p> },
];

const meta: Meta<TabsProps> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    theme: "primary",
    size: "medium",
    defaultIndex: 0,
    tabs: tabsWithIcons,
  },
  argTypes: {
    tabs: {
      control: false,
      description:
        "Array of tab objects. Each tab typically includes at least a `label`, `content`, and optionally `icon` or `disabled`.",
      table: { category: "Data", type: { summary: "Tab[]" } },
    },
    defaultIndex: {
      control: { type: "number", min: 0 },
      description: "Index of the tab that is active by default.",
      table: {
        category: "State",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    onChange: {
      action: "changed",
      description:
        "Callback fired when the active tab changes. Receives the tab index.",
      table: { category: "Events" },
    },
    theme: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "quaternary", "clear"],
      description: "Theme color variant for the tabs.",
      table: { category: "Appearance" },
    },
    state: {
      control: { type: "select" },
      options: ["", "success", "error", "warning"],
      description:
        "Visual state variant for tabs (applies state color styling).",
      table: { category: "Appearance" },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "small", "medium", "large", "xl"],
      description: "Size of the tabs and their labels.",
      table: { category: "Appearance" },
    },
    rounding: {
      control: { type: "select" },
      options: ["none", "small", "medium", "large"],
      description: "Border radius for tab buttons.",
      table: { category: "Appearance" },
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "light", "medium", "strong", "intense"],
      description: "Shadow style for the tabs container.",
      table: { category: "Appearance" },
    },
    className: {
      control: "text",
      description: "Additional class names for the outermost tabs container.",
      table: { category: "Advanced" },
    },
    "data-testid": {
      control: "text",
      description: "Test ID for the root element (for testing utilities).",
      table: { category: "Testing" },
    },
  },
};

export default meta;

type Story = StoryObj<TabsProps>;

export const Default: Story = {};

export const NoIcons: Story = {
  args: {
    tabs: tabsWithoutIcons,
  },
};

export const ThemeVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {themeOptions.map((theme) => (
          <Tabs key={theme} {...args} theme={theme} />
        ))}
      </div>
    );
  },
};

export const StateVariants: Story = {
  render: (args) => {
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {stateOptions.map((state) => (
          <Tabs key={state} {...args} state={state} />
        ))}
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: (args) => {
    const sizes = ["xs", "small", "medium", "large", "xl"] as const;
    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {sizes.map((size) => (
          <Tabs key={size} {...args} size={size} />
        ))}
      </div>
    );
  },
};

export const WithOnChange: Story = {
  render: (args) => (
    <Tabs {...args} onChange={(index) => alert(`Tab ${index + 1} clicked`)} />
  ),
};

export const RoundingVariants = (args) =>
  withVariants(Tabs, { ...args }, [
    { propName: "rounding", values: roundingOptions },
  ]);

export const ShadowVariants = (args) =>
  withVariants(Tabs, { ...args }, [
    { propName: "shadow", values: shadowOptions },
  ]);
