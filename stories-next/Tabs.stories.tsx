import { Meta, StoryObj } from "@storybook/nextjs";
import { FaCode, FaImage, FaMusic } from "react-icons/fa";
import { Tabs } from "../src/index.next";
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
