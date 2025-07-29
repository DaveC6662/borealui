import { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "../src/index.next";
import { SidebarProps } from "../src/components/Sidebar/Sidebar.types";

const meta: Meta<SidebarProps> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  args: {
    children: "Sidebar Text",
  },
};

export default meta;
type Story = StoryObj<SidebarProps>;

export const Default: Story = {};
