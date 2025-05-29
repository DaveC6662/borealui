import { Meta, StoryObj } from "@storybook/nextjs";
import { FaCode, FaImage, FaMusic } from "react-icons/fa";
import { Tabs } from "@/index.core";
import type { TabsProps } from "@/components/Tabs/Tabs.types";

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
    const themes = [
      "primary",
      "secondary",
      "success",
      "warning",
      "error",
      "clear",
    ] as const;

    return (
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {themes.map((theme) => (
          <Tabs key={theme} {...args} theme={theme} />
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
