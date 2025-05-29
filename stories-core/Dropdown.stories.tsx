import { Meta, StoryObj } from "@storybook/nextjs";
import { Dropdown } from "@/index.core";
import { FaEllipsisV, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import type { DropdownProps } from "@/components/Dropdown/Dropdown.types";

const meta: Meta<DropdownProps> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  args: {
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

export const AlignmentVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      <div style={{ textAlign: "center" }}>
        <p>Left Aligned</p>
        <Dropdown
          align="left"
          triggerIcon={FaEllipsisV}
          items={[{ label: "Left 1" }, { label: "Left 2" }]}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <p>Right Aligned</p>
        <Dropdown
          align="right"
          triggerIcon={FaEllipsisV}
          items={[{ label: "Right 1" }, { label: "Right 2" }]}
        />
      </div>
    </div>
  ),
};

export const Themed: Story = {
  render: () => {
    const themes = [
      "primary",
      "secondary",
      "success",
      "error",
      "warning",
      "clear",
    ] as const;

    return (
      <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        {themes.map((theme) => (
          <div key={theme} style={{ textAlign: "center" }}>
            <p style={{ marginBottom: "0.5rem", textTransform: "capitalize" }}>
              {theme}
            </p>
            <Dropdown
              triggerIcon={FaEllipsisV}
              theme={theme}
              items={[{ label: `Item (${theme})`, onClick: () => {} }]}
            />
          </div>
        ))}
      </div>
    );
  },
};
