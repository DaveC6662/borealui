import { Meta, StoryObj } from "@storybook/react";
import Dropdown from "@/components/Dropdown/core/Dropdown";
import { FaEllipsisV, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import type { DropdownProps } from "@/components/Dropdown/Dropdown.types";

const meta: Meta<DropdownProps> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  args: {
    triggerIcon: FaEllipsisV,
    theme: "primary",
    align: "right",
  },
};

export default meta;

type Story = StoryObj<DropdownProps>;

export const WithActions: Story = {
  args: {
    items: [
      {
        label: "Profile",
        icon: <FaUser />,
        onClick: () => alert("View Profile"),
      },
      {
        label: "Settings",
        icon: <FaCog />,
        onClick: () => alert("Settings clicked"),
      },
      {
        label: "Logout",
        icon: <FaSignOutAlt />,
        onClick: () => alert("Logged out"),
        "data-testid": "logout-button",
      },
    ],
  },
};

export const WithLinks: Story = {
  args: {
    items: [
      {
        label: "Home",
        href: "/",
        icon: <FaUser />,
      },
      {
        label: "Settings",
        href: "/settings",
        icon: <FaCog />,
      },
    ],
  },
};

export const AlignedLeft: Story = {
  args: {
    align: "left",
    items: [
      { label: "Left Item 1", onClick: () => {} },
      { label: "Left Item 2", onClick: () => {} },
    ],
  },
};

export const Themed: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Dropdown
        triggerIcon={FaEllipsisV}
        theme="primary"
        items={[{ label: "Primary", onClick: () => {} }]}
      />
      <Dropdown
        triggerIcon={FaEllipsisV}
        theme="secondary"
        items={[{ label: "Secondary", onClick: () => {} }]}
      />
      <Dropdown
        triggerIcon={FaEllipsisV}
        theme="success"
        items={[{ label: "Success", onClick: () => {} }]}
      />
      <Dropdown
        triggerIcon={FaEllipsisV}
        theme="error"
        items={[{ label: "Error", onClick: () => {} }]}
      />
    </div>
  ),
};
