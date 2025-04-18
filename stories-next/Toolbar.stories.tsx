import { Meta, StoryObj } from "@storybook/react";
import Toolbar from "@/components/Toolbar/core/Toolbar";
import IconButton from "@/components/Buttons/IconButton/next/IconButton";
import { FaBell, FaArrowLeft } from "react-icons/fa";
import type { ToolbarProps } from "@/components/Toolbar/Toolbar.types";

const meta: Meta<ToolbarProps> = {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  args: {
    title: "Dashboard",
    theme: "primary",
  },
};

export default meta;
type Story = StoryObj<ToolbarProps>;

export const Default: Story = {
  args: {
    left: <IconButton icon={FaArrowLeft} ariaLabel="Back" />,
    right: <IconButton icon={FaBell} ariaLabel="Notifications" />,
  },
};

export const WithAvatar: Story = {
  args: {
    left: <IconButton icon={FaArrowLeft} ariaLabel="Back" />,
    right: <IconButton icon={FaBell} ariaLabel="Notifications" />,
    avatar: {
      name: "Davin Chiupka",
      onClick: () => alert("Avatar clicked"),
    },
  },
};

export const Themed: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem" }}>
      <Toolbar {...args} theme="primary" title="Primary Theme" />
      <Toolbar {...args} theme="secondary" title="Secondary Theme" />
      <Toolbar {...args} theme="warning" title="Warning Theme" />
      <Toolbar {...args} theme="success" title="Success Theme" />
    </div>
  ),
};
