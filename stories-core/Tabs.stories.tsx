import { Meta, StoryObj } from "@storybook/react";
import { FaCode, FaImage, FaMusic } from "react-icons/fa";
import Tabs from "@/components/Tabs/core/Tabs";
import type { TabsProps } from "@/components/Tabs/Tabs.types";

const meta: Meta<TabsProps> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    theme: "primary",
    size: "medium",
    defaultIndex: 0,
    tabs: [
      { label: "Code", icon: FaCode, content: <div>Code content goes here.</div> },
      { label: "Music", icon: FaMusic, content: <div>Music player or list here.</div> },
      { label: "Images", icon: FaImage, content: <div>Gallery or image preview here.</div> },
    ],
  },
};

export default meta;

type Story = StoryObj<TabsProps>;

export const Default: Story = {};

export const NoIcons: Story = {
  args: {
    tabs: [
      { label: "Overview", content: <p>Overview content.</p> },
      { label: "Details", content: <p>Detailed view.</p> },
      { label: "Settings", content: <p>Settings content.</p> },
    ],
  },
};

export const ThemeVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <Tabs {...args} theme="primary" />
      <Tabs {...args} theme="secondary" />
      <Tabs {...args} theme="success" />
      <Tabs {...args} theme="warning" />
      <Tabs {...args} theme="error" />
    </div>
  ),
};

export const SizeVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <Tabs {...args} size="small" />
      <Tabs {...args} size="medium" />
      <Tabs {...args} size="large" />
    </div>
  ),
};

export const WithOnChange: Story = {
  render: (args) => (
    <Tabs
      {...args}
      onChange={(index) => alert(`Tab ${index + 1} clicked`)}
    />
  ),
};
